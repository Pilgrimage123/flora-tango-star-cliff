// @ts-nocheck
import { NODE_TYPES } from './config/constants.js';
import { createBattleState } from './engine/state.js';
import { createNewRun } from './engine/run.js';
import { pickRandomEvent } from './engine/events.js';
import { initAssets } from './ui/assets.js';
import { renderHud } from './ui/hud.js';
import { renderBattleBoard, refreshBoardOverlays } from './ui/renderer.js';
import { renderTileBar } from './ui/tileBar.js';
import { renderChronicleLog } from './ui/log.js';
import { renderMapScreen } from './ui/mapScreen.js';
import {
  openRulesModal,
  openFullLogModal,
  openSettingsModal,
  openPubModal,
  openWorkshopModal,
  openEventModal,
  openTreasureModal
} from './ui/modal.js';
import { initTooltips } from './ui/tooltips.js';
import { initKeyboardInput } from './ui/input.js';
import { setSoundEnabled } from './ui/audio.js';
import { createBattleActions } from './battle.js';

const META_STORAGE_KEY = 'lovec_upiru_meta_v1';

const appState = {
  screen: 'battle',
  runState: null,
  battleState: null,
  isAnimating: false,
  hoveredEnemyId: null,
  hoveredTileId: null,
  settings: {
    animSpeed: 1,
    soundEnabled: true,
    currentSeed: 'VENCA-1899'
  },
  metaStats: loadMetaStats()
};

let actions = null;
let bootToken = 0;

export function startGame() {
  const token = ++bootToken;
  return bootstrap(token);
}

function loadMetaStats() {
  try {
    const raw = localStorage.getItem(META_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore storage errors
  }
  return {
    bestAct: 1,
    victories: 0,
    totalKills: 0,
    lastSeed: 'VENCA-1899'
  };
}

function saveMetaStats() {
  try {
    localStorage.setItem(META_STORAGE_KEY, JSON.stringify(appState.metaStats));
  } catch {
    // ignore storage errors
  }
}

async function bootstrap(token) {
  initTooltips();

  const loadingBar = document.getElementById('loading-progress-fill');
  const loadingText = document.getElementById('loading-progress-text');
  const loadingScreen = document.getElementById('loading-overlay');

  await initAssets((loaded, total, key) => {
    if (token !== bootToken) return;
    const pct = total > 0 ? Math.round((loaded / total) * 100) : 100;
    if (loadingBar) loadingBar.style.width = `${pct}%`;
    if (loadingText) loadingText.textContent = `Načítám pergameny a postavy (${loaded}/${total}): ${key}...`;
  });

  if (token !== bootToken) return;

  if (loadingScreen) loadingScreen.classList.add('hidden');

  actions = createBattleActions({
    appState,
    renderAll,
    appendEventsToLog,
    startNewRun,
    completeCurrentNodeAndShowMap
  });

  if (!window.__lovecAssetListener) {
    window.__lovecAssetListener = true;
    window.addEventListener('lovec-assets', () => {
      if (!appState.isAnimating && appState.battleState) renderAll();
    });
  }

  initKeyboardInput({
    isInputLocked: () =>
      appState.isAnimating ||
      appState.screen !== 'battle' ||
      !document.getElementById('modal-root')?.classList.contains('hidden'),
    onStep: (dir) => actions.handlePlayerStep(dir),
    onTurn: () => actions.handlePlayerTurn(),
    onWait: () => actions.handlePlayerWait(),
    onExecuteQueue: () => actions.handleExecuteOrPrepareQueue(),
    onPopQueue: () => {
      if (appState.battleState && appState.battleState.queue.length > 0) {
        actions.handleRemoveQueueSlot(appState.battleState.queue.length - 1);
      }
    },
    onHotkeyTile: (idx) => {
      const tile = appState.battleState?.hand[idx];
      if (tile) actions.handleSelectTile(tile.instanceId);
    },
    onOpenRules: () => openRulesModal(document.getElementById('modal-root'))
  });

  startNewRun(appState.metaStats.lastSeed || 'VENCA-1899');
}

function startNewRun(seedInput = 'VENCA-1899') {
  appState.settings.currentSeed = seedInput;
  appState.metaStats.lastSeed = seedInput;
  saveMetaStats();

  appState.runState = createNewRun(seedInput);
  const firstNode = appState.runState.map.nodes[0];
  enterMapNode(firstNode);
}

function enterMapNode(node) {
  const run = appState.runState;
  const modalRoot = document.getElementById('modal-root');
  run.currentNodeId = node.id;

  if (
    node.type === NODE_TYPES.BATTLE ||
    node.type === NODE_TYPES.ELITE ||
    node.type === NODE_TYPES.BOSS
  ) {
    appState.screen = 'battle';
    appState.battleState = createBattleState({
      seed: `${run.seed}_${node.id}`,
      rng: run.rng,
      encounterId: node.encounterId,
      heroMaxHp: run.heroMaxHp,
      heroHp: run.heroHp,
      deck: run.deck,
      talismans: run.talismans
    });
    renderAll();
    return;
  }

  if (node.type === NODE_TYPES.PUB) {
    renderAll();
    openPubModal(modalRoot, run, () => {
      completeCurrentNodeAndShowMap();
    });
    return;
  }

  if (node.type === NODE_TYPES.WORKSHOP) {
    renderAll();
    openWorkshopModal(modalRoot, run, () => {
      completeCurrentNodeAndShowMap();
    });
    return;
  }

  if (node.type === NODE_TYPES.EVENT) {
    renderAll();
    const evDef = pickRandomEvent(run);
    openEventModal(modalRoot, run, evDef, () => {
      completeCurrentNodeAndShowMap();
    });
    return;
  }

  if (node.type === NODE_TYPES.TREASURE) {
    renderAll();
    openTreasureModal(modalRoot, run, () => {
      completeCurrentNodeAndShowMap();
    });
  }
}

function completeCurrentNodeAndShowMap() {
  const run = appState.runState;
  if (run.currentNodeId && !run.completedNodeIds.includes(run.currentNodeId)) {
    run.completedNodeIds.push(run.currentNodeId);
  }
  appState.battleState = null;
  appState.screen = 'map';
  renderAll();
}

function appendEventsToLog(state, events = [], turnOverride = null) {
  if (!state || !state.log || !Array.isArray(events)) return;
  const turnNum = turnOverride ?? state.turn;
  const turnTag = `[Kolo ${turnNum}]`;
  for (const ev of events) {
    if (ev.type === 'log' && ev.text) {
      const formatted = ev.text.startsWith('[Kolo')
        ? ev.text
        : `${turnTag} ${ev.text}`;
      state.log.push(formatted);
    }
  }
}

function renderAll() {
  const hudRoot = document.getElementById('hud-root');
  const centerStage = document.getElementById('center-stage');
  const bottomRoot = document.getElementById('bottom-root');
  const logRoot = document.getElementById('log-root');
  const modalRoot = document.getElementById('modal-root');

  renderHud(hudRoot, appState.runState, appState.battleState, {
    onToggleMap: () => {
      if (appState.screen === 'map' && appState.battleState) {
        appState.screen = 'battle';
      } else {
        appState.screen = 'map';
      }
      renderAll();
    },
    onOpenRules: () => openRulesModal(modalRoot),
    onOpenSettings: () =>
      openSettingsModal(modalRoot, appState.settings, appState.metaStats, {
        onChangeAnimSpeed: (val) => {
          appState.settings.animSpeed = val;
        },
        onToggleSound: (enabled) => {
          appState.settings.soundEnabled = enabled;
          setSoundEnabled(enabled);
        },
        onStartNewRun: (seed) => startNewRun(seed)
      })
  });

  if (appState.screen === 'map' || !appState.battleState) {
    renderMapScreen(centerStage, appState.runState, {
      canReturnToBattle: Boolean(appState.battleState && appState.battleState.status === 'playing'),
      onReturnToBattle: () => {
        appState.screen = 'battle';
        renderAll();
      },
      onSelectNode: (node) => enterMapNode(node)
    });
    if (bottomRoot) bottomRoot.innerHTML = '';
    if (logRoot) logRoot.innerHTML = '';
    return;
  }

  renderBattleBoard(
    centerStage,
    appState.battleState,
    {
      hoveredEnemyId: appState.hoveredEnemyId,
      hoveredTileId: appState.hoveredTileId
    },
    {
      onRemoveQueueSlot: (slotIdx) => actions.handleRemoveQueueSlot(slotIdx),
      onReorderQueue: (fromIdx, toIdx) => actions.handleReorderQueue(fromIdx, toIdx),
      onHoverEnemy: (enemyId) => {
        if (appState.hoveredEnemyId !== enemyId) {
          appState.hoveredEnemyId = enemyId;
          renderBattleBoardOnly();
        }
      }
    }
  );

  renderTileBar(bottomRoot, appState.battleState, {
    onStep: (dir) => actions.handlePlayerStep(dir),
    onTurn: () => actions.handlePlayerTurn(),
    onWait: () => actions.handlePlayerWait(),
    onExecuteQueue: () => actions.handleExecuteOrPrepareQueue(),
    onSelectTile: (instanceId) => actions.handleSelectTile(instanceId),
    onHoverTile: (instanceId) => {
      if (appState.hoveredTileId !== instanceId) {
        appState.hoveredTileId = instanceId;
        renderBattleBoardOnly();
      }
    }
  });

  renderChronicleLog(logRoot, appState.battleState, () => {
    openFullLogModal(modalRoot, appState.battleState?.log || []);
  });
}

function renderBattleBoardOnly() {
  if (appState.screen !== 'battle' || !appState.battleState) return;
  const centerStage = document.getElementById('center-stage');
  const uiState = {
    hoveredEnemyId: appState.hoveredEnemyId,
    hoveredTileId: appState.hoveredTileId
  };
  if (refreshBoardOverlays(centerStage, appState.battleState, uiState)) return;
  renderBattleBoard(centerStage, appState.battleState, uiState, {
    onRemoveQueueSlot: (slotIdx) => actions.handleRemoveQueueSlot(slotIdx),
    onReorderQueue: (fromIdx, toIdx) => actions.handleReorderQueue(fromIdx, toIdx),
    onHoverEnemy: (enemyId) => {
      if (appState.hoveredEnemyId === enemyId) return;
      appState.hoveredEnemyId = enemyId;
      renderBattleBoardOnly();
    }
  });
}

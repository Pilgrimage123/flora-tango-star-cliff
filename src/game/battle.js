// @ts-nocheck
import { ANIMATION_TIMINGS } from './config/constants.js';
import {
  playerStepNoEnd,
  playerTurnAroundNoEnd,
  playerWaitNoEnd,
  playerEnqueueTileNoEnd,
  playerRemoveFromQueue,
  playerReorderQueue,
  executeQueuedTileStep,
  finalizeQueueExecution,
  endPlayerTurn,
  checkBattleOutcome,
  consumeHeroStun
} from './engine/rules.js';
import { generateBattleRewardChoices, advanceActIfBossDefeated } from './engine/run.js';
import { getCurseDefinition } from './config/curses.js';
import { clearTransientCorpses } from './engine/board.js';
import { playEngineEvents, sleep } from './ui/renderer.js';
import { openBattleRewardModal, openRunEndModal } from './ui/modal.js';
import { hideTooltip } from './ui/tooltips.js';
import { SFX } from './ui/audio.js';

export function createBattleActions(deps) {
  const { appState, renderAll, appendEventsToLog, startNewRun, completeCurrentNodeAndShowMap } = deps;

  async function finishPlayerAction(state, res, turnBefore, extraCd = 0) {
    const boardContainer = document.getElementById('center-stage');
    appendEventsToLog(state, res.events, turnBefore);
    await playEngineEvents(boardContainer, res.events, appState.settings.animSpeed, state);
    clearTransientCorpses(state);
    renderAll();

    if (!res.ok || res.freeTurn || checkBattleOutcome(state) !== 'playing') {
      appState.isAnimating = false;
      renderAll();
      await checkPostActionBattleState();
      return;
    }

    const enemyEvents = [];
    endPlayerTurn(state, enemyEvents, extraCd);
    appendEventsToLog(state, enemyEvents, turnBefore);
    await playEngineEvents(boardContainer, enemyEvents, appState.settings.animSpeed, state);
    clearTransientCorpses(state);

    appState.isAnimating = false;
    renderAll();
    await checkPostActionBattleState();
  }

  async function handlePlayerStep(dir) {
    if (appState.isAnimating || !appState.battleState) return;
    appState.isAnimating = true;
    hideTooltip();
    const state = appState.battleState;
    const turnBefore = state.turn;
    const res = playerStepNoEnd(state, dir);
    await finishPlayerAction(state, res, turnBefore);
  }

  async function handlePlayerTurn() {
    if (appState.isAnimating || !appState.battleState) return;
    appState.isAnimating = true;
    hideTooltip();
    const state = appState.battleState;
    const turnBefore = state.turn;
    const res = playerTurnAroundNoEnd(state);
    await finishPlayerAction(state, res, turnBefore);
  }

  async function handlePlayerWait() {
    if (appState.isAnimating || !appState.battleState) return;
    appState.isAnimating = true;
    hideTooltip();
    const state = appState.battleState;
    const turnBefore = state.turn;
    const res = playerWaitNoEnd(state);
    await finishPlayerAction(state, res, turnBefore, res.extraCd || 0);
  }

  async function handleSelectTile(instanceId) {
    if (appState.isAnimating || !appState.battleState) return;
    appState.isAnimating = true;
    hideTooltip();
    const state = appState.battleState;
    const turnBefore = state.turn;
    const res = playerEnqueueTileNoEnd(state, instanceId);
    await finishPlayerAction(state, res, turnBefore);
  }

  function handleRemoveQueueSlot(slotIdx) {
    if (appState.isAnimating || !appState.battleState) return;
    hideTooltip();
    const res = playerRemoveFromQueue(appState.battleState, slotIdx);
    if (res.ok) appendEventsToLog(appState.battleState, res.events);
    SFX.queueRemove();
    renderAll();
  }

  function handleReorderQueue(fromIdx, toIdx) {
    if (appState.isAnimating || !appState.battleState) return;
    hideTooltip();
    const res = playerReorderQueue(appState.battleState, fromIdx, toIdx);
    if (res.ok) {
      appendEventsToLog(appState.battleState, res.events);
      SFX.queueInsert();
      renderAll();
    }
  }

  async function processEnemyTurn(comboLength = 1) {
    const state = appState.battleState;
    if (!state) return;
    const boardContainer = document.getElementById('center-stage');
    const turnBefore = state.turn;
    const endEvents = finalizeQueueExecution(state, comboLength);
    appendEventsToLog(state, endEvents, turnBefore);
    await playEngineEvents(boardContainer, endEvents, appState.settings.animSpeed, state);
    clearTransientCorpses(state);
    renderAll();
  }

  async function executeQueue() {
    const state = appState.battleState;
    if (appState.isAnimating || !state || state.queue.length === 0 || state.status !== 'playing') {
      return;
    }

    appState.isAnimating = true;
    hideTooltip();

    const boardContainer = document.getElementById('center-stage');
    const queueSnapshot = [...state.queue];
    const comboLength = queueSnapshot.length;
    const turnBefore = state.turn;

    const stunned = consumeHeroStun(state);
    if (stunned) {
      appendEventsToLog(state, stunned.events, turnBefore);
      await playEngineEvents(boardContainer, stunned.events, appState.settings.animSpeed, state);
      clearTransientCorpses(state);
      renderAll();

      const enemyEvents = [];
      endPlayerTurn(state, enemyEvents);
      appendEventsToLog(state, enemyEvents, turnBefore);
      await playEngineEvents(boardContainer, enemyEvents, appState.settings.animSpeed, state);
      clearTransientCorpses(state);

      appState.isAnimating = false;
      renderAll();
      await checkPostActionBattleState();
      return;
    }

    for (let i = 0; i < queueSnapshot.length; i++) {
      if (state.hero.hp <= 0) break;
      const tileInstanceId = queueSnapshot[i];
      const nextInstanceId = queueSnapshot[i + 1] || null;

      const stepEvents = executeQueuedTileStep(
        state,
        tileInstanceId,
        i,
        comboLength,
        nextInstanceId
      );
      appendEventsToLog(state, stepEvents, turnBefore);

      await playEngineEvents(boardContainer, stepEvents, appState.settings.animSpeed, state);
      clearTransientCorpses(state);
      renderAll();
      await sleep(ANIMATION_TIMINGS.QUEUE_STEP_MS, appState.settings.animSpeed);

      if (checkBattleOutcome(state) !== 'playing') break;
    }

    await sleep(ANIMATION_TIMINGS.TURN_TRANSITION_MS, appState.settings.animSpeed);

    await processEnemyTurn(comboLength);

    appState.isAnimating = false;
    renderAll();
    await checkPostActionBattleState();
  }

  async function handleExecuteOrPrepareQueue() {
    const state = appState.battleState;
    if (appState.isAnimating || !state || state.queue.length === 0 || state.status !== 'playing') {
      return;
    }
    await executeQueue();
  }

  function updateMetaStatsFromBattle(battleState, runState, won) {
    if (won) {
      runState.stats.battlesWon += 1;
      if (battleState.isElite) runState.stats.elitesDefeated += 1;
    }
    runState.stats.totalDamageDealt += battleState.stats.damageDealt || 0;
    runState.stats.totalFriendlyFire += battleState.stats.friendlyFireCount || 0;
    runState.stats.totalTurns += battleState.stats.turnsTaken || 0;
    runState.stats.enemiesKilled = (runState.stats.enemiesKilled || 0) + (battleState.stats.enemiesKilled || 0);

    const kills = battleState.stats.enemiesKilled || 0;
    let battleFangs = kills * 1;
    if (won) {
      if (battleState.isElite) battleFangs += 3;
      if (battleState.isBoss) battleFangs += 10;
    }
    const curseDef = getCurseDefinition(runState.curseLevel || 0);
    if (curseDef.fangMultiplier > 1) {
      battleFangs = Math.round(battleFangs * curseDef.fangMultiplier);
    }
    appState.metaStats.fangs = (appState.metaStats.fangs || 0) + battleFangs;
    battleState.fangsEarned = battleFangs;

    appState.metaStats.totalKills =
      (appState.metaStats.totalKills || 0) + (battleState.stats.enemiesKilled || 0);
    appState.metaStats.bestAct = Math.max(appState.metaStats.bestAct || 1, runState.act);
    try {
      localStorage.setItem('lovec_upiru_meta_v1', JSON.stringify(appState.metaStats));
    } catch {
      // ignore storage errors
    }
  }

  async function checkPostActionBattleState() {
    const state = appState.battleState;
    const run = appState.runState;
    if (!state || !run) return;

    const modalRoot = document.getElementById('modal-root');

    if (state.status === 'lost' || state.hero.hp <= 0) {
      SFX.defeat();
      run.heroHp = 0;
      run.status = 'defeat';
      updateMetaStatsFromBattle(state, run, false);
      openRunEndModal(modalRoot, run, false, {
        onRetrySeed: (seed) => startNewRun(seed),
        onNewRun: (seed) => startNewRun(seed)
      });
      return;
    }

    if (state.status === 'won') {
      SFX.victory();
      run.heroHp = state.hero.hp;

      if (run.talismans.includes('sacred_flask')) {
        run.heroHp = Math.min(run.heroMaxHp, run.heroHp + 1);
        state.hero.hp = run.heroHp;
      }

      const ffBonusGold = run.talismans.includes('sexton_keyring')
        ? (state.stats.friendlyFireCount || 0) * 3
        : 0;
      run.gold += (state.goldReward || 18) + ffBonusGold;

      updateMetaStatsFromBattle(state, run, true);

      if (state.isBoss) {
        run.stats.bossesDefeated += 1;
        const adv = advanceActIfBossDefeated(run);
        if (adv.victory) {
          appState.metaStats.victories = (appState.metaStats.victories || 0) + 1;
          const currentCurse = run.curseLevel || 0;
          const nextCurse = Math.min(5, currentCurse + 1);
          if (nextCurse > (appState.metaStats.maxCurseUnlocked || 0)) {
            appState.metaStats.maxCurseUnlocked = nextCurse;
          }
          if (!appState.metaStats.hallOfFame) appState.metaStats.hallOfFame = [];
          appState.metaStats.hallOfFame.unshift({
            date: new Date().toLocaleDateString('cs-CZ'),
            curseLevel: currentCurse,
            loadoutId: run.loadoutId || 'classic',
            battlesWon: run.stats.battlesWon,
            damageDealt: run.stats.totalDamageDealt,
            gold: run.gold
          });
          if (appState.metaStats.hallOfFame.length > 20) {
            appState.metaStats.hallOfFame.pop();
          }
          try {
            localStorage.setItem('lovec_upiru_meta_v1', JSON.stringify(appState.metaStats));
          } catch {
            // ignore storage errors
          }
          openRunEndModal(modalRoot, run, true, {
            onRetrySeed: (seed) => startNewRun(seed),
            onNewRun: (seed) => startNewRun(seed)
          });
          return;
        }
        appState.metaStats.bestAct = Math.max(appState.metaStats.bestAct || 1, run.act);
        try {
          localStorage.setItem('lovec_upiru_meta_v1', JSON.stringify(appState.metaStats));
        } catch {
          // ignore storage errors
        }
        const choices = generateBattleRewardChoices(run, true);
        openBattleRewardModal(modalRoot, run, choices, () => {
          appState.battleState = null;
          appState.screen = 'map';
          renderAll();
        });
        return;
      }

      const choices = generateBattleRewardChoices(run, state.isElite);
      openBattleRewardModal(modalRoot, run, choices, () => {
        completeCurrentNodeAndShowMap();
      });
    }
  }

  return {
    handlePlayerStep,
    handlePlayerTurn,
    handlePlayerWait,
    handleSelectTile,
    handleRemoveQueueSlot,
    handleReorderQueue,
    handleExecuteOrPrepareQueue
  };
}

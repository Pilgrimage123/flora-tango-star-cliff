// @ts-nocheck
import { BOARD_SIZE, ANIMATION_TIMINGS } from '../config/constants.js';
import { STATUSES } from '../config/statuses.js';
import { TERRAIN_TYPES } from '../config/terrain.js';
import { STRINGS, czechTurns } from '../config/strings.cs.js';
import { getSortedEnemiesByInitiative } from '../engine/state.js';
import { computeBoardThreats, computePlayerQueuePreview } from '../engine/threat.js';
import { getAssetUrl } from './assets.js';
import { renderEnemyIntentStripHtml, buildEnemyTooltipHtml } from './enemyIntent.js';
import { renderCellThreatAndPreviewHtml } from './threatOverlay.js';
import { showTooltip, hideTooltip } from './tooltips.js';
import { SFX } from './audio.js';
import { spawnBloodBurst } from './blood.js';

export function sleep(ms, speedMultiplier = 1) {
  if (speedMultiplier === 0) return Promise.resolve();
  const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const effectiveMs = reducedMotion ? Math.min(80, ms) : Math.round(ms / (speedMultiplier || 1));
  return new Promise((resolve) => setTimeout(resolve, effectiveMs));
}

const HERO_POSES = {
  idle: ['/assets/characters/venca_idle.png'],
  attack: ['/assets/characters/venca_attack.png'],
  hurt: ['/assets/characters/venca_hurt.png'],
  dead: ['/assets/characters/venca_dead.png']
};

// Painted arenas: cell edges are image-percent grout lines, one lane per slab.
const PAINTED_SCENES = {
  tutorial_1: {
    className: 'scene-yard',
    imgClass: 'yard-bg',
    image: '/assets/terrain/naves-yard.jpg',
    edges: [1.4, 8.6, 15.8, 26.6, 35.4, 44.2, 56.6, 68.2, 80.4, 93.4]
  },
  act1_battle_2: {
    className: 'scene-farm',
    imgClass: 'farm-bg',
    image: '/assets/terrain/naves-dvur.jpg',
    edges: [3.0, 15.0, 23.8, 34.4, 44.8, 55.0, 65.6, 76.1, 86.0, 96.2]
  }
};

let heroPoseTimer = null;
let heroPoseLocked = false;
let heroPoseEpoch = 0;

function heroSprite(container) {
  return container?.querySelector?.('.hero-sprite') || null;
}

function isHeroEntity(container, entityId) {
  if (!entityId || !container) return false;
  if (entityId === 'hero_venca') return true;
  const el = container.querySelector(`#entity-dom-${entityId}`);
  return Boolean(el && el.classList.contains('entity-hero'));
}

function clearHeroPoseTimer() {
  if (heroPoseTimer) {
    clearTimeout(heroPoseTimer);
    heroPoseTimer = null;
  }
}

function isHeroDead(container) {
  const img = heroSprite(container);
  return Boolean(img && (img.dataset.pose === 'dead' || img.getAttribute('src')?.includes('venca_dead')));
}

function setHeroPose(container, pose, frame = 0) {
  const img = heroSprite(container);
  if (!img) return;
  if (isHeroDead(container) && pose !== 'dead') return;
  const frames = HERO_POSES[pose] || HERO_POSES.idle;
  const next = frames[frame % frames.length];
  img.dataset.pose = pose;
  if (img.getAttribute('src') !== next) img.src = next;
}

function startHeroIdle(container) {
  if (isHeroDead(container)) return;
  heroPoseEpoch += 1;
  clearHeroPoseTimer();
  heroPoseLocked = false;
  setHeroPose(container, 'idle', 0);
}

function scheduleHeroIdle(container, delayMs, animSpeed = 1) {
  if (isHeroDead(container)) return;
  clearHeroPoseTimer();
  const effectiveDelay = animSpeed === 0 ? 0 : Math.round(delayMs / (animSpeed || 1));
  heroPoseTimer = setTimeout(() => {
    if (!isHeroDead(container)) {
      heroPoseLocked = false;
      setHeroPose(container, 'idle', 0);
    }
  }, effectiveDelay);
}

async function playHeroPose(container, pose, ms, animSpeed) {
  const frames = HERO_POSES[pose] || HERO_POSES.idle;
  if (!heroSprite(container) || isHeroDead(container)) return;
  const epoch = heroPoseEpoch;
  heroPoseLocked = true;
  clearHeroPoseTimer();
  const steps = Math.max(1, frames.length);
  const slice = Math.max(90, Math.round(ms / steps));
  for (let i = 0; i < steps; i++) {
    if (epoch !== heroPoseEpoch || !heroSprite(container) || isHeroDead(container)) return;
    setHeroPose(container, pose, i);
    await sleep(slice, animSpeed);
  }
  if (!isHeroDead(container)) {
    scheduleHeroIdle(container, 80, animSpeed);
  }
}

export function renderBattleBoard(container, state, uiState = {}, callbacks = {}) {
  if (!container || !state) return;

  const hoveredEnemyId = uiState.hoveredEnemyId || null;
  const hoveredTileId = uiState.hoveredTileId || null;

  const threats = computeBoardThreats(state, hoveredEnemyId);
  const queuePreview = computePlayerQueuePreview(state, hoveredTileId);
  const sortedEnemies = getSortedEnemiesByInitiative(state);
  const initiativeMap = new Map();
  sortedEnemies.forEach((e, i) => initiativeMap.set(e.id, i + 1));

  const boardSize = state.boardSize || BOARD_SIZE;
  const painted = PAINTED_SCENES[state.encounterId] || null;
  const paintedEdges = painted && painted.edges.length === boardSize + 1 ? painted.edges : null;

  // Gate reinforcement indicators on the end cells
  const leftGateReinf = state.reinforcements.find((r) => !r.spawned && r.gateCell === 0);
  const rightGateReinf = state.reinforcements.find((r) => !r.spawned && r.gateCell === boardSize - 1);

  // Build Hero Queue Bar (3 or 4 slots above the battlefield)
  const queueSlotsHtml = Array.from({ length: state.maxQueueSlots }, (_, slotIdx) => {
    const instanceId = state.queue[slotIdx];
    const tile = instanceId ? state.hand.find((t) => t.instanceId === instanceId) : null;
    const roleLabel = `Slot #${slotIdx + 1}`;

    if (!tile) {
      return `
        <div class="queue-slot queue-slot-empty" data-slot-index="${slotIdx}">
          <span class="queue-slot-role">${roleLabel}</span>
          <span class="queue-slot-placeholder">Prázdný slot</span>
        </div>
      `;
    }

    const iconUrl = getAssetUrl(tile.icon, tile.name);
    return `
      <div class="queue-slot queue-slot-filled"
           draggable="true"
           data-slot-index="${slotIdx}"
           data-instance-id="${tile.instanceId}"
           title="Destička ve frontě komba. Přetažením myší změníš pořadí. Kliknutím na ✖ vrátíš do zásoby.">
        <div class="queue-slot-header">
          <span class="queue-slot-role">${roleLabel}</span>
          <div class="queue-reorder-arrows">
            ${slotIdx > 0 ? `<button type="button" class="btn-slot-move btn-slot-move-left" data-move-slot="${slotIdx}" data-move-dir="-1" title="Posunout doleva">◀</button>` : ''}
            ${slotIdx < state.queue.length - 1 ? `<button type="button" class="btn-slot-move btn-slot-move-right" data-move-slot="${slotIdx}" data-move-dir="1" title="Posunout doprava">▶</button>` : ''}
          </div>
          <button type="button" class="btn-slot-remove" data-remove-queue-slot="${slotIdx}" title="Vrátit destičku do zásoby (zdarma)">✖</button>
        </div>
        <div class="queue-slot-content">
          <img src="${iconUrl}" alt="${tile.name}" class="queue-slot-icon" referrerpolicy="no-referrer" />
          <span class="queue-slot-name">${tile.name}</span>
          <span class="drag-handle" title="Uchop myší a přetáhni">⠿</span>
        </div>
      </div>
    `;
  }).join('');

  // Build the cells of the 1D arena
  const cellsHtml = Array.from({ length: boardSize }, (_, cellIdx) => {
    const terrainObj = state.terrain[cellIdx] || { type: 'none' };
    const terrainDef = TERRAIN_TYPES[terrainObj.type] || TERRAIN_TYPES.none;
    const cellThreat = threats[cellIdx];
    const isThreatened = cellThreat && cellThreat.sources.length > 0;
    const isArmedRed = Boolean(cellThreat && cellThreat.isArmedRed);
    const isInspectReach = Boolean(cellThreat && cellThreat.isInspectReach);
    const isImminent = cellThreat && cellThreat.sources.some((s) => s.countdown <= 1);
    const isNextThreat = cellThreat && cellThreat.nextTileSources.length > 0;
    const isPlayerTargeted =
      queuePreview.targetedCells.some((h) => h.cell === cellIdx) ||
      queuePreview.hoveredCells.some((h) => h.cell === cellIdx);

    const entity = livingEntityAt(state, cellIdx) || corpseAt(state, cellIdx);

    const gateHtml = renderGateBannerHtml(cellIdx, leftGateReinf, rightGateReinf, boardSize);
    const overlayHtml = renderCellThreatAndPreviewHtml(cellIdx, cellThreat, queuePreview, state);
    const entityHtml = entity
      ? renderEntityOnCellHtml(entity, initiativeMap.get(entity.id))
      : '';

    const yardStyle = paintedEdges
      ? ` style="left:${paintedEdges[cellIdx]}%;width:${(paintedEdges[cellIdx + 1] - paintedEdges[cellIdx]).toFixed(3)}%;"`
      : '';

    return `
      <div class="board-cell
                  terrain-${terrainObj.type}
                  ${isArmedRed ? 'cell-armed-red-targeted' : ''}
                  ${isInspectReach ? 'cell-inspect-range' : ''}
                  ${isThreatened ? 'cell-threatened' : ''}
                  ${isImminent ? 'cell-threatened-imminent' : ''}
                  ${isNextThreat ? 'cell-threatened-next' : ''}
                  ${isPlayerTargeted ? 'cell-player-targeted' : ''}"
           data-cell-index="${cellIdx}"
           data-terrain-type="${terrainObj.type}"${yardStyle}>
        <div class="cell-index-label"><span class="cell-index-word">Pole </span>${cellIdx + 1}</div>
        ${gateHtml}
        <div class="cell-overlay-zone">
          ${overlayHtml}
        </div>
        <div class="cell-entity-stage" id="cell-stage-${cellIdx}">
          ${entityHtml}
        </div>
        <div class="cell-floor-stone">
          <span class="terrain-badge terrain-badge-${terrainObj.type}">
            ${getTerrainFloorLabel(terrainObj, terrainDef)}
          </span>
        </div>
      </div>
    `;
  }).join('');

  const tutorialHintHtml = state.isTutorial
    ? `<div class="tutorial-banner">
         <span class="tutorial-icon">🎓</span>
         <span>${STRINGS.tutorialHints[(state.turn - 1) % STRINGS.tutorialHints.length]}</span>
       </div>`
    : '';

  container.innerHTML = `
    ${tutorialHintHtml}
    <div class="hero-queue-panel">
      <div class="hero-queue-label">
        <strong>⚡ Fronta komba Venci Česnekáče</strong>
        <span class="hero-queue-hint">(Fronta akcí · 1 tah vložení · Odpálení okamžité!)</span>
      </div>
      <div class="hero-queue-slots">
        ${queueSlotsHtml}
      </div>
    </div>

    <div class="battlefield-1d-stage ${painted ? painted.className : ''}" id="battlefield-stage">
      ${painted ? `<div class="yard-scene"><img class="${painted.imgClass}" alt="" src="${painted.image}" />${cellsHtml}</div>` : cellsHtml}
    </div>
  `;

  // Wire combo queue drag-and-drop reordering
  let draggedSlotIdx = null;

  container.querySelectorAll('.queue-slot').forEach((slotEl) => {
    const slotIdx = Number(slotEl.getAttribute('data-slot-index'));

    slotEl.addEventListener('dragstart', (e) => {
      if (e.target instanceof Element && e.target.closest('button')) {
        e.preventDefault();
        return;
      }
      if (!slotEl.classList.contains('queue-slot-filled')) {
        e.preventDefault();
        return;
      }
      draggedSlotIdx = slotIdx;
      e.dataTransfer.setData('text/plain', String(slotIdx));
      e.dataTransfer.effectAllowed = 'move';
      slotEl.classList.add('is-dragging');
    });

    slotEl.addEventListener('dragend', () => {
      draggedSlotIdx = null;
      slotEl.classList.remove('is-dragging');
      container.querySelectorAll('.queue-slot').forEach((s) => s.classList.remove('drag-over-target'));
    });

    slotEl.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      if (draggedSlotIdx !== null && draggedSlotIdx !== slotIdx && slotIdx < state.queue.length) {
        slotEl.classList.add('drag-over-target');
      }
    });

    slotEl.addEventListener('dragleave', () => {
      slotEl.classList.remove('drag-over-target');
    });

    slotEl.addEventListener('drop', (e) => {
      e.preventDefault();
      slotEl.classList.remove('drag-over-target');
      const fromIdx = draggedSlotIdx !== null ? draggedSlotIdx : Number(e.dataTransfer.getData('text/plain'));
      if (
        Number.isInteger(fromIdx) &&
        fromIdx >= 0 &&
        fromIdx !== slotIdx &&
        slotIdx < state.queue.length
      ) {
        callbacks.onReorderQueue?.(fromIdx, slotIdx);
      }
    });
  });

  // Wire reorder arrow buttons (◀ / ▶)
  container.querySelectorAll('[data-move-slot]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const currentIdx = Number(btn.getAttribute('data-move-slot'));
      const dir = Number(btn.getAttribute('data-move-dir'));
      const targetIdx = currentIdx + dir;
      if (targetIdx >= 0 && targetIdx < state.queue.length) {
        callbacks.onReorderQueue?.(currentIdx, targetIdx);
      }
    });
  });

  // Wire queue removal clicks (✖)
  container.querySelectorAll('[data-remove-queue-slot]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const slotIdx = Number(btn.getAttribute('data-remove-queue-slot'));
      callbacks.onRemoveQueueSlot?.(slotIdx);
    });
  });

  // Wire enemy hover for next-tile range preview + tooltip
  container.querySelectorAll('[data-enemy-id]').forEach((el) => {
    const enemyId = el.getAttribute('data-enemy-id');
    const enemy = state.enemies.find((e) => e.id === enemyId);
    if (!enemy) return;
    const rank = initiativeMap.get(enemy.id) || 1;

    el.addEventListener('mouseenter', (ev) => {
      callbacks.onHoverEnemy?.(enemyId);
      showTooltip(buildEnemyTooltipHtml(enemy, rank), ev.clientX, ev.clientY);
    });

    el.addEventListener('mouseleave', () => {
      callbacks.onHoverEnemy?.(null);
      hideTooltip();
    });
  });

  // Wire terrain tooltips on floor badges
  container.querySelectorAll('[data-terrain-type]').forEach((cellEl) => {
    const tType = cellEl.getAttribute('data-terrain-type');
    if (!tType || tType === 'none') return;
    const def = TERRAIN_TYPES[tType];
    if (!def) return;
    const floorEl = cellEl.querySelector('.cell-floor-stone');
    floorEl?.addEventListener('mouseenter', (ev) => {
      showTooltip(`<div class="tt-title">${def.name}</div><div class="tt-desc">${def.description}</div>`, ev.clientX, ev.clientY);
    });
    floorEl?.addEventListener('mouseleave', hideTooltip);
  });

  if (state.hero && state.hero.hp > 0) {
    startHeroIdle(container);
  } else {
    setHeroPose(container, 'dead', 0);
  }
}

function renderGateBannerHtml(cellIdx, leftReinf, rightReinf, boardSize = BOARD_SIZE) {
  if (cellIdx === 0) {
    return `
      <div class="gate-pillar gate-left">
        <span class="gate-title">🚪 Levá brána</span>
        ${
          leftReinf
            ? `<span class="gate-reinf-warning">Posila za ${leftReinf.turnsRemaining} ${czechTurns(leftReinf.turnsRemaining)}!</span>`
            : ''
        }
      </div>
    `;
  }
  if (cellIdx === boardSize - 1) {
    return `
      <div class="gate-pillar gate-right">
        <span class="gate-title">🚪 Pravá brána</span>
        ${
          rightReinf
            ? `<span class="gate-reinf-warning">Posila za ${rightReinf.turnsRemaining} ${czechTurns(rightReinf.turnsRemaining)}!</span>`
            : ''
        }
      </div>
    `;
  }
  return '';
}

function renderEntityOnCellHtml(entity, initiativeRank = 1) {
  const givenName = entity.givenName || entity.name;
  const epithet = entity.epithet || '';
  const bodyScale =
    entity.bodyScale ||
    (entity.flying ? 'flyer' : entity.entityType === 'hero' ? 'hero' : entity.isBoss ? 'boss' : 'human');
  const heroClass = entity.entityType === 'hero' ? 'hero-sprite' : '';
  const gait = gaitFor(entity);
  const spriteKey = entity.hp <= 0 && entity.entityType === 'hero' ? 'hero.dead' : entity.sprite;
  const spriteUrl = getAssetUrl(spriteKey, entity.name);
  const hpPercent = Math.max(0, Math.min(100, Math.round((entity.hp / entity.maxHp) * 100)));

  const statusesHtml = Object.entries(entity.statuses || {})
    .filter(([, val]) => val > 0)
    .map(([statusId, val]) => {
      const st = STATUSES[statusId];
      if (!st) return '';
      return `<span class="status-chip" title="${st.name}: ${st.description}">${st.badge}${val > 1 ? val : ''}</span>`;
    })
    .join('');

  const intentStripHtml =
    entity.entityType === 'enemy' ? renderEnemyIntentStripHtml(entity, initiativeRank) : '';

  const facingArrow =
    entity.entityType === 'prop'
      ? '🛢️'
      : entity.facing === 1
      ? '<span class="facing-indicator facing-right" title="Směr pohledu: Vpravo">▶</span>'
      : '<span class="facing-indicator facing-left" title="Směr pohledu: Vlevo">◀</span>';

  // CRITICAL RULE: transform: scaleX(facing) ONLY on .sprite-flip-wrapper!
  // HP bar, numbers, initiative, intent icons, and queue slots NEVER mirror!
  const scaleXVal = entity.entityType === 'prop' ? 1 : entity.facing === -1 ? -1 : 1;

  return `
    <div class="entity-container entity-${entity.entityType}"
         id="entity-dom-${entity.id}"
         ${entity.entityType === 'enemy' ? `data-enemy-id="${entity.id}"` : ''}>
      ${intentStripHtml}

      <div class="entity-hud-top">
        <div class="entity-nameplate" title="${entity.name}">
          ${epithet ? `<div class="entity-epithet">${epithet}</div>` : ''}
          <div class="entity-name-row">
            ${entity.facing === -1 && entity.entityType !== 'prop' ? facingArrow : ''}
            <span class="entity-given">${givenName}</span>
            ${entity.facing === 1 && entity.entityType !== 'prop' ? facingArrow : ''}
          </div>
        </div>
        <div class="entity-hp-bar-outer" title="Zdraví: ${entity.hp}/${entity.maxHp} HP">
          <div class="entity-hp-bar-inner hp-${entity.entityType}" style="width: ${hpPercent}%"></div>
          <span class="entity-hp-text">${entity.hp}/${entity.maxHp}</span>
        </div>
        ${statusesHtml ? `<div class="entity-status-row">${statusesHtml}</div>` : ''}
      </div>

      <div class="sprite-flip-wrapper scale-${bodyScale}" style="transform: scaleX(${scaleXVal});">
        <img src="${spriteUrl}"
             alt="${entity.name}"
             class="entity-sprite-img gait-${gait} ${heroClass} ${entity.flying ? 'sprite-flying' : ''}"
             style="--idle-delay: -${idleDelaySec(entity.id)}s"
             referrerpolicy="no-referrer" />
      </div>
    </div>
  `;
}

function livingEntityAt(state, cellIdx) {
  if (state.hero.hp > 0 && state.hero.cell === cellIdx) return state.hero;
  return (
    state.enemies.find((e) => e.hp > 0 && e.cell === cellIdx) ||
    state.props.find((p) => p.hp > 0 && p.cell === cellIdx) ||
    null
  );
}

function corpseAt(state, cellIdx) {
  if (livingEntityAt(state, cellIdx)) return null;
  if (state.hero?.corpse && state.hero.hp <= 0 && state.hero.cell === cellIdx) return state.hero;
  return (
    state.enemies.find((e) => e.corpse && e.hp <= 0 && e.cell === cellIdx) ||
    state.props.find((p) => p.corpse && p.hp <= 0 && p.cell === cellIdx) ||
    null
  );
}

export function refreshBoardOverlays(container, state, uiState = {}) {
  if (!container || !state) return false;
  const cells = container.querySelectorAll('.board-cell');
  if (!cells.length) return false;

  const hoveredEnemyId = uiState.hoveredEnemyId || null;
  const hoveredTileId = uiState.hoveredTileId || null;
  const threats = computeBoardThreats(state, hoveredEnemyId);
  const queuePreview = computePlayerQueuePreview(state, hoveredTileId);

  cells.forEach((cellEl) => {
    const cellIdx = Number(cellEl.getAttribute('data-cell-index'));
    const cellThreat = threats[cellIdx];
    const isThreatened = Boolean(cellThreat && cellThreat.sources.length > 0);
    const isArmedRed = Boolean(cellThreat && cellThreat.isArmedRed);
    const isInspectReach = Boolean(cellThreat && cellThreat.isInspectReach);
    const isImminent = Boolean(cellThreat && cellThreat.sources.some((s) => s.countdown <= 1));
    const isNextThreat = Boolean(cellThreat && cellThreat.nextTileSources.length > 0);
    const isPlayerTargeted = Boolean(
      queuePreview.targetedCells.some((h) => h.cell === cellIdx) ||
        queuePreview.hoveredCells.some((h) => h.cell === cellIdx)
    );

    cellEl.classList.toggle('cell-armed-red-targeted', isArmedRed);
    cellEl.classList.toggle('cell-inspect-range', isInspectReach);
    cellEl.classList.toggle('cell-threatened', isThreatened);
    cellEl.classList.toggle('cell-threatened-imminent', isImminent);
    cellEl.classList.toggle('cell-threatened-next', isNextThreat);
    cellEl.classList.toggle('cell-player-targeted', isPlayerTargeted);

    const overlay = cellEl.querySelector('.cell-overlay-zone');
    if (overlay) {
      overlay.innerHTML = renderCellThreatAndPreviewHtml(cellIdx, cellThreat, queuePreview, state);
    }
  });

  return true;
}

function gaitFor(entity) {
  if (entity.entityType === 'hero') return 'hero';
  if (entity.flying || entity.bodyScale === 'flyer') return 'flyer';
  if (entity.bodyScale === 'critter') return 'critter';
  if (entity.bodyScale === 'beast') return 'beast';
  if (entity.bodyScale === 'small') return 'small';
  if (entity.bodyScale === 'boss' || entity.isBoss) return 'boss';
  if (entity.kind === 'zombie_hynek' || entity.kind === 'kostlivec_fabian') return 'undead';
  return 'human';
}

function idleDelaySec(id) {
  let hash = 0;
  const text = String(id || '');
  for (let i = 0; i < text.length; i++) hash = (hash * 33 + text.charCodeAt(i)) >>> 0;
  return ((hash % 24) / 10).toFixed(1);
}

function getTerrainFloorLabel(terrainObj, terrainDef) {
  switch (terrainObj.type) {
    case 'plank_intact':
      return '🪵 Prkno (1/2)';
    case 'plank_cracked':
      return '⚠️ Prasklé prkno!';
    case 'pit':
      return '🕳️ PROPAST';
    case 'spikes':
      return '🗡️ KŮLY (2 DMG)';
    case 'garlic_cloud':
      return `🧄 Česnek (${terrainObj.duration || 1}t)`;
    default:
      return terrainDef.name;
  }
}

function getProjectileIcon(ev) {
  if (ev.tileId === 'holy_syringe') return '💉';
  if (ev.tileId === 'silver_crucifix_beam') return '✝️';
  if (ev.tileId === 'rosary_slap') return '📿';
  if (ev.tileId === 'tax_stamp_shot') return '💮';
  if (ev.tileId === 'accountant_curse') return '📜';
  if (ev.tileId === 'bone_chuck') return '🦴';
  if (ev.tileId === 'rat_gnaw') return '🐀';
  if (ev.tileId === 'miasma_waft') return '☣️';
  if (ev.enemyId) {
    const id = String(ev.enemyId);
    if (id.includes('urednik')) return '💮';
    if (id.includes('ucetni')) return '📜';
    if (id.includes('fabian') || id.includes('kostlivec')) return '🦴';
    if (id.includes('felcar')) return '☣️';
    if (id.includes('netopyr')) return '🦇';
  }
  return '🎯';
}

async function playProjectileFly(container, fromCellIdx, toCellIdx, icon = '🎯', animSpeed = 1) {
  if (fromCellIdx === undefined || toCellIdx === undefined || fromCellIdx === toCellIdx || animSpeed === 0) {
    return;
  }
  const fromCell = container.querySelector(`.board-cell[data-cell-index="${fromCellIdx}"]`);
  const toCell = container.querySelector(`.board-cell[data-cell-index="${toCellIdx}"]`);
  if (!fromCell || !toCell) return;

  const rFrom = fromCell.getBoundingClientRect();
  const rTo = toCell.getBoundingClientRect();

  const startX = rFrom.left + rFrom.width / 2;
  const startY = rFrom.top + rFrom.height * 0.42;
  const targetX = rTo.left + rTo.width / 2;
  const targetY = rTo.top + rTo.height * 0.42;

  const flyEl = document.createElement('div');
  flyEl.className = 'flying-projectile';
  flyEl.textContent = icon;
  flyEl.style.left = `${startX}px`;
  flyEl.style.top = `${startY}px`;
  flyEl.style.transform = 'translate(-50%, -50%) scale(0.6)';
  flyEl.style.opacity = '0';
  document.body.appendChild(flyEl);

  const durationMs = Math.max(90, Math.round(180 / (animSpeed || 1)));

  void flyEl.offsetWidth;
  flyEl.style.transition = `transform ${durationMs}ms cubic-bezier(0.2, 0.8, 0.4, 1), opacity 80ms ease-out`;
  flyEl.style.opacity = '1';
  flyEl.style.transform = `translate(${targetX - startX - 22}px, ${targetY - startY - 22}px) scale(1.15)`;

  await sleep(180, animSpeed);
  flyEl.style.opacity = '0';
  setTimeout(() => flyEl.remove(), 100);
}

async function playEntityMove(container, ev, animSpeed = 1) {
  const entityEl = container.querySelector(`#entity-dom-${ev.entityId}`);
  const moveDuration = ev.type === 'leap' ? 300 : ANIMATION_TIMINGS.MOVE_MS;
  const effectiveMs = animSpeed === 0 ? 0 : Math.round(moveDuration / (animSpeed || 1));

  const fromIdx = ev.from ?? ev.fromCell;
  const toIdx = ev.to ?? ev.toCell;
  let isBackwards = false;

  if (fromIdx !== undefined && toIdx !== undefined && fromIdx !== toIdx) {
    const moveDir = toIdx > fromIdx ? 1 : -1;
    const facing = ev.facing ?? 1;
    isBackwards = (moveDir === 1 && facing === -1) || (moveDir === -1 && facing === 1);
  }

  const animClass = ev.type === 'leap' ? 'anim-leap' : isBackwards ? 'anim-walk-back' : 'anim-walk';
  triggerSpriteAnim(container, ev.entityId, animClass);

  if (entityEl && fromIdx !== undefined && toIdx !== undefined && fromIdx !== toIdx) {
    const fromCellEl = container.querySelector(`.board-cell[data-cell-index="${fromIdx}"]`);
    const toCellEl = container.querySelector(`.board-cell[data-cell-index="${toIdx}"]`);

    if (fromCellEl && toCellEl && effectiveMs > 0) {
      const fromRect = fromCellEl.getBoundingClientRect();
      const toRect = toCellEl.getBoundingClientRect();
      const deltaX = toRect.left - fromRect.left;

      entityEl.classList.add('entity-sliding');
      entityEl.style.setProperty('--slide-duration', `${effectiveMs}ms`);
      entityEl.style.transform = `translateX(${deltaX}px)`;

      await sleep(moveDuration, animSpeed);

      entityEl.classList.remove('entity-sliding');
      entityEl.style.removeProperty('--slide-duration');
      entityEl.style.transform = '';

      const destStage = container.querySelector(`#cell-stage-${toIdx}`);
      if (destStage && entityEl.parentElement !== destStage) {
        destStage.appendChild(entityEl);
      }
      return;
    }
  }

  await sleep(moveDuration, animSpeed);
}

export async function playEngineEvents(container, events, animSpeed = 1) {
  if (!container || !events || events.length === 0) return;

  for (const ev of events) {
    switch (ev.type) {
      case 'move':
      case 'leap':
        SFX.step();
        await playEntityMove(container, ev, animSpeed);
        break;

      case 'swap':
        SFX.swap();
        triggerSpriteAnim(container, ev.entityAId, 'anim-leap');
        triggerSpriteAnim(container, ev.entityBId, 'anim-leap');
        spawnFloatingBadgeOnCell(container, ev.cellA, '🤸 PŘESKOK!', 'float-info');
        await sleep(ANIMATION_TIMINGS.MOVE_MS, animSpeed);
        break;

      case 'turn':
        SFX.turn();
        if (ev.free) {
          spawnFloatingBadgeOnEntity(container, ev.entityId, '🧄 OTOČKA ZDARMA', 'float-heal');
        }
        await sleep(90, animSpeed);
        break;

      case 'queue_insert':
        SFX.queueInsert();
        await sleep(90, animSpeed);
        break;

      case 'queue_remove':
        SFX.queueRemove();
        break;

      case 'friendly_fire':
        SFX.friendlyFire();
        spawnFloatingBadgeOnCell(container, ev.cell, '🧛‍♂️💥 FRIENDLY FIRE!', 'float-friendly');
        await sleep(180, animSpeed);
        break;

      case 'tile_start':
        if (ev.isStrike && ev.heroId) {
          triggerSpriteAnim(container, ev.heroId, 'anim-lunge');
          await playHeroPose(container, 'attack', 260, animSpeed);
        }
        break;

      case 'strike_vfx':
        break;

      case 'projectile_vfx':
        await playProjectileFly(container, ev.from, ev.to, getProjectileIcon(ev), animSpeed);
        break;

      case 'enemy_strike_vfx':
        triggerSpriteAnim(container, ev.enemyId, 'anim-lunge');
        await sleep(170, animSpeed);
        break;

      case 'enemy_projectile_vfx':
        triggerSpriteAnim(container, ev.enemyId, 'anim-shoot');
        await playProjectileFly(container, ev.from, ev.to, getProjectileIcon(ev), animSpeed);
        break;

      case 'damage':
        SFX.hit();
        triggerSpriteAnim(container, ev.targetId, 'anim-hurt');

        // Dynamically update target HP bar in DOM immediately
        const damagedEl = container.querySelector(`#entity-dom-${ev.targetId}`);
        if (damagedEl && ev.remainingHp !== undefined) {
          const hpInnerEl = damagedEl.querySelector('.entity-hp-bar-inner');
          const hpTextEl = damagedEl.querySelector('.entity-hp-text');
          if (hpInnerEl && hpTextEl) {
            const parts = (hpTextEl.textContent || '').split('/');
            const maxHp = Number(parts[1]) || Math.max(1, ev.remainingHp);
            const curHp = Math.max(0, ev.remainingHp);
            hpTextEl.textContent = `${curHp}/${maxHp}`;
            hpInnerEl.style.width = `${Math.max(0, Math.min(100, Math.round((curHp / maxHp) * 100)))}%`;
          }
        }

        if (isHeroEntity(container, ev.targetId)) {
          if ((ev.remainingHp ?? 1) > 0) {
            heroPoseLocked = true;
            setHeroPose(container, 'hurt', 0);
            scheduleHeroIdle(container, 340, animSpeed);
          }
        }
        spawnBloodBurst(container, {
          cell: ev.cell,
          ichor: ev.ichor,
          amount: ev.amount,
          reason: ev.reason,
          attackerCell: ev.attackerCell,
          fatal: ev.fatal || ev.remainingHp <= 0,
          animSpeed
        });
        spawnFloatingBadgeOnCell(container, ev.cell, `−${ev.amount} HP`, 'float-dmg');
        if (ev.attackerId && isHeroEntity(container, ev.attackerId) && !isHeroEntity(container, ev.targetId)) {
          const heroImg = heroSprite(container);
          if (!heroImg?.classList.contains('anim-lunge')) {
            triggerSpriteAnim(container, ev.attackerId, 'anim-lunge');
          }
          if (heroImg?.dataset.pose !== 'attack') {
            heroPoseLocked = true;
            setHeroPose(container, 'attack', 0);
            scheduleHeroIdle(container, 260, animSpeed);
          }
        }
        await sleep(ANIMATION_TIMINGS.HIT_MS, animSpeed);
        break;

      case 'blocked_front_shield':
      case 'shield_blocked':
        SFX.collision();
        spawnFloatingBadgeOnCell(container, ev.cell, '🛡️ VYKRYTO!', 'float-info');
        await sleep(160, animSpeed);
        break;

      case 'collision_wall':
      case 'collision_entity':
      case 'collision_barrel':
        SFX.collision();
        spawnFloatingBadgeOnCell(container, ev.cell, '💥 KOLIZE!', 'float-dmg');
        await sleep(180, animSpeed);
        break;

      case 'status_added':
        if (ev.statusId === 'stun') {
          SFX.bell();
          spawnFloatingBadgeOnCell(container, ev.cell, '🔔 OMRÁČENÍ!', 'float-warn');
        }
        break;

      case 'heal':
        const healedEl = container.querySelector(`#entity-dom-${ev.targetId}`);
        if (healedEl && ev.remainingHp !== undefined) {
          const hpInnerEl = healedEl.querySelector('.entity-hp-bar-inner');
          const hpTextEl = healedEl.querySelector('.entity-hp-text');
          if (hpInnerEl && hpTextEl) {
            const parts = (hpTextEl.textContent || '').split('/');
            const maxHp = Number(parts[1]) || Math.max(1, ev.remainingHp);
            const curHp = Math.min(maxHp, ev.remainingHp);
            hpTextEl.textContent = `${curHp}/${maxHp}`;
            hpInnerEl.style.width = `${Math.max(0, Math.min(100, Math.round((curHp / maxHp) * 100)))}%`;
          }
        }
        spawnFloatingBadgeOnCell(container, ev.cell, `+${ev.amount} HP`, 'float-heal');
        await sleep(140, animSpeed);
        break;

      case 'momentum':
        SFX.friendlyFire();
        spawnFloatingBadgeOnEntity(
          container,
          'hero_venca',
          `🔥 MOMENTUM! (−${ev.reduction} CD)`,
          'float-heal'
        );
        await sleep(220, animSpeed);
        break;

      case 'death':
        SFX.death();
        triggerSpriteAnim(container, ev.targetId, 'anim-death');
        const deadEl = container.querySelector(`#entity-dom-${ev.targetId}`);
        if (deadEl) {
          const hpInnerEl = deadEl.querySelector('.entity-hp-bar-inner');
          const hpTextEl = deadEl.querySelector('.entity-hp-text');
          if (hpInnerEl) hpInnerEl.style.width = '0%';
          if (hpTextEl) {
            const max = hpTextEl.textContent?.split('/')?.[1] || '0';
            hpTextEl.textContent = `0/${max}`;
          }
        }
        if (isHeroEntity(container, ev.targetId)) {
          heroPoseLocked = true;
          clearHeroPoseTimer();
          setHeroPose(container, 'dead', 0);
        }
        if (ev.ichor) {
          spawnBloodBurst(container, {
            cell: ev.cell,
            ichor: ev.ichor,
            amount: 6,
            reason: 'death',
            fatal: true,
            animSpeed
          });
        }
        await sleep(ANIMATION_TIMINGS.DEATH_MS, animSpeed);
        break;

      case 'enemy_queue_firing':
        spawnFloatingBadgeOnCell(container, ev.cell, '🚨 ODPALUJE FRONTU!', 'float-warn');
        await sleep(180, animSpeed);
        break;

      default:
        break;
    }
  }
}

function triggerSpriteAnim(container, entityId, className) {
  if (!entityId) return;
  const el = container.querySelector(`#entity-dom-${entityId} .entity-sprite-img`);
  if (!el) return;
  el.classList.remove('anim-walk', 'anim-lunge', 'anim-shoot', 'anim-leap', 'anim-hurt');
  if (className !== 'anim-death') el.classList.remove('anim-death');
  void el.offsetWidth;
  el.classList.add(className);
  if (className === 'anim-death') return;
  const cleanup = () => el.classList.remove(className);
  el.addEventListener('animationend', cleanup, { once: true });
}

function triggerEntityClassAnim(container, entityId, className) {
  triggerSpriteAnim(container, entityId, className);
}

function spawnFloatingBadgeOnEntity(container, entityId, text, variantClass) {
  const el = container.querySelector(`#entity-dom-${entityId}`);
  if (!el) return;
  const cellEl = el.closest('.board-cell');
  if (!cellEl) return;
  const idx = Number(cellEl.getAttribute('data-cell-index') || 0);
  spawnFloatingBadgeOnCell(container, idx, text, variantClass);
}

function spawnFloatingBadgeOnCell(container, cellIdx, text, variantClass = 'float-dmg') {
  const cell = container.querySelector(`.board-cell[data-cell-index="${cellIdx}"]`);
  if (!cell) return;
  const badge = document.createElement('div');
  badge.className = `floating-combat-text floating-combat-text-fixed ${variantClass}`;
  badge.textContent = text;
  const r = cell.getBoundingClientRect();
  badge.style.left = `${r.left + r.width / 2}px`;
  badge.style.top = `${r.top + r.height * 0.36}px`;
  document.body.appendChild(badge);
  setTimeout(() => badge.remove(), 950);
}

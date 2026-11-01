// @ts-nocheck
import { createRng } from './rng.js';
import { executeQueuedTileStep } from './rules.js';
import { detectResonances, triggerComboResonances } from './combo.js';
import { ENEMY_TILES } from '../config/enemies.js';
import { canTileHitTarget } from './enemyAI.js';

/**
 * Deep clone a battle state for deterministic sandboxed execution.
 */
export function cloneBattleState(state) {
  if (!state) return null;
  const clone = {
    hero: JSON.parse(JSON.stringify(state.hero)),
    enemies: JSON.parse(JSON.stringify(state.enemies || [])),
    props: JSON.parse(JSON.stringify(state.props || [])),
    terrain: JSON.parse(JSON.stringify(state.terrain || [])),
    hand: JSON.parse(JSON.stringify(state.hand || [])),
    queue: [...(state.queue || [])],
    talismans: [...(state.talismans || [])],
    boardSize: state.boardSize,
    turn: state.turn,
    status: state.status,
    stats: JSON.parse(JSON.stringify(state.stats || {})),
    reinforcements: JSON.parse(JSON.stringify(state.reinforcements || [])),
    comboResonanceBonusPush: state.comboResonanceBonusPush || 0,
    lastTurnAspergillumTurn: state.lastTurnAspergillumTurn,
    cellBlood: state.cellBlood ? JSON.parse(JSON.stringify(state.cellBlood)) : {}
  };

  if (state.rng) {
    clone.rng = createRng('sim_clone');
    if (typeof state.rng.getState === 'function') {
      clone.rng.setState(state.rng.getState());
    }
  }

  return clone;
}

/**
 * Simulates executing the hero's combo queue on a cloned state.
 * Returns predicted positions, damage, lethal status, resonances, and post-combo enemy threats.
 */
export function simulateComboImpact(state, optionalQueueIds = null) {
  if (!state || !state.hero || state.hero.hp <= 0) {
    return {
      hero: null,
      entities: [],
      resonances: [],
      ghosts: [],
      threatsPostCombo: [],
      impactMap: {}
    };
  }

  const simQueue = optionalQueueIds !== null ? [...optionalQueueIds] : [...(state.queue || [])];
  if (simQueue.length === 0) {
    return {
      hero: {
        initialCell: state.hero.cell,
        finalCell: state.hero.cell,
        initialFacing: state.hero.facing,
        finalFacing: state.hero.facing,
        hpBefore: state.hero.hp,
        hpAfter: state.hero.hp,
        moved: false,
        isThreatenedPostCombo: false
      },
      entities: [],
      resonances: [],
      ghosts: [],
      threatsPostCombo: [],
      impactMap: {}
    };
  }

  const simState = cloneBattleState(state);
  simState.queue = [...simQueue];

  // Capture snapshots before simulation
  const initialHero = {
    cell: simState.hero.cell,
    facing: simState.hero.facing,
    hp: simState.hero.hp
  };

  const initialEntities = new Map();
  for (const e of simState.enemies) {
    initialEntities.set(e.id, {
      id: e.id,
      name: e.name,
      entityType: 'enemy',
      cell: e.cell,
      facing: e.facing,
      hp: e.hp,
      maxHp: e.maxHp
    });
  }
  for (const p of simState.props) {
    initialEntities.set(p.id, {
      id: p.id,
      name: p.name,
      entityType: 'prop',
      cell: p.cell,
      facing: p.facing,
      hp: p.hp,
      maxHp: p.maxHp
    });
  }

  const comboLength = simQueue.length;
  const events = [];

  

  for (let i = 0; i < comboLength; i++) {
    if (simState.hero.hp <= 0) break;
    const tileId = simQueue[i];
    const nextTileId = simQueue[i + 1] || null;
    const stepEvents = executeQueuedTileStep(simState, tileId, i, comboLength, nextTileId);
    events.push(...stepEvents);
  }

  const queueTiles = simQueue
    .map((id) => (state.hand || []).find((t) => t.instanceId === id))
    .filter(Boolean);
  const resonances = detectResonances(queueTiles);

  // Analyze hero outcome
  const heroMoved =
    simState.hero.cell !== initialHero.cell || simState.hero.facing !== initialHero.facing;

  // Analyze enemies and props outcome
  const entities = [];
  const ghosts = [];
  const impactMap = {};

  if (heroMoved && simState.hero.hp > 0) {
    ghosts.push({
      id: simState.hero.id,
      name: simState.hero.name,
      entityType: 'hero',
      cell: simState.hero.cell,
      facing: simState.hero.facing
    });
  }

  for (const enemy of simState.enemies) {
    const init = initialEntities.get(enemy.id);
    if (!init) continue;
    const dmg = Math.max(0, init.hp - enemy.hp);
    const isLethal = enemy.hp <= 0 && init.hp > 0;
    const moved = enemy.cell !== init.cell || enemy.facing !== init.facing;

    const entData = {
      id: enemy.id,
      name: enemy.name,
      entityType: 'enemy',
      initialCell: init.cell,
      finalCell: enemy.cell,
      initialFacing: init.facing,
      finalFacing: enemy.facing,
      hpBefore: init.hp,
      hpAfter: enemy.hp,
      maxHp: init.maxHp,
      dmgTaken: dmg,
      isLethal,
      moved
    };
    entities.push(entData);
    impactMap[enemy.id] = entData;

    if (moved && enemy.hp > 0) {
      ghosts.push({
        id: enemy.id,
        name: enemy.name,
        entityType: 'enemy',
        cell: enemy.cell,
        facing: enemy.facing
      });
    }
  }

  for (const prop of simState.props) {
    const init = initialEntities.get(prop.id);
    if (!init) continue;
    const dmg = Math.max(0, init.hp - prop.hp);
    const isLethal = prop.hp <= 0 && init.hp > 0;
    const moved = prop.cell !== init.cell;

    const propData = {
      id: prop.id,
      name: prop.name,
      entityType: 'prop',
      initialCell: init.cell,
      finalCell: prop.cell,
      initialFacing: init.facing,
      finalFacing: prop.facing,
      hpBefore: init.hp,
      hpAfter: prop.hp,
      maxHp: init.maxHp,
      dmgTaken: dmg,
      isLethal,
      moved
    };
    entities.push(propData);
    impactMap[prop.id] = propData;

    if (moved && prop.hp > 0) {
      ghosts.push({
        id: prop.id,
        name: prop.name,
        entityType: 'prop',
        cell: prop.cell,
        facing: prop.facing
      });
    }
  }

  // Check surviving enemies threatening Venca's final position
  const threatsPostCombo = [];
  const finalHeroCell = simState.hero.cell;

  for (const enemy of simState.enemies) {
    if (enemy.hp <= 0) continue;
    let threatensHero = false;

    // Check armed queue or queued actions
    const actionQueue = enemy.actionQueue || [];
    if (actionQueue.length > 0) {
      for (const tId of actionQueue) {
        const def = ENEMY_TILES[tId];
        if (def && canTileHitTarget(simState, enemy, def, enemy.cell, enemy.facing, finalHeroCell)) {
          threatensHero = true;
          break;
        }
      }
    } else if (enemy.nextAction?.tileId) {
      const def = ENEMY_TILES[enemy.nextAction.tileId];
      if (def && canTileHitTarget(simState, enemy, def, enemy.cell, enemy.facing, finalHeroCell)) {
        threatensHero = true;
      }
    }

    if (threatensHero) {
      threatsPostCombo.push({
        enemyId: enemy.id,
        enemyName: enemy.name,
        cell: enemy.cell,
        targetCell: finalHeroCell
      });
      if (impactMap[enemy.id]) {
        impactMap[enemy.id].threatensHeroPostCombo = true;
      }
    }
  }

  const heroResult = {
    initialCell: initialHero.cell,
    finalCell: simState.hero.cell,
    initialFacing: initialHero.facing,
    finalFacing: simState.hero.facing,
    hpBefore: initialHero.hp,
    hpAfter: simState.hero.hp,
    moved: heroMoved,
    isThreatenedPostCombo: threatsPostCombo.length > 0,
    threatsPostCombo
  };

  return {
    hero: heroResult,
    entities,
    resonances,
    ghosts,
    threatsPostCombo,
    impactMap,
    events
  };
}

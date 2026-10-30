// @ts-nocheck
import { BOARD_SIZE, SPIKES_DAMAGE } from '../config/constants.js';
import { ENEMY_TILES } from '../config/enemies.js';
import { STRINGS } from '../config/strings.cs.js';
import {
  isValidCell,
  getEntityAt,
  addStatus,
  applyDamage,
  pushEntity,
  triggerCellTerrainOnEnter,
  assertBoardInvariant,
  hitBlockFromEvents,
  effectSurvivesBlock,
  hasStatus,
  getStatusAmount,
  consumeStatus
} from './board.js';
import { createEnemyInstance, getSortedEnemiesByInitiative } from './state.js';


export function resolveLungeLanding(state, enemy, fromCell, facing, steps) {
  let cell = fromCell;
  const dir = Math.sign(facing) || 1;
  for (let i = 0; i < (steps || 0); i++) {
    const next = cell + dir;
    if (stepRefuseReason(state, enemy, next)) break;
    cell = next;
  }
  return cell;
}

export function canTileHitTarget(state, enemy, tileDef, fromCell, facing, targetCell) {
  if (!tileDef || !tileDef.pattern || tileDef.pattern.length === 0) return false;
  const origin = tileDef.lungeForward
    ? resolveLungeLanding(state, enemy, fromCell, facing, tileDef.lungeForward)
    : fromCell;

  if (tileDef.projectileRange) {
    for (const pat of tileDef.pattern) {
      const c = origin + facing * pat.offset;
      if (!isValidCell(c, state)) break;
      if (c === targetCell) return true;
      const occupant = getEntityAt(state, c);
      if (occupant && occupant.id !== enemy.id) {
        break; // blocked by obstacle
      }
    }
    return false;
  }

  return (tileDef.pattern || []).some((pat) => origin + facing * pat.offset === targetCell);
}

export function planEnemyIntent(state, enemy) {
  if (!enemy || enemy.hp <= 0 || !state.hero || state.hero.hp <= 0) {
    enemy.nextAction = null;
    return;
  }

  // If already ARMED_RED, lock-in guarantees execution in the upcoming turn!
  if (enemy.queueState === 'ARMED_RED') {
    enemy.nextAction = { type: 'execute_queue' };
    return;
  }

  const heroCell = state.hero.cell;
  const diff = heroCell - enemy.cell;
  const dirToHero = Math.sign(diff) || enemy.facing;

  // RULE 1: If hero is behind enemy, turn towards hero first!
  if (dirToHero !== enemy.facing && heroCell !== enemy.cell) {
    enemy.nextAction = { type: 'turn', dir: dirToHero };
    return;
  }

  // RULE 2: Facing hero. Check ready actionPool tiles to attack or queue.
  const pool = enemy.actionPool || [];
  const readyTiles = pool.filter(
    (p) => p.currentCooldown === 0 && !(enemy.actionQueue || []).includes(p.tileId)
  );

  // Check if any ready tile can hit hero from current cell
  const hittingReady = readyTiles.filter((p) => {
    const def = ENEMY_TILES[p.tileId];
    return canTileHitTarget(state, enemy, def, enemy.cell, enemy.facing, heroCell);
  });

  if (hittingReady.length > 0) {
    // Pick the best attack tile (highest damage or first in pool)
    const bestTile = hittingReady[0];
    const capacity = enemy.comboCapacity || 2;
    const currentQueueLen = (enemy.actionQueue || []).length;

    if (currentQueueLen < capacity) {
      enemy.nextAction = { type: 'queue_tile', tileId: bestTile.tileId };
      return;
    } else {
      // Queue is full -> arm!
      enemy.queueState = 'ARMED_RED';
      enemy.nextAction = { type: 'execute_queue' };
      return;
    }
  }

  // If already has tiles in queue that can hit hero
  const queuedCanHit = (enemy.actionQueue || []).some((tileId) => {
    const def = ENEMY_TILES[tileId];
    return canTileHitTarget(state, enemy, def, enemy.cell, enemy.facing, heroCell);
  });

  if (queuedCanHit) {
    if (enemy.archetype === 'fodder' || (enemy.actionQueue || []).length >= (enemy.comboCapacity || 2)) {
      enemy.queueState = 'ARMED_RED';
      enemy.nextAction = { type: 'execute_queue' };
      return;
    }
  }

  // RULE 3: Positioning (Step / Retreat)
  const dist = Math.abs(diff);

  // Ranged archetype retreats if player gets within melee range (<= 1)
  if (enemy.archetype === 'ranged' && dist <= 1) {
    const retreatCell = enemy.cell - enemy.facing;
    if (isSafeStep(state, enemy, retreatCell)) {
      enemy.nextAction = { type: 'step', dir: -enemy.facing, reason: 'retreat' };
      return;
    }
  }

  // Advance towards hero if out of range
  if (dist > 1) {
    const stepCell = enemy.cell + enemy.facing;
    if (isSafeStep(state, enemy, stepCell)) {
      enemy.nextAction = { type: 'step', dir: enemy.facing, reason: 'advance' };
      return;
    }
  }

  // Non-attack ready tiles (buffs, shields, summons)
  const nonAttackReady = readyTiles.find((p) => {
    const def = ENEMY_TILES[p.tileId];
    return def && (def.type === 'nápřah' || def.type === 'štít' || def.type === 'léčení' || def.type === 'přivolání');
  });

  if (nonAttackReady && (enemy.actionQueue || []).length < (enemy.comboCapacity || 2)) {
    enemy.nextAction = { type: 'queue_tile', tileId: nonAttackReady.tileId };
    return;
  }

  // If queue has any tiles and no further movement or tiles can be added, arm!
  if ((enemy.actionQueue || []).length > 0) {
    enemy.queueState = 'ARMED_RED';
    enemy.nextAction = { type: 'execute_queue' };
    return;
  }

  // Default wait/idle
  enemy.nextAction = { type: 'idle' };
}

export function checkAndApplyArming(state, enemy, events = []) {
  if (enemy.queueState === 'ARMED_RED') return;
  if (!enemy.actionQueue || enemy.actionQueue.length === 0) return;

  let shouldArm = false;
  const capacity = enemy.comboCapacity || 2;

  // Capacity reached
  if (enemy.actionQueue.length >= capacity) {
    shouldArm = true;
  }
  // Fodder archetype arms as soon as 1 attack tile is queued
  else if (enemy.archetype === 'fodder' && enemy.actionQueue.length >= 1) {
    shouldArm = true;
  }
  // No remaining ready tiles in pool
  else {
    const remainingReady = (enemy.actionPool || []).filter(
      (p) => p.currentCooldown === 0 && !enemy.actionQueue.includes(p.tileId)
    );
    if (remainingReady.length === 0) {
      shouldArm = true;
    }
  }

  if (shouldArm) {
    enemy.queueState = 'ARMED_RED';
    enemy.nextAction = { type: 'execute_queue' };
    events.push({
      type: 'enemy_armed',
      enemyId: enemy.id,
      enemyName: enemy.name,
      cell: enemy.cell
    });
    events.push({
      type: 'log',
      text: `🚨 ${enemy.name} zčervenal. Máš ještě jednu normální akci, než odpálí útok!`
    });
  }
}

export function initializeAllEnemiesIntent(state) {
  if (!state || !state.enemies) return;
  for (const enemy of state.enemies) {
    if (enemy.hp > 0) telegraphEnemy(state, enemy);
  }
}

export function telegraphEnemy(state, enemy) {
  if (!enemy || enemy.hp <= 0) return;
  planEnemyIntent(state, enemy);
  checkAndApplyArming(state, enemy, []);
  planEnemyIntent(state, enemy);
  enemy.countdown = enemy.queueState === 'ARMED_RED' ? 1 : 2;
}

export function processEnemiesPhase(state, events = []) {
  if (!state.hero || state.hero.hp <= 0) return events;

  // Evaluate enemies in fixed initiative order (left to right)
  const orderedEnemies = getSortedEnemiesByInitiative(state);

  for (const enemy of orderedEnemies) {
    if (enemy.hp <= 0 || state.hero.hp <= 0) continue;

    // Check stun (Omráčení)
    if (hasStatus(enemy, 'stun')) {
      consumeStatus(enemy, 'stun', 1);
      events.push({
        type: 'enemy_stun_skipped',
        enemyId: enemy.id,
        enemyName: enemy.name,
        cell: enemy.cell
      });
      events.push({
        type: 'log',
        text: `🔔 ${enemy.name} je omráčený a vynechává akci!`
      });
      // Stun delays execution or action; keep ARMED_RED if armed
      continue;
    }

    // If enemy had no planned action yet (e.g. freshly created or added without initialization), plan it now
    if (!enemy.nextAction && enemy.queueState !== 'ARMED_RED') {
      planEnemyIntent(state, enemy);
      checkAndApplyArming(state, enemy, []);
    }

    // Decrement cooldowns in actionPool for tiles not currently in queue
    if (enemy.actionPool) {
      for (const item of enemy.actionPool) {
        if (!enemy.actionQueue?.includes(item.tileId) && item.currentCooldown > 0) {
          item.currentCooldown = Math.max(0, item.currentCooldown - 1);
        }
      }
    }

    // Check if enemy is firing their ARMED_RED queue or legacy test attack
    const isArmedQueue = (enemy.queueState === 'ARMED_RED' || enemy.countdown <= 1) && (enemy.actionQueue || []).length > 0;

    if (isArmedQueue) {
      const targetedCells = getEnemyQueuedTargetCells(state, enemy);
      events.push({
        type: 'enemy_queue_firing',
        enemyId: enemy.id,
        enemyName: enemy.name,
        cell: enemy.cell,
        queue: [...enemy.actionQueue],
        targetedCells
      });

      // Odpal až po hráčově tahu. Žádná blesková reakce — lovec měl jednu normální akci.
      if (enemy.hp > 0 && !hasStatus(enemy, 'stun')) {
        events.push({
          type: 'enemy_queue_execution_start',
          enemyId: enemy.id,
          enemyName: enemy.name,
          cell: enemy.cell,
          queue: [...enemy.actionQueue]
        });
        events.push({
          type: 'log',
          text: `⚡ ${enemy.name} odpálil celou frontu akcí (${enemy.actionQueue.length} ${enemy.actionQueue.length === 1 ? 'destička' : 'destičky'})!`
        });

        const queueCopy = [...enemy.actionQueue];
        for (const tileId of queueCopy) {
          if (enemy.hp <= 0 || state.hero.hp <= 0) break;
          const tileDef = ENEMY_TILES[tileId];
          if (tileDef) {
            executeSingleEnemyTile(state, enemy, tileDef, events);
            // Put on cooldown
            const poolItem = enemy.actionPool?.find((p) => p.tileId === tileId);
            if (poolItem) {
              poolItem.currentCooldown = poolItem.maxCooldown;
            }
          }
        }
      } else if (enemy.hp <= 0) {
        events.push({
          type: 'log',
          text: `💀 ${enemy.name} byl zlikvidován reakcí ještě před provedením své fronty!`
        });
      }

      enemy.actionQueue = [];
      enemy.queueState = 'EMPTY';
    } else if (enemy.nextAction) {
      // Perform telegraphed turn / step / queue_tile / arm
      performEnemyAction(state, enemy, enemy.nextAction, events);
    }

    // Post-action: check transition to ARMED_RED and plan next turn
    if (enemy.hp > 0 && state.hero.hp > 0) {
      checkAndApplyArming(state, enemy, events);
      planEnemyIntent(state, enemy);
      enemy.countdown = enemy.queueState === 'ARMED_RED' ? 1 : 2;
    }
  }

  assertBoardInvariant(state);
  return events;
}

function performEnemyAction(state, enemy, action, events) {
  if (!action) return;

  if (action.type === 'turn') {
    enemy.facing = action.dir;
    events.push({
      type: 'turn',
      entityId: enemy.id,
      facing: enemy.facing
    });
    events.push({
      type: 'log',
      text: `🔄 ${enemy.name} se otočil ${enemy.facing === 1 ? 'vpravo ▶' : 'vlevo ◀'}.`
    });
  } else if (action.type === 'step') {
    let dir = action.dir;
    if (hasStatus(enemy, 'confusion')) {
      consumeStatus(enemy, 'confusion', 1);
      dir = state.rng.nextFloat() < 0.5 ? -1 : 1;
      events.push({
        type: 'log',
        text: `🌀 Zmatený ${enemy.name} vrávorá náhodným směrem!`
      });
    }
    const targetCell = enemy.cell + dir;
    const refused = stepRefuseReason(state, enemy, targetCell);
    if (!refused) {
      const fromCell = enemy.cell;
      enemy.cell = targetCell;
      events.push({
        type: 'move',
        entityId: enemy.id,
        from: fromCell,
        to: targetCell,
        facing: enemy.facing
      });
      events.push({
        type: 'log',
        text: `👣 ${enemy.name} popošel na pole ${targetCell + 1}.`
      });
      triggerCellTerrainOnEnter(state, enemy, targetCell, events);
    } else {
      events.push({
        type: 'enemy_step_blocked',
        enemyId: enemy.id,
        from: enemy.cell,
        blockedCell: targetCell
      });
      events.push({
        type: 'log',
        text: stepBlockedLog(enemy, targetCell, refused)
      });
    }
  } else if (action.type === 'queue_tile') {
    const tileId = action.tileId;
    const tileDef = ENEMY_TILES[tileId];
    if (!enemy.actionQueue) enemy.actionQueue = [];
    enemy.actionQueue.push(tileId);
    enemy.queueState = 'QUEUING_GRAY';
    events.push({
      type: 'enemy_queue_tile',
      enemyId: enemy.id,
      tileId,
      tileName: tileDef?.name || tileId,
      slotIndex: enemy.actionQueue.length - 1
    });
    events.push({
      type: 'log',
      text: `📥 ${enemy.name} připravil do komba „${tileDef?.name || tileId}“ (slot #${enemy.actionQueue.length}).`
    });
  } else if (action.type === 'arm') {
    enemy.queueState = 'ARMED_RED';
    events.push({
      type: 'enemy_armed',
      enemyId: enemy.id,
      cell: enemy.cell
    });
    events.push({
      type: 'log',
      text: `🚨 ${enemy.name} zčervenal. Máš ještě jednu normální akci, než odpálí kombo!`
    });
  }
}

export function executeSingleEnemyTile(state, enemy, tileDef, events = []) {
  const hero = state.hero;
  events.push({
    type: 'enemy_action_start',
    enemyId: enemy.id,
    enemyName: enemy.name,
    cell: enemy.cell,
    tileId: tileDef.id,
    tileName: tileDef.name,
    tileType: tileDef.type
  });

  // 1. Turn action ('otočení')
  if (tileDef.type === 'otočení') {
    const desiredFacing = Math.sign(hero.cell - enemy.cell) || enemy.facing;
    enemy.facing = desiredFacing;
    events.push({
      type: 'turn',
      entityId: enemy.id,
      facing: enemy.facing
    });
    events.push({
      type: 'log',
      text: `🔄 ${enemy.name} se otočil směrem k Vencovi.`
    });
    return;
  }

  // 2. Step action ('krok')
  if (tileDef.type === 'krok') {
    const dirToHero = Math.sign(hero.cell - enemy.cell) || enemy.facing;
    enemy.facing = dirToHero;
    events.push({
      type: 'turn',
      entityId: enemy.id,
      facing: enemy.facing
    });

    let moveDir = dirToHero;
    if (tileDef.retreatIfClose && Math.abs(hero.cell - enemy.cell) <= 1) {
      moveDir = -dirToHero;
    }

    // Confusion randomizes step direction
    if (hasStatus(enemy, 'confusion')) {
      consumeStatus(enemy, 'confusion', 1);
      moveDir = state.rng.nextFloat() < 0.5 ? -1 : 1;
      events.push({
        type: 'log',
        text: `🌀 Zmatený ${enemy.name} vrávorá náhodným směrem!`
      });
    }

    const targetCell = enemy.cell + moveDir;
    const refused = stepRefuseReason(state, enemy, targetCell);
    if (refused) {
      events.push({
        type: 'enemy_step_blocked',
        enemyId: enemy.id,
        from: enemy.cell,
        blockedCell: targetCell
      });
      events.push({
        type: 'log',
        text: stepBlockedLog(enemy, targetCell, refused)
      });
      return;
    }

    const fromCell = enemy.cell;
    enemy.cell = targetCell;
    events.push({
      type: 'move',
      entityId: enemy.id,
      from: fromCell,
      to: targetCell,
      facing: enemy.facing
    });
    triggerCellTerrainOnEnter(state, enemy, targetCell, events);
    return;
  }

  // 3. Windup ('nápřah') or Shield ('štít')
  if (tileDef.type === 'nápřah' || tileDef.type === 'štít') {
    if (tileDef.selfEffect) {
      addStatus(enemy, tileDef.selfEffect.type, tileDef.selfEffect.amount || 1, events);
    }
    events.push({
      type: 'log',
      text: `💢 ${enemy.name} použil „${tileDef.name}“!`
    });
    return;
  }

  // 4. Support / Heal ('léčení')
  if (tileDef.type === 'léčení' && tileDef.supportAllies) {
    const allies = state.enemies.filter((e) => e.hp > 0 && e.id !== enemy.id);
    const targetAlly = allies.length > 0
      ? allies.sort((a, b) => Math.abs(a.cell - enemy.cell) - Math.abs(b.cell - enemy.cell))[0]
      : enemy;

    const healAmt = tileDef.healAmount || 1;
    const oldHp = targetAlly.hp;
    targetAlly.hp = Math.min(targetAlly.maxHp, targetAlly.hp + healAmt);
    const healed = targetAlly.hp - oldHp;
    if (healed > 0) {
      events.push({
        type: 'heal',
        targetId: targetAlly.id,
        cell: targetAlly.cell,
        amount: healed
      });
    }
    if (tileDef.empowerAmount) {
      addStatus(targetAlly, 'empower', tileDef.empowerAmount, events);
    }
    events.push({
      type: 'log',
      text: `💉 ${enemy.name} provedla „${tileDef.name}“ na postavu ${targetAlly.name} (+${healed} HP, +Zesílení)!`
    });
    return;
  }

  // 5. Summon ('přivolání')
  if (tileDef.summonEnemyId) {
    const gates = [0, (state.boardSize || BOARD_SIZE) - 1];
    const freeGate = gates.find((g) => !getEntityAt(state, g));
    if (freeGate !== undefined) {
      const facing = freeGate === 0 ? 1 : -1;
      const spawned = createEnemyInstance(tileDef.summonEnemyId, freeGate, facing);
      state.enemies.push(spawned);
      triggerCellTerrainOnEnter(state, spawned, freeGate, events);
      if (spawned.hp > 0) telegraphEnemy(state, spawned);
      events.push({
        type: 'spawn',
        enemy: structuredClone(spawned),
        cell: freeGate
      });
      events.push({
        type: 'log',
        text: `🦇 ${enemy.name} přivolal posilu: ${spawned.name} na bráně ${freeGate + 1}!`
      });
    }
    if (!tileDef.pattern || tileDef.pattern.length === 0) {
      return;
    }
  }

  if (tileDef.spawnSpikesAtHero && hero?.hp > 0 && isValidCell(hero.cell, state)) {
    state.terrain[hero.cell] = { type: 'spikes' };
    events.push({
      type: 'terrain_spawn',
      terrainType: 'spikes',
      cell: hero.cell
    });
    events.push({
      type: 'log',
      text: `🗡️ ${enemy.name} nechal vyrazit kůly přímo pod Vencou (pole ${hero.cell + 1})!`
    });
    if (!hero.flying) {
      applyDamage(
        state,
        hero,
        SPIKES_DAMAGE,
        { reason: 'spikes', attackerId: enemy.id, attackerCell: enemy.cell, type: 'terrain' },
        events
      );
      if (hero.hp <= 0) return;
    }
  }

  // 6. Optional lunge before strike (e.g., Drábův výpad)
  if (tileDef.lungeForward) {
    const landing = resolveLungeLanding(state, enemy, enemy.cell, enemy.facing, tileDef.lungeForward);
    while (enemy.cell !== landing && enemy.hp > 0) {
      const next = enemy.cell + enemy.facing;
      const fromCell = enemy.cell;
      enemy.cell = next;
      events.push({
        type: 'move',
        entityId: enemy.id,
        from: fromCell,
        to: next,
        facing: enemy.facing
      });
      triggerCellTerrainOnEnter(state, enemy, next, events);
    }
    if (enemy.hp <= 0) return;
  }

  // 7. Attack / Shoot execution into SPECIFIC CELLS based on CURRENT position and facing
  const inGarlic = state.terrain[enemy.cell]?.type === 'garlic_cloud';
  const garlicPenalty = inGarlic ? 1 : 0;
  const empowerBonus = getStatusAmount(enemy, 'empower');

  if (tileDef.projectileRange) {
    let hitTarget = null;
    let hitPat = null;
    let endCell = enemy.cell;

    for (const pat of tileDef.pattern || []) {
      const c = enemy.cell + enemy.facing * pat.offset;
      if (!isValidCell(c, state)) break;
      endCell = c;
      const occupant = getEntityAt(state, c);
      if (occupant && occupant.id !== enemy.id) {
        hitTarget = occupant;
        hitPat = pat;
        break;
      }
    }

    events.push({
      type: 'enemy_projectile_vfx',
      enemyId: enemy.id,
      from: enemy.cell,
      to: endCell,
      facing: enemy.facing
    });

    if (hitTarget && hitPat) {
      resolveEnemyHitOnTarget(state, enemy, tileDef, hitPat, hitTarget, empowerBonus, garlicPenalty, events);
    } else {
      events.push({
        type: 'log',
        text: `💨 ${enemy.name} vystřelil „${tileDef.name}“, ale trefil jen holou zeď.`
      });
    }
  } else {
    let anyHit = false;
    const alreadyHit = new Set();
    for (const pat of tileDef.pattern || []) {
      const targetCell = enemy.cell + enemy.facing * pat.offset;
      if (!isValidCell(targetCell, state)) continue;

      events.push({
        type: 'enemy_strike_vfx',
        enemyId: enemy.id,
        from: enemy.cell,
        cell: targetCell
      });

      const occupant = getEntityAt(state, targetCell);
      if (occupant && occupant.id !== enemy.id && !alreadyHit.has(occupant.id)) {
        anyHit = true;
        alreadyHit.add(occupant.id);
        resolveEnemyHitOnTarget(state, enemy, tileDef, pat, occupant, empowerBonus, garlicPenalty, events);
      }
    }

    if (!anyHit && (tileDef.pattern || []).length > 0) {
      events.push({
        type: 'log',
        text: `💨 ${enemy.name} promáchl akcí „${tileDef.name}“ do prázdna!`
      });
    }
  }

  if (enemy.statuses?.empower) {
    delete enemy.statuses.empower;
  }
}

function resolveEnemyHitOnTarget(state, attacker, tileDef, pat, target, empowerBonus, garlicPenalty, events) {
  const isFriendlyFire = target.entityType === 'enemy';
  const sextonBonus = isFriendlyFire && state.talismans?.includes('sexton_keyring') ? 1 : 0;
  const synergy =
    attacker.entityType === 'enemy' &&
    !attacker.corporateSynergy &&
    state.enemies.some((e) => e.hp > 0 && e.corporateSynergy && e.id !== attacker.id)
      ? 1
      : 0;
  const dmg = Math.max(0, (pat.dmg || 0) + empowerBonus - garlicPenalty + sextonBonus + synergy);

  let block = null;
  let dealt = 0;
  if (dmg > 0) {
    const mark = events.length;
    dealt = applyDamage(
      state,
      target,
      dmg,
      {
        type: 'direct',
        attackerId: attacker.id,
        attackerCell: attacker.cell,
        reason: tileDef.id
      },
      events
    );
    block = hitBlockFromEvents(events, mark);

    if (tileDef.lifesteal && dealt > 0 && attacker.hp > 0) {
      const heal = Math.min(attacker.maxHp - attacker.hp, tileDef.lifesteal);
      if (heal > 0) {
        attacker.hp += heal;
        events.push({
          type: 'heal',
          targetId: attacker.id,
          cell: attacker.cell,
          amount: heal
        });
      }
    }
  }

  if (!block && dmg > 0) {
    if (isFriendlyFire) {
      state.stats.friendlyFireCount = (state.stats.friendlyFireCount || 0) + 1;
      const quote = state.rng.pick(STRINGS.friendlyFireQuotes) || STRINGS.friendlyFireQuotes[0];
      events.push({
        type: 'friendly_fire',
        attackerId: attacker.id,
        attackerName: attacker.name,
        targetId: target.id,
        targetName: target.name,
        cell: target.cell,
        amount: dealt
      });
      events.push({
        type: 'log',
        text: `🧛‍♂️💥 FRIENDLY FIRE! ${attacker.name} zasáhl vlastního kumpána (${target.name})! ${quote}`
      });
    } else {
      events.push({
        type: 'log',
        text: `⚔️ ${attacker.name} zasáhl cíl ${target.name} akcí „${tileDef.name}“ (${dealt} DMG)!`
      });
    }
  }

  const hitDir = Math.sign(target.cell - attacker.cell) || attacker.facing;
  for (const eff of pat.effects || []) {
    if (target.hp <= 0) break;
    if (!effectSurvivesBlock(block, eff.type)) continue;
    if (eff.type === 'push') {
      pushEntity(state, target, hitDir, eff.distance || 1, events);
    } else if (eff.type === 'bleed') {
      addStatus(target, 'bleed', eff.amount || 2, events);
    } else if (eff.type === 'confusion') {
      addStatus(target, 'confusion', eff.amount || 1, events);
    } else if (eff.type === 'stun') {
      addStatus(target, 'stun', eff.amount || 1, events);
    }
  }
}

export function getEnemyQueuedTargetCells(state, enemy) {
  if (!enemy || !enemy.actionQueue || enemy.actionQueue.length === 0) return [];
  const cells = new Set();
  let currentCell = enemy.cell;
  const facing = enemy.facing;

  for (const tileId of enemy.actionQueue) {
    const def = ENEMY_TILES[tileId];
    if (!def) continue;

    let origin = currentCell;
    if (def.lungeForward) {
      const landing = resolveLungeLanding(state, enemy, currentCell, facing, def.lungeForward);
      if (landing !== currentCell) {
        origin = landing;
        currentCell = landing;
      }
    }

    if (def.projectileRange) {
      for (const pat of def.pattern || []) {
        const c = origin + facing * pat.offset;
        if (!isValidCell(c, state)) break;
        cells.add(c);
        const occupant = getEntityAt(state, c);
        if (occupant && occupant.id !== enemy.id) break;
      }
    } else {
      for (const pat of def.pattern || []) {
        const c = origin + facing * pat.offset;
        if (isValidCell(c, state)) {
          cells.add(c);
        }
      }
    }
  }
  return Array.from(cells).sort((a, b) => a - b);
}

function stepRefuseReason(state, enemy, cell) {
  if (!isValidCell(cell, state)) return 'wall';
  if (getEntityAt(state, cell)) return 'occupied';
  if (!enemy?.flying && state.terrain[cell]?.type === 'pit') return 'pit';
  return null;
}

function stepBlockedLog(enemy, cell, reason) {
  if (reason === 'pit') {
    return `🕳️ ${enemy.name} se zarazil před propastí na poli ${cell + 1}.`;
  }
  if (reason === 'wall') {
    return `🧱 ${enemy.name} chtěl popojít, ale narazil do hradní zdi.`;
  }
  return `🚧 ${enemy.name} chtěl popojít, ale pole je obsazené.`;
}

function isSafeStep(state, enemy, cell) {
  return stepRefuseReason(state, enemy, cell) === null;
}


// @ts-nocheck
import {
  BOARD_SIZE,
  COLLISION_DAMAGE,
  BARREL_EXPLODE_DAMAGE,
  SPIKES_DAMAGE,
  PLANK_COLLAPSE_DAMAGE
} from '../config/constants.js';
import { ENEMY_TILES } from '../config/enemies.js';
import { STRINGS } from '../config/strings.cs.js';

export function isValidCell(cell, state) {
  const limit = state?.boardSize || BOARD_SIZE;
  return Number.isInteger(cell) && cell >= 0 && cell < limit;
}

export function getLivingEntities(state) {
  const list = [];
  if (state.hero && state.hero.hp > 0) {
    list.push(state.hero);
  }
  for (const enemy of state.enemies) {
    if (enemy.hp > 0) list.push(enemy);
  }
  for (const prop of state.props) {
    if (prop.hp > 0) list.push(prop);
  }
  return list;
}

export function getEntityAt(state, cell) {
  if (!isValidCell(cell, state)) return null;
  if (state.hero && state.hero.hp > 0 && state.hero.cell === cell) {
    return state.hero;
  }
  for (const enemy of state.enemies) {
    if (enemy.hp > 0 && enemy.cell === cell) return enemy;
  }
  for (const prop of state.props) {
    if (prop.hp > 0 && prop.cell === cell) return prop;
  }
  return null;
}

export function assertBoardInvariant(state) {
  const seen = new Map();
  const entities = getLivingEntities(state);
  for (const ent of entities) {
    if (!isValidCell(ent.cell, state)) {
      throw new Error(`Invariant porušen: entita ${ent.id} je mimo bojiště na poli ${ent.cell}`);
    }
    if (seen.has(ent.cell)) {
      const other = seen.get(ent.cell);
      throw new Error(`Invariant porušen: dvě entity (${other.id}, ${ent.id}) stojí na stejném poli ${ent.cell}`);
    }
    seen.set(ent.cell, ent);
  }
  return true;
}

export function findNearestEmptyCell(state, targetCell, preferredDir = 1, ignoreId = null) {
  const limit = state?.boardSize || BOARD_SIZE;
  const clamped = Math.max(0, Math.min(limit - 1, targetCell));
  const blocked = (cell) => {
    const occ = getEntityAt(state, cell);
    if (!occ) return false;
    if (ignoreId && occ.id === ignoreId) return false;
    return true;
  };
  if (!blocked(clamped)) return clamped;

  const dir = Math.sign(preferredDir) || 1;
  for (let radius = 1; radius < limit; radius++) {
    const first = clamped + dir * radius;
    const second = clamped - dir * radius;
    if (isValidCell(first, state) && !blocked(first)) return first;
    if (isValidCell(second, state) && !blocked(second)) return second;
  }
  return null;
}

export function hasStatus(entity, statusId) {
  return Boolean(entity && entity.hp > 0 && entity.statuses && (entity.statuses[statusId] || 0) > 0);
}

export function getStatusAmount(entity, statusId) {
  if (!entity || entity.hp <= 0 || !entity.statuses) return 0;
  return Math.max(0, entity.statuses[statusId] || 0);
}

export function consumeStatus(entity, statusId, amount = 1) {
  if (!entity || !entity.statuses || !entity.statuses[statusId]) return 0;
  const consumed = Math.min(entity.statuses[statusId], amount);
  entity.statuses[statusId] -= consumed;
  if (entity.statuses[statusId] <= 0) {
    delete entity.statuses[statusId];
  }
  return consumed;
}

export function addStatus(entity, statusId, amount = 1, events = []) {
  if (!entity || entity.hp <= 0 || !statusId || statusId === 'stagger') return;
  if (!entity.statuses) entity.statuses = {};

  entity.statuses[statusId] = (entity.statuses[statusId] || 0) + amount;
  events.push({
    type: 'status_added',
    targetId: entity.id,
    cell: entity.cell,
    statusId,
    amount: entity.statuses[statusId]
  });
}

export function applyDamage(state, target, amount, sourceInfo = {}, events = []) {
  if (!target || target.hp <= 0 || amount <= 0) return 0;

  let finalDmg = amount;

  // Front shield check for enemies like Vrátný se štítem
  if (
    target.entityType === 'enemy' &&
    target.frontShield &&
    sourceInfo.type === 'direct' &&
    typeof sourceInfo.attackerCell === 'number'
  ) {
    const dirFromTargetToAttacker = Math.sign(sourceInfo.attackerCell - target.cell);
    if (dirFromTargetToAttacker === target.facing) {
      events.push({
        type: 'blocked_front_shield',
        targetId: target.id,
        cell: target.cell,
        text: `${target.name} vykryl přímý úder zepředu svým štítem!`
      });
      events.push({
        type: 'log',
        text: `🛡️ ${target.name} odrazil útok zepředu! Musíš na něj zezadu, odhozením nebo ho otočit stříkačkou.`
      });
      return 0;
    }
  }

  // Status shield check
  if (consumeStatus(target, 'shield', 1) > 0) {
    events.push({
      type: 'shield_blocked',
      targetId: target.id,
      cell: target.cell,
      text: `${target.name} vykryl zásah štítem!`
    });
    events.push({
      type: 'log',
      text: `🛡️ Štít zachránil postavu ${target.name} před zásahem!`
    });
    return 0;
  }

  target.hp = Math.max(0, target.hp - finalDmg);
  events.push({
    type: 'damage',
    targetId: target.id,
    targetName: target.name,
    cell: target.cell,
    amount: finalDmg,
    remainingHp: target.hp,
    attackerId: sourceInfo.attackerId || null,
    attackerCell: typeof sourceInfo.attackerCell === 'number' ? sourceInfo.attackerCell : null,
    reason: sourceInfo.reason || 'attack',
    ichor: target.ichor || null,
    entityType: target.entityType || null,
    fatal: target.hp <= 0
  });

  if (
    target.bloodThorns &&
    !sourceInfo.reflected &&
    sourceInfo.attackerId &&
    sourceInfo.attackerId !== target.id
  ) {
    const attacker = findEntityById(state, sourceInfo.attackerId);
    if (attacker && attacker.hp > 0 && attacker.id !== target.id) {
      events.push({
        type: 'log',
        text: `🌹 Krajkové trny ${target.name} šlehly útočníka za 1 DMG!`
      });
      applyDamage(
        state,
        attacker,
        1,
        {
          reason: 'blood_thorns',
          reflected: true,
          attackerId: target.id,
          attackerCell: target.cell,
          type: 'thorns'
        },
        events
      );
    }
  }

  // Boss enrage at <= 50% HP
  if (
    target.entityType === 'enemy' &&
    target.isBoss &&
    target.hp > 0 &&
    !target.enraged &&
    target.hp <= Math.floor(target.maxHp / 2) &&
    target.enrageTile
  ) {
    target.enraged = true;
    const queued = grantEnrageTile(target);
    events.push({
      type: 'boss_enrage',
      targetId: target.id,
      cell: target.cell,
      tileId: target.enrageTile,
      queued
    });
    events.push({
      type: 'log',
      text: queued
        ? `⚡ ${target.name} zuří a přidává do své fronty novou zákeřnou destičku!`
        : `⚡ ${target.name} zuří!`
    });
  }

  // Mirror cloak boss reaction on combo 2+ from same direction
  if (
    target.entityType === 'enemy' &&
    target.mirrorCloak &&
    target.hp > 0 &&
    sourceInfo.isComboHit &&
    typeof sourceInfo.attackerCell === 'number'
  ) {
    const hitDir = Math.sign(target.cell - sourceInfo.attackerCell);
    if (target.lastComboHitDir === hitDir) {
      const swapCandidate = findMirrorCloakCandidate(state, target);
      if (swapCandidate) {
        const oldBossCell = target.cell;
        const newBossCell = swapCandidate.cell;
        target.cell = newBossCell;
        swapCandidate.cell = oldBossCell;
        target.lastComboHitDir = null;
        events.push({
          type: 'swap',
          entityAId: target.id,
          entityBId: swapCandidate.id,
          cellA: newBossCell,
          cellB: oldBossCell
        });
        events.push({
          type: 'log',
          text: `🪞 Zrcadlový plášť! ${target.name} si v dýmu prohodil místo s entitou ${swapCandidate.name}!`
        });
        triggerCellTerrainOnEnter(state, target, newBossCell, events);
        if (swapCandidate.hp > 0) {
          triggerCellTerrainOnEnter(state, swapCandidate, oldBossCell, events);
        }
      }
    } else {
      target.lastComboHitDir = hitDir;
    }
  }

  if (target.hp <= 0) {
    handleEntityDeath(state, target, sourceInfo, events);
  }

  return finalDmg;
}

export function hitBlockFromEvents(events, startIndex) {
  for (let i = events.length - 1; i >= startIndex; i--) {
    const kind = events[i]?.type;
    if (kind === 'shield_blocked') return 'shield';
    if (kind === 'blocked_front_shield') return 'front';
    if (kind === 'damage') return null;
  }
  return null;
}

export function effectSurvivesBlock(block, effectType) {
  if (!block) return true;
  if (block === 'shield') return false;
  if (block === 'front') return effectType === 'push' || effectType === 'flip_target';
  return true;
}

function findEntityById(state, id) {
  if (!id) return null;
  if (state.hero?.id === id) return state.hero;
  return (
    state.enemies.find((e) => e.id === id) ||
    state.props.find((p) => p.id === id) ||
    null
  );
}

function grantEnrageTile(target) {
  const tileId = target.enrageTile;
  if (!tileId) return false;
  const tileDef = ENEMY_TILES[tileId];
  const cooldown = tileDef?.cooldown ?? tileDef?.delay ?? 2;
  if (!target.actionPool) target.actionPool = [];
  const existing = target.actionPool.find((p) => p.tileId === tileId);
  if (!existing) {
    target.actionPool.push({ tileId, maxCooldown: cooldown, currentCooldown: 0 });
  } else {
    existing.currentCooldown = 0;
    if (!existing.maxCooldown) existing.maxCooldown = cooldown;
  }
  if (target.queueState === 'ARMED_RED') return false;
  if (!target.actionQueue) target.actionQueue = [];
  if (target.actionQueue.includes(tileId)) return false;
  if (target.actionQueue.length >= (target.comboCapacity || 3)) return false;
  target.actionQueue.push(tileId);
  target.queueState = 'QUEUING_GRAY';
  return true;
}

function findMirrorCloakCandidate(state, boss) {
  const candidates = [
    ...state.props.filter((p) => p.hp > 0 && p.kind === 'barrel'),
    ...state.enemies.filter((e) => e.hp > 0 && e.id !== boss.id && e.kind === 'netopyr')
  ];
  if (candidates.length === 0) return null;
  candidates.sort((a, b) => Math.abs(a.cell - boss.cell) - Math.abs(b.cell - boss.cell));
  return candidates[0];
}

export function clearTransientCorpses(state) {
  if (!state) return;
  for (const enemy of state.enemies || []) delete enemy.corpse;
  for (const prop of state.props || []) delete prop.corpse;
}

export function handleEntityDeath(state, target, sourceInfo = {}, events = []) {
  if (!target || target.deathResolved) return;
  target.deathResolved = true;
  events.push({
    type: 'death',
    targetId: target.id,
    targetName: target.name,
    entityType: target.entityType,
    cell: target.cell,
    reason: sourceInfo.reason || 'damage',
    ichor: target.ichor || null
  });

  if (target.entityType === 'prop' && target.kind === 'barrel') {
    events.push({
      type: 'barrel_break',
      cell: target.cell,
      text: 'Sud s kyselým zelím se rozletěl na třísky!'
    });
    events.push({
      type: 'log',
      text: `🛢️ Sud s kyselým zelím na poli ${target.cell + 1} explodoval v gejzíru šťávy!`
    });
  } else if (target.entityType === 'enemy') {
    state.stats.enemiesKilled = (state.stats.enemiesKilled || 0) + 1;
    events.push({
      type: 'log',
      text: `💀 ${target.name} se s hlasitým zaklením poroučel do věčných lovišť!`
    });
  } else if (target.entityType === 'hero') {
    events.push({
      type: 'log',
      text: `⚰️ Venca Česnekáč padl! Upíří byrokracie dnes zvítězila.`
    });
  }

  target.corpse = true;
}

export function triggerCellTerrainOnEnter(state, entity, cell, events = []) {
  if (!entity || entity.hp <= 0 || !isValidCell(cell, state)) return;
  const terrainObj = state.terrain[cell];
  if (!terrainObj || terrainObj.type === 'none') return;

  if (entity.flying && terrainObj.type !== 'spikes') {
    return;
  }

  if (terrainObj.type === 'pit') {
    events.push({
      type: 'pit_fall',
      targetId: entity.id,
      cell,
      text: `${entity.name} zahučel do bezedné propasti!`
    });
    events.push({
      type: 'log',
      text: `🕳️ ${entity.name} spadl do propasti na poli ${cell + 1}! Okamžitá smrt!`
    });
    entity.hp = 0;
    handleEntityDeath(state, entity, { reason: 'pit' }, events);
    return;
  }

  if (terrainObj.type === 'spikes') {
    events.push({
      type: 'terrain_trigger',
      terrainType: 'spikes',
      cell,
      targetId: entity.id
    });
    events.push({
      type: 'log',
      text: `🗡️ ${entity.name} naběhl na naostřené kůly na poli ${cell + 1} (${SPIKES_DAMAGE} DMG)!`
    });
    applyDamage(state, entity, SPIKES_DAMAGE, { reason: 'spikes' }, events);
    return;
  }

  if (terrainObj.type === 'plank_intact') {
    state.terrain[cell] = { type: 'plank_cracked' };
    events.push({
      type: 'plank_crack',
      cell,
      targetId: entity.id
    });
    events.push({
      type: 'log',
      text: `🪵 Prohnilé prkno na poli ${cell + 1} pod vahou postavy ${entity.name} zlověstně zapraskalo!`
    });
    return;
  }

  if (terrainObj.type === 'plank_cracked') {
    state.terrain[cell] = { type: 'none' };
    events.push({
      type: 'plank_collapse',
      cell,
      targetId: entity.id
    });
    events.push({
      type: 'log',
      text: `💥 Prkno na poli ${cell + 1} se prolomilo! ${entity.name} utržil ${PLANK_COLLAPSE_DAMAGE} DMG!`
    });
    applyDamage(state, entity, PLANK_COLLAPSE_DAMAGE, { reason: 'plank_collapse' }, events);
  }
}

export function pushEntity(state, target, direction, distance, events = []) {
  if (!target || target.hp <= 0 || distance <= 0 || !direction) return;
  const stepDir = Math.sign(direction);
  const bonusCollision = state.talismans?.includes('hobnailed_boots') ? 1 : 0;
  const targetColDmg = COLLISION_DAMAGE + (target.entityType !== 'hero' ? bonusCollision : 0);

  for (let step = 0; step < distance; step++) {
    if (target.hp <= 0) break;
    const nextCell = target.cell + stepDir;

    // Wall collision
    if (!isValidCell(nextCell, state)) {
      events.push({
        type: 'collision_wall',
        targetId: target.id,
        cell: target.cell,
        direction: stepDir
      });
      events.push({
        type: 'log',
        text: `🧱 ${target.name} narazil hlavou do hradní zdi (${targetColDmg} DMG)!`
      });
      applyDamage(state, target, targetColDmg, { reason: 'wall_collision' }, events);
      break;
    }

    const blocker = getEntityAt(state, nextCell);
    if (blocker) {
      // Special interaction: pushed into a barrel!
      if (blocker.entityType === 'prop' && blocker.kind === 'barrel') {
        events.push({
          type: 'collision_barrel',
          targetId: target.id,
          barrelId: blocker.id,
          cell: nextCell
        });
        events.push({
          type: 'log',
          text: `🛢️ ${target.name} vletěl přímo do sudu s kyselým zelím! Sud praská (${BARREL_EXPLODE_DAMAGE} DMG + Zmatení)!`
        });
        applyDamage(state, blocker, blocker.hp, { reason: 'barrel_smash' }, events);
        applyDamage(state, target, BARREL_EXPLODE_DAMAGE + (target.entityType !== 'hero' ? bonusCollision : 0), { reason: 'barrel_smash' }, events);
        if (target.hp > 0) {
          addStatus(target, 'confusion', 1, events);
        }
        // If barrel broke and target survived, move target onto the barrel's former cell
        if (blocker.hp <= 0 && target.hp > 0 && !getEntityAt(state, nextCell)) {
          const fromCell = target.cell;
          target.cell = nextCell;
          events.push({
            type: 'push_move',
            targetId: target.id,
            from: fromCell,
            to: nextCell
          });
          triggerCellTerrainOnEnter(state, target, nextCell, events);
        }
        break;
      }

      // Standard entity-to-entity collision
      events.push({
        type: 'collision_entity',
        pushedId: target.id,
        blockerId: blocker.id,
        cell: nextCell
      });
      const quote = STRINGS.collisionQuotes[0];
      const blockerColDmg = COLLISION_DAMAGE + (blocker.entityType !== 'hero' ? bonusCollision : 0);
      const dmgLabel = targetColDmg === blockerColDmg ? `oba ${targetColDmg} DMG` : `${target.name} ${targetColDmg} DMG, ${blocker.name} ${blockerColDmg} DMG`;
      events.push({
        type: 'log',
        text: `💥 Srážka! ${target.name} vrazil do postavy ${blocker.name} (${dmgLabel})! ${quote}`
      });
      applyDamage(state, target, targetColDmg, { reason: 'entity_collision' }, events);
      applyDamage(state, blocker, blockerColDmg, { reason: 'entity_collision' }, events);
      break;
    }

    // Cell is free: advance 1 cell
    const fromCell = target.cell;
    target.cell = nextCell;
    events.push({
      type: 'push_move',
      targetId: target.id,
      from: fromCell,
      to: nextCell
    });
    triggerCellTerrainOnEnter(state, target, nextCell, events);
  }

  assertBoardInvariant(state);
}

export function pullEntity(state, target, attackerCell, events = []) {
  if (!target || target.hp <= 0) return;
  const stepDir = Math.sign(attackerCell - target.cell);
  if (stepDir === 0) return;

  while (Math.abs(target.cell - attackerCell) > 1 && target.hp > 0) {
    const nextCell = target.cell + stepDir;
    if (!isValidCell(nextCell, state) || getEntityAt(state, nextCell)) {
      break;
    }
    const fromCell = target.cell;
    target.cell = nextCell;
    events.push({
      type: 'pull_move',
      targetId: target.id,
      from: fromCell,
      to: nextCell
    });
    triggerCellTerrainOnEnter(state, target, nextCell, events);
  }

  assertBoardInvariant(state);
}

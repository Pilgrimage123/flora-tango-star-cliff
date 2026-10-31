// @ts-nocheck
import { BOARD_SIZE } from '../config/constants.js';
import { ENEMY_TILES } from '../config/enemies.js';
import { isValidCell, getEntityAt, findNearestEmptyCell, getStatusAmount } from './board.js';
import { resolveLungeLanding } from './enemyAI.js';
import { getSortedEnemiesByInitiative } from './state.js';

export function computeEnemyTileTargetCells(state, enemy, tileDef, bonusCtx = null) {
  if (!enemy || enemy.hp <= 0 || !tileDef || !tileDef.pattern) return [];
  const results = [];
  const originCell = tileDef.lungeForward
    ? resolveLungeLanding(state, enemy, enemy.cell, enemy.facing, tileDef.lungeForward)
    : enemy.cell;

  const inGarlic = state.terrain[originCell]?.type === 'garlic_cloud';
  const garlicPenalty = inGarlic ? 1 : 0;
  const empowerBonus = getStatusAmount(enemy, 'empower');
  const synergy = bonusCtx && typeof bonusCtx.synergy === 'number'
    ? bonusCtx.synergy
    : (!enemy.lordSynergy &&
      state.enemies?.some((e) => e.hp > 0 && e.lordSynergy && e.id !== enemy.id)
        ? 1
        : 0);

  const occAt = (cell) => (bonusCtx?.occupancy ? bonusCtx.occupancy.get(cell) || null : getEntityAt(state, cell));

  if (tileDef.projectileRange) {
    // Raycast projectile: stops at the first occupied cell, but threatens all cells up to the first blocker
    for (const pat of tileDef.pattern) {
      const targetCell = originCell + enemy.facing * pat.offset;
      if (!isValidCell(targetCell, state)) continue;
      const dmg = Math.max(0, (pat.dmg || 0) + empowerBonus - garlicPenalty + synergy);
      results.push({
        cell: targetCell,
        dmg,
        effects: pat.effects || [],
        direction: enemy.facing,
        projectile: true
      });
      const occupant = occAt(targetCell);
      if (occupant && occupant.id !== enemy.id) {
        break;
      }
    }
  } else {
    for (const pat of tileDef.pattern) {
      const targetCell = originCell + enemy.facing * pat.offset;
      if (!isValidCell(targetCell, state)) continue;
      const dmg = Math.max(0, (pat.dmg || 0) + empowerBonus - garlicPenalty + synergy);
      results.push({
        cell: targetCell,
        dmg,
        effects: pat.effects || [],
        direction: enemy.facing,
        projectile: false
      });
    }
  }

  return results;
}

export function computeBoardThreats(state, hoveredEnemyId = null) {
  const cells = Array.from({ length: state.boardSize || BOARD_SIZE }, (_, idx) => ({
    cell: idx,
    totalDmg: 0,
    imminentDmg: 0,
    isArmedRed: false,
    isInspectReach: false,
    sources: [],
    inspectSources: [],
    nextTileSources: []
  }));

  const sortedEnemies = getSortedEnemiesByInitiative(state);

  const occupancy = new Map();
  const put = (ent) => {
    if (ent && ent.hp > 0) occupancy.set(ent.cell, ent);
  };
  put(state.hero);
  for (const ent of state.enemies || []) put(ent);
  for (const prop of state.props || []) put(prop);
  const synergyIds = (state.enemies || []).filter((e) => e.hp > 0 && e.lordSynergy).map((e) => e.id);

  sortedEnemies.forEach((enemy, index) => {
    const initiativeRank = index + 1;
    const synergy = synergyIds.some((id) => id !== enemy.id) ? 1 : 0;
    const bonusCtx = { occupancy, synergy };
    const isArmed = enemy.queueState === 'ARMED_RED';
    const liveQueue = enemy.actionQueue || [];

    const paintQueue = (tileIds, { armed = false, imminent = false } = {}) => {
      let simCell = enemy.cell;
      let simEmpower = getStatusAmount(enemy, 'empower');
      for (const tileId of tileIds) {
        const tileDef = ENEMY_TILES[tileId];
        if (!tileDef) continue;
        if (tileDef.selfEffect?.type === 'empower') {
          simEmpower += tileDef.selfEffect.amount || 1;
        }
        const hits = computeEnemyTileTargetCells(
          state,
          {
            ...enemy,
            cell: simCell,
            statuses: { ...(enemy.statuses || {}), empower: simEmpower }
          },
          tileDef,
          bonusCtx
        );
        for (const hit of hits) {
          const cellInfo = cells[hit.cell];
          cellInfo.totalDmg += hit.dmg;
          if (armed || imminent) cellInfo.imminentDmg += hit.dmg;
          if (armed) cellInfo.isArmedRed = true;
          cellInfo.sources.push({
            enemyId: enemy.id,
            enemyName: enemy.name,
            initiativeRank,
            tileId,
            tileName: tileDef.name,
            isArmedRed: armed,
            countdown: armed ? 1 : enemy.countdown,
            dmg: hit.dmg,
            direction: hit.direction,
            effects: hit.effects
          });
        }
        if (tileDef.lungeForward) {
          simCell = resolveLungeLanding(
            state,
            { ...enemy, cell: simCell },
            simCell,
            enemy.facing,
            tileDef.lungeForward
          );
        }
        if ((tileDef.pattern || []).some((p) => (p.dmg || 0) > 0)) simEmpower = 0;
      }
    };

    if (isArmed && liveQueue.length > 0) {
      paintQueue(liveQueue, { armed: true, imminent: true });
    } else if (liveQueue.length > 0) {
      paintQueue(liveQueue, { armed: false, imminent: false });
    }

    // 2. Hover / Inspect Mode: highlight reachable attack cells of hovered enemy
    if (hoveredEnemyId && enemy.id === hoveredEnemyId) {
      const inspectTileIds = (enemy.actionPool || []).map((p) => p.tileId);

      for (const tId of inspectTileIds) {
        const tDef = ENEMY_TILES[tId];
        if (tDef) {
          const hits = computeEnemyTileTargetCells(state, enemy, tDef, bonusCtx);
          for (const hit of hits) {
            cells[hit.cell].isInspectReach = true;
            cells[hit.cell].inspectSources.push({
              enemyId: enemy.id,
              enemyName: enemy.name,
              tileId: tId,
              tileName: tDef.name,
              dmg: hit.dmg,
              direction: hit.direction,
              effects: hit.effects
            });
          }
        }
      }
    }
  });

  return cells;
}

export function computePlayerQueuePreview(state, hoveredTileInstanceId = null) {
  if (!state.hero || state.hero.hp <= 0) {
    return {
      ghostCell: 0,
      ghostFacing: 1,
      targetedCells: [],
      hoveredCells: []
    };
  }

  let simCell = state.hero.cell;
  let simFacing = state.hero.facing;
  const sim = {
    firstAttackUsed: Boolean(state.firstAttackUsed),
    empower: getStatusAmount(state.hero, 'empower')
  };
  const targetedCells = [];

  const queueTiles = state.queue
    .map((id) => state.hand.find((t) => t.instanceId === id))
    .filter(Boolean);

  queueTiles.forEach((tile, slotIndex) => {
    const isOpener = slotIndex === 0;
    const isFinisher = slotIndex >= 2;
    const stepHits = simulateTileAt(state, tile, simCell, simFacing, isOpener, isFinisher, slotIndex, sim);
    simCell = stepHits.newHeroCell;
    simFacing = stepHits.newHeroFacing;
    targetedCells.push(...stepHits.hits);
  });

  const hoveredCells = [];
  if (hoveredTileInstanceId) {
    const hoveredTile = state.hand.find((t) => t.instanceId === hoveredTileInstanceId);
    if (hoveredTile) {
      const slotIndex = queueTiles.length;
      const isOpener = slotIndex === 0;
      const isFinisher = slotIndex >= 2;
      const hoverSim = { ...sim };
      const simHover = simulateTileAt(
        state,
        hoveredTile,
        simCell,
        simFacing,
        isOpener,
        isFinisher,
        slotIndex,
        hoverSim
      );
      hoveredCells.push(...simHover.hits);
    }
  }

  return {
    ghostCell: simCell,
    ghostFacing: simFacing,
     heroMoved: simCell !== state.hero.cell || simFacing !== state.hero.facing,
    targetedCells,
    hoveredCells
  };
}

function simulateTileAt(state, tile, heroCell, heroFacing, _isOpener, _isFinisher, slotIndex, sim = {}) {
  let newHeroCell = heroCell;
  let newHeroFacing = heroFacing;
  const hits = [];
  const empowerAtStart = sim.empower || 0;
  const dmgBonus = tileDamageBonus(state, tile, slotIndex, sim);
  if (!sim.deadIds) sim.deadIds = new Set();

  if (tile.leapDistance) {
    const landing = landingCellForLeap(state, heroCell, heroFacing, tile.leapDistance);
    newHeroCell = landing;
    hits.push({
      cell: landing,
      dmg: 0,
      isMove: true,
      slotIndex,
      tileName: tile.name,
      effects: []
    });
  } else if (tile.projectileRange) {
    for (const pat of tile.pattern || []) {
      const c = heroCell + heroFacing * pat.offset;
      if (!isValidCell(c, state)) continue;
      const dmg = (pat.dmg || 0) + dmgBonus;
      const occupant = occupantAt(state, c, sim);
      hits.push({
        cell: c,
        dmg,
        isMove: false,
        slotIndex,
        tileName: tile.name,
        wouldKill: Boolean(occupant && occupant.hp <= dmg),
        effects: pat.effects || []
      });
      if (occupant) {
        if (occupant.hp <= dmg) sim.deadIds.add(occupant.id);
        break;
      }
    }
  } else {
    for (const pat of tile.pattern || []) {
      const c = heroCell + heroFacing * pat.offset;
      if (!isValidCell(c, state)) continue;
      const dmg = (pat.dmg || 0) + dmgBonus;
      const occupant = occupantAt(state, c, sim);
      hits.push({
        cell: c,
        dmg,
        isMove: Boolean(pat.isMoveTarget),
        slotIndex,
        tileName: tile.name,
        wouldKill: Boolean(occupant && occupant.hp <= dmg),
        effects: pat.effects || []
      });
      if (occupant && occupant.hp <= dmg) sim.deadIds.add(occupant.id);
    }
  }

  const damaging = !tile.leapDistance && (
    (tile.dmg || 0) > 0 ||
    dmgBonus > 0 ||
    (tile.pattern || []).some((pat) => (pat.dmg || 0) > 0)
  );
  if (damaging) {
    sim.firstAttackUsed = true;
    const empowerApplied = empowerAtStart > 0 && ((tile.dmg || 0) > 0 || dmgBonus > empowerAtStart);
    if (empowerApplied) sim.empower = Math.max(0, (sim.empower || 0) - empowerAtStart);
  }
  if (tile.selfEffect?.type === 'empower') {
    sim.empower = (sim.empower || 0) + (tile.selfEffect.amount || 1);
  }

  if (tile.selfFlipAfter) newHeroFacing = -newHeroFacing;

  return { newHeroCell, newHeroFacing, hits };
}

function tileDamageBonus(state, tile, slotIndex, sim) {
  let dmgBonus = 0;
  if ((slotIndex === 2 || slotIndex === 3) && state.talismans?.includes('oak_splinter')) dmgBonus += 1;
  if (!sim.firstAttackUsed && tile.type !== 'move' && state.talismans?.includes('brass_lantern')) dmgBonus += 1;
  if ((sim.empower || 0) > 0 && (tile.dmg > 0 || dmgBonus > 0)) dmgBonus += sim.empower;
  return dmgBonus;
}

function occupantAt(state, cell, sim) {
  const occ = getEntityAt(state, cell);
  if (!occ || occ.entityType === 'hero') return null;
  if (sim?.deadIds?.has(occ.id)) return null;
  return occ;
}

function landingCellForLeap(state, fromCell, facing, distance) {
  const desired = fromCell + facing * distance;
  const landing = findNearestEmptyCell(state, desired, facing, state.hero?.id);
  return landing === null ? fromCell : landing;
}

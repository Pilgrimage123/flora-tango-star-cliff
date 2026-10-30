// @ts-nocheck
import {
  BOARD_SIZE,
  QUEUE_SLOTS,
  MAX_QUEUE_SLOTS,
  HERO_START_HP,
  GARLIC_CLOUD_DURATION
} from '../config/constants.js';
import { getHeroTileDefinition } from '../config/tiles.js';
import { ENEMIES, ENEMY_TILES } from '../config/enemies.js';
import { ichorForKind } from '../config/ichor.js';
import { PROPS } from '../config/terrain.js';
import { ENCOUNTERS, TERRAIN_PRESETS } from '../config/encounters.js';
import { createRng } from './rng.js';
import { assertBoardInvariant, triggerCellTerrainOnEnter } from './board.js';
import { initializeAllEnemiesIntent } from './enemyAI.js';

let uidCounter = 1;
export function nextEntityUid(prefix = 'ent') {
  return `${prefix}_${uidCounter++}`;
}

export function resetUidCounter() {
  uidCounter = 1;
}

export function createEnemyInstance(enemyId, cell, facing = -1) {
  const def = ENEMIES[enemyId];
  if (!def) {
    throw new Error(`Neznámý nepřítel: ${enemyId}`);
  }

  const poolSource = def.actionPool || [];
  const actionPool = poolSource.map((tileId) => {
    const tileDef = ENEMY_TILES[tileId];
    return {
      tileId,
      maxCooldown: tileDef?.cooldown ?? tileDef?.delay ?? 2,
      currentCooldown: 0
    };
  });

  

  return {
    id: nextEntityUid(enemyId),
    kind: enemyId,
    entityType: 'enemy',
    name: def.name,
    givenName: def.givenName || def.name,
    epithet: def.epithet || '',
    bodyScale: def.bodyScale || (def.flying ? 'flyer' : def.isBoss ? 'boss' : 'human'),
    sprite: def.sprite,
    maxHp: def.maxHp,
    hp: def.maxHp,
    cell,
    facing,
    flying: Boolean(def.flying),
    ichor: ichorForKind(enemyId, 'enemy', def.name),
    frontShield: Boolean(def.frontShield),
    isElite: Boolean(def.isElite),
    isBoss: Boolean(def.isBoss),
    mirrorCloak: Boolean(def.mirrorCloak),
    bloodThorns: Boolean(def.bloodThorns),
    corporateSynergy: Boolean(def.corporateSynergy),
    enrageTile: def.enrageTile || null,
    enraged: false,
    archetype: def.archetype || 'fodder',
    comboCapacity: def.comboCapacity || (def.isBoss || def.isElite ? 3 : 2),
    queueState: 'EMPTY', // 'EMPTY' | 'QUEUING_GRAY' | 'ARMED_RED'
    actionQueue: [], // array of up to 3 tileId
    actionPool,
    nextAction: null, // { type: 'turn' | 'step' | 'queue_tile' | 'arm' | 'execute_queue' | 'idle', dir?, tileId? }
    countdown: 2,
    statuses: {},
    flavor: def.flavor || ''
  };
}

export function createPropInstance(propKind, cell) {
  const def = PROPS[propKind] || PROPS.barrel;
  return {
    id: nextEntityUid(propKind),
    kind: propKind,
    entityType: 'prop',
    name: def.name,
    givenName: propKind === 'barrel' ? 'Sud' : def.name,
    epithet: propKind === 'barrel' ? 'Kyselé zelí' : '',
    bodyScale: 'prop',
    sprite: def.icon,
    maxHp: def.maxHp,
    hp: def.maxHp,
    cell,
    facing: 1,
    flying: false,
    statuses: {}
  };
}

export function createBattleState(options = {}) {
  const seed = options.seed || 'VENCA-1899';
  const rng = options.rng || createRng(seed);
  const encounterId = options.encounterId || 'tutorial_1';
  const encounter = ENCOUNTERS[encounterId] || ENCOUNTERS.tutorial_1;

  const talismans = [...(options.talismans || [])];
  const maxQueueSlots = talismans.includes('wet_kerchief') ? MAX_QUEUE_SLOTS : QUEUE_SLOTS;

  const heroMaxHp = options.heroMaxHp || HERO_START_HP;
  const heroHp = Math.min(heroMaxHp, options.heroHp ?? heroMaxHp);

  const deckDefs = options.deck || [
    { id: 'oak_stake', upgradeLevel: 0, permanentCdReduction: 0 },
    { id: 'garlic_belch', upgradeLevel: 0, permanentCdReduction: 0 },
    { id: 'holy_syringe', upgradeLevel: 0, permanentCdReduction: 0 },
    { id: 'belly_vault', upgradeLevel: 0, permanentCdReduction: 0 }
  ];

  const hand = deckDefs.map((entry, idx) => {
    const def = getHeroTileDefinition(entry.id, entry.upgradeLevel || 0);
    const cdRed = entry.permanentCdReduction || 0;
    return {
      ...def,
      instanceId: `tile_${idx}_${entry.id}`,
      upgradeLevel: entry.upgradeLevel || 0,
      permanentCdReduction: cdRed,
      maxCooldown: Math.max(1, def.cooldown - cdRed),
      currentCooldown: 0,
      inQueue: false
    };
  });

  const boardSize = encounter.boardSize || BOARD_SIZE;
  const terrain = Array.from({ length: boardSize }, () => ({ type: 'none' }));

  const hero = {
    id: 'hero_venca',
    kind: 'venca',
    entityType: 'hero',
    name: 'Venca Česnekáč',
    givenName: 'Venca',
    epithet: 'Česnekáč',
    bodyScale: 'hero',
    sprite: 'hero.idle',
    maxHp: heroMaxHp,
    hp: heroHp,
    cell: encounter.heroCell ?? 2,
    facing: encounter.heroFacing ?? 1,
    flying: false,
    ichor: 'red',
    statuses: {}
  };

  const enemies = (encounter.initialEnemies || []).map((e) =>
    createEnemyInstance(e.enemyId, e.cell, e.facing ?? -1)
  );

  const occupiedCells = new Set([hero.cell, ...enemies.map((e) => e.cell)]);
  const props = [];

  if (encounter.props) {
    for (const p of encounter.props) {
      if (!occupiedCells.has(p.cell)) {
        props.push(createPropInstance(p.type, p.cell));
        occupiedCells.add(p.cell);
      }
    }
  }

  if (encounter.terrain) {
    for (const t of encounter.terrain) {
      if (t.cell >= 0 && t.cell < boardSize) {
        terrain[t.cell] = { type: t.type, duration: t.duration || 0 };
      }
    }
  }

  // If encounter didn't define explicit terrain or props, generate 1-2 seeded terrain elements
  if (!encounter.props && !encounter.terrain) {
    const preset = rng.pick(TERRAIN_PRESETS);
    if (preset) {
      for (const p of preset.props || []) {
        if (!occupiedCells.has(p.cell)) {
          props.push(createPropInstance(p.type, p.cell));
          occupiedCells.add(p.cell);
        }
      }
      for (const t of preset.terrain || []) {
        if (t.cell !== hero.cell && !occupiedCells.has(t.cell)) {
          terrain[t.cell] = { type: t.type, duration: t.duration || 0 };
        }
      }
    }
  }

  // Talisman: Cop moravského paličáku spawns garlic cloud under Venca at start of battle
  if (talismans.includes('garlic_braid')) {
    terrain[hero.cell] = { type: 'garlic_cloud', duration: GARLIC_CLOUD_DURATION };
  }

  const reinforcements = (encounter.reinforcements || []).map((r, idx) => ({
    id: `reinf_${idx}`,
    turnsRemaining: r.turnDelay,
    gateCell: r.gateCell,
    enemyId: r.enemyId,
    spawned: false
  }));

  const state = {
    seed,
    rng,
    encounterId: encounter.id,
    encounterName: encounter.name,
    boardSize,
    act: encounter.act || 1,
    isTutorial: Boolean(encounter.isTutorial),
    isElite: Boolean(encounter.isElite),
    isBoss: Boolean(encounter.isBoss),
    goldReward: encounter.goldReward || 18,
    turn: 1,
    status: 'playing', // 'playing' | 'won' | 'lost'
    maxQueueSlots,
    talismans,
    firstAttackUsed: false,
    lastTurnAspergillumTurn: -99,
    hero,
    enemies,
    props,
    terrain,
    hand,
    queue: [], // array of tile instanceIds
    reinforcements,
    log: [
      `⚔️ Bitva začíná: ${encounter.name}! Venca si odplivl a pozvedl krucifix.`
    ],
    stats: {
      turnsTaken: 0,
      damageDealt: 0,
      friendlyFireCount: 0,
      enemiesKilled: 0,
      combosExecuted: 0
    }
  };

  const bootEvents = [];
  for (const ent of [state.hero, ...state.enemies, ...state.props]) {
    if (ent && ent.hp > 0) triggerCellTerrainOnEnter(state, ent, ent.cell, bootEvents);
  }
  for (const ev of bootEvents) {
    if (ev.type === 'log' && ev.text) state.log.push(ev.text);
  }

  initializeAllEnemiesIntent(state);
  assertBoardInvariant(state);
  return state;
}

export function getSortedEnemiesByInitiative(state) {
  return state.enemies
    .filter((e) => e.hp > 0)
    .sort((a, b) => a.cell - b.cell);
}

// @ts-nocheck
export const TERRAIN_PRESETS = [
  { id: 'barrel_center', props: [{ type: 'barrel', cell: 4 }], terrain: [{ type: 'plank_intact', cell: 2 }] },
  { id: 'spikes_and_plank', props: [], terrain: [{ type: 'spikes', cell: 3 }, { type: 'plank_intact', cell: 5 }] },
  { id: 'pit_edge', props: [{ type: 'barrel', cell: 2 }], terrain: [{ type: 'pit', cell: 5 }] },
  { id: 'garlic_corridor', props: [{ type: 'barrel', cell: 3 }], terrain: [{ type: 'garlic_cloud', cell: 2, duration: 2 }, { type: 'spikes', cell: 5 }] },
  { id: 'twin_planks', props: [], terrain: [{ type: 'plank_intact', cell: 2 }, { type: 'plank_intact', cell: 4 }] },
  { id: 'pit_and_spikes', props: [{ type: 'barrel', cell: 4 }], terrain: [{ type: 'pit', cell: 1 }, { type: 'spikes', cell: 3 }] },
  { id: 'holy_chapel', props: [{ type: 'holy_font', cell: 3 }], terrain: [{ type: 'plank_intact', cell: 5 }] },
  { id: 'mirror_hall', props: [{ type: 'mirror', cell: 5 }], terrain: [{ type: 'spikes', cell: 2 }] },
  { id: 'sacred_font_and_mirror', props: [{ type: 'holy_font', cell: 2 }, { type: 'mirror', cell: 6 }], terrain: [] }
];

export const ENCOUNTERS = {
  tutorial_1: {
    id: 'tutorial_1',
    act: 1,
    name: 'Předhradí: Náves za humny',
    isTutorial: true,
    boardSize: 9,
    heroCell: 2,
    heroFacing: 1,
    initialEnemies: [
      { enemyId: 'kluk_kamen', cell: 5, facing: -1 },
      { enemyId: 'divocak', cell: 8, facing: -1 }
    ],
    props: [{ type: 'barrel', cell: 1 }],
    reinforcements: [
      { turnDelay: 4, gateCell: 8, enemyId: 'netopyr' }
    ],
    goldReward: 16
  },

  act1_battle_1: {
    id: 'act1_battle_1',
    act: 1,
    name: 'Zatuchlá hradní chodba',
    props: [{ type: 'holy_font', cell: 3 }],
    heroCell: 2,
    heroFacing: 1,
    initialEnemies: [
      { enemyId: 'srpak', cell: 4, facing: -1 },
      { enemyId: 'morak', cell: 6, facing: -1 }
    ],
    reinforcements: [
      { turnDelay: 3, gateCell: 6, enemyId: 'zombie_hynek' }
    ],
    goldReward: 18
  },

  act1_battle_2: {
    id: 'act1_battle_2',
    act: 1,
    name: 'Hradní spižírna u zelného sudu',
    boardSize: 9,
    heroCell: 1,
    heroFacing: 1,
    initialEnemies: [
      { enemyId: 'prase_mutant', cell: 5, facing: -1 },
      { enemyId: 'kyjovec', cell: 8, facing: -1 }
    ],
    terrain: [],
    reinforcements: [
      { turnDelay: 4, gateCell: 0, enemyId: 'buldok' }
    ],
    goldReward: 20
  },

  act1_elite: {
    id: 'act1_elite',
    act: 1,
    name: 'Černá kuchyně řeznice Boženy',
    isElite: true,
    heroCell: 2,
    heroFacing: 1,
    initialEnemies: [
      { enemyId: 'elite_drab', cell: 5, facing: -1 },
      { enemyId: 'sedlak_stit', cell: 3, facing: -1 }
    ],
    reinforcements: [
      { turnDelay: 3, gateCell: 6, enemyId: 'vlkodav' }
    ],
    goldReward: 30
  },

  act1_boss: {
    id: 'act1_boss',
    act: 1,
    name: 'Zrcadlový salón Arciknížete von Sosáka',
    isBoss: true,
    heroCell: 1,
    heroFacing: 1,
    initialEnemies: [
      { enemyId: 'boss_sosak', cell: 5, facing: -1 },
      { enemyId: 'netopyr', cell: 6, facing: -1 }
    ],
    props: [{ type: 'barrel', cell: 3 }, { type: 'mirror', cell: 7 }],
    terrain: [{ type: 'spikes', cell: 4 }],
    reinforcements: [
      { turnDelay: 4, gateCell: 0, enemyId: 'netopyr' },
      { turnDelay: 7, gateCell: 6, enemyId: 'kluk_kamen' }
    ],
    goldReward: 45
  },

  act2_battle_1: {
    id: 'act2_battle_1',
    act: 2,
    name: 'Strážnice u padací mříže',
    heroCell: 3,
    heroFacing: 1,
    initialEnemies: [
      { enemyId: 'halapartnik', cell: 5, facing: -1 },
      { enemyId: 'upirka_cilka', cell: 1, facing: 1 }
    ],
    reinforcements: [
      { turnDelay: 3, gateCell: 0, enemyId: 'upiri_trpaslik' }
    ],
    goldReward: 22
  },

  act2_battle_2: {
    id: 'act2_battle_2',
    act: 2,
    name: 'Starobylý archiv rodové krve',
    heroCell: 2,
    heroFacing: 1,
    initialEnemies: [
      { enemyId: 'hrabenka_amalie', cell: 0, facing: 1 },
      { enemyId: 'drevo', cell: 5, facing: -1 }
    ],
    reinforcements: [
      { turnDelay: 3, gateCell: 0, enemyId: 'sedlak_stit' },
      { turnDelay: 5, gateCell: 6, enemyId: 'vrhac_nozu' }
    ],
    goldReward: 24
  },

  act2_elite: {
    id: 'act2_elite',
    act: 2,
    name: 'Mučírna vrchního inkvizitora',
    isElite: true,
    heroCell: 2,
    heroFacing: 1,
    initialEnemies: [
      { enemyId: 'elite_urednik', cell: 5, facing: -1 },
      { enemyId: 'sliz', cell: 6, facing: -1 }
    ],
    reinforcements: [
      { turnDelay: 3, gateCell: 0, enemyId: 'krysa_piskota' }
    ],
    goldReward: 35
  },

  act2_boss: {
    id: 'act2_boss',
    act: 2,
    name: 'Krajkový budoár Hraběnky Dagmar',
    isBoss: true,
    heroCell: 2,
    heroFacing: 1,
    initialEnemies: [
      { enemyId: 'boss_dagmar', cell: 5, facing: -1 },
      { enemyId: 'sedlak_stit', cell: 4, facing: -1 }
    ],
    props: [{ type: 'barrel', cell: 3 }, { type: 'mirror', cell: 7 }],
    terrain: [{ type: 'plank_intact', cell: 4 }, { type: 'spikes', cell: 1 }],
    reinforcements: [
      { turnDelay: 4, gateCell: 6, enemyId: 'ucetni_buffer' },
      { turnDelay: 6, gateCell: 0, enemyId: 'netopyr' }
    ],
    goldReward: 55
  },

  act3_battle_1: {
    id: 'act3_battle_1',
    act: 3,
    name: 'Krypta zapomenutých hrobů',
    heroCell: 3,
    heroFacing: 1,
    initialEnemies: [
      { enemyId: 'sedlak_stit', cell: 5, facing: -1 },
      { enemyId: 'kostlivec_fabian', cell: 1, facing: 1 },
      { enemyId: 'bazinny_sliz', cell: 6, facing: -1 }
    ],
    reinforcements: [
      { turnDelay: 3, gateCell: 0, enemyId: 'morovy_felcar' }
    ],
    goldReward: 28
  },

  act3_battle_2: {
    id: 'act3_battle_2',
    act: 3,
    name: 'Předkomoří upířího sněmu',
    props: [{ type: 'mirror', cell: 5 }],
    heroCell: 2,
    heroFacing: 1,
    initialEnemies: [
      { enemyId: 'rytir_prizrak', cell: 4, facing: -1 },
      { enemyId: 'carodejnice', cell: 6, facing: -1 },
      { enemyId: 'upiri_trpaslik', cell: 0, facing: 1 }
    ],
    reinforcements: [
      { turnDelay: 3, gateCell: 0, enemyId: 'halapartnik' },
      { turnDelay: 5, gateCell: 6, enemyId: 'ucetni_buffer' }
    ],
    goldReward: 30
  },

  act3_elite: {
    id: 'act3_elite',
    act: 3,
    name: 'Sál nočního soudu',
    isElite: true,
    heroCell: 3,
    heroFacing: 1,
    initialEnemies: [
      { enemyId: 'elite_drab', cell: 5, facing: -1 },
      { enemyId: 'elite_urednik', cell: 1, facing: 1 }
    ],
    reinforcements: [
      { turnDelay: 4, gateCell: 6, enemyId: 'sliz' }
    ],
    goldReward: 42
  },

  act3_boss: {
    id: 'act3_boss',
    act: 3,
    name: 'Trůnní sál Hraběte Drákuly',
    isBoss: true,
    heroCell: 2,
    heroFacing: 1,
    initialEnemies: [
      { enemyId: 'boss_drakula', cell: 5, facing: -1 },
      { enemyId: 'ucetni_buffer', cell: 6, facing: -1 }
    ],
    props: [{ type: 'barrel', cell: 4 }],
    terrain: [{ type: 'pit', cell: 0 }, { type: 'spikes', cell: 3 }],
    reinforcements: [
      { turnDelay: 3, gateCell: 6, enemyId: 'upirske_prase' },
      { turnDelay: 5, gateCell: 6, enemyId: 'sedlak_stit' }
    ],
    goldReward: 100
  }
};

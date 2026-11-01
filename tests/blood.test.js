// @ts-nocheck
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  PALETTE,
  recordEntityHitBlood,
  renderCellGroundBloodHtml,
  renderSpriteBloodHtml,
  getGroundStains,
  getEntityStains,
  clearBattleBlood
} from '../src/game/ui/blood.js';
import { createBattleState, createEnemyInstance } from '../src/game/engine/state.js';
import { cloneBattleState } from '../src/game/engine/simulation.js';

test('Blood FX: 1. PALETTE supports rich ichor types (red, blue, green) and array indexing', () => {
  assert.ok(PALETTE.red);
  assert.ok(PALETTE.blue);
  assert.ok(PALETTE.green);

  // Array access compatibility
  assert.equal(typeof PALETTE.red[0], 'string');
  assert.equal(typeof PALETTE.blue[2], 'string');
  assert.equal(typeof PALETTE.green[4], 'string');

  // Rich metadata access
  assert.ok(PALETTE.red.stain);
  assert.ok(PALETTE.red.stainRim);
  assert.ok(PALETTE.blue.highlight);
  assert.ok(PALETTE.green.glow);
});

test('Blood FX: 2. Initial state includes clean blood data structures', () => {
  const state = createBattleState({ seed: 'BLOOD-TEST', encounterId: 'tutorial_1' });
  assert.deepEqual(state.cellBlood, {});
  assert.ok(Array.isArray(state.hero.bloodStains));
  assert.equal(state.hero.bloodStains.length, 0);

  const enemy = createEnemyInstance('praktikant', 4, -1);
  assert.ok(Array.isArray(enemy.bloodStains));
  assert.equal(enemy.bloodStains.length, 0);
});

test('Blood FX: 3. Damage records persistent blood on sprite and on ground', () => {
  clearBattleBlood();
  const state = createBattleState({ seed: 'BLOOD-TEST-2', encounterId: 'tutorial_1' });
  const enemy = state.enemies[0];
  assert.ok(enemy);
  enemy.cell = 3; // Put enemy adjacent to hero at cell 2

  // Enemy takes 3 damage from hunter at cell 2 to enemy at cell 3 (melee)
  recordEntityHitBlood(state, {
    targetId: enemy.id,
    attackerId: state.hero.id,
    cell: 3,
    attackerCell: state.hero.cell,
    amount: 3,
    ichor: enemy.ichor || 'blue',
    reason: 'attack',
    fatal: false
  });

  // Target enemy has accumulated blood stains on sprite
  assert.ok(enemy.bloodStains.length > 0, 'Enemy must have blood stains on sprite');
  const enemyStain = enemy.bloodStains[0];
  assert.equal(enemyStain.ichor, enemy.ichor || 'blue');
  assert.ok(['slash', 'splat', 'drip', 'cluster', 'arterial'].includes(enemyStain.type));

  // Ground on enemy cell has accumulated stains
  assert.ok(state.cellBlood[enemy.cell]?.length > 0, 'Cell floor must have blood stains');
  const groundStain = state.cellBlood[enemy.cell][0];
  assert.equal(groundStain.ichor, enemy.ichor || 'blue');
  assert.ok(groundStain.splats.length >= 2, 'Ground stain must have satellite splatters');
  assert.ok(Array.isArray(groundStain.drips), 'Ground stain must include stone-slab front drips array');

  // Heavy melee strike (amount >= 3) also splatters the cell behind the target (cell 4)
  assert.ok(state.cellBlood[4]?.length > 0, 'Heavy directional hit must splatter onto adjacent cell behind target');

  // Hunter (melee attacker) was sprayed with target ichor
  assert.ok(state.hero.bloodStains.length > 0, 'Hunter must receive blood spray from melee strike');
  const heroStain = state.hero.bloodStains[0];
  assert.equal(heroStain.ichor, enemy.ichor || 'blue');
});

test('Blood FX: 4. Renders SVG markup for ground and sprite blood', () => {
  const state = createBattleState({ seed: 'SVG-TEST', encounterId: 'tutorial_1' });
  const enemy = state.enemies[0];

  recordEntityHitBlood(state, {
    targetId: enemy.id,
    cell: enemy.cell,
    amount: 4,
    ichor: 'green',
    reason: 'attack'
  });

  // Ground blood SVG
  const groundHtml = renderCellGroundBloodHtml(enemy.cell, state);
  assert.ok(groundHtml.includes('<svg class="ground-blood-svg"'), 'Ground HTML must contain SVG');
  assert.ok(groundHtml.includes('<path d="M'), 'Ground SVG must contain organic Bezier puddle paths');
  assert.ok(groundHtml.includes('<ellipse'), 'Ground SVG must contain ellipses for puddles');

  // Sprite blood overlay
  const spriteHtml = renderSpriteBloodHtml(enemy, state);
  assert.ok(spriteHtml.includes('<div class="sprite-blood-overlay"'), 'Sprite HTML must have blood overlay container');
  assert.ok(spriteHtml.includes('<svg class="sprite-blood-svg"'), 'Sprite HTML must have SVG decal layer');
});

test('Blood FX: 5. Fatal hits create dramatic fatal wounds and large ground puddles', () => {
  clearBattleBlood();
  const state = createBattleState({ seed: 'FATAL-TEST', encounterId: 'tutorial_1' });
  const enemy = state.enemies[0];

  recordEntityHitBlood(state, {
    targetId: enemy.id,
    cell: enemy.cell,
    amount: 6,
    ichor: 'blue',
    reason: 'death',
    fatal: true
  });

  assert.ok(enemy.bloodStains.length >= 2, 'Fatal hit must leave multiple wounds on corpse');
  assert.ok(state.cellBlood[enemy.cell].length >= 2, 'Fatal hit must create large ground puddles');
  // Check that fatal ground stain has larger radius
  const maxRx = Math.max(...state.cellBlood[enemy.cell].map((s) => s.rx));
  assert.ok(maxRx >= 8, 'Fatal puddle must be large on the stone slab');
});

test('Blood FX: 6. cloneBattleState preserves cellBlood and bloodStains', () => {
  const state = createBattleState({ seed: 'CLONE-TEST', encounterId: 'tutorial_1' });
  const enemy = state.enemies[0];

  recordEntityHitBlood(state, {
    targetId: enemy.id,
    cell: enemy.cell,
    amount: 2,
    ichor: 'red',
    reason: 'attack'
  });

  const cloned = cloneBattleState(state);
  assert.ok(cloned.cellBlood[enemy.cell]);
  assert.equal(cloned.cellBlood[enemy.cell].length, state.cellBlood[enemy.cell].length);
  assert.equal(cloned.enemies[0].bloodStains.length, enemy.bloodStains.length);
});

test('Blood FX: 7. clearBattleBlood cleans up battle stains', () => {
  const state = createBattleState({ seed: 'CLEANUP-TEST', encounterId: 'tutorial_1' });
  recordEntityHitBlood(state, {
    targetId: state.hero.id,
    cell: 2,
    amount: 3,
    ichor: 'red',
    reason: 'attack'
  });

  assert.ok(getEntityStains(state.hero.id).length > 0);
  assert.ok(getGroundStains(2).length > 0);

  clearBattleBlood();
  assert.equal(getEntityStains(state.hero.id).length, 0);
  assert.equal(getGroundStains(2).length, 0);
});

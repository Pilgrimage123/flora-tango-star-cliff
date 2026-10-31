// @ts-nocheck
import { getStatusAmount, hasStatus, addStatus, applyDamage, isValidCell } from './board.js';
import { STRINGS } from '../config/strings.cs.js';
import { GARLIC_CLOUD_DURATION } from '../config/constants.js';

export function computeSlotBonuses(state, tile, slotIndex) {
  let dmgBonus = 0;

  // Talisman: Oak splinter gives +1 DMG to 3rd or 4th slot in queue
  if ((slotIndex === 2 || slotIndex === 3) && state.talismans?.includes('oak_splinter')) {
    dmgBonus += 1;
  }

  if (!state.firstAttackUsed && tile.type !== 'move' && state.talismans?.includes('brass_lantern')) {
    dmgBonus += 1;
  }

  if (hasStatus(state.hero, 'empower') && (tile.dmg > 0 || dmgBonus > 0)) {
    dmgBonus += getStatusAmount(state.hero, 'empower');
  }

  return {
    dmgBonus
  };
}

export function detectResonances(queueTiles) {
  if (!queueTiles || queueTiles.length < 2) return [];

  const counts = { garlic: 0, holy: 0, brawl: 0, craft: 0 };
  for (const t of queueTiles) {
    if (t?.tags && Array.isArray(t.tags)) {
      for (const tag of t.tags) {
        if (counts[tag] !== undefined) counts[tag] += 1;
      }
    }
  }

  const resonances = [];

  if (counts.garlic >= 2) {
    resonances.push({
      id: 'garlic_burst',
      name: 'Česnekový opar',
      icon: '🧄',
      tag: 'garlic',
      description: 'Zanechá Česnekový oblak na 2 tahy před Vencou.'
    });
  }

  if (counts.holy >= 2) {
    resonances.push({
      id: 'holy_shield',
      name: 'Posvátná ochrana',
      icon: '✝️',
      tag: 'holy',
      description: 'Uloží Vencovi 1 Štít před protiútokem.'
    });
  }

  if (counts.brawl >= 2) {
    resonances.push({
      id: 'brawl_force',
      name: 'Hospodská rvačka',
      icon: '🍺',
      tag: 'brawl',
      description: '+1 k dosahu všech odhození (Push) v tomto kombu.'
    });
  }

  if (counts.craft >= 2) {
    resonances.push({
      id: 'craft_reduction',
      name: 'Hodinářský fortel',
      icon: '⚙️',
      tag: 'craft',
      description: 'Zkrátí cooldown o 1 tah náhodné destičce na opasku.'
    });
  }

  if (counts.garlic >= 1 && counts.holy >= 1) {
    resonances.push({
      id: 'sanctified_mist',
      name: 'Posvěcený opar',
      icon: '✨',
      tag: 'dual',
      description: 'Zasáhne všechny sousední upíry za 1 DMG.'
    });
  }

  return resonances;
}

export function triggerComboResonances(state, queueTiles, events = []) {
  const resonances = detectResonances(queueTiles);
  if (resonances.length === 0) return resonances;

  const hero = state.hero;

  for (const res of resonances) {
    events.push({
      type: 'resonance_burst',
      resonanceId: res.id,
      name: res.name,
      icon: res.icon
    });

    if (res.id === 'garlic_burst') {
      const targetCell = hero.cell + hero.facing;
      if (isValidCell(targetCell, state)) {
        state.terrain[targetCell] = {
          type: 'garlic_cloud',
          duration: GARLIC_CLOUD_DURATION
        };
        events.push({
          type: 'terrain_spawn',
          terrainType: 'garlic_cloud',
          cell: targetCell
        });
        events.push({
          type: 'log',
          text: `🧄 Rezonance Česneku: Štiplavý opar zahalil pole ${targetCell + 1}!`
        });
      }
    } else if (res.id === 'holy_shield') {
      addStatus(hero, 'shield', 2, events);
      events.push({
        type: 'log',
        text: `✝️ Rezonance Svěcené vody: Venca získal posvátný Štít!`
      });
    } else if (res.id === 'brawl_force') {
      state.comboResonanceBonusPush = (state.comboResonanceBonusPush || 0) + 1;
      events.push({
        type: 'log',
        text: `🍺 Rezonance Hospody: Rány mají větší sílu (+1 pole k odhození)!`
      });
    } else if (res.id === 'craft_reduction') {
      const onCd = (state.hand || []).filter((t) => t.currentCooldown > 0);
      if (onCd.length > 0) {
        const picked = onCd[Math.floor(Math.random() * onCd.length)];
        picked.currentCooldown = Math.max(0, picked.currentCooldown - 1);
        events.push({
          type: 'log',
          text: `⚙️ Rezonance Řemesla: Důmyslné soukolí zkrátilo cooldown destičce „${picked.name}“!`
        });
      }
    } else if (res.id === 'sanctified_mist') {
      let hitAny = false;
      for (const enemy of state.enemies) {
        if (enemy.hp > 0 && Math.abs(enemy.cell - hero.cell) <= 1) {
          applyDamage(state, enemy, 2, { reason: 'sanctified_mist' }, events);
          hitAny = true;
        }
      }
      if (hitAny) {
        events.push({
          type: 'log',
          text: `✨ Posvěcený opar: Kombinace česneku a svěcené vody popálila sousední upíry za 2 DMG!`
        });
      }
    }
  }

  return resonances;
}

export function applyMomentumIfLastEnemyKilled(state, comboLength, events = []) {
  if (comboLength < 2) return false;
  const anyLivingEnemy = state.enemies.some((e) => e.hp > 0);
  const anyPendingReinforcement = state.reinforcements.some((r) => !r.spawned);
  if (anyLivingEnemy || anyPendingReinforcement) return false;

  for (const tile of state.hand) {
    if (tile.currentCooldown > 0) {
      tile.currentCooldown = Math.max(0, tile.currentCooldown - comboLength);
    }
  }

  events.push({
    type: 'momentum',
    comboLength,
    reduction: comboLength
  });
  events.push({
    type: 'log',
    text: `🔥 ${STRINGS.momentumQuotes[0]} (−${comboLength} CD všem destičkám)`
  });

  return true;
}

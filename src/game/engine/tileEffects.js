// @ts-nocheck
import { GARLIC_CLOUD_DURATION } from '../config/constants.js';
import {
  isValidCell,
  getEntityAt,
  findNearestEmptyCell,
  addStatus,
  applyDamage,
  pushEntity,
  pullEntity,
  triggerCellTerrainOnEnter,
  assertBoardInvariant,
  hitBlockFromEvents,
  effectSurvivesBlock
} from './board.js';
import { computeSlotBonuses } from './combo.js';

export function executeHeroTile(state, tile, slotIndex, comboLength, events = []) {
  if (!state.hero || state.hero.hp <= 0 || !tile) return;

  const bonuses = computeSlotBonuses(state, tile, slotIndex);
  const hero = state.hero;
  const empowerAtStart = hero.statuses?.empower || 0;

  events.push({
    type: 'tile_start',
    tileId: tile.id,
    instanceId: tile.instanceId,
    tileName: tile.name,
    slotIndex,
    heroId: hero.id,
    isStrike: tile.type === 'attack' || (tile.dmg || 0) > 0
  });

  // Self effects before attack
  if (tile.selfEffect) {
    addStatus(hero, tile.selfEffect.type, tile.selfEffect.amount || 1, events);
  }

  // Heal / Shield tile (e.g. Honzova povidlová buchta)
  if (tile.healAmount) {
    const missingHp = (hero.maxHp || 20) - hero.hp;
    const heal = Math.min(tile.healAmount, missingHp);
    if (heal > 0) {
      hero.hp += heal;
      events.push({
        type: 'heal',
        targetId: hero.id,
        amount: heal,
        hp: hero.hp
      });
      events.push({
        type: 'log',
        text: `🥟 ${hero.name} si zakousl do buchty a vyléčil se o ${heal} HP!`
      });
    }
    const overflow = tile.healAmount - heal;
    if (overflow > 0) {
      addStatus(hero, 'shield', overflow, events);
      events.push({
        type: 'log',
        text: `🛡️ Zbytek buchty dodal postavě ${hero.name} +${overflow} Štítu!`
      });
    }
  }

  if (tile.shieldAmount) {
    addStatus(hero, 'shield', tile.shieldAmount, events);
    events.push({
      type: 'log',
      text: `🛡️ ${hero.name} získal +${tile.shieldAmount} Štítu!`
    });
  }

  if (tile.cureStatus && hero.statuses?.[tile.cureStatus]) {
    delete hero.statuses[tile.cureStatus];
    events.push({
      type: 'status_cleared',
      targetId: hero.id,
      status: tile.cureStatus
    });
    events.push({
      type: 'log',
      text: `✨ ${hero.name} se zbavil stavu ${tile.cureStatus}!`
    });
  }

  // Movement / Leap tile (e.g. Hospodský přemet přes pupík)
  if (tile.leapDistance) {
    const startCell = hero.cell;
    if (tile.leaveGarlicCloud) {
      state.terrain[startCell] = {
        type: 'garlic_cloud',
        duration: GARLIC_CLOUD_DURATION
      };
      events.push({
        type: 'terrain_spawn',
        terrainType: 'garlic_cloud',
        cell: startCell
      });
      events.push({
        type: 'log',
        text: `🧄 Venca zanechal na poli ${startCell + 1} štiplavý Česnekový oblak!`
      });
    }

    const desiredCell = hero.cell + hero.facing * tile.leapDistance;
    const landingCell = findNearestEmptyCell(state, desiredCell, hero.facing, hero.id);

    if (landingCell !== null && landingCell !== hero.cell) {
      hero.cell = landingCell;
      events.push({
        type: 'leap',
        entityId: hero.id,
        from: startCell,
        to: landingCell
      });
      events.push({
        type: 'log',
        text: `🤸 ${tile.name}: Venca přeskočil z pole ${startCell + 1} na pole ${landingCell + 1}!`
      });
      triggerCellTerrainOnEnter(state, hero, landingCell, events);
      if (state.talismans?.includes('beer_frog')) {
        const hopDir = Math.sign(landingCell - startCell);
        let hopped = false;
        if (hopDir) {
          for (let c = startCell + hopDir; c !== landingCell; c += hopDir) {
            if (getEntityAt(state, c)) {
              hopped = true;
              break;
            }
          }
        }
        if (hopped) {
          addStatus(hero, 'shield', 1, events);
          events.push({
            type: 'log',
            text: '🐸 Pivní žába: Venca získal po přemetu Štít!'
          });
        }
      }
    }
  } else if (tile.stepBackward && hero.hp > 0) {
    const targetCell = hero.cell - hero.facing * tile.stepBackward;
    if (isValidCell(targetCell, state) && !getEntityAt(state, targetCell)) {
      const fromCell = hero.cell;
      hero.cell = targetCell;
      events.push({
        type: 'step',
        entityId: hero.id,
        from: fromCell,
        to: targetCell,
        facing: hero.facing
      });
      events.push({
        type: 'log',
        text: `🏃 ${tile.name}: Venca uskočil z pole ${fromCell + 1} vzad na pole ${targetCell + 1}!`
      });
      triggerCellTerrainOnEnter(state, hero, targetCell, events);
    } else {
      events.push({
        type: 'log',
        text: `🚫 ${tile.name}: Pole za Vencou je zablokováno!`
      });
    }
  } else if (tile.projectileRange) {
    // Projectile raycast: hits first non-hero entity in range
    let hitTarget = null;
    let hitPat = null;
    let hitCell = null;
    for (const pat of tile.pattern || []) {
      const c = hero.cell + hero.facing * pat.offset;
      if (!isValidCell(c, state)) break;
      hitCell = c;
      const occupant = getEntityAt(state, c);
      if (occupant && occupant.id !== hero.id) {
        hitTarget = occupant;
        hitPat = pat;
        break;
      }
    }

    events.push({
      type: 'projectile_vfx',
      from: hero.cell,
      to: hitCell ?? hero.cell,
      facing: hero.facing,
      tileId: tile.id
    });

    if (hitTarget && (hitTarget.kind === 'mirror' || hitTarget.reflectsProjectiles)) {
      events.push({
        type: 'projectile_reflect',
        mirrorId: hitTarget.id,
        cell: hitCell,
        fromFacing: hero.facing,
        toFacing: -hero.facing,
        tileId: tile.id
      });
      events.push({
        type: 'log',
        text: `🪞 Hradní zrcadlo pravdy odrazilo střelu „${tile.name}“ o 180° zpět!`
      });

      const reflectDir = -hero.facing;
      let reflectedTarget = null;
      let reflectedEndCell = hitCell;
      for (let offset = 1; offset <= (tile.projectileRange || 4); offset++) {
        const rc = hitCell + reflectDir * offset;
        if (!isValidCell(rc, state)) break;
        reflectedEndCell = rc;
        const occ = getEntityAt(state, rc);
        if (occ && occ.id !== hitTarget.id) {
          reflectedTarget = occ;
          break;
        }
      }

      events.push({
        type: 'projectile_vfx',
        from: hitCell,
        to: reflectedEndCell,
        facing: reflectDir,
        tileId: tile.id,
        reflected: true
      });

      if (reflectedTarget && hitPat) {
        resolveSinglePatternHit(state, tile, hitPat, reflectedTarget, bonuses, comboLength, events);
      } else {
        events.push({
          type: 'log',
          text: `💨 Odražená střela prolétla chodbou a nikoho nezasáhla.`
        });
      }
    } else if (hitTarget && hitPat) {
      resolveSinglePatternHit(state, tile, hitPat, hitTarget, bonuses, comboLength, events);
    } else {
      events.push({
        type: 'tile_whiff',
        tileId: tile.id,
        cell: hitCell ?? hero.cell
      });
      events.push({
        type: 'log',
        text: `💨 ${tile.name} prolétla prázdnou chodbou naprázdno.`
      });
    }
  } else {
    // Pattern melee / area hits
    let anyHit = false;
    const alreadyHit = new Set();
    for (const pat of tile.pattern || []) {
      const targetCell = hero.cell + hero.facing * pat.offset;
      if (!isValidCell(targetCell, state)) continue;

      events.push({
        type: 'strike_vfx',
        from: hero.cell,
        cell: targetCell,
        tileId: tile.id
      });

      // Terrain spawning effects that happen on the cell regardless of occupant
      for (const eff of pat.effects || []) {
        if (eff.type === 'spawn_spikes') {
          state.terrain[targetCell] = { type: 'spikes' };
          events.push({
            type: 'terrain_spawn',
            terrainType: 'spikes',
            cell: targetCell
          });
          events.push({
            type: 'log',
            text: `🗡️ Z podlahy na poli ${targetCell + 1} vyrazily naostřené kůly!`
          });
        } else if (eff.type === 'spawn_garlic_target') {
          state.terrain[targetCell] = {
            type: 'garlic_cloud',
            duration: GARLIC_CLOUD_DURATION
          };
          events.push({
            type: 'terrain_spawn',
            terrainType: 'garlic_cloud',
            cell: targetCell
          });
        }
      }

      const occupant = getEntityAt(state, targetCell);
      if (occupant && occupant.id !== hero.id && !alreadyHit.has(occupant.id)) {
        anyHit = true;
        alreadyHit.add(occupant.id);
        resolveSinglePatternHit(state, tile, pat, occupant, bonuses, comboLength, events);
      }
    }

    if (!anyHit && (tile.pattern || []).length > 0) {
      events.push({
        type: 'tile_whiff',
        tileId: tile.id,
        cell: hero.cell + hero.facing
      });
      events.push({
        type: 'log',
        text: `💨 ${tile.name} promáchla do prázdného vzduchu.`
      });
    }
  }

  const damaging = !tile.leapDistance && (
    (tile.dmg || 0) > 0 ||
    bonuses.dmgBonus > 0 ||
    (tile.pattern || []).some((pat) => (pat.dmg || 0) > 0)
  );
  if (damaging) {
    state.firstAttackUsed = true;
    const empowerApplied = empowerAtStart > 0 && ((tile.dmg || 0) > 0 || bonuses.dmgBonus > empowerAtStart);
    if (empowerApplied && hero.statuses?.empower) {
      const left = hero.statuses.empower - empowerAtStart;
      if (left > 0) hero.statuses.empower = left;
      else delete hero.statuses.empower;
    }
  }

  // Self-flip after tile (e.g., Facka růžencem)
  if (tile.selfFlipAfter && hero.hp > 0) {
    hero.facing = -hero.facing;
    events.push({
      type: 'turn',
      entityId: hero.id,
      facing: hero.facing,
      free: true
    });
    events.push({
      type: 'log',
      text: `🔄 Venca se po ráně otočil čelem ${hero.facing === 1 ? 'vpravo ▶' : 'vlevo ◀'}.`
    });
  }

  assertBoardInvariant(state);
}

function resolveSinglePatternHit(state, tile, pat, target, bonuses, comboLength, events) {
  const hero = state.hero;
  const hitDir = Math.sign(target.cell - hero.cell) || hero.facing;
  const isBackstab = Boolean(pat.backstabDmg && target.entityType === 'enemy' && target.facing === hero.facing);
  const baseDmg = isBackstab ? pat.backstabDmg : (pat.dmg || 0);
  if (isBackstab) {
    events.push({
      type: 'log',
      text: `🗡️ Zákeřný bod ze zálohy do zad postavy ${target.name} (${pat.backstabDmg} DMG)!`
    });
  }
  const totalDmg = Math.max(0, baseDmg + bonuses.dmgBonus);

  let block = null;
  if (totalDmg > 0) {
    const mark = events.length;
    const dealt = applyDamage(
      state,
      target,
      totalDmg,
      {
        type: 'direct',
        attackerId: hero.id,
        attackerCell: hero.cell,
        isComboHit: comboLength >= 2,
        reason: tile.id
      },
      events
    );
    block = hitBlockFromEvents(events, mark);
    state.stats.damageDealt = (state.stats.damageDealt || 0) + dealt;
  }

  // Execute pattern effects on surviving target
  const combinedEffects = [...(pat.effects || []), ...(isBackstab && pat.backstabEffects ? pat.backstabEffects : [])];
  for (const eff of combinedEffects) {
    if (target.hp <= 0) break;
    if (!effectSurvivesBlock(block, eff.type)) continue;

    switch (eff.type) {
      case 'push': {
        const extraPush = state.comboResonanceBonusPush || 0;
        pushEntity(state, target, hitDir, (eff.distance || 1) + extraPush, events);
        break;
      }
      case 'dispel_empower':
        if (target.statuses?.empower) {
          delete target.statuses.empower;
          events.push({
            type: 'status_cleared',
            targetId: target.id,
            status: 'empower'
          });
          events.push({
            type: 'log',
            text: `🧄 ${target.name} ztratil Zesílení (česnek mu vzal sílu)!`
          });
        }
        break;
      case 'pull':
        pullEntity(state, target, hero.cell, events);
        break;
      case 'flip_target':
        if (target.entityType === 'enemy') {
          target.facing = -target.facing;
          events.push({
            type: 'turn',
            entityId: target.id,
            facing: target.facing
          });
          events.push({
            type: 'log',
            text: `🔄 ${target.name} byl otočen čelem vzad!`
          });
        }
        break;
      case 'stun':
        addStatus(target, 'stun', eff.amount || 1, events);
        break;
      case 'bleed':
        addStatus(target, 'bleed', eff.amount || 2, events);
        break;
      case 'confusion':
        addStatus(target, 'confusion', eff.amount || 1, events);
        break;
      default:
        break;
    }
  }
}

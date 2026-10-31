import assert from 'node:assert/strict';
import { createRng } from '../src/game/engine/rng.js';
import {
  hasStatus,
  getStatusAmount,
  consumeStatus,
  assertBoardInvariant,
  pushEntity,
  pullEntity,
  triggerCellTerrainOnEnter
} from '../src/game/engine/board.js';
import { createBattleState, createEnemyInstance } from '../src/game/engine/state.js';
import {
  playerStep,
  playerTurnAround,
  playerEnqueueTile,
  playerEnqueueTileNoEnd,
  playerRemoveFromQueue,
  playerReorderQueue,
  playerExecuteFullQueueSync,
  endPlayerTurn
} from '../src/game/engine/rules.js';
import { computeBoardThreats } from '../src/game/engine/threat.js';
import { createNewRun, getAvailableNodes } from '../src/game/engine/run.js';
import { ichorForKind } from '../src/game/config/ichor.js';
import { applyDamage } from '../src/game/engine/board.js';

function createCleanTestBattle() {
  const state = createBattleState({
    seed: 'TEST-SEED-42',
    encounterId: 'tutorial_1'
  });
  state.enemies = [];
  state.props = [];
  state.reinforcements = [];
  state.boardSize = 7;
  state.terrain = Array.from({ length: 7 }, () => ({ type: 'none' }));
  state.hero.cell = 2;
  state.hero.facing = 1;
  state.hero.hp = 10;
  assertBoardInvariant(state);
  return state;
}

console.log('🧪 Spouštím testy herního enginu LOVEC UPÍRŮ...');

// 1. Invariant jedné entity na poli
{
  const state = createCleanTestBattle();
  state.enemies.push(createEnemyInstance('praktikant', 4, -1));
  assert.doesNotThrow(() => assertBoardInvariant(state));

  state.enemies.push(createEnemyInstance('urednik', 4, -1));
  assert.throws(() => assertBoardInvariant(state), /Invariant porušen/);
  console.log('  ✔ 1. Invariant jedné entity na poli ověřen');
}

// 2. Krok se zastaví o obsazené pole (žádný přeskok)
{
  const state = createCleanTestBattle();
  state.hero.cell = 2;
  const enemy = createEnemyInstance('praktikant', 3, -1);
  state.enemies.push(enemy);

  const resBlocked = playerStep(state, 1);
  assert.equal(resBlocked.ok, false);
  assert.equal(state.hero.cell, 2);
  assert.equal(enemy.cell, 3);

  const resFree = playerStep(state, -1);
  assert.equal(resFree.ok, true);
  assert.equal(state.hero.cell, 1);
  assert.notEqual(enemy.cell, state.hero.cell);
  assertBoardInvariant(state);
  console.log('  ✔ 2. Krok neprochází obsazeným polem');
}

// 3. Push s kolizemi (zeď i entita do entity +1 DMG oběma bez Staggeru)
{
  const state = createCleanTestBattle();
  const e1 = createEnemyInstance('drab', 4, -1);
  const e2 = createEnemyInstance('urednik', 5, -1);
  state.enemies.push(e1, e2);

  const initialHp1 = e1.hp;
  const initialHp2 = e2.hp;

  const events = [];
  pushEntity(state, e1, 1, 2, events);

  // e1 narazil do e2 na poli 5 -> oba dostanou 1 kolizní DMG (žádný Stagger)
  assert.equal(e1.cell, 4);
  assert.equal(e2.cell, 5);
  assert.equal(e1.hp, initialHp1 - 1);
  assert.equal(e2.hp, initialHp2 - 1);
  assert.equal(e1.statuses?.stagger || 0, 0);
  assert.equal(e2.statuses?.stagger || 0, 0);

  // Push do zdi na poli 6
  const eWall = createEnemyInstance('urednik', 6, -1);
  state.enemies = [eWall];
  const wallHpBefore = eWall.hp;
  pushEntity(state, eWall, 1, 1, []);
  assert.equal(eWall.hp, wallHpBefore - 1);
  assert.equal(eWall.statuses?.stagger || 0, 0);
  console.log('  ✔ 3. Push a kolize (entita i zeď s kolizním DMG, bez Staggeru) ověřeny');
}

// 4. Pull (přitáhne cíl těsně před útočníka)
{
  const state = createCleanTestBattle();
  state.hero.cell = 1;
  state.hero.facing = 1;
  const enemy = createEnemyInstance('urednik', 5, -1);
  state.enemies.push(enemy);

  pullEntity(state, enemy, state.hero.cell, []);
  assert.equal(enemy.cell, 2);
  assertBoardInvariant(state);
  console.log('  ✔ 4. Pull (přitažení před Vencu) ověřen');
}

// 5. Propast (okamžitá smrt pro chodící, létající netopýr přežije)
{
  const state = createCleanTestBattle();
  state.terrain[4] = { type: 'pit' };
  const walker = createEnemyInstance('praktikant', 3, -1);
  const flyer = createEnemyInstance('netopyr', 5, -1);
  state.enemies.push(walker, flyer);

  pushEntity(state, walker, 1, 1, []);
  assert.equal(walker.hp, 0);

  pushEntity(state, flyer, -1, 1, []);
  assert.equal(flyer.cell, 4);
  assert.equal(flyer.hp, 1);
  console.log('  ✔ 5. Propast (smrt vs. létající netopýr) ověřena');
}

// 6. Prohnilé prkno (1. stoupnutí zapraská, 2. stoupnutí se prolomí za 2 DMG)
{
  const state = createCleanTestBattle();
  state.terrain[3] = { type: 'plank_intact' };
  const e = createEnemyInstance('drab', 2, 1);
  state.enemies.push(e);
  const startHp = e.hp;

  // 1. stoupnutí -> praskne
  e.cell = 3;
  triggerCellTerrainOnEnter(state, e, 3, []);
  assert.equal(state.terrain[3].type, 'plank_cracked');
  assert.equal(e.hp, startHp);

  // 2. stoupnutí -> prolomí se a dá 2 DMG
  triggerCellTerrainOnEnter(state, e, 3, []);
  assert.equal(state.terrain[3].type, 'none');
  assert.equal(e.hp, startHp - 2);
  console.log('  ✔ 6. Prohnilé prkno (prasknutí a prolomení za 2 DMG) ověřeno');
}

// 7. Přepočet dosahu (Threat Overlay) při změně facing nepřítele
{
  const state = createCleanTestBattle();
  const enemy = createEnemyInstance('praktikant', 4, -1);
  enemy.queueState = 'ARMED_RED';
  enemy.actionQueue = ['intern_bite'];
  state.enemies.push(enemy);

  let threats = computeBoardThreats(state);
  assert.equal(threats[3].totalDmg, 1);
  assert.equal(threats[5].totalDmg, 0);

  // Otočíme nepřítele doprava -> ohrožené pole se okamžitě přepočítá na 5
  enemy.facing = 1;
  threats = computeBoardThreats(state);
  assert.equal(threats[3].totalDmg, 0);
  assert.equal(threats[5].totalDmg, 1);
  console.log('  ✔ 7. Dynamický přepočet Threat Overlay při otočení ověřen');
}

// 8. Friendly Fire (upír zasáhne jiného upíra při odpočtu 0)
{
  const state = createCleanTestBattle();
  state.hero.cell = 0;
  const attacker = createEnemyInstance('praktikant', 4, 1); // dívá se doprava na pole 5!
  attacker.queueState = 'ARMED_RED';
  attacker.actionQueue = ['intern_bite'];

  const victim = createEnemyInstance('urednik', 5, -1);
  victim.queueState = 'EMPTY';
  victim.actionQueue = [];
  const victimHpBefore = victim.hp;

  state.enemies.push(attacker, victim);

  const events = [];
  endPlayerTurn(state, events);

  assert.equal(victim.hp, victimHpBefore - 1);
  assert.equal(state.stats.friendlyFireCount, 1);
  assert.ok(events.some((ev) => ev.type === 'friendly_fire'));
  console.log('  ✔ 8. Friendly Fire mezi upíry ověřen');
}

// 9. Absence bonusů slotů (žádný Otevírák ani Zakončovák u destiček)
{
  const state = createBattleState({
    seed: 'SLOT-TEST',
    deck: [
      { id: 'holy_syringe', upgradeLevel: 0 },
      { id: 'funeral_shroud', upgradeLevel: 0 },
      { id: 'oak_stake', upgradeLevel: 0 }
    ]
  });
  state.enemies = [];
  state.props = [];
  state.reinforcements = [];
  state.hero.cell = 2;
  state.hero.facing = 1;

  // Ověříme, že destičky nemají definované žádné openerBonus ani finisherBonus
  assert.equal(state.hand[0].openerBonus, undefined);
  assert.equal(state.hand[2].finisherBonus, undefined);

  const target = createEnemyInstance('drab', 3, -1); // 7 HP, dívá se vlevo (-1)
  target.countdown = 9;
  target.nextAction = { type: 'idle' };
  state.enemies.push(target);

  // Vložíme 3 destičky do fronty bez mezitahů (Dráb by jinak výpadem odhodil Vencu)
  playerEnqueueTileNoEnd(state, state.hand[0].instanceId);
  playerEnqueueTileNoEnd(state, state.hand[1].instanceId);
  playerEnqueueTileNoEnd(state, state.hand[2].instanceId);

  const execRes = playerExecuteFullQueueSync(state);
  assert.equal(execRes.ok, true);
  // Stříkačka: 1 DMG. Plachta: dá Vencovi Empower (+1 DMG) a otočí cíl (facing 1). Kolík: 2 DMG base + 1 Empower = 3 DMG (žádný Zakončovák bonus!).
  // Celkem DMG = 1 + 3 = 4 DMG. Cíl 7 HP - 4 = 3 HP!
  assert.equal(target.hp, 3);
  assert.equal(target.facing, 1);
  console.log('  ✔ 9. Vyřazení bonusů slotů (žádné bonusy za Otevírák ani Zakončovák u destiček) ověřeno');
}

// 10. Momentum a vyhodnocení fronty při smrti cíle uprostřed komba
{
  const state = createBattleState({
    seed: 'MOMENTUM-TEST',
    deck: [
      { id: 'oak_stake', upgradeLevel: 0 },
      { id: 'garlic_belch', upgradeLevel: 0 },
      { id: 'holy_syringe', upgradeLevel: 0 }
    ]
  });
  state.enemies = [];
  state.props = [];
  state.reinforcements = [];
  state.hero.cell = 2;
  state.hero.facing = 1;

  // Nepřítel má jen 2 HP -> zemře hned po 1. destičce ve frontě, 2. a 3. destička nesmí spadnout a aktivuje se Momentum!
  const weakEnemy = createEnemyInstance('praktikant', 3, -1);
  weakEnemy.hp = 2;
  weakEnemy.countdown = 10;
  state.enemies.push(weakEnemy);

  playerEnqueueTile(state, state.hand[0].instanceId);
  playerEnqueueTile(state, state.hand[1].instanceId);

  const res = playerExecuteFullQueueSync(state);
  assert.equal(res.ok, true);
  assert.equal(weakEnemy.hp, 0);
  assert.equal(state.status, 'won');
  assert.ok(res.events.some((e) => e.type === 'momentum'));
  // Cooldown oak_stake (3) byl snížen o délku komba (2) a o 1 na konci tahu = 0!
  assert.equal(state.hand[0].currentCooldown, 0);
  console.log('  ✔ 10. Momentum a bezpečné dohrání komba po smrti cíle ověřeno');
}

// 11. Deterministický seed
{
  const rngA = createRng('HRAD-KOST-1901');
  const rngB = createRng('HRAD-KOST-1901');
  const seqA = Array.from({ length: 10 }, () => rngA.nextInt(1, 1000));
  const seqB = Array.from({ length: 10 }, () => rngB.nextInt(1, 1000));
  assert.deepEqual(seqA, seqB);

  const runA = createNewRun('HRAD-KOST-1901');
  const runB = createNewRun('HRAD-KOST-1901');
  assert.deepEqual(
    runA.map.nodes.map((n) => n.type),
    runB.map.nodes.map((n) => n.type)
  );
  console.log('  ✔ 11. Deterministický seed (RNG i generování mapy) ověřen');
}

// 12. Otočení v Česnekovém oblaku zdarma + vyjmutí z fronty zdarma
{
  const state = createCleanTestBattle();
  state.enemies.push(createEnemyInstance('praktikant', 6, -1));
  state.terrain[state.hero.cell] = { type: 'garlic_cloud', duration: 2 };
  const turnBefore = state.turn;
  const turnRes = playerTurnAround(state);
  assert.equal(turnRes.ok, true);
  assert.equal(turnRes.freeTurn, true);
  assert.equal(state.turn, turnBefore);

  // Vložení a vyjmutí z fronty
  playerEnqueueTile(state, state.hand[0].instanceId);
  assert.equal(state.queue.length, 1);
  const remRes = playerRemoveFromQueue(state, 0);
  assert.equal(remRes.ok, true);
  assert.equal(state.queue.length, 0);
  assert.equal(state.hand[0].inQueue, false);
  console.log('  ✔ 12. Otočení v česneku zdarma a vyjmutí destičky z fronty ověřeno');
}

// 13. Libovolné přerovnání kombo fronty bez ceny tahu (0 tahů)
{
  const state = createCleanTestBattle();
  state.enemies.push(createEnemyInstance('drab', 5, -1));

  // Enqueue three tiles
  const t0 = state.hand[0].instanceId;
  const t1 = state.hand[1].instanceId;
  const t2 = state.hand[2].instanceId;

  playerEnqueueTile(state, t0);
  playerEnqueueTile(state, t1);
  playerEnqueueTile(state, t2);

  assert.deepEqual(state.queue, [t0, t1, t2]);
  const turnBefore = state.turn;

  // Move tile from index 2 to index 0 (drag & drop to front)
  const reorderRes1 = playerReorderQueue(state, 2, 0);
  assert.equal(reorderRes1.ok, true);
  assert.equal(reorderRes1.freeTurn, true);
  assert.equal(state.turn, turnBefore); // 0 turn cost!
  assert.deepEqual(state.queue, [t2, t0, t1]);
  assert.ok(reorderRes1.events.some((e) => e.type === 'queue_reorder'));

  // Move tile from index 0 back to index 1
  const reorderRes2 = playerReorderQueue(state, 0, 1);
  assert.equal(reorderRes2.ok, true);
  assert.equal(state.turn, turnBefore); // still 0 turn cost!
  assert.deepEqual(state.queue, [t0, t2, t1]);

  // Invalid indices check
  const badRes = playerReorderQueue(state, 99, 0);
  assert.equal(badRes.ok, false);
  assert.deepEqual(state.queue, [t0, t2, t1]);

  console.log('  ✔ 13. Libovolné přerovnání kombo fronty bez ceny tahu (0 tahů) ověřeno');
}

// 14. Deterministická AI: priorita otočení při hráči za zády a krok vpřed při vzdálenosti > 1
{
  const state = createCleanTestBattle();
  state.hero.cell = 5;
  state.hero.facing = -1;

  // Nepřítel na poli 3 dívající se vlevo (-1), hráč je na poli 5 (za zády nepřítele!)
  const e = createEnemyInstance('praktikant', 3, -1);
  state.enemies.push(e);

  // Krok 1: Hráč čeká 1 tah -> Nepřítel se MUSÍ nejdříve otočit doprava (1)
  endPlayerTurn(state, []);
  assert.equal(e.facing, 1);
  assert.equal(e.cell, 3);

  // Krok 2: Nepřítel se dívá doprava, ale hráč je na poli 5 (vzdálenost 2, dosah kousnutí 1)
  // Nepřítel popojde o 1 pole vpřed na pole 4
  endPlayerTurn(state, []);
  assert.equal(e.cell, 4);
  assert.equal(e.facing, 1);

  // Krok 3: Nyní je hráč v dosahu 1 pole -> nepřítel připraví útok a uzamkne se do ARMED_RED
  endPlayerTurn(state, []);
  assert.equal(e.queueState, 'ARMED_RED');
  assert.ok(e.actionQueue.length >= 1);
  console.log('  ✔ 14. Deterministické polohování (otočení při hráči za zády, krok vpřed a arming) ověřeno');
}

// 15. ARMED_RED Lock-in: nepřítel neotáčí směr ani neuhýbá, odpálí kombo do telegrafovaných polí
{
  const state = createCleanTestBattle();
  state.hero.cell = 2;

  // Drábová Božena na poli 3 dívající se doleva (-1)
  const drab = createEnemyInstance('drab', 3, -1);
  drab.queueState = 'ARMED_RED';
  drab.actionQueue = ['windup_roar', 'drab_lunge']; // kombo: nápřah + výpad (2 DMG + push)
  state.enemies.push(drab);

  // Hráč skočí za záda drábové na pole 4 (swap nebo krok)
  state.hero.cell = 4;

  const events = [];
  endPlayerTurn(state, events);

  // Drábová Božena byla uzamčena v ARMED_RED doleva (-1)
  // Odpálila kombo doleva do prázdna/zdi (neotočila se na Vencu!)
  assert.equal(drab.facing, -1);
  assert.equal(drab.queueState, 'EMPTY');
  assert.equal(drab.actionQueue.length, 0);
  assert.equal(state.hero.hp, 10); // Venca neutrpěl žádné poškození, protože stál za ní!
  console.log('  ✔ 15. ARMED_RED Lock-in (odpálení do telegrafovaných polí bez dobrovolného otočení) ověřeno');
}

// 16. Dynamický přepočet zón zásahu na podlaze při nuceném posunu (Push / Swap)
{
  const state = createCleanTestBattle();
  state.hero.cell = 0;

  // Nepřítel na poli 3 v ARMED_RED dívající se doprava (+1) s úderem na 1 pole
  const e = createEnemyInstance('praktikant', 3, 1);
  e.queueState = 'ARMED_RED';
  e.actionQueue = ['intern_bite'];
  state.enemies.push(e);

  // Původní telegrafovaná zóna na podlaze je pole 4
  let threats = computeBoardThreats(state);
  assert.equal(threats[4].isArmedRed, true);
  assert.equal(threats[4].totalDmg, 1);
  assert.equal(threats[2].isArmedRed, false);

  // Hráč nepřítele násilně odstrčí o 1 pole doprava (pushEntity)
  pushEntity(state, e, 1, 1, []);
  assert.equal(e.cell, 4);
  assert.equal(e.facing, 1); // Směr zůstává uzamčen
  assert.equal(e.queueState, 'ARMED_RED'); // Stav ARMED_RED přetrvává

  // Zóna zásahu se okamžitě přepočítá relativně k nové pozici -> pole 5!
  threats = computeBoardThreats(state);
  assert.equal(threats[4].isArmedRed, false);
  assert.equal(threats[5].isArmedRed, true);
  assert.equal(threats[5].totalDmg, 1);
  console.log('  ✔ 16. Dynamický přepočet zón zásahu při nuceném posunu ověřen');
}

// 17. Přerušení a pozdržení odpalu fronty omráčením (Stun)
{
  const state = createCleanTestBattle();
  state.hero.cell = 2;

  const e = createEnemyInstance('praktikant', 3, -1);
  e.queueState = 'ARMED_RED';
  e.actionQueue = ['intern_bite'];
  state.enemies.push(e);

  // Udělíme nepříteli omráčení (Stun) před vyhodnocením jeho tahu
  e.statuses.stun = 1;

  const events = [];
  endPlayerTurn(state, events);

  // Nepřítel byl omráčen: neodpálil frontu, fronta zůstala zachována a byla pozdržena!
  assert.equal(state.hero.hp, 10);
  assert.equal(e.queueState, 'ARMED_RED');
  assert.equal(e.actionQueue.length, 1);
  assert.ok(events.some((ev) => ev.type === 'enemy_stun_skipped'));
  console.log('  ✔ 17. Pozdržení odpalu fronty omráčením (Stun) ověřeno');
}

// 18. Umístění destičky do fronty stojí 1 tah (synchronní tahový systém)
{
  const state = createCleanTestBattle();
  const enemy = createEnemyInstance('praktikant', 5, -1);
  state.enemies.push(enemy);

  const turnBefore = state.turn;
  const tileId = state.hand[0].instanceId;

  const res = playerEnqueueTile(state, tileId);
  assert.equal(res.ok, true);
  assert.equal(res.freeTurn, false); // Stojí 1 tah!
  assert.equal(state.turn, turnBefore + 1); // Tah herního světa postoupil
  assert.equal(state.queue.length, 1);
  console.log('  ✔ 18. Umístění destičky do fronty stojí 1 tah (a posouvá tah nepřátel) ověřeno');
}

// 19. Okamžité odpálení fronty hráčem (žádný přípravný tah, okamžitý odpal)
{
  const state = createCleanTestBattle();
  const enemy = createEnemyInstance('drab', 5, -1);
  state.enemies.push(enemy);

  // Vložíme 1 destičku do fronty (stojí 1 tah)
  playerEnqueueTile(state, state.hand[0].instanceId);
  assert.equal(state.queue.length, 1);

  // Okamžitý odpal bez nutnosti přípravného tahu!
  const execRes = playerExecuteFullQueueSync(state);
  assert.equal(execRes.ok, true);
  assert.equal(state.queue.length, 0);
  console.log('  ✔ 19. Okamžité odpálení fronty hráčem (bez nutnosti přípravy) ověřeno');
}

// 20. Vyřazení mechaniky Stagger ze hry
{
  const state = createCleanTestBattle();
  const enemy = createEnemyInstance('praktikant', 4, -1);
  state.enemies.push(enemy);

  // Status stagger nesmí existovat
  const { STATUSES } = await import('../src/game/config/statuses.js');
  assert.equal(STATUSES.stagger, undefined);

  // addStatus se staggerem nesmí nic přidat ani změnit
  const { addStatus } = await import('../src/game/engine/board.js');
  addStatus(enemy, 'stagger', 1, []);
  assert.equal(enemy.statuses?.stagger || 0, 0);
  console.log('  ✔ 20. Kompletní vyřazení mechaniky Stagger ověřeno');
}

// 21. Žádná blesková reakce — před odpalem stihneš jednu normální akci
{
  const state = createCleanTestBattle();
  state.hero.cell = 4;
  state.hero.hp = 10;

  const enemy = createEnemyInstance('praktikant', 3, 1);
  enemy.queueState = 'ARMED_RED';
  enemy.actionQueue = ['intern_bite'];
  state.enemies.push(enemy);

  // Obyčejný krok vpravo (ne popup) tě dostane z linie dřív, než úder dopadne
  const stepped = playerStep(state, 1);
  assert.equal(stepped.ok, true);
  assert.equal(state.hero.cell, 5);
  assert.equal(state.hero.hp, 10);
  assert.ok(!stepped.events.some((ev) => ev.type === 'player_reaction'));

  // Když zůstaneš stát, úder dopadne. Staré pendingReaction se ignoruje.
  const state2 = createCleanTestBattle();
  state2.hero.cell = 4;
  state2.hero.hp = 10;
  const enemy2 = createEnemyInstance('praktikant', 3, 1);
  enemy2.queueState = 'ARMED_RED';
  enemy2.actionQueue = ['intern_bite'];
  state2.enemies.push(enemy2);
  state2.pendingReaction = 'parry';
  const events2 = [];
  endPlayerTurn(state2, events2);
  assert.equal(state2.hero.cell, 4);
  assert.equal(state2.hero.hp, 9);
  assert.equal(state2.hero.statuses?.shield || 0, 0);
  assert.ok(!events2.some((ev) => ev.type === 'player_reaction'));
  console.log('  ✔ 21. Před odpalem je jen jedna normální akce, blesková reakce je pryč');
}

// 22. Barva krve: lidé červená, upíři modrá, mutanti zelená
{
  assert.equal(ichorForKind('venca', 'hero'), 'red');
  assert.equal(ichorForKind('barrel', 'prop'), null);
  assert.equal(ichorForKind('kluk_kamen', 'enemy'), 'red');
  assert.equal(ichorForKind('vrhac_nozu', 'enemy'), 'red');
  assert.equal(ichorForKind('divocak', 'enemy'), 'red');
  assert.equal(ichorForKind('drevo', 'enemy'), 'red');
  assert.equal(ichorForKind('carodejnice', 'enemy'), 'red');
  assert.equal(ichorForKind('praktikant', 'enemy'), 'blue');
  assert.equal(ichorForKind('hrabenka_amalie', 'enemy'), 'blue');
  assert.equal(ichorForKind('upirka_cilka', 'enemy'), 'blue');
  assert.equal(ichorForKind('upirske_prase', 'enemy'), 'blue');
  assert.equal(ichorForKind('boss_drakula', 'enemy'), 'blue');
  assert.equal(ichorForKind('netopyr', 'enemy'), 'blue');
  assert.equal(ichorForKind('sliz', 'enemy'), 'green');
  assert.equal(ichorForKind('morak', 'enemy'), 'green');
  assert.equal(ichorForKind('prase_mutant', 'enemy'), 'green');
  assert.equal(ichorForKind('bazinny_sliz', 'enemy'), 'green');
  assert.equal(ichorForKind('rytir_prizrak', 'enemy'), 'green');
  assert.equal(ichorForKind('upiri_trpaslik', 'enemy'), 'blue');
  assert.equal(ichorForKind('zombie_hynek', 'enemy'), 'green');
  assert.equal(ichorForKind('kostlivec_fabian', 'enemy'), 'green');
  assert.equal(ichorForKind('krysa_piskota', 'enemy'), 'green');
  assert.equal(ichorForKind('morovy_felcar', 'enemy'), 'green');
  assert.equal(createEnemyInstance('prase_mutant', 4, -1).ichor, 'green');
  assert.equal(createEnemyInstance('upiri_trpaslik', 1, 1).bodyScale, 'small');
  assert.equal(createEnemyInstance('kluk_kamen', 4, -1).bodyScale, 'small');
  assert.equal(createEnemyInstance('krysa_piskota', 6, -1).bodyScale, 'critter');
  assert.equal(createEnemyInstance('zombie_hynek', 5, -1).bodyScale, 'human');
  assert.equal(createEnemyInstance('kostlivec_fabian', 1, 1).maxHp, 4);
  assert.equal(createEnemyInstance('morovy_felcar', 6, -1).ichor, 'green');
  assert.equal(createEnemyInstance('rytir_prizrak', 4, -1).frontShield, true);

  const heroState = createBattleState({ seed: 'ICHOR', encounterId: 'tutorial_1' });
  assert.equal(heroState.hero.ichor, 'red');
  assert.equal(createEnemyInstance('sliz', 3, -1).ichor, 'green');
  assert.equal(createEnemyInstance('hrabenka_amalie', 4, -1).ichor, 'blue');

  const state = createCleanTestBattle();
  const slime = createEnemyInstance('sliz', 4, -1);
  state.enemies.push(slime);
  const events = [];
  applyDamage(state, slime, 2, { attackerId: state.hero.id, attackerCell: state.hero.cell, reason: 'oak_stake', type: 'direct' }, events);
  const hit = events.find((ev) => ev.type === 'damage');
  assert.equal(hit.ichor, 'green');
  assert.equal(hit.attackerCell, state.hero.cell);
  assert.equal(hit.amount, 2);
  console.log('  ✔ 22. Barva krve podle druhu (červená / modrá / zelená) ověřena');
}


// 23. Rychlovka (quick: true) umožňuje vložení do fronty zdarma (0 tahů)
{
  const state = createCleanTestBattle();
  const enemy = createEnemyInstance('praktikant', 5, -1);
  state.enemies.push(enemy);

  state.hand[0].quick = true;
  const turnBefore = state.turn;
  const res = playerEnqueueTile(state, state.hand[0].instanceId);
  assert.equal(res.ok, true);
  assert.equal(res.freeTurn, true);
  assert.equal(state.turn, turnBefore); // Tah herního světa nepostoupil!
  assert.equal(state.queue.length, 1);
  assert.equal(state.hand[0].inQueue, true);
  console.log('  ✔ 23. Rychlovka (quick: true) umožňuje vložení do fronty zdarma (0 tahů) ověřeno');
}

// 24. Datová struktura nepřátel (actionPool, actionQueue, bez legacy queue) a helpery statusů
{
  const enemy = createEnemyInstance('praktikant', 4, -1);
  assert.equal(enemy.queue, undefined, 'Legacy queue nesmí existovat');
  assert.equal(enemy.queueIndex, undefined, 'Legacy queueIndex nesmí existovat');
  assert.ok(Array.isArray(enemy.actionPool), 'actionPool musí být pole');
  assert.ok(Array.isArray(enemy.actionQueue), 'actionQueue musí být pole');
  assert.equal(enemy.queueState, 'EMPTY', 'Počáteční stav fronty je EMPTY');
  assert.equal(typeof enemy.comboCapacity, 'number', 'comboCapacity musí být číslo');

  // Test status helpers
  assert.equal(hasStatus(enemy, 'stun'), false);
  assert.equal(getStatusAmount(enemy, 'stun'), 0);

  enemy.statuses = { stun: 2, empower: 3 };
  assert.equal(hasStatus(enemy, 'stun'), true);
  assert.equal(getStatusAmount(enemy, 'stun'), 2);
  assert.equal(getStatusAmount(enemy, 'empower'), 3);

  const consumed = consumeStatus(enemy, 'stun', 1);
  assert.equal(consumed, 1);
  assert.equal(getStatusAmount(enemy, 'stun'), 1);

  consumeStatus(enemy, 'stun', 1);
  assert.equal(hasStatus(enemy, 'stun'), false);
  assert.equal(enemy.statuses.stun, undefined, 'Stun status musí být smazán po spotřebování');

  console.log('  ✔ 24. Datová struktura nepřátel a helpery statusů (has/get/consume) ověřeny');
}

// 25. Pohybové události (move eventy) obsahují správný počáteční i cílový bod pro plynulý posun (Slide)
{
  const state = createCleanTestBattle();
  state.hero.cell = 2;
  state.hero.facing = 1;

  const res = playerStep(state, 1);
  assert.equal(res.ok, true);
  const moveEv = res.events.find((e) => e.type === 'move' && e.entityId === state.hero.id);
  assert.ok(moveEv, 'Move event musí existovat');
  assert.equal(moveEv.from, 2, 'Výchozí pole musí být 2');
  assert.equal(moveEv.to, 3, 'Cílové pole musí být 3');
  assert.equal(moveEv.facing, 1, 'Směr otočení musí být 1');
  console.log('  ✔ 25. Pohybové události pro plynulý posun (Slide) ověřeny');
}

// 26. Dálkové střely emitují projectile_vfx pro animaci dráhy letu
{
  const state = createCleanTestBattle();
  const enemy = createEnemyInstance('urednik', 5, -1);
  state.enemies.push(enemy);

  // Vybavíme hrdinovi stříkačku
  state.hand.push({
    instanceId: 'test_syringe',
    id: 'holy_syringe',
    name: 'Svěcená stříkačka',
    type: 'attack',
    dmg: 2,
    projectileRange: 3,
    pattern: [
      { offset: 1, dmg: 2, projectile: true },
      { offset: 2, dmg: 2, projectile: true },
      { offset: 3, dmg: 2, projectile: true }
    ],
    cooldown: 2,
    currentCooldown: 0,
    inQueue: false
  });

  state.queue = ['test_syringe'];
  const res = playerExecuteFullQueueSync(state);
  const projEv = res.events.find((e) => e.type === 'projectile_vfx');
  assert.ok(projEv, 'projectile_vfx událost musí být emitována při dálkové střele');
  assert.equal(projEv.from, 2);
  assert.equal(projEv.to, 5);
  assert.equal(projEv.tileId, 'holy_syringe');
  console.log('  ✔ 26. Dálkové střely a emise projectile_vfx pro animaci dráhy letu ověřeny');
}

// 27. Okované půllitry (hobnailed_boots): nepřátelé utrží +1 kolizní DMG, ale Venca je chráněn před bonusem na sobě
{
  const state = createCleanTestBattle();
  state.talismans = ['hobnailed_boots'];

  // Nepřítel do zdi: 1 (základ) + 1 (hobnailed_boots) = 2 DMG
  const enemy = createEnemyInstance('urednik', 6, -1);
  state.enemies = [enemy];
  const enemyHpBefore = enemy.hp;
  pushEntity(state, enemy, 1, 1, []);
  assert.equal(enemy.hp, enemyHpBefore - 2, 'Nepřítel v okovaných botách musí utržit +1 kolizní bonus (celkem 2 DMG)');

  // Venca do zdi: pouze 1 DMG (základ), žádný self-inflicted bonus
  state.hero.cell = 0;
  const heroHpBefore = state.hero.hp;
  pushEntity(state, state.hero, -1, 1, []);
  assert.equal(state.hero.hp, heroHpBefore - 1, 'Hrdina nesmí utržit zvýšené poškození od vlastního talismanu');

  console.log('  ✔ 27. Okované půllitry dávají +1 DMG nepřátelům, ale neubližují Vencovi');
}

// 28. getAvailableNodes zamezuje přeskočení nedokončené bitvy
{
  const run = createNewRun('MAP-TEST-SEED');
  run.currentNodeId = null;
  run.completedNodeIds = [];

  // 1. Zpočátku je dostupný jen vstupní uzel (tier 0)
  const initialNodes = getAvailableNodes(run);
  assert.equal(initialNodes.length, 1);
  assert.equal(initialNodes[0].tier, 0);

  // 2. Po vstupu do uzlu 0, ale před jeho vyhráním (stále probíhá bitva), nesmí být dostupné žádné další uzly
  run.currentNodeId = initialNodes[0].id;
  const duringBattleNodes = getAvailableNodes(run);
  assert.equal(duringBattleNodes.length, 0, 'Během neukončené bitvy nesmí být povolen výběr dalších uzlů na mapě');

  // 3. Teprve po dokončení uzlu (přidání do completedNodeIds) se odemknou navazující uzly patra 1
  run.completedNodeIds.push(run.currentNodeId);
  const unlockedNodes = getAvailableNodes(run);
  assert.equal(unlockedNodes.length, 2);
  assert.ok(unlockedNodes.every((n) => n.tier === 1));

  console.log('  ✔ 28. getAvailableNodes chrání před přeskočením nedokončené bitvy');
}

console.log('✅ VŠECH 28 TESTOVACÍCH SAD ÚSPĚŠNĚ PROŠLO!');




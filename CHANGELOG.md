# Changelog

Veškeré významné změny v projektu Lovec upírů jsou zaznamenány v tomto souboru.

Formát vychází z [Keep a Changelog](https://keepachangelog.com/cs/1.1.0/).

## [1.3.0] - 2026-10-30

### Opraveno
- **Běhové prostředí a multiplatformní kompatibilita**:
  - Opraveno volání `spawn` v `scripts/with-app-env.mjs` pro Windows (`shell: process.platform === 'win32'`), umožňující spolehlivé spuštění `vite dev` i `vite build`.
  - Přesunuta direktiva `// @ts-nocheck` v `src/game/engine/combo.js` na první řádek, opraven pád typové kontroly `tsc --noEmit`.
  - Opraveno poškozené kódování textů (mojibake) v hlášeních kroniky v `src/game/engine/spawner.js` a `src/game/engine/tileEffects.js`.
- **Vizuální synchronizace a animace na bojišti**:
  - Opravena trajektorie letících projektilů v `playProjectileFly` — nahrazen nesprávný fixní offset `-22px` přesným dynamickým centrovaným posunem `translate(calc(-50% + dx), calc(-50% + dy))`.
  - Doplněno zpracování událostí posunu `push_move` a `pull_move` (odhození a přitažení entit na bojišti) v `playEngineEvents` pro plynulý slide animovaný pohyb.
  - Doplněna vizuální zpětná vazba a plovoucí hlášení pro události `pit_fall` (pád do propasti), `barrel_break` (rozbití sudu) a `plank_collapse` (prolomení prkna).
  - V `startHeroIdle` zohledněn zámek `heroPoseLocked`, aby průběžná volání překreslení nepřerušovala aktivní animace úderu či zranění hrdiny.
  - Zajištěno zobrazení padlého hrdiny v `corpseAt` i po úklidu těl nepřátel.
- **Kvalita kódu a linter**:
  - Obaleny switch větve (`damage`, `heal`, `death`) blokovými závorkami pro eliminaci chyb `no-case-declarations`.
  - Odstraněny nepoužívané importy a mrtvý kód v `src/game/ui/renderer.js`, `src/game/engine/rules.js`, `src/game/main.js`, `src/game/ui/blood.js` a `tests/engine.test.js`.
  - Upravena konfigurace ESLint pro podporu povolených prázdných catch bloků v podpůrných knihovnách a vypnutí striktního zákazu `@ts-nocheck` v čistě JS souborech hry.

### Přidáno
- **Integrované testování enginu**:
  - Začlenění 26 testovacích sad z `tests/engine.test.js` přímo do skriptu `npm test`.

## [1.2.0] - 2026-10-30

### Přidáno
- **Vizuální efekty letících projektilů**:
  - Implementována funkce `playProjectileFly` pro události `projectile_vfx` a `enemy_projectile_vfx`.
  - Tematické letící ikony (💉 stříkačka, 💮 razítko, ✝️ krucifix, 📜 upomínka, 🦴 kost, ☣️ miasma) po ose bojiště mezi střelcem a cílem s plynulou trajektorií.
- **Plynulý posun (Slide) a směrové animace kroku**:
  - Funkce `playEntityMove` v `src/game/ui/renderer.js` a CSS animace `.anim-walk-back` (`walkStepBack`) v `src/game/styles/animations.css`.
  - Posun rozlišuje směr kroku vůči otočení postavy (krok vpřed vs. ústup vzad) a plynule přejíždí přes kamenné desky bojiště (`.entity-sliding`).
- **Nová doménová dokumentace a testy**:
  - `docs/adr/0003-event-driven-visual-synchronization-and-animation-lifecycle.md` — architektonické rozhodnutí k synchronizaci událostí a životnímu cyklu animací na bojišti.
  - Doplnění pojmů do `GLOSSARY.md`: *Póza hrdiny (Hero Pose)*, *Dráha střely (Projektil)*, *Plynulý posun (Slide)*.
  - Rozšíření testovací sady v `tests/engine.test.js` na 26 sad (pokrytí parametrů pohybu pro slide a dálkových střel `projectile_vfx`).

### Změněno
- **Událostmi řízená synchronizace stavu bojiště**:
  - Odstraněno předčasné volání `renderAll()` v `src/game/battle.js` před odehráním animací.
  - Inkrementální aktualizace ukazatele HP a textu zdraví zasažených entit v reálném čase přímo v DOMu během událostí `damage` a `heal`.
  - Kompletní strukturální překreslení bojiště (`renderAll()`) probíhá až po dokončení animací v daném kroku/tahu.
- **Vyhlazení CSS klíčových snímků**:
  - `boundStep` (krok bestií a potvor) nyní plynule dosedá zpět do `scale(1, 1)` bez skokového škubnutí.
  - Doplněna plná podpora `prefers-reduced-motion` a škálování podle nastavení rychlosti `animSpeed` pro projektily a posuny.

### Opraveno
- **Životní cyklus póz Venci a zobrazení padlého hrdiny**:
  - Opraveno zasekávání Venci v pózách `attack` a `hurt`; zaveden automatický návrat do `idle` přes `scheduleHeroIdle`.
  - Zabráněno nežádoucímu vzkříšení Venci do živého stavu po jeho porážce (`startHeroIdle` padlého hrdinu nepřebíjí, Venca zůstává v póze `hero.dead`).
  - Odstraněno duplicitní spouštění nápřahu `anim-lunge` při zásahu hrdinou.

## [1.1.0] - 2026-10-30

### Přidáno
- **Doménová dokumentace a ADR**:
  - `GLOSSARY.md` — závazný slovník pojmů (Bojiště, Tah, Krok, Výstroj / Arzenál, Fronta komba, Rychlovka, Odpal komba, ARMED_RED, Friendly Fire, Momentum, Kolize, Omráčení).
  - `docs/adr/0001-queue-direct-execution-and-synchronous-pacing.md` — architektonické rozhodnutí k okamžitému odpalu komba bez nutnosti přípravného tahu.
  - `docs/adr/0002-action-pool-and-arsenal-data-structure.md` — sjednocení akčního modelu nepřátel (`actionPool` + `actionQueue`) a formalizace konceptu Výstroje (Arzenálu).
- **Mechanika Rychlovka (`quick: true`)**:
  - Plná podpora v enginu (`playerEnqueueTileNoEnd` / `playerEnqueueTile`), umožňující vložení vybraných destiček do fronty komba zdarma bez spotřeby tahu světa (`freeTurn: true`).
- **Centrální správa statusů**:
  - Funkce `hasStatus`, `getStatusAmount` a `consumeStatus` v `src/game/engine/board.js` pro bezpečné čtení, odečítání a automatické promazávání vyčerpaných statusů.
- **Testovací pokrytí**:
  - Rozšíření nativní testovací sady `tests/engine.test.js` na 24 komplexních testovacích sad (pokrytí Rychlovky, čistoty datových struktur nepřátel a fungování helperů statusů).

### Změněno
- **Optimalizace assetů a grafiky**:
  - Drastická redukce velikosti složky `public/assets/` z 27.5 MB na 11.5 MB (úspora 16 MB).
  - Resampling a downscale 20 nadrozměrných textur nepřátel a postav na max 512px se zachováním 32-bitové RGBA průhlednosti.
  - Optimalizace pozadí `naves-yard.jpg` (2752×1536 na 1920×1072, JPEG q85).
  - Doplnění registrace chybějících klíčů scén v `public/assets/manifest.json`.
- **Refaktoring modelu nepřátel a AI**:
  - Sjednocení nepřátel na moderní model `actionPool` (dostupné schopnosti a cooldowny), `actionQueue` (naplánované akce) a `queueState` (`EMPTY`, `QUEUING_GRAY`, `ARMED_RED`).
  - Vyčištění logiky v `threat.js` a `enemyAI.js` od duplicitních větví starého cyklického systému.
- **Pravidla a tempo hry**:
  - Běžný krok je striktně blokován obsazeným polem (přeskakovat může výhradně manévr typu `Hospodský přemet`).
  - Zrušen mrtvý kód přípravy fronty (`playerPrepareQueue`, `isQueuePrepared`) a nepoužívané CSS třídy.
  - Odstraněn mrtvý kód pro poziční bonusy slotů a bonusové otočení cíle (`bonuses.flipTarget`).

### Odstraněno
- Smazány osiřelé a nepoužívané textury postav: `venca_idle_b.png`, `venca_walk_a.png`, `venca_walk_b.png`.
- Odstraněna mrtvá exportovaná funkce `advanceEnemyTileQueue`.
- Vyřazen koncept Staggeru (zůstává pouze přímé Stun omráčení).

### Opraveno
- Detekce klávesové zkratky F1 (Herní manuál) v `src/game/ui/input.js` nezávisle na velikosti písmen (`key.toLowerCase() === 'f1'`).
- Opraven callback dokončení bitvy po porážce bosse v `src/game/battle.js` na správné `completeCurrentNodeAndShowMap()`.
- Nahrazeno pomalé hluboké klonování `structuredClone(enemy)` ve spawneru za lehký event payload.

# Changelog

Veškeré významné změny v projektu Lovec upírů jsou zaznamenány v tomto souboru.

Formát vychází z [Keep a Changelog](https://keepachangelog.com/cs/1.1.0/).

## [1.3.1] - 2026-10-31

### Opraveno
- **Responzivita a zobrazení arény bojiště a nepřátel na všech zařízeních**:
  - **Zabránění kolapsu arény na zařízeních s menší výškou**:
    - Odstraněna chyba, kdy `#app-shell` s fixním `height: 100dvh; overflow: hidden;` a flexibilní arénou (`flex: 1 1 0%; min-height: 0;`) na obrazovkách s výškou pod ~750px (iPhone SE 375×667, mobilní landscape 844×390, menší notebooky 1024×600 a 1366×650) stlačil 1D arénu s nepřáteli na 0–17 px, čímž byla herní scéna zcela skryta.
    - Zavedena garance minimální hratelné výšky bojiště (`min-height: 220px;` v základu, `min-height: 200px;` na mobilních zařízeních) a vertikální scroll fallback na `#app-shell` (`overflow-x: hidden; overflow-y: auto;`), takže žádná část herní plochy nemůže být oříznuta ani skryta.
    - Omezena maximální výška scény na vysokých mobilních displejích (`max-height: 280px;`), čímž se zamezilo nežádoucímu vertikálnímu natažení kamenných polí do nepřirozeně úzkých věží.
  - **Ochrana před ořezem záměrů a jmenovek nepřátel**:
    - Přepnuta hierarchie v `.battlefield-1d-stage`: pozadí malované scény (`.yard-scene`) má samostatný ořez s border-radiusem, zatímco samotné buňky bojiště jsou přímými potomky arény s `overflow: visible;`. Jmenovky, ukazatele zdraví a telegrafované záměry nepřátel (např. `#1 NABÍJÍ`, `#2 NABÍJÍ`) již nejsou nahoře ořezávány hranou arény.
    - Ve standardním mřížkovém zobrazení přepnuto `overflow: visible;` na `.cell-entity-stage`, aby entity a intent boxy nebyly stlačovány či uřezávány.
  - **Oprava překryvu u pravé brány (Gate Pillar)**:
    - Změněno absolutní polohování `.gate-pillar` na kompaktní štítky s vlastním odsazením a poloprůhledným pozadím.
    - Na úzkých displejích (`@media (max-width: 720px)`) je statický popisek brány skryt a zobrazuje se pouze kompaktní varování posily, aby banner nezakrýval nepřátele ani jejich záměry na krajních polích.
  - **Kompaktní rozvržení ovládacích prvků a lišt na mobilních zařízeních**:
    - Lišta kombo fronty (`.hero-queue-panel`) na mobilu udržuje sloty v jednom nezalamovaném řádku (`flex-wrap: nowrap; height: 34px;`), což uspořilo přes 90 px vertikálního prostoru.
    - Tlačítka pohybu (`.action-controls-row`) jsou na úzkých displejích kompaktní a horizontálně posuvná s touch podporou; klávesové zkratky `<kbd>` jsou na dotykových zařízeních skryty.
    - Karty destiček v ruce (`.player-tile-card`) jsou na mobilu zmenšeny na šířku 96–108 px se zmenšenou ikonou, textem i statistikami.
    - Kronika (`.chronicle-panel`) na malých zařízeních redukována na jednořádkový přehled posledního záznamu (`max-height: 26px;`).
  - **Dynamická podpora počtu sloupců nemalovaných střetnutí**:
    - Aréna nyní dynamicky nastavuje `grid-template-columns: repeat(var(--board-size), minmax(0, 1fr))` podle parametru `boardSize` střetnutí namísto dřívějšího natvrdo zadaného čísla 7.

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

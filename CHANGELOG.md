# Changelog

Veškeré významné změny v projektu Lovec upírů jsou zaznamenány v tomto souboru.

Formát vychází z [Keep a Changelog](https://keepachangelog.com/cs/1.1.0/).

## [1.7.0] - 2026-11-01

### Přidáno
- **Trvalé skvrny krve a ichoru na kamenné podlaze bojiště (Ground Stains)**:
  - Zavedena nová diegetická vrstva `.cell-ground-blood-zone` v každém poli bojiště.
  - Krev dopadající na zem vytváří trvalé louže, cákance a satelitní kapky, které zůstávají na kamenných deskách po celou dobu bitvy a přetrvávají napříč koly i překreslením scény.
  - Automatické přizpůsobení typu ichoru:
    - *Červená krev* (živé maso / hrdina / zvířata / bandité): tmavá viskózní karmínová s lesklým odleskem a sraženým okrajem.
    - *Modrý ichor* (upíři / netopýři / hrabata / Drákula): hluboký safírový a indigový ichor s okultním azurovým zábleskem.
    - *Zelený sliz* (mutanti / moráci / slizy / morový felčar): žíravá toxická žluč se zářivým limetkovým jádrem a kyselým okrajem.
- **Trvalé krvavé šrámy a potřísnění na spritech nepřátel a lovce (Sprite Blood Overlay)**:
  - Zavedena vrstva `.sprite-blood-overlay` uvnitř `.sprite-flip-wrapper` každé entity.
  - Zraněné entity akumulují na svých tělech a oděvech krvavé šrámy, sečné rány, stékající kapky a cákance, které se automaticky otáčejí se směrem pohledu postavy a pohybují se s animacemi běhu, útoku i zranění.
  - Zásahy v kontaktním boji (na blízko, vzdálenost $\le 1$ pole) navíc postříkají i útočníka ichorem zasaženého cíle (např. Venca potřísněný modrým upířím ichorem či zeleným jedem).
  - Při smrti entity zůstávají veškerá zranění na těle padlého i na zemi.

### Opraveno
- **Oprava životního cyklu a pozicování plátna částic (`blood.js`)**:
  - Plátno částic přesunuto přímo do kontejneru `#battlefield-stage` s absolutním pozicováním, čímž byl odstraněn dřívější drift souřadnic při posunu stránky nebo změně velikosti okna.
  - Odstraněna chyba, kdy vypršení animace částic (`particles.length === 0`) kompletně smazalo veškerou krev ze scény.
  - Opraven výpočet úrovně země (`hitPoint`): dříve se úroveň podlahy počítala ze spodního okraje spritu, což u létajících netopýrů a malých monster způsobovalo, že krev dopadala a zůstávala viset v prázdném vzduchu. Nyní se podlaha spolehlivě počítá z kamenné desky daného pole.
- **Zvýšení působivosti a dynamiky částicových efektů**:
  - Částice se nyní dynamicky natahují ve směru letu podle své rychlosti (aerodynamické kapky s rychlostním rozmazáním namísto statických koleček).
  - Přidány nové typy částic: vysokorychlostní tepenné gejzíry (`spurt`), těžké viskózní kapky, které se při dopadu na zem rozstříknou na drobné odskakující kapičky, mystická mlha a zářivé jiskry pro upíří ichor, toxické bubliny pro mutanty a rázová krvavá vlna (`shockwave`) při smrtících zásazích.

## [1.6.0] - 2026-10-31

### Přidáno
- **Modulární třívrstvá architektura bojiště (Z-0 Scénické pozadí, Z-1 Kamenná dráha, Z-2 Atmosféra)**:
  - Kompletní oddělení podlahových dlaždic od scénického pozadí na základě ADR `0004-decoupled-battlefield-layers-and-modular-terrain.md`.
  - Odstranění starého křehkého přepočtu pixelových procent (`edges`) a statických malovaných arén, které trpěly posunem postav při změně poměru stran.
  - Všechny souboje (včetně tutoriálů, běžných potyček i bossů) mají nyní garantovanou geometrii a zarovnání postav na dlaždicích bez ohledu na velikost bojiště (7 až 9 polí) a rozlišení obrazovky (od mobilů 390px až po širokoúhlé monitory).
- **5 atmosférických gotických scénických pozadí (SVG)**:
  - Vytvořena nová autorská vektorová pozadí pro všech 13 herních střetnutí:
    - *Noční vesnice a hřbitov* (`village_night.svg`): rozpadlé doškové střechy, ponurý měsíc, zkroucené stromy a mlžný opar.
    - *Hradní kamenná chodba* (`castle_corridor.svg`): lomené gotické oblouky, zdivo s loučemi a rudá tapiserie.
    - *Šlechtický budoár a salón* (`noble_boudoir.svg`): těžké burgundské sametové závěsy, barokní zlacené zrcadlo a svícny.
    - *Mučírna a hladomorna* (`torture_dungeon.svg`): železná mříž, okovy, řetězy a chladná tyrkysová lucerna.
    - *Trůnní krypta Prastarých* (`vampire_throne_crypt.svg`): monumentální vitrážové rozetové okno, netopýří kamenný trůn a prastaré sloupy.
  - Nový konfigurační registr `src/game/config/themes.js` a přiřazení témat ke každému střetnutí v `src/game/config/encounters.js`.
- **Diegetické terénní dekály (SVG) a statusové čítače**:
  - Původní textové štítky nahrazeny diegetickými vizuálními vrstvami přímo na kamenných deskách bojiště:
    - *Posvěcená louže* (`holy_puddle`): zvlněná zlatavá záře a kapky svěcené vody.
    - *Česnekový mrak* (`garlic_cloud`): toxický zelenkavý aerosol a vznášející se částice.
    - *Krvavé bodáky* (`spikes`): ostré ocelové hroty potřísněné upíří krví.
    - *Propast a zřícená podlaha* (`pit`): bezedná temná prasklina s padajícím kamením.
    - *Dřevěné lávky* (`plank_intact` / `plank_cracked`): svázaná dřevěná prkna a popraskaná fošna.
  - Integrované počítadlo zbývajících tahů `[Xt]` v rohu dekálu a plné vysvětlující bubliny (tooltips) při najetí myší.
- **Diegetické kamenné portály posil a bran**:
  - Vizuální znázornění bran na krajích bojiště formou kamenných oblouků s kovanými mřížemi.
  - Zářící fialová varovná runa a animace nebezpečí při bezprostředním příchodu nepřátelských posil (`imminent`).
- **Atmosférické popředí a částice**:
  - Jemná vinetace okrajů scény a vznášející se prachové světlušky (`motes`) s plnou podporou přístupnosti (`prefers-reduced-motion`).

### Změněno
- **Kompletní refaktoring vykreslování arény v `renderer.js` a stylů v `board.css`**:
  - Odstraněn zastaralý objekt `PAINTED_SCENES` a pravidla `.scene-yard`, `.scene-farm`.
  - Zavedeny 2.5D kamenné desky se zkosenými hranami, hloubkovým stínem a reliéfním povrchem, které dynamicky reagují na velikost dráhy.

## [1.5.0] - 2026-10-31

### Přidáno
- **4 jedineční hratelní lovci upírů (Venca Česnekáč, Hloupý Honza, Rittmeister Jaromír, Káča Pavučina)**:
  - Každý lovec má vlastní startovní počet životů (HP), 3 unikátní startovní akční destičky ladící s jeho identitou, manévr nárazu při kroku do nepřítele s cooldownem a pasivní/aktivní schopnost při složení 3-kombu:
    - **Venca Česnekáč** (Klasik, 20 HP):
      - 3 startovní destičky: *Dubový kolík* (4 DMG), *Česnekový krk* (2 DMG + oblak česneku), *Hasičská stříkačka* (2 DMG + Odtlačení 2).
      - Manévr nárazu: *Česnekové žduchnutí* (CD 3) – odhodí nepřítele o 1 pole a zamoří jeho pole česnekovým oblakem.
      - 3-kombo: *Česnekový dech* – 4 plošné DMG do sousedních polí a vytvoření česnekového oblaku na poli hrdiny.
    - **Hloupý Honza** (Sedlák / Benchmark, 20 HP):
      - 3 startovní destičky: *Cejpový švih* (4 DMG + Odtlačení 2), *Povidlový koláč* (Léčení 4 HP / přebytek do Štítu + vyléčení Krvácení), *Těžký nápřah* (+4 Posílení pro příští útok).
      - Manévr nárazu: *Selský beran* (CD 3) – 2 drtivé DMG, odhození nepřítele o 1 pole a Honza vstoupí na jeho původní pole.
      - 3-kombo: *Selský furiant* – +6 Štít a tlaková rázová vlna za 4 plošné DMG okolním nepřátelům.
    - **Rittmeister Jaromír** (Vysloužilý dragoun, 24 HP):
      - 3 startovní destičky: *Dragounská šavle* (6 DMG), *Křesadlová pistole* (4 DMG + Omráčení na 1 tah), *Jezdecká garda* (+6 Štít).
      - Manévr nárazu: *Úder těžkým jílcem* (CD 3) – 2 DMG, odhození o 1 pole a omráčení nepřítele (vynechá tah).
      - 3-kombo: *Kavalerijní salva* – průrazná salva karabinou za 4 DMG celou linií před sebou a udělení Krvácení (2).
    - **Káča Pavučina** (Úskočná zlodějka, 14 HP):
      - 3 startovní destičky: *Bodnutí stiletem* (2 DMG zpředu / 8 DMG + 4 Krvácení do zad), *Střepy z lucerny* (2 DMG + 4 Krvácení + Push 1), *Stínový prokluz* (Skok o 2 pole vpřed s otočkou o 180°).
      - Manévr nárazu: *Kapsářská záměna* (CD 2) – prohození pozice s nepřítelem a jeho otočení zády ke zlodějce.
      - 3-kombo: *Krvavý tanec* – +4 Štít a okamžité vykrvácení všech krvácejících nepřátel na bojišti (4 DMG).
- **Nová mechanika manévrů nárazu (Bump)**:
  - Pokus o krok do políčka obsazeného nepřítelem aktivuje jedinečný taktický manévr lovce s vlastním cooldownem.
- **Nový testovací modul v engine testech (Test 35)**:
  - Komplexní verifikace bodového krytí a vyprchání štítu, manévrů nárazu všech 4 lovců a aktivace 3-komb. Všech 35 testovacích sad enginu prochází na 100 %.

### Změněno
- **Kompletní přepracování mechaniky Štítu (Shield)**:
  - Štít funguje jako bodový absorpční fond: 1 hodnota štítu vykryje přesně 1 bod příchozího zranění.
  - Dočasný štít vyprchá na konci následujícího kola (`shieldTurnsLeft`).
- **Globální zdvojnásobení HP a Zranění (Rebalance)**:
  - Životy všech hrdinů zdvojnásobeny (Venca a Honza 20 HP, Dragoun 24 HP, Zlodějka 14 HP).
  - Životy všech nepřátel zdvojnásobeny (Praktikant 8 HP, Dráb 14 HP, Úředník 10 HP, Kancléř 14 HP, Hrabě Drákula 48 HP atd.).
  - Poškození všech útoků hráčových destiček i nepřátelských akcí zdvojnásobeno.
  - Zdvojnásobeno environmentální poškození: kolize do zdi 2 DMG, bodáky 4 DMG, propadlé prkno 4 DMG, roztříštěná kropenka 4 DMG.
- **Rozšíření Hradního archivu a výběru hrdiny**:
  - Karty lovců v Hradním archivu nyní přehledně zobrazují odznaky HP, popisy manévru nárazu a 3-kombo schopnosti.

## [1.4.0] - 2026-10-31

### Přidáno
- **01: Taktické destičky typu Rychlovka (`quick: true`)**:
  - Zavedena nová třída taktických destiček, jejichž vložení do Kombo fronty stojí **0 tahů** (neposouvá tah nepřátel ani odpočty útoků).
  - 4 nové specializované destičky v herním arzenálu:
    - *Pohotový úkrok* (`nimble_step`): rychlý krok o 1 pole vpřed nebo vzad bez ztráty tahu.
    - *Stroužek v záloze* (`garlic_pinch`): bleskové položení česnekového oblaku na pole pod Vencou.
    - *Facka růžencem* (`rosary_slap`): pohotová facka za 1 DMG s okamžitým zmatením nepřítele.
    - *Loket ze šenku* (`pub_elbow`): hospodské vražení loktem s odhozením o 1 pole.
  - Vizuální odlišení: zlatý odznak `⚡ Rychlovka`, dynamické cenové značky `(0 tahů)` na kartách v ruce.
- **02: Živlová a tematická Rezonance komba**:
  - Nový synergický systém odměňující promyšlené sestavování komba podle příbuzných škol:
    - *Živelný česnek* (česnekové destičky): uvolňuje omračující a zraňující česnekové výpary.
    - *Svěcená liturgie* (svěcené destičky): posvátná vlna udělující plošné poškození a očištění.
    - *Hospodská rvačka* (fyzické / brawler destičky): bonusová síla odhození (+1 Push) a kolizní poškození.
    - *Mistr dřeva* (dřevěné kolíky): zkrácení cooldownu navazujících útoků a krvácení.
  - Fialový vizuální odznak rezonance na kartách a plovoucí text `✨ REZONANCE!` při odpalu.
- **03: Taktická předpověď a simulace dopadu komba**:
  - Pure-engine modul `src/game/engine/simulation.js` (`simulateComboImpact`) umožňující detailní náhled na výsledek komba ještě před jeho odpálením.
  - Stínové siluety budoucích pozic postav po odhození a přeskocích (`.ghost-silhouette`).
  - Dvoubarevný náhledový proužek zdraví (`.entity-hp-bar-preview`) a ikona lebky (`💀`) u předpovězených smrtících úderů.
  - Varování před neodvrácenými nepřátelskými údery po skončení komba (`.enemy-threat-warning-post-combo`).
  - Dedikované tlačítko `👁️ Náhled komba` na liště pro pohodlné ovládání na dotykových obrazovkách i klávesnici (klávesa P / Q).
- **04: Interaktivní překážky na bojišti (Kropenka a Zrcadlo)**:
  - *Posvěcená kamenná kropenka* (`holy_font`): 1 HP, při zničení úderem, střelou nebo kolizí uštědří 2 DMG svěcenou vodou všem sousedním nemrtvým a vytvoří louži posvěcené vody na 3 tahy (1 DMG při vstupu).
  - *Hradní zrcadlo* (`mirror`): odráží veškeré lineární dálkové projektily (hráčovy i nepřátelské) o 180° zpět po dráze letu.
- **05: Trvalá metagrese a Hradní archiv**:
  - Nová meta-měna *Upíří tesáky* (`fangs`) ukládaná v profilu hráče (`localStorage`), získávaná za eliminaci upírů (+1), elitních drábů (+3) a bossů (+10).
  - Obrazovka *Hradní archiv a zbrojnice* přístupná z HUD i konce výpravy.
  - Odemykání a volba alternativních startovních Výstrojí:
    - *Klasický lovec* (Dubový kolík, Česnekový pšouk, Svěcená stříkačka, Přemet přes pupík).
    - *Hospodský rváč* (Loket ze šenku, Přemet přes pupík, Facka růžencem, Dubový kolík) – odemčení za 15 tesáků.
    - *Svěcený kropič* (Svěcená stříkačka, Pohotový úkrok, Paprsek stříbrného krucifixu, Stroužek v záloze) – odemčení za 25 tesáků.
- **06: Kletby noci a Síň slávy (Ascension I–V)**:
  - 5 stupňů obtížnosti Kleteb noci odemykaných postupně po každém vítězství nad Hrabětem Drákulou:
    - *Kletba I (Neklidná hrobka)*: posily z hradních bran nastupují o 1 tah dříve.
    - *Kletba II (Drahota v podzámčí)*: ceny v hospodě a kovářské dílně jsou vyšší o 25 %.
    - *Kletba III (Obrnění drábové)*: elitní nepřátelé vstupují do boje s 1 Štítem navíc.
    - *Kletba IV (Zemdlený lovec)*: Venca začíná výpravu s −2 maximálními HP (8 HP).
    - *Kletba V (Pán temnoty)*: Hrabě Drákula má o 25 % více HP a začíná boj posílen.
  - Progresivní násobič zisku Upířích tesáků (1.25× až 2.5×) podle aktivního stupně kletby.
  - Fialový odznak platné Kletby noci v záhlaví HUD i na mapě výpravy.
  - Perzistentní *Síň slávy* v Hradním archivu evidující slavná vítězství, datum, použitou výstroj, uštědřené poškození a stupeň kletby.

### Změněno
- **Kompletní očista od byrokracie a daňových motivů (Návrat k ryzí gotické upíří atmosféře)**:
  - Odstraněny veškeré odkazy na berňák, daně, finanční úřad, formuláře, daňová přiznání, razítka a firemní byrokracii napříč celým herním kódem a konfiguracemi.
  - Hrabě Drákula sjednocen jako *Hrabě Drákula, Pán temnot* namísto generálního ředitele.
  - Zasedačky a účtárny přejmenovány na trůnní sály, rodové archivy krve a hrobky předků.
  - Nepřátelé převedeni na autentické gotické role: *Kryptový písař Hubert*, *Hradní klíčnice Květuše*.
  - Schopnosti a talismany adaptovány na upíří mystiku: *Krvavá pečeť rodu*, *Temný ortel noci*, *Kletba prastarého rodu*, *Krvavý svitek*, *Temné povzbuzení krve*.
  - Specifikace a tikety v `.scratch/` převedeny z úředních kolků a byrokratických vyhlášek na *Upíří tesáky* a *Kletby noci (Ascension I–V)*.

## [1.3.4] - 2026-10-31

### Opraveno
- **Mapa výpravy a integrita průchodu (Exploit zamezen)**:
  - **Zamezení přeskočení probíhající bitvy přes mapu**:
    - V `src/game/engine/run.js` v `getAvailableNodes` opravena nekonzistence, kdy funkce vracela navazující uzly i v případě, že stávající uzel ještě nebyl dokončen (`!completedNodeIds.includes(currentNodeId)`).
    - V `src/game/ui/mapScreen.js` a `src/game/main.js` jsou při otevření mapy během aktivní bitvy (`canReturnToBattle`) všechny navazující uzly uzamčeny a nelze na ně kliknout.
    - Uzel aktivní bitvy je na mapě zřetelně označen červenou září (`.map-node-active`) a štítkem `⚔️ Právě bojuješ!`.
    - Kliknutím na probíhající uzel na mapě (či na tlačítko v záhlaví nebo klávesu Escape) se hráč okamžitě vrátí zpět do probíhajícího střetnutí.
- **Perzistence uživatelských nastavení**:
  - V `src/game/main.js` sjednoceno ukládání rychlosti animací (`animSpeed`) a zapnutí zvuku (`soundEnabled`) do `localStorage` (`lovec_upiru_meta_v1`).
  - Nastavení hráče se již neresetuje při obnovení stránky (F5), ale zůstává trvale zachováno a aplikováno od samotného startu hry.
- **Dotykové ovládání nápověd (Tooltips)**:
  - V `src/game/ui/tooltips.js` přidán globální listener `pointerdown`, který na dotykových zařízeních spolehlivě zavře plovoucí nápovědu při klepnutí mimo interaktivní prvek (karty, talismany, políčka), čímž se předchází uvíznutí nápovědy na displeji mobilu.

## [1.3.3] - 2026-10-31

### Opraveno
- **UI a HUD grafika, responzivita a ovládání**:
  - **Kritické přetékání horní lišty (HUD) na mobilních zařízeních**:
    - Na zařízeních s šířkou obrazovky pod 720px (např. 390×844) se v horní liště HUD skrývá zbytečný řádek 10 jednotlivých srdíček (`.hud-hearts`), který zabíral přes 180 px, a namísto toho se zobrazuje kompaktní textové zdraví `❤️ 10/10 HP`.
    - Texty tlačítek akcí v HUD (`Mapa`, `Pravidla`, `Nastavení`) jsou na mobilu zredukovány na elegantní pergamenové ikony `[🗺️]`, `[📖]`, `[⚙️]` se zachovanými atributy `title` a `aria-label`.
    - Všechna 3 ovládací tlačítka v HUD se nyní na mobilním telefonu bezpečně vejdou do šířky obrazovky (šířka lišty končí na 373 px z dostupných 390 px) a již nejsou odsunuta 100% mimo obrazovku.
  - **Zavírání oken a návrat na bojiště klávesou Escape**:
    - V `src/game/ui/input.js` a `src/game/main.js` implementován globální odchyt klávesy `Escape` před kontrolou zámku vstupu.
    - Hráč nyní může jakékoliv otevřené modální okno (Pravidla, Nastavení, Celý deník, Hospoda, Dílna, Odměny) okamžitě zavřít stiskem `Escape`, stejně jako se z mapy aktu okamžitě vrátit zpět do probíhající bitvy bez nutnosti hledat křížek či tlačítko myší.
  - **Srozumitelné české formátování dosahů destiček v ruce**:
    - V `src/game/ui/tileBar.js` v `formatTileRangeLabel` nahrazeny nicneříkající technické popisky (`Pole +1`, `Pole +1, -1`) přirozeným českým značením: `Vpřed 1`, `Vzad 1`, `Kolem sebe (1)`, `Vpřed 1–2`, `Vpřed 1–3`.
    - U destiček s vlastností `quick: true` (cena vložení 0 tahů) doplněn štítek `⚡ Rychlovka` přímo na kartu v ruce.
  - **Zpřesnění textu v pravidlech hry**:
    - V manuálu pravidel v `src/game/ui/modal.js` opraven zavádějící údaj o fixních 7 polích na skutečných 7–9 kamenných polí a upřesněna zkratka pro výběr destiček na 1–4 namísto 1–9.
  - **Ochrana plovoucí nápovědy (Tooltip) před přetečením obrazovky**:
    - V `src/game/styles/ui.css` na `.neprakta-tooltip` doplněno `max-width: calc(100vw - 24px); box-sizing: border-box; word-break: break-word;`, což garantuje bezpečné zobrazení nápověd bez vodorovného posunu i na úzkých displejích.
- **Herní mechaniky a balance**:
  - **Oprava friendly fire pasti u talismanu Okované půllitry (`hobnailed_boots`)**:
    - V `src/game/engine/board.js` v `pushEntity` opraven výpočet kolizního poškození při nárazu do zdi, sudu i mezi postavami. Bonusové poškození talismanu se již nevztahuje na Vencu samotného, pokud je sám odhozen nepřítelem. Vencovy boty tak již nezvyšují poškození, které utrží on sám.
  - **Statistika poražených upírů (`enemiesKilled`) v běhu a souhrnu výpravy**:
    - V `src/game/engine/run.js` inicializován čítač `enemiesKilled: 0` v objektu statistik běhu.
    - V `src/game/battle.js` zajištěno přičítání počtu poražených nepřátel z každé vyhrané i prohrané bitvy do statistik běhu.
    - V závěrečném okně výpravy (`openRunEndModal`) přidána statistika `Poraženo upírů: X`.
  - **Deterministická pestrost nabídky v hospodě (Pub Shop)**:
    - V `openPubModal` v `src/game/ui/modal.js` nahrazen statický výběr prvního prvku pole náhodným výběrem řízeným seedem (`runState.rng.pick`), takže hospoda nabízí v každém uzlu a seedu odlišné destičky i talismany namísto věčného Vlhkého šátku na čelo.

## [1.3.2] - 2026-10-31

### Opraveno
- **Grafika a animace na bojišti**:
  - **Nehybné objekty (props)**:
    - V `gaitFor(entity)` v `src/game/ui/renderer.js` doplněna detekce objektů typu `prop`. V `src/game/styles/animations.css` přidáno pravidlo `.gait-prop { animation: none !important; }`. Sudy se zelím a další překážky již nepohupují v lidském dechovém cyklu (`idleHuman`).
  - **Čištění tříd animací kroku a úderů**:
    - V `triggerSpriteAnim` v `renderer.js` doplněno odstranění třídy `'anim-walk-back'`. Odstraněna chyba, kdy na entitě mohl uvíznout stav couvání, který kvůli kaskádě stylů blokoval animaci chůze vpřed i úderů.
  - **Směr pohledu a couvání při posunu a odhození**:
    - V `playEntityMove` v `renderer.js` ošetřeno odvození pohledu entity z DOM při chybějícím `ev.facing` u událostí `push_move` a `pull_move`. Entity odhozené či přitažené proti svému směru pohledu nyní správně přehrávají animaci couvání (`anim-walk-back`).
  - **Směrová orientace letících projektilů**:
    - V `playProjectileFly` v `renderer.js` doplněno dynamické horizontální převrácení projektilu podle vektoru letu (`targetX > startX`). Stříkačky se svěcenou vodou, kosti a projektily letí vždy hrotem napřed k cíli.
  - **Viditelnost padlého hrdiny při prohře**:
    - V `animations.css` v `@keyframes heroDeath` opravena koncová průhlednost na `opacity: 1` namísto dřívější hodnoty `0.15`. Hrdina po vyčerpání zdraví nezmizí jako poloprůhledný duch, ale zůstává viditelně ležet na dlažbě ve své padlé póze.
  - **Stabilita a odstranění jitteru tlačítka odpalu komba**:
    - V `ui.css` v `@keyframes pulse-execute-primed` nahrazeno neustálé geometrické přeškálování (`transform: scale(1.03)`) pulzující červenou září stínů (`box-shadow`), což zabraňuje mikropohybům ovládací lišty a selháním detekce kliknutí na dotykových zařízeních.
  - **Validace malovaných arén (Painted Scenes)**:
    - V `renderer.js` zavedena kontrola `isPaintedValid`, která aktivuje třídy specifického malovaného pozadí pouze v případě, že počet hran přesně odpovídá velikosti desky bojiště (`edges.length === boardSize + 1`), čímž se předchází kolapsu pozic buněk.
  - **SVG zástupné ikony pro talismany**:
    - V `src/game/ui/assets.js` doplněno všech 12 klíčů talismanů (`talisman.*`) do mapy ikon v `renderIconSvg` pro spolehlivé grafické zobrazení talismanů v inventáři, obchodu i kartách odměn.

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

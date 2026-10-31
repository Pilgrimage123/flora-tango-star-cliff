Status: ready-for-agent

# Spec: Chytrá vylepšení hry Lovec upírů (Taktická hloubka, synergie a metagrese)

## Problem Statement

Hráč v taktické roguelike hře Lovec upírů: Venca Česnekáč zažívá výborný základní soubojový systém na 1D Bojišti, ale po několika odehraných bězích naráží na několik limitů herního zážitku:

1. **Vysoká kognitivní zátěž při mentální simulaci komba**: Když hráč skládá do Fronty komba 3 až 4 Destičky, musí si z hlavy složitě přepočítávat, kam se nepřátelé posunou po každém odhození (Push) či přitažení (Pull), zda neskončí mimo dosah následujícího úderu, jaké poškození jim udělí Kolize se zdí nebo jiným upírem a kteří nepřátelé po dohrání komba přežijí a okamžitě na Vencu zaútočí. Chybí okamžitá taktická předpověď a simulace dopadu, což vede k frustrujícím přehmatům z prosté nepozornosti namísto strategických rozhodnutí.
2. **Plochost skládání Výstroje (Arzenálu)**: Destičky fungují do značné míry izolovaně. Hráč volí silnější čísla, ale chybí uspokojivé živlové a tematické synergie mezi kartami ve Frontě komba. Kromě ojedinělých výjimek chybí mechanika, která by hráče motivovala kombinovat například česnekové destičky se svěcenou vodou nebo hospodské rvačky s technickými nástroji.
3. **Nevyužitý potenciál destiček typu Rychlovka**: Ačkoliv architektonické rozhodnutí (ADR 0001) kodifikovalo mechaniku Rychlovka (vložení destičky do fronty za 0 tahů bez posunu světa), v nabídce hry je nedostatek ryze taktických pohotových manévrů, které by umožnily dynamickou úpravu situace na bojišti během přípravy.
4. **Absence dlouhodobé motivace a znovuhratelnosti (Metagrese)**: Po úspěšném průchodu 3. aktem a porážce Hraběte Drákuly hra končí jednoduchým souhrnným oknem. Hráč nemá možnost odemykat nové počáteční Výstroje, objevovat nové vzácné talismany ani čelit odstupňovaným výzvám (systém Kleteb noci / ascension), což omezuje chuť se ke hře vracet.
5. **Nízká variabilita interaktivního terénu**: Na Bojišti se nachází pouze sudy se zelím, kůly, prkna a propasti. Chybí dynamické prvky, které by reagovaly na dálkové střely nebo zásahy svěcenou vodou a umožnily ještě kreativnější Friendly Fire a prostorové řetězení.

## Solution

Komplexní balíček chytrých herních vylepšení, který rozšiřuje taktickou hloubku, přehlednost a trvanlivost hry při striktním zachování doménového jazyka (GLOSSARY.md) a architektonických rozhodnutí (ADR 0001, ADR 0002, ADR 0003):

1. **Taktická předpověď komba (Ghost Impact Simulation)**:
   - Při najetí myší nebo podržení prstu na tlačítku Odpal komba (či na konkrétní Destičce ve Frontě komba) se na Bojišti v reálném čase zobrazí duchové siluety konečných pozic entit po odeznění všech posunů a odhození.
   - Ukazatele zdraví nepřátel zobrazí blikající pruh předpokládaného úbytku HP a ikonu lebky u nepřátel, kteří kombo nepřežijí.
   - Zvýrazní se nepřátelé, jejichž Zčervenání (ARMED_RED) a odpočet Záměru bezprostředně ohrozí Vencu po dokončení hráčova tahu.

2. **Živlová a tematická Rezonance (Tag Synergy Burst)**:
   - Zavedení 4 tematických rodin destiček: **Česneková** (kontrola prostoru, oslabení), **Svěcená** (plošné popálení nemrtvých, štíty), **Hospodská** (fyzické odhození, surové kolizní poškození, omráčení) a **Řemeslná** (dálkové projektily, manipulace s cooldowny a pozicemi).
   - Při zařazení 2 a více destiček stejné rodiny nebo specifické rezonanční dvojice (např. Česnek + Svěcená voda = „Posvěcený opar“) dojde při Odpalu komba k vyvolání bonusového Rezonančního efektu (např. odražení rázovou vlnou, vytvoření česnekového oblaku, okamžitý zisk štítu nebo vrácení cooldownu).

3. **Arzenál taktických Rychlovek**:
   - Rozšíření repertoáru Výstroje o specializované destičky s vlastností Rychlovka (cena zařazení do fronty: 0 tahů), které umožňují flexibilní taktické polohování (např. bleskový úkrok, příprava provizorního štítu z poklopu nebo pohotové popostrčení).

4. **Trvalá metagrese: Hradní archiv a Kletby noci**:
   - Zavedení meta-měny **Upíří tesáky**, získávané za dokončené akty, poražené elity, bosse a mistrovské řetězení Friendly Fire.
   - **Hradní archiv**: Mezi jednotlivými běhy může hráč za získané tesáky odemykat alternativní počáteční Výstroje Venci Česnekáče (např. *Hospodský rváč*, *Svěcený kropič*, *Pohřební mistr*) a rozšiřovat nabídku talismanů a destiček v obchodech a odměnách.
   - **Kletby noci (Stupně obtížnosti I–V)**: Odstupňované modifikátory běhu pro zkušené lovce (např. Kletba I: Posily z hradních bran nastupují o 1 tah dříve; Kletba II: Drahota v podzámčí; Kletba III: Elitní upíři mají štíty i z boku).

5. **Nové interaktivní prvky a překážky na bojišti**:
   - *Kropenka se svěcenou vodou*: Zničitelná překážka, která při nárazu či zásahu projektilem postříká okolní pole svěcenou vodou a udělí 2 DMG všem přilehlým upírům.
   - *Hradní zrcadlo pravdy*: Odrazivý objekt, který odráží dálkové střely v opačném směru po ose Bojiště.

---

## User Stories

### Taktická předpověď a simulace komba (Ghost Impact Simulation)

1. Jako hráč chci při najetí myší na tlačítko Odpal komba vidět na Bojišti předpověď výsledných pozic všech entit, abych přesně věděl, kam mé údery a odhození nepřátele posunou.
2. Jako hráč chci na ukazatelích zdraví nepřátel vidět odlišenou barvou množství životů, které jim mé kombo odebere, abych neplýtval silnými útoky na téměř mrtvé cíle.
3. Jako hráč chci vidět ikonu lebky nad nepřáteli, kteří v průběhu komba zahynou, abych mohl s jistotou plánovat uvolnění polí na Bojišti pro navazující manévry.
4. Jako hráč chci vidět zvýraznění kolizních zásahů, ke kterým během simulace komba dojde (náraz do zdi, do sudu či mezi nepřáteli), abych mohl maximalizovat poškození z Kolize.
5. Jako hráč chci vidět varování u nepřátel, kteří přežijí mé kombo a jejichž Záměr bezprostředně zasáhne Vencu v navazující fázi nepřátel, abych se vyvaroval sebevražedných útoků.
6. Jako hráč na mobilním zařízení chci mít možnost podržením prstu na Frontě komba aktivovat režim předpovědi bez nechtěného spuštění tahu, abych měl stejný taktický komfort jako hráči s myší.
7. Jako hráč chci, aby simulace předpovědi zohledňovala i spuštěné pasivní talismany (např. bonus Okovaných půllitrů nebo Krvavé pečeti rodu), abych viděl skutečný výsledný stav.
8. Jako hráč chci, aby se předpověď okamžitě skryla, jakmile kurzor myši opustí tlačítko odpalu nebo ovládací prvek, aby Bojiště zůstalo čisté a přehledné.

### Živlová a tematická Rezonance (Tag Synergies)

9. Jako hráč chci na každé Destičce ve Výstroji vidět její tematický rodinný odznak (Česneková, Svěcená, Hospodská, Řemeslná), abych mohl intuitivně stavět synergické kombinace.
10. Jako hráč chci, aby zařazení dvou a více destiček z rodiny Česnek do jedné Fronty komba vyvolalo Rezonanční poryv, který zanechá Česnekový oblak na poli před Vencou.
11. Jako hráč chci, aby zařazení dvou a více destiček z rodiny Svěcená voda do fronty poskytlo Vencovi 1 Štít pro nadcházející nepřátelskou fázi, abych mohl agresivně útočit i pod hrozbou odvetného zásahu.
12. Jako hráč chci, aby zařazení dvou a více destiček z rodiny Hospodská rvačka zvýšilo dosah všech odhození (Push) v daném kombu o +1 pole, abych mohl nepřátele snáze posílat do propastí a do kolizí.
13. Jako hráč chci, aby zařazení dvou a více destiček z rodiny Řemeslo snížilo po odpalu komba aktuální cooldown náhodné destičky v Arzenálu o 1 tah navíc, abych mohl rychleji opakovat technické sekvence.
14. Jako hráč chci, aby specifická křížová kombinace Česnek + Svěcená voda vytvořila Rezonanci „Svěcený opar“, která udělí 1 DMG všem nepřátelům v dosahu 2 polí.
15. Jako hráč chci, aby byla aktivní Rezonance vizuálně indikována září a odznakem přímo ve Frontě komba ještě před odpalem, abych viděl, že se mi podařilo synergii sestavit.
16. Jako hráč chci, aby v kronice bitvy (Combat Log) byla Rezonance jasně zaznamenána samostatným záznamem s odpovídající ikonou, abych mohl zpětně analyzovat průběh střetnutí.

### Taktické destičky typu Rychlovka

17. Jako hráč chci mít možnost získat destičku „Pohotový úkrok“ s vlastností Rychlovka, která po vložení do fronty za 0 tahů umožní Vencovi v rámci komba provést úhybný krok vzad.
18. Jako hráč chci mít možnost získat destičku „Stroužek v záloze“ s vlastností Rychlovka, která za 0 tahů vloží do fronty bleskové rozmačkání česneku, které zruší nepříteli před Vencou stav Zesílení (Empower).
19. Jako hráč chci mít možnost získat destičku „Loket ze šenku“ s vlastností Rychlovka, která za 0 tahů vloží do fronty slabý úder za 0 DMG s okamžitým posunem nepřítele o 1 pole (Push 1).
20. Jako hráč chci na kartě destičky v ruce i v inventáři vidět jasně zářící štítek „⚡ Rychlovka (0 tahů)“, abych ji okamžitě odlišil od standardních destiček stojících 1 tah.
21. Jako hráč chci, aby vložení Rychlovky do fronty neposunulo počítadlo tahů ani odpočty nepřátel, a nepřátelé tak nepostoupili ve svých akcích.

### Trvalá metagrese a Hradní archiv (Unlockables)

22. Jako hráč chci po každé dokončené bitvě a zejména po porážce elitního soka či bosse obdržet Upíří tesáky do svého trvalého účtu, abych měl pocit hmatatelného postupu i v případě prohrané výpravy.
23. Jako hráč chci vidět aktuální stav svých nastřádaných Upířích tesáků v hlavním menu i v závěrečném souhrnu výpravy.
24. Jako hráč chci mít v hlavním menu přístup do obrazovky „Hradní archiv a zbrojnice“, kde mohu své tesáky investovat do odemykání nového obsahu.
25. Jako hráč chci mít možnost odemknout alternativní startovní Výstroj „Hospodský rváč“ (začínající s destičkami Hospodský půllitr, Facka růžencem a Těžká bota namísto stříkačky), abych mohl hrát odlišným herním stylem.
26. Jako hráč chci mít možnost odemknout alternativní startovní Výstroj „Svěcený kropič“ zaměřenou na dálkový boj a svěcenou vodu.
27. Jako hráč chci mít možnost odemknout nové talismany do obecného fondu odměn, aby mé budoucí výpravy byly pestřejší a nabízely nečekané kombinace.
28. Jako hráč chci, aby se veškerý postup odemykání spolehlivě ukládal do lokálního úložiště a zůstal zachován i po zavření či obnovení prohlížeče.

### Kletby noci (Systém obtížnosti a výzev)

29. Jako zkušený hráč chci mít po prvním vítězství nad Drákulou možnost aktivovat Kletbu noci I. stupně („Neklidná hrobka“ – nepřátelské posily z bran přicházejí o 1 tah dříve).
30. Jako hráč chci po úspěšném dokončení běhu s Kletbou I odemknout Kletbu II. stupně („Drahota v podzámčí“ – ceny v hospodě a dílně jsou vyšší o 25 %).
31. Jako hráč chci po úspěšném dokončení běhu s Kletbou II odemknout Kletbu III. stupně („Obrnění drábové“ – elitní nepřátelé vstupují do boje s 1 Štítem navíc).
32. Jako hráč chci na mapě výpravy i v záhlaví HUD vidět odznak a název aktivní Kletby noci, abych měl neustále přehled o platných modifikátorech.
33. Jako hráč chci za úspěšné zdolání výpravy s aktivní Kletbou získat násobný bonus Upířích tesáků a zápis do Síně slávy.

### Nové interaktivní prvky a terény na bojišti

34. Jako hráč chci na Bojišti potkávat kamennou Kropenku se svěcenou vodou, do které mohu nepřítele odhodit a způsobit její roztříštění.
35. Jako hráč chci, aby roztříštěná Kropenka vytvořila na svém poli a sousedních polích kaluž svěcené vody, která udělí 2 DMG nemrtvým nepřátelům a vyléčí 1 HP Vencovi, pokud na ni vstoupí.
36. Jako hráč chci mít možnost zasáhnout Kropenku dálkovou střelou (Hasičská stříkačka) a odpálit ji na dálku jako taktickou past.
37. Jako hráč chci na Bojišti potkávat Hradní zrcadlo, které odráží letící projektily o 180 stupňů zpět, abych mohl odrážet temné kletby kryptových písařů přímo do jejich vlastních řad.
38. Jako hráč chci, aby se na zrcadlo vztahoval systém kolizí, takže po silném nárazu těla upíra praskne a střepy udělí 1 DMG okolí.

---

## Implementation Decisions

### Moduly a jejich architektura

1. **Predikční modul (Ghost Simulation Engine)**:
   - Nový modul simulace, který přijme aktuální stav bitvy (`battleState`) a snapshot zamýšlené fronty komba, vytvoří lehkou virtuální kopii stavu a synchronně provede simulační krok bez vedlejších efektů na reálné herní stavy, DOM ani časovače.
   - Výstupem simulace je předpovědní datová struktura obsahující: projektované souřadnice entit, utržená poškození, indikátory fatálního zásahu (lethal), seznam vzniklých kolizí a seznam přežívajících nepřátel s telegrafovaným ohrožením Venci.
   - UI adaptér napojí tuto strukturu na stávající vrstvu překryvů Bojiště a vykreslí poloprůhledné siluety a modifikované ukazatele zdraví.

2. **Rezonanční subsystém komba (Tag & Synergy System)**:
   - Rozšíření definice destiček o povinné pole `tags: string[]` (např. `['garlic']`, `['holy']`, `['brawl']`, `['craft']`).
   - Přidání vyhodnocovacího algoritmu do fáze provádění komba, který analyzuje skladbu tagů ve frontě:
     - Při dosažení prahové hodnoty (2 stejné tagy) nebo registrované dvojice tagů vygeneruje do proudu herních událostí dedikovanou událost `resonance_triggered` s definovaným účinkem (vytvoření terénu, aplikace štítu, bonus k dosahu odhození, snížení cooldownů).
     - Tyto události jsou plně kompatibilní se stávajícím událostním systémem a generují synchronizované animace i záznamy do kroniky.

3. **Rozšíření konfigurace destiček o Rychlovky**:
   - Zařazení nových definic destiček s příznakem `quick: true` do konfiguračních tabulek Výstroje.
   - Ověření, že engine pravidel vkládá tyto destičky do fronty se statusem `freeTurn: true` bez inkrementace počítadla tahů světa a bez posunu odpočtů nepřátel, přesně v souladu s ADR 0001.

4. **Metaprogresní modul a Správa profilu (Meta State & Archive)**:
   - Rozšíření schématu trvalého stavu v lokálním úložišti o strukturu:
     - `fangs`: počet vlastněných Upířích tesáků.
     - `unlockedLoadouts`: seznam odemčených startovních sad Výstroje.
     - `unlockedTalismanIds`: seznam odemčených talismanů dostupných v náhodných výběrech.
     - `highestCurseCompleted`: nejvyšší dokončený stupeň Kletby noci.
     - `activeCurse`: aktuálně zvolený stupeň kletby pro nový běh (0 = základní hra, 1–5 = výzvy).
   - Generátor nového běhu zohlední zvolený loadout a aplikuje aktivní kletbu na počáteční parametry nepřátel, cen a posil.

5. **Interaktivní objekty a terénní entity**:
   - Rozšíření seznamu rekvizit (Props) a terénů o `holy_font` (kropenka) a `mirror` (zrcadlo).
   - `holy_font` disponuje vlastností `destructible: true`, životy `hp: 1`, a při zničení (útokem, střelou či kolizí) emituje událost rozstřiku svěcené vody s plošným poškozením a změnou terénu na posvěcenou dlažbu.
   - `mirror` reaguje na kolizi s projektilem změnou směru letu projektilu o 180 stupňů a snížením své odolnosti.

### Zákaz zastarávajících kódových fragmentů

- Implementace se řídí striktně popsanými rozhraními a událostním modelem. Žádné natvrdo zapsané cesty k souborům ani křehké selektory DOMu nejsou součástí specifikace.

---

## Testing Decisions

### Co dělá dobrý test v této architektuře

- **Testování výhradně na nejvyšším externím švu**: Testy se zaměřují na vstupy a výstupy stavových strojů herního enginu (`battleState`, `runState`) a na konzistenci generovaných událostí (`events`).
- Žádný test nesmí testovat interní privátní pomocné funkce ani spoléhat na časovače prohlížeče (`setTimeout`, `requestAnimationFrame`).
- Všechny herní situace v testech jsou plně deterministické a řízené fixním seedem generátoru náhodných čísel (`createRng`).
- Pro vizuální a uživatelské rozhraní slouží oddělený automatizovaný kouřový test v prohlížeči (Playwright / `browser-smoke.mjs`), který kontroluje přítomnost DOM elementů, absenci chyb v konzoli a responzivní zobrazení na desktopu i mobilu.

### Testované moduly a rozhraní (Švy)

1. **Šev pravidel bitvy a provádění komba (`rules.js` / `combo.js`)**:
   - Ověření, že zařazení destičky s vlastností `quick: true` neinkrementuje tah bitvy a neaktivuje fázi nepřátel.
   - Ověření, že složení komba s 2 česnekovými destičkami vygeneruje rezonanční událost a umístí česnekový oblak na bojiště.
   - Ověření, že složení komba s 2 svěcenými destičkami aplikuje na Vencu status Štít.
   - Ověření, že simulační funkce předpovědi vrací identické finální souřadnice a poškození, jakých je dosaženo při reálném odpalu téhož komba.
2. **Šev interakce terénu a rekvizit (`board.js` / `tileEffects.js`)**:
   - Ověření, že náraz odhozeného nepřítele do Kropenky způsobí její rozbití a plošné zranění okolních nemrtvých.
   - Ověření, že letící projektil při zásahu Zrcadla otočí směr a zasáhne entitu stojící za střelcem.
3. **Šev generování a průchodu výpravy (`run.js`)**:
   - Ověření, že aktivní Kletba noci I správně zkracuje příchod posil o 1 tah.
   - Ověření, že výběr alternativního startovního loadoutu inicializuje Výstroj Venci s požadovanou sadou destiček.
   - Ověření kalkulace zisku Upířích tesáků po vítězství a prohře.

### Prior Art v repozitáři

- Stávající sada 28 testů v `tests/engine.test.js`, která ověřuje invarianty bojiště, kroky, push/pull kolize, deterministické seedy, Friendly Fire a životní cyklus statusů bez nutnosti běžícího prohlížeče.

---

## Out of Scope

- Přechod z 1D Bojiště na 2D šachovnici či volný pohyb (hra striktně zachovává 1D řadu 7–9 kamenných polí).
- Síťový multiplayer nebo kooperace v reálném čase (hra zůstává čistě tahovou sólo roguelike hrou).
- Odstranění nebo změna základních mechanik definovaných v ADR 0001 (okamžitý odpal bez přípravného tahu, zachování Rychlovek).
- Změna grafického stylu na fotorealistický 3D render (hra zůstává věrná české kreslené poetice inspirované Nepraktou).
- Zavedení mikrotransakcí či online účtů (veškerá data a odemčený obsah zůstávají v lokálním úložišti prohlížeče hráče).

---

## Further Notes

- Hra se plně soustředí na ryzí gotickou upíří atmosféru propojenou s lidovým humorem Venci Česnekáče (upíří tesáky, kletby noci, hospodské půllitry a hasičské stříkačky).
- Systém předpovědi dopadu komba dramaticky sníží frustraci hráčů a promění hru v uspokojivý taktický hlavolam srovnatelný s předními světovými tituly žánru.
- Všechny nově vznikající moduly budou navrženy jako **hluboké moduly** s malým, čistým rozhraním na nejvyšším možném švu.

# Lovec upírů: Venca Česnekáč

Taktická tahová 1D roguelike hra, ve které Venca Česnekáč bojuje proti hradní byrokracii a upírům skládáním komb z akčních destiček.

## Language

**Bojiště**:
Jednorozměrná řada kamenných polí (obvykle 7 až 9 polí), kde na každém poli smí stát nanejvýš jedna postava nebo překážka.
_Avoid_: Mapa bitvy, Šachovnice, 2D aréna

**Tah**:
Základní jednotka herního času, ve které hráč provede právě jednu akci (Krok, Otočení, Čekání, Vložení destičky do fronty nebo Odpal komba) a po níž následuje fáze nepřátel.
_Avoid_: Kolo, Akční bod, Fáze

**Krok**:
Posun o jedno pole ve směru vlevo nebo vpravo bez změny otočení, který je striktně blokován obsazeným polem.
_Avoid_: Přeskok, Swap, Leapfrog

**Otočení**:
Změna směru pohledu postavy (vlevo/vpravo), která běžně stojí 1 tah, ale v Česnekovém oblaku je zdarma (0 tahů).
_Avoid_: Obrat, Rotace

**Destička**:
Akční karta představující úder, střelu, manévr či obranu s daným poškozením, dosahem a cooldownem.
_Avoid_: Karta, Kouzlo, Skill

**Výstroj (Arzenál)**:
Panel vybavených akčních destiček Venci Česnekáče s individuálními cooldowny, ze kterých se nelízá ani se nezahazují do odhazovacího balíčku. V kódu historicky reprezentován jako `runState.deck` / `state.hand`.
_Avoid_: Dobírací balíček, Balíček karet, Deck

**Fronta komba**:
Zásobník na 3 až 4 destičky, do kterého hráč postupně skládá akce pro hromadný odpal.
_Avoid_: Taktický pás, Fronta přípravy

**Rychlovka**:
Vlastnost akční destičky, která umožňuje její vložení do fronty komba zdarma bez spotřeby tahu (0 tahů).
_Avoid_: Instantka, Blesková akce, Pasivka

**Odpal komba**:
Okamžité postupné provedení všech destiček zařazených ve frontě zleva doprava během jediného tahu bez nutnosti přípravného nápřahu.
_Avoid_: Příprava komba, Spuštění fronty

**Zásobník akcí nepřítele (Action Pool)**:
Seznam akčních destiček s definovanými cooldowny, kterými nepřítel disponuje a ze kterých vybírá schopnosti do své fronty. V kódu `actionPool`.
_Avoid_: Fronta útoků, Legacy queue, Útočný cyklus

**Fronta akcí nepřítele (Action Queue)**:
Fronta až 3 destiček, které si nepřítel postupně plánuje v šedém stavu (QUEUING_GRAY) a po zčervenání (ARMED_RED) je naráz odpálí. V kódu `actionQueue`.
_Avoid_: Sekvence, Útočná řada

**Záměr nepřítele**:
Telegrafovaná akce nepřítele zobrazená nad jeho hlavou včetně odpočtu tahů do spuštění.
_Avoid_: Úmysl, AI plán

**Zčervenání (ARMED_RED)**:
Stav nepřítele s uzamčeným zacílením bezprostředně před odpalem jeho fronty, kdy hráč má k dispozici ještě jednu akci, než útok dopadne.
_Avoid_: Příprava úderu, Výstraha, Blesková reakce

**Friendly Fire**:
Zásah nepřítele jiným nepřítelem způsobený nuceným posunem, otočením nebo odražením do telegrafované zóny zásahu.
_Avoid_: Přátelská palba, Vlastní gól

**Momentum**:
Bonusové zkrácení cooldownů všech destiček v ruce o délku komba při likvidaci posledního nepřítele kombem o 2 a více destičkách.
_Avoid_: Přepřažení, Ráž, Bonus za vítězství

**Kolize**:
Mechanika nárazu posunuté postavy do zdi nebo jiné entity, udělující 1 poškození oběma zúčastněným.
_Avoid_: Stagger, Omráčení nárazem, Nárazový bonus

**Omráčení (Stun)**:
Negativní stav způsobující vynechání následující akce postavy.
_Avoid_: Stagger, Vrávorání

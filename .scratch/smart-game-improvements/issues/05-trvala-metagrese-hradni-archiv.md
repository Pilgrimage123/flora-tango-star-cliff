# 05: Trvalá metagrese a Hradní archiv

**What to build:** Hráč po každé dokončené bitvě a zejména po porážce elit a bossů získává do trvalého profilu novou meta-měnu: Upíří tesáky. V hlavním menu má přístup do obrazovky „Hradní archiv a zbrojnice“, kde může nastřádané tesáky utrácet za odemykání alternativních startovních Výstrojí Venci Česnekáče (např. *Hospodský rváč*, *Svěcený kropič*) a za odemykání nových talismanů a destiček do herního světa.

**Blocked by:** 01: Taktické destičky typu Rychlovka

**Status:** resolved

- [x] V lokálním úložišti (`localStorage`) je rozšířena struktura trvalých statistik o účet Upířích tesáků (`fangs`), seznam odemčených startovních sad Výstroje a odemčených talismanů.
- [x] Vencův postup v běhu (výhry v bitvách, porážka elitních drábů a bossů, likvidace nepřátel) generuje zisk Upířích tesáků, které se bezpečně připisují do trvalého účtu.
- [x] V hlavním menu a na obrazovce konce běhu je dostupné tlačítko pro otevření dialogového okna „Hradní archiv a zbrojnice“.
- [x] V Hradním archivu si hráč může zakoupit odemčení alternativního startovního arzenálu: *Hospodský rváč* (destičky Hospodský půllitr, Facka růžencem, Loket ze šenku, Půllitry na nohou) a *Svěcený kropič* (zaměřený na svěcenou vodu a dálkový boj).
- [x] Před zahájením nové výpravy si hráč může zvolit kterýkoliv ze svých odemčených startovních arzenálů.
- [x] Unit testy ověřují správné přičítání tesáků, perzistenci nákupů a korektní inicializaci nového běhu s alternativním arzenálem.

# 01: Taktické destičky typu Rychlovka

**What to build:** Hráč může ve své Výstroji (Arzenálu) získat a používat specializované akční destičky s vlastností Rychlovka (např. *Pohotový úkrok*, *Stroužek v záloze*, *Loket ze šenku*). Jejich vložení do Fronty komba stojí 0 tahů bez posunu herního času a bez postupu odpočtů nepřátel, což Vencovi umožňuje provádět bleskové taktické manévry před samotným odpalem.

**Blocked by:** None (can start immediately)

**Status:** resolved

- [x] V konfiguraci destiček jsou definovány 3 nové taktické destičky s vlastností `quick: true` (*Pohotový úkrok* – úhybný krok vzad za 0 DMG; *Stroužek v záloze* – bleskové zrušení Zesílení u sousedního nepřítele; *Loket ze šenku* – slabé šťouchnutí s Push 1).
- [x] Vložení destičky s vlastností Rychlovka do Fronty komba (klávesou 1–4 nebo kliknutím) proběhne s cenou 0 tahů (`freeTurn: true`), neinkrementuje počítadlo tahů a nespustí tah nepřátel.
- [x] Karta destičky v ruce, v odměnách i v popisku nápovědy nese zřetelný zářící štítek „⚡ Rychlovka (0 tahů)“.
- [x] Nové destičky typu Rychlovka jsou zařazeny do náhodného fondu odměn po bitvě, do nabídky hospody i kolářské dílny.
- [x] Nové unit testy v testovací sadě herního enginu ověřují, že vložení Rychlovky do fronty neposune odpočty nepřátel a po jejím provedení v kombu se aplikují její efekty.

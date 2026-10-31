# 03: Taktická předpověď a simulace dopadu komba

**What to build:** Hráč vidí při najetí myší (nebo podržení prstu na mobilu) na tlačítko „ODPÁLIT KOMBO“ či na destičku ve Frontě komba živou předpověď výsledku na Bojišti. Poloprůhledné duchové siluety ukážou, kam se postavy po odhození a přitažení posunou, ukazatele zdraví nepřátel zobrazí předpokládaný úbytek HP s lebkou u smrtících zásahů a zvýrazní se nepřátelé, jejichž Záměr bezprostředně zasáhne Vencu v navazující nepřátelské fázi.

**Blocked by:** 02: Živlová a tematická Rezonance komba

**Status:** resolved

- [x] Vytvořen simulační modul enginu, který na čisté kopii stavu synchronně vyhodnotí kroky fronty komba včetně posunů, kolizí, poškození a rezonancí, aniž by ovlivnil reálný stav bitvy.
- [x] Při najetí kurzorem na tlačítko odpalu nebo na karty ve frontě se na Bojišti zobrazí poloprůhledné duchové siluety znázorňující cílové pozice entit po kombo sekvenci.
- [x] Ukazatele zdraví nepřátel zobrazí pruh předpokládaného zranění a ikonu lebky (💀) u cílů, které budou v průběhu komba zlikvidovány.
- [x] Nepřátelé, kteří přežijí a jejichž Záměr po skončení tahu zasáhne pole, na kterém Venca skončí, jsou vizuálně varováni červeným pulzujícím indikátorem hrozby.
- [x] Na dotykových zařízeních je k dispozici režim náhledu předpovědi bez rizika nechtěného odpalu.
- [x] Unit testy ověřují, že simulační funkce předpovědi vrací přesně shodné finální pozice a poškození jako skutečný odpal komba.

# 03: Diegetické terénní dekály a interaktivní taktické tooltipy

**What to build:** Herní prvky terénu (svěcená louže, bodáky, prolomené a neporušené prkno, propast, oblak česneku) se zobrazují jako diegetické grafické dekály položené přímo na povrch kamenné desky bojiště, nikoliv jako rušivé textové odznáčky. Dočasné terény nesou decentní indikátor zbývajících tahů a najetí myší nebo klepnutí zobrazí srozumitelný taktický tooltip s přesným efektem a pravidly.

**Blocked by:** 01: Modulární 2.5D kamenná dráha bojiště a odstranění hardcoded edges

**Status:** resolved

- [x] Z podlahy buněk bojiště jsou odstraněny textové štítky `.terrain-badge`.
- [x] Implementovány vizuální dekály pro všechny typy terénu (`holy_water_puddle`, `spikes`, `pit`, `plank_intact`, `plank_cracked`, `garlic_cloud`) s integrací do povrchu dlaždice.
- [x] U terénů s omezeným trváním se zobrazuje decentní numerický odpočet zbývajících tahů (např. `2t`).
- [x] Dlaždice s aktivním terénem disponuje interaktivním tooltipem při hoveru či dotyku, který uvádí název, trvání a přesný herní efekt (poškození, stun, zablokování kroku).
- [x] Všechny události vstupu na terén (`triggerCellTerrainOnEnter`) i zániku/změny stavu (prolomení prkna, vypršení louže) vizuálně odpovídají stavu dekálu.

## Answer
Nahrazeny textové štítky diegetickými grafickými dekály integrovanými do podlahy kamenné desky bojiště v `renderer.js` a `board.css`. Implementována animovaná kaluž svěcené vody s odlesky, česnekový oblak s pulzující mlhou, kovové kůly s rudými hroty, bezedná propast i celá/prasklá dřevěná prkna. Dočasné terény mají kompaktní numerický badge `[Xt]` a interaktivní hover tooltip s popisem mechaniky. Všechny testy a typová kontrola úspěšně procházejí.

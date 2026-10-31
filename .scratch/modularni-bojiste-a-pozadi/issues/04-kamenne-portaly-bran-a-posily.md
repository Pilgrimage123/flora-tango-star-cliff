# 04: Diegetické kamenné portály bran a varování před posilami

**What to build:** Krajní pole bojiště (pole 0 a `boardSize - 1`) jsou orámována diegetickými kamennými portály s mříží zasazenými přímo do scény. Pokud je naplánován příchod posily v nejbližším tahu (`countdown <= 1`), zevnitř brány začne pulzovat varovná rudá záře a kouř, což hráči přirozeně a bez nutnosti čtení plovoucího textu signalizuje hrozící nebezpečí.

**Blocked by:** 01: Modulární 2.5D kamenná dráha bojiště a odstranění hardcoded edges, 02: Scénické pozadí s 5 tématy ve WebP a konfigurace střetnutí

**Status:** resolved

- [x] Plovoucí textové proužky bran (`.gate-pillar`, `.gate-title`) jsou nahrazeny diegetickými portály zasazenými po stranách dráhy bojiště.
- [x] V klidovém stavu tvoří portály přirozené architektonické zakončení chodby/nádvoří.
- [x] Při naplánované posile se zobrazuje varovný stav: při `countdown <= 1` pulzuje portál rudou září a kouřem signalizujícím bezprostřední vstup upíra na pole.
- [x] Tooltip nebo dotyk na portál přehledně informuje o typu příchozí posily a zbývajících tazích do jejího vstupu na bojiště.
- [x] Portály nezakrývají entity stojící na krajních polích ani jejich ukazatele zdraví a záměry.

## Answer
Plovoucí textové proužky bran byly nahrazeny diegetickými kamennými portály s mříží `.diegetic-gate-portal` na obou krajních polích bojiště v `renderer.js` a `board.css`. Portály integrují železnou mříž, indikátor posily, varovnou rudou pulzující záři a oči při `turnsRemaining <= 1`. Přidáno plnohodnotné interaktivní tooltipové okno zobrazující detail posily (jméno nepřítele, max HP a zbývající tahy). Portály jsou kompaktní a nepřekrývají postavy ani jejich záměry. Všechny testy a typová kontrola procházejí.

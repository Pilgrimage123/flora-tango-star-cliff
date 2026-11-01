# 02: Dramatická vylepšení krevních částic, stuh v letu, organických kaluží na kameni a stékání přes hranu

**What to build:** Posunout vizuální kvalitu a dynamiku krve na špičkovou úroveň: přidat kapalinové tepenné stuhy v letu (`jet`/`spurt` trails), sečnou krvavou vlnu a záblesk rány, vyřešit z-index překrývání podlahy kamenným kvádrem, implementovat organické vícelaločné Bézierovy kaluže s pramínky stékajícími přes hranu kamene, fyzikální rozstřik do sousedních polí a zvýraznění zraněných postav při zásahu.

**Blocked by:** 01

**Status:** resolved

- [x] Přidány kapalinové stuhy v letu (`trail`) s postupným zužováním a mokrým leskem.
- [x] Přidán směrový oblouk seknutí čepelí (`slash_wave`) a aerosolový rázový záblesk (`flash`).
- [x] Kaluže leží přímo na povrchu `.cell-floor-stone` (`z-index: 5`) a nestíní je neprůhledný kamenný blok.
- [x] Zaveden generátor organických vícelaločných kaluží `buildOrganicPuddlePath` namísto jednoduchých elips.
- [x] Přidány svislé pramínky stékající dolů po čelní hraně kamenného kvádru (`drips` a `ledge_drip`).
- [x] Fyzikální rozstřik na sousední pole za cílem u silných/smrtících zásahů i u dopadajících těžkých kapek.
- [x] Přidán nový typ rány `arterial` na postavách a krátký odlesk při zásahu `.blood-hit-gleam`.
- [x] Jednotkové testy `blood.test.js`, typecheck, produkční build a browser smoke test úspěšně prošly.

## Answer
Všechny požadované efekty byly implementovány v `src/game/ui/blood.js` a `src/game/styles/board.css`, otestovány v test suite a vizuálně ověřeny v prohlížeči.

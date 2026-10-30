# Synchronizace událostí a životní cyklus animací na bojišti

V původním prototypu se po dokončení herní logiky tahu okamžitě volalo kompletní překreslení bojiště (`renderAll()`) ještě před spuštěním sekvence animací (`playEngineEvents()`). To vedlo k vizuální desynchronizaci: entity okamžitě skákaly na 0 HP nebo se teleportovaly na cílová pole ještě dřív, než animace nápřahu, úderu nebo kroku vůbec začala. Zároveň Venca po útoku či zásahu zůstával trvale uzamčen v pózách `attack` nebo `hurt` a po své porážce byl nuceně vzkříšen do živého stavu `venca_idle.png`.

Rozhodli jsme se sjednotit životní cyklus animací a synchronizaci stavu podle těchto zásad:

1. **Událostmi řízená vizualizace (Event-Driven Visual Sync)**: Kompletní strukturální překreslení DOMu (`renderAll()`) se spouští až po odeznění celé sekvence událostí. Během běhu `playEngineEvents` se změny životů (`damage`, `heal`) a statusů projevují do DOMu inkrementálně v reálném čase souběžně s plovoucími čísly a částicovými efekty.
2. **Přísný životní cyklus póz Venci**: Venca automaticky přechází z póz `attack` a `hurt` zpět do klidového stavu `idle` po vypršení definovaného časovače. Při dosažení 0 HP zůstává Venca trvale v póze `hero.dead` a funkce klidového režimu (`startHeroIdle`) je pro padlého hrdinu striktně zablokována.
3. **Asymetrický model animací nepřátel**: Nepřátelé si zachovávají architekturu jediného grafického portrétu animovaného procedurálními CSS transformacemi (`lungeStrike`, `shootSnap`, `hurtFlinch`, `deathFall`), přičemž byly vyhlazeny přechodové artefakty (např. doskok `boundStep`).
4. **Plynulý posun a projektily na bojišti**: Krok a nucený pohyb probíhají plynulým horizontálním posunem (`translateX`) po kamenných deskách bojiště podle skutečného vektoru pohybu. Dálkové útoky (`projectile_vfx` i `enemy_projectile_vfx`) mají vyhrazený letící tematický element po ose bojiště s časováním vázaným na herní nastavení rychlosti (`animSpeed`).

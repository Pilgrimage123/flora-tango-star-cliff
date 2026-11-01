# Spec: Částicové efekty krve, trvalé stopy na zemi a na spritech postav

## Cíl
Zdokonalit vizuální zpracování krve a ichoru v soubojích:
1. **Oprava vad původního systému částic (`blood.js`)**:
   - Odstranit vymazání stop po dokončení animace částic (`particles.length === 0`).
   - Opravit úroveň dopadu na podlahu (`ground`), aby kapky nedopadaly do vzduchu u létajících a drobných nepřátel.
   - Přesunout plátno z `body` přímo do `#battlefield-stage`, aby se zamezilo driftu při scrollování a překrývání mapy.
2. **Trvalé stopy krve na zemi (Ground Stains)**:
   - Zavedení diegetické vrstvy `.cell-ground-blood-zone` v každé kamenné buňce bojiště.
   - Louže, cákance a satelitní kapičky odpovídající typu ichoru (červená krev, modrý upíří ichor, zelený jedovatý sliz) zůstávají na kamenných deskách po celou dobu trvání bitvy.
3. **Trvalé krvavé stopy na spritech (Sprite Blood Overlay)**:
   - Zavedení vrstvy `.sprite-blood-overlay` uvnitř `.sprite-flip-wrapper`.
   - Zraněné entity (lovec i nepřátelé) akumulují sečné rány, cákance a stékající krev, která se přirozeně zrcadlí s otočením postavy a hýbe se s animacemi.
   - Zásahy zblízka ($\le 1$ pole) postříkají i útočníka ichorem cíle.
4. **Působivější dynamika částic**:
   - Aerodynamické kapky natahující se podle směru a rychlosti letu.
   - Tepenné gejzíry, odskakující kapičky při dopadu, bubliny, jiskry a smrtící rázová vlna.
5. **Dramatická vylepšení a organické kaluže (v1.7.1)**:
   - Tepenné stuhy v letu (`jet` & `spurt` trails) s kapalinovými křivkami.
   - Seknutí čepelí a rázový záblesk rány (`slash_wave` & `flash`).
   - Oprava vrstvení `z-index`: kaluže leží přímo na kamenných blocích `.cell-floor-stone`.
   - Organické vícelaločné Bézierovy kaluže (`buildOrganicPuddlePath`) a stékání pramínků přes přední hranu kamene.
   - Fyzikální rozstřik na sousední pole a vycentrování krvavých šrámů na siluety postav.

## Fáze realizace (Tikety)
1. `01`: Oprava plátna, trvalé stopy na podlaze bojiště a spritech postav s podporou tří barev ichoru. (hotovo)
2. `02`: Dramatická vylepšení krevních částic, stuh v letu, organických kaluží na kameni a stékání přes hranu. (hotovo)

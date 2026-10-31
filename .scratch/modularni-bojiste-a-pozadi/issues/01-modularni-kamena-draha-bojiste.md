# 01: Modulární 2.5D kamenná dráha bojiště a odstranění hardcoded edges

**What to build:** Hráč vidí jednotné, plastické a geometricky stabilní 1D bojiště složené z modulárních kamenných desek s 2.5D zkosenou čelní hranou, spárami a vrženým stínem. Postavy (Venca, nepřátelé) i veškeré indikátory ohrožení a záměrů stojí spolehlivě ukotvené na deskách na mobilu i na širokoúhlém desktopu bez ohledu na velikost bojiště (7 i 9 polí). Zastaralé ruční mapování `edges` a magické CSS vzorce jsou kompletně odstraněny.

**Blocked by:** None (can start immediately)

**Status:** resolved

- [x] V `renderer.js` a `board.css` je odstraněna závislost na `PAINTED_SCENES` s manuálně měřenými procenty `edges` a kalkulacemi s fixním poměrem stran.
- [x] Zavedena komponenta/layout modulární kamenné dráhy, která dynamicky generuje kamenné desky pro libovolný počet polí (`boardSize: 7` až `9`).
- [x] Kamenné desky mají vizuální 2.5D hloubku (zkosenou čelní hranu, spáry mezi deskami a spodní stín).
- [x] Entity, ukazatele zdraví, jmenovky a záměry jsou přesně vycentrovány nad odpovídající kamennou deskou a neposouvají se při změně šířky či výšky okna.
- [x] Všechny existující herní mechaniky (posun, friendly fire, dosahy destiček, drag-and-drop fronta komba) fungují beze změny a procházejí testy.

## Answer
Implementována modulární 2.5D kamenná dráha v `src/game/ui/renderer.js` a `src/game/styles/board.css`. Zastaralé pole `PAINTED_SCENES` s manuálními procenty spár `edges` a závislost na fixních poměrech stran byly kompletně odstraněny. Zaveden dedikovaný kontejner `.battlefield-stone-track` s dynamickým počtem sloupců `var(--board-size)` a plastické desky `.board-cell` s 2.5D zkosením (`.cell-slab-bevel`), vrženým stínem a chiseled hranami. Všech 35 testů enginu a typová kontrola úspěšně procházejí.

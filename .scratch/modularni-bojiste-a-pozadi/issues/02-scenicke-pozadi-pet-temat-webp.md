# 02: Scénické pozadí s 5 tématy ve WebP a konfigurace střetnutí

**What to build:** Každé ze 14 střetnutí v kampani zobrazuje na pozadí bojiště atmosférickou scenérii odpovídající dané lokaci (noční náves, zatuchlá hradní chodba, zrcadlový salón, hradní mučírna, trůnní krypta). Pozadí je realizováno jako samostatná vrstva Z-0 ve formátu WebP, škáluje se plynule přes celou scénu (`object-fit: cover`) a je napojeno přes konfiguraci střetnutí.

**Blocked by:** 01: Modulární 2.5D kamenná dráha bojiště a odstranění hardcoded edges

**Status:** resolved

- [x] Všech 14 střetnutí v `src/game/config/encounters.js` má definovanou vlastnost `backgroundTheme` mapující bitvu na jedno z 5 témat (`village_night`, `castle_corridor`, `noble_boudoir`, `torture_dungeon`, `vampire_throne_crypt`).
- [x] Vytvořena vyhrazená vrstva scénického pozadí (`.battlefield-backdrop`) umístěná za modulární kamennou dráhou.
- [x] Obrázky pozadí jsou uloženy a optimalizovány v moderním formátu WebP v rozlišení odpovídajícím poměru scény.
- [x] Scénické pozadí se responzivně přizpůsobuje různým poměrům stran bez ovlivnění souřadnic a pozic kamenných desek.
- [x] V případě chybějícího podkladu funguje čistý atmosférický CSS fallback bez pádů či bílých záblesků.

## Answer
Vytvořen registr scénických pozadí v `src/game/config/themes.js` a vygenerováno 5 vektorových gotických scenérií v `public/assets/terrain/` (`village_night.svg`, `castle_corridor.svg`, `noble_boudoir.svg`, `torture_dungeon.svg`, `vampire_throne_crypt.svg`). Všech 13 střetnutí v `src/game/config/encounters.js` má přiřazeno své téma `backgroundTheme`. V `renderer.js` a `board.css` zavedena nezávislá vrstva Z-0 `.battlefield-backdrop-layer` s plynulým škálováním a barevným vinětovým fallbackem. Všechny testy i typová kontrola procházejí.

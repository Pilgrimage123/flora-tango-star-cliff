# Oddělení scénického pozadí a modulární architektura bojiště

## Kontext
Původní implementace používala monolitické rastrové kresby, kde byly kamenné desky bojiště namalovány přímo v ilustraci pozadí v pevné perspektivě. Hranice buněk byly v kódu zadrátovány v manuálně změřených procentech šířky (`edges`), zatímco vertikální pozice nohou postav spoléhala na křehké CSS vzorce závislé na konkrétním poměru stran obrázku. To vedlo k vizuálnímu rozpadu zarovnání při změně poměru stran (mobily vs. desktop) a znemožnilo snadné přidávání pozadí pro zbývajících 12 střetnutí.

## Rozhodnutí
Bojiště dělíme do tří samostatných vrstev:
1. **Scénické pozadí (Z-0)**: Čistě atmosférická kulisa lokace ve formátu WebP (16:9 / 21:9) škálovaná přes `object-fit: cover`, bez závislosti na konkrétních pozicích polí.
2. **Rovina střetnutí (Z-1)**: Modulární kamenné desky bojiště generované dynamicky podle parametru `boardSize` (7 až 9 polí) s diegetickými terénními dekály (svěcená louže, bodáky, prolomené prkno) přímo na dlažbě namísto textových badge štítků.
3. **Atmosférické popředí (Z-2)**: Odlehčené vizuální efekty hloubky (vinětace, klenby bran, kouř/mlha).

## Důsledky
- Buňky a postavy mají stoprocentně zaručené zarovnání na jakémkoliv zařízení bez ohledu na rozlišení či poměr stran.
- Každé střetnutí v kampani může mít přiřazené vlastní scénické pozadí z definovaného katalogu témat bez nutnosti ručního měření pixelových souřadnic.
- Všechny vizuální podklady přecházejí na komprimovaný WebP, což redukuje paměťový a přenosový objem o více než 75 %.

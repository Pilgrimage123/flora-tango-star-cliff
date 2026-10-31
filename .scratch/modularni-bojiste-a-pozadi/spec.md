# Spec: Modulární bojiště a scénická pozadí

## Cíl
Transformovat vizuální prezentaci 1D bojiště ze zastaralého systému monolitických kreseb s ručně měřenými pixelovými hranami (`PAINTED_SCENES`, `edges`) na moderní 3-vrstvou hloubkovou kompozici:
1. **Scénické pozadí (Z-0)**: Atmosférické kulisy lokací (5 témat pro všech 14 střetnutí v kampani) ve formátu WebP škálované plynule přes celou šířku/výšku bez závislosti na geometrii herních polí.
2. **Rovina střetnutí (Z-1)**: Modulární 2.5D kamenné desky bojiště pro libovolný počet polí (`boardSize: 7` až `9`), na nichž postavy a indikátory pevně a spolehlivě stojí bez rozpadu zarovnání na jakémkoliv zařízení. Diegetické terénní dekály (svěcená louže, bodáky, prolomené prkno, česnek) položené přímo na podlahu s decentním odpočtem trvání a taktickým tooltipem. Diegetické kamenné portály bran pro příchod posil.
3. **Atmosférické popředí (Z-2)**: Odlehčená vinětace a jemné částicové efekty (prach, mlha) integrující scénu v temně stylizovaný celek rogue-lite žánru.

## Architektonický kontext
- Rozhodnutí je formalizováno v [ADR 0004](../../docs/adr/0004-decoupled-battlefield-layers-and-modular-terrain.md).
- Terminologie je zanesena v [GLOSSARY.md](../../GLOSSARY.md).

## Fáze realizace (Tikety)
1. `01`: Modulární 2.5D kamenná dráha bojiště a odstranění hardcoded edges
2. `02`: Scénické pozadí s 5 tématy ve WebP a konfigurace střetnutí
3. `03`: Diegetické terénní dekály a interaktivní taktické tooltipy
4. `04`: Diegetické kamenné portály bran a varování před posilami
5. `05`: Atmosférické popředí (Z-2) a responzivní odladění scény

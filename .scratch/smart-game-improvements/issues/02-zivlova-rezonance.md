# 02: Živlová a tematická Rezonance komba

**What to build:** Hráč může skládáním tématicky spřízněných destiček do Fronty komba vyvolat silný Rezonanční efekt. Každá destička náleží do rodiny (Česneková, Svěcená, Hospodská, Řemeslná). Pokud hráč zařadí 2 a více destiček stejné rodiny (nebo specifickou dvojici Česnek + Svěcená), při Odpalu komba se automaticky aktivuje synergický bonus (česnekový oblak, štít, prodloužený odhoz nebo vrácení cooldownu).

**Blocked by:** None (can start immediately)

**Status:** resolved

- [x] Všechny destičky hrdiny mají v definici přiřazeny tematické tagy (`garlic`, `holy`, `brawl`, `craft`).
- [x] Karty destiček v ruce zobrazují tematickou ikonu své rodiny (🧄 Česnek, ✝️ Svěcená, 🍺 Hospoda, ⚙️ Řemeslo).
- [x] Ve Frontě komba se při zařazení synergické kombinace zobrazí aktivní rezonanční odznak se svítícím rámečkem a popisem bonusu.
- [x] Při Odpalu komba engine vyhodnotí složení fronty a emituje událost `resonance_burst` s konkrétním účinkem (Česnek: oblak na pole před Vencu; Svěcená: 1 Štít pro Vencu; Hospoda: +1 pole ke všem Push efektům komba; Řemeslo: -1 CD náhodné destičce v ruce; Česnek+Svěcená: posvěcený opar za 1 DMG všem sousedům).
- [x] V kronice bitvy (Combat Log) se zobrazí dedikovaný záznam o vyvolané Rezonanci.
- [x] Unit testy v enginu ověřují správnou detekci synergií a deterministickou aplikaci rezonančních efektů na bojišti.

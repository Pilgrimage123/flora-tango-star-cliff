# 04: Interaktivní překážky na bojišti: Kropenka a Zrcadlo

**What to build:** Hráč může na Bojišti takticky využívat nové zničitelné a interaktivní objekty: kamennou Kropenku se svěcenou vodou (která po nárazu nepřítele či zásahu střelou exploduje a postříká okolní pole svěcenou vodou) a Hradní zrcadlo pravdy (které odráží letící projektily o 180 stupňů zpět).

**Blocked by:** None (can start immediately)

**Status:** resolved

- [x] V konfiguraci rekvizit a terénu jsou definovány nové objekty `holy_font` (Kropenka) a `mirror` (Zrcadlo).
- [x] Kropenka má 1 HP a vlastnost `destructible: true`. Při zásahu útokem, projektilem nebo při kolizi s odhozenou entitou se roztříští a aplikuje 2 DMG všem nemrtvým na svém poli a sousedních polích a zanechá posvěcenou louži.
- [x] Zrcadlo odráží letící dálkové střely (včetně stříkaček a razítkových střel nepřátel) v opačném směru po ose Bojiště.
- [x] Grafické ikony a CSS animace roztříštění Kropenky a odrazu projektilu od Zrcadla jsou integrovány do renderovacího subsystému.
- [x] Kropenka i Zrcadlo jsou zařazeny do vybraných střetnutí a terénních šablon v aktech 1, 2 a 3.
- [x] Unit testy ověřují rozbití kropenky nárazem, plošné poškození a správné otočení dráhy projektilu při nárazu do zrcadla.

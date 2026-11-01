# 01: Oprava plátna, trvalé stopy na podlaze bojiště a spritech postav s podporou tří barev ichoru

**What to build:** Opravit chyby původního plátna částic (mizení po odeznění, padání do vzduchu u letců, odtržení od arény), implementovat trvalé stopy krve a ichoru na kamenné podlaze bojiště i na spritech lovce a nepřátel, a zvýšit působivost částic (aerodynamická deformace, rázové vlny, bubliny, jiskry).

**Blocked by:** None

**Status:** resolved

- [x] Opraveno plátno `blood-fx-canvas` (ukotveno v `#battlefield-stage`, neničí se při prázdných částicích, žádný drift).
- [x] Úroveň země se počítá z kamenných desek polí bojiště namísto spodu spritu.
- [x] Trvalé stopy krve na zemi (`.cell-ground-blood-zone`) pro červenou, modrou i zelenou krev.
- [x] Trvalé rány a stříkance na spritech postav (`.sprite-blood-overlay`) pro lovce i nepřátele s podporou kontaktního postříkání.
- [x] Působivé částice s aerodynamickým protažením kapek, smrtící rázovou vlnou a mikrocákanci.
- [x] Všechny testy (včetně nového `tests/blood.test.js`) procházejí.

## Answer
Kompletně přepracován soubor `src/game/ui/blood.js`, styly v `animations.css` a `board.css`, integrováno do `renderer.js`, `battle.js` a `state.js`. Vše ověřeno jednotkovými testy i automatizovaným browser testem s reálným pořízením screenshotů.

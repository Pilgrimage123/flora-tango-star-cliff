# Changelog

Veškeré významné změny v projektu Lovec upírů jsou zaznamenány v tomto souboru.

Formát vychází z [Keep a Changelog](https://keepachangelog.com/cs/1.1.0/).

## [1.1.0] - 2026-10-30

### Přidáno
- **Doménová dokumentace a ADR**:
  - `GLOSSARY.md` — závazný slovník pojmů (Bojiště, Tah, Krok, Výstroj / Arzenál, Fronta komba, Rychlovka, Odpal komba, ARMED_RED, Friendly Fire, Momentum, Kolize, Omráčení).
  - `docs/adr/0001-queue-direct-execution-and-synchronous-pacing.md` — architektonické rozhodnutí k okamžitému odpalu komba bez nutnosti přípravného tahu.
  - `docs/adr/0002-action-pool-and-arsenal-data-structure.md` — sjednocení akčního modelu nepřátel (`actionPool` + `actionQueue`) a formalizace konceptu Výstroje (Arzenálu).
- **Mechanika Rychlovka (`quick: true`)**:
  - Plná podpora v enginu (`playerEnqueueTileNoEnd` / `playerEnqueueTile`), umožňující vložení vybraných destiček do fronty komba zdarma bez spotřeby tahu světa (`freeTurn: true`).
- **Centrální správa statusů**:
  - Funkce `hasStatus`, `getStatusAmount` a `consumeStatus` v `src/game/engine/board.js` pro bezpečné čtení, odečítání a automatické promazávání vyčerpaných statusů.
- **Testovací pokrytí**:
  - Rozšíření nativní testovací sady `tests/engine.test.js` na 24 komplexních testovacích sad (pokrytí Rychlovky, čistoty datových struktur nepřátel a fungování helperů statusů).

### Změněno
- **Optimalizace assetů a grafiky**:
  - Drastická redukce velikosti složky `public/assets/` z 27.5 MB na 11.5 MB (úspora 16 MB).
  - Resampling a downscale 20 nadrozměrných textur nepřátel a postav na max 512px se zachováním 32-bitové RGBA průhlednosti.
  - Optimalizace pozadí `naves-yard.jpg` (2752×1536 na 1920×1072, JPEG q85).
  - Doplnění registrace chybějících klíčů scén v `public/assets/manifest.json`.
- **Refaktoring modelu nepřátel a AI**:
  - Sjednocení nepřátel na moderní model `actionPool` (dostupné schopnosti a cooldowny), `actionQueue` (naplánované akce) a `queueState` (`EMPTY`, `QUEUING_GRAY`, `ARMED_RED`).
  - Vyčištění logiky v `threat.js` a `enemyAI.js` od duplicitních větví starého cyklického systému.
- **Pravidla a tempo hry**:
  - Běžný krok je striktně blokován obsazeným polem (přeskakovat může výhradně manévr typu `Hospodský přemet`).
  - Zrušen mrtvý kód přípravy fronty (`playerPrepareQueue`, `isQueuePrepared`) a nepoužívané CSS třídy.
  - Odstraněn mrtvý kód pro poziční bonusy slotů a bonusové otočení cíle (`bonuses.flipTarget`).

### Odstraněno
- Smazány osiřelé a nepoužívané textury postav: `venca_idle_b.png`, `venca_walk_a.png`, `venca_walk_b.png`.
- Odstraněna mrtvá exportovaná funkce `advanceEnemyTileQueue`.
- Vyřazen koncept Staggeru (zůstává pouze přímé Stun omráčení).

### Opraveno
- Detekce klávesové zkratky F1 (Herní manuál) v `src/game/ui/input.js` nezávisle na velikosti písmen (`key.toLowerCase() === 'f1'`).
- Opraven callback dokončení bitvy po porážce bosse v `src/game/battle.js` na správné `completeCurrentNodeAndShowMap()`.
- Nahrazeno pomalé hluboké klonování `structuredClone(enemy)` ve spawneru za lehký event payload.

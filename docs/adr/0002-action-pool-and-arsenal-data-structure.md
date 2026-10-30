# Jednotný model akcí nepřátel a koncept Výstroje (Arzenálu)

Původní implementace nepřítele kombinovala dva paralelní systémy chování: starší cyklickou frontu (`queue`, `queueIndex`, `countdown`) a novější kombinační systém (`actionPool`, `actionQueue`, `queueState`, `comboCapacity`, `nextAction`). Rozhodli jsme se data i chování sjednotit výhradně do moderního modelu:

1. **Jednotný model nepřítele**: Nepřítel disponuje zásobníkem schopností (`actionPool`) a dynamickou frontou (`actionQueue`). Mrtvý kód a větvení pro legacy `queue` a `queueIndex` byly kompletně odstraněny ze stavového modelu, vyhodnocování hrozeb (`threat.js`), chování umělé inteligence (`enemyAI.js`) i testů.
2. **Konzistentní správa statusů**: Manipulace se stavy entit (`stun`, `confusion`, `bleed`, `shield`, `empower`) byla centralizována do helperů `hasStatus`, `getStatusAmount` a `consumeStatus` v `board.js`, čímž se předešlo roztroušenému ručnímu snižování čítačů a nekonzistentním mazáním klíčů v objektech statusů.
3. **Výstroj (Arzenál) místo balíčku**: Kolekce destiček Venci (`runState.deck` / `state.hand`) představuje fixní akční výstroj s individuálními cooldowny, z níž se nelízá ani se nezahazuje do hřbitova. V doménovém jazyce je termín standardizován jako Výstroj / Arzenál.

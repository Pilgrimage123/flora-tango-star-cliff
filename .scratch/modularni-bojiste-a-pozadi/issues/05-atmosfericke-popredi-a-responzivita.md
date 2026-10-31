# 05: Atmosférické popředí (Z-2) a responzivní odladění scény

**What to build:** Scéna bojiště získává finální hloubku a temnou atmosféru díky vrstvě popředí (Z-2) s jemnou vinětací a odlehčenými atmosférickými částicemi (mlha, polétavý prach). Celá kompozice (pozadí, modulární dráha, portály, entity, kombo fronta) je optimalizována pro plynulý běh na mobilních i desktopových zařízeních a plně respektuje nastavení sníženého pohybu.

**Blocked by:** 02: Scénické pozadí s 5 tématy ve WebP a konfigurace střetnutí, 03: Diegetické terénní dekály a interaktivní taktické tooltipy, 04: Diegetické kamenné portály bran a varování před posilami

**Status:** resolved

- [x] Zavedena lehká vrstva popředí Z-2 s jemnou vinětací podtrhující temnou gotickou atmosféru hry.
- [x] Implementovány jemné částicové/kouřové efekty s nulovým dopadem na výkon na mobilních zařízeních.
- [x] Plná podpora `@media (prefers-reduced-motion: reduce)` – animace a částice se automaticky ztlumí nebo deaktivují.
- [x] Vizuální ověření a responzivní odladění na kompaktních smartphonech (iPhone SE, Android ~375–412px šířky) i desktopu (1920×1080).
- [x] Úspěšné projetí testů (`npm run test`) a typové kontroly (`npm run typecheck`).

## Answer
Vytvořena vrstva Z-2 `.battlefield-foreground-layer` s tmavou vinětací a odlehčenými částicemi prachu a kouře (`.mote`) v `renderer.js` a `board.css`. Částice jsou plně hardwarově akcelerované v CSS a vypínají se při `@media (prefers-reduced-motion: reduce)`. Všechny vrstvy bojiště jsou responzivně odladěny pro kompaktní smartphony i velká desktopová rozlišení. Úspěšně proběhly všechny testy, typová kontrola i produkční build.

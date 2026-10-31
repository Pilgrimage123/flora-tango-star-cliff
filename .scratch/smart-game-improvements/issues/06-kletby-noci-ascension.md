# 06: Kletby noci a Síň slávy (Ascension I–V)

**What to build:** Hráč po prvním vítězství nad Hrabětem Drákulou odemkne systém Kleteb noci (stupně obtížnosti I až V). Před startem výpravy si může aktivovat kletbu (např. dřívější příchod posil, zdražení v podzámčí, štíty u elit), která přináší tvrdší výzvu, násobič zisku Upířích tesáků a zápis do prestižní Síně slávy.

**Blocked by:** 05: Trvalá metagrese a Hradní archiv

**Status:** resolved

- [x] V enginu je implementován systém modifikátorů běhu pro 5 stupňů Kleteb noci:
  - Kletba I (Neklidná hrobka): Posily z hradních bran nastupují o 1 tah dříve.
  - Kletba II (Drahota v podzámčí): Ceny v hospodě a kolářské dílně jsou vyšší o 25 %.
  - Kletba III (Obrnění drábové): Elitní nepřátelé vstupují do boje s 1 Štítem navíc.
  - Kletba IV (Zemdlený lovec): Venca začíná výpravu s −2 maximálními HP.
  - Kletba V (Pán temnoty): Hrabě Drákula má o 25 % více HP a zkrácené odpočty útoků.
- [x] Před startem nového běhu přibyde volič stupně Kletby noci (aktivní po prvním vítězství v aktu 3).
- [x] V záhlaví HUD a na mapě výpravy se zobrazuje odznak aktuálně platné Kletby noci.
- [x] Vítězství s aktivní kletbou odemkne následující stupeň, udělí bonusový násobek Upířích tesáků a zaznamená výsledek do Síně slávy.
- [x] Unit testy ověřují, že aktivní kletby korektně modifikují časování posil, ceny v obchodech a parametry elitních nepřátel.

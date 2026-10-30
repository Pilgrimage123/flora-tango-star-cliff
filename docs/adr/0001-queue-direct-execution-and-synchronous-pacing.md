# Okamžitý odpal komba a synchronní tempo fronty

V původním prototypu vyžadovalo odpálení komba přípravný tah (`playerPrepareQueue`) a destičky měly poziční bonusy (Otevírák a Zakončovák). Rozhodli jsme se přípravný tah i poziční bonusy ze hry trvale vyřadit: vložení běžné destičky do fronty stojí 1 tah (a posouvá tah nepřátel), zatímco odpálení celé fronty komba je okamžité za 1 tah bez mezi-kroku. Pro plánované budoucí taktické destičky zachováváme mechaniku Rychlovka (`quick: true`), která umožní vložení do fronty za 0 tahů bez posunu světa.

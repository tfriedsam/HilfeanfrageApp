# HilfeanfrageApp
NeueNaeheHackathon: Versendung einer Hilfeanfrage per APP, welche sich in geographischer Nähe befinden

Basisidee:

Eine App, in der ein Behinderter ein Hilfegesuch samt Standort senden kann, wenn er einmal nicht weiterkommt! Beispiel: Er steht vor drei Treppen oder einem sonstigen Hinderniss mit seinem Rollstuhl und kommt nicht weiter. Ich stehe um die Ecke und sehe das nicht. Die App sendet den Hilferuf an alle Menschen, die sich zum Beispiel im Umkreis von 200 Metern in der Stadt um ihn herum aufhalten und zack - da ich davon weiß, gehe ich um die Ecke und kann ihm schon helfen! Oder ein kleinwüchsiger Mitmensch, der eine Klingel oder einen Türöffner nicht erreichen kann. Mensch mit Sehschwäche, dem sein Standardweg durch eine Baustelle versperrt ist und den Alternativweg nicht erkennen und finden kann. 

Anforderung:
Der Senderadius sollte abhängig gemacht werden von Tageszeit und Lauffrequenz (Innenstadt/ Wohngebiet). Es nützt ja nichts, wenn ich Hilfegesuche aus dem anderen Ende von Köln bekomme. Oder es zu viele werden, weil ich jedes Gesuch von Köln mitbekomme - auch die räumlich zu weit entfernten. Das System soll dem Nutzer auch Sicherheit bieten. Deswegen wird die Rufnummer des Hilfegebers protokolliert. Weitere Möglichkeiten zur Identifizierung der Nutzer können bei Bedarf eingepflegt werden.

Zukunftsausblick:
Die Idee, die App kann auf weitere Zilgruppen ausgedehnt werden. Zum Beispiel für Personen, die einen Übersetzer vor Ort suchen. Tourist in Berlin, der Fragen zum Personennahverkehr hat. Flüchtling, der beim Einkaufen Fragen an den Verkäufer stellen möchte.  



Essenz, Grundgedanke, Motivation:
Für mich ist Hilfe wenn ich in der Nähe bin kein großes Ding, für den Behinderten schon! Und macht man auch sehr gerne!
Die aktuelle "Alltags"-Barriere, die der Hilfesuchende ohne Hilfe nicht oder nur sehr zeitaufwändig oder mühsam bewältigen kann, kann ier mit mir zusammen in wenigen Minuten oder gar wenigen Sekunden bewältigen.

Konkretisierungsvorschlag:

In der APP wird eine Feststellung des eigenen Standortes per GPS benötigt. Basierend darauf kann dann eine Hilfeanfrage gesendet werden. Hierzu bietet dei App  
Die Hilfeanfrage geht dann an alle sich im angegebenen Radius befindlichen Geräte heraus. Voraussetzung wird sein, dass diese ebenfalls die APP aktiviert haben.


Ablaufplan zur Umsetzung: 

	a. Alle Apps schicken Ihre Position regelmäßig an den Server
	b. Server speichert die Positionen
	c. App Nutzer sendet eine Hilfeanfrage
	d. Dazu wird die aktuelle Position an den Server übermittelt
	e. Der Server prüft, on sich Nutzer in der Nähe befinden
	f. Wenn nicht, wird an den Anfragenden eine Nachricht gesendet, dass aktuell kein Nutzer in der Nähe ist
	g. Wenn ja, wird die Anfrage an alle Apps in der Nähe (erweiterter Bereich wegen Aktualisierung) geschickt
	h. Die App prüft beim Empfänger ob er sich noch im Umkreis befindet
	i. Wenn ja wird eine Push Notifikation angezeigt
	j. Der Nutzer kann die Hilfeanfrage annehmen oder ablehnen
	k. Bei Annahme wird eine Nachricht an den Sender geschickt, dass Hilfe unterwegs ist und wie weit die Hilfe noch weg ist
	l. Der Nutzer der annimmt bekommt eine Karte angezeigt mit der Route zum hilfsbedürftigen



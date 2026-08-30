# 21 lieux à débloquer — 126 photos à demander

Ces lieux passent tous les critères de publication (description, capacité, 6 photos)
**sauf un** : leurs 6 photos viennent intégralement de Google Places ou de Kactus,
donc aucune n'est republiable. Il faut 6 photos par lieu, fournies par le lieu.

Une fois les photos reçues et chargées dans le CRM, relancer :

```bash
cd SITE-WEB
DIRECT_URL=… node scripts/venues/export-venues.mjs
```

Le lieu apparaît automatiquement sur `/lieux`, sur sa landing départementale et
dans `llms.txt`.

| Lieu | Dépt | Capacité | Photos à obtenir |
|---|---|---:|---:|
| Paris Country Club | 92 | 1 500 | 6 |
| Nomade Lodge | 77 | 260 | 6 |
| Hectar | 78 | 250 | 6 |
| Resort Barrière Enghien-les-Bains | 95 | 209 | 6 |
| Relais de la Malmaison | 92 | 200 | 6 |
| Les Demeures de Varennes | 91 | 180 | 6 |
| Manoir de Gressy | 77 | 180 | 6 |
| Waldorf Astoria Versailles | 78 | 180 | 6 |
| Hôtel L'Élysée Val d'Europe | 77 | 179 | 6 |
| Le Domaine des Vanneaux | 95 | 150 | 6 |
| Hôtel Mercure Paris Vélizy | 78 | 150 | 6 |
| Le Moulin de la Forge | 60 | 140 | 6 |
| Le 58 Meeting Place | 92 | 130 | 6 |
| La Charbonerie | 92 | 90 | 6 |
| Les Herbes Folles | 77 | 80 | 6 |
| Le 67 Meeting Place | 92 | 80 | 6 |
| Huttopia Rambouillet | 78 | 70 | 6 |
| Hameaux des Lacs | 91 | 50 | 6 |
| Hôtel Mercure Bussy Saint-Georges | 77 | 50 | 6 |
| Moulin de Vilgris | 78 | 15 | 6 |
| Salle de réunion Jumanji | 92 | 10 | 6 |

**Priorité commerciale** : les quatre premiers pèsent le plus lourd — Paris Country
Club (1 500 personnes) est le plus gros lieu de tout le périmètre, et il est absent
du site.

**Gain** : 72 → 93 fiches. Le Val-d'Oise passerait de 11 à 13 lieux, les
Hauts-de-Seine de 7 à 13.

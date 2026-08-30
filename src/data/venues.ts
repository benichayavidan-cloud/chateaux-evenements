// ⚠️ FICHIER GÉNÉRÉ — ne pas éditer à la main.
// Source : CRM V2, table Prestataire. Régénérer avec :
//   DATABASE_URL=… node scripts/venues/export-venues.mjs
//
// Périmètre : départements 78, 60, 77, 95, 91, 92. Exclut les lieux déjà
// publiés sous alias sur /chateaux, et ceux dont le code postal contredit le
// département déclaré. Seuil de publication :
// description > 400 caractères, capacité renseignée, 6 photos minimum, et aucune
// photo issue de Google Places ou de Kactus (droits).
// Généré le 2026-08-30 — 68 lieux.

export interface VenuePhoto { url: string; legende: string | null; categorie: string | null }
export interface VenueSalle { nom: string; surface: number | null; theatre: number | null; u: number | null; banquet: number | null; cocktail: number | null }

export interface Venue {
  id: string; slug: string; nom: string; categorie: string;
  ville: string | null; codePostal: string | null;
  departementCode: string; departement: string | null; region: string | null;
  adresse: string | null; latitude: number | null; longitude: number | null;
  description: string; resume: string | null;
  capacite: number; chambres: number | null; chambresSingle: number | null; chambresTwin: number | null;
  sallesReunion: number | null; parking: number | null;
  equipements: string[]; services: string[]; atouts: string[];
  salles: VenueSalle[]; photos: VenuePhoto[];
}

/** Date de génération — alimente le lastmod du sitemap. */
export const GENERATED_AT = '2026-08-30';

export const venues: Venue[] = [
  {
    "id": "cmle4c341001coan8odc3jsnn",
    "slug": "campus-serge-kampf-les-fontaines-gouvieux",
    "nom": "Campus Serge Kampf les Fontaines",
    "categorie": "Centre de congrès",
    "ville": "Gouvieux",
    "codePostal": "60270",
    "departementCode": "60",
    "departement": "Oise",
    "region": "Hauts-de-France",
    "adresse": "67 Route de Chantilly, 60270 Gouvieux",
    "latitude": 49.1919057,
    "longitude": 2.4459748,
    "description": "Le Campus Serge Kampf Les Fontaines est un centre d'événements d'entreprise premium situé à Chantilly, dédié entièrement aux événements professionnels. Implanté au cœur d'un parc de 52 hectares, il allie tradition et modernité avec un château Rothschild du XIXe siècle, des espaces de travail contemporains et 300 chambres réparties dans 7 villas. Doté de 60 salles de réunion modulables et d'un auditorium de 450 places, le Campus accueille conférences, séminaires, congrès et conventions pour 10 à 500 personnes. Certifié ISO 20121 et Ecolabel Européen, il s'engage dans une démarche éco-responsable et offre une infrastructure technologique de pointe pour des événements mémorables et transformateurs.",
    "resume": "Centre d'événements d'entreprise premium à Chantilly : château Rothschild, 300 chambres, 60 salles, parc 52 hectares, 25 min de Paris",
    "capacite": 500,
    "chambres": 300,
    "chambresSingle": null,
    "chambresTwin": null,
    "sallesReunion": 42,
    "parking": 300,
    "equipements": [],
    "services": [],
    "atouts": [],
    "salles": [],
    "photos": [
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4c341001coan8odc3jsnn/8c0ed145-5928-4ffe-9519-8c6c0bfd32a5.webp",
        "legende": null,
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4c341001coan8odc3jsnn/33da1574-5e0f-4731-a2bb-b4e58f2ea38f.webp",
        "legende": null,
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4c341001coan8odc3jsnn/5a6c57ac-0751-4e98-a8a3-1b73d5b1a474.webp",
        "legende": null,
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4c341001coan8odc3jsnn/1cf03908-380f-40bb-b0b3-5933c553b1cd.webp",
        "legende": null,
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4c341001coan8odc3jsnn/f13ecdb9-071b-432d-9303-3fdc1e533947.webp",
        "legende": null,
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4c341001coan8odc3jsnn/94e3084d-47ec-40fe-80e7-adeea292731b.webp",
        "legende": null,
        "categorie": "autre"
      }
    ]
  },
  {
    "id": "cmle4d8bz04uqoan8lplde1u2",
    "slug": "domaine-de-montigny-russy-bemont",
    "nom": "Domaine de Montigny",
    "categorie": "Château & domaine",
    "ville": "Russy-Bémont",
    "codePostal": "60117",
    "departementCode": "60",
    "departement": "Oise",
    "region": "Hauts-de-France",
    "adresse": "Domaine de Montigny, Butte de Montigny, Russy-Bémont, France",
    "latitude": 49.2391367,
    "longitude": 2.9282839,
    "description": "Bienvenue au Domaine de Montigny ! \nDécouvrez un cadre d'exception pour l'organisation de votre séminaire au cœur d'un vaste Domaine de plus de 103 hectares de verdure et de forêts. En tant que spécialistes de l'événementiel d'entreprise, nous mettons à votre disposition des espaces réceptifs uniques, alliant charme, tranquillité et liberté.\n\nSitué à proximité idéale de Paris et de l'aéroport Roissy Charles de Gaulle, notre Domaine offre un cadre incomparable pour créer un événement à votre image, répondant à toutes vos attentes.\n\nParmi nos espaces, la salle de réception \"Vivaldi Quatre Saisons\" est un joyau baigné de lumière niché au cœur du Domaine, attenant à notre charmant Château du XIXe siècle. Avec ses 460 m² et sa magnifique verrière donnant à 180) sur le Parc, elle peut accueillir jusqu'à 450 personnes assises ou 600 personnes en configuration cocktail. Sa vaste terrasse de 345 m², orientée plein sud avec une vue imprenable sur les bois du Domaine, peut accueillir jusqu'à 400 personnes en configuration cocktail. C'est l'endroit idéal pour vos moments de convivialité et de détente.\n\nEn complément, nous mettons à votre disposition 6 salles de réunion modulables, totalisant une superficie de 365 m². Toutes nos salles bénéficient de la lumière du jour et sont équipées des dernières technologies (écrans, vidéoprojecteurs, sonorisation, wifi, etc.). Elles sont conçues pour répondre à toutes les configurations de séminaires imaginables.\n\nChez nous, les prestations sont clé en main. Nous nous occupons de l'organisation complète de votre événement, en respectant scrupuleusement vos exigences, vos envies et votre budget. De la restauration à l'animation en passant par la décoration, notre équipe veille à ce que chaque détail soit parfaitement orchestré.\n\nPour l'hébergement, nous vous proposons 15 chambres de standing au sein du Domaine, ainsi que notre établissement partenaire \"Le Régent\", un Hôtel 3 étoiles situé à seulement 10 km du Domaine, offrant 30 chambres supplémentaires.\n\nAu Domaine de Montigny, Imaginez votre événement ....Vivez votre événement ! \nNous mettons tout en œuvre pour que votre séminaire soit une expérience mémorable, conjuguant professionnalisme, confort et bien-être.\n\nNous sommes impatients de vous accueillir au Domaine de Montigny et de faire de votre événement un véritable succès.\n\n--- Transports ---\nAéroport : L'aéroport le plus proche est l'aéroport de Roissy Charles de Gaulle, situé à environ 30 minutes en voiture du Domaine de Montigny. Cet aéroport est bien desservi, offrant des vols nationaux et internationaux. Il existe également l'aéroport de Paris Beauvais Tillé, à environ 1 heure de route, pour une autre option plus éloignée​​​​.\nGare : La gare la plus proche est la gare de Crépy en Valois, qui se trouve à environ 4 km du Domaine de Montigny. Le temps de trajet depuis la gare du Nord à Paris est d'environ 40 minutes. Des navettes depuis et vers la gare peuvent être organisées sur demande​​.\nMétro : En résumé, le Domaine de Montigny est facilement accessible par divers moyens de transport, que ce soit par avion, train ou voiture, offrant ainsi une grande flexibilité pour les participants de vos événements.",
    "resume": "Chers Clients,\n\nDécouvrez le Domaine de Montigny, un joyau pour vos événements professionnels. Imprégné de tranquillité et de liberté, ce domaine de plus de 103 hectares de verdure offre un cadre d'ex",
    "capacite": 450,
    "chambres": 17,
    "chambresSingle": null,
    "chambresTwin": 15,
    "sallesReunion": 7,
    "parking": null,
    "equipements": [
      "Accès PMR",
      "Baby-foot",
      "Lumière du jour",
      "Parking",
      "Sonorisation",
      "Vidéoprojecteur",
      "Wifi",
      "Jardin/Parc"
    ],
    "services": [],
    "atouts": [],
    "salles": [],
    "photos": [
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4d8bz04uqoan8lplde1u2/3bdacc10-8bb0-4c5e-9c8a-76e809d03a6a.webp",
        "legende": "Logo Domaine de Montigny",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4d8bz04uqoan8lplde1u2/ad20194a-f46c-41e5-8c66-0c5d3a5551cb.webp",
        "legende": "Plénière entreprise dans la salle Vivaldi, Domaine de Montigny, Oise",
        "categorie": "salle"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4d8bz04uqoan8lplde1u2/5bbaf291-f120-4077-a75c-bec9ff39ec93.webp",
        "legende": "Salle de mariage Vivaldi 450 personnes — Domaine de Montigny, Oise",
        "categorie": "salle"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4d8bz04uqoan8lplde1u2/3810d63b-cae7-413c-af4f-e75d07f657c8.webp",
        "legende": null,
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4d8bz04uqoan8lplde1u2/e022b766-d3e1-4864-a778-98ada25ade51.webp",
        "legende": "Vue du Domaine de Montigny et ses 103 hectares de verdure dans l",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4d8bz04uqoan8lplde1u2/f9fc9bd3-d7a2-4c49-ac02-f10f69f2db99.webp",
        "legende": "Château XIXe siècle du Domaine de Montigny à Russy-Bémont, Oise",
        "categorie": "autre"
      }
    ]
  },
  {
    "id": "cmle4cxpo03gjoan8jtdxd5zz",
    "slug": "le-clos-barisseuse-saint-vaast-les-mello",
    "nom": "Le Clos Barisseuse",
    "categorie": "Château & domaine",
    "ville": "Saint-Vaast-Lès-Mello",
    "codePostal": "60660",
    "departementCode": "60",
    "departement": "Oise",
    "region": "Hauts-de-France",
    "adresse": "144 Ham. de Barisseuse, 60660 Saint-Vaast-lès-Mello, France",
    "latitude": 49.2824101,
    "longitude": 2.3975542,
    "description": "Niché au cœur d'un hameau chargé d'histoire et entouré de la campagne pittoresque, Le Clos Barisseuse se situe à seulement une cinquantaine de kilomètres de Paris, offrant un écrin de tranquillité à proximité des grandes capitales européennes comme Paris, Bruxelles et Londres. Ce majestueux corps de ferme du XVIIIème siècle, rénové avec goût, conjugue charme historique et confort moderne, faisant de lui un lieu idéal pour vos séminaires et événements professionnels.\n\nAvec plus de 400 m² de salons, 4500 m² de jardins luxuriants et un espace entièrement privatisable, cet établissement offre un cadre exceptionnel pour des réunions, des conférences ou des ateliers en toute sérénité. Les 18 chambres spacieuses, de plus de 25 m² chacune, sont dotées de toutes les commodités nécessaires, telles que la climatisation, un accès Wi-Fi, et des salles de bains équipées pour garantir le confort des participants.\n\nLe site bénéficie d'un emplacement privilégié, proche de lieux d'intérêt historique et culturel tels que Senlis et Chantilly, enrichissant ainsi l'expérience de vos événements par des activités de team-building culturelles et historiques. Les activités de détente sur place, comme le billard ou des excursions dans le cadre verdoyant environnant, offrent des moments de relaxation appréciés après des journées de travail​​​​​​.\n\n--- Transports ---\nAéroport : L'aéroport Roissy Charles de Gaulle, situé à environ 25 minutes, offre une connectivité internationale tandis que l'aéroport de Beauvais, plus proche des destinations européennes, est également à une distance raisonnable. Ces deux options facilitent l'accès international et national.\nGare : La gare SNCF la plus proche se trouve à Creil, offrant des liaisons vers Paris et d'autres grandes villes françaises. Pour des connexions TGV, la gare de Chantilly peut être une alternative, permettant un accès rapide à partir de diverses régions.\nMétro : Étant donné la localisation en périphérie de Paris, l'accès direct par métro n'est pas disponible. Cependant, des liaisons TER ou des services de bus locaux peuvent compléter le trajet vers les principales lignes de transport en commun de la région parisienne​​​​.",
    "resume": "Chers Clients,\n\nDécouvrez Le Clos Barisseuse, un havre de paix idéalement situé à la croisée des chemins entre histoire, nature et modernité. Que ce soit pour un séminaire, une réunion ou tout autre é",
    "capacite": 350,
    "chambres": 18,
    "chambresSingle": null,
    "chambresTwin": 18,
    "sallesReunion": 4,
    "parking": null,
    "equipements": [
      "Sonorisation",
      "Wifi",
      "Accès PMR",
      "Billard",
      "Lumière du jour",
      "Parking",
      "Terrain de football",
      "Terrain de pétanque",
      "Vidéoprojecteur",
      "Jardin/Parc",
      "Terrasse/Cour intérieure"
    ],
    "services": [],
    "atouts": [],
    "salles": [],
    "photos": [
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cxpo03gjoan8jtdxd5zz/70d02aec-67c6-4363-90b6-a122b4dce0a9.webp",
        "legende": "Le Clos Barisseuse",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cxpo03gjoan8jtdxd5zz/ff0d37b1-1747-4958-a381-1a6f656d96dc.webp",
        "legende": "Façade",
        "categorie": "façade"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cxpo03gjoan8jtdxd5zz/f5bf2c62-586c-4baa-af27-832eb7db3ad4.webp",
        "legende": "Façade et jardin",
        "categorie": "façade"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cxpo03gjoan8jtdxd5zz/5ae625dd-3a79-43c6-a499-10c52e3d849b.webp",
        "legende": "Salle de réception",
        "categorie": "salle"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cxpo03gjoan8jtdxd5zz/087b4d67-97d7-4a65-be73-d0b906b94e4b.webp",
        "legende": "LA PINEDE à la lumière du jour (Capacipté 20 22 pers)",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cxpo03gjoan8jtdxd5zz/12597e6a-10ed-459d-b22c-92019ac29024.webp",
        "legende": "Pinede",
        "categorie": "autre"
      }
    ]
  },
  {
    "id": "cmle4cpys02m8oan8wuaxb8ce",
    "slug": "chateau-de-sainte-claire-berneuil-sur-aisne",
    "nom": "Chateau de Sainte Claire",
    "categorie": "Château & domaine",
    "ville": "Berneuil-sur-Aisne",
    "codePostal": "60350",
    "departementCode": "60",
    "departement": "Oise",
    "region": "Hauts-de-France",
    "adresse": "40 Rue de Sainte-Claire, 60350 Berneuil-sur-Aisne, France",
    "latitude": 49.414292,
    "longitude": 2.9588697,
    "description": "Bienvenue au Château de Sainte Claire !\n\nNous vous offrons un cadre idéal tout au long de l'année pour vos réunions d'entreprise, assemblées générales, présentations de produits et événements d'entreprise. Situé à proximité de Compiègne, notre château est facilement accessible par l'autoroute A1, ce qui facilite le déplacement de vos invités.\n\nNotre salle de réception de 300 m2 est baignée de lumière naturelle, créant une ambiance agréable et propice au travail. Elle peut accueillir jusqu'à 300 personnes pour un dîner assis, offrant ainsi amplement d'espace pour vos événements d'envergure. Vous trouverez également de vastes espaces extérieurs, que ce soit notre cour pavée ou la pelouse du château, qui sont parfaits pour organiser des cocktails, des brunchs champêtres ou des présentations de produits en plein air. En cas de météo incertaine, nous mettons à votre disposition un espace couvert de 280 m2 pour que votre événement se déroule sans encombre.\n\nOutre nos installations, nous proposons également des services adaptés à vos besoins. Que ce soit pour des salles de réunion, des salles de conférence, des activités de team building ou des lieux de formation, notre équipe est là pour vous accompagner dans l'organisation de votre événement. Nous mettons tout en œuvre pour que votre expérience au Château de Sainte Claire soit à la hauteur de vos attentes.\n\nN'hésitez pas à nous contacter pour réserver notre salle de réception ou pour obtenir plus d'informations. Nous sommes impatients de vous accueillir au Château de Sainte Claire, situé au 40 Rue de Sainte-Claire, 60350 Berneuil-sur-Aisne, en France.\n\n--- Transports ---\nAéroport : L'aéroport le plus proche du Château de Sainte Claire est l'aéroport de Paris-Charles-de-Gaulle (CDG). Il se trouve à environ 70 kilomètres du château, soit environ une heure de trajet en voiture.\nGare : En ce qui concerne les transports en train et en métro, la gare la plus proche du Château de Sainte Claire est la gare de Compiègne. Elle est desservie par des trains régionaux depuis la gare de Paris-Nord. Le trajet en train dure environ une heure.\nMétro : Pour les trajets en métro à Paris, vous pouvez rejoindre la gare de Paris-Nord depuis différentes lignes de métro de la ville, telles que la ligne 4, la ligne 5 et la ligne B du RER. Depuis la gare de Paris-Nord, vous pouvez prendre un train régional en direction de Compiègne pour atteindre la gare la plus proche du château.",
    "resume": "Découvrez le magnifique Château de Sainte Claire, un lieu d'exception idéal pour vos séminaires d'entreprise. Que vous recherchiez une salle de réunion, des salles de conférence, un lieu pour des acti",
    "capacite": 300,
    "chambres": 6,
    "chambresSingle": null,
    "chambresTwin": 0,
    "sallesReunion": 1,
    "parking": null,
    "equipements": [
      "Accès PMR",
      "Lumière du jour",
      "Parking",
      "Vidéoprojecteur",
      "Wifi",
      "Terrasse/Cour intérieure",
      "Jardin/Parc"
    ],
    "services": [],
    "atouts": [],
    "salles": [],
    "photos": [
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cpys02m8oan8wuaxb8ce/b04b8ed5-ea14-428c-b58b-8a5423d7c05c.webp",
        "legende": null,
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cpys02m8oan8wuaxb8ce/7e0ff606-1122-4d7a-be3f-09e725d9fce9.webp",
        "legende": null,
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cpys02m8oan8wuaxb8ce/25d6df77-caf2-4846-9add-4529a8ea0646.webp",
        "legende": null,
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cpys02m8oan8wuaxb8ce/cbc2ccd2-a8c7-45cb-ae59-aa69ac8d0ae0.webp",
        "legende": null,
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cpys02m8oan8wuaxb8ce/1895d930-6aeb-48c6-97d2-7e8bf47a627c.webp",
        "legende": null,
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cpys02m8oan8wuaxb8ce/afb8af5d-f9ac-4753-b531-88959f27f0e8.webp",
        "legende": null,
        "categorie": "autre"
      }
    ]
  },
  {
    "id": "cmle4c87r00n8oan8u11xhh50",
    "slug": "abbaye-royale-du-moncel-pontpoint",
    "nom": "Abbaye Royale du Moncel",
    "categorie": "Château & domaine",
    "ville": "Pontpoint",
    "codePostal": "60700",
    "departementCode": "60",
    "departement": "Oise",
    "region": "Hauts-de-France",
    "adresse": "5 Rue du Moncel, 60700 Pontpoint, France",
    "latitude": 49.3018919,
    "longitude": 2.6137717,
    "description": "L'Abbaye Royale du Moncel est un lieu exceptionnel pour organiser des événements d'entreprise. Idéalement située entre la forêt d’Halatte et la ville de Pont-Sainte-Maxence, à seulement 40 minutes de Paris, cette abbaye offre un cadre unique pour des activités sportives, des événements de cohésion de groupe ou des séminaires de team building. Voici quelques raisons pour lesquelles je vous recommande vivement ce lieu :\n\nOriginalité et Surprise : Choisir l'Abbaye Royale du Moncel, c'est surprendre vos invités en les invitant dans un lieu d'exception. L'architecture ancestrale de l'abbaye associée à un cadre naturel verdoyant offre un contraste saisissant qui ne manquera pas de marquer positivement votre événement.\n\nDépaysement et Sérénité : Avec ses 6 hectares de terrain, l'abbaye offre un environnement de calme et de bien-être. Les bâtiments historiques de l'abbaye côtoient une nature généreuse, créant une atmosphère sereine et apaisante. Cet écrin de verdure offre un dépaysement total à vos participants, éloignés du tumulte de la vie urbaine.\n\nCapacité d'Accueil : L'Abbaye Royale du Moncel propose de vastes espaces de réunion qui peuvent accueillir des événements de 10 à 500 participants. Cette flexibilité est idéale pour s'adapter à la taille de votre groupe, que ce soit pour des réunions, des formations ou des conférences.\n\nImage de Marque : En choisissant ce lieu pour votre événement, vous affichez clairement le souci du détail et la recherche de l'excellence. L'abbaye elle-même est un symbole de qualité et de tradition, ce qui renforcera l'image de marque de votre entreprise.\n\nEn conclusion, l'Abbaye Royale du Moncel offre un environnement unique, un dépaysement total, et des installations adaptées pour organiser des événements mémorables. Je vous encourage vivement à considérer cet endroit extraordinaire pour vos prochains événements d'entreprise.\n\n--- Transports ---\nAéroport : Aéroport le plus proche : L'aéroport le plus proche de l'Abbaye Royale du Moncel est l'Aéroport de Paris-Charles-de-Gaulle, qui se trouve à environ 40 minutes en voiture. Cela offre une excellente accessibilité pour les voyageurs en provenance de l'étranger ou d'autres régions de la France.\nGare : Gare ferroviaire : La gare ferroviaire la plus proche est la Gare de Pont-Sainte-Maxence, qui se trouve à environ 10 minutes en voiture de l'abbaye. Cette proximité facilite les déplacements en train pour les participants à votre événement.\nMétro : Il n'y a pas de métro à proprement parler à cet endroit, car il est situé en dehors de la zone métropolitaine de Paris. Cependant, pour les déplacements dans la région, il existe des transports en commun tels que des bus et des trains régionaux qui peuvent être utilisés pour se déplacer entre les villes voisines.",
    "resume": "Chers clients,\n\nC'est avec grand plaisir que je vous recommande l'Abbaye Royale du Moncel en tant que lieu exceptionnel pour vos événements d'entreprise.\n\nL'Abbaye Royale du Moncel est idéalement situ",
    "capacite": 300,
    "chambres": 0,
    "chambresSingle": null,
    "chambresTwin": 0,
    "sallesReunion": 3,
    "parking": null,
    "equipements": [
      "Lumière du jour",
      "Parking",
      "Vidéoprojecteur",
      "Wifi",
      "Jardin/Parc",
      "Terrasse/Cour intérieure"
    ],
    "services": [],
    "atouts": [],
    "salles": [],
    "photos": [
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4c87r00n8oan8u11xhh50/7010b298-d339-48d7-91a1-3719d1b971ca.webp",
        "legende": "Salle Philippe le Bel",
        "categorie": "salle"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4c87r00n8oan8u11xhh50/0fae21dd-fc72-480b-8814-b390ddb6470c.webp",
        "legende": "Salle Philippe le Bel",
        "categorie": "salle"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4c87r00n8oan8u11xhh50/394655fe-0979-4846-ace5-e05a7e01d76a.webp",
        "legende": "Salle Philippe le Bel",
        "categorie": "salle"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4c87r00n8oan8u11xhh50/c3c4207c-843f-47ef-bcdd-77ba2d0e05fc.webp",
        "legende": "Salle Philippe le Bel",
        "categorie": "salle"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4c87r00n8oan8u11xhh50/1ed43d9c-e8a0-4790-b3f2-64dda287d3a0.webp",
        "legende": "Celliers voûtés",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4c87r00n8oan8u11xhh50/1a0d345c-51a6-40cd-acf0-9817fe51c3e3.webp",
        "legende": "Cloître ",
        "categorie": "autre"
      }
    ]
  },
  {
    "id": "cmle4ce0h019coan855uiy54w",
    "slug": "chateau-de-la-trye-hermes",
    "nom": "Chateau de la Trye",
    "categorie": "Hôtel",
    "ville": "Hermes",
    "codePostal": "60370",
    "departementCode": "60",
    "departement": "Oise",
    "region": "Hauts-de-France",
    "adresse": "Rue de la Forêt, Hermes, 60370 Berthecourt",
    "latitude": 49.378868,
    "longitude": 2.259655,
    "description": "Le Château de la Trye est un domaine d'exception niché dans un parc à l'anglaise de 6,5 hectares, entièrement rénové en 2020. Situé à seulement 1 heure de Paris, ce lieu prestigieux propose 27 chambres, une Grande Serre de 256 m² pouvant accueillir 300 participants, des salles de sous-commission et une salle de cinéma. Idéal pour les séminaires résidentiels, journées d'étude, formations, team building et réceptions d'entreprise, le château offre des espaces intérieurs et extérieurs exceptionnels avec formules sur mesure et équipes professionnelles.",
    "resume": "Château événementiel 4 étoiles en Oise : 300 pers, 27 chambres, Grande Serre, parc 6,5 ha. À 1h de Paris, 15 min Beauvais.",
    "capacite": 300,
    "chambres": 6,
    "chambresSingle": null,
    "chambresTwin": 13,
    "sallesReunion": 5,
    "parking": null,
    "equipements": [
      "Terrain de pétanque",
      "Jardin/Parc",
      "Terrasse/Cour intérieure",
      "Accès PMR",
      "Wifi",
      "Vidéoprojecteur",
      "Equipement son",
      "Paperboard",
      "Piscine extérieure",
      "Parking"
    ],
    "services": [],
    "atouts": [
      "Espace extérieur",
      "Parc / jardin",
      "Piscine",
      "Accès PMR",
      "Climatisation"
    ],
    "salles": [],
    "photos": [
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4ce0h019coan855uiy54w/886d88b0-d948-42fd-a41a-b9922b17b74e.webp",
        "legende": null,
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4ce0h019coan855uiy54w/b0c8394e-b61e-4add-9f86-e8ffb722eeae.webp",
        "legende": null,
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4ce0h019coan855uiy54w/fb148a80-fb3c-48a3-83d6-e358fc1b909d.webp",
        "legende": null,
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4ce0h019coan855uiy54w/3acffb4a-7221-4470-8d4f-73423d91d6d6.webp",
        "legende": null,
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4ce0h019coan855uiy54w/4ddc2715-ec77-4742-aa63-550864ae8615.webp",
        "legende": null,
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4ce0h019coan855uiy54w/3978294a-e082-4535-a150-6add78743a76.webp",
        "legende": null,
        "categorie": "autre"
      }
    ]
  },
  {
    "id": "cmle4cp5102ixoan8am82p52a",
    "slug": "aiden-by-best-western-t-aim-hotel-margny-les-compiegne",
    "nom": "Aiden By Best Western T'Aim Hotel",
    "categorie": "Hôtel",
    "ville": "Margny-Lès-Compiègne",
    "codePostal": "60280",
    "departementCode": "60",
    "departement": "Oise",
    "region": "Hauts-de-France",
    "adresse": "70A Pont Neuf, 60280 Margny-lès-Compiègne",
    "latitude": 49.417832,
    "longitude": 2.8163919,
    "description": "Hôtel boutique contemporain 4 étoiles situé sur les rives de l'Oise, l'Aiden by Best Western T'aim Hotel offre un cadre unique alliant design moderne et raffinement. L'établissement dispose de 80 chambres et suites avec terrasses privatives, d'espaces de séminaires modulables avec une plénière de 250m², et d'un restaurant gastronomique dirigé par le Chef Yves Méjean. Les équipements incluent piscine intérieure, spa avec hammam, salle de fitness et parking sécurisé de 100 places. Sa localisation privilégiée à proximité du centre historique de Compiègne et son architecture atypique en font un lieu idéal pour vos événements d'entreprise entre rivière et forêt.",
    "resume": "Hôtel boutique 4 étoiles avec 80 chambres, salles modulables et spa, sur les rives de l'Oise à 1h de Paris",
    "capacite": 250,
    "chambres": 80,
    "chambresSingle": null,
    "chambresTwin": 19,
    "sallesReunion": 5,
    "parking": 100,
    "equipements": [
      "Salle de fitness",
      "Terrasse/Cour intérieure",
      "Accès PMR",
      "Blocs-notes & Stylo",
      "Wifi",
      "Vidéoprojecteur",
      "Equipement son",
      "Paperboard",
      "Piscine intérieure",
      "Parking"
    ],
    "services": [],
    "atouts": [
      "Espace extérieur",
      "Parc / jardin",
      "Piscine",
      "Wi-Fi",
      "Équipement audiovisuel",
      "Accès PMR",
      "Climatisation"
    ],
    "salles": [],
    "photos": [
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cp5102ixoan8am82p52a/8df67f35-9caa-4e04-9091-733ede918077.webp",
        "legende": "Le Magnetic-151",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cp5102ixoan8am82p52a/63dd8438-0ca3-43fe-84db-ff8c1267f998.webp",
        "legende": "Lapilli + Caldeira",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cp5102ixoan8am82p52a/d8cfb893-f57e-49fb-8572-dd1d9a6c9e3f.webp",
        "legende": "Chambre",
        "categorie": "chambre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cp5102ixoan8am82p52a/853bcef3-372a-41f7-a11b-03f030dea663.webp",
        "legende": "Bar",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cp5102ixoan8am82p52a/e78a0635-1c91-4438-8eaf-74c373dd272f.webp",
        "legende": "Spa",
        "categorie": "bien-être"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cp5102ixoan8am82p52a/09e501ec-6fb5-4f3c-8e5c-3b18b0e2bc56.webp",
        "legende": "Restaurant",
        "categorie": "restauration"
      }
    ]
  },
  {
    "id": "cmle4d79b04qsoan8wb400ic0",
    "slug": "auberge-du-jeu-de-paume-chantilly",
    "nom": "Auberge du Jeu de Paume",
    "categorie": "Hôtel",
    "ville": "Chantilly",
    "codePostal": "60500",
    "departementCode": "60",
    "departement": "Oise",
    "region": "Hauts-de-France",
    "adresse": "4 Rue du Connétable, 60500 Chantilly, France",
    "latitude": 49.1947353,
    "longitude": 2.4795668,
    "description": "L'Auberge du Jeu de Paume à Chantilly offre un cadre verdoyant et paisible pour vos événements professionnels. L'établissement dispose de 92 chambres spacieuses avec vue sur les jardins, de 6 salles de réunion pouvant accueillir jusqu'à 200 personnes, d'une piscine intérieure chauffée, d'un spa et d'un centre de remise en forme. La cuisine est reconnue pour son inventivité, alliant traditions françaises et influences internationales. Situé à proximité du château de Chantilly et à 25 minutes de l'aéroport Charles de Gaulle, l'auberge est accessible en train depuis la gare du Nord à Paris.",
    "resume": "Auberge de prestige à Chantilly, avec 92 chambres, 6 salles de réunion jusqu'à 200 personnes, spa et piscine intérieure, à 25 minutes de l'aéroport CDG.",
    "capacite": 160,
    "chambres": 92,
    "chambresSingle": null,
    "chambresTwin": 92,
    "sallesReunion": 6,
    "parking": null,
    "equipements": [
      "Accès PMR",
      "Lumière du jour",
      "Parking",
      "Piscine",
      "Piscine chauffée",
      "Sonorisation",
      "Spa",
      "Vidéoprojecteur",
      "Wifi",
      "Jardin/Parc",
      "Salle de fitness",
      "Terrasse/Cour intérieure"
    ],
    "services": [],
    "atouts": [],
    "salles": [],
    "photos": [
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4d79b04qsoan8wb400ic0/b5accfcc-b63b-4ad6-a190-93b8b54df065.webp",
        "legende": "Vue de l'Auberge depuis le Parc du Château de Chantilly ",
        "categorie": "extérieur"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4d79b04qsoan8wb400ic0/7db7272c-f528-4b2f-a2aa-89136b9d33e3.webp",
        "legende": "Cour intérieure",
        "categorie": "extérieur"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4d79b04qsoan8wb400ic0/ab8a2ae7-861e-49fd-a9e6-b672218c96e7.webp",
        "legende": "Montgolfier 1 & 2 - Format banquet",
        "categorie": "salle"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4d79b04qsoan8wb400ic0/49f64a49-bddc-49da-a41f-2ab9c429e6b6.webp",
        "legende": "Salon Table du Connétable - Théàtre",
        "categorie": "restauration"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4d79b04qsoan8wb400ic0/60233f71-4273-46da-a43d-0b19cea1b569.webp",
        "legende": "Chambre Deluxe ",
        "categorie": "chambre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4d79b04qsoan8wb400ic0/664b4ece-83dc-442a-88b5-20c16c2e60de.webp",
        "legende": "Chambre",
        "categorie": "chambre"
      }
    ]
  },
  {
    "id": "cmle4cfsk01h6oan8gfyshd2j",
    "slug": "best-western-hotel-du-parc-chantilly",
    "nom": "Best Western Hotel du Parc",
    "categorie": "Château & domaine",
    "ville": "Chantilly",
    "codePostal": "60500",
    "departementCode": "60",
    "departement": "Oise",
    "region": "Hauts-de-France",
    "adresse": "36 Av. du Maréchal Joffre, 60500 Chantilly, France",
    "latitude": 49.1904801,
    "longitude": 2.4631205,
    "description": "Niché au cœur de la pittoresque ville de Chantilly, le Best Western Hotel Du Parc vous accueille dans un cadre empreint d'élégance et de confort. Entièrement rénové en 2014, cet établissement 4 étoiles offre une expérience inoubliable à ses hôtes, combinant hospitalité traditionnelle du Nord et modernité. Situé à proximité immédiate du célèbre Château de Chantilly et de son hippodrome, l'hôtel constitue un choix de prédilection pour les voyageurs désireux d'explorer le riche patrimoine culturel et historique de la région.\n\nAvec ses 57 chambres rénovées, l'hôtel promet confort et sérénité dans un décor inspiré du monde équestre, reflet de la capitale du cheval. Chaque chambre est équipée de literie haut de gamme, garantissant une nuit de repos exceptionnelle. Les clients peuvent également profiter d'une gamme complète de services incluant climatisation, WiFi haut débit, et salles de réunion pour les évènements professionnels.\n\nLe restaurant Le Cob, avec sa terrasse donnant sur un parc verdoyant, propose une cuisine raffinée mettant en avant les produits régionaux. Le bar Valcat offre, quant à lui, un espace détente idéal pour savourer un verre dans une atmosphère conviviale.\n\nPour les moments de détente, l'hôtel dispose d'un espace bien-être ainsi que d'activités gratuites sur place, faisant de votre séjour une expérience à la fois enrichissante et relaxante. La capacité de la plus grande salle de réunion et les activités disponibles aux alentours, comme les visites du château ou les balades dans les jardins Lenôtre, complètent l'offre pour les séminaires d'entreprise.\n\n--- Transports ---\nAéroport : L'aéroport international le plus proche est l'Aéroport de Paris-Charles de Gaulle, situé à environ 30 minutes en voiture, offrant ainsi une accessibilité pratique pour les voyageurs internationaux.\nGare : La gare SNCF de Chantilly-Gouvieux, à moins de 5 minutes en voiture, permet un accès facile en train depuis diverses destinations, tant nationales qu'internationales, grâce aux lignes TER et aux connexions TGV.\nMétro : Bien que Chantilly ne dispose pas de métro, la proximité de la gare facilite les déplacements vers Paris et d'autres villes, rendant l'accès au réseau de transport public rapide et efficace.",
    "resume": "Chers Clients,\n\nNous sommes ravis de vous recommander le Best Western Hotel Du Parc à Chantilly pour vos prochains événements professionnels. Ce lieu d'exception, alliant confort moderne et charme his",
    "capacite": 150,
    "chambres": 57,
    "chambresSingle": null,
    "chambresTwin": 0,
    "sallesReunion": 6,
    "parking": null,
    "equipements": [
      "Accès PMR",
      "Wifi",
      "Vidéoprojecteur",
      "Parking",
      "Jardin/Parc",
      "Terrain de pétanque",
      "Spa",
      "Lumière du jour",
      "Sonorisation",
      "Terrasse/Cour intérieure"
    ],
    "services": [],
    "atouts": [],
    "salles": [],
    "photos": [
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cfsk01h6oan8gfyshd2j/fda12073-f206-4af2-9e0c-2651ef1b0c23.webp",
        "legende": "Salle Luberon",
        "categorie": "salle"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cfsk01h6oan8gfyshd2j/891b3490-b698-477a-a133-35d5980b5960.webp",
        "legende": "Salon Tamaris",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cfsk01h6oan8gfyshd2j/b5916d1b-809b-4b8e-a499-238e94663b18.webp",
        "legende": "Salon Veranda",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cfsk01h6oan8gfyshd2j/8a0e800f-102e-479d-8366-20887793eead.webp",
        "legende": "Salle Luberon",
        "categorie": "salle"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cfsk01h6oan8gfyshd2j/5111c86b-ee05-48c3-90d4-21f2af726ac0.webp",
        "legende": "Salle Luberon",
        "categorie": "salle"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cfsk01h6oan8gfyshd2j/ac57d91b-7aaf-4400-aff5-945027a0b58a.webp",
        "legende": "Salle Magnolia",
        "categorie": "salle"
      }
    ]
  },
  {
    "id": "cmle4cynn03kloan8w7s4pzly",
    "slug": "chateau-d-ermenonville-ermenonville",
    "nom": "Chateau D'Ermenonville",
    "categorie": "Château & domaine",
    "ville": "Ermenonville",
    "codePostal": "60950",
    "departementCode": "60",
    "departement": "Oise",
    "region": "Hauts-de-France",
    "adresse": "Rue René de Girardin, 60950 Ermenonville",
    "latitude": 49.1264982,
    "longitude": 2.6911285,
    "description": "Château d'Ermenonville est un établissement événementiel d'exception situé en Oise, à 40 minutes de Paris et 20 minutes de l'aéroport Roissy CDG. Ce château du XVIIIe siècle historique offre 55 chambres élégantes, des espaces de réunion modulables de 21 à 210 m², et un restaurant gastronomique. Idéal pour séminaires résidentiels, mariages et réceptions privées, le domaine combine l'authenticité historique avec le confort contemporain, dans un cadre bucolique de 18 hectares avec lac ornemental.",
    "resume": "Château événementiel 18 hectares, 55 chambres, restaurant gastronomique, 40 min Paris, séminaires & mariages",
    "capacite": 100,
    "chambres": 55,
    "chambresSingle": null,
    "chambresTwin": 31,
    "sallesReunion": 9,
    "parking": null,
    "equipements": [
      "Wifi",
      "Sonorisation",
      "Vidéoprojecteur",
      "Jardin/Parc",
      "Terrasse/Cour intérieure",
      "Terrain de pétanque",
      "Lumière du jour",
      "Parking"
    ],
    "services": [],
    "atouts": [
      "Espace extérieur",
      "Parc / jardin",
      "Wi-Fi",
      "Équipement audiovisuel"
    ],
    "salles": [],
    "photos": [
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cynn03kloan8w7s4pzly/d9e4da90-794c-4d8b-917f-b211236c7ec5.webp",
        "legende": "Façade Sud - Cour d'Honneur",
        "categorie": "façade"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cynn03kloan8w7s4pzly/85a9642b-e06f-4e1d-b6d0-571eccc4e1c8.webp",
        "legende": "Façade Sud",
        "categorie": "façade"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cynn03kloan8w7s4pzly/7e2929c2-6c42-4454-a808-7912a950246c.webp",
        "legende": "Façade Sud",
        "categorie": "façade"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cynn03kloan8w7s4pzly/a3f2bd1d-51af-4e45-b8e3-9753475569cd.webp",
        "legende": "Escalier d'Honneur ",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cynn03kloan8w7s4pzly/05d5e249-3df7-4f26-a12c-bb330dbfb1e9.webp",
        "legende": "Terrasse ",
        "categorie": "extérieur"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cynn03kloan8w7s4pzly/9470edd7-dd46-45e7-a1b7-863cf262a336.webp",
        "legende": "Façade Est",
        "categorie": "façade"
      }
    ]
  },
  {
    "id": "cmle4ckls0204oan8zakt2jh9",
    "slug": "chateau-de-montataire-montataire",
    "nom": "Château de Montataire",
    "categorie": "Château & domaine",
    "ville": "Montataire",
    "codePostal": "60160",
    "departementCode": "60",
    "departement": "Oise",
    "region": "Hauts-de-France",
    "adresse": "Chateau de Montataire SOC, Allée des Marronniers, Montataire, France",
    "latitude": 49.2563004,
    "longitude": 2.4428752,
    "description": "Bienvenue  au Château de Montataire, un lieu enchanteur chargé d'histoire et de charme. Situé au cœur de la campagne, ce magnifique château vous invite à plonger dans un univers d'élégance et de tranquillité.\n\nNotre château offre une combinaison parfaite entre authenticité et modernité. Ses salles spacieuses et raffinées sont idéales pour accueillir des événements privés et professionnels tels que mariages, séminaires, galas et réceptions. Nos espaces extérieurs bien entretenus offrent également un cadre pittoresque pour des cérémonies en plein air.\n\nL'équipe du Château de Montataire est dévouée à vous offrir une expérience inoubliable. Notre personnel attentionné est à votre disposition pour répondre à vos besoins et garantir le bon déroulement de votre événement. De plus, notre service traiteur propose une cuisine délicieuse et raffinée, mettant en valeur les produits locaux et de saison.\n\nOutre les prestations événementielles, le Château de Montataire offre la possibilité de séjourner dans des chambres élégantes, alliant confort moderne et charme d'époque. Profitez de moments de détente dans nos jardins paisibles et admirez les paysages environnants.\n\nL'accès au Château de Montataire est facile, que ce soit en voiture ou en transports en commun. Notre emplacement privilégié vous permet de rejoindre rapidement les attractions touristiques de la région, telles que les châteaux historiques, les vignobles renommés et les sites culturels.\n\nNous sommes impatients de vous accueillir au Château de Montataire et de vous offrir une expérience unique et mémorable. N'hésitez pas à explorer notre site web pour découvrir davantage d'informations sur nos services, nos tarifs et nos disponibilités.\n\nAu plaisir de vous recevoir prochainement,\nCAPACITÉ :\n10 à 65 personnes.\n\nÉQUIPEMENTS :\nÉcran, vidéoprojecteur, paperboard, wifi , sonorisation\n\nACTIVITÉS :\nSéminaires d’entreprises, journées d’études, formations et réunions. Organisation de réceptions (Assemblée générale, promotion professionnelle, soirées d’entreprises..)\nEscape Game et rallye/visite - Cocktail sur la Cour d’Honneur du Château - Restaurant sur place La Table du Chevalier - Propositions personnalisées sur demande. \n\nN'hésitez pas à nous contacter.\n\n--- Transports ---\nAéroport : Paris Charles de Gaulle\nGare : Creil  (à 35 minutes direct de Paris)\nMétro : nc",
    "resume": "Cher client,\n\nC'est avec grand plaisir que je vous présente le magnifique Château de Montataire. Situé dans un cadre enchanteur, ce lieu d'exception vous offre une expérience inoubliable pour vos évén",
    "capacite": 70,
    "chambres": 0,
    "chambresSingle": null,
    "chambresTwin": 0,
    "sallesReunion": 4,
    "parking": null,
    "equipements": [
      "Lumière du jour",
      "Parking",
      "Sonorisation",
      "Vidéoprojecteur",
      "Wifi"
    ],
    "services": [],
    "atouts": [],
    "salles": [],
    "photos": [
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4ckls0204oan8zakt2jh9/32e58fb2-e5ab-4378-bec6-a96fa4e266ba.webp",
        "legende": "PHOTO CHATEAU VUE HAUTEUR-fotor-202403181252",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4ckls0204oan8zakt2jh9/8982846c-a863-4826-8cd5-6f78c8fbc039.webp",
        "legende": "DSC_3475",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4ckls0204oan8zakt2jh9/5b04103c-4564-4d2c-9de7-035d82e7d04a.webp",
        "legende": "conférence château oise",
        "categorie": "salle"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4ckls0204oan8zakt2jh9/14baf670-1992-47c7-a27e-e938f7c299a4.webp",
        "legende": "salle de réunion château oise-fotor-2024041711544",
        "categorie": "salle"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4ckls0204oan8zakt2jh9/a8527219-c85b-470f-8041-8120dbd8d720.webp",
        "legende": "DSC_5529",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4ckls0204oan8zakt2jh9/03379df3-4dfb-48a7-9997-3a49ece67aa2.webp",
        "legende": "DSC_6329-fotor-2024041783452",
        "categorie": "autre"
      }
    ]
  },
  {
    "id": "cmle4c5gm00a8oan806lo30ri",
    "slug": "la-croisee-des-possibles-crepy-en-valois",
    "nom": "La Croisée des Possibles",
    "categorie": "Hôtel",
    "ville": "Crépy-en-Valois",
    "codePostal": "60800",
    "departementCode": "60",
    "departement": "Oise",
    "region": "Hauts-de-France",
    "adresse": "12 Rte de Pierrefonds, 60800 Crépy-en-Valois, France",
    "latitude": 49.2423304,
    "longitude": 2.896626,
    "description": "La Croisée des Possibles est un domaine de 1 200 m² de plain-pied, situé au sud de l'Oise, à Crépy-en-Valois, proche de Compiègne, Roissy et Senlis. L'espace ERP privé est réservé à votre seule réunion, séminaire ou formation. La salle principale est équipée d'un vidéoprojecteur, d'enceintes, du Wi-Fi, de prises au sol et d'un paperboard. Des terrasses permettent les échanges, pauses et jeux. De mai à septembre, un bar-palettes et un barnum sont disponibles. La restauration est assurée sur place et s'adapte au déroulé de la journée. Accessible depuis l'aéroport Roissy-CDG et la gare de Crépy-en-Valois.",
    "resume": "Domaine événementiel privé de 1 200 m² à Crépy-en-Valois, dédié exclusivement à votre réunion ou séminaire, avec terrasses, restauration sur place et accès facile depuis Roissy-CDG.",
    "capacite": 54,
    "chambres": 0,
    "chambresSingle": null,
    "chambresTwin": 0,
    "sallesReunion": 1,
    "parking": null,
    "equipements": [
      "Accès PMR",
      "Sonorisation",
      "Terrasse/Cour intérieure",
      "Wifi",
      "Parking",
      "Lumière du jour",
      "Vidéoprojecteur",
      "Jardin/Parc"
    ],
    "services": [],
    "atouts": [],
    "salles": [],
    "photos": [
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4c5gm00a8oan806lo30ri/00a2a7d9-5873-424d-bc93-f1dbc84479be.webp",
        "legende": "Lieu & jardin, terrasses, parking",
        "categorie": "extérieur"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4c5gm00a8oan806lo30ri/6c615552-0154-409d-85bc-144ad6abab88.webp",
        "legende": "Extérieurs dédiés pelouse-terrasse- véranda La Croisée des Possibles",
        "categorie": "extérieur"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4c5gm00a8oan806lo30ri/0564b8ed-6fb2-47b5-92f4-f33a53d561b2.webp",
        "legende": "La salle en configuration U",
        "categorie": "salle"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4c5gm00a8oan806lo30ri/7b49245c-9d5a-4c0a-9449-12c0eb283660.webp",
        "legende": "Salle de réunion format Loto",
        "categorie": "salle"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4c5gm00a8oan806lo30ri/398c9311-4ac3-4ab8-be8c-0d21a5c81c3d.webp",
        "legende": "Salle en format conférence 70 pers",
        "categorie": "salle"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4c5gm00a8oan806lo30ri/ea276c9f-a6be-4cd2-a428-4d15b133c224.webp",
        "legende": "Formation intra Entreprise ",
        "categorie": "autre"
      }
    ]
  },
  {
    "id": "cmle4c3fq002loan8b6b76rfk",
    "slug": "auberge-du-mont-saint-mard-vieux-moulin",
    "nom": "Auberge du Mont Saint Mard",
    "categorie": "Hôtel",
    "ville": "Vieux-Moulin",
    "codePostal": "60350",
    "departementCode": "60",
    "departement": "Oise",
    "region": "Hauts-de-France",
    "adresse": "2 Rte Eugénie, 60350 Vieux-Moulin, France",
    "latitude": 49.3952543,
    "longitude": 2.9346458,
    "description": "Bienvenue à l'Auberge du Mont Saint Mard : Votre Destination d'Exception pour des Événements d'Entreprise\nL'Auberge du Mont Saint Mard est un véritable joyau niché dans un cadre enchanteur, idéalement situé pour répondre à tous vos besoins en matière d'événements professionnels.\n\nChâteau Séminaire - Domaine Séminaire - Entreprise Événementiel (mos cle en gras) :\nAu cœur d'un domaine d'exception, notre établissement vous propose un environnement raffiné et apaisant pour vos séminaires, réunions et autres événements d'entreprise. Avec notre château séminaire et son domaine, vous bénéficiez d'un vaste espace dédié à l'organisation de vos événements, qu'ils soient de petite ou grande envergure.\n\nSalle de Conférence - Salles de Réunion (mos cle en gras) :\nL'Auberge du Mont Saint Mard met à votre disposition des installations modernes et bien équipées pour vos conférences et réunions professionnelles. Notre salle de conférence, spécialement conçue pour accueillir vos présentations importantes, vous offre un environnement propice à la concentration et aux échanges fructueux. De plus, nos salles de réunion, aménagées avec soin, sont idéales pour des sessions de travail en petit groupe.\n\nEntreprise Événementiel sur Mesure (mos cle en gras) :\nNous savons combien il est important pour vous de réussir vos événements d'entreprise. C'est pourquoi notre équipe dédiée à l'événementiel est à votre disposition pour personnaliser chaque détail selon vos besoins et préférences. Que ce soit pour un séminaire, une formation ou une journée de cohésion d'équipe, nous nous engageons à rendre votre événement unique et mémorable.\n\nCadre Enchanteur et Services d'Excellence (mos cle en gras) :\nEn choisissant l'Auberge du Mont Saint Mard, vous serez séduits par notre cadre exceptionnel au cœur de la nature. Notre domaine offre des espaces de détente et de loisirs pour vos pauses bien méritées. De plus, notre établissement vous propose un service de restauration raffiné, mettant en valeur les produits locaux et de saison, pour des moments de convivialité et de partage.\n\nQue vous cherchiez un château séminaire, un domaine séminaire ou une solution d'entreprise événementiel, l'Auberge du Mont Saint Mard répondra à toutes vos attentes.\n\nContactez-nous dès maintenant pour réserver notre salle de conférence ou nos salles de réunion pour vos prochains événements professionnels. Notre équipe expérimentée se fera un plaisir de vous accompagner dans la réussite de vos projets.\n\nVivez l'expérience unique de l'Auberge du Mont Saint Mard, où raffinement, nature et excellence se rejoignent pour faire de votre événement un moment inoubliable.\n\n--- Transports ---\nAéroport : L'aéroport le plus proche de l'Auberge du Mont Saint Mard est l'aéroport de Paris-Charles de Gaulle (CDG). Cet aéroport international est situé à environ 100 kilomètres au sud de l'auberge. Vous pouvez rejoindre l'auberge depuis l'aéroport en utilisant des services de taxi, des navettes aéroport, ou en louant une voiture. Le trajet prendra environ 1h30 en voiture.\nGare : La gare la plus proche de l'Auberge du Mont Saint Mard est la gare de Meaux. Cette gare ferroviaire est située à environ 20 kilomètres de l'auberge. De la gare de Meaux, vous pouvez prendre un taxi ou utiliser les transports en commun pour rejoindre l'auberge.\nMétro : L'auberge n'est pas desservie par le métro, car elle est située en dehors de la zone métropolitaine de Paris. Cependant, vous pouvez utiliser les trains régionaux (RER) pour vous déplacer depuis la gare de Meaux vers Paris et ses environs.",
    "resume": "Cher client,\n\nJe suis ravie de vous présenter l'Auberge du Mont Saint Mard, un lieu d'exception pour vos événements d'entreprise. Située dans un cadre enchanteur, cette auberge vous offre un univers d",
    "capacite": 40,
    "chambres": 0,
    "chambresSingle": null,
    "chambresTwin": 0,
    "sallesReunion": 1,
    "parking": null,
    "equipements": [
      "Accès PMR",
      "Wifi",
      "Terrasse/Cour intérieure"
    ],
    "services": [],
    "atouts": [],
    "salles": [],
    "photos": [
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4c3fq002loan8b6b76rfk/9af8aa63-51e5-4d5c-9b6b-2340074d1412.webp",
        "legende": "Los Angeles",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4c3fq002loan8b6b76rfk/4bcdbcdf-2e62-49d9-ac9b-9cdb3af98b00.webp",
        "legende": "Chicago",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4c3fq002loan8b6b76rfk/bf562530-a1eb-4b28-a732-2af51e736d01.webp",
        "legende": "New york",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4c3fq002loan8b6b76rfk/92f471d7-95e4-4c44-9cc4-302403da7c02.webp",
        "legende": "Los Angeles",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4c3fq002loan8b6b76rfk/671bb043-83f9-4e36-809d-3043a1996822.webp",
        "legende": "Chicago",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4c3fq002loan8b6b76rfk/35413b63-8ec2-4c80-9022-f9db39fd6b5b.webp",
        "legende": "New york",
        "categorie": "autre"
      }
    ]
  },
  {
    "id": "cmle4c49i0059oan8pga1gj7s",
    "slug": "abbaye-du-golf-de-lesigny-lesigny",
    "nom": "Abbaye du Golf de Lesigny",
    "categorie": "Golf & resort",
    "ville": "Lésigny",
    "codePostal": "77150",
    "departementCode": "77",
    "departement": "Seine-et-Marne",
    "region": "Île-de-France",
    "adresse": "Ferme des Hyverneaux, 77150 Lésigny",
    "latitude": 48.7314572,
    "longitude": 2.6103433,
    "description": "Cette ancienne abbaye du XIIe siècle, classée monument historique, offre un cadre exceptionnel pour vos événements d'entreprise au cœur de 100 hectares de golf. L'établissement dispose de 7 salles de séminaire modulables et climatisées, dont l'Agora de 580 m² pouvant accueillir jusqu'à 600 personnes, toutes baignées de lumière naturelle. Les 47 chambres récemment rénovées permettent d'organiser des séminaires résidentiels dans un environnement verdoyant et apaisant. La brasserie L'Abbaye avec vue sur le golf et les espaces de détente complètent cette offre premium dédiée aux événements professionnels. Sa situation privilégiée à 30 minutes de Paris et sa capacité d'accueil modulable en font un lieu de référence pour séminaires, conventions et soirées d'entreprise.",
    "resume": "Ancienne abbaye du XIIe siècle avec 47 chambres et 7 salles modulables jusqu'à 600 personnes, à 30 min de Paris sur golf de 100 hectares",
    "capacite": 600,
    "chambres": 47,
    "chambresSingle": null,
    "chambresTwin": 20,
    "sallesReunion": 7,
    "parking": 250,
    "equipements": [
      "Baby-foot",
      "Billard",
      "Vidéoprojecteur",
      "Borne de recharge électrique",
      "Climatisation",
      "Cour intérieure",
      "Micros / Sonorisation",
      "Paperboard",
      "Parking privé",
      "Restaurant sur place",
      "Réception 24h/24",
      "Salle de conférence",
      "Salle de fitness",
      "Salle de jeux",
      "Salle de réunion",
      "Sauna",
      "Télévision",
      "Vue panoramique"
    ],
    "services": [],
    "atouts": [
      "Espace extérieur",
      "Parc / jardin",
      "Wi-Fi",
      "Équipement audiovisuel",
      "Accès PMR",
      "Climatisation"
    ],
    "salles": [],
    "photos": [
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4c49i0059oan8pga1gj7s/1608f7f7-f753-4ccf-88cf-cc3253c623b5.webp",
        "legende": "HOTEL ABBAYE DU GOLF DE LESIGNY",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4c49i0059oan8pga1gj7s/d9f7f73f-a456-436e-9d29-d5f46aab3d8d.webp",
        "legende": null,
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4c49i0059oan8pga1gj7s/a35508bd-2285-470d-bb6e-f7fadd423f6f.webp",
        "legende": null,
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4c49i0059oan8pga1gj7s/d09957e2-1a2f-49dc-99a6-d9ba1c78795f.webp",
        "legende": null,
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4c49i0059oan8pga1gj7s/fcbba9a4-6daa-4113-ad44-1f66aab1fb71.webp",
        "legende": null,
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4c49i0059oan8pga1gj7s/2416b36c-5048-47d3-a303-e3d2416ca38e.webp",
        "legende": null,
        "categorie": "autre"
      }
    ]
  },
  {
    "id": "cmle4cynk03kjoan8v55ns0tw",
    "slug": "grand-magic-hotel-magny-le-hongre",
    "nom": "Grand Magic Hotel",
    "categorie": "Hôtel",
    "ville": "Magny-le-Hongre",
    "codePostal": "77700",
    "departementCode": "77",
    "departement": "Seine-et-Marne",
    "region": "Île-de-France",
    "adresse": "20 Av. de la Fosse des Pressoirs, 77700 Magny-le-Hongre, France",
    "latitude": 48.8722374,
    "longitude": 2.8078571,
    "description": "Bienvenue au Grand Magic Hotel, situé au 20 Avenue de la Fosse des Pressoirs à Magny-le-Hongre, en plein cœur de Marne-la-Vallée. Cet établissement exceptionnel, à deux pas de Disneyland Paris, vous invite à vivre une expérience immersive unique, parfaite pour vos séminaires d'entreprise.\n\nDès votre entrée, le Grand Magic Hotel vous transporte dans un monde où la fantaisie rencontre le surnaturel. La réception flamboyante et l'architecture raffinée dévoilent des espaces empreints de mystère. Le Grand Hall, avec ses animations immersives, vous plonge dans des mondes parallèles, créant une expérience multimédia inoubliable dès 19h.\n\nLe Grand Magic Hotel dispose de 396 chambres et suites, offrant une nuit sous les étoiles, bercée par des songes et constellations. Chaque chambre est équipée pour garantir confort et relaxation, avec des vues magnifiques sur la campagne, le parc ou le lac. Les installations comprennent une piscine intérieure chauffée, un centre de fitness, et une salle de jeux vidéo.\n\nCôté restauration, le restaurant \"Chez Maurice\" propose une cuisine traditionnelle et des spécialités régionales. Pour une expérience plus décontractée, le Magic’Hall Bar offre un service de snack et une terrasse extérieure, idéale pour se détendre autour d'un cocktail au cœur des mondes fantastiques de l'hôtel.\n\nPour vos événements professionnels, le Grand Magic Hotel est l'endroit rêvé. Que ce soit pour des séminaires, des team building ou des événements d'envergure, les organisateurs de l'hôtel sauront réaliser vos souhaits les plus fous dans un cadre exceptionnel.\n\nLes clients apprécient particulièrement la localisation de l'hôtel, notée 8.8, idéale pour les voyages de couple. En plus, une navette gratuite vous emmène du Grand Magic Hotel aux Parcs Disney et à la gare de Marne la Vallée Chessy en seulement 8 minutes, facilitant vos déplacements lors de votre séjour.\n\nLe Grand Magic Hotel s'engage également dans des pratiques durables, participant au programme Travel Sustainable, reflétant ainsi son engagement pour l'environnement et la société.\n\n🌟 En résumé, le Grand Magic Hotel est le lieu idéal pour organiser vos séminaires et événements d'entreprise, offrant un mélange parfait de professionnalisme, de magie et d'immersion dans un cadre féérique et accessible​​​​.\n\n--- Transports ---\nAéroport : L'aéroport Paris-Charles de Gaulle se trouve à environ 30 minutes en voiture. Pour les vols internationaux, cet aéroport est l'option la plus pratique.\nGare : La gare de Marne-la-Vallée Chessy, desservie par des trains TGV et SNCF, est à seulement 8 minutes en navette gratuite depuis l'hôtel.\nMétro : Bien que l'hôtel ne soit pas directement desservi par le métro, la navette gratuite facilite l'accès aux parcs Disney et à la gare, où vous pouvez vous connecter à d'autres modes de transport public pour explorer la région.",
    "resume": "Chers Clients,\n\nLe Grand Magic Hotel est un choix exceptionnel pour vos prochains événements professionnels. Situé près de Disneyland Paris, cet hôtel offre une expérience immersive unique, idéale pou",
    "capacite": 300,
    "chambres": 396,
    "chambresSingle": null,
    "chambresTwin": 50,
    "sallesReunion": 12,
    "parking": null,
    "equipements": [
      "Accès PMR",
      "Piscine",
      "Parking",
      "Salle de fitness",
      "Terrasse/Cour intérieure",
      "Jardin/Parc",
      "Wifi",
      "Sonorisation",
      "Vidéoprojecteur",
      "Lumière du jour"
    ],
    "services": [],
    "atouts": [],
    "salles": [],
    "photos": [
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cynk03kjoan8v55ns0tw/3b1f5376-f53f-4cea-91a0-3164bd01a500.webp",
        "legende": "Grand Magic Hotel**** ",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cynk03kjoan8v55ns0tw/a3429781-b742-4eb7-bef6-50e75b024882.webp",
        "legende": "Piscine intérieure",
        "categorie": "bien-être"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cynk03kjoan8v55ns0tw/dfc90396-3eb5-46e2-9280-f075adb8fd64.webp",
        "legende": "Chambre single",
        "categorie": "chambre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cynk03kjoan8v55ns0tw/dbaea836-628f-4dfa-bd5a-ffd8dc29d1d1.webp",
        "legende": "Salle d'arcade",
        "categorie": "salle"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cynk03kjoan8v55ns0tw/3e01a209-c44a-4523-9a6c-7ffe0cb4234d.webp",
        "legende": "Forest Pavillon - Disposition U",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cynk03kjoan8v55ns0tw/453e70d6-5a77-4a76-baf6-0f08f05624e4.webp",
        "legende": "Grand Magic Hôtel****",
        "categorie": "autre"
      }
    ]
  },
  {
    "id": "cmle4cfq201guoan8ygvttx4k",
    "slug": "novotel-fontainebleau-ury-ury",
    "nom": "Novotel Fontainebleau Ury",
    "categorie": "Hôtel",
    "ville": "Ury",
    "codePostal": "77760",
    "departementCode": "77",
    "departement": "Seine-et-Marne",
    "region": "Île-de-France",
    "adresse": "Chem. de Melun, 77760 Ury, France",
    "latitude": 48.352414,
    "longitude": 2.608775,
    "description": "Situé en lisière de la célèbre forêt de Fontainebleau sur un parc de 5 hectares, à une heure du centre de Paris et directement accessible par l'A6, l'hôtel vous offre un cadre de verdure, idéal pour les réunions, séminaires, conventions, journée d'étude.... Nous accueillons vos réunions et conventions de 10 à 200 personnes tout au long de l'année dans nos salles équipées, à la lumière du jour.\n\nÉvénements adaptés pour ce lieu\n\nSéminaire résidentiel, convention, formation, lancement de produits, réunion commerciale.\n\nAvantages compétitifs\n\nLes participants pourront profiter de nos espaces de détente dont le SPA avec piscine extérieure chauffée toute l'année, sauna, solarium et salle de fitness mais aussi des espaces de loisirs avec tennis, boulodrome, badminton, volley-ball ou encore tennis de table.\nVous pourrez également organiser de nombreuses activités team building dans notre parc de 5ha.\n\n--- Transports ---\nAéroport : L'aéroport le plus proche de Fontainebleau est l'Aéroport de Paris-Orly (ORY), situé à environ 55 kilomètres au nord-ouest d'Ury. Vous pouvez accéder à l'aéroport en taxi, en navette aéroportuaire ou en utilisant les transports publics, en fonction de vos préférences.\nGare : La gare ferroviaire la plus proche est la Gare de Fontainebleau-Avon, située à quelques kilomètres à l'est d'Ury. De là, vous pouvez prendre un taxi ou utiliser les transports publics pour rejoindre l'hôtel.\nMétro : Fontainebleau n'a pas de système de métro, mais la région de Paris a un réseau de métro étendu. Si vous vous rendez à Paris depuis Fontainebleau, vous pouvez prendre un train pour la Gare de Lyon à Paris, puis utiliser le métro depuis là.",
    "resume": "Chers clients,\n\nBienvenue au Novotel Fontainebleau Ury, un lieu d'exception niché au cœur de la magnifique région de Seine-et-Marne, en France. Situé à Ury, au croisement de la Route Nationale 152 et",
    "capacite": 200,
    "chambres": 126,
    "chambresSingle": null,
    "chambresTwin": 121,
    "sallesReunion": 14,
    "parking": null,
    "equipements": [
      "Parking",
      "Lumière du jour",
      "Billard",
      "Baby-foot",
      "Sonorisation",
      "Jardin/Parc",
      "Terrasse/Cour intérieure",
      "Spa",
      "Wifi",
      "Vidéoprojecteur",
      "Terrain de pétanque",
      "Salle de fitness",
      "Piscine chauffée",
      "Terrain de tenis",
      "Accès PMR",
      "Piscine"
    ],
    "services": [],
    "atouts": [],
    "salles": [],
    "photos": [
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cfq201guoan8ygvttx4k/832f0d56-a816-4a48-8734-09079cfd9c3b.webp",
        "legende": "Spa et terrasse",
        "categorie": "bien-être"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cfq201guoan8ygvttx4k/89f54487-dda4-4907-8ddf-86c16a2f4b40.webp",
        "legende": "Terrrasse restaurant",
        "categorie": "restauration"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cfq201guoan8ygvttx4k/ff5031d3-4f1e-484e-9304-56e30d1f9552.webp",
        "legende": "Soirée Barbecue en sous bois ",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cfq201guoan8ygvttx4k/b3b49a2c-5e7e-4178-877f-f28389323311.webp",
        "legende": "Apéritif en terrasse ",
        "categorie": "extérieur"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cfq201guoan8ygvttx4k/ace2db8c-3c5f-478d-affa-e27b5a0a9f86.webp",
        "legende": "Apéritif du Sud ",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cfq201guoan8ygvttx4k/94eac1e4-0f56-4397-9ece-986aa16d6fb6.webp",
        "legende": "Salle plénière Agora",
        "categorie": "salle"
      }
    ]
  },
  {
    "id": "cmle4d67r04jhoan8w0z07pag",
    "slug": "centre-d-nanteuil-les-meaux",
    "nom": "Centre D",
    "categorie": "Hôtel",
    "ville": "Nanteuil-Lès-Meaux",
    "codePostal": "77100",
    "departementCode": "77",
    "departement": "Seine-et-Marne",
    "region": "Île-de-France",
    "adresse": "7 Av. Fridingen, 77100 Nanteuil-lès-Meaux, France",
    "latitude": 48.9373868,
    "longitude": 2.8834212,
    "description": "Pour mariages, anniversaires, soirées privées... Deux salles avec parquet (200 m² et 70 m²) continues en L avec plantes, tables et chaises, un patio vitré de plantes vertes original, pour une capacité de 20 à 250 personnes.\n\nLa grande salle est haute de plafond et rend l'espace très agréable.\n\nUn espace cuisine de 80 m² avec accès direct traiteur, deux grands vestiaires, une terrasse extérieure de 100 m² couverte et éclairée sont à votre disposition. 1500 m d'espaces verts entourent les locaux.\n\nDans une zone calme et facile d'accès, surveillée 7/7j de 20h à 6h par un maître chien, parking immédiat, voisinage éloigné.\n\nHôtels à 100 mètres (Kyriad et 1ère Classe)\n\nCentre D est aussi une école de danse avec de nombreux cours de danse de salon, salsa, tango argentin, Reggaeton, Capoeira, Samba brésilienne, Africaine, Kizomba, Bachata, Street , Modern, Pôle dance...\n\nNous sommes à votre disposition pour des animations, des shows, démonstration ou des cours privés de préparation de mariage sur la musique de votre choix.\n\nDes panneaux acoustiques ont été ajoutés dans la grande salle, offrant une meilleure qualité sonore et une déco teinte bois plus plafond est également acoustique.\n\nDes crochets sont placés tout autour de la salle permettant d'accrocher ballons et guirlandes.\n\nLa capacité maximum totale est de 250 personnes. Nous conseillons de ne pas aller au-delà de 220/230 personnes pour garder du confort et une bonne circulation des personnes.\n\nAu centre, un patio décoratif de plantes vertes, puits de lumière naturelle, montant jusqu’au sommet du bâtiment.\n\nNous disposons de 250 chaises, 46 tables rectangulaires de 1, 20m x 0, 70m, 10 tables de 1, 80m x 0, 80m.\n\nLes salles peuvent être louées principalement le week-end. Vous pouvez choisir les intervenants : photographes, dj, traiteur …\nGénéralement accès cuisine jeudi soir, accès salle vendredi, location samedi toute la journée jusqu’au dimanche 5h du matin, sans impératif d’horaire si la location est faite pour le week-end.\n\nCertaines périodes, promo 4 jours du jeudi au dimanche soir : de 800€ à 2000€, pour toute information supplémentaire, nous consulter.\nCENTRE D \nSalles Seine-et-Marne \nNanteuil-lès-Meaux.\nSalle de réception à Nanteuil-lès-Meaux (77100)\n\n3 espaces\n\n640 m²\n260 pers.\nDès 800.00 €\n\nDemander un devis\n\n--- Transports ---\nAéroport : Charles de Gaulle\nGare : Meaux",
    "resume": "Cher client,\n\nJe suis ravie de vous présenter le Centre D à Nanteuil les Meaux, un lieu de séminaire d'exception pour vos événements professionnels. Situé dans un cadre verdoyant et paisible, le Centr",
    "capacite": 200,
    "chambres": 0,
    "chambresSingle": null,
    "chambresTwin": null,
    "sallesReunion": 4,
    "parking": null,
    "equipements": [
      "Lumière du jour",
      "Sonorisation",
      "Vidéoprojecteur",
      "Wifi",
      "Terrasse/Cour intérieure"
    ],
    "services": [],
    "atouts": [],
    "salles": [],
    "photos": [
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4d67r04jhoan8w0z07pag/10040d31-5820-4dd0-a3f6-cadcaf870192.webp",
        "legende": "Façade du Centre D",
        "categorie": "façade"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4d67r04jhoan8w0z07pag/ec38417b-2f21-4c5d-8ae7-cff04cf2b8cd.webp",
        "legende": "Façade du Centre D",
        "categorie": "façade"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4d67r04jhoan8w0z07pag/18b993ba-9f92-4a6f-aceb-000861f15773.webp",
        "legende": "Location de salles pour tous vos évènements",
        "categorie": "salle"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4d67r04jhoan8w0z07pag/84c43027-b733-4e48-9814-3488a91c37d1.webp",
        "legende": "Location de salles pour tous vos évènements",
        "categorie": "salle"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4d67r04jhoan8w0z07pag/78554c5d-ef0f-4741-8d1c-9bc93cc470f8.webp",
        "legende": "École de danse",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4d67r04jhoan8w0z07pag/29860a1e-11d2-4ca6-ac85-796fe7e4e7b1.webp",
        "legende": "École de danse",
        "categorie": "autre"
      }
    ]
  },
  {
    "id": "cmle4cqyo02qtoan8vblrj6tj",
    "slug": "la-ferme-de-la-petite-loge-la-haute-maison",
    "nom": "La Ferme de la Petite Loge",
    "categorie": "Château & domaine",
    "ville": "La Haute-Maison",
    "codePostal": "77580",
    "departementCode": "77",
    "departement": "Seine-et-Marne",
    "region": "Île-de-France",
    "adresse": "La Petite Loge, 77580 La Haute-Maison, France",
    "latitude": 48.8762762,
    "longitude": 3.0168688,
    "description": "Bienvenue à La Ferme de la Petite Loge, un lieu exceptionnel au cœur de la magnifique région de Seine-et-Marne, en France. Notre établissement, situé à La Petite Loge, à La Haute-Maison, est un domaine enchanteur qui offre une expérience unique pour vos événements d'entreprise.\n\nDécouvrez le charme authentique de notre domaine séminaire :\n\nNiché dans un splendide jardin/parc, notre domaine séminaire vous offre un cadre idyllique pour vos événements professionnels. C'est un véritable havre de paix qui invite à la détente, à la réflexion, et qui sera le lieu privilégié pour des moments de convivialité et d'échanges.\n\nConfort et bien-être pour nos clients :\n\nNous avons à cœur de vous offrir le plus grand confort et bien-être lors de votre séjour. Pour cela, nous avons prévu un espace détente où vous pourrez vous ressourcer et vous relaxer dans une ambiance apaisante. Notre terrasse/cour intérieure, chaleureuse et accueillante, est le lieu parfait pour des pauses agréables entre vos réunions.\n\nNous sommes déterminés à rendre notre domaine accessible à tous, c'est pourquoi nous proposons des installations pour les personnes à mobilité réduite, assurant un accès PMR.\n\nÉquipements modernes pour vos séminaires :\n\nAfin de faciliter vos séminaires, nous mettons à votre disposition des équipements modernes et pratiques, dont des blocs-notes et des stylos, un accès Wifi fiable et rapide, un vidéoprojecteur de qualité, un équipement son de pointe, ainsi qu'un paperboard, le tout dans nos salles de réunion et salle de conférence. Vous pourrez ainsi vous concentrer sur l'essentiel de vos réunions.\n\nFacilité de stationnement :\n\nPour votre commodité, nous avons prévu un parking spacieux sur place, garantissant un accès aisé à nos installations.\n\nUn partenaire dédié pour la réussite de vos événements :\n\nLa Ferme de la Petite Loge est l'adresse parfaite pour donner une dimension exceptionnelle à vos événements professionnels. Que vous organisiez un château séminaire, une journée de team-building ou une soirée d'entreprise, notre équipe dédiée est à votre disposition pour répondre à vos besoins spécifiques.\n\n--- Transports ---\nAéroport : L'aéroport le plus proche de La Haute-Maison est l'Aéroport de Paris-Charles-de-Gaulle (CDG). Cet aéroport international est situé à environ 66 kilomètres au nord de La Haute-Maison. Il offre des vols nationaux et internationaux.\nGare : La gare la plus proche de La Haute-Maison est la Gare de Meaux, située à environ 30 kilomètres à l'ouest. De la Gare de Meaux, vous pouvez accéder au réseau de trains pour vous rendre à Paris et d'autres destinations.\nMétro : Le métro de Paris est accessible depuis plusieurs gares parisiennes, notamment la Gare de l'Est et la Gare du Nord, où vous pouvez prendre le RER (Réseau Express Régional) pour voyager dans Paris.",
    "resume": "Chers clients,\n\nBienvenue à La Ferme de la Petite Loge, un lieu d'exception niché au cœur de la magnifique région de Seine-et-Marne, en France. Situé à La Petite Loge, à La Haute-Maison, notre établis",
    "capacite": 150,
    "chambres": 30,
    "chambresSingle": null,
    "chambresTwin": 29,
    "sallesReunion": 10,
    "parking": null,
    "equipements": [
      "Vidéoprojecteur"
    ],
    "services": [],
    "atouts": [],
    "salles": [],
    "photos": [
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cqyo02qtoan8vblrj6tj/91ffa9d9-d9df-4895-aec2-305ff66e2ced.webp",
        "legende": "Cour",
        "categorie": "extérieur"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cqyo02qtoan8vblrj6tj/c926cfa4-839d-4713-a7aa-a3770107789a.webp",
        "legende": "Cour",
        "categorie": "extérieur"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cqyo02qtoan8vblrj6tj/523a7bfb-b9c0-4948-8afc-4ae5b9662473.webp",
        "legende": "Cour",
        "categorie": "extérieur"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cqyo02qtoan8vblrj6tj/b6303d2a-eacf-4327-92c4-8df10a6cf860.webp",
        "legende": "La Clé des Champs",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cqyo02qtoan8vblrj6tj/799009d3-0b9e-4fb9-b3c1-79975a005306.webp",
        "legende": "Le Parc",
        "categorie": "extérieur"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cqyo02qtoan8vblrj6tj/facc9358-23e4-4364-add2-1bd58a610496.webp",
        "legende": "L'Auberge Paysanne",
        "categorie": "autre"
      }
    ]
  },
  {
    "id": "cmle4ciky01skoan8offh4xqk",
    "slug": "aux-vieux-remparts-provins",
    "nom": "Aux Vieux Remparts",
    "categorie": "Hôtel",
    "ville": "Provins",
    "codePostal": "77160",
    "departementCode": "77",
    "departement": "Seine-et-Marne",
    "region": "Île-de-France",
    "adresse": "3 Rue Couverte, 77160 Provins, France",
    "latitude": 48.5625446,
    "longitude": 3.2872492,
    "description": "Bienvenue à l'Hôtel The Originals Aux Vieux Remparts, un lieu de séminaire hors du commun qui vous transporte directement au cœur du Moyen-Âge, aux portes de Paris. Situé à seulement 80 kilomètres de la capitale, dans la magnifique cité médiévale de Provins, cet établissement est une véritable parenthèse temporelle.\n\nImaginez-vous plonger dans l'atmosphère envoûtante du Moyen-Âge tout en profitant du confort moderne. L'Hôtel The Originals Aux Vieux Remparts, une charmante demeure de 42 chambres, est géré par la famille de Xavier et Cécile Roy depuis plus d'un siècle, garantissant un héritage de qualité et d'hospitalité.\n\nLors de votre séjour, vous serez émerveillé par le charme authentique de cet hôtel, qui offre une expérience unique pour vos événements professionnels. Vous pourrez vous réunir dans des espaces de réunion équipés, vous détendre dans un spa luxueux, siroter des cocktails dans le lounge bar, et savourer une cuisine gourmande dans une ambiance chaleureuse.\n\nDe plus, notre terrasse offre une vue imprenable sur la cité médiévale, créant un cadre pittoresque pour vos moments de détente. Que ce soit pour un séminaire, une conférence, une réunion d'affaires ou tout autre événement professionnel, l'Hôtel The Originals Aux Vieux Remparts est le lieu idéal pour conjuguer histoire et modernité dans une ambiance conviviale.\n\nNous vous invitons à remonter le temps et à vivre une expérience inoubliable dans ce lieu de séminaire unique, où le charme du Moyen-Âge se mêle à l'élégance contemporaine. Réservez dès maintenant votre séjour à l'Hôtel The Originals Aux Vieux Remparts et découvrez l'art de conjuguer tradition et innovation dans un cadre exceptionnel.\n\n--- Transports ---\nAéroport : L'aéroport le plus proche de Provins est l'Aéroport de Paris-Orly (ORY), qui se trouve à environ 98 kilomètres de la ville. Pour rejoindre l'hôtel depuis l'aéroport d'Orly, vous pouvez opter pour un service de navette, un service de location de voiture, ou utiliser les transports en commun.\nGare : La gare de Provins est la gare principale desservant la ville. Depuis la gare de Provins, l'Hôtel The Originals Aux Vieux Remparts est accessible à pied ou en taxi, car il est situé au cœur de la cité médiévale.\nMétro : Provins n'a pas de système de métro, car il s'agit d'une ville historique de taille relativement modeste. Cependant, elle possède un charme unique et se prête bien à la marche à pied pour explorer ses rues médiévales.",
    "resume": "Chers clients,\n\nDécouvrez un véritable bijou historique, \"Aux Vieux Remparts\", un hôtel emblématique situé dans la charmante ville médiévale de Provins, en plein cœur de la région de Seine-et-Marne en",
    "capacite": 120,
    "chambres": 50,
    "chambresSingle": null,
    "chambresTwin": 42,
    "sallesReunion": 6,
    "parking": null,
    "equipements": [
      "Vidéoprojecteur",
      "Wifi",
      "Spa",
      "Terrasse/Cour intérieure",
      "Lumière du jour",
      "Jardin/Parc",
      "Parking",
      "Terrain de pétanque",
      "Accès PMR",
      "Billard",
      "Baby-foot"
    ],
    "services": [],
    "atouts": [
      "Espace extérieur",
      "Parc / jardin",
      "Wi-Fi",
      "Équipement audiovisuel",
      "Accès PMR",
      "Climatisation"
    ],
    "salles": [],
    "photos": [
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4ciky01skoan8offh4xqk/cd07542a-8b8c-4d79-adbf-b0bae981231f.webp",
        "legende": "Aux Vieux Remparts, The Originals Relais",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4ciky01skoan8offh4xqk/321d6705-ba17-4529-937a-d9ddd45530f7.webp",
        "legende": "Salle de réunion Gallica",
        "categorie": "salle"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4ciky01skoan8offh4xqk/6dd864b3-aefd-47c4-bde6-0aeec08a8cc4.webp",
        "legende": "Chambre twin",
        "categorie": "chambre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4ciky01skoan8offh4xqk/bc9dc448-dc9a-4adc-8ef5-45f5c0344b2d.webp",
        "legende": "Lounge Bar 1&2",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4ciky01skoan8offh4xqk/7bfd0c2d-6398-41ad-b916-6c7230d179a3.webp",
        "legende": "Terrasse Bistrot",
        "categorie": "extérieur"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4ciky01skoan8offh4xqk/80169868-a807-4afd-a7ce-9c437ce5f9bf.webp",
        "legende": "Bistrot Aux Vieux Remparts - Provins",
        "categorie": "autre"
      }
    ]
  },
  {
    "id": "cmle4cqtx02q8oan8dg43erok",
    "slug": "domaine-de-la-pepiniere-chatenay-sur-seine",
    "nom": "Domaine de la Pépinière",
    "categorie": "Château & domaine",
    "ville": "Châtenay-sur-Seine",
    "codePostal": "77126",
    "departementCode": "77",
    "departement": "Seine-et-Marne",
    "region": "Île-de-France",
    "adresse": "Hameau du Plessis, Rue du Plessis, 77126 Châtenay-sur-Seine",
    "latitude": 48.4181643,
    "longitude": 3.0749367,
    "description": "Le Domaine de la Pépinière est un lieu d'exception éco-responsable situé à 50 minutes de Paris, idéal pour les séminaires résidentiels, réunions d'affaires et team-building. Niché dans un cadre champêtre paisible de 5 hectares, ce domaine offre 31 chambres réparties sur 7 gîtes pouvant accueillir jusqu'à 90 personnes en exclusivité. Ses salles baignées de lumière naturelle, sa cuisine maison 100% locale et ses nombreuses activités en font un partenaire privilégié pour les entreprises en quête d'authenticité et de productivité.",
    "resume": "Domaine de séminaire résidentiel éco-responsable à 50 min de Paris : 90 couchages, salles lumineuses, cuisine maison, 5 hectares de parc privé",
    "capacite": 100,
    "chambres": 31,
    "chambresSingle": null,
    "chambresTwin": 31,
    "sallesReunion": 6,
    "parking": null,
    "equipements": [
      "Accès PMR",
      "Billard",
      "Lumière du jour",
      "Parking",
      "Sonorisation",
      "Terrain de pétanque",
      "Vidéoprojecteur",
      "Wifi",
      "Jardin/Parc",
      "Terrasse/Cour intérieure"
    ],
    "services": [],
    "atouts": [],
    "salles": [],
    "photos": [
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cqtx02q8oan8dg43erok/8213b283-0132-4c49-a23a-7338415291ac.webp",
        "legende": null,
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cqtx02q8oan8dg43erok/28ee0567-09c1-498f-a4eb-cb92fafb20f4.webp",
        "legende": null,
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cqtx02q8oan8dg43erok/61660050-85b8-411d-8918-4679ce8e0d92.webp",
        "legende": null,
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cqtx02q8oan8dg43erok/7bf5d119-ac02-4cd1-8b85-78861114f969.webp",
        "legende": null,
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cqtx02q8oan8dg43erok/5f8074ec-6feb-4516-a3b6-309b030a17ca.webp",
        "legende": null,
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cqtx02q8oan8dg43erok/d0f3d3a9-e8b0-492a-974c-435bdbcaf2dd.webp",
        "legende": null,
        "categorie": "autre"
      }
    ]
  },
  {
    "id": "cmle4cn2802aioan8daa8d0py",
    "slug": "relais-spa-val-d-europe-chessy",
    "nom": "Relais Spa Val D’europe",
    "categorie": "Hôtel",
    "ville": "Chessy",
    "codePostal": "77700",
    "departementCode": "77",
    "departement": "Seine-et-Marne",
    "region": "Île-de-France",
    "adresse": "1 Rue des Grands Prés, 77700 Chessy, France",
    "latitude": 48.8573254,
    "longitude": 2.7728433,
    "description": "Bienvenue au RELAIS SPA VAL D'EUROPE, une évasion de bien-être située idéalement à Chessy, à quelques minutes de Disneyland® Paris et du centre de Paris. Ce luxueux aparthotel combine élégamment le confort des hébergements haut de gamme avec des services de spa exceptionnels fournis par NUXE®, créant une expérience inoubliable pour les visiteurs. 🌟\n\nL'établissement offre une variété d'options de logement, des chambres Premium aux suites Junior et suites exécutives, toutes équipées de lits king size et d'une literie de haute qualité pour garantir votre confort maximal. Les familles trouveront leur bonheur avec des suites familiales spacieuses, idéales pour des séjours prolongés, grâce à des équipements bien pensés incluant des cuisines équipées et des espaces séparés pour les parents et les enfants. 🛏️✨\n\nLe cadre, combinant élégance et modernité, est complété par des installations telles qu'une piscine, un hammam, un sauna et une salle de fitness, parfait pour se détendre après une journée chargée. En plus des soins de spa, les clients peuvent savourer des repas gastronomiques au restaurant Ô Relais, où la cuisine française traditionnelle rencontre des créations originales dans une ambiance conviviale et chaleureuse. 🍽️💫\n\nPour ceux qui cherchent à explorer la région, le RELAIS SPA VAL D'EUROPE est un point de départ idéal pour visiter les sites touristiques de Paris et profiter des nombreuses activités et excursions disponibles dans le Val d'Europe.\n\n--- Transports ---\nAéroport : National : Paris-Charles de Gaulle, environ 40 minutes en voiture. International : Paris-Charles de Gaulle, environ 40 minutes en voiture.\nGare : SNCF/TGV national : Gare de Marne-la-Vallée - Chessy, environ 10 minutes en voiture. TGV international : Gare de Marne-la-Vallée - Chessy, environ 10 minutes en voiture.\nMétro : Le RER A à la station Val d'Europe offre une connexion rapide et pratique avec le centre de Paris et les autres attractions majeures de la région.",
    "resume": "Chers Clients,\n\nJe suis ravie de vous recommander le RELAIS SPA VAL D'EUROPE pour votre prochain événement professionnel ou séminaire. La qualité des installations, associée à un service impeccable et",
    "capacite": 100,
    "chambres": 219,
    "chambresSingle": null,
    "chambresTwin": 73,
    "sallesReunion": 6,
    "parking": null,
    "equipements": [
      "Piscine",
      "Spa",
      "Parking sur place",
      "Accès PMR",
      "Salle de fitness"
    ],
    "services": [],
    "atouts": [],
    "salles": [],
    "photos": [
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cn2802aioan8daa8d0py/5bc96d16-adb2-452c-969a-d37802672c10.webp",
        "legende": "Salon Rochambeau - disposition U",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cn2802aioan8daa8d0py/72556066-924a-4672-83c0-bf4c8105aca4.webp",
        "legende": "Salon Rochambeau - disposition théâtre",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cn2802aioan8daa8d0py/5c2c6138-aa6a-4b67-9e79-bd06275033f4.webp",
        "legende": "Salon La Fayette ",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cn2802aioan8daa8d0py/367e044f-aec3-4618-a963-e5d823af67b3.webp",
        "legende": "Board Meeting Room",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cn2802aioan8daa8d0py/6aeb2ed7-2de6-4184-a1fa-d5c37ac33462.webp",
        "legende": "Tocqueville 3 format U ",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cn2802aioan8daa8d0py/971ab9c4-06cc-4bf6-bb06-d0edee5adf49.webp",
        "legende": "Tocqueville 1 et 2 décloisonné",
        "categorie": "autre"
      }
    ]
  },
  {
    "id": "cmle4d56t04droan8kp69h4j0",
    "slug": "chateau-du-mee-le-mee-sur-seine",
    "nom": "Château du Mée",
    "categorie": "Château & domaine",
    "ville": "Le Mée-sur-Seine",
    "codePostal": "77350",
    "departementCode": "77",
    "departement": "Seine-et-Marne",
    "region": "Île-de-France",
    "adresse": "571 Av. Jean Monnet, 77350 Le Mée-sur-Seine, France",
    "latitude": 48.5317802,
    "longitude": 2.6268968,
    "description": "Le Château du Mée, situé à 571 Av. Jean Monnet, 77350 Le Mée-sur-Seine, France, est un lieu idéal pour organiser des séminaires d'entreprise. Niché dans la région Île-de-France, département de Seine-et-Marne, ce magnifique château offre un cadre paisible et verdoyant, parfait pour des activités de team building ou des réunions stratégiques.\n\nLe Château du Mée dispose de 125 chambres, dont 50 chambres twin, et 4 salles de réunion pouvant accueillir de 10 à 100 personnes. La plus grande salle, avec une capacité de 100 personnes, est équipée de matériel de conférence de pointe.\n\nEn dehors des réunions, les participants peuvent profiter d'un large éventail d'activités : randonnées dans les forêts environnantes, visites de monuments historiques locaux, ou encore dégustation de vins régionaux. Sur place, le château propose une piscine, un spa, un court de tennis et un restaurant gastronomique. 🍽️🍷\n\n--- Transports ---\nAéroport : Aéroport le plus proche : Aéroport de Paris-Orly (45 minutes en voiture)\nGare : Gares à proximité : Gare de Melun (15 minutes en voiture)\nMétro : RER D station Le Mée (10 minutes à pied)",
    "resume": "Chers Clients,\n\nNous vous recommandons vivement le Château du Mée pour votre prochain séminaire d'entreprise. Ce lieu offre un mélange unique de charme historique et de commodités modernes, le tout da",
    "capacite": 80,
    "chambres": 80,
    "chambresSingle": null,
    "chambresTwin": 50,
    "sallesReunion": 5,
    "parking": null,
    "equipements": [
      "Salle de fitness",
      "Terrain de pétanque",
      "Terrain de football"
    ],
    "services": [],
    "atouts": [],
    "salles": [],
    "photos": [
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4d56t04droan8kp69h4j0/b70653eb-7990-4192-9b55-5160cc5a7792.webp",
        "legende": "Extérieur",
        "categorie": "extérieur"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4d56t04droan8kp69h4j0/8a56b140-23f3-4287-8588-5c4875de24ed.webp",
        "legende": "L' Auditorium",
        "categorie": "salle"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4d56t04droan8kp69h4j0/5a4ffdd8-9d4d-4ecb-a675-638d51da968d.webp",
        "legende": "Accueil & Bar",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4d56t04droan8kp69h4j0/0b12950f-75ed-4ab9-b8d4-8c544edb0b75.webp",
        "legende": "Chambre Twin",
        "categorie": "chambre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4d56t04droan8kp69h4j0/12d9c60f-da71-4a0f-8474-6c875aa19ee8.webp",
        "legende": "La Piscine",
        "categorie": "bien-être"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4d56t04droan8kp69h4j0/a21f8fd0-1fea-4248-a1a0-623878a5dd10.webp",
        "legende": "La Grange n°1",
        "categorie": "autre"
      }
    ]
  },
  {
    "id": "cmle4cu93032qoan8sfafoxun",
    "slug": "rock-bleau-noisy-sur-ecole",
    "nom": "Rock&bleau",
    "categorie": "Château & domaine",
    "ville": "Noisy-sur-École",
    "codePostal": "77123",
    "departementCode": "77",
    "departement": "Seine-et-Marne",
    "region": "Île-de-France",
    "adresse": "11 bis Chem. des Prés, 77123 Noisy-sur-École, France",
    "latitude": 48.373749,
    "longitude": 2.4993278,
    "description": "Rock&Bleau est un hôtel unique situé dans la forêt de Fontainebleau, à Noisy-sur-École, sur un site privé de 6 hectares. L'établissement propose 25 chambres spacieuses à la décoration rock, des espaces de réunion et de conférence modernes, un restaurant, un bar à cocktails, une piscine, un spa et des terrains extérieurs. La région de Fontainebleau offre de nombreux sites d'escalade mondialement connus, ainsi que le château de Fontainebleau classé au patrimoine mondial de l'UNESCO. Accessible depuis les aéroports d'Orly et CDG, et la gare de Fontainebleau-Avon.",
    "resume": "Hôtel unique à l'esprit rock de 25 chambres situé au cœur de la forêt de Fontainebleau sur 6 hectares, avec 5 salles de réunion, piscine, spa et accès aux sites d'escalade mondiaux.",
    "capacite": 40,
    "chambres": 25,
    "chambresSingle": null,
    "chambresTwin": 9,
    "sallesReunion": 5,
    "parking": null,
    "equipements": [
      "Lumière du jour",
      "Parking",
      "Piscine",
      "Jardin/Parc",
      "Wifi",
      "Vidéoprojecteur",
      "Spa",
      "Terrain de football",
      "Accès PMR",
      "Terrain de pétanque",
      "Terrasse/Cour intérieure"
    ],
    "services": [],
    "atouts": [],
    "salles": [],
    "photos": [
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cu93032qoan8sfafoxun/3b90dba2-cb04-4a5a-b5cc-a8c4b8f1cdb9.webp",
        "legende": "Rock&Bleau",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cu93032qoan8sfafoxun/25ce3a4d-8bde-4dcb-9b62-9606ae914f03.webp",
        "legende": "Rock&Bleau",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cu93032qoan8sfafoxun/15c29285-a3a1-4cfd-81a0-c7811607cc21.webp",
        "legende": "Rock&Bleau",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cu93032qoan8sfafoxun/ccfda9ea-d7fd-4d94-bb5e-01bfb15b157d.webp",
        "legende": "Rock&Bleau",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cu93032qoan8sfafoxun/e693aaa2-6a7c-40d2-a4ae-5ad2bb9f5727.webp",
        "legende": "Rock&Bleau",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cu93032qoan8sfafoxun/891db076-2a1d-43e7-8858-e61b3cc90f4e.webp",
        "legende": "Rock&Bleau",
        "categorie": "autre"
      }
    ]
  },
  {
    "id": "cmle4cjrg01wkoan8xx9pwpj5",
    "slug": "palais-des-congres-de-versailles-versailles",
    "nom": "Palais des Congrès de Versailles",
    "categorie": "Château & domaine",
    "ville": "Versailles",
    "codePostal": "78000",
    "departementCode": "78",
    "departement": "Yvelines",
    "region": "Île-de-France",
    "adresse": "10 Rue de la Chancellerie, 78000 Versailles, France",
    "latitude": 48.8025572,
    "longitude": 2.1232462,
    "description": "Versailles Palais des Congrès est un lieu incontournable et entièrement rénovés, vous offrant 14 salles équipées pour accueillir tous vos événements professionnels, congrès, manifestations culturelles et événements privés. Pouvant accueillir de 20 à 1500 personnes, nos espaces sont modulables et équipés des nouvelles technologies. \n\nLe Palais vous offre une grande liberté d’expression, un terrain de jeux unique de 3200m² totalement rénovés de salles haut de gamme pour votre conférence, séminaire, spectacle ou autre type d’événement. Ce lieu situé à 12min de Paris, juste en face du Château de Versailles vous laisse libre cours à votre imagination. \n\nPour votre événement professionnel ou votre événement privé, le Palais des Congrès de Versailles vous permet de proposer à vos convives un cadre unique et privilégié. Versailles est une ville qui se distingue par son histoire riche et ses monuments majestueux. En se rendant à votre séminaire, votre congrès, les participants apercevront le Château de Versailles : quel meilleur environnement pour donner une aura unique à votre événement dans notre Palais des Congrès près de Paris ?\n\nPour vous accompagner, notre équipe dédiée et nos partenaires prestataires vous offrent un ensemble de prestations sur-mesure. Régie, techniciens, traiteurs de renom, artisans locaux, artistes et animations, facilités de transport et d’hébergement, accueil, sécurité : libre à vous de choisir les ressources et compétences dont vous avez besoin, à la carte, pour faciliter votre location de salle clé-en-main et réussir votre projet événementiel.\n\nAmphithéâtre Richelieu : jusqu’à 1008 places avec balcon.\n600 places de parking.\n\nTechnique :\nMicro HF, Mur Led, écrans latéraux avec vidéoprojecteurs, retours écrans, timer … Cabine de traduction, Régie son, Régie lumière, Wifi.\n\nServices :\nRégie, techniciens, sécurité, ménage, accueil, traiteurs et artisans locaux…\n\n--- Transports ---\nAéroport : Aéroport d’Orly\nGare : RER station Versailles Rive Gauche – Versailles Château\nMétro : nc",
    "resume": "Le Palais des Congrès de Versailles est un lieu prestigieux qui offre un cadre unique pour les événements professionnels et privés. Situé à quelques pas du célèbre Château de Versailles, il bénéficie",
    "capacite": 1500,
    "chambres": 1024,
    "chambresSingle": null,
    "chambresTwin": 0,
    "sallesReunion": 14,
    "parking": null,
    "equipements": [
      "Amphithéâtre",
      "Accès PMR",
      "Vidéoprojecteur",
      "Wifi",
      "Parking",
      "Lumière du jour",
      "Sonorisation"
    ],
    "services": [],
    "atouts": [],
    "salles": [],
    "photos": [
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cjrg01wkoan8xx9pwpj5/b7b330d8-4a2c-4392-b83d-52a0fba086c0.webp",
        "legende": "Amphithéâtre Richelieu",
        "categorie": "salle"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cjrg01wkoan8xx9pwpj5/2ef227a0-bca6-49ea-a03e-fe1e85310bd5.webp",
        "legende": "Amphithéâtre Richelieu",
        "categorie": "salle"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cjrg01wkoan8xx9pwpj5/011d6deb-2717-431b-8a72-b59b24a8693a.webp",
        "legende": "Amphithéâtre Richelieu",
        "categorie": "salle"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cjrg01wkoan8xx9pwpj5/e5bec82f-2df5-45cd-baa8-68513baec86d.webp",
        "legende": "Salle Mazarin, Racine, Molière",
        "categorie": "salle"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cjrg01wkoan8xx9pwpj5/f4313a00-06c5-43f4-9046-be6876a970a1.webp",
        "legende": "Salle Mazarin, Racine, Molière",
        "categorie": "salle"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cjrg01wkoan8xx9pwpj5/6354bf40-4769-4b7f-9718-d1add8b066f5.webp",
        "legende": "Salle Mazarin, Racine, Molière",
        "categorie": "salle"
      }
    ]
  },
  {
    "id": "cmle4cuu8035aoan8hmbqi5tr",
    "slug": "la-ferme-du-manet-montigny-le-bretonneux",
    "nom": "La Ferme du Manet",
    "categorie": "Hôtel",
    "ville": "Montigny-le-Bretonneux",
    "codePostal": "78180",
    "departementCode": "78",
    "departement": "Yvelines",
    "region": "Île-de-France",
    "adresse": "61 Av. du Manet, 78180 Montigny-le-Bretonneux, France",
    "latitude": 48.7639474,
    "longitude": 2.0203608,
    "description": "La Ferme du Manet vous invite à découvrir un lieu d'exception, où le caractère et l'authenticité se marient harmonieusement au cœur d'un environnement verdoyant. Ancien corps de ferme restauré avec passion, notre établissement offre une expérience unique.\n\nSituée à seulement 24 km de Paris, au cœur du pôle économique de Saint-Quentin-en-Yvelines, la Ferme du Manet est bien plus qu'un lieu de réception. C'est un véritable havre de paix, propice à la détente et aux loisirs, où chaque instant est pensé pour vous offrir une expérience inoubliable.\n\nNotre équipe dévouée, soucieuse de votre satisfaction, met un point d'honneur à personnaliser chaque aspect de votre événement. Que vous prépariez une réunion d'entreprise, une soirée spéciale, une journée de team building ou une garden party, nous sommes là pour que votre moment soit unique.\n\nLes atouts de la Ferme du Manet sont nombreux :\n\nAuthenticité Rustique : Notre ancienne ferme restaurée conserve son caractère authentique, offrant une ambiance chaleureuse et conviviale à tous vos événements.\n\nEnvironnement Naturel : Nichée au cœur d'un écrin de verdure, notre lieu inspire la sérénité et vous permet de vous éloigner du tumulte de la vie urbaine.\n\nService Personnalisé : Chaque détail de votre événement est pensé sur mesure pour répondre à vos attentes. Nous faisons de votre satisfaction notre priorité.\n\nProximité de Paris : À seulement 24 km de la capitale, vous avez l'opportunité de profiter d'un cadre bucolique sans vous éloigner de l'effervescence de Paris.\n\nLa Ferme du Manet est bien plus qu'un lieu de rendez-vous professionnel. C'est un lieu où les idées se concrétisent, où les équipes se rassemblent, où les sourires s'épanouissent, et où les souvenirs se créent.\n\nLaissez-vous séduire par l'expérience unique que nous offrons à la Ferme du Manet. Nous sommes impatients de vous accueillir pour créer des moments inoubliables ensemble.\n\n--- Transports ---\nAéroport : L'aéroport le plus proche de la Ferme du Manet est l'Aéroport de Paris-Orly (ORY). Paris-Orly est situé à environ 30 km de la Ferme du Manet, ce qui en fait l'option la plus proche pour les voyageurs en provenance de l'étranger ou d'autres régions de la France.\nGare : Pour les voyageurs utilisant les transports en commun, la gare la plus proche de la Ferme du Manet est la Gare de Saint-Quentin-en-Yvelines. Depuis cette gare, vous pouvez accéder au réseau de trains de banlieue RER (Réseau Express Régional) qui vous connecte à Paris et à d'autres destinations de la région parisienne. Vous pouvez également utiliser le métro à partir de certaines stations RER pour vous déplacer dans Paris.\nMétro : Vous pouvez accéder au métro depuis certaines stations RER pour explorer Paris en métro.",
    "resume": "Chers clients,\n\nC'est avec un grand enthousiasme que je vous recommande la Ferme du Manet comme un lieu exceptionnel pour vos événements d'entreprise et réunions spéciales. La Ferme du Manet est l'end",
    "capacite": 1400,
    "chambres": 0,
    "chambresSingle": null,
    "chambresTwin": 0,
    "sallesReunion": 22,
    "parking": null,
    "equipements": [
      "Accès PMR",
      "Baby-foot",
      "Billard",
      "Lumière du jour",
      "Parking",
      "Terrain de pétanque",
      "Terrasse/Cour intérieure",
      "Jardin/Parc",
      "Vidéoprojecteur",
      "Sonorisation",
      "Wifi"
    ],
    "services": [],
    "atouts": [],
    "salles": [],
    "photos": [
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cuu8035aoan8hmbqi5tr/528c4200-e5ee-4607-95f7-3b06cfeecdf3.webp",
        "legende": null,
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cuu8035aoan8hmbqi5tr/5de9f1a0-3e27-46f2-a7d8-63e3420c0708.webp",
        "legende": "Accueil",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cuu8035aoan8hmbqi5tr/d75fc425-dc02-48a5-b0b1-4885dbbaf00e.webp",
        "legende": null,
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cuu8035aoan8hmbqi5tr/270201e0-cb5c-42df-a10e-b63c400a16e5.webp",
        "legende": null,
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cuu8035aoan8hmbqi5tr/a23a711d-6c26-41c8-ba57-89dcf80507e2.webp",
        "legende": null,
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cuu8035aoan8hmbqi5tr/659f6b7e-cb73-41ac-b8de-f701d9c82ab6.webp",
        "legende": null,
        "categorie": "autre"
      }
    ]
  },
  {
    "id": "cmle4cw2r039poan837og710o",
    "slug": "domaine-de-la-butte-ronde-la-boissiere-ecole",
    "nom": "Domaine de la Butte Ronde",
    "categorie": "Salle de réception",
    "ville": "La Boissière-École",
    "codePostal": "78125",
    "departementCode": "78",
    "departement": "Yvelines",
    "region": "Île-de-France",
    "adresse": "Chemin de l'Abîme, 78125 La Boissière-École",
    "latitude": 48.6737865,
    "longitude": 1.6693334,
    "description": "Lieu de réception de prestige niché au cœur de la forêt de Rambouillet, le Domaine de la Butte Ronde offre un cadre d'exception pour vos événements d'entreprise. Sur 42 hectares de nature préservée, ce domaine privatisable propose 153 couchages répartis en chalets finlandais, lodge contemporain et hameau de caractère, ainsi que 13 salles modulables pouvant accueillir jusqu'à 600 personnes. Équipé de la Grande Verrière panoramique (500 pers), de la salle Séquoia (500 pers), d'une piscine couverte, d'un spa privatif et d'un haras olympique, le domaine offre une expérience résidentielle complète avec restauration sur mesure et activités de team building en pleine nature.",
    "resume": "Domaine événementiel 42 ha en forêt de Rambouillet : 153 couchages, 13 salles jusqu'à 600 pers, Grande Verrière, séminaires résidentiels, à 45 min de Paris",
    "capacite": 589,
    "chambres": 43,
    "chambresSingle": null,
    "chambresTwin": 41,
    "sallesReunion": 9,
    "parking": 300,
    "equipements": [
      "Vidéoprojecteur",
      "Salle de fitness",
      "Spa",
      "Accès lac / rivière",
      "Baby-foot",
      "Bagagerie",
      "Bar / Lounge",
      "Billard",
      "Borne de recharge électrique",
      "Centre de bien-être",
      "Coffre-fort",
      "Cour intérieure",
      "Cuisine privatisable",
      "Espace barbecue",
      "Espace coworking",
      "Jacuzzi",
      "Jardin / Parc arboré",
      "Lumière du jour (dans salles)",
      "Navette / Transfert gare ou aéroport",
      "Paperboard",
      "Parking privé",
      "Piscine intérieure",
      "Salle de conférence",
      "Salle de jeux",
      "Salle de réunion",
      "Sauna",
      "Table de poker",
      "Terrain de football",
      "Terrain de pétanque",
      "Terrasse",
      "Terrasse extérieure pour repas",
      "Télévision",
      "Vue panoramique",
      "Wifi haut débit",
      "Écran"
    ],
    "services": [],
    "atouts": [],
    "salles": [],
    "photos": [
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cw2r039poan837og710o/8fed5f6d-4bf9-4fc0-9bc1-1faacd599934.webp",
        "legende": "Domaine de la Butte Ronde",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cw2r039poan837og710o/3ed8b8bf-6e63-4ecc-88fa-91bf09235bc3.webp",
        "legende": "Salle Séquoia 1",
        "categorie": "salle"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cw2r039poan837og710o/cc930fcf-a928-4dbc-8ba7-f9a890bb089a.webp",
        "legende": "Salle Séquoia 1",
        "categorie": "salle"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cw2r039poan837og710o/5a97a34a-277a-471c-bac4-321e6e60c1f8.webp",
        "legende": "Salle Séquoia 1",
        "categorie": "salle"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cw2r039poan837og710o/bb9e2f9c-911e-4f99-9020-d37399a9cca3.webp",
        "legende": "Salle Séquoia 3",
        "categorie": "salle"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cw2r039poan837og710o/951ccf47-9ee9-49f8-a1c5-3626a770511c.webp",
        "legende": "Salle Séquoia 3",
        "categorie": "salle"
      }
    ]
  },
  {
    "id": "cmle4ci3601qeoan8p5j48iin",
    "slug": "chateau-du-bois-du-rocher-jouy-en-josas",
    "nom": "Chateau du Bois du Rocher",
    "categorie": "Château & domaine",
    "ville": "Jouy-en-Josas",
    "codePostal": "78350",
    "departementCode": "78",
    "departement": "Yvelines",
    "region": "Île-de-France",
    "adresse": "Rte de Versailles, Jouy-en-Josas, France",
    "latitude": 48.7705198,
    "longitude": 2.1908784,
    "description": "Découvrez un lieu d'exception, situé dans les Yvelines, au vert, à seulement 15 kilomètres de Paris Le domaine du Château du Bois du Rocher vous accueille dans son Orangerie, son Château fin XIXème et son parc boisé de 4 hectares. au vert. Plus qu'un lieu, le domaine vous propose une organisation clef en main de vos événements et assure l’ensemble de la chaine logistique : traiteur, technique, animation, accueil, décoration, installation, etc. Ses atouts : sa capacité d'accueil jusque 400 personnes son Orangerie de 504m2 les grands salon du Château (120m2, 100m2, 50m2, 25m2 soit près de 300m2 d'espaces ouverts Parc boisé de 4 hectares situé au coeur de la forêt domaniale de versailles (40 hectares) ses teams building : Enigme du Château, Autour du monde, Défi nature (permettant une grande flexibilité en fonction de la météo) un accrobranche de 11 parcours situé à 100m son parking d'une capacité de 200 voitures Notre philosophie : l’envie et le plaisir de vous faire passer un moment hors du temps au coeur de notre domaine. Ne vous souciez de rien, nous nous occupons de tout.\n\n--- Transports ---\nAéroport : orly\nGare : bièvres\nMétro : pont de sèvres",
    "resume": "Cher client, nous sommes ravis de vous présenter le Château du Bois du Rocher, un bijou historique niché dans un écrin de verdure à Jouy-en-Josas, dans les Yvelines, en France. Notre château offre un",
    "capacite": 400,
    "chambres": 0,
    "chambresSingle": null,
    "chambresTwin": 0,
    "sallesReunion": 6,
    "parking": null,
    "equipements": [
      "Terrain de pétanque",
      "Salle de fitness",
      "Vidéoprojecteur",
      "Paperboard"
    ],
    "services": [],
    "atouts": [],
    "salles": [],
    "photos": [
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4ci3601qeoan8p5j48iin/474011ed-ee97-425c-9961-001f4ad9ea66.webp",
        "legende": "Orangerie du Château du Bois du Rocher la nuit",
        "categorie": "salle"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4ci3601qeoan8p5j48iin/ebb6d3b7-ea56-4a8c-8632-094f42fbfd63.webp",
        "legende": "Vue du parc",
        "categorie": "extérieur"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4ci3601qeoan8p5j48iin/a7b385bd-9b29-474f-8c91-ef1ae54a9d36.webp",
        "legende": "Soirée Casino",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4ci3601qeoan8p5j48iin/e49782c1-8571-4267-a62b-14eeba808c57.webp",
        "legende": "Réalité virtuelle",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4ci3601qeoan8p5j48iin/e93de6c5-9cee-4b0a-9fb3-29f9ba213dfa.webp",
        "legende": "Voiture dans l'Orangerie",
        "categorie": "salle"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4ci3601qeoan8p5j48iin/9982c26a-c027-4231-96e8-b39d660bd085.webp",
        "legende": "Cocktail autour du monde",
        "categorie": "autre"
      }
    ]
  },
  {
    "id": "cmle4d1qf03xnoan838er4tlc",
    "slug": "dolce-wyndham-versailles-jouy-en-josas",
    "nom": "Dolce Wyndham Versailles",
    "categorie": "Château & domaine",
    "ville": "Jouy-en-Josas",
    "codePostal": "78350",
    "departementCode": "78",
    "departement": "Yvelines",
    "region": "Île-de-France",
    "adresse": "2 Rue Jean Bauvinon, 78350 Jouy-en-Josas, France",
    "latitude": 48.7694716,
    "longitude": 2.1733017,
    "description": "C’est à son emplacement exceptionnel que l’hôtel Dolce Versailles doit sa lumière. Au cœur de la Vallée de la Bièvre, le Domaine du Montcel dissimule des trésors qui se laissent découvrir avec émerveillement une fois les grilles franchies. Le chemin mène vers un grand parc arboré de 14 hectares dans lequel trône un Cèdre bicentenaire, un jardin à l’anglaise classé et des œuvres d’arts majestueuses. En flânant, le Village des Arts attise la curiosité au loin. Puis, se dévoile subrepticement la beauté du château du XVIII° siècle au milieu d’une nature abondante. Son atmosphère artistique est entièrement réfléchie par la présence des œuvres contemporaines de Michaël Cailloux et Louise Frydman.\nLes prémices d’une escapade bucolique, subtile et inattendue sont au rendez-vous des visiteurs.\nPlusieurs siècles d’histoire se bousculent au sein du Dolce Versailles, un ravissant lieu de vie et véritable symbole de l’art de vivre à la française, où l’équipe bienveillante vous accueille et vous place au centre de ses attentions et de ses préoccupations.\n\n--- Transports ---\nAéroport : Aéroport Paris-Orly (ORY) 🚗 Temps de trajet : environ 25 minutes en voiture  🚖 Possibilité de transfert en VTC / taxi  🚌 Accessible également via transports en commun (Orlyval + RER B puis RER C), en environ 1h15  Aéroport Paris-Charles de Gaulle (CDG) 🚗 Temps de trajet : environ 55 minutes en voiture  🚖 VTC / taxi recommandés pour un trajet direct  🚆 Possibilité en transports en commun : RER B jusqu’à Massy-Palaiseau, puis RER C jusqu’à Jouy-en-Josas (environ 1h30)\nGare : Gare RER C (Jouy-en-Josas)",
    "resume": "Situé à Jouy-en-Josas, à seulement 30 minutes de Paris, le Dolce by Wyndham Versailles – Domaine du Montcel offre un cadre exceptionnel pour l’organisation d’événements professionnels, alliant éléganc",
    "capacite": 350,
    "chambres": 178,
    "chambresSingle": null,
    "chambresTwin": 83,
    "sallesReunion": 18,
    "parking": null,
    "equipements": [
      "Spa",
      "Salle de fitness",
      "Terrain de pétanque",
      "Piscine extérieure",
      "Piscine intérieure",
      "Restaurant sur place",
      "Salle de jeux",
      "Terrasse extérieure pour repas",
      "Terrasse",
      "Wifi haut débit",
      "Écran",
      "Vidéoprojecteur",
      "Terrain de football",
      "Télévision",
      "Salle de réunion",
      "Room service",
      "Réception 24h/24",
      "Salle de conférence",
      "Parking privé",
      "Massages / soins",
      "Micros / Sonorisation",
      "Paperboard",
      "Lumière du jour (dans salles)",
      "Location de vélos",
      "Lit king-size",
      "Jardin / Parc arboré",
      "Espace barbecue",
      "Hammam",
      "Coffre-fort",
      "Billard",
      "Bar / Lounge",
      "Climatisation",
      "Bagagerie",
      "Baby-foot",
      "Ascenseur",
      "Accessibilité PMR",
      "Borne de recharge électrique",
      "Centre de bien-être",
      "Ping-pong",
      "Vue panoramique"
    ],
    "services": [],
    "atouts": [],
    "salles": [],
    "photos": [
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4d1qf03xnoan838er4tlc/28e14d71-e956-4979-a98d-5aa9bb1cc807.webp",
        "legende": "La façade du Dolce by Wyndham Versailles",
        "categorie": "façade"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4d1qf03xnoan838er4tlc/eb0d5b6b-9b8e-4c03-a5e2-328fc7b923a1.webp",
        "legende": "La façade du Dolce by Wyndham Versailles",
        "categorie": "façade"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4d1qf03xnoan838er4tlc/844f54bf-fd4b-411e-baec-5e62fbad8874.webp",
        "legende": null,
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4d1qf03xnoan838er4tlc/c2169c1b-fcd0-4337-b3df-9b7efd67545c.webp",
        "legende": null,
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4d1qf03xnoan838er4tlc/5cd1e173-dd8b-437c-b838-e56fab0fcd35.webp",
        "legende": null,
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4d1qf03xnoan838er4tlc/f99dc71e-3eca-409a-9211-00c767f5b87b.webp",
        "legende": null,
        "categorie": "autre"
      }
    ]
  },
  {
    "id": "cmle4chjp01o2oan8heopqht8",
    "slug": "golf-de-l-ile-fleurie-chatou",
    "nom": "Golf de L'Ile Fleurie",
    "categorie": "Salle de réception",
    "ville": "Chatou",
    "codePostal": "78400",
    "departementCode": "78",
    "departement": "Yvelines",
    "region": "Île-de-France",
    "adresse": "Île Fleurie, Île des Impressionnistes, 78400 Chatou",
    "latitude": 48.9033448,
    "longitude": 2.1835144,
    "description": "Établissement événementiel d'exception situé sur l'Île des Impressionnistes, le Golf de l'Île Fleurie offre un cadre bucolique en bord de Seine à seulement 10 minutes de Paris La Défense. Véritable oasis de calme et de verdure, ce lieu atypique combine un parcours de golf 9 trous avec des espaces de réception modulables pouvant accueillir jusqu'à 300 personnes. Doté de salles de réunion climatisées et équipées, d'un restaurant gastronomique (Rhino's Club) et de terrasses ensoleillées, le Golf de l'Île Fleurie est l'adresse idéale pour séminaires, conférences, team-building et réceptions d'entreprise dans un environnement naturel exceptionnel.",
    "resume": "Golf événementiel 9 trous en bord de Seine, 4 salles réunion, capacité 300 pers., à 10 min de La Défense",
    "capacite": 300,
    "chambres": null,
    "chambresSingle": null,
    "chambresTwin": null,
    "sallesReunion": 4,
    "parking": 150,
    "equipements": [
      "Bar / Lounge",
      "Climatisation",
      "Jardin / Parc arboré",
      "Lumière du jour (dans salles)",
      "Micros / Sonorisation",
      "Parking privé",
      "Restaurant sur place",
      "Salle de conférence",
      "Salle de réunion",
      "Système de visioconférence",
      "Terrasse extérieure pour repas",
      "Terrasse",
      "Télévision",
      "Vidéoprojecteur",
      "Wifi haut débit",
      "Écran"
    ],
    "services": [],
    "atouts": [
      "Espace extérieur",
      "Parc / jardin",
      "Wi-Fi",
      "Équipement audiovisuel",
      "Accès PMR",
      "Climatisation"
    ],
    "salles": [],
    "photos": [
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4chjp01o2oan8heopqht8/72ea7bee-4ad9-4cb1-98a4-cb543242e384.webp",
        "legende": null,
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4chjp01o2oan8heopqht8/e8b09f64-5315-4ec4-be77-6ee36691ebed.webp",
        "legende": null,
        "categorie": "extérieur"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4chjp01o2oan8heopqht8/9d7079d9-8543-4a72-9c84-0e7ca8797ec6.webp",
        "legende": null,
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4chjp01o2oan8heopqht8/773aea0a-2ba3-4720-9f32-c939880e9407.webp",
        "legende": null,
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4chjp01o2oan8heopqht8/f8457fc3-a330-4fe2-8239-8f3b47ca8b50.webp",
        "legende": null,
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4chjp01o2oan8heopqht8/07d82215-f2fa-47e0-82c0-e3a1d0e13f92.webp",
        "legende": null,
        "categorie": "autre"
      }
    ]
  },
  {
    "id": "cmle4cdb4016ioan8ioahcyqt",
    "slug": "la-ferme-du-prieure-rennemoulin",
    "nom": "La Ferme du Prieuré",
    "categorie": "Château & domaine",
    "ville": "Rennemoulin",
    "codePostal": "78590",
    "departementCode": "78",
    "departement": "Yvelines",
    "region": "Île-de-France",
    "adresse": "La Frm du Prieuré, 78590 Rennemoulin, France",
    "latitude": 48.8348728,
    "longitude": 2.0404722,
    "description": "La Ferme du Prieuré vous accueille sur la Plaine de Versailles pour vos événements professionnels, en pleine nature. Bordé de champs, vous avez l'impression d'être loin, tout en étant à 15 minutes de paris ouest. Ses différentes granges rendront votre événement convivial et décontracté avec tout le confort moderne nécessaire. Nos 10 alpagas sauront vous accueillir chaleureusement!\n\n--- Transports ---\nAéroport : orly\nGare : versailles",
    "resume": "Bienvenue à la Ferme du Prieuré, un lieu d'exception situé au cœur de la nature, à Rennemoulin dans les Yvelines.\n\nNotre ferme est l'endroit idéal pour organiser des séminaires au vert, dans un cadre",
    "capacite": 200,
    "chambres": 4,
    "chambresSingle": null,
    "chambresTwin": 3,
    "sallesReunion": 4,
    "parking": null,
    "equipements": [],
    "services": [],
    "atouts": [],
    "salles": [],
    "photos": [
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cdb4016ioan8ioahcyqt/156e12e7-be49-4471-b63d-7f2c9ed111d5.webp",
        "legende": "1643296952",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cdb4016ioan8ioahcyqt/0f126cd9-7f81-4e50-bb63-9bc497b085ec.webp",
        "legende": "1643298841",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cdb4016ioan8ioahcyqt/438bbf42-348c-4a68-8fad-ffcfadfc5416.webp",
        "legende": "Ferme du Prieuré",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cdb4016ioan8ioahcyqt/912dc6a5-e49f-4e81-a7f6-8d783aadafc5.webp",
        "legende": "1643297308",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cdb4016ioan8ioahcyqt/336c2114-bc96-4444-ac5f-0dfecc0628b0.webp",
        "legende": "1553090180",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cdb4016ioan8ioahcyqt/7666ceea-f775-4903-a012-710c34af5c16.webp",
        "legende": "1643297146",
        "categorie": "autre"
      }
    ]
  },
  {
    "id": "cmle4cyj503k0oan894h9k8hh",
    "slug": "domaine-de-la-roche-couloir-chevreuse",
    "nom": "Domaine de la Roche Couloir",
    "categorie": "Château & domaine",
    "ville": "Chevreuse",
    "codePostal": "78460",
    "departementCode": "78",
    "departement": "Yvelines",
    "region": "Île-de-France",
    "adresse": "35 ter Route de la Brosse, 78460 Chevreuse",
    "latitude": 48.7191203,
    "longitude": 2.0233579,
    "description": "Niché au cœur de 35 hectares de forêt en vallée de Chevreuse, le Domaine de la Roche Couloir est un lieu événementiel premium alliant architecture de montagne et nature. Conçu par les architectes d'Avoriaz, ce pavillon de chasse unique propose des espaces intérieurs panoramiques et extérieurs exceptionnels pour séminaires, réceptions et mariages. Avec sa salle de 140 m², son dôme architectural unique en Europe et sa terrasse de 180 m², le domaine accueille jusqu'à 200 personnes en cocktail. À seulement 30 minutes de Paris, c'est le cadre idéal pour des événements professionnels déconnectés en pleine nature.",
    "resume": "Domaine événementiel haut de gamme en forêt - 35 hectares, salle 140m², dôme unique, 200 pers. - 30 min Paris",
    "capacite": 200,
    "chambres": 4,
    "chambresSingle": null,
    "chambresTwin": null,
    "sallesReunion": 2,
    "parking": 40,
    "equipements": [],
    "services": [],
    "atouts": [
      "Espace extérieur",
      "Parc / jardin",
      "Wi-Fi",
      "Équipement audiovisuel",
      "Accès PMR"
    ],
    "salles": [],
    "photos": [
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cyj503k0oan894h9k8hh/80b152df-2cc4-4867-869e-e681c14115a5.webp",
        "legende": null,
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cyj503k0oan894h9k8hh/51daacf7-751f-40a8-ab15-7a86c5189ead.webp",
        "legende": "Domaine de la Roche Couloir proche de Paris",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cyj503k0oan894h9k8hh/72f08cab-9d82-432f-aefc-d0ce8527a459.webp",
        "legende": null,
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cyj503k0oan894h9k8hh/de08423a-3ab3-4062-a684-caf7c8c0728c.webp",
        "legende": "Dîner dans la forêt",
        "categorie": "restauration"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cyj503k0oan894h9k8hh/0b7fa271-4dab-4bd8-af3e-d30f76680698.webp",
        "legende": "Le Pavillon",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cyj503k0oan894h9k8hh/4e031d2b-7bdf-432b-8198-c2ba2e96793d.webp",
        "legende": "Le Pavillon",
        "categorie": "autre"
      }
    ]
  },
  {
    "id": "cmle4d1o003x7oan8q72m6qpt",
    "slug": "golf-de-la-vaucouleurs-civry-la-foret",
    "nom": "Golf de la Vaucouleurs",
    "categorie": "Hôtel",
    "ville": "Civry-la-Forêt",
    "codePostal": "78910",
    "departementCode": "78",
    "departement": "Yvelines",
    "region": "Île-de-France",
    "adresse": "709 Rue de l'Église, 78910 Civry-la-Forêt, France",
    "latitude": 48.876035,
    "longitude": 1.622716,
    "description": "Bienvenue au Golf de La Vaucouleurs !\nSitué à Civry-la-Forêt, dans le département 78 à proximité de Paris, notre établissement est le lieu idéal pour allier détente, travail et loisirs. Que vous soyez à la recherche d'une salle de réunion, d'une salle de conférence, d'un lieu de formation ou d'une location de salle, notre golf répondra à tous vos besoins.\n\nNos installations comprennent deux parcours de 18 trous et un parcours compact de 9 trous, ainsi qu'une zone d'entraînement dédiée au putting et au chipping, et un practice pour perfectionner votre swing. Mais ce n'est pas tout ! Nous mettons également à votre disposition des espaces dédiés à vos événements professionnels.\n\nPour vos réunions d'envergure, notre salle plénière de 290 m2 est entièrement équipée et peut être modulée selon vos souhaits. Vous trouverez également deux salles de sous-commissions pour des groupes plus restreints. Quelle que soit la configuration choisie, nous avons les équipements nécessaires pour garantir le bon déroulement de votre séminaire.\n\nQue vous ayez besoin d'accueillir 10 personnes ou 180 personnes assises, voire jusqu'à 300 personnes en cocktail, nous avons l'espace adapté à votre événement. Notre équipe dédiée se tient à votre disposition pour vous accompagner dans l'organisation de votre projet.\n\nEn plus de nos installations professionnelles, nous proposons des initiations gratuites pour ceux qui souhaitent découvrir les plaisirs du golf. Profitez de cette occasion pour renforcer les liens au sein de votre équipe lors d'une session de team building originale et conviviale.\n\nVenez profiter de notre environnement exceptionnel, conjuguant nature et calme, tout en bénéficiant d'un accès facile depuis Paris. Notre golf de La Vaucouleurs est la destination idéale pour allier travail, détente et plaisir.\n\nContactez nous dès maintenant pour réserver votre salle de réunion ou pour obtenir plus d'informations sur nos services de location de salle et d'organisation d'événements. Nous nous ferons un plaisir de vous accueillir et de vous aider à faire de votre événement un succès.\n\n--- Transports ---\nAéroport : L'Aéroport le plus proche du Golf de La Vaucouleurs est l'Aéroport de Paris-Charles de Gaulle (CDG). Il est situé à environ 57 km de distance, ce qui représente environ 1 heure de trajet en voiture en fonction du trafic.\nGare : En ce qui concerne les gares et les stations de métro, voici les informations importantes :  Gare la plus proche : Gare de Plaisir-Grignon Elle se trouve à environ 6 km du Golf de La Vaucouleurs, soit environ 10 minutes en voiture. Depuis la gare de Plaisir-Grignon, vous pouvez prendre un taxi ou utiliser les services de transport en commun pour rejoindre le golf.\nMétro : Métro le plus proche : Station Pont de Sèvres (ligne 9) La station de métro Pont de Sèvres est située à environ 30 km du Golf de La Vaucouleurs, soit environ 40 minutes en voiture. À partir de cette station, vous pouvez également prendre un taxi ou utiliser les autres moyens de transport disponibles pour vous rendre au golf.",
    "resume": "Cher client,\nJe suis ravie de vous présenter le Golf de La Vaucouleurs, un lieu exceptionnel pour vos séminaires et événements professionnels. Laissez-moi vous guider à travers les différentes possibi",
    "capacite": 180,
    "chambres": null,
    "chambresSingle": null,
    "chambresTwin": null,
    "sallesReunion": 2,
    "parking": null,
    "equipements": [
      "Baby-foot",
      "Vidéoprojecteur",
      "Wifi",
      "Jardin/Parc"
    ],
    "services": [],
    "atouts": [],
    "salles": [],
    "photos": [
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4d1o003x7oan8q72m6qpt/8e98520d-afea-4783-949f-09e4a99f7dd7.webp",
        "legende": "Ville de Vaucouleurs",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4d1o003x7oan8q72m6qpt/79f7b6f5-41a1-483b-a9e8-d30e404e22fd.webp",
        "legende": "Ville de Vaucouleurs",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4d1o003x7oan8q72m6qpt/4f8dd0ac-0b2a-402d-98b0-84b4c4f2538a.webp",
        "legende": "Ville de Vaucouleurs",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4d1o003x7oan8q72m6qpt/c76592ee-7b26-4401-baa0-6e0548c126a9.webp",
        "legende": "Ville de Vaucouleurs",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4d1o003x7oan8q72m6qpt/aa616eb8-9423-439c-bedd-a8e128650afe.webp",
        "legende": "Ville de Vaucouleurs",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4d1o003x7oan8q72m6qpt/6d6a219d-eab9-4556-8639-6a1804e57557.webp",
        "legende": "Ville de Vaucouleurs",
        "categorie": "autre"
      }
    ]
  },
  {
    "id": "cmle4d2zu042poan87xh8a2gl",
    "slug": "la-ferme-de-la-faisanderie-villepreux",
    "nom": "La Ferme de la Faisanderie",
    "categorie": "Château & domaine",
    "ville": "Villepreux",
    "codePostal": "78450",
    "departementCode": "78",
    "departement": "Yvelines",
    "region": "Île-de-France",
    "adresse": "Rte de Rennemoulin, 78450 Villepreux, France",
    "latitude": 48.8359099,
    "longitude": 2.0250827,
    "description": "La Ferme de la Faisanderie vous accueille dans la plaine de Versailles. Ancienne ferme royale, ses espaces ont été rénovés pour vous offrir tout le confort moderne, en gardant son charme d'antan, son bois patiné, ses pierres et poutres anciennes. 3 granges sont à votre disposition dont 2 face à nos champs bio. Déconnexion assurée! Et nos 2 ânes nains et 2 chèvres assureront le divertissement.\n\n--- Transports ---\nAéroport : orly\nGare : villepreux",
    "resume": "LA FERME DE LA FAISANDERIE - Un cadre authentique pour vos événements professionnels au cœur de la nature !\n\nNichée dans un écrin de verdure à l'adresse Rte de Rennemoulin, 78450 Villepreux, France, L",
    "capacite": 160,
    "chambres": 0,
    "chambresSingle": null,
    "chambresTwin": 0,
    "sallesReunion": 3,
    "parking": null,
    "equipements": [
      "Jardin/Parc",
      "Terrasse/Cour intérieure",
      "Accès PMR",
      "Amphithéâtre",
      "Blocs-notes & Stylo",
      "Wifi",
      "Vidéoprojecteur",
      "Equipement son"
    ],
    "services": [
      "Salle de réception",
      "Espace événementiel",
      "Restauration possible"
    ],
    "atouts": [
      "Espace extérieur",
      "Parc / jardin"
    ],
    "salles": [
      {
        "nom": "La grange ouverte",
        "surface": 160,
        "theatre": 160,
        "u": null,
        "banquet": null,
        "cocktail": null
      }
    ],
    "photos": [
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4d2zu042poan87xh8a2gl/53533d1b-b2fb-4bd4-a42a-5efe54e6d66e.webp",
        "legende": "Ferme de la Faisanderie",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4d2zu042poan87xh8a2gl/81817d79-ce7d-45a6-a096-66fffee0f973.webp",
        "legende": "Ferme de la Faisanderie",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4d2zu042poan87xh8a2gl/5fd31679-b2bc-49ac-822d-3ed185c05cab.webp",
        "legende": "Ferme de la Faisanderie",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4d2zu042poan87xh8a2gl/2998535b-42dc-4be0-ac9b-9951e522e9f5.webp",
        "legende": "Ferme de la Faisanderie",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4d2zu042poan87xh8a2gl/a96bf7f5-4587-4010-ad3e-c212eac0d316.webp",
        "legende": "Ferme de la Faisanderie",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4d2zu042poan87xh8a2gl/17178555-a978-43d0-8873-5a7daaaee3c3.webp",
        "legende": "Ferme de la Faisanderie",
        "categorie": "autre"
      }
    ]
  },
  {
    "id": "cmle4cpub02lsoan8h4zkrpjv",
    "slug": "cazaudehore-saint-germain-en-laye",
    "nom": "Cazaudehore",
    "categorie": "Château & domaine",
    "ville": "Saint-Germain-en-Laye",
    "codePostal": "78100",
    "departementCode": "78",
    "departement": "Yvelines",
    "region": "Île-de-France",
    "adresse": "1 Avenue du Président John Fitzgerald Kennedy, 78100 Saint-Germain-en-Laye",
    "latitude": 48.9136406,
    "longitude": 2.0833392,
    "description": "Cazaudehore est un établissement d'exception niché au cœur de la forêt domaniale de Saint-Germain-en-Laye, à seulement 30 minutes de Paris. Depuis 1928, cet hôtel de charme 4 étoiles accueille mariages, séminaires, réceptions et événements d'entreprise dans un cadre raffiné mêlant nature, élégance et gastronomie. Doté de 30 chambres, d'un restaurant gastronomique dirigé par le chef Grégory Balland, de salles de réunion lumineuses et d'un hectare de parc privé, Cazaudehore offre des prestations sur mesure pour tous les types d'événements professionnels et privés.",
    "resume": "Hôtel de charme 4 étoiles avec restaurant gastronomique, séminaires et réceptions en forêt à 30 min de Paris",
    "capacite": 160,
    "chambres": 30,
    "chambresSingle": null,
    "chambresTwin": 10,
    "sallesReunion": 7,
    "parking": 90,
    "equipements": [
      "Terrain de pétanque",
      "Jardin/Parc",
      "Terrasse/Cour intérieure",
      "Wifi",
      "Parking",
      "Vidéoprojecteur",
      "Lumière du jour",
      "Accès PMR",
      "Spa",
      "Salle de fitness"
    ],
    "services": [],
    "atouts": [
      "Espace extérieur",
      "Parc / jardin",
      "Wi-Fi",
      "Équipement audiovisuel"
    ],
    "salles": [],
    "photos": [
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cpub02lsoan8h4zkrpjv/713a6cdc-6eb4-41fd-86fe-264c1c437e03.webp",
        "legende": "Le jardin de l'hôtel Cazaudehore",
        "categorie": "extérieur"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cpub02lsoan8h4zkrpjv/53fe5317-ede6-4e05-a010-41895901637e.webp",
        "legende": "Le jardin vu d'une chambre",
        "categorie": "chambre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cpub02lsoan8h4zkrpjv/990998cf-efb7-4119-b178-ca7c484ce1fc.webp",
        "legende": "L'arrivée sur la terrasse du restaurant",
        "categorie": "restauration"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cpub02lsoan8h4zkrpjv/b44c05db-dd6c-47e2-9602-0002e467ae92.webp",
        "legende": "Un déjeuner en terrasse",
        "categorie": "restauration"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cpub02lsoan8h4zkrpjv/99803068-2000-486f-a114-72567620e186.webp",
        "legende": "La terrasse du restaurant",
        "categorie": "restauration"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cpub02lsoan8h4zkrpjv/a119a2ef-2284-4f14-8604-450d329c21ef.webp",
        "legende": "La véranda du restaurant",
        "categorie": "restauration"
      }
    ]
  },
  {
    "id": "cmle4d2qe041moan8g9ru8oxa",
    "slug": "chateau-de-villiers-le-mahieu-villiers-le-mahieu",
    "nom": "Chateau de Villiers-le-Mahieu",
    "categorie": "Château & domaine",
    "ville": "Villiers-le-Mahieu",
    "codePostal": "78770",
    "departementCode": "78",
    "departement": "Yvelines",
    "region": "Île-de-France",
    "adresse": "Rue du Centre, 78770 Villiers-le-Mahieu, France",
    "latitude": 48.860479,
    "longitude": 1.771847,
    "description": "Château de Villiers-le-Mahieu est un établissement événementiel d'exception situé à 45 minutes de Paris, au cœur d'un domaine de 12 hectares arboré. Ce château du 13e siècle, magnifiquement restauré et modernisé, offre un cadre poétique et serein pour vos séminaires, réceptions et événements professionnels. Avec 98 chambres, 14 salles de réunion équipées, un spa Nuxe de 700 m², des piscines intérieure et extérieure, et une gastronomie généreuse tout compris, il combine histoire et modernité pour des événements inoubliables.",
    "resume": "Château événementiel 4-étoiles avec 98 chambres, 14 salles, spa, piscines et parc 12 ha à 45 min de Paris",
    "capacite": 150,
    "chambres": 98,
    "chambresSingle": null,
    "chambresTwin": 75,
    "sallesReunion": 14,
    "parking": null,
    "equipements": [
      "Piscine intérieure",
      "Salle de fitness",
      "Terrain de football",
      "Accès PMR",
      "Blocs-notes & Stylo",
      "Wifi",
      "Vidéoprojecteur",
      "Equipement son",
      "Paperboard",
      "Piscine extérieure",
      "Terrain de tennis",
      "Terrain de pétanque",
      "Jardin/Parc",
      "Amphithéâtre",
      "Parking"
    ],
    "services": [],
    "atouts": [
      "Espace extérieur",
      "Parc / jardin",
      "Piscine",
      "Wi-Fi",
      "Équipement audiovisuel",
      "Accès PMR"
    ],
    "salles": [],
    "photos": [
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4d2qe041moan8g9ru8oxa/b3e45499-93be-4b82-8b0e-12947e410e29.webp",
        "legende": "Les Maisons de Campagne - Château de Villiers-le-Mahieu",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4d2qe041moan8g9ru8oxa/05051c9c-6db3-49d3-9dee-4597132f962a.webp",
        "legende": "Chambre",
        "categorie": "chambre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4d2qe041moan8g9ru8oxa/3573d211-a697-4e90-8620-72945d4e4fcc.webp",
        "legende": "Les Poètes",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4d2qe041moan8g9ru8oxa/8dabb7b6-73d1-4393-999a-9e0006dfea3f.webp",
        "legende": "La piscine du SPA ",
        "categorie": "bien-être"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4d2qe041moan8g9ru8oxa/0d10c4b1-3dff-42b2-9fab-de70bbdace0f.webp",
        "legende": "Les Inventeurs",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4d2qe041moan8g9ru8oxa/da08b409-20f6-42fc-a819-8d80f7b0fb70.webp",
        "legende": "Les Bons Vivants",
        "categorie": "autre"
      }
    ]
  },
  {
    "id": "cmle4co6t02fboan8r7f9xkvo",
    "slug": "chateau-des-mesnuls-chateauform-les-mesnuls",
    "nom": "Château des Mesnuls (châteauform')",
    "categorie": "Château & domaine",
    "ville": "Les Mesnuls",
    "codePostal": "78490",
    "departementCode": "78",
    "departement": "Yvelines",
    "region": "Île-de-France",
    "adresse": "Grande Rue, 78490 Les Mesnuls, France",
    "latitude": 48.7538784,
    "longitude": 1.8321215,
    "description": "Le Château des Mesnuls, domaine Châteauform', offre une capacité de 150 personnes, 16 salles de travail et 55 chambres luxueuses. Les espaces de travail sont modulables et ouverts sur la nature, avec des configurations variées : îlots de discussion, conférence, classe ou sur-mesure. Un régisseur sur place accompagne chaque événement. Les loisirs incluent piscine extérieure chauffée (avril à octobre), badminton, ping-pong, pétanque, VTT, tennis, hammam, sauna, salle de fitness, billard et baby-foot. Situé à 45 min d'Orly et 1h de Roissy.",
    "resume": "Domaine Châteauform' historique aux Mesnuls, avec 55 chambres, 16 salles de réunion jusqu'à 150 personnes, piscine chauffée, spa et nombreuses activités sportives, à 45 min d'Orly.",
    "capacite": 150,
    "chambres": 55,
    "chambresSingle": null,
    "chambresTwin": 50,
    "sallesReunion": 16,
    "parking": null,
    "equipements": [
      "Wifi",
      "Sonorisation",
      "Vidéoprojecteur",
      "Baby-foot",
      "Billard",
      "Lumière du jour",
      "Parking",
      "Jardin/Parc",
      "Salle de fitness",
      "Terrasse/Cour intérieure",
      "Terrain de pétanque",
      "Terrain de football",
      "Terrain de tennis",
      "Piscine chauffée",
      "Spa",
      "Accès PMR"
    ],
    "services": [],
    "atouts": [],
    "salles": [],
    "photos": [
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4co6t02fboan8r7f9xkvo/bea6c24b-254c-4cbc-97f5-0c343645830d.webp",
        "legende": null,
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4co6t02fboan8r7f9xkvo/65f13463-9c6e-4ac9-bb23-ff497bcc88d6.webp",
        "legende": null,
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4co6t02fboan8r7f9xkvo/fe9ba687-1d6c-4675-b842-171a18186ea6.webp",
        "legende": null,
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4co6t02fboan8r7f9xkvo/2c37a625-9894-4b14-8d4d-9e247415368d.webp",
        "legende": null,
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4co6t02fboan8r7f9xkvo/d6e6b53a-7976-4266-be08-c13d5d2abf08.webp",
        "legende": null,
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4co6t02fboan8r7f9xkvo/e13f213f-7fcc-4d5f-98b3-56c5332aa4a5.webp",
        "legende": null,
        "categorie": "autre"
      }
    ]
  },
  {
    "id": "cmle4cw2x039toan8o6voogo9",
    "slug": "ak-bowling-maurepas",
    "nom": "Ak Bowling",
    "categorie": "Lieu atypique",
    "ville": "Maurepas",
    "codePostal": "78310",
    "departementCode": "78",
    "departement": "Yvelines",
    "region": "Île-de-France",
    "adresse": "3 Av. Louis Pasteur, 78310 Maurepas, France",
    "latitude": 48.7613629,
    "longitude": 1.9138969,
    "description": "Bienvenue chez AK Bowling à Maurepas !\n\nNotre établissement propose une expérience de divertissement complète sur une superficie de 2300 m2. Doté de 20 pistes de bowling modernes et de 25 tables de billard, AK Bowling est l'endroit idéal pour passer du bon temps entre collègues, amis ou en famille.\n\nEn plus de nos installations de bowling et de billard, nous offrons également des espaces dédiés aux événements professionnels. Que vous recherchiez une salle de réunion, des salles de conférence, un lieu pour des activités de team building ou un espace de formation, nous sommes là pour répondre à vos besoins.\n\nNos installations comprennent des salles de réunion et de conférence adaptées à différentes tailles de groupes. Que vous organisiez une petite réunion d'équipe ou une conférence d'entreprise plus importante, nous pouvons vous proposer des espaces appropriés. De plus, notre équipe se tient à votre disposition pour vous fournir tout l'équipement audiovisuel nécessaire, y compris des écrans géants de 4x3m et des micros.\n\nPour les événements d'entreprise qui nécessitent un espace plus vaste, nous offrons la possibilité de privatiser partiellement ou totalement notre établissement. Avec une capacité de 350 places assises, notre bar est un lieu convivial et confortable pour accueillir vos invités. Vous pouvez également profiter de notre piste de danse pour animer vos soirées d'entreprise.\n\nNous proposons également des formules bowling + buffet, idéales pour combiner divertissement et restauration lors de vos événements. Que ce soit pour une réunion informelle avec des collègues ou pour un événement de team building, nos formules flexibles s'adaptent à vos besoins.\n\nLa location de salle chez AK Bowling vous offre un cadre unique pour vos événements professionnels. Notre équipe expérimentée est à votre disposition pour vous aider à organiser et à coordonner tous les détails afin de garantir la réussite de votre événement.\n\nN'hésitez pas à nous contacter pour réserver notre espace de bowling ou pour obtenir plus d'informations sur nos services de location de salle. Nous sommes situés au 3 Avenue Louis Pasteur, 78310 Maurepas, en France.\n\nOffrez à vos invités une expérience divertissante et mémorable dans un cadre moderne et convivial chez AK Bowling.\n\n--- Transports ---\nAéroport : L'aéroport le plus proche d'AK Bowling à Maurepas est l'aéroport de Paris-Orly (ORY). Il se trouve à environ 47 kilomètres du lieu, soit environ 45 minutes de trajet en voiture.\nGare : Pour les transports en train, la gare la plus proche d'AK Bowling est la gare de La Verrière. Elle est desservie par des trains régionaux depuis la gare de Paris-Montparnasse. Le trajet en train dure environ 30 minutes. Une fois arrivé à la gare de La Verrière, vous pouvez prendre un taxi ou un moyen de transport local pour vous rendre à AK Bowling.\nMétro : En ce qui concerne le métro, la station de métro la plus proche d'AK Bowling est la station de métro Maurepas - Coignières. Elle est située sur la ligne 10 du métro parisien. Depuis la station Maurepas - Coignières, vous pouvez prendre un taxi ou un moyen de transport local pour rejoindre AK Bowling.",
    "resume": "Découvrez AK Bowling, un lieu unique pour vos événements professionnels à Maurepas. Que vous recherchiez une salle de réunion, des salles de conférence, un lieu pour des activités de team building ou",
    "capacite": 100,
    "chambres": null,
    "chambresSingle": null,
    "chambresTwin": null,
    "sallesReunion": 1,
    "parking": null,
    "equipements": [
      "Billard",
      "Parking",
      "Sonorisation",
      "Vidéoprojecteur"
    ],
    "services": [],
    "atouts": [],
    "salles": [],
    "photos": [
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cw2x039toan8o6voogo9/7dd24d40-417a-4844-ad1f-3532bc6fd3ca.webp",
        "legende": null,
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cw2x039toan8o6voogo9/57e0277c-e75b-43f1-8c63-51a4a7780823.webp",
        "legende": null,
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cw2x039toan8o6voogo9/5854b1cd-bde2-4b46-af95-992589eeb707.webp",
        "legende": null,
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cw2x039toan8o6voogo9/8c1c6888-5007-4784-bee4-7d5d9634c7aa.webp",
        "legende": null,
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cw2x039toan8o6voogo9/8cf784a7-184e-4f6f-b847-9a6dd44264fd.webp",
        "legende": null,
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cw2x039toan8o6voogo9/e2203bd0-95f6-4aaf-96d7-89c4f1cc2ded.webp",
        "legende": null,
        "categorie": "autre"
      }
    ]
  },
  {
    "id": "cmle4d21203ypoan8x5tqij69",
    "slug": "le-barn-hotel-bonnelles",
    "nom": "Le Barn Hotel",
    "categorie": "Hôtel",
    "ville": "Bonnelles",
    "codePostal": "78830",
    "departementCode": "78",
    "departement": "Yvelines",
    "region": "Île-de-France",
    "adresse": "Le Moulin de Brétigny, 78830 Bonnelles, France",
    "latitude": 48.602085,
    "longitude": 2.0118744,
    "description": "Au cœur de la forêt de Rambouillet, à seulement 45 minutes de Paris, ce lieu se transforme instantanément en pays enchanté pour les flâneurs, amateurs de champignons, randonneurs, cavaliers ou cyclistes. Chacun y vit à son propre rythme. En fonction de ses envies, du temps, des rencontres ou de la saison. Pour mettre ses idées au clair, faire un lancement de produit, présenter les chiffres de l’année ou pour profiter tout simplement.   Le Barn est un lieu unique dans une nature propice à la concentration et à la réflexion, parfait pour un séminaire d’entreprise original et inoubliable. La nature à perte de vue, le calme et de bons moments à partager. Au Barn, chacun peut vivre à sa manière. Entre deux réunions, le temps d’une pause, découvrez l’ensemble de nos activités en libre accès ou sur mesure. Qu’elles soient sportives, ludiques ou relaxantes, chacun y trouvera forcément son bonheur.   Retrouvez notre plaquette activités en pièce jointe. \n\n--- Transports ---\nAéroport : Orly\nGare : Rambouillet\nMétro : nc",
    "resume": "Cher client,\n\nBienvenue au Barn Hotel, un véritable havre de paix situé au cœur des Yvelines, en France. Niché dans un cadre enchanteur, notre domaine vous offre une expérience unique, alliant charme",
    "capacite": 100,
    "chambres": 72,
    "chambresSingle": null,
    "chambresTwin": 30,
    "sallesReunion": 5,
    "parking": null,
    "equipements": [
      "Accessibilité PMR",
      "Ascenseur",
      "Baby-foot",
      "Bagagerie",
      "Bar / Lounge",
      "Borne de recharge électrique",
      "Centre de bien-être",
      "Espace barbecue",
      "Espace coworking",
      "Hammam",
      "Location de vélos",
      "Massages / soins",
      "Micros / Sonorisation",
      "Minibar",
      "Navette / Transfert gare ou aéroport",
      "Paperboard",
      "Parking privé",
      "Ping-pong",
      "Restaurant sur place",
      "Room service",
      "Réception 24h/24",
      "Salle de conférence",
      "Salle de réunion",
      "Sauna",
      "Spa",
      "Système de visioconférence",
      "Terrain de pétanque",
      "Terrasse",
      "Terrasse extérieure pour repas",
      "Télévision",
      "Vidéoprojecteur",
      "Wifi haut débit",
      "Écran"
    ],
    "services": [],
    "atouts": [],
    "salles": [],
    "photos": [
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4d21203ypoan8x5tqij69/7147e626-af23-4a4d-87fb-f9f644269cb2.webp",
        "legende": "Extérieurs",
        "categorie": "extérieur"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4d21203ypoan8x5tqij69/4a3430fc-2c30-4179-882a-3cc89ac85eb7.webp",
        "legende": "Salle de réunion Lewis ",
        "categorie": "salle"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4d21203ypoan8x5tqij69/98207a9a-f71d-4f41-834a-24662e272603.webp",
        "legende": "Salle de réunion Lewis ",
        "categorie": "salle"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4d21203ypoan8x5tqij69/7270ac0f-6b21-4b3a-97d2-435bb0fcd686.webp",
        "legende": "Cour de l'hôtel ",
        "categorie": "extérieur"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4d21203ypoan8x5tqij69/014ca9ef-43ca-4f40-b2d7-baf9d9ffefad.webp",
        "legende": "Salle de réunion La Suite Barn ",
        "categorie": "chambre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4d21203ypoan8x5tqij69/1a9df4d2-4b6d-4ab3-852d-130f4a563baa.webp",
        "legende": "Salle de réunion La Suite Moulin",
        "categorie": "chambre"
      }
    ]
  },
  {
    "id": "cmle4c3fq002koan8zb1mcmtk",
    "slug": "hotel-inn-design-paris-st-quentin-en-yvelines-montigny-le-bretonneux",
    "nom": "Hôtel Inn Design Paris St Quentin en Yvelines",
    "categorie": "Hôtel",
    "ville": "Montigny-le-Bretonneux",
    "codePostal": "78390",
    "departementCode": "78",
    "departement": "Yvelines",
    "region": "Île-de-France",
    "adresse": "3 Rue Jean Pierre Timbaud, 78390 Montigny-le-Bretonneux, France",
    "latitude": 48.7927993,
    "longitude": 2.0355158,
    "description": "Niché au cœur de Montigny-le-Bretonneux, dans le département des Yvelines, le BEST WESTERN PARIS ST QUENTIN EN YVELINES offre un cadre idéal pour vos séminaires d'entreprise. Cette région est riche en histoire avec des monuments historiques tels que le Château de Versailles à proximité, et une multitude d'activités touristiques à découvrir.\n\nCet hôtel moderne dispose de 81 chambres confortables, dont 20 sont des chambres twin, parfaites pour vos collaborateurs. Il propose également 4 salles de réunion, la plus grande pouvant accueillir jusqu'à 150 personnes pour des conférences ou des ateliers. 📊👥\n\nSitué en ville, cet établissement est à quelques pas de la forêt de Rambouillet, offrant ainsi un mélange parfait entre la vie urbaine et la nature. Les activités autour du lieu incluent le golf, la randonnée et le vélo. 🚴‍♀️🏌️‍♂️\n\nSur place, vous pourrez bénéficier d'une salle de fitness, d'un bar et d'un restaurant pour vos pauses détente. Malheureusement, l'hôtel ne dispose pas de piscine ou de spa.\n\n--- Transports ---\nAéroport : Aéroport de Paris-Orly, à environ 45 minutes de route.\nGare : Gare de Saint-Quentin-en-Yvelines, à 10 minutes de route.\nMétro : Il n'y a pas de métro à proximité, cependant, l'hôtel est desservi par plusieurs lignes de bus.",
    "resume": "Chers Clients,\nNous vous recommandons chaleureusement le BEST WESTERN PARIS ST QUENTIN EN YVELINES pour vos prochains séminaires. Cet hôtel allie confort, modernité et praticité, le tout dans un cadre",
    "capacite": 100,
    "chambres": 81,
    "chambresSingle": null,
    "chambresTwin": 30,
    "sallesReunion": 4,
    "parking": null,
    "equipements": [
      "Salle de fitness"
    ],
    "services": [],
    "atouts": [],
    "salles": [],
    "photos": [
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4c3fq002koan8zb1mcmtk/71fda328-c270-41f8-b855-49f6c400c81e.webp",
        "legende": "Promo été avec le code promo HID2026",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4c3fq002koan8zb1mcmtk/3705eff9-34e1-497a-b17e-57613a459575.webp",
        "legende": "Promo été avec le code promo HID2026",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4c3fq002koan8zb1mcmtk/ca7d02ea-482f-4ba5-9f99-ab998a9c9458.webp",
        "legende": "Chambre standard avec un lit double pour 2 personnes dans l",
        "categorie": "chambre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4c3fq002koan8zb1mcmtk/acaca0da-f0fa-4129-87cf-56cc74cdda91.webp",
        "legende": "Chambre lits simples avec WiFi gratuit illimité, et coin bureau",
        "categorie": "chambre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4c3fq002koan8zb1mcmtk/b43bc98b-cbd4-4c33-9f46-556540c871a7.webp",
        "legende": "Chambre supérieure",
        "categorie": "chambre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4c3fq002koan8zb1mcmtk/dbc8cd44-c7dc-4ec3-a279-a6907d5b1b19.webp",
        "legende": "espace bureau dans les chambres",
        "categorie": "bien-être"
      }
    ]
  },
  {
    "id": "cmle4c9vc00ukoan822qx7car",
    "slug": "centre-port-royal-saint-lambert",
    "nom": "Centre Port Royal",
    "categorie": "Château & domaine",
    "ville": "Saint-Lambert",
    "codePostal": "78470",
    "departementCode": "78",
    "departement": "Yvelines",
    "region": "Île-de-France",
    "adresse": "7 Chem. du Charme et du Carrosse, 78470 Saint-Lambert, France",
    "latitude": 48.728214,
    "longitude": 2.017526,
    "description": "A 40 minutes de Paris, dans les Yvelines, au cœur de la Vallée de Chevreuse, le CENTRE PORT ROYAL vous offre un cadre exceptionnel pour l’organisation de vos réunions de travail, journées d'étude, séminaires résidentiels, team building, déjeuners d'affaire, ou événements familiaux. Événements adaptés pour ce lieu Pour que vous puissiez travailler dans de parfaites conditions et que vous passiez un agréable séjour, le Centre Port Royal a été entièrement rénové dans une démarche de développement durable et de mise en valeur de son cadre naturel. Un site à l'écart, au vert, calme et convivial. Avantages compétitifs La réservation inclut les salles de réunion toutes équipées, les pauses gourmandes, les repas, les chambres, les équipements de loisirs et de détente (salle de jeux, parc sportif, VTT…) : 10 salles de réunions d’une capacité de 5 à 100 personnes, 55 chambres calmes et confortables avec vue sur la forêt, un restaurant ouvert sur le parc pouvant accueillir jusqu'à 130 personnes, un bar, une terrasse, des espaces pour team building, connexion fibre optique et réseau wifi. \n\n--- Transports ---\nAéroport : Orly\nGare : St rémy les chevreuse RER B",
    "resume": null,
    "capacite": 100,
    "chambres": 55,
    "chambresSingle": null,
    "chambresTwin": 15,
    "sallesReunion": 10,
    "parking": null,
    "equipements": [
      "Accessibilité PMR",
      "Salle de réunion",
      "Salle de jeux",
      "Terrain de pétanque",
      "Terrain de football",
      "Terrain de tennis",
      "Salle de conférence",
      "Restaurant sur place",
      "Ping-pong",
      "Billard",
      "Baby-foot",
      "Lumière du jour (dans salles)",
      "Location de vélos",
      "Espace barbecue",
      "Jardin / Parc arboré",
      "Climatisation",
      "Borne de recharge électrique",
      "Ascenseur",
      "Télévision",
      "Vidéoprojecteur",
      "Wifi haut débit",
      "Terrasse",
      "Terrasse extérieure pour repas",
      "Bar / Lounge",
      "Bagagerie",
      "Lit king-size",
      "Micros / Sonorisation",
      "Paperboard",
      "Parking privé",
      "Réception 24h/24",
      "Système de visioconférence",
      "Écran"
    ],
    "services": [],
    "atouts": [],
    "salles": [],
    "photos": [
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4c9vc00ukoan822qx7car/6e621ee0-40ac-4077-b2eb-7f655d90752e.webp",
        "legende": "Centre Port Royal",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4c9vc00ukoan822qx7car/4bb4a970-79e5-47f5-bdb9-2756d7776ac5.webp",
        "legende": "Bar",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4c9vc00ukoan822qx7car/6aae1341-e94e-4a21-8b79-7bb8cc1d15a4.webp",
        "legende": "Terrasse",
        "categorie": "extérieur"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4c9vc00ukoan822qx7car/2459ed3f-33ec-475c-ad64-c85960d09221.webp",
        "legende": "Salle d'Alzon",
        "categorie": "salle"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4c9vc00ukoan822qx7car/c921ba11-4323-43b1-8fff-3ac5887226cd.webp",
        "legende": "Salle Géhard",
        "categorie": "salle"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4c9vc00ukoan822qx7car/f3255710-2271-44b9-810f-520751603021.webp",
        "legende": "Salle  Racine",
        "categorie": "salle"
      }
    ]
  },
  {
    "id": "cmle4d7mf04s9oan81mfw75e5",
    "slug": "le-relais-de-voisins-voisins-le-bretonneux",
    "nom": "Le Relais de Voisins",
    "categorie": "Hôtel",
    "ville": "Voisins-le-Bretonneux",
    "codePostal": "78960",
    "departementCode": "78",
    "departement": "Yvelines",
    "region": "Île-de-France",
    "adresse": "Avenue du Grand Pré, 78960 Voisins-le-Bretonneux",
    "latitude": 48.7585656,
    "longitude": 2.0478155,
    "description": "Le Relais de Voisins est un hôtel-restaurant 3 étoiles de charme situé en bordure de la vallée de Chevreuse, offrant un cadre paisible idéal pour séminaires et événements d'entreprise. L'établissement dispose de 54 chambres confortables, de deux salles de réunion modulables pouvant accueillir jusqu'à 80 personnes, et d'un restaurant privatisable jusqu'à 90 personnes. Les équipes professionnelles bénéficient d'équipements modernes incluant wifi, vidéoprojecteurs et écrans, ainsi que d'un espace détente premium « Bulle de Soleil » regroupant spa, sauna et douches hydromassantes pour des pauses bien-être optimales.",
    "resume": "Hôtel-restaurant 3 étoiles avec salles de séminaire et spa à Voisins-le-Bretonneux, idéal pour événements professionnels en Île-de-France",
    "capacite": 90,
    "chambres": 54,
    "chambresSingle": null,
    "chambresTwin": null,
    "sallesReunion": 2,
    "parking": null,
    "equipements": [
      "Spa"
    ],
    "services": [],
    "atouts": [
      "Espace extérieur",
      "Parc / jardin",
      "Wi-Fi",
      "Équipement audiovisuel",
      "Accès PMR"
    ],
    "salles": [],
    "photos": [
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4d7mf04s9oan81mfw75e5/6bf0b5d2-cf4b-47c0-a231-0ce2db783fe2.webp",
        "legende": "Jardin Terrasse Hotel Le Relais de Voisins",
        "categorie": "extérieur"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4d7mf04s9oan81mfw75e5/c2d2c430-51ba-4f4d-b0e4-2bd9d330e32a.webp",
        "legende": "Chambre Hotel le Relais de Voisins",
        "categorie": "chambre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4d7mf04s9oan81mfw75e5/151f8ca8-627c-4370-8a61-14acbc7581d9.webp",
        "legende": "Restaurant Le Relais de Voisins",
        "categorie": "restauration"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4d7mf04s9oan81mfw75e5/a61fd52a-74ea-428a-9a1e-cfd88044d3fd.webp",
        "legende": "SPA Le Relais de Voisins",
        "categorie": "bien-être"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4d7mf04s9oan81mfw75e5/0107485e-a685-4150-9474-6163aebe04c7.webp",
        "legende": "Salle de séminaire Le Relais de Voisins",
        "categorie": "salle"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4d7mf04s9oan81mfw75e5/cbc56468-0031-4ac4-a425-fc8460aa5475.webp",
        "legende": "Mariages et réceptions Hotel Le Relais de Voisins",
        "categorie": "salle"
      }
    ]
  },
  {
    "id": "cmle4ctha02zqoan8pq7s6avt",
    "slug": "hotel-du-jeu-de-paume-versailles",
    "nom": "Hôtel du Jeu de Paume",
    "categorie": "Hôtel",
    "ville": "Versailles",
    "codePostal": "78000",
    "departementCode": "78",
    "departement": "Yvelines",
    "region": "Île-de-France",
    "adresse": "5 Bis Rue de Fontenay, 78000 Versailles, France",
    "latitude": 48.8013891,
    "longitude": 2.1241515,
    "description": "Bienvenue à La Maison du Jeu de Paume !\n\nNotre établissement est un véritable havre de chaleur et de convivialité, situé au cœur de Versailles, en France. Nous vous accueillons toute l'année dans une ambiance ultra chaleureuse, que ce soit dans notre jardin ensoleillé ou au coin du feu pendant les mois d'hiver.\n\nNotre équipe attentionnée est là pour prendre soin de vous et vous offrir une expérience inoubliable. Nous mettons tout en œuvre pour créer une atmosphère sur mesure, adaptée à vos réceptions, séminaires et réunions d'équipe.\n\nNotre emplacement privilégié au 5bis Rue de Fontenay vous permet de profiter pleinement de l'atmosphère unique de Versailles. Que vous soyez en visite dans la ville ou que vous souhaitiez organiser un événement professionnel, La Maison du Jeu de Paume est l'endroit idéal.\n\nNous vous proposons des espaces sur mesure, spécialement aménagés pour répondre à vos besoins. Que ce soit pour une réception intime, un séminaire d'entreprise ou une réunion d'équipe, nous nous assurons de créer l'environnement parfait pour votre événement.\n\nNotre équipe se fera un plaisir de vous accompagner tout au long de votre séjour. Nous mettons à votre disposition des équipements modernes et des services personnalisés pour garantir le bon déroulement de votre événement. Notre objectif est de vous offrir un cadre propice à la productivité, à l'échange et à la détente.\n\nQue vous choisissiez de profiter de notre jardin tout en savourant un délicieux repas en plein air ou que vous préfériez vous réunir autour d'un feu chaleureux à l'intérieur, nous nous assurons que votre expérience soit à la hauteur de vos attentes.\n\nN'hésitez pas à nous contacter dès maintenant pour réserver votre salle sur mesure à La Maison du Jeu de Paume. Nous sommes impatients de vous accueillir et de faire de votre événement un moment mémorable.\n\nBienvenue dans notre oasis de chaleur et de convivialité à Versailles !\n\n--- Transports ---\nAéroport : Orly\nGare : Versailles château Rive Gauche",
    "resume": "Cher client,\n\nJe suis ravie de vous présenter le lieu exceptionnel de La Maison du Jeu de Paume, qui est parfaitement adapté pour accueillir vos futurs séminaires. Situé au 5bis Rue de Fontenay à Vers",
    "capacite": 25,
    "chambres": 20,
    "chambresSingle": null,
    "chambresTwin": 3,
    "sallesReunion": 1,
    "parking": null,
    "equipements": [
      "Accès PMR",
      "Baby-foot",
      "Lumière du jour",
      "Sonorisation",
      "Vidéoprojecteur",
      "Wifi",
      "Jardin/Parc",
      "Terrasse/Cour intérieure"
    ],
    "services": [],
    "atouts": [],
    "salles": [],
    "photos": [
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4ctha02zqoan8pq7s6avt/a182435b-5f0b-4dd8-bc12-9c43767d09ed.webp",
        "legende": "Salon",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4ctha02zqoan8pq7s6avt/be14cbb4-c64a-4f1f-bb9c-b86e3f76210d.webp",
        "legende": "Salle de réunion",
        "categorie": "salle"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4ctha02zqoan8pq7s6avt/17d687e2-a554-403a-932c-78a64d14ad84.webp",
        "legende": "Salle de réunion",
        "categorie": "salle"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4ctha02zqoan8pq7s6avt/195eeae3-9ae4-4c61-9e3c-c8e4bee778dd.webp",
        "legende": "Salle de réunion",
        "categorie": "salle"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4ctha02zqoan8pq7s6avt/6873d741-b4c8-4ad7-a23b-0b53318f3d9e.webp",
        "legende": "Salle de détente attenante à la salle de réunion",
        "categorie": "extérieur"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4ctha02zqoan8pq7s6avt/e8c2b868-ba2e-4df9-a464-13bf4ec6d59d.webp",
        "legende": "Lobby ",
        "categorie": "autre"
      }
    ]
  },
  {
    "id": "cmle4cez501d2oan8yf2ol0od",
    "slug": "maison-prairie-bonheur-magny-les-hameaux",
    "nom": "Maison Prairie Bonheur",
    "categorie": "Maison d'hôtes",
    "ville": "Magny-les-Hameaux",
    "codePostal": "78114",
    "departementCode": "78",
    "departement": "Yvelines",
    "region": "Île-de-France",
    "adresse": "6 Chem. des Patissiaux, 78114 Magny-les-Hameaux, France",
    "latitude": 48.743152,
    "longitude": 2.0626396,
    "description": "La Maison Prairie Bonheur est un lieu idéal pour vos événements professionnels, situé en plein cœur de la Bourgogne. Avec son cadre paisible et raffiné, cette magnifique maison d'hôtes offre une atmosphère propice à la créativité et à la réflexion.\n\nPour répondre à tous vos besoins professionnels, La Maison Prairie Bonheur dispose de salles de réunion modernes et équipées, ainsi que d'une grande salle de réception avec de grandes baies vitrées donnant sur la prairie verdoyante. Vous pouvez également compter sur un hébergement confortable pour vos collaborateurs, avec des chambres spacieuses et élégantes, ainsi que des espaces de détente tels que la piscine extérieure chauffée, le sauna et le jacuzzi.\n\nL'équipe de La Maison Prairie Bonheur est à votre écoute pour vous accompagner dans la réussite de votre événement professionnel. Nous nous adaptons à vos besoins spécifiques et vous proposons des prestations sur mesure pour répondre à vos attentes.\n\nPour plus d'informations, n'hésitez pas à nous contacter. Nous serons ravis de vous aider à organiser votre événement professionnel dans les meilleures conditions.\n\n--- Transports ---\nAéroport : Orly\nGare : Saint remy les Chevreuse, Saint Quentin en Yvelines, Versailles Chantiers\nMétro : RER B",
    "resume": "Cher client, laissez-moi vous présenter un lieu enchanteur pour votre prochain événement d'entreprise : La Maison Prairie Bonheur.\n\nSituée dans un cadre idyllique en plein cœur de la Bourgogne, cette",
    "capacite": 18,
    "chambres": 6,
    "chambresSingle": null,
    "chambresTwin": 5,
    "sallesReunion": 1,
    "parking": null,
    "equipements": [
      "Accès PMR",
      "Lumière du jour",
      "Parking",
      "Vidéoprojecteur",
      "Wifi",
      "Jardin/Parc",
      "Terrasse/Cour intérieure"
    ],
    "services": [],
    "atouts": [],
    "salles": [],
    "photos": [
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cez501d2oan8yf2ol0od/90fcdbcd-cebd-4e92-9645-5c205ad2781a.webp",
        "legende": null,
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cez501d2oan8yf2ol0od/4d74feb6-279b-4a7e-add0-ca124ca0c23a.webp",
        "legende": null,
        "categorie": "salle"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cez501d2oan8yf2ol0od/47515a27-d744-4183-8ab9-52cfe3796012.webp",
        "legende": null,
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cez501d2oan8yf2ol0od/18c3638a-52e4-4eec-a1af-09f6ef020a09.webp",
        "legende": null,
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cez501d2oan8yf2ol0od/3ab40a6a-6c75-48b5-a2fb-de37bb8256fc.webp",
        "legende": null,
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cez501d2oan8yf2ol0od/be986893-b065-43e4-8962-7681e5ecce75.webp",
        "legende": null,
        "categorie": "autre"
      }
    ]
  },
  {
    "id": "cmle4ceui01cioan86zvqazfu",
    "slug": "la-seigneurie-lepic-andresy",
    "nom": "La Seigneurie Lepic",
    "categorie": "Château & domaine",
    "ville": "Andrésy",
    "codePostal": "78570",
    "departementCode": "78",
    "departement": "Yvelines",
    "region": "Île-de-France",
    "adresse": "2 Av. d'Eylau, 78570 Andrésy, France",
    "latitude": 48.9835582,
    "longitude": 2.0615794,
    "description": "Bienvenue à La Seigneurie Lepic, un manoir du début du 19ème siècle niché dans un parc en bord de Seine, un lieu enchanteur pour vos soirées d'entreprise.\n\nUn Manoir Historique : Imprégnez-vous de l'histoire en pénétrant dans ce manoir, l'ancienne propriété du peintre impressionniste Ludovic Lepic, grand ami de Degas. Le charme du passé se marie harmonieusement avec le confort moderne, créant une atmosphère unique.\n\nUn Havre de Paix : Entouré de verdure, notre domaine est un véritable havre de paix. Vous découvrirez ici un cadre apaisant, idéal pour vos soirées d'entreprise, loin de l'agitation de la ville.\n\nUn Accueil Chaleureux : À La Seigneurie Lepic, nous vous offrons un accueil typique, alliant le charme de la campagne au confort urbain. Nos salons sont simples et conviviaux, fournissant l'environnement parfait pour des soirées inoubliables.\n\nConnectivité Maximale : Notre réseau Wi-Fi ultrarapide vous garantit une connectivité sans faille, idéale pour vos présentations et visioconférences professionnelles.\n\nCuisine de Qualité : Pour vos déjeuners d'entreprise, notre service traiteur vous propose une cuisine de qualité, avec des plats délicieux qui raviront vos papilles.\n\nBienvenue au Domaine : Nous sommes ravis de vous accueillir dans notre domaine exceptionnel, où chaque détail a été pensé pour faire de votre soirée d'entreprise une expérience mémorable.\n\nNous sommes impatients de vous recevoir à La Seigneurie Lepic, où le mélange de l'histoire, de la nature et du confort moderne créera une soirée d'entreprise exceptionnelle. Contactez-nous dès maintenant pour réserver votre événement et laissez-vous séduire par le charme de notre manoir.\n\n--- Transports ---\nAéroport : Roissy Charles de Gaulle à 30 minutes\nGare : Maurecourt - Ligne J du Transilien - direct Saint Lazare en 30 minutes.\nMétro : NC",
    "resume": "Chers clients en quête d'un lieu exceptionnel pour vos soirées d'entreprise,\n\nC'est avec un immense plaisir que je vous invite à découvrir La Seigneurie Lepic, un manoir du début du 19ème siècle niché",
    "capacite": 10,
    "chambres": 0,
    "chambresSingle": null,
    "chambresTwin": 0,
    "sallesReunion": 2,
    "parking": null,
    "equipements": [
      "Parking",
      "Vidéoprojecteur",
      "Wifi",
      "Jardin/Parc"
    ],
    "services": [],
    "atouts": [],
    "salles": [],
    "photos": [
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4ceui01cioan86zvqazfu/a98223a1-bbfe-44fb-8307-9bf7f506ea06.webp",
        "legende": "Photo arrière de la Seigneurie",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4ceui01cioan86zvqazfu/e8aa4efb-2f70-4919-bf76-06c444ec3ca6.webp",
        "legende": "Espace RDC",
        "categorie": "bien-être"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4ceui01cioan86zvqazfu/15d845c8-bcbd-4ffe-abab-4b00452c52d5.webp",
        "legende": "Espace RDC petit salon",
        "categorie": "bien-être"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4ceui01cioan86zvqazfu/6e3a03a0-8b2a-404c-aabb-96b263c1ee1a.webp",
        "legende": "Salle de réunion RDC",
        "categorie": "salle"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4ceui01cioan86zvqazfu/509e5e0e-99d5-4932-a056-ab614301c8ff.webp",
        "legende": "Salle de réunion RDC",
        "categorie": "salle"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4ceui01cioan86zvqazfu/af1ce984-7137-4f4c-97a3-272271730c30.webp",
        "legende": "20d962_7fc1c9f040314aa38fb21ec4f5e226b1_mv2",
        "categorie": "autre"
      }
    ]
  },
  {
    "id": "cmle4d2h7040eoan8pxw1jsps",
    "slug": "chateau-de-farcheville-bouville",
    "nom": "Chateau de Farcheville",
    "categorie": "Hôtel",
    "ville": "Bouville",
    "codePostal": "91880",
    "departementCode": "91",
    "departement": "Essonne",
    "region": "Île-de-France",
    "adresse": "Route de Farcheville, 91880 Bouville",
    "latitude": 48.4287873,
    "longitude": 2.2850212,
    "description": "Château médiéval du XIIIe siècle entièrement rénové, le Château de Farcheville est un lieu d'exception pour vos séminaires et événements d'entreprise. Situé à 45 minutes de Paris, ce domaine de 6000 m² combine histoire authentique et modernité haut de gamme, offrant 22 chambres luxueuses, une orangerie de 600 m², des salles de réception élégantes, un spa avec piscine couverte chauffée et des installations audiovisuelles de pointe. Idéal pour les séminaires résidentiels, privatisations et réceptions professionnelles jusqu'à 450 personnes, avec chef cuisinier Michelin et équipes dédiées.",
    "resume": "Château médiéval 5 étoiles pour séminaires et événements d'entreprise - 22 chambres, orangerie 600m², spa, piscine - 45 min de Paris",
    "capacite": 450,
    "chambres": 22,
    "chambresSingle": null,
    "chambresTwin": 22,
    "sallesReunion": 5,
    "parking": 250,
    "equipements": [
      "Terrain de tennis",
      "Terrain de pétanque",
      "Jardin/Parc",
      "Terrasse/Cour intérieure",
      "Amphithéâtre",
      "Wifi",
      "Vidéoprojecteur",
      "Equipement son",
      "Paperboard",
      "Piscine intérieure",
      "Piscine extérieure",
      "Parking"
    ],
    "services": [],
    "atouts": [
      "Espace extérieur",
      "Parc / jardin",
      "Piscine",
      "Wi-Fi",
      "Équipement audiovisuel",
      "Accès PMR"
    ],
    "salles": [],
    "photos": [
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4d2h7040eoan8pxw1jsps/96e30163-c23f-4562-944b-b7d4ed52504b.webp",
        "legende": "Château de Farcheville",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4d2h7040eoan8pxw1jsps/1fab941b-1eb4-4026-b57f-4e5b2a26a75b.webp",
        "legende": "Château de Farcheville",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4d2h7040eoan8pxw1jsps/3de472c3-eb24-4b63-87cc-07860ccf5c6b.webp",
        "legende": "Orangerie",
        "categorie": "salle"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4d2h7040eoan8pxw1jsps/d64cc550-5566-48d0-b3a7-4cef33765f88.webp",
        "legende": "Château de Farcheville",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4d2h7040eoan8pxw1jsps/5aceccb8-26e3-4843-93ba-873fc10257da.webp",
        "legende": "Salon Rouge",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4d2h7040eoan8pxw1jsps/7ce7c66b-d130-42e5-b9bd-678c46d0d4f0.webp",
        "legende": "Salon des Femmes",
        "categorie": "autre"
      }
    ]
  },
  {
    "id": "cmle4csjf02wtoan8ce0a0o51",
    "slug": "domaine-de-fremigny-bouray-sur-juine",
    "nom": "Domaine de Fremigny",
    "categorie": "Château & domaine",
    "ville": "Bouray-sur-Juine",
    "codePostal": "91850",
    "departementCode": "91",
    "departement": "Essonne",
    "region": "Île-de-France",
    "adresse": "Rue de Fremigny, 91850 Bouray-sur-Juine, France",
    "latitude": 48.5182808,
    "longitude": 2.3077118,
    "description": "Situé dans le charmant département de l'Essonne, au cœur de l'Île-de-France, le Domaine de Frémigny est un lieu idéal pour organiser vos séminaires d'entreprise. Niché dans la petite commune de Bouray-sur-Juine, le domaine est entouré de paysages verdoyants, offrant un cadre paisible et inspirant.   Le domaine dispose de 298 chambres, dont 0 chambres twin, permettant d'accueillir vos collaborateurs dans le confort. Il possède aussi 14 salles de réunion équipées, la plus grande pouvant accueillir jusqu'à 60 personnes. Le Domaine de Frémigny est un lieu chargé d'histoire, avec son château datant du XVIIIème siècle. Autour de ce lieu, vous pourrez visiter le célèbre Château de Chamarande ou encore flâner dans les ruelles de la ville historique d'Étampes.   Pour les activités, vous pouvez profiter des installations du domaine, comme le terrain de tennis et la piscine extérieure. \n\n--- Transports ---\nAéroport : L'aéroport d'Orly, situé à environ 40 minutes en voiture.\nGare : La gare de Bouray (RER C), à seulement 5 minutes en voiture du domaine. La gare de Juvisy (RER C et D, Transilien J), à environ 30 minutes en voiture.\nMétro : Le domaine est situé en zone rurale, il n'y a pas de métro à proximité. Cependant, des bus desservent la commune de Bouray-sur-Juine.",
    "resume": "Chers Clients, \n Nous vous recommandons vivement le Domaine de Frémigny pour votre prochain séminaire d'entreprise. Ce lieu allie à la perfection le charme",
    "capacite": 300,
    "chambres": 298,
    "chambresSingle": null,
    "chambresTwin": 33,
    "sallesReunion": 15,
    "parking": null,
    "equipements": [
      "Terrain de football",
      "Terrain de pétanque",
      "Terrain de tennis",
      "Terrasse",
      "Terrasse extérieure pour repas",
      "Télévision",
      "Vidéoprojecteur",
      "Vue panoramique",
      "Wifi haut débit",
      "Écran",
      "Salle de réunion",
      "Système de visioconférence",
      "Salle de jeux",
      "Salle de fitness",
      "Salle de conférence",
      "Paperboard",
      "Parking privé",
      "Ping-pong",
      "Lumière du jour (dans salles)",
      "Micros / Sonorisation",
      "Jardin / Parc arboré",
      "Espace barbecue",
      "Climatisation",
      "Centre de bien-être",
      "Borne de recharge électrique",
      "Billard",
      "Accessibilité PMR",
      "Baby-foot",
      "Bagagerie"
    ],
    "services": [
      "Hébergement",
      "Restauration",
      "Salles de réunion",
      "Séminaires",
      "Conventions",
      "Congrès"
    ],
    "atouts": [
      "Espace extérieur",
      "Parc / jardin",
      "Wi-Fi"
    ],
    "salles": [
      {
        "nom": "Château - Salles de réunion",
        "surface": null,
        "theatre": null,
        "u": null,
        "banquet": null,
        "cocktail": null
      },
      {
        "nom": "Ferme - Auditorium",
        "surface": null,
        "theatre": null,
        "u": null,
        "banquet": null,
        "cocktail": null
      },
      {
        "nom": "Ferme - Salles de sous-commissions",
        "surface": null,
        "theatre": null,
        "u": null,
        "banquet": null,
        "cocktail": null
      },
      {
        "nom": "Espace Club - Salles de réunion",
        "surface": null,
        "theatre": null,
        "u": null,
        "banquet": null,
        "cocktail": null
      }
    ],
    "photos": [
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4csjf02wtoan8ce0a0o51/8d28f817-a661-44ba-bcf9-db804e71f3ad.webp",
        "legende": "Le Château",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4csjf02wtoan8ce0a0o51/3671edd4-5447-4dbe-aed8-878589ac8846.webp",
        "legende": "Auditorium - Le Comtois (3 travées)",
        "categorie": "salle"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4csjf02wtoan8ce0a0o51/8c125aa5-357e-44f4-b1a1-24c1f2a1d615.webp",
        "legende": "Salle de réunion L'Ardennais",
        "categorie": "salle"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4csjf02wtoan8ce0a0o51/df37aae6-49d2-4c6f-b2fa-b9a19b5aebae.webp",
        "legende": "Arrière Chateau et la Terrasse vus du ciel",
        "categorie": "extérieur"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4csjf02wtoan8ce0a0o51/1a1c8cf7-d41d-416a-a351-de983e13d0d5.webp",
        "legende": "BBQ en espace la Terrasse",
        "categorie": "bien-être"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4csjf02wtoan8ce0a0o51/e2d8267c-6232-471f-8a75-a4d5a61340cc.webp",
        "legende": " Auditorium - Le Comtois (2 travées)",
        "categorie": "salle"
      }
    ]
  },
  {
    "id": "cmle4cvis037doan824cfes3g",
    "slug": "domaine-de-quincampoix-les-molieres",
    "nom": "Domaine de Quincampoix",
    "categorie": "Château & domaine",
    "ville": "Les Molières",
    "codePostal": "91470",
    "departementCode": "91",
    "departement": "Essonne",
    "region": "Île-de-France",
    "adresse": "Rue de Roussigny, 91470 Les Molières, France",
    "latitude": 48.6668704,
    "longitude": 2.0770719,
    "description": "Ancien domaine de chasse du XVIIe siècle situé à 30 minutes de Paris en Vallée de Chevreuse, le Domaine de Quincampoix offre 620 m² de salles de réception modulables prolongées par des terrasses et jardins donnant sur les douves. Cet établissement d'exception combine authenticité historique et modernité, avec un métissage unique d'antiquités du monde et d'art contemporain. Idéal pour séminaires résidentiels, réceptions d'entreprise, mariages et événements de prestige, il propose une organisation clé en main avec restauration créative et activités de team building variées. Labellisé par la Fondation du Patrimoine, le domaine conçoit des événements éco-responsables et compensés carbone.",
    "resume": "Château-domaine XVIIe siècle avec 620m² de salles, douves, art & antiquités, 30 min de Paris, Vallée de Chevreuse",
    "capacite": 250,
    "chambres": 4,
    "chambresSingle": null,
    "chambresTwin": null,
    "sallesReunion": 8,
    "parking": 160,
    "equipements": [
      "Accessibilité PMR"
    ],
    "services": [],
    "atouts": [],
    "salles": [],
    "photos": [
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cvis037doan824cfes3g/e175b8da-ecd9-4a4b-b485-958bd98b65f4.webp",
        "legende": "Domaine de Quincampoix",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cvis037doan824cfes3g/2318cdce-69b1-47e7-830a-891ccfed0f32.webp",
        "legende": "Entrée du Domane ",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cvis037doan824cfes3g/e5708712-cfa2-4dc9-932b-c57cb7646b1b.webp",
        "legende": "Chambre écurie rez-de-chaussée",
        "categorie": "chambre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cvis037doan824cfes3g/54974d34-7b6b-4a5e-a8af-f10dc62609f6.webp",
        "legende": "Salle Renaissance",
        "categorie": "salle"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cvis037doan824cfes3g/c9383ccb-02eb-4523-8463-33df08557158.webp",
        "legende": "Douves du Domaine",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cvis037doan824cfes3g/64563b8d-0900-4802-90c2-786c6bf59bd9.webp",
        "legende": "Terrasse",
        "categorie": "extérieur"
      }
    ]
  },
  {
    "id": "cmle4chbz01nqoan8owkjyham",
    "slug": "novotel-paris-saclay-saclay",
    "nom": "Novotel Paris Saclay",
    "categorie": "Château & domaine",
    "ville": "Saclay",
    "codePostal": "91400",
    "departementCode": "91",
    "departement": "Essonne",
    "region": "Île-de-France",
    "adresse": "Rue Charles Thomassin, 91400 Saclay, France",
    "latitude": 48.7322252,
    "longitude": 2.1698452,
    "description": "🌳 Cadre et Localisation: Le Novotel Paris Saclay se trouve à Saclay, sur le plateau de Saclay, un lieu riche en histoire et culture. Situé non loin des grands établissements scientifiques, c'est un endroit idéal pour mélanger affaires et loisirs. Les visiteurs peuvent accéder facilement à la vallée de Chevreuse, au musée de la Toile de Jouy, et bien sûr, au célèbre Château de Versailles. 🏨 Hébergement et Capacité: L'hôtel dispose de 139 chambres, dont 4 adaptées aux personnes à mobilité réduite et 35 chambres familiales. Pour les événements professionnels, il propose 16 salles de réunion équipées, avec une capacité maximale d’accueil de 200 personnes dans la plus grande salle. 🍴 Restauration et Détente: Les clients peuvent profiter du Gourmet Bar, offrant une vue sur la piscine et une cuisine française raffinée. L'hôtel propose également un espace barbecue, une aire de jeux, un parc, une piscine, et diverses activités sportives telles que le babyfoot et le ping-pong. 🌟 Services et Équipements: Le Novotel Paris Saclay assure un confort optimal avec des équipements tels que le Wi-Fi, la climatisation, un centre de fitness, et un parking gratuit. Il est également adapté aux familles, avec une aire de jeux et la possibilité de louer des vélos gratuitement. \n\n--- Transports ---\nAéroport : Aéroport national : Paris-Orly, à environ 19 minutes de route. Aéroport international : Charles de Gaulle, à une distance un peu plus élevée.\nGare : Gare SNCF la plus proche : Massy, à environ 15 km. Gare TGV la plus proche : Massy TGV, également à environ 15 km.\nMétro : Pas de métro à proximité immédiate, mais la station RER B Le Guichet est à environ 6 km. Pour d'autres options, des stations de bus et des services de taxi sont disponibles aux alentours.",
    "resume": "Chers Clients, Je suis ravie de vous recommander le Novotel Paris Saclay pour votre prochain événement professionnel. Situé dans un cadre verdoyant et paisible, cet hôtel allie parfa",
    "capacite": 240,
    "chambres": 139,
    "chambresSingle": null,
    "chambresTwin": 40,
    "sallesReunion": 14,
    "parking": null,
    "equipements": [
      "Terrain de pétanque",
      "Jardin/Parc",
      "Salle de fitness",
      "Accès PMR",
      "Wifi",
      "Vidéoprojecteur",
      "Sonorisation",
      "Lumière du jour",
      "Parking",
      "Piscine",
      "Terrain de tenis",
      "Terrasse/Cour intérieure"
    ],
    "services": [],
    "atouts": [],
    "salles": [],
    "photos": [
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4chbz01nqoan8owkjyham/3a927464-7004-42f7-8322-4b907b788b5f.webp",
        "legende": null,
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4chbz01nqoan8owkjyham/fd160752-a8b9-4382-802b-7e3072a76586.webp",
        "legende": "Novotel Paris Saclay - Image 1",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4chbz01nqoan8owkjyham/22f1a8c9-ee2b-4673-bd0e-94339bd89c3c.webp",
        "legende": "Novotel Paris Saclay - Image 2",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4chbz01nqoan8owkjyham/4f70aa5f-fef0-48c7-935d-8601a7a29b62.webp",
        "legende": "Novotel Paris Saclay - Image 2",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4chbz01nqoan8owkjyham/13882d2b-beef-42c1-8081-7bd4da1378ef.webp",
        "legende": "Novotel Paris Saclay - Image 3",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4chbz01nqoan8owkjyham/2779d17c-0e08-4f5a-9002-f2ea86831eaa.webp",
        "legende": "Novotel Paris Saclay - Image 3",
        "categorie": "autre"
      }
    ]
  },
  {
    "id": "cmle4cqiu02oqoan84h4w39rm",
    "slug": "demeures-de-campagne-parc-du-coudray-le-coudray-montceaux",
    "nom": "Demeures de Campagne Parc du Coudray",
    "categorie": "Château & domaine",
    "ville": "Le Coudray-Montceaux",
    "codePostal": "91830",
    "departementCode": "91",
    "departement": "Essonne",
    "region": "Île-de-France",
    "adresse": "Rue de Milly, 91830 Le Coudray-Montceaux, France",
    "latitude": 48.5561607,
    "longitude": 2.4829054,
    "description": "Une adresse où la créativité est force d'inspiration pour vos participants ! Surprenez vos collaborateurs et profitez de notre savoir-faire pour créer une atmosphère de convivialité et de bien-être. Une occasion unique de vous ressourcer au cœur d’un domaine de 20ha avec sa forêt et son château.\nBaignés de lumière naturelle, nos espaces de réunion vous offrent tout le confort dont vous avez besoin pour le bon déroulement de votre événement.\n\nÉvénements adaptés pour ce lieu\n\nPartagez un moment gourmand et convivial et faites profiter vos collaborateurs d’une expérience différente : cours de cuisine & cours de cocktail, plats à partager fidèles à nos souvenirs d’enfance.\nSurprenez vos papilles grâce à des produits frais et de saison, notre Chef imagine des recettes gourmandes et généreuses.\nNotre Plus : Les engagements RSE sont au cœur de notre démarche. Réduction des déchets plastiques avec une eau micro filtrée, bornes de recharges électriques, miel de nos ruches.\n\nAvantages compétitifs\n\nLe Coup de Cœur de la Demeure : Un SPA situé dans un château du XVIIIème siècle qui fut la propriété de la famille Panhard.\nNotre exclusivité, une salle de réunion de prestige au cœur de notre Demeure.\nDemandez-nous l’impossible ! Organisez votre événement dans les granges du Domaine ou profitez d’un séminaire original dédié au bien-être et à la collaboration.\nProfitez de tous les atouts des Demeures de Campagne en organisant vos activités sur place. De nombreux loisirs vous sont proposés comme un parcours d’accrobranche en sous-bois, un court de tennis, pétanque, practice de golf…\n\n--- Transports ---\nAéroport : L'aéroport le plus proche est l'Aéroport de Paris-Orly (ORY), situé à environ 30 kilomètres au nord-ouest de Le Coudray-Montceaux. Vous pouvez accéder à l'aéroport en taxi, en navette aéroportuaire, ou en utilisant les transports publics.\nGare : La Gare de Melun est une gare ferroviaire à proximité, située à environ 20 kilomètres au sud-est de Le Coudray-Montceaux. Vous pouvez prendre un train depuis la Gare de Melun pour vous rendre à Paris ou d'autres destinations.\nMétro : Le Coudray-Montceaux est situé en dehors de la zone couverte par le réseau de métro de Paris, donc il n'y a pas de station de métro directement à proximité. Cependant, vous pouvez utiliser le réseau ferroviaire pour accéder au métro depuis une gare voisine.",
    "resume": "Cher client,\n\nIl me fait plaisir de vous recommander chaleureusement la Demeure de Campagne Parc du Coudray - Mercure pour votre prochain événement professionnel. Cet hôtel 4 étoiles, entièrement réno",
    "capacite": 220,
    "chambres": 127,
    "chambresSingle": null,
    "chambresTwin": 60,
    "sallesReunion": 13,
    "parking": null,
    "equipements": [
      "Piscine",
      "Spa",
      "Parking sur place",
      "Accès PMR",
      "Terrasse / Cour intérieure",
      "Cuisine événementielle",
      "Terrain de pétanque",
      "Salle de fitness",
      "Espace détente",
      "Jardin / Parc"
    ],
    "services": [],
    "atouts": [
      "Espace extérieur",
      "Parc / jardin",
      "Piscine",
      "Wi-Fi",
      "Équipement audiovisuel",
      "Accès PMR",
      "Climatisation"
    ],
    "salles": [],
    "photos": [
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cqiu02oqoan84h4w39rm/4e93f4db-6b7d-4acf-a22a-38c3a4bdbf5b.webp",
        "legende": "Château de la Demeure",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cqiu02oqoan84h4w39rm/e17ae7a4-84ca-43f7-879a-66fe4fa698b7.webp",
        "legende": "Entrée de la Demeure",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cqiu02oqoan84h4w39rm/4e034bc3-d40d-49c5-bf92-bfe82cf16363.webp",
        "legende": "Espace extérieur",
        "categorie": "bien-être"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cqiu02oqoan84h4w39rm/0a1d6423-b6f0-454f-a06e-295a2e6dbf9c.webp",
        "legende": "Garden Party",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cqiu02oqoan84h4w39rm/02771ba0-1c84-4ddb-8ba3-a731d5d7dc51.webp",
        "legende": "Brasero",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cqiu02oqoan84h4w39rm/5b46eda0-ceab-413e-bfe4-31ed0abcd1e5.webp",
        "legende": "Espace extérieur",
        "categorie": "bien-être"
      }
    ]
  },
  {
    "id": "cmle4cawa00xooan8wzzwwd4l",
    "slug": "novotel-senart-golf-de-greenparc-saint-pierre-du-perray",
    "nom": "Novotel Sénart Golf de Greenparc",
    "categorie": "Golf & resort",
    "ville": "Saint-Pierre-du-Perray",
    "codePostal": "91280",
    "departementCode": "91",
    "departement": "Essonne",
    "region": "Île-de-France",
    "adresse": "Golf De Greenparc D, 402 Rte de Villepecle, 91280 Saint-Pierre-du-Perray, France",
    "latitude": 48.6236779,
    "longitude": 2.5209177,
    "description": "Le Novotel Sénart Golf de Greenparc, situé sur la Route de Villepecle à Saint-Pierre-du-Perray, offre une expérience unique pour vos séminaires d'entreprise. Niché au cœur du golf de Greenparc, cet établissement 4 étoiles promet une escapade mémorable, combinant travail et détente dans un cadre verdoyant. Avec ses 9 salles de réunion, il s'adapte parfaitement à tous types d'événements professionnels, pouvant accueillir jusqu'à 140 participants dans la plus grande salle.\n\nLes participants peuvent se loger confortablement dans l'une des chambres spacieuses, dont certaines offrent une vue imprenable sur le golf. Pour les moments de pause, le centre de bien-être, incluant une piscine chauffée intérieure et un sauna, ainsi que l'accès direct au parcours de golf 18 trous, offrent des activités de détente idéales. 🏌️‍♂️🏊‍♀️\n\nLe restaurant \"Parenthèse\" propose une cuisine savoureuse, à déguster en véranda ou sur la terrasse, idéal pour se régénérer après une journée de travail. À proximité, des attractions telles que le château de Vaux le Vicomte et le parc d'attractions Disneyland Paris ajoutent des options de divertissement et de team building exceptionnelles. Pour ceux venant en voiture électrique, des bornes de recharge sont à disposition, témoignant de l'engagement du Novotel pour la durabilité. 🍽️🌍\n\n--- Transports ---\nAéroport : Aéroport le plus proche national et international : L'aéroport de Paris-Orly, situé à environ 40 minutes en voiture, offre à la fois des vols nationaux et internationaux, rendant le Novotel Sénart facilement accessible pour tous vos participants venant de loin.\nGare : Gare à proximité : La gare SNCF de Lieusaint-Moissy, accessible en environ 5 minutes en voiture, propose des liaisons vers Paris et d'autres destinations nationales. Pour ceux qui cherchent à se déplacer plus rapidement, la gare TGV la plus proche se situe à la gare de Lyon à Paris, offrant des connexions à travers la France et au-delà.\nMétro : Métro le plus proche : Bien que le lieu soit plus accessible en voiture ou en RER, les participants peuvent utiliser le RER D jusqu'à la station de Lieusaint-Moissy pour se rendre au Novotel Sénart Golf de Green​ (Accor Live Limitless)​​ (Accor Live Limitless)​rce】.",
    "resume": "Chers Clients,\n\nSi vous êtes à la recherche d'un lieu à la fois élégant et propice au travail pour votre prochain séminaire d'entreprise, le Novotel Sénart Golf de Greenparc est l'endroit idéal. Outre",
    "capacite": 140,
    "chambres": 81,
    "chambresSingle": null,
    "chambresTwin": 74,
    "sallesReunion": 8,
    "parking": null,
    "equipements": [
      "Espace détente",
      "Accès PMR",
      "Parking sur place",
      "Terrasse / Cour intérieure",
      "Jardin / Parc",
      "Cuisine événementielle",
      "Salle de fitness",
      "Piscine"
    ],
    "services": [],
    "atouts": [],
    "salles": [],
    "photos": [
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cawa00xooan8wzzwwd4l/c7b1f13e-e42f-49f1-bec1-58cb10add3bd.webp",
        "legende": null,
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cawa00xooan8wzzwwd4l/c248a086-5c2b-42f2-a7b2-bad908dbb574.webp",
        "legende": "Novotel Senart Golf de Greenparc - Image 1",
        "categorie": "extérieur"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cawa00xooan8wzzwwd4l/ec10d1a6-f5ae-4cc7-b4e2-693613f8836d.webp",
        "legende": "Novotel Senart Golf de Greenparc - Image 2",
        "categorie": "extérieur"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cawa00xooan8wzzwwd4l/c5a18aef-57df-4a75-b6e2-ad4422f2a2b0.webp",
        "legende": "Novotel Senart Golf de Greenparc - Image 2",
        "categorie": "extérieur"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cawa00xooan8wzzwwd4l/17496f80-a474-49ff-9dfa-ff5f3c2aaeae.webp",
        "legende": "Novotel Senart Golf de Greenparc - Image 3",
        "categorie": "extérieur"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cawa00xooan8wzzwwd4l/bba27f0a-bf96-402f-8d12-d0f073adde37.webp",
        "legende": "Novotel Senart Golf de Greenparc - Image 3",
        "categorie": "extérieur"
      }
    ]
  },
  {
    "id": "cmle4d4520470oan82lrgjzhq",
    "slug": "espace-leonard-de-vinci-lisses",
    "nom": "Espace Leonard de Vinci",
    "categorie": "Hôtel",
    "ville": "Lisses",
    "codePostal": "91090",
    "departementCode": "91",
    "departement": "Essonne",
    "region": "Île-de-France",
    "adresse": "4 Rue Léonard de Vinci, 91090 Lisses, France",
    "latitude": 48.604212,
    "longitude": 2.4107301,
    "description": "Plaisirs, loisirs, sport, partage, travail, bien-être, détente, découverte… 4 hectares près de la capitale. A 25 km au sud de Paris, invitation à tous les voyages avec l’Espace Léonard de Vinci situé à Lisses près d’Evry.\n\nÉvénements adaptés pour ce lieu\n\nl’Espace Léonard de Vinci est un hôtel qui offre relaxation, évasion, distraction, dépaysement… Son cadre empreint de quiétude et ses espaces harmonieux sont parfaits pour accueillir tout type d’événement : réunions, séminaires, mariages, fêtes familiales, stages sportifs (football, judo, basket-ball…).\n\nAvantages compétitifs\n\nAu cœur d’un parc boisé, un hôtel de 73 chambres tout confort, restaurant, brasserie, bar, salles de séminaire & réception, complexe sportif avec Spa & Institut de beauté, balnéothérapie, piscine intérieure à 30° et piscine extérieure l’été, cours de fitness et d’aquagym, courts de squash et de tennis…\n\n--- Transports ---\nAéroport : ORLY\nGare : RER D EVRY COURCOURONNES",
    "resume": "Bienvenue à l'Espace Léonard de Vinci, l'hôtel au charme cosy, niché dans un cadre verdoyant propice à la détente et à la réflexion.\n\nNotre établissement offre un cadre idéal pour vos événements profe",
    "capacite": 140,
    "chambres": 70,
    "chambresSingle": null,
    "chambresTwin": 50,
    "sallesReunion": 11,
    "parking": null,
    "equipements": [
      "Terrain de football",
      "Jardin/Parc",
      "Salle de fitness",
      "Terrasse/Cour intérieure",
      "Accès PMR",
      "Wifi",
      "Vidéoprojecteur",
      "Parking",
      "Piscine chauffée",
      "Piscine",
      "Baby-foot",
      "Billard",
      "Lumière du jour",
      "Spa",
      "Terrain de tenis",
      "Sonorisation"
    ],
    "services": [],
    "atouts": [],
    "salles": [],
    "photos": [
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4d4520470oan82lrgjzhq/7ff17a93-0aad-49a4-962a-73d0712fa3d3.webp",
        "legende": null,
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4d4520470oan82lrgjzhq/6b79a2e7-a91c-485a-ab60-b00ebc8bb31f.webp",
        "legende": "Une chambre d&apos;hôtel chaleureuse a l&apos;hôtel Léonard de vinci à Lisses",
        "categorie": "chambre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4d4520470oan82lrgjzhq/3c9d4f28-23d1-47d0-a58b-86a96d3bfd7a.webp",
        "legende": "Une chambre d&apos;hôtel chaleureuse a l&apos;hôtel Léonard de vinci à Lisses",
        "categorie": "chambre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4d4520470oan82lrgjzhq/ead3ab1b-906a-4b02-bffa-a64a10c3d5ab.webp",
        "legende": null,
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4d4520470oan82lrgjzhq/dd5106be-b6e4-4534-a876-4d08d0ae6bd9.webp",
        "legende": null,
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4d4520470oan82lrgjzhq/5ca35842-a67c-4056-9233-e7f86245b924.webp",
        "legende": null,
        "categorie": "autre"
      }
    ]
  },
  {
    "id": "cmle4c9ml00thoan8ke6mrxg9",
    "slug": "aqua-restaurant-suresnes",
    "nom": "Aqua Restaurant",
    "categorie": "Restaurant",
    "ville": "Suresnes",
    "codePostal": "92150",
    "departementCode": "92",
    "departement": "Hauts-de-Seine",
    "region": "Île-de-France",
    "adresse": "5 Quai Marcel Dassault, 92150 Suresnes, France",
    "latitude": 48.8606757,
    "longitude": 2.2251795,
    "description": "Situé à 8 minutes de la Porte Maillot, l'Aqua Restaurant de Suresnes est un bateau de 500 m² offrant des espaces lumineux directement sur l'eau. L'établissement dispose d'un parking privé, d'une terrasse sur l'eau et d'une piste de danse. La cuisine est élaborée à partir d'ingrédients frais et de saison, avec une vue imprenable sur la Seine. Des installations audiovisuelles modernes sont disponibles pour vos présentations et événements d'entreprise. Accessible depuis le métro Porte de Saint-Cloud, la gare Saint-Lazare et l'aéroport Charles de Gaulle.",
    "resume": "Bateau-restaurant de 500 m² situé à Suresnes, à 8 minutes de la Porte Maillot, avec terrasse sur l'eau et parking privé.",
    "capacite": 350,
    "chambres": 0,
    "chambresSingle": null,
    "chambresTwin": 0,
    "sallesReunion": 2,
    "parking": null,
    "equipements": [
      "Lumière du jour",
      "Parking",
      "Sonorisation",
      "Vidéoprojecteur",
      "Wifi"
    ],
    "services": [],
    "atouts": [],
    "salles": [],
    "photos": [
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4c9ml00thoan8ke6mrxg9/d8de8e51-e5a5-460b-a5c2-518553c7f4e7.webp",
        "legende": "Salle à Paris à louer Pavillon Wagram",
        "categorie": "salle"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4c9ml00thoan8ke6mrxg9/a7c50e31-1a67-44d3-83fb-a887449057a3.webp",
        "legende": "Salle à Paris à louer Salon des Miroirs",
        "categorie": "salle"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4c9ml00thoan8ke6mrxg9/38568ad4-61fb-4b21-af6c-7e72de818c3d.webp",
        "legende": "Salle à Paris à louer Le Chalet du Lac",
        "categorie": "extérieur"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4c9ml00thoan8ke6mrxg9/8fa423ef-9965-448c-a2d7-da3131b3cb8e.webp",
        "legende": "Salle à Paris à louer Cabaret Restaurant",
        "categorie": "restauration"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4c9ml00thoan8ke6mrxg9/42f41e22-428e-44bb-a066-483b11ac9ad7.webp",
        "legende": "Salle à Paris à louer Les Bains du Marais",
        "categorie": "salle"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4c9ml00thoan8ke6mrxg9/4aa3bc64-1fb3-451e-98f1-c0f4cc3aa950.webp",
        "legende": "La Beach Parisienne",
        "categorie": "autre"
      }
    ]
  },
  {
    "id": "cmle4c6nn00ggoan8gkwk74lr",
    "slug": "renaissance-la-defense-puteaux",
    "nom": "Renaissance la Défense",
    "categorie": "Hôtel",
    "ville": "Puteaux",
    "codePostal": "92800",
    "departementCode": "92",
    "departement": "Hauts-de-Seine",
    "region": "Île-de-France",
    "adresse": "60 Cr Valmy, 92800 Puteaux, France",
    "latitude": 48.892657,
    "longitude": 2.2339448,
    "description": "Niché au cœur du dynamique quartier d'affaires de La Défense, le Renaissance Paris La Défense se dresse fièrement entre la majestueuse Grande Arche et l'effervescente Paris La Défense Arena. À seulement un jet de pierre du centre commercial Westfield les 4 Temps, ce lieu offre un accès privilégié à une myriade de boutiques, restaurants et divertissements. 🛍️🍽️\n\nLe Renaissance Paris La Défense, établissement 4 étoiles, est la quintessence du confort et de l'élégance, proposant des chambres et suites raffinées, toutes équipées pour répondre aux besoins des voyageurs d'affaires et de loisirs. Les hôtes peuvent profiter d'un centre de fitness bien équipé, d'un restaurant et bar servant des spécialités françaises et des produits locaux, parfait pour décompresser après une journée de réunions ou d'explorations. Pour les séminaires et événements, l'hôtel dispose de services personnalisés visant à garantir le succès de chaque entreprise. 🏋️‍♂️🍽️\n\nSon emplacement n'est pas seulement pratique pour le shopping et les divertissements, mais également idéal pour explorer Paris, grâce à une excellente connexion de transport. La Défense Metro et RER Station se trouvent à une courte marche, facilitant l'accès aux emblématiques Arc de Triomphe et Champs-Elysées, ainsi qu'à d'autres sites d'intérêt parisiens comme l'Opéra Garnier et le Louvre. 🚇🎨\n\nLe cadre du Renaissance est un mélange harmonieux de modernité et de commodité, offrant un havre de paix dans l'effervescence de la ville. Que ce soit pour un séminaire, une conférence ou un événement d'entreprise, cet hôtel promet une expérience inoubliable à ses hôtes, combinant luxe, confort et accessibilité. 🌟\n\n--- Transports ---\nAéroport : Aéroport le plus proche : Charles de Gaulle (CDG), environ 45 minutes en véhicule. Pour les voyages internationaux, CDG offre une porte d'entrée aisée vers Paris et ses environs.\nGare : Gare à proximité : La gare SNCF de Paris Saint-Lazare est à environ 20 minutes en métro, offrant une connexion fluide aux réseaux nationaux et internationaux.\nMétro : Métro le plus proche : La Défense Metro et RER Station, à seulement environ 400 mètres de l'hôtel, offrant un accès facile à travers Paris et a​​​​source.",
    "resume": "Chers Clients,\n\nJe suis ravi de vous recommander le Renaissance Paris La Défense pour votre prochain événement professionnel. Son emplacement stratégique, ses installations de premier ordre et son ser",
    "capacite": 220,
    "chambres": 330,
    "chambresSingle": null,
    "chambresTwin": 0,
    "sallesReunion": 15,
    "parking": null,
    "equipements": [
      "Accès PMR",
      "Terrasse/Cour intérieure",
      "Salle de fitness",
      "Parking",
      "Vidéoprojecteur",
      "Wifi",
      "Sonorisation",
      "Lumière du jour"
    ],
    "services": [],
    "atouts": [],
    "salles": [],
    "photos": [
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4c6nn00ggoan8gkwk74lr/3629b844-9404-4792-b6f7-0ea4ee81f239.webp",
        "legende": "Chambres / Bedrooms",
        "categorie": "chambre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4c6nn00ggoan8gkwk74lr/5de5838b-251b-4684-92be-c2197cbbbb04.webp",
        "legende": "Réunions / Meetings",
        "categorie": "salle"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4c6nn00ggoan8gkwk74lr/0e1bb331-ae3f-435e-b276-b295beb3bc68.webp",
        "legende": "Restauration / Catering",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4c6nn00ggoan8gkwk74lr/6cbc6bb0-f809-4f1f-97b7-4b3d302f612f.webp",
        "legende": "Restauration / Catering",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4c6nn00ggoan8gkwk74lr/1ece012c-a6f2-4047-b94d-5fab51312cf6.webp",
        "legende": "Fitness",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4c6nn00ggoan8gkwk74lr/b4e42cdb-14bb-40c3-b483-734cc5b3fc9b.webp",
        "legende": "Accueil / Lobby",
        "categorie": "autre"
      }
    ]
  },
  {
    "id": "cmle4ch2601meoan8box4k18c",
    "slug": "la-treso-malakoff",
    "nom": "La Treso",
    "categorie": "Hôtel",
    "ville": "Malakoff",
    "codePostal": "92240",
    "departementCode": "92",
    "departement": "Hauts-de-Seine",
    "region": "Île-de-France",
    "adresse": "6 Av. du Président Wilson, 92240 Malakoff, France",
    "latitude": 48.820264,
    "longitude": 2.3016657,
    "description": "Un lieu idéal pour votre événement\nLa Tréso, lieu de vies et de fabrications, est un espace coopératif ouvert depuis septembre 2020. Il regroupe un espace café-cantine modulable, une cuisine professionnelle, des espaces artisanaux partagés et individuels. Ce tiers-lieu est animé d'ateliers de fabrication artisanale, numérique et culinaire et d'évènements culturels divers.\nIl est possible d'y réserver une table pour un petit groupe aux heures d'ouverture, de privatiser les espaces aux heures de fermeture, de mobiliser des compétences internes pour votre événement ou encore d'organiser un atelier de pratiques pour votre groupe.\n\n--- Transports ---\nAéroport : Orly\nGare : Montparnasse\nMétro : 13 Malakoff Plateau de Vanvec",
    "resume": "Cher client,\n\nNous sommes ravis de vous présenter La Tréso, un lieu emblématique où l'art, la créativité et l'expression trouvent leur place. Situé au cœur de la ville, La Tréso est un espace unique q",
    "capacite": 50,
    "chambres": 0,
    "chambresSingle": null,
    "chambresTwin": 0,
    "sallesReunion": 1,
    "parking": null,
    "equipements": [
      "Accès PMR",
      "Lumière du jour",
      "Sonorisation",
      "Vidéoprojecteur",
      "Wifi"
    ],
    "services": [],
    "atouts": [],
    "salles": [],
    "photos": [
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4ch2601meoan8box4k18c/94fb0629-56bb-4c80-9e9f-5ed26d51515b.webp",
        "legende": "La Tréso",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4ch2601meoan8box4k18c/5c7f01b4-97a9-47e8-8935-de5b91926c15.webp",
        "legende": "Le café-cantine",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4ch2601meoan8box4k18c/1e0cc504-4bb5-4cb4-af16-94eb62cfd075.webp",
        "legende": "Le café-cantine",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4ch2601meoan8box4k18c/66ff9df6-c3a2-4a8b-9df5-2fdbd61e3451.webp",
        "legende": "Le café-cantine",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4ch2601meoan8box4k18c/68418888-b5e7-453f-8c00-94719f248a9b.webp",
        "legende": "Le café-cantine",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4ch2601meoan8box4k18c/446622af-ee09-4cef-962a-44b5a0910ed3.webp",
        "legende": "Le café-cantine et la cuisine ouverte",
        "categorie": "autre"
      }
    ]
  },
  {
    "id": "cmle4cqiv02osoan8rstk00td",
    "slug": "hotel-spa-les-etangs-de-corot-ville-d-avray",
    "nom": "Hôtel & Spa les Etangs de Corot",
    "categorie": "Château & domaine",
    "ville": "Ville-D'Avray",
    "codePostal": "92410",
    "departementCode": "92",
    "departement": "Hauts-de-Seine",
    "region": "Île-de-France",
    "adresse": "55 Rue de Versailles, 92410 Ville-d'Avray, France",
    "latitude": 48.8219947,
    "longitude": 2.1831003,
    "description": "L'Hôtel & Spa Les Étangs de Corot se trouve à Ville-d'Avray, niché entre les paisibles étangs de Corot et la forêt de Fausses-Reposes. Cet établissement 4 étoiles offre un cadre exceptionnel, idéal pour les séminaires d'entreprise qui cherchent un mélange de tranquillité et d'accessibilité. À seulement quelques kilomètres de Paris, cet hôtel combine histoire, art et nature. 🌳🎨\n\nLe domaine dispose de plusieurs salles de réunion modernes, la plus grande pouvant accueillir jusqu'à 150 personnes. Chaque salle bénéficie de la lumière naturelle et d'une vue imprenable sur les étangs ou la forêt environnante, créant un environnement de travail à la fois inspirant et apaisant. 🌄\n\nPour l'hébergement, l'hôtel offre 43 chambres confortables, décorées dans un style qui évoque les artistes impressionnistes qui ont autrefois peint dans ces paysages. Les activités ne manquent pas, avec un spa de luxe, des ateliers de peinture et des promenades guidées. Les équipements gratuits comme le billard et le baby-foot sont aussi disponibles pour les moments de détente.\n\n--- Transports ---\nAéroport : National: Orly, à environ 30 minutes en voiture. International: Charles de Gaulle, à environ 45 minutes en voiture.\nGare : SNCF: Gare de Sèvres-Ville d'Avray, à environ 5 minutes en voiture. TGV: Gare Montparnasse, à environ 20 minutes en voiture.\nMétro : Bien que Ville-d'Avray ne dispose pas de métro, la ligne L du Transilien relie la gare de Sèvres-Ville d'Avray à la Défense et à Saint-Lazare, offrant une connexion facile à l'ensemble du réseau de transport parisien.",
    "resume": "Chers Clients,\n\nSi vous recherchez un lieu unique pour votre prochain événement professionnel, l'Hôtel & Spa Les Étangs de Corot offre un cadre idéal. Avec ses installations modernes et son emplacemen",
    "capacite": 50,
    "chambres": 43,
    "chambresSingle": null,
    "chambresTwin": 12,
    "sallesReunion": 6,
    "parking": null,
    "equipements": [
      "Spa",
      "Parking sur place",
      "Accès PMR",
      "Terrasse / Cour intérieure",
      "Cuisine événementielle",
      "Jardin / Parc",
      "Espace détente"
    ],
    "services": [],
    "atouts": [],
    "salles": [],
    "photos": [
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cqiv02osoan8rstk00td/bbdfa98f-acb0-4d4f-8b54-10a5d91488ec.webp",
        "legende": null,
        "categorie": "extérieur"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cqiv02osoan8rstk00td/e2fd3765-f8d0-4470-90d9-0ed83e9de525.webp",
        "legende": "BL Hôtels",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cqiv02osoan8rstk00td/312a0af1-b7a7-4f35-b330-90643a9cff01.webp",
        "legende": "lit de la suite Atelier d&#039;artiste - hotel 4 étoiles spa",
        "categorie": "bien-être"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cqiv02osoan8rstk00td/21ca4a37-68f5-422e-9aa7-550f994aedd5.webp",
        "legende": null,
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cqiv02osoan8rstk00td/daaad375-baa3-42be-81f0-d42151742db5.webp",
        "legende": "La terrasse du restaurant - hotel restaurant versailles",
        "categorie": "restauration"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cqiv02osoan8rstk00td/fcced347-8335-4a2b-bcc1-2dee335f2b36.webp",
        "legende": null,
        "categorie": "autre"
      }
    ]
  },
  {
    "id": "cmle4cls3025koan8u97zh0dl",
    "slug": "la-filature-clamart",
    "nom": "La Filature",
    "categorie": "Hôtel",
    "ville": "Clamart",
    "codePostal": "92140",
    "departementCode": "92",
    "departement": "Hauts-de-Seine",
    "region": "Île-de-France",
    "adresse": "86 Avenue du Général de Gaulle, 92140 Clamart, France",
    "latitude": 48.7917149,
    "longitude": 2.2659061,
    "description": "Ancien atelier de tricot, cet espace collaboratif de 170m² offre un véritable espace de transformation ! \nLe cadre chaleureux et confortable invitent chacun au partage et à la créativité. \nLa Filature offre un univers convivial et reconfigurable : déplacez le mobilier sur roulettes pour adapter l’espace à votre séminaire ! Les solutions digitales disponibles favorisent la collaboration et l’innovation.\nEquipements : 8m de panneaux inscriptibles et les dernières technologies (Tableau numérique interactif, écran vidéo tactile 55', écran vidéo 65').\n\nLa Filature est parfaitement adaptée aux sessions de brainstorming, réunion d'équipes, innovation, travaux en sous groupes, projet agile, séminaires de managers, comité de direction...\n\nAccès par le tram T6 : Arrêt Soleil Levant Bus 190, 195, 189, N62, N66. Parking gratuit dans le quartier. Accès au bois de Clamart en 5 minutes à pied.\n\n--- Transports ---\nAéroport : PARIS ORLY\nGare : MONTPARNASSE\nMétro : CHATILLON MONTROUGE L13",
    "resume": "Cher client,\n\nJe suis ravie de vous présenter La Filature, un lieu unique situé dans la ville de Clamart, dans les Hauts-de-Seine. Cette ancienne filature de coton, réaménagée en un espace de coworkin",
    "capacite": 30,
    "chambres": 0,
    "chambresSingle": null,
    "chambresTwin": 0,
    "sallesReunion": 1,
    "parking": null,
    "equipements": [
      "Lumière du jour",
      "Accès PMR",
      "Parking",
      "Jardin/Parc"
    ],
    "services": [],
    "atouts": [],
    "salles": [],
    "photos": [
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cls3025koan8u97zh0dl/2444e7c8-0213-433b-9059-6642282344c6.webp",
        "legende": "Le salon, notre espace de sous commission à la fois cosy et confortable.",
        "categorie": "bien-être"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cls3025koan8u97zh0dl/d20f6165-ecf4-4870-a9d6-2986b7cf06d0.webp",
        "legende": "Saas d'entrée et Bar de La Filature",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cls3025koan8u97zh0dl/902719be-abd8-4f22-adfe-7f1249534b5d.webp",
        "legende": "Entrée et Atelier donnant sur le jardin",
        "categorie": "extérieur"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cls3025koan8u97zh0dl/99a083b9-af52-4a61-b7b4-be828ee0cb44.webp",
        "legende": "Atelier donnant sur le salon, parfait pour une sous comission avec sa Tablette géante !",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cls3025koan8u97zh0dl/a407d608-c8b9-4239-ad28-1eef61e85c7a.webp",
        "legende": "Dos au jardin et à l'entrée, voici une disposition en mode coworking, tables en position haute ou basse au choix.",
        "categorie": "extérieur"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cls3025koan8u97zh0dl/8fe1ed2a-3047-4135-ba22-d959605020f1.webp",
        "legende": "Entrée et bar de La Filature pour les pauses",
        "categorie": "autre"
      }
    ]
  },
  {
    "id": "cmle4d6ua04nooan8ildlq0z6",
    "slug": "l-iroquois-levallois-perret",
    "nom": "L'Iroquois",
    "categorie": "Château & domaine",
    "ville": "Levallois-Perret",
    "codePostal": "92300",
    "departementCode": "92",
    "departement": "Hauts-de-Seine",
    "region": "Île-de-France",
    "adresse": "17 Rue Collange, 92300 Levallois-Perret, France",
    "latitude": 48.8993956,
    "longitude": 2.2881753,
    "description": "L'IROQUOIS est un espace événementiel à taille humaine, entièrement modulable, situé à Levallois-Perret. Il s'adapte à toutes typologies d'événements : dîners, meetings, soirées festives, showrooms, coworking, workshops et ateliers. L'espace est équipé d'un système son, d'un vidéoprojecteur, d'un bar, d'un espace lounge, d'une cuisine et du Wi-Fi. La restauration est assurée par le traiteur partenaire Les Menues. Un photomaton en libre accès est également disponible. Capacité de 30 personnes.",
    "resume": "Espace événementiel modulable de 30 personnes à Levallois-Perret, équipé d'un système son, bar, cuisine et espace lounge, idéal pour dîners, meetings et soirées d'entreprise.",
    "capacite": 30,
    "chambres": 0,
    "chambresSingle": null,
    "chambresTwin": 0,
    "sallesReunion": 1,
    "parking": null,
    "equipements": [
      "Baby-foot",
      "Vidéoprojecteur",
      "Wifi",
      "Lumière du jour",
      "Sonorisation",
      "Parking"
    ],
    "services": [],
    "atouts": [],
    "salles": [],
    "photos": [
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4d6ua04nooan8ildlq0z6/8cdd5ea3-6158-49f7-a90d-30c8735950ea.webp",
        "legende": null,
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4d6ua04nooan8ildlq0z6/4cfd6078-2033-4292-a6d1-9629edeb3444.webp",
        "legende": null,
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4d6ua04nooan8ildlq0z6/c0a5ed85-2a88-4c5a-9386-ca680a2ce42e.webp",
        "legende": null,
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4d6ua04nooan8ildlq0z6/cc0cae48-0631-42a8-be43-d12413793183.webp",
        "legende": null,
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4d6ua04nooan8ildlq0z6/6f75cff0-d616-4afd-9773-8d546fed1952.webp",
        "legende": null,
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4d6ua04nooan8ildlq0z6/68305730-d62e-488c-8c96-19ac3687832d.webp",
        "legende": null,
        "categorie": "autre"
      }
    ]
  },
  {
    "id": "cmle4d68c04jyoan8be39gfao",
    "slug": "abbaye-de-royaumont-asnieres-sur-oise",
    "nom": "Abbaye de Royaumont",
    "categorie": "Château & domaine",
    "ville": "Asnières-sur-Oise",
    "codePostal": "95270",
    "departementCode": "95",
    "departement": "Val-d'Oise",
    "region": "Île-de-France",
    "adresse": "D909E, 95270 Asnières-sur-Oise, France",
    "latitude": 49.149289,
    "longitude": 2.3830239,
    "description": "Nichée dans le paisible département du Val-d'Oise, à environ 30 kilomètres au nord de Paris, l'Abbaye de Royaumont est un joyau de l'architecture gothique, entourée d'un cadre exceptionnel qui inspire tranquillité et sérénité. Fondée en 1228 par Louis IX, avec le soutien de sa mère Blanche de Castille, cette abbaye cistercienne se distingue par son histoire riche, marquée par la royauté française et sa transformation en hôpital durant la Première Guerre mondiale. Aujourd'hui, elle sert de centre culturel et de lieu de rencontre pour des séminaires et des événements artistiques, notamment des résidences d'artistes et un festival de musique et de danse​​​​.\n\nL'Abbaye offre un cadre idyllique pour des séminaires et des événements d'entreprise, avec ses jardins remarquables tels que le Jardin du Cloître, le Jardin des Neuf Carrés inspiré des jardins médiévaux, et le Potager-Jardin, mêlant méthodes de culture traditionnelles et expérimentales. Ces espaces verts contribuent à l'atmosphère de paix et favorisent la réflexion et la créativité​​.\n\nLe Palais Abbatial de Royaumont, intégré à l'abbaye, propose un cadre Art Déco pour vos réunions, avec des salles de réunion high-tech et un espace bien-être pour se ressourcer entre deux sessions de travail. Avec 69 chambres élégantes et 12 salles de réunion pouvant accueillir de 2 à 100 participants, cet espace combine harmonieusement histoire, culture et fonctionnalité pour des rencontres professionnelles inspirantes​​.\n\nActivités et Installations : Outre sa vocation de centre pour les séminaires, l'Abbaye de Royaumont propose une gamme d'activités pédagogiques et ludiques, telles que des ateliers de calligraphie, d'herboristerie, et d'enquête historique, permettant aux participants de plonger dans l'histoire et la culture médiévale. Ces expériences enrichissantes offrent une opportunité unique de team building et de développement personnel dans un cadre historique​​.\n\n--- Transports ---\nAéroport : L'Abbaye de Royaumont est située à environ 25 minutes de l'aéroport Roissy-Charles de Gaulle, offrant une accessibilité pratique pour les participants internationau​x\nGare : Viarmes\nMétro : Pour les déplacements locaux, la vérification des options de transport public comme le tram ou le TER peut être nécessaire, selon votre point de départ. L'accessibilité peut varier, donc une planification préalable est conseillée pour assurer une arrivée sans encombre.",
    "resume": "Chers Clients,\n\nL'Abbaye de Royaumont, avec son mélange harmonieux d'histoire, de culture et de nature, offre un cadre exceptionnel pour vos séminaires et événements d'entreprise. Son environnement pa",
    "capacite": 600,
    "chambres": 53,
    "chambresSingle": null,
    "chambresTwin": 10,
    "sallesReunion": 18,
    "parking": null,
    "equipements": [
      "Accès PMR",
      "Terrain de pétanque",
      "Jardin/Parc",
      "Terrasse/Cour intérieure",
      "Wifi",
      "Sonorisation",
      "Vidéoprojecteur",
      "Lumière du jour"
    ],
    "services": [],
    "atouts": [],
    "salles": [],
    "photos": [
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4d68c04jyoan8be39gfao/15e5057a-6b1d-48f0-9ef3-2fe0225403f6.webp",
        "legende": "Abbaye royale fondée par Saint Louis",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4d68c04jyoan8be39gfao/e0b072b1-fcc9-4e7e-97b1-0feb19ce2cac.webp",
        "legende": "Salle de réunion",
        "categorie": "salle"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4d68c04jyoan8be39gfao/95dd617d-c42e-4d79-b880-6358098203ec.webp",
        "legende": "Dîner dans la Galerie Nord",
        "categorie": "restauration"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4d68c04jyoan8be39gfao/201efea5-8426-4a21-bc05-227083002fc0.webp",
        "legende": "Chambre classique",
        "categorie": "chambre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4d68c04jyoan8be39gfao/48c1685a-feba-4f6f-be7a-ebbc210706fd.webp",
        "legende": "La poivrière",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4d68c04jyoan8be39gfao/6f3c5836-5c95-4979-a7fc-04fe8baf6454.webp",
        "legende": "Abbaye de Royaumont",
        "categorie": "autre"
      }
    ]
  },
  {
    "id": "cmle4cbjt00zsoan8rxm6mqiw",
    "slug": "domaine-de-brunel-aincourt",
    "nom": "Domaine de Brunel",
    "categorie": "Château & domaine",
    "ville": "Aincourt",
    "codePostal": "95510",
    "departementCode": "95",
    "departement": "Val-d'Oise",
    "region": "Île-de-France",
    "adresse": "22 Sente Jean Brunel, 95510 Aincourt",
    "latitude": 49.0707731,
    "longitude": 1.7717438,
    "description": "Ancien corps de ferme entièrement rénové situé au cœur du Vexin, le Domaine de Brunel offre un cadre prestigieux et authentique pour vos événements d'entreprise. Composé de plusieurs bâtiments avec deux salles de réception indépendantes (La Remise et La Bergerie), ce domaine peut accueillir de 100 à 300 convives. L'établissement propose une prestation clé en main incluant traiteur, hébergement, décoration florale et service haut de gamme. Avec plus de 30 ans d'expérience, l'équipe professionnelle accompagne chaque événement avec rigueur et créativité, dans un environnement bucolique à moins d'une heure de Paris.",
    "resume": "Domaine de réception prestigieux dans le Vexin, 100-300 personnes, hébergement et traiteur inclus, à 50 min de Paris",
    "capacite": 300,
    "chambres": 12,
    "chambresSingle": null,
    "chambresTwin": 13,
    "sallesReunion": 2,
    "parking": null,
    "equipements": [],
    "services": [],
    "atouts": [
      "Espace extérieur",
      "Parc / jardin",
      "Accès PMR"
    ],
    "salles": [],
    "photos": [
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cbjt00zsoan8rxm6mqiw/9655a2e8-b8ba-4095-96b8-2c50e0da4fa7.webp",
        "legende": "La Bergerie ",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cbjt00zsoan8rxm6mqiw/c7b17c45-2e56-4cd3-8870-09e853bc15fa.webp",
        "legende": "Extérieur",
        "categorie": "extérieur"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cbjt00zsoan8rxm6mqiw/6d971cd1-d56d-4e9a-918a-7811ccecda0e.webp",
        "legende": "Le Préau - banquet",
        "categorie": "salle"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cbjt00zsoan8rxm6mqiw/e803abee-5c87-4d9c-a199-df8c783e81d2.webp",
        "legende": "La Remise - Banquet",
        "categorie": "salle"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cbjt00zsoan8rxm6mqiw/84b90f8b-19b8-4c15-953a-a8b3b4cc9d7a.webp",
        "legende": "Extérieur - Nuit",
        "categorie": "extérieur"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cbjt00zsoan8rxm6mqiw/2d7a52ef-705a-4f1f-af02-d191cf501933.webp",
        "legende": "Extérieur - Nuit",
        "categorie": "extérieur"
      }
    ]
  },
  {
    "id": "cmle4cyuk03ldoan803so2h01",
    "slug": "chateau-de-maudetour-maudetour-en-vexin",
    "nom": "Château de Maudétour",
    "categorie": "Château & domaine",
    "ville": "Maudétour-en-Vexin",
    "codePostal": "95420",
    "departementCode": "95",
    "departement": "Val-d'Oise",
    "region": "Île-de-France",
    "adresse": "1 allée des Tilleuls, 95420 Maudétour-en-Vexin",
    "latitude": 49.0997188,
    "longitude": 1.7768706,
    "description": "Château de Maudétour est un domaine d'exception classé Monument Historique situé à moins d'une heure de Paris, au cœur du Parc Naturel du Vexin. Édifié aux XVIIe et XVIIIe siècles, ce lieu unique conjugue le charme authentique d'une demeure historique à des prestations haut de gamme. Entouré d'un parc de 14 hectares en partie dessiné par Le Nôtre, le château offre un cadre raffiné pour mariages, séminaires et événements professionnels. Chaque événement bénéficie d'un service sur mesure et de la tranquillité d'un domaine réservé en exclusivité à ses hôtes.",
    "resume": "Château historique (XVIIe-XVIIIe) à 50 km de Paris : mariages, séminaires, hébergement de prestige dans parc de 14 hectares",
    "capacite": 250,
    "chambres": 19,
    "chambresSingle": null,
    "chambresTwin": 9,
    "sallesReunion": 3,
    "parking": null,
    "equipements": [
      "Vidéoprojecteur",
      "Paperboard",
      "Accessibilité PMR",
      "Baby-foot",
      "Chef privé",
      "Cour intérieure",
      "Espace coworking",
      "Location de vélos",
      "Massages / soins",
      "Micros / Sonorisation",
      "Navette / Transfert gare ou aéroport",
      "Parking privé",
      "Salle de réunion",
      "Terrain de pétanque",
      "Terrasse",
      "Terrasse extérieure pour repas",
      "Télévision",
      "Wifi haut débit",
      "Écran"
    ],
    "services": [],
    "atouts": [
      "Espace extérieur",
      "Parc / jardin",
      "Wi-Fi",
      "Équipement audiovisuel",
      "Accès PMR"
    ],
    "salles": [],
    "photos": [
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cyuk03ldoan803so2h01/9b7550e0-ba80-4dc4-b1c7-2f403d6b5319.webp",
        "legende": "Vue d'ensemble",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cyuk03ldoan803so2h01/cafb3943-305c-43ff-9697-373d689a871a.webp",
        "legende": "Vue d'ensemble portail XVIIème",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cyuk03ldoan803so2h01/569d9228-35c1-488b-992e-143f03b30be6.webp",
        "legende": "Extérieur",
        "categorie": "extérieur"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cyuk03ldoan803so2h01/66653b47-c7e9-42bf-8ac1-5409fb9a2469.webp",
        "legende": "Salle de l'Oratoire",
        "categorie": "salle"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cyuk03ldoan803so2h01/73d7d220-e668-42d6-8dad-5eccf744b3c9.webp",
        "legende": "Salle de l'oratoire II",
        "categorie": "salle"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cyuk03ldoan803so2h01/6501259f-7ff2-41b7-b1d6-c0212f0f27f6.webp",
        "legende": "Salle des Grandes Ecuries",
        "categorie": "salle"
      }
    ]
  },
  {
    "id": "cmle4ccpm014eoan8f15ezxod",
    "slug": "chateau-et-orangerie-de-chatenay-chatenay-en-france",
    "nom": "Château et Orangerie de Châtenay",
    "categorie": "Château & domaine",
    "ville": "Châtenay-en-France",
    "codePostal": "95190",
    "departementCode": "95",
    "departement": "Val-d'Oise",
    "region": "Île-de-France",
    "adresse": "8 rue Honoré de Mirabeau, La Censière, 95190 Châtenay-en-France",
    "latitude": 49.0695227,
    "longitude": 2.4571058,
    "description": "Le Château et Orangerie de Châtenay est un site d'exception dédié aux séminaires et événements d'entreprise, niché dans 20 hectares de verdure à seulement 30 minutes de Paris. Entièrement privatisable, il accueille jusqu'à 200 participants avec 12 salles de réunion équipées, 33 chambres confortables et une restauration gourmande. L'Orangerie aérienne et lumineuse offre une vue panoramique sur Paris, idéale pour les conventions, expositions et lancements de produits. Depuis plus de 30 ans, le château privilégie la qualité de l'espace de travail et l'accueil, avec une équipe dédiée et des activités de team building variées.",
    "resume": "Château événementiel 4 étoiles avec orangerie panoramique, 33 chambres, 12 salles - 30 min de Paris, 15 min de Roissy CDG",
    "capacite": 200,
    "chambres": 33,
    "chambresSingle": 20,
    "chambresTwin": 10,
    "sallesReunion": 12,
    "parking": 150,
    "equipements": [],
    "services": [],
    "atouts": [
      "Espace extérieur",
      "Parc / jardin",
      "Wi-Fi",
      "Équipement audiovisuel",
      "Accès PMR"
    ],
    "salles": [],
    "photos": [
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4ccpm014eoan8f15ezxod/1ba4cc34-c14f-457a-8694-7965a27bd80e.webp",
        "legende": "Château de Châtenay réception, réunion, événementiel, séminaire au vert à 30 min de Paris",
        "categorie": "salle"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4ccpm014eoan8f15ezxod/c205fc1d-dc94-4806-b845-507545116052.webp",
        "legende": null,
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4ccpm014eoan8f15ezxod/426173f0-8d14-4d11-ba07-cbe8020f8478.webp",
        "legende": null,
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4ccpm014eoan8f15ezxod/68fdd262-229b-49ce-8964-11ea589ab6cd.webp",
        "legende": null,
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4ccpm014eoan8f15ezxod/6c161ef1-122d-491a-a060-cf52c7d23965.webp",
        "legende": null,
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4ccpm014eoan8f15ezxod/b82182bf-b894-4d31-ab92-8bf0d2e5ae7d.webp",
        "legende": null,
        "categorie": "autre"
      }
    ]
  },
  {
    "id": "cmle4cmhn028poan84vmvduzh",
    "slug": "sherwood-parc-viarmes",
    "nom": "Sherwood Parc",
    "categorie": "Château & domaine",
    "ville": "Viarmes",
    "codePostal": "95270",
    "departementCode": "95",
    "departement": "Val-d'Oise",
    "region": "Île-de-France",
    "adresse": "Chem. des Rouliers, 95270 Viarmes, France",
    "latitude": 49.114218,
    "longitude": 2.3942161,
    "description": "Situé dans la région Île-de-France, plus précisément dans le département du Val-d'Oise, Sherwood Parc est un parc d'activités de loisirs en plein air idéal pour les séminaires de cohésion et les team building.\n\nLe parc offre une large gamme d'activités pour tous les goûts et tous les niveaux, allant de l'accrobranche, à l'escalade en passant par le quad, le paintball, le tir à l'arc, l'Explor Games et la tyrolienne. Les activités sont encadrées par des moniteurs professionnels pour assurer la sécurité de tous les participants.\n\nEn plus des activités physiques, Sherwood Parc propose également des jeux d'équipe, des énigmes et des challenges pour renforcer l'esprit d'équipe et la communication entre les membres. Les activités sont adaptées en fonction des objectifs et des besoins de chaque groupe.\n\nLe parc dispose également de salles de réunion et de restauration pour les pauses et les déjeuners. Les menus proposés sont variés et adaptés aux besoins alimentaires de chaque participant.\n\nEn somme, Sherwood Parc est un lieu idéal pour organiser des séminaires de cohésion et des team building en région Île-de-France et dans le département du Val-d'Oise, offrant une expérience de loisirs en plein air mémorable et stimulante pour renforcer les liens entre les membres d'une équipe.\n\n--- Transports ---\nAéroport : CDG\nGare : Direct depuis Paris gare du Nord : 40 min. Ligne Paris - Luzarches. Descendre à Seugy. 300 m à pied sur la gauche en sortant de la gare.\nMétro : NC",
    "resume": "Permettez-moi de vous présenter Sherwood Parc, un lieu captivant pour vos séminaires d'entreprise à Viarmes :\n\nSitué au Chemin des Rouliers, à Viarmes, Sherwood Parc est un parc d'aventure exceptionne",
    "capacite": 200,
    "chambres": 0,
    "chambresSingle": null,
    "chambresTwin": 0,
    "sallesReunion": 0,
    "parking": null,
    "equipements": [
      "Accès PMR",
      "Wifi",
      "Jardin/Parc",
      "Vidéoprojecteur",
      "Sonorisation",
      "Lumière du jour",
      "Parking",
      "Terrasse/Cour intérieure"
    ],
    "services": [],
    "atouts": [],
    "salles": [],
    "photos": [
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cmhn028poan84vmvduzh/0546e9fc-51eb-49e0-af1a-8ddb6d41f16a.webp",
        "legende": null,
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cmhn028poan84vmvduzh/b19029ad-e5c8-4a4f-a6d1-9c30aea147c5.webp",
        "legende": null,
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cmhn028poan84vmvduzh/649096d9-290b-4215-aeff-65c014f3658e.webp",
        "legende": null,
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cmhn028poan84vmvduzh/34051918-1708-475e-adb0-2506c39772ec.webp",
        "legende": null,
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cmhn028poan84vmvduzh/460daeff-d67c-4984-bf78-a74c910e630a.webp",
        "legende": "bannières site web (1)",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cmhn028poan84vmvduzh/0c05bc35-2c02-4cea-8f08-0bfc0eb7a9b1.webp",
        "legende": "bannières site web (1)",
        "categorie": "autre"
      }
    ]
  },
  {
    "id": "cmle4c9ap00sboan8hw89h8k6",
    "slug": "hotel-inn-paris-cdg-airport-roissy-en-france",
    "nom": "Hôtel Inn Paris Cdg Airport",
    "categorie": "Hôtel",
    "ville": "Roissy-en-France",
    "codePostal": "95700",
    "departementCode": "95",
    "departement": "Val-d'Oise",
    "region": "Île-de-France",
    "adresse": "1 All. du Verger, 95700 Roissy-en-France, France",
    "latitude": 49.005741,
    "longitude": 2.5217162,
    "description": "Bienvenue à l'Hôtel Inn Paris CDG Airport : Votre Destination Exclusive pour des Événements d'Entreprise Exceptionnels\n\nSitué à l'adresse prestigieuse 1 Allée du Verger, 95700 Roissy-en-France, France, l'Hôtel Inn Paris CDG Airport s'impose comme le lieu par excellence pour vos événements professionnels. Avec ses 244 chambres exclusives, notre établissement offre une expérience exceptionnelle pour des réunions d'affaires mémorables.\n\nÉvénements d'Entreprise de Premier Plan\n\nPour vos séminaires résidentiels et journées d'étude, nos 15 salles de réunion ont été pensées pour répondre à vos besoins. La plus grande salle, pouvant accueillir jusqu'à 170 participants, est équipée du système Clickshare. Elle propose un paperboard numérique, des doubles écrans de projection, un vidéoprojecteur de dernière génération, une sonorisation de pointe, et une télécommande à écran tactile pour une gestion totale de l'espace.\n\nConfort et Commodités\n\nAprès vos réunions, détendez-vous dans notre centre de fitness comprenant un sauna et un gymnase. La proximité immédiate de l'aéroport international Roissy-Charles-de-Gaulle fait de notre hôtel un choix optimal pour un lieu de séminaire proche de CDG, assurant un accès aisé.\n\nServices Exceptionnels\n\nRéception 24h/24\nConsigne à bagages\nAir conditionné\nAscenseur, accessible en fauteuil roulant\nPersonnel multilingue (français, anglais, espagnol)\n\nEn 2018, l'Hôtel Inn Paris CDG Airport a bénéficié d'une rénovation complète, offrant des installations modernes répondant à vos exigences professionnelles. Que vous recherchiez une salle de réunion CDG ou un lieu de séminaire facile d'accès, notre hôtel se positionne comme le choix par excellence.\n\nRéservez dès maintenant et assurez le succès de vos événements d'entreprise dans un cadre exceptionnel, au cœur de Roissy-en-France.\n\n--- Transports ---\nAéroport : L'Hôtel Inn Paris CDG Airport est proche de l'aéroport Charles de Gaulle (CDG), l'un des principaux aéroports internationaux de Paris.\nGare : La gare TGV de l'aéroport Charles de Gaulle est la gare la plus proche. Depuis cette gare, vous pouvez prendre le RER B (Réseau Express Régional) pour accéder au centre de Paris et à d'autres destinations desservies par cette ligne. En plus du RER, la gare de l'aéroport propose des services de TGV, permettant des déplacements rapides vers d'autres villes en France et en Europe. L'aéroport Charles de Gaulle n'est pas directement relié à des lignes de tram. Cependant, vous pouvez trouver des options de transfert entre différents modes de transport en utilisant les connexions disponibles à la gare de l'aéroport.\nMétro : Bien que l'hôtel ne soit pas directement desservi par le métro, vous pouvez utiliser le RER B pour accéder au réseau de métro de Paris depuis la gare de l'aéroport.",
    "resume": "Chers clients,\n\nC'est avec un enthousiasme débordant que je vous recommande l'Hôtel Inn Paris CDG Airport ! En tant que membre de notre équipe, j'ai eu le plaisir de découvrir les nombreuses facettes",
    "capacite": 170,
    "chambres": 244,
    "chambresSingle": null,
    "chambresTwin": 0,
    "sallesReunion": 15,
    "parking": null,
    "equipements": [
      "Accès PMR",
      "Vidéoprojecteur",
      "Wifi",
      "Sonorisation",
      "Spa",
      "Lumière du jour",
      "Parking",
      "Salle de fitness"
    ],
    "services": [],
    "atouts": [],
    "salles": [],
    "photos": [
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4c9ap00sboan8hw89h8k6/069fb4bf-76fa-426c-bfda-7da456bc37ee.webp",
        "legende": "Salle de sous-commission (double écran possible : grand écran +TV)",
        "categorie": "salle"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4c9ap00sboan8hw89h8k6/17138f74-5845-4cec-9193-714ec1cd9d1c.webp",
        "legende": "Salle de séminaire",
        "categorie": "salle"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4c9ap00sboan8hw89h8k6/06fb6b12-2f95-4393-906e-df3e09394a15.webp",
        "legende": "Salle de sous-commission",
        "categorie": "salle"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4c9ap00sboan8hw89h8k6/0ef87705-88b7-406e-8226-c66b369f8dd2.webp",
        "legende": "Salle de séminaire",
        "categorie": "salle"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4c9ap00sboan8hw89h8k6/1f017527-3903-48f1-b550-7f29943aba33.webp",
        "legende": "Salle de séminaire",
        "categorie": "salle"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4c9ap00sboan8hw89h8k6/141fd422-cadd-4e09-8c77-8b7ac1523be1.webp",
        "legende": "Salle de séminaire",
        "categorie": "salle"
      }
    ]
  },
  {
    "id": "cmle4ccu3014yoan84v5qedwd",
    "slug": "hotel-b-b-cergy-port-cergy",
    "nom": "Hôtel B&b Cergy Port",
    "categorie": "Hôtel",
    "ville": "Cergy",
    "codePostal": "95000",
    "departementCode": "95",
    "departement": "Val-d'Oise",
    "region": "Île-de-France",
    "adresse": "3 Av. du Parc, 95000 Cergy, France",
    "latitude": 49.0346035,
    "longitude": 2.0715113,
    "description": "Niché dans la charmante ville de Cergy, le Hôtel B&B Cergy Port est une destination idéale pour les séminaires d'entreprise et les événements professionnels. Situé au 3 Avenue du Parc, cet établissement 4 étoiles offre un cadre propice à la fois à la détente et au travail. 🌳\n\nL’hôtel se trouve à proximité de l’ESSEC Business School et de l’Université CY Cergy Paris, à seulement quelques minutes à pied, ce qui le rend parfait pour les visites académiques ou les événements professionnels. Son emplacement près de la gare de Cergy Préfecture, à environ 10 minutes de marche, assure une excellente accessibilité, notamment pour les voyageurs venant de Paris. ✈️\n\nLe B&B Cergy Port dispose de 191 chambres, offrant un confort moderne avec une connexion Wi-Fi gratuite, un espace de travail ergonomique, et des équipements adaptés aux personnes à mobilité réduite. Les chambres, décorées avec goût, allient fonctionnalité et confort, avec des salles de bain bien équipées et des télévisions à écran plat.\n\nPour les événements d’entreprise, l’hôtel propose 10 salles de réunion modulables, s’étendant sur 110 mètres carrés. Ces espaces sont idéaux pour des conférences, des ateliers ou des réunions en petits groupes, et sont équipés des dernières technologies pour faciliter les présentations et les vidéoconférences. 📊\n\nLe restaurant de l'hôtel, servant une cuisine française traditionnelle, est un lieu de rencontre agréable pour les pauses déjeuner ou les dîners d'affaires. L'établissement dispose également d'un bar pour des moments de détente après une journée de travail. Pour ceux qui cherchent à se ressourcer, un espace de remise en forme est à disposition.\n\nLes clients de l'hôtel apprécient particulièrement son cadre verdoyant et sa proximité avec le Parc Naturel Régional du Vexin Français, offrant des opportunités pour des activités de team building en plein air. Pour les moments de loisirs, le Cergy Pontoise Leisure Island et la Piscine Cergy, à quelques minutes de route, proposent diverses activités aquatiques et sportives. 🚣‍♀️\n\nEn résumé, l’Hôtel B&B Cergy Port est un choix judicieux pour les organisateurs de séminaires recherchant un lieu alliant praticité, confort et services de qualité. Avec son cadre agréable, ses installations modernes et son emplacement stratégique, il représente une option de premier choix pour les événements professionnels dans la région de Cergy. 🌟\n\n--- Transports ---\nAéroport : National : Aéroport de Paris-Charles de Gaulle (CDG), environ 37 minutes en voiture. International : Aéroport de Paris-Charles de Gaulle (CDG), environ 37 minutes en voiture.\nGare : SNCF : Gare de Cergy Préfecture, environ 10 minutes à pied. TGV : Gare de Saint-Lazare à Paris, puis correspondance pour Cergy Préfecture, environ 1 heure de trajet total.\nMétro : Aucune ligne de métro directe. Le RER A dessert la gare de Cergy Préfecture, offrant une liaison rapide et pratique avec le centre de Paris.",
    "resume": "Chers Clients,\n\nJe suis ravie de vous recommander le Hôtel B&B Cergy Port pour votre prochain événement professionnel. Situé dans un cadre verdoyant, cet établissement 4 étoiles offre un mélange parfa",
    "capacite": 160,
    "chambres": 191,
    "chambresSingle": null,
    "chambresTwin": 57,
    "sallesReunion": 10,
    "parking": null,
    "equipements": [
      "Accès PMR",
      "Lumière du jour",
      "Parking",
      "Terrain de pétanque",
      "Sonorisation",
      "Vidéoprojecteur",
      "Wifi",
      "Jardin/Parc",
      "Salle de fitness",
      "Terrasse/Cour intérieure"
    ],
    "services": [],
    "atouts": [],
    "salles": [],
    "photos": [
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4ccu3014yoan84v5qedwd/f3b4d3a7-58fc-4494-9b29-c08004762fb4.webp",
        "legende": null,
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4ccu3014yoan84v5qedwd/2a12e67b-14bc-4ecc-8052-a66184768c61.webp",
        "legende": null,
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4ccu3014yoan84v5qedwd/8bf255ba-a47a-4d63-8355-1152570b9330.webp",
        "legende": null,
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4ccu3014yoan84v5qedwd/7b3a52ad-216e-4d97-8324-9c7ebe92f16c.webp",
        "legende": null,
        "categorie": "restauration"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4ccu3014yoan84v5qedwd/19dc2c52-81b0-4854-bbaa-550569ec21b4.webp",
        "legende": null,
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4ccu3014yoan84v5qedwd/121ded5c-7267-4d3a-9d4c-417e478cacdd.webp",
        "legende": null,
        "categorie": "autre"
      }
    ]
  },
  {
    "id": "cmle4d35p0435oan8y0iadvwh",
    "slug": "westotel-taverny-paris-val-d-oise-taverny",
    "nom": "Westotel Taverny Paris Val D'Oise",
    "categorie": "Hôtel",
    "ville": "Taverny",
    "codePostal": "95150",
    "departementCode": "95",
    "departement": "Val-d'Oise",
    "region": "Île-de-France",
    "adresse": "1 Rue Marie Sklodowska-Curie, 95150 Taverny, France",
    "latitude": 49.0262697,
    "longitude": 2.1989236,
    "description": "A seulement 20 kilomètres de la capitale et 34 kilomètres de l'aéroport de Roissy Charles de Gaulles, c'est l'endroit idéal pour rassembler vos invités. \nLe Westotel Taverny - Paris Val-d'Oise est un établissement 4 étoiles situé dans la ville paisible de Taverny, à proximité immédiate de l'axe Paris-Cergy. À seulement 20 km de la capitale et 34 km de l'aéroport Roissy Charles de Gaulle, cet hôtel se présente comme un havre de paix aux portes de Paris, offrant un cadre verdoyant et arboré idéal pour les séjours de tourisme d'affaires et de loisir.\n\nL'hôtel dispose de 92 chambres confortables, d'un espace restaurant et d'un lounge bar pour des moments de détente gourmande. Pour la relaxation, les clients peuvent profiter d'une piscine couverte et d'espaces bien-être. Avec 128 places de parking privées et gratuites, le Westotel Taverny facilite l'accès des visiteurs venant en voiture.\n\nVous souhaitez organiser une journée d'étude, une réunion, une convention, un dîner de gala ou un cocktail, l'équipe du Westotel Taverny se tient à votre disposition pour répondre à votre demande. Toutes les salles sont à la lumière du jour, bénéficient d'une grande superficie et sont équipées du matériel nécessaire à votre séminaire.\n\n--- Transports ---\nAéroport : L'aéroport Roissy Charles de Gaulle est à 34 km, offrant une connectivité aérienne internationale.\nGare : Gare de Taverny\nMétro : Taverny bénéficie d'un réseau de transport en commun développé, rendant l'hôtel accessible également par train et bus pour ceux privilégiant les transports publics. Accès routier : L'hôtel est idéalement situé à proximité de l'axe Paris-Cergy, facilitant l'accès en voiture.",
    "resume": "Chers Clients,\n\nLe Westotel Taverny - Paris Val-d'Oise est un choix exceptionnel pour votre prochain séminaire ou événement professionnel. Situé dans un environnement verdoyant, à quelques pas de Pari",
    "capacite": 140,
    "chambres": 92,
    "chambresSingle": null,
    "chambresTwin": 0,
    "sallesReunion": 15,
    "parking": null,
    "equipements": [
      "Accès PMR",
      "Lumière du jour",
      "Parking",
      "Piscine",
      "Vidéoprojecteur",
      "Wifi",
      "Jardin/Parc",
      "Salle de fitness",
      "Terrasse/Cour intérieure",
      "Sonorisation"
    ],
    "services": [],
    "atouts": [],
    "salles": [],
    "photos": [
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4d35p0435oan8y0iadvwh/b0b18c8c-8b62-471c-9d0a-4fc0c35ca592.webp",
        "legende": "W_TAVERNY-202_BD",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4d35p0435oan8y0iadvwh/d01f977d-b530-4be6-8471-f749e4b87de9.webp",
        "legende": "W_TAVERNY-64_Chambre Executive_BD",
        "categorie": "chambre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4d35p0435oan8y0iadvwh/27f3d2a0-8d4a-4a6b-b78a-2979904400f7.webp",
        "legende": "W_TAVERNY-15_compressed",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4d35p0435oan8y0iadvwh/12c32601-e8f4-4e3c-badb-02bcb3220531.webp",
        "legende": "W_TAVERNY-183_BD",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4d35p0435oan8y0iadvwh/dd44da4f-018e-4a2a-9d7a-f50b4f7d7595.webp",
        "legende": "W_TAVERNY-190_BD",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4d35p0435oan8y0iadvwh/e2cd199b-1f81-4669-9423-37f9562156a0.webp",
        "legende": "W_TAVERNY-135_BD",
        "categorie": "autre"
      }
    ]
  },
  {
    "id": "cmle4cgt001lioan85ajyliin",
    "slug": "chateau-de-la-bucherie-saint-cyr-en-arthies",
    "nom": "Chateau de la Bucherie",
    "categorie": "Château & domaine",
    "ville": "Saint-Cyr-en-Arthies",
    "codePostal": "95510",
    "departementCode": "95",
    "departement": "Val-d'Oise",
    "region": "Île-de-France",
    "adresse": "5 rue du Parc, 95510 Saint-Cyr-en-Arthies",
    "latitude": 49.0623144,
    "longitude": 1.7442513,
    "description": "Château de la Bûcherie est un établissement événementiel haut de gamme situé au cœur du Vexin français, dans un parc classé de 60 hectares. Cet hôtel de charme du XIXe siècle offre un cadre exceptionnel pour séminaires, réceptions et événements d'entreprise. Le domaine dispose de 4 salles de réunion modulables, d'un restaurant gastronomique (Cambrousse, 1 toque au guide Gault & Millau), et d'une restauration responsable s'approvisionnant à 90% auprès de producteurs locaux. Idéal pour privatisation complète ou événements partiels, le château allie charme historique, nature préservée et services professionnels premium.",
    "resume": "Château XIXe siècle en Vexin français : 60 ha de parc classé, 4 salles séminaire, 36 chambres, restaurant gastronomique, à 45 min de Paris",
    "capacite": 66,
    "chambres": 36,
    "chambresSingle": null,
    "chambresTwin": 10,
    "sallesReunion": 4,
    "parking": 60,
    "equipements": [
      "Billard",
      "Vidéoprojecteur",
      "Accessibilité PMR",
      "Baby-foot",
      "Accès lac / rivière",
      "Cour intérieure",
      "Espace barbecue",
      "Lumière du jour (dans salles)",
      "Location de vélos",
      "Jardin / Parc arboré",
      "Massages / soins",
      "Micros / Sonorisation",
      "Navette / Transfert gare ou aéroport",
      "Paperboard",
      "Ping-pong",
      "Parking privé",
      "Restaurant sur place",
      "Salle de conférence",
      "Système de visioconférence",
      "Salle de réunion",
      "Terrasse",
      "Wifi haut débit",
      "Écran",
      "Vue panoramique"
    ],
    "services": [],
    "atouts": [
      "Espace extérieur",
      "Parc / jardin",
      "Wi-Fi",
      "Équipement audiovisuel",
      "Accès PMR"
    ],
    "salles": [],
    "photos": [
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cgt001lioan85ajyliin/967b7a07-5b89-4401-afee-382a0f1752b0.webp",
        "legende": "Nos serres",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cgt001lioan85ajyliin/e9c521d1-a8ee-4916-a25e-b02ec8788767.webp",
        "legende": "Restaurant CAMBROUSSE - 45 places",
        "categorie": "restauration"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cgt001lioan85ajyliin/8a730d8b-d716-4e2e-bde5-28ef6573431d.webp",
        "legende": "Salle ELISABETH - 45m²",
        "categorie": "salle"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cgt001lioan85ajyliin/62158442-cc90-4290-ade0-eb5f3b195f0e.webp",
        "legende": "Chambre 112 - Suite Prestige",
        "categorie": "chambre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cgt001lioan85ajyliin/d5dcf89c-e4cc-4287-9770-6dcba4397566.webp",
        "legende": "Belvédère pour l'apéritif et Barbecue  au Soleil",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cgt001lioan85ajyliin/49d28f21-c2bf-4036-b11c-f659cd726da5.webp",
        "legende": "Cuisine ouverte du restaurant Gastronomique CAMBROUSSE",
        "categorie": "restauration"
      }
    ]
  },
  {
    "id": "cmle4cxpe03gdoan84e9d9dny",
    "slug": "le-clos-des-fees-asnieres-sur-oise",
    "nom": "Le Clos des Feés",
    "categorie": "Château & domaine",
    "ville": "Asnières-sur-Oise",
    "codePostal": "95270",
    "departementCode": "95",
    "departement": "Val-d'Oise",
    "region": "Île-de-France",
    "adresse": "42 Bis Grande Rue, 95270 Asnières-sur-Oise, France",
    "latitude": 49.134804,
    "longitude": 2.355715,
    "description": "Nous sommes une maison d'hôtes de 5 chambres avec possibilité de lits simples dans toutes les chambres, nous avons un très grand parc , une piscine , un bain nordique chauffé a 39° , nous possédons 2 salles \na proximité de Paris\n\nNous proposons des offres avec équipements ( vidéo projecteur, TV, Paperboard...) pour des séminaires d'entreprise dans un cadre paisible et inspirant à 35 km de Paris. Disposant d’une piscine ainsi qu’un bain nordique chauffé à 39°, notre environnement calme et notre\ninfrastructure moderne en font l'endroit idéal pour organiser vos réunions, formations ou team buildings. Nous pouvons vous proposer des options de collation, déjeuner/diner, petit déjeuner, yoga de groupe, pour\ncompléter votre expérience.\nNous avons de nombreuses activités disponibles dans les environs. Paris à seulement 30km, L’ Isle Adam à 12 km, l’Aéroport de Paris-Charles de Gaulle à 20km.\nVous pourrez profiter du château de Chantilly, L’abbaye de Royaumont.\nSi vous préférez des activités de plein air, vous pourrez profiter de randonnées à vélo ou à pied le long de l'Oise ou explorer les sentiers de la réserve naturelle régionale des Marais de Sacy, l’accrobranche avec Sherwood Parc , la forêt de Carnelle, Parc Astérix, Golf,\n\n--- Transports ---\nAéroport : L'aéroport de Paris-Charles-de-Gaulle, situé à environ 23 km, est l'aéroport international le plus proche du Clos des Fées, offrant une navette aéroport pour faciliter votre arrivée et votre départ.\nGare : La gare de Chantilly-Gouvieux, à 13 km, est la gare la plus proche, permettant un accès facile en train depuis différentes localités.\nMétro : Le Clos des Fées bénéficie d'un parking privé gratuit sur place, rendant l'accès en voiture particulièrement pratique pour les visiteurs.",
    "resume": "Chers Clients,\n\nNous sommes ravis de vous recommander Le Clos des Fées, un havre de paix situé à Asnières-sur-Oise, pour vos séjours et événements. Ce charmant établissement, apprécié pour son cadre i",
    "capacite": 17,
    "chambres": 5,
    "chambresSingle": null,
    "chambresTwin": 9,
    "sallesReunion": 2,
    "parking": null,
    "equipements": [
      "Lumière du jour",
      "Parking",
      "Piscine",
      "Piscine chauffée",
      "Spa",
      "Vidéoprojecteur",
      "Wifi",
      "Jardin/Parc",
      "Terrasse/Cour intérieure"
    ],
    "services": [
      "Hébergement",
      "Accès piscine et spa",
      "Salle de sport",
      "Jardin et potager"
    ],
    "atouts": [
      "Espace extérieur",
      "Parc / jardin",
      "Piscine",
      "Wi-Fi"
    ],
    "salles": [],
    "photos": [
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cxpe03gdoan84e9d9dny/1f4babc7-adad-46b5-8ec6-06b67d56da32.webp",
        "legende": "2_48848541751400",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cxpe03gdoan84e9d9dny/d4d86e10-06b4-4d4d-b287-54d7d22baf75.webp",
        "legende": "5_48848627949837",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cxpe03gdoan84e9d9dny/b4c44f0c-efa8-46f7-8118-6ea10c61ca4c.webp",
        "legende": "1_48848493792025",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cxpe03gdoan84e9d9dny/e0ddd264-2c92-4547-8bc0-e21c60d6eeb3.webp",
        "legende": "4_48396075518656",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cxpe03gdoan84e9d9dny/c2b8c33f-2541-4c2f-b346-c4aa5717c89e.webp",
        "legende": "2_48396003844698",
        "categorie": "autre"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4cxpe03gdoan84e9d9dny/f9a0b795-b914-42cf-9793-1709df70d250.webp",
        "legende": "ed32f346-8070-4775-b060-3f291738b124",
        "categorie": "autre"
      }
    ]
  },
  {
    "id": "cmle4ccyj015moan87jyo770z",
    "slug": "chateau-de-l-hermitage-ennery",
    "nom": "Chateau de L'Hermitage",
    "categorie": "Château & domaine",
    "ville": "Ennery",
    "codePostal": "95300",
    "departementCode": "95",
    "departement": "Val-d'Oise",
    "region": "Île-de-France",
    "adresse": "8 Rue du Parc, 95300 Ennery, France",
    "latitude": 49.061252,
    "longitude": 2.1128672,
    "description": "Le Château de l'Hermitage est situé à Ennery, dans le Parc Naturel du Vexin, à 30 km de Paris, au cœur du pays des Impressionnistes. L'hôtel boutique dispose de 12 chambres décorées dans un style classique avec salles de bain contemporaines. Le restaurant, ouvert midi et soir du lundi au vendredi, propose une cuisine bistronomique française de saison. L'établissement peut être privatisé pour réceptions, avec une salle de restaurant pouvant accueillir 56 personnes assises ou 110 en cocktail. Un parcours de golf compact de 9 trous est disponible sur place.",
    "resume": "Château-hôtel boutique de 12 chambres situé à Ennery dans le Parc Naturel du Vexin, à 30 km de Paris, avec restaurant bistronomique et golf de 9 trous.",
    "capacite": 13,
    "chambres": 12,
    "chambresSingle": null,
    "chambresTwin": 2,
    "sallesReunion": 1,
    "parking": null,
    "equipements": [
      "Vidéoprojecteur"
    ],
    "services": [],
    "atouts": [],
    "salles": [],
    "photos": [
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4ccyj015moan87jyo770z/a0abf501-bb5a-4663-8d95-3b440a775b67.webp",
        "legende": "Façade extérieure",
        "categorie": "façade"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4ccyj015moan87jyo770z/821e9aec-91b0-4605-be1f-dfb7a5c02c54.webp",
        "legende": "Parcours de golf Pitch and Putt",
        "categorie": "extérieur"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4ccyj015moan87jyo770z/0391e31f-3229-4857-af80-49f2b3172e47.webp",
        "legende": "Salle à manger ",
        "categorie": "restauration"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4ccyj015moan87jyo770z/f7703002-5d7e-4e36-931b-dd8f16a526dc.webp",
        "legende": "Extérieur",
        "categorie": "extérieur"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4ccyj015moan87jyo770z/4bfdb92b-c430-475a-bcf9-aff2ebc9cb86.webp",
        "legende": "Extérieur",
        "categorie": "extérieur"
      },
      {
        "url": "https://5todovtlmree4g1o.public.blob.vercel-storage.com/prestataires/cmle4ccyj015moan87jyo770z/e0e6b223-1362-459a-b1d9-efab940deb11.webp",
        "legende": "Chambre",
        "categorie": "chambre"
      }
    ]
  }
];

export function getVenueBySlug(slug: string): Venue | undefined {
  return venues.find(v => v.slug === slug);
}

export function getVenuesByDepartment(code: string): Venue[] {
  return venues.filter(v => v.departementCode === code);
}

import { Chateau, TypeEvenement, Testimonial, ChiffreCle } from "@/types";

// URLs des images - Supabase en production, local en dev
const IMAGES_BASE = "/Users/avidanbenichay/Documents/Mes Projets d'apps/Mes projets/SELECT CHATEAUX/SITE-WEB/IMAGES";
const SUPABASE_URL = "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images";

// Mapping des dossiers locaux vers Supabase
const FOLDER_MAPPING: Record<string, string> = {
  "Abbaye des Veaux de cernay": "chevreuse",
  "Chateau de Montvillargene": "montvillargene",
  "Domaine Reine Margot": "hauts-de-seine",
  "Chateau Mont Royal": "mont-royal",
};

const imgPath = (folder: string, filename: string) => {
  // En production (ou si process.env.USE_SUPABASE est true), utiliser Supabase
  if (process.env.NODE_ENV === 'production' || process.env.USE_SUPABASE === 'true') {
    const supabaseFolder = FOLDER_MAPPING[folder] || folder;
    return `${SUPABASE_URL}/${supabaseFolder}/${encodeURIComponent(filename)}`;
  }
  // En développement, utiliser les images locales
  return `/api/images/preview?path=${encodeURIComponent(`${IMAGES_BASE}/${folder}/${filename}`)}`;
};

export const chateaux: Chateau[] = [
  {
    id: "1",
    ref: "#60-CHANTILLY",
    nom: "Grand Château de style Anglo-Normand à Chantilly",
    region: "Chantilly (60)",
    capacite: {
      min: 50,
      max: 280,
    },
    styleArchitectural: "Architecture de style anglo-normand",
    description:
      "Le plus vaste domaine de la région pour conventions et kick-offs annuels. Architecture anglo-normande majestueuse au cœur d'une forêt privée, à 35 minutes de Paris. Capacité 280 personnes avec amphithéâtre et spa de prestige.",
    atouts: [
      "Capacité 280 pers",
      "120 Chambres",
      "Spa de Prestige",
      "Amphithéâtre Privé",
    ],
    images: {
      hero: [
        "/images/chateau-anglo-normand-vue-aerienne-parc-foret-chantilly.webp",
        "/images/evenement-entreprise-chateau-montvillargenne-allee-parc-arboree.webp",
        "/images/evenement-entreprise-chateau-montvillargenne-salle-pleniere-theatre.webp",
        "/images/evenement-entreprise-chateau-montvillargenne-salle-pleniere-brique.webp",
      ],
      openGraph: imgPath("Chateau de Montvillargene", "chateau-montvillargene-60-oise-chateau-montvillargene-60-oise-chateau-montvillargene-60-oise-facade-chateau-architecture-classique-francaise.webp"),
      card: imgPath("Chateau de Montvillargene", "evenement-entreprise-chateau-montvillargenne-vue-aerienne-domaine.webp"),
      galerie: [
        "/images/evenement-entreprise-chateau-montvillargenne-vue-aerienne-domaine.webp",
        "/images/evenement-entreprise-chateau-montvillargenne-terrasse-restaurant-exterieur.webp",
        "/images/evenement-entreprise-chateau-montvillargenne-salle-reunion-prestige.webp",
        "/images/evenement-entreprise-chateau-montvillargenne-salle-reunion-carte-murale.webp",
        "/images/evenement-entreprise-chateau-montvillargenne-jardin-amphitheatre-exterieur.webp",
        "/images/evenement-entreprise-chateau-montvillargenne-facade-chateau.webp",
        "/images/evenement-entreprise-chateau-montvillargenne-chambre-elegante-moderne.webp",
        "/images/evenement-entreprise-chateau-montvillargenne-chambre-prestige-rouge.webp",
        "/images/evenement-entreprise-chateau-montvillargenne-bar-lounge-chic.webp",
      ],
    },
    slug: "manoir-anglo-normand-chantilly",
    seoH1: "Grand Château de style Anglo-Normand à Chantilly",
    seoTitle: "Château Séminaire Chantilly (60) | Grand Domaine 280 pers",
    accrocheHero: "Le Plus Grand Château-Hôtel de France pour vos Séminaires — 280 Personnes, Forêt de Chantilly, à 35 min de Paris",
    descriptionLongue: "Construit entre 1911 et 1914 pour une héritière de la famille Rothschild, ce château de style anglo-normand est aujourd'hui le plus grand château-hôtel de France. Ses colombages, ses fenêtres à l'anglaise et ses toitures d'inspiration germanique se déploient sur 6 hectares de parc paysager au cœur de la forêt de Chantilly. Des terrasses en cascade, conçues à la manière d'un jardin italien, descendent vers les bois centenaires. Pour vos collaborateurs, l'effet est immédiat : dès l'arrivée dans l'allée bordée d'arbres, ils comprennent que ce séminaire ne ressemblera à aucun autre.\n\nCe qui rend ce domaine unique pour les événements d'entreprise, c'est l'unité de lieu totale sur un seul site. Plénière de 280 personnes dans une salle immersive équipée des dernières technologies, ateliers en sous-commission dans 20 salles modulables, déjeuner au restaurant avec terrasse plein sud, escape game dans les couloirs du château, dîner de gala sous les lustres, nuit en chambre avec vue sur la forêt, réveil au spa avec piscine intérieure — tout se déroule sans aucun transfert. Vos participants restent immergés dans l'expérience du premier café d'accueil au cocktail de clôture, et vous éliminez toute la logistique de transport qui complique les séminaires multi-sites.\n\nL'infrastructure est celle d'un centre de congrès, mais dans un cadre qui inspire et valorise votre événement. Trois restaurants dont un avec terrasse panoramique, un bar lounge, une serre événementielle de 300 m² nichée au cœur du parc, un spa complet et un parc de 6 hectares pour les activités outdoor. Labellisé Clef Verte pour son engagement environnemental, le domaine conjugue prestige historique et responsabilité écologique — un message fort pour les entreprises soucieuses de leur impact RSE.\n\nUne équipe événementielle dédiée vous accompagne de la première visite au dernier participant. Scénographie des salles, gestion des flux entre plénière et ateliers, menus personnalisés, programme d'activités sur mesure : chaque détail est orchestré pour que vous puissiez vous concentrer sur le contenu de votre événement, pas sur la logistique. À seulement 35 km de Paris et 25 minutes de Roissy-CDG, c'est le cadre d'exception le plus accessible d'Île-de-France pour vos conventions, kick-offs et séminaires résidentiels.",
    roomsTotal: 119,
    roomsTwin: 103,
    bedroomText: "Un séminaire résidentiel réussi commence par une nuit de sommeil réussie : Les 119 chambres et suites du domaine ont été pensées pour la récupération après des journées de travail intenses. Literie haut de gamme, isolation phonique soignée, salle de bain privative, coffre-fort et Wi-Fi haut débit — chaque chambre offre une vue sur le parc arboré ou la forêt de Chantilly. Vos collaborateurs se réveillent reposés, disponibles et motivés pour la journée suivante. Sur un séminaire de 2 ou 3 jours, cette qualité de repos fait une différence mesurable sur la concentration et l'engagement de vos équipes.\n\n103 chambres Twin — un atout budgétaire décisif : Peu de châteaux-hôtels proposent autant de chambres configurables en lits jumeaux. Avec 103 Twin disponibles, vous optimisez significativement votre budget hébergement tout en garantissant un confort identique aux chambres doubles. L'espace est généreux, chaque lit dispose de sa propre literie premium, et le partage de chambre reste parfaitement agréable. Pour les organisateurs qui doivent héberger jusqu'à 243 personnes en résidentiel, c'est une capacité rare à ce niveau de standing.\n\nLe spa comme accélérateur de cohésion : Inclus pour tous les résidents, le spa avec piscine intérieure chauffée, sauna, hammam et espace fitness n'est pas un simple bonus — c'est un levier d'engagement prouvé. Proposer à vos équipes un moment de bien-être entre deux sessions de travail crée des interactions informelles, réduit le stress accumulé et génère des souvenirs positifs durablement associés à votre événement. Certains organisateurs intègrent même des sessions de yoga ou de sophrologie matinales pour lancer la journée dans les meilleures conditions.\n\nUn cadre qui envoie un message à vos équipes : Héberger vos collaborateurs dans un château historique du début du XXe siècle, c'est leur envoyer un signal fort sur la valeur que vous accordez à cet événement — et à eux. Les blasons gravés sur la façade, les boiseries d'époque, le parc aux essences centenaires créent un environnement qui élève la perception de votre séminaire bien au-delà d'un hôtel de chaîne. Et c'est précisément cet effet « lieu d'exception » qui ancre les messages clés de votre événement dans la mémoire de vos participants.",
    meetingText: "Salle Immersive — 240 m², 280 places, 6,7 m sous plafond : La pièce maîtresse du domaine pour vos plénières, conventions et kick-offs annuels. Cette salle de congrès de 240 m² avec une hauteur sous plafond de 6,7 mètres accueille jusqu'à 280 personnes en théâtre, 160 en cocktail ou 90 en banquet. Régie audiovisuelle professionnelle, système son surround, éclairage scénique modulable — vos prises de parole prennent une ampleur que les salles de conférence classiques ne peuvent offrir. Le soir, ce même espace se transforme en salle de gala pour votre dîner événementiel.\n\nLa Serre — 300 m² au cœur du parc : Un espace polyvalent unique, niché dans les bois du domaine. Cette verrière de 300 m² accueille 250 personnes en théâtre ou 200 en cocktail dans un cadre baigné de lumière naturelle et de verdure. Idéale pour les formats créatifs, les ateliers d'innovation ou les soirées à thème, elle offre une rupture totale avec les salles de réunion traditionnelles et stimule la créativité de vos équipes.\n\n18 salles d'ateliers — du boardroom au cabaret : Passer de la plénière aux sous-commissions en 3 minutes sans quitter le bâtiment — c'est le confort opérationnel qui fait la différence. Les salles complémentaires de 15 à 134 m² offrent des configurations U, école, cabaret ou boardroom. Certaines au rez-de-jardin ouvrent sur une terrasse privée pour les pauses à la belle saison. D'autres, à l'étage, proposent des tables ovales en fauteuils cuir avec vue sur le parc — parfaites pour les comités de direction. Chaque salle dispose d'un vidéoprojecteur HD, d'un écran LCD, de paperboards et d'un Wi-Fi dédié. Toutes bénéficient de lumière naturelle, un facteur prouvé de concentration en réunion.\n\nActivités de cohésion — le domaine comme terrain de jeu : Le parc de 6 hectares et la forêt de Chantilly deviennent le cadre de vos activités de team building. Escape game exclusif dans les couloirs historiques du château, rallye en 2CV à travers Chantilly, atelier crème Chantilly avec chef, dragon boat sur plan d'eau, olympiades sportives, VTT en forêt, cours d'équitation, dégustations œnologiques ou murder party en soirée. Chaque programme est conçu sur mesure selon vos objectifs — renforcer la cohésion, stimuler la créativité ou récompenser la performance. Un coordinateur événementiel dédié orchestre l'ensemble, du café d'accueil du matin à la soirée DJ.",
    meetingRooms: 21,
    faq: [
      {
        question: "Quels formats d'événements d'entreprise peut-on organiser ?",
        answer: "Tous les formats sont possibles : séminaires résidentiels de 2 à 5 jours, conventions et kick-offs annuels jusqu'à 280 personnes, journées d'étude, comités de direction, lancements de produit, soirées de gala et week-ends de team building. L'unité de lieu permet de combiner plénière, ateliers, activités de cohésion, restauration et hébergement sans aucun transfert — un gain logistique et budgétaire considérable pour l'organisateur."
      },
      {
        question: "Comment se passe l'accompagnement pour organiser notre événement ?",
        answer: "Une équipe événementielle dédiée vous accompagne de la première visite au départ du dernier participant. Votre coordinateur construit avec vous le programme détaillé : configuration des salles, timing, menus personnalisés, activités de team building, gestion des flux entre plénière et ateliers. Le jour J, il est votre interlocuteur unique sur site. Cette prise en charge complète vous libère de toute logistique pour vous concentrer sur le contenu et l'impact de votre événement."
      },
      {
        question: "Quelles activités de team building sont proposées sur site ?",
        answer: "Le domaine propose des activités exclusives liées à son cadre : escape game dans les couloirs historiques du château, rallye en 2CV à travers Chantilly et ses environs, atelier crème Chantilly avec chef pâtissier, dragon boat, VTT en forêt, olympiades sportives, cours d'équitation, dégustations œnologiques, murder party et soirées DJ. Chaque programme est personnalisé selon vos objectifs de cohésion. Le parc de 6 hectares et la forêt servent de terrain de jeu naturel."
      },
      {
        question: "Pourquoi choisir un séminaire résidentiel plutôt qu'à la journée ?",
        answer: "Le format résidentiel crée une immersion totale. Vos équipes sont coupées du quotidien, concentrées sur les objectifs du séminaire. Les moments informels — petit-déjeuner face au parc, pause au spa, dîner sous les lustres — renforcent la cohésion bien au-delà des sessions de travail. Avec 119 chambres dont 103 Twin et une capacité totale de 243 résidents, le domaine est conçu pour maximiser l'impact de vos séminaires résidentiels multi-jours."
      },
      {
        question: "Le domaine est-il accessible facilement depuis Paris ?",
        answer: "Le domaine se situe à 35 km de Paris (35 minutes par l'A1) et à 25 minutes de l'aéroport Roissy-CDG. La gare de Chantilly-Gouvieux, accessible en 23 minutes de TER depuis la Gare du Nord, est à 5 minutes en voiture. Des navettes privées sont organisables pour l'ensemble de vos participants. Un parking gratuit est disponible sur site. Le domaine est également accessible PMR."
      },
      {
        question: "Le domaine a-t-il une démarche environnementale ?",
        answer: "Oui, le domaine est labellisé Clef Verte (Green Key), la référence internationale en matière d'hébergement éco-responsable. Cette certification garantit des pratiques concrètes : gestion de l'eau et de l'énergie, tri des déchets, achats responsables et sensibilisation du personnel. Pour les entreprises engagées dans une démarche RSE, organiser un séminaire dans un lieu certifié Clef Verte renforce la cohérence entre valeurs affichées et actions réelles."
      }
    ],
  },
  {
    id: "2",
    ref: "#92-REFUGE",
    nom: "Domaine Historique de Luxe aux Portes de Paris",
    region: "Issy-les-Moulineaux (92)",
    capacite: {
      min: 80,
      max: 180,
    },
    styleArchitectural: "Bâtisse du XVIIe siècle classée Monument Historique",
    description:
      "Boutique-hôtel 5 étoiles MGallery à 2 arrêts de métro de Paris. Vue Tour Eiffel, jardin botanique 5 000 m², spa 360 m², chapelle transformée en bar à rhum et restaurant bistronomique bio. L'adresse confidentielle par excellence.",
    atouts: [
      "MGallery 5 Étoiles",
      "Vue Tour Eiffel",
      "Accessible Métro",
      "Spa 360m²",
    ],
    images: {
      hero: [
        imgPath("Domaine Reine Margot", "domaine-reine-margot-92-hauts-de-seine-facade-jour-vue-aerienne-terrasse-jardin-parasols-blancs.webp"),
        imgPath("Domaine Reine Margot", "domaine-reine-margot-92-hauts-de-seine-restaurant-verriere-structure-metallique-tables-dressees-terrasse.webp"),
        imgPath("Domaine Reine Margot", "domaine-reine-margot-92-hauts-de-seine-salle-reunion-board-bleue-bibliotheque-bois-rangements.webp"),
        imgPath("Domaine Reine Margot", "domaine-reine-margot-92-hauts-de-seine-chambre-luxe-terrasse-balcon-vue-panoramique-paris-citation.webp"),
      ],
      openGraph: imgPath("Domaine Reine Margot", "domaine-reine-margot-92-hauts-de-seine-facade-jour-vue-aerienne-terrasse-jardin-parasols-blancs.webp"),
      card: imgPath("Domaine Reine Margot", "domaine-reine-margot-92-hauts-de-seine-facade-jour-vue-aerienne-terrasse-jardin-parasols-blancs.webp"),
      galerie: [
        "/images/evenement-entreprise-reine-margot-chambre-doree.webp",
        "/images/evenement-entreprise-reine-margot-chapelle-exterieur-coucher-soleil.webp",
        "/images/evenement-entreprise-reine-margot-chapelle-lounge-interieur.webp",
        "/images/evenement-entreprise-reine-margot-espace-pause-cafe-accueil.webp",
        "/images/evenement-entreprise-reine-margot-facade-illuminee-soiree.webp",
        "/images/evenement-entreprise-reine-margot-facade-jardin-terrasse.webp",
        "/images/evenement-entreprise-reine-margot-jardin-paysager.webp",
        "/images/evenement-entreprise-reine-margot-restaurant-verriere.webp",
        "/images/evenement-entreprise-reine-margot-serre-verriere-diner.webp",
        "/images/evenement-entreprise-reine-margot-spa-piscine-interieure.webp",
      ],
    },
    slug: "hotel-historique-seminaire-paris-92",
    seoH1: "Domaine Historique de Luxe aux Portes de Paris",
    seoTitle: "Hôtel Séminaire Luxe 92 | Domaine 5★ Accessible Métro Paris",
    accrocheHero: "Boutique-Hôtel 5 Étoiles aux Portes de Paris — Chapelle Classée, Jardin du XVIIe & Vue Tour Eiffel",
    descriptionLongue: "En 1606, Marguerite de Valois — la Reine Margot — fuyait la peste qui ravageait Paris et trouvait refuge sur cette colline d'Issy-les-Moulineaux. Quatre siècles plus tard, ce domaine de 9 000 m² est devenu un boutique-hôtel 5 étoiles qui marie patrimoine historique classé et design contemporain signé Jean-Michel Wilmotte. Pour vos collaborateurs, l'arrivée est saisissante : un jardin à la française reconstitué à l'identique du XVIIe siècle, une chapelle néo-gothique classée Monument Historique ornée de 74 statues et de vitraux restaurés, et en toile de fond, la Tour Eiffel. Tout cela à 4 minutes à pied du métro.\n\nCe qui rend ce lieu unique pour les événements d'entreprise, c'est l'alliance entre l'intimité d'un boutique-hôtel de 83 chambres et la proximité immédiate de Paris. Métro ligne 12, arrêt Mairie d'Issy — vos participants arrivent en transport en commun, sans navette ni logistique de transfert. À un arrêt du Palais des Congrès Porte de Versailles, le domaine est aussi l'extension naturelle de vos salons professionnels. Vos équipes passent de la réunion au jardin botanique de 5 000 m², du déjeuner sous la verrière historique au cocktail face à la Tour Eiffel — le tout sans quitter un écrin de verdure qui fait oublier la ville.\n\nL'infrastructure événementielle offre 9 espaces modulables, de la salle de réunion classique à la serre végétale, en passant par la chapelle désacralisée transformée en bar à rhum unique au monde (400 bouteilles, 35 origines). Le restaurant bistronomique Marguerite 1606, piloté par le chef Jean-Philippe Perol, propose une cuisine végétale et locale servie sous une verrière historique ou en terrasse. Le spa de 360 m² avec piscine intérieure, hammam et soins Anne Sémonin complète l'offre.\n\nPour les entreprises qui veulent marquer les esprits sans quitter Paris, ce domaine offre un cadre impossible à reproduire : 100 arbres centenaires, 200 arbres fruitiers, un Monument Historique privatisable et une vue iconique sur la capitale. Labellisé Clef Verte, accessible PMR, avec parking, voiturier et bornes de recharge électrique — la logistique est aussi soignée que le cadre. Un coordinateur événementiel dédié orchestre chaque détail.",
    roomsTotal: 83,
    roomsTwin: 16,
    bedroomText: "83 chambres et suites de 27 à 55 m² — l'intimité d'un boutique-hôtel : Ce domaine n'est pas un hôtel de congrès anonyme. Avec seulement 83 chambres réparties entre le bâtiment historique et l'aile contemporaine, vos collaborateurs bénéficient d'un service personnalisé et d'une atmosphère intimiste qui favorise les échanges. Décoration signée Jean-Michel Wilmotte — bois naturels, tons minéraux, portraits de Marguerite de Valois — chaque chambre allie le caractère patrimonial au confort 5 étoiles.\n\nSuites avec vue Tour Eiffel : Les 3 Junior Suites Eiffel et la Suite Eiffel offrent une vue panoramique sur Paris et la Tour Eiffel depuis leur balcon privé. Idéales pour vos invités VIP ou votre comité de direction, elles créent un effet « waouh » qui valorise votre événement. La Suite Chapelle, aménagée dans l'ancienne chapelle, est un espace unique au monde pour impressionner vos clients les plus exigeants.\n\nLe Refuge de Margot — spa 360 m² : Piscine intérieure chauffée, hammam, sauna, salle de fitness et studio de yoga. 3 cabines de soins proposent des protocoles sur-mesure avec les produits Anne Sémonin. Ouvert de 7h à 22h pour tous les résidents, le spa devient un espace de décompression naturel entre vos sessions de travail — un argument qui fait la différence quand vous invitez vos équipes à un séminaire résidentiel.\n\nUn cadre qui valorise votre marque employeur : Héberger vos collaborateurs dans un domaine historique 5 étoiles avec vue sur la Tour Eiffel, c'est leur envoyer un signal fort. Le jardin du XVIIe siècle, la chapelle classée, la cuisine bistronomique — chaque détail renforce le sentiment d'appartenance et ancre les messages clés de votre événement dans la mémoire de vos participants.",
    meetingText: "9 espaces événementiels — du boardroom intimiste au cocktail de 100 personnes : Le domaine propose 9 espaces modulables adaptés à tous les formats d'événements d'entreprise. Les salons Agastache (50 m², 35 personnes en théâtre) et Mélisse (28 m², 15 personnes) accueillent réunions de direction et ateliers en sous-commission. Le Studio (50 m², 30 personnes en théâtre) offre un format polyvalent pour vos présentations.\n\nLa Serre & Le Monastic — des espaces de caractère : La Serre végétale de 40 m² baigne vos réunions créatives de lumière naturelle et de verdure — un cadre qui stimule l'innovation. Le Monastic, installé dans la chapelle néo-gothique désacralisée classée Monument Historique, est un espace de 40 m² absolument unique pour vos réunions stratégiques, ateliers d'innovation ou expériences de team building. Ce même lieu se transforme en bar à rhum le soir, avec 400 bouteilles de 35 origines guidées par un bartender expert — une expérience immersive en petits groupes de 2 à 12 personnes.\n\nÉvénements de grande envergure — restaurant et terrasse jardin : Pour vos cocktails dînatoires et soirées d'entreprise, le restaurant Marguerite 1606 (160 m², 100 personnes en cocktail, 70 en banquet) et la Terrasse Jardin (100 m², 98 personnes en cocktail) offrent des capacités généreuses dans un cadre exceptionnel. Vue Tour Eiffel, jardin à la française illuminé, verrière historique — votre événement devient un souvenir marquant pour chaque participant.\n\nActivités de cohésion dans un jardin du XVIIe siècle : Le jardin botanique de 5 000 m², avec ses 100 arbres centenaires et 200 arbres fruitiers, devient le terrain de jeu de vos activités de team building. Ateliers culinaires avec le chef, dégustations œnologiques, rallye créatif, olympiades, yoga en plein air ou murder party au crépuscule. Un coordinateur événementiel dédié conçoit votre programme sur mesure.",
    meetingRooms: 9,
    faq: [
      {
        question: "Quels types d'événements d'entreprise peut-on organiser ?",
        answer: "Le domaine accueille séminaires résidentiels, comités de direction, journées d'étude, lancements de produit, cocktails dînatoires et soirées de gala jusqu'à 180 personnes. L'intimité du boutique-hôtel (83 chambres) est idéale pour les événements exclusifs où la qualité du cadre et du service prime sur le volume. La chapelle classée Monument Historique est privatisable pour des expériences uniques."
      },
      {
        question: "Comment accéder au domaine ?",
        answer: "Le domaine est à 4 minutes à pied du métro Mairie d'Issy (ligne 12) et à un arrêt du Palais des Congrès Porte de Versailles. Aéroport d'Orly à 25 minutes, CDG à 36 minutes. Parking sur site, voiturier et bornes de recharge électrique disponibles. C'est le seul domaine historique 5 étoiles d'Île-de-France accessible directement en métro — un avantage logistique décisif."
      },
      {
        question: "Qu'est-ce que le bar à rhum dans la chapelle ?",
        answer: "Le Monastic est un speakeasy bar installé dans la Chapelle de la Solitude, une chapelle néo-gothique désacralisée du XVIIe siècle classée Monument Historique. Au milieu de 74 statues de disciples et de vitraux restaurés, un bartender expert guide votre dégustation parmi 400 bouteilles de rhum de 35 origines. Une expérience privatisable en petits groupes de 2 à 12 personnes — parfaite pour clôturer une journée de séminaire de façon mémorable."
      },
      {
        question: "Le domaine est-il adapté aux événements éco-responsables ?",
        answer: "Oui, le domaine est labellisé Clef Verte (Green Key). Le restaurant Marguerite 1606 propose une cuisine bistronomique végétale et locale. Le jardin de 5 000 m² est entretenu selon les principes du XVIIe siècle avec des espèces d'époque. Le domaine dispose de bornes de recharge électrique et favorise l'accès en transport en commun. Pour les entreprises engagées RSE, c'est un lieu en cohérence avec leurs valeurs."
      },
      {
        question: "Le spa est-il accessible pendant le séminaire ?",
        answer: "Oui, Le Refuge de Margot (360 m²) est ouvert de 7h à 22h pour tous les résidents. Piscine intérieure, hammam, sauna, salle de fitness, studio de yoga et 3 cabines de soins Anne Sémonin. Des sessions collectives (yoga matinal, sophrologie) peuvent être intégrées à votre programme de séminaire. Le spa est aussi privatisable pour vos groupes."
      },
      {
        question: "Quelle est l'offre de restauration pour nos événements ?",
        answer: "Le chef Jean-Philippe Perol propose une cuisine bistronomique végétale avec des produits locaux et de saison. Déjeuners d'affaires sous la verrière historique, dîners en terrasse face au jardin, cocktails dînatoires jusqu'à 100 personnes, brunchs dominicaux et pauses café gourmandes. Tous les régimes alimentaires sont pris en charge."
      }
    ],
  },
  {
    id: "3",
    ref: "#78-ABBAYE",
    nom: "Ancienne Abbaye Cistercienne en Vallée de Chevreuse",
    region: "Vallée de Chevreuse (78)",
    capacite: {
      min: 60,
      max: 150,
    },
    styleArchitectural: "Abbaye cistercienne monumentale du XIIe siècle",
    description:
      "Abbaye cistercienne du XIIe siècle rénovée en 2023, nichée sur 80 hectares en forêt de Rambouillet. 144 chambres, 14 salles de réunion, 6 restaurants Paris Society, spa, cinéma privé et activités nature. Déconnexion totale garantie.",
    atouts: [
      "Domaine 80 Hectares",
      "144 Chambres",
      "14 Salles de Réunion",
      "Spa & Cinéma Privé",
    ],
    images: {
      hero: [
        "/images/evenement-entreprise-abbaye-vaux-de-cernay-01-abbaye-des-vaux-de-cernay.webp",
        "/images/evenement-entreprise-abbaye-vaux-de-cernay-49-salon-saint-thibault-3.webp",
        "/images/evenement-entreprise-abbaye-vaux-de-cernay-50-salon-pivoine-ferme.webp",
        "/images/evenement-entreprise-abbaye-vaux-de-cernay-chambre-deluxe-abbaye.webp",
        "/images/evenement-entreprise-abbaye-vaux-de-cernay-54-salon-ecuries-haras-1.webp",
        "/images/evenement-entreprise-abbaye-vaux-de-cernay-59-salon-1900-haras-4.webp",
        "/images/evenement-entreprise-abbaye-vaux-de-cernay-62-espace-pause-sellerie-1.webp",
        "/images/evenement-entreprise-abbaye-vaux-de-cernay-68-activites-camion-maraicher.webp",
        "/images/evenement-entreprise-abbaye-vaux-de-cernay-bettys-bar-ferme.webp",
        "/images/evenement-entreprise-abbaye-vaux-de-cernay-chambre-cottage-ferme.webp",
        "/images/evenement-entreprise-abbaye-vaux-de-cernay-53-salon-orangerie-haras-2.webp",
        "/images/evenement-entreprise-abbaye-vaux-de-cernay-chambre-deluxe-ferme.webp",
        "/images/evenement-entreprise-abbaye-vaux-de-cernay-chambre-superieure-abbaye-2.webp",
      ],
      openGraph: "/images/evenement-entreprise-abbaye-vaux-de-cernay-01-abbaye-des-vaux-de-cernay.webp",
      card: "/images/evenement-entreprise-abbaye-vaux-de-cernay-01-abbaye-des-vaux-de-cernay.webp",
      galerie: [
        imgPath("Abbaye des Veaux de cernay", "abbaye-vaux-cernay-78-yvelines-abbaye-vaux-cernay-78-yvelines-abbaye-vaux-cernay-78-yvelines-chambre-luxe-combles-papier-peint-fleuri.webp"),
        imgPath("Abbaye des Veaux de cernay", "abbaye-vaux-cernay-78-yvelines-abbaye-vaux-cernay-78-yvelines-abbaye-vaux-cernay-78-yvelines-cottage-dependance-brique-parc.webp"),
        imgPath("Abbaye des Veaux de cernay", "abbaye-vaux-cernay-78-yvelines-abbaye-vaux-cernay-78-yvelines-abbaye-vaux-cernay-78-yvelines-facade-batiment-principal-pierre-arbres.webp"),
        imgPath("Abbaye des Veaux de cernay", "abbaye-vaux-cernay-78-yvelines-abbaye-vaux-cernay-78-yvelines-abbaye-vaux-cernay-78-yvelines-hall-reception-voutes-gothiques-colonnes.webp"),
        imgPath("Abbaye des Veaux de cernay", "abbaye-vaux-cernay-78-yvelines-abbaye-vaux-cernay-78-yvelines-abbaye-vaux-cernay-78-yvelines-pavillon-spa-bien-etre-charpente-transats.webp"),
        imgPath("Abbaye des Veaux de cernay", "abbaye-vaux-cernay-78-yvelines-abbaye-vaux-cernay-78-yvelines-abbaye-vaux-cernay-78-yvelines-salle-seminaire-murs-oranges.webp"),
        imgPath("Abbaye des Veaux de cernay", "abbaye-vaux-cernay-78-yvelines-abbaye-vaux-cernay-78-yvelines-abbaye-vaux-cernay-78-yvelines-salle-seminaire-verriere-charpente-verte.webp"),
      ],
    },
    slug: "abbaye-millenaire-vallee-chevreuse",
    seoH1: "Ancienne Abbaye Cistercienne en Vallée de Chevreuse",
    seoTitle: "Abbaye Séminaire 78 | Domaine Cistercien & Étang 70ha",
    accrocheHero: "Abbaye Cistercienne du XIIe Siècle sur 80 Hectares — 144 Chambres, 14 Salles, à 45 min de Paris",
    descriptionLongue: "Fondée en 1118 par des moines de l'ordre de Savigny, puis rattachée à Cîteaux en 1147 dans la filiation de Clairvaux, cette abbaye est l'un des plus anciens sites monastiques d'Île-de-France. C'est ici que Saint Louis rencontra l'abbé Thibaut de Marly au XIIIe siècle. Neuf siècles plus tard, classé Monument Historique, le domaine de 80 hectares a été entièrement rénové en 2023 avec un décor signé Cordélia de Castellane et une offre gastronomique par Paris Society. Pour vos collaborateurs, l'arrivée est un choc visuel : des ruines médiévales majestueuses, un lac miroir, des forêts centenaires et des bâtiments conventuels transformés en hôtel de caractère.\n\nCe qui rend ce domaine exceptionnel pour les événements d'entreprise, c'est l'immersion totale. À 45 minutes de Paris, vos équipes sont coupées du quotidien et plongées dans un cadre qui n'a aucun équivalent — pas un château, pas un hôtel, mais une abbaye millénaire au cœur de 80 hectares de forêt et d'étangs. L'effet de déconnexion est immédiat et amplifie considérablement l'impact de votre séminaire. Les participants ne sont pas dans une salle de réunion : ils sont dans le réfectoire des moines, sous des voûtes du XIIe siècle.\n\nL'infrastructure est à la hauteur du cadre : 144 chambres et suites réparties dans 3 bâtiments, 14 espaces de réunion équipés dont le majestueux Réfectoire des Moines, un cinéma privatif de 48 places, 6 restaurants et bars signés Paris Society, et un spa d'exception installé dans les anciennes écuries. Le domaine offre aussi un éventail d'activités unique : tennis, padel, VTT, barques sur le lac, salle d'arcade, karaoké, blind test et cinéma — de quoi construire un programme de cohésion complet sans jamais quitter le site.\n\nUne équipe événementielle dédiée orchestre votre séminaire de A à Z. Configuration des salles médiévales, menus gastronomiques personnalisés, programme d'activités sur mesure, gestion des flux entre plénière et ateliers : chaque détail est anticipé dans un lieu où l'histoire et le service 5 étoiles se conjuguent pour créer des événements inoubliables.",
    roomsTotal: 144,
    roomsTwin: null,
    bedroomText: "144 chambres et suites dans un écrin médiéval : Réparties dans 3 bâtiments au cœur du domaine, les chambres et suites ont été entièrement repensées lors de la rénovation de 2023. Le décor, signé Cordélia de Castellane, s'inspire de l'histoire du lieu — pierres apparentes, boiseries, teintes naturelles — tout en offrant un confort contemporain. Chaque chambre dispose d'une vue sur le parc, les ruines médiévales ou la forêt environnante. Wi-Fi haut débit, literie premium et isolation phonique soignée garantissent un repos optimal.\n\nUn hébergement qui amplifie l'expérience séminaire : Ce qui distingue cet hébergement d'un hôtel classique, c'est l'effet d'immersion. Vos collaborateurs ne dorment pas dans une chambre d'hôtel — ils séjournent dans une abbaye cistercienne de 900 ans, au milieu d'une forêt de 80 hectares. Le matin, ils se réveillent face aux ruines médiévales et au lac. Cette rupture totale avec le quotidien renforce la concentration, la disponibilité et l'engagement de vos équipes pendant les sessions de travail.\n\nSpa d'exception dans les anciennes écuries : Le spa, installé dans les écuries historiques restaurées, offre un cadre unique pour la détente entre les sessions de travail. Un moment de bien-être dans un lieu de caractère qui renforce la cohésion d'équipe et crée des souvenirs positifs associés à votre événement. Certains organisateurs intègrent un créneau spa ou des sessions de yoga dans les jardins du cloître comme partie intégrante de leur programme.\n\n6 restaurants et bars par Paris Society : La restauration est à la hauteur du lieu. 6 espaces de restauration et bars, chacun avec sa propre identité, permettent de varier les expériences — du déjeuner d'affaires sous les voûtes au dîner de gala dans le réfectoire des moines, en passant par un cocktail au bord du lac. Une qualité gastronomique signée Paris Society qui élève chaque repas au rang d'expérience.",
    meetingText: "Le Réfectoire des Moines — votre plénière sous des voûtes du XIIe siècle : Imaginez vos prises de parole les plus importantes sous les voûtes monumentales où des moines cisterciens partageaient leurs repas il y a 900 ans. Le Réfectoire accueille jusqu'à 150 personnes en configuration réunion et 250 en banquet — une salle de congrès dont l'atmosphère ne peut être reproduite dans aucun centre de conférence moderne. L'impact sur vos participants est considérable : les messages délivrés dans ce cadre s'ancrent dans la mémoire.\n\nCinéma privatif 48 places & 13 salles complémentaires : Le domaine dispose d'un cinéma de 48 fauteuils, parfait pour les projections, avant-premières internes ou sessions de formation immersives. Les 13 salles complémentaires, toutes en lumière naturelle, permettent de passer de la plénière aux ateliers sans quitter le domaine. Équipements audiovisuels professionnels dans chaque espace.\n\nUn terrain de jeu de 80 hectares pour la cohésion : Le domaine offre un éventail d'activités sans équivalent pour le team building : tennis, padel, VTT en forêt, barques sur le lac, salle d'arcade rétro, karaoké, blind test, cinéma et soirées thématiques. Chaque activité exploite le cadre exceptionnel — des olympiades dans le parc aux rallyes en forêt, en passant par des ateliers créatifs dans les espaces conventuels. Un programme de cohésion complet sans jamais quitter le site.\n\nUn cadre qui transforme votre événement en moment fondateur : Ce qui distingue un séminaire dans cette abbaye de tout autre lieu, c'est la force du cadre. Les ruines médiévales, le lac, la forêt centenaire, les voûtes du XIIe siècle — ce patrimoine unique crée une émotion collective qui dépasse largement le contenu des présentations. Vos collaborateurs repartent avec le sentiment d'avoir vécu quelque chose d'exceptionnel, et c'est précisément ce qui fait qu'un séminaire marque durablement les esprits et renforce la culture d'entreprise.",
    meetingRooms: 14,
    faq: [
      {
        question: "Quel type d'événement d'entreprise peut-on organiser ?",
        answer: "Le domaine accueille séminaires résidentiels, conventions jusqu'à 250 personnes en banquet, journées d'étude, comités de direction, lancements de produit, soirées de gala et week-ends de team building. Avec 144 chambres, 14 espaces de réunion et 80 hectares de parc, tous les formats sont possibles — du workshop de 10 personnes à la convention de 250."
      },
      {
        question: "Comment accéder au domaine depuis Paris ?",
        answer: "Le domaine est à 45 minutes de Paris par l'A6/A10. Des navettes privées sont organisables pour vos participants depuis Paris, les gares ou les aéroports. Un parking gratuit est disponible sur site. L'isolement volontaire en forêt est un atout : vos équipes sont coupées du quotidien dès l'arrivée, ce qui maximise l'engagement pendant le séminaire."
      },
      {
        question: "Quelle est l'offre de restauration ?",
        answer: "6 restaurants et bars signés Paris Society proposent des expériences culinaires variées. Déjeuners d'affaires, dîners de gala dans le réfectoire des moines, cocktails au bord du lac, pauses café gourmandes — chaque repas est un moment de convivialité dans un cadre unique. Les menus sont entièrement personnalisables et tous les régimes alimentaires sont pris en charge."
      },
      {
        question: "Quelles activités de team building sont disponibles ?",
        answer: "Le domaine de 80 hectares offre un panel unique : tennis, padel, VTT en forêt, barques sur le lac, salle d'arcade rétro, karaoké, blind test, cinéma privatif 48 places et soirées thématiques. Des activités en plein air (olympiades, rallyes nature, yoga dans les jardins) exploitent le cadre exceptionnel. Chaque programme est conçu sur mesure selon vos objectifs de cohésion."
      },
      {
        question: "Le domaine est-il classé Monument Historique ?",
        answer: "Oui, l'abbaye est classée Monument Historique depuis 1994. Fondée en 1118, c'est l'une des plus anciennes abbayes cisterciennes d'Île-de-France. Les éléments patrimoniaux — réfectoire des moines, voûtes médiévales, ruines, lac — sont préservés et intégrés à l'expérience hôtelière. La rénovation complète de 2023 (décor Cordélia de Castellane, gastronomie Paris Society) allie patrimoine millénaire et standards de confort contemporains."
      },
      {
        question: "Quelle est la capacité du Réfectoire des Moines ?",
        answer: "Le Réfectoire des Moines, l'espace de plénière principal, accueille jusqu'à 150 personnes en configuration réunion et 250 en banquet. Ses voûtes médiévales et ses dimensions majestueuses en font un lieu de présentation qui amplifie vos prises de parole. Le soir, il se transforme en salle de gala pour vos dîners événementiels."
      }
    ],
  },
  {
    id: "4",
    ref: "#60-BELVEDERE",
    nom: "Château 5 Étoiles avec Vue Panoramique sur Forêt",
    region: "Chantilly (60)",
    capacite: {
      min: 100,
      max: 200,
    },
    styleArchitectural: "Architecture classique française de style Louis XV",
    description:
      "Château InterContinental 5 étoiles au cœur de la forêt de Chantilly, à 15 min de Roissy-CDG. Centre de convention 700 m², 109 chambres, spa avec piscine et jacuzzi, rooftop panoramique. Labellisé Green Key.",
    atouts: [
      "InterContinental 5★",
      "Centre Convention 700m²",
      "15 min Roissy-CDG",
      "Spa & Rooftop",
    ],
    images: {
      hero: [
        imgPath("Chateau Mont Royal", "evenement-entreprise-tiara-mont-royal-chantilly-terrasse-exterieure.webp"),
        imgPath("Chateau Mont Royal", "chateau-mont-royal-60-oise-chantilly-facade-exterieur-chateau-pierre-terrasse-parasols-parc.webp"),
        imgPath("Chateau Mont Royal", "chateau-mont-royal-60-oise-chantilly-salle-reunion-board-u-rectangulaire-chaises-beiges-ecran.webp"),
        "/images/evenement-entreprise-tiara-mont-royal-chantilly-chambre-premium-terrasse.webp",
      ],
      openGraph: imgPath("Chateau Mont Royal", "chateau-mont-royal-60-oise-chantilly-vue-aerienne-chateau-lever-soleil-foret-architecture-classique.webp"),
      card: imgPath("Chateau Mont Royal", "evenement-entreprise-tiara-mont-royal-chantilly-terrasse-exterieure.webp"),
      galerie: [
        "/images/evenement-entreprise-tiara-mont-royal-chantilly-chateau-facade.webp",
        "/images/evenement-entreprise-tiara-mont-royal-chantilly-terrasse-exterieure.webp",
        "/images/evenement-entreprise-tiara-mont-royal-chantilly-suite-royale-2.webp",
        "/images/evenement-entreprise-tiara-mont-royal-chantilly-salle-vivaldi.webp",
        "/images/evenement-entreprise-tiara-mont-royal-chantilly-salle-pleniere-halphen.webp",
        "/images/evenement-entreprise-tiara-mont-royal-chantilly-salle-de-bain.webp",
        "/images/evenement-entreprise-tiara-mont-royal-chantilly-salle-callas.webp",
        "/images/evenement-entreprise-tiara-mont-royal-chantilly-restaurant-opera.webp",
        "/images/evenement-entreprise-tiara-mont-royal-chantilly-piscine-interieure.webp",
        "/images/evenement-entreprise-tiara-mont-royal-chantilly-cabines-de-soin-spa.webp",
        "/images/evenement-entreprise-tiara-mont-royal-chantilly-bar-stradivarius.webp",
      ],
    },
    slug: "palais-royal-foret-chantilly",
    seoH1: "Château 5 Étoiles avec Vue Panoramique sur Forêt",
    seoTitle: "Château Luxe Chantilly (60) | Domaine 5★ Forêt 200 pers",
    accrocheHero: "Palace 5 Étoiles en Forêt de Chantilly — 12 Salons jusqu'à 250 Personnes, Spa & Restaurant, à 15 min de CDG",
    descriptionLongue: "Construit entre 1907 et 1911 par le compositeur Fernand Halphen pour offrir à son épouse « une vue qui l'enchantait », ce château de style Louis XVI est un hymne à la musique et à la beauté. Façade classique ornée de bas-reliefs du sculpteur Georges Gardet, intérieurs baignés de lumière naturelle à travers la canopée de la forêt de Chantilly — chaque détail architectural a été pensé comme une partition. Aujourd'hui palace 5 étoiles, il conserve l'âme de son créateur : les salons portent les noms de grands compositeurs, le restaurant est installé dans l'ancien salon de musique, et le bar occupe l'ancienne bibliothèque du château.\n\nCe qui distingue ce palace pour les événements d'entreprise, c'est la combinaison unique entre le standing 5 étoiles d'un grand hôtel international et l'intimité d'un château privé de 109 chambres en pleine forêt. Le centre de conférences de 700 m² réunit 12 salons équipés autour d'un patio central où s'organisent pauses café, cocktails et déjeuners en terrasse. La salle plénière de 380 m² accueille jusqu'à 250 personnes en théâtre ou 300 en cocktail — avec une hauteur sous plafond et une lumière naturelle qui donnent de l'ampleur à chaque prise de parole.\n\nL'emplacement est un atout stratégique majeur : à seulement 15 minutes de l'aéroport Roissy-CDG et 40 minutes de Paris, ce palace est le point de rendez-vous idéal pour les séminaires internationaux. Vos participants atterrissent, arrivent au château en 15 minutes et se retrouvent immergés dans un parc forestier — la transition entre l'aéroport et l'événement est instantanée. Le spa Biologique Recherche avec piscine intérieure, le restaurant gastronomique L'Opéra sous ses lustres majestueux, le bar Le Stradivarius dans l'ancienne bibliothèque et le court de tennis complètent un cadre qui conjugue productivité et art de vivre.\n\nLabellisé Clef Verte, le palace s'engage dans une démarche environnementale concrète. Une équipe événementielle dédiée vous accompagne de la conception à l'exécution — chaque séminaire est orchestré avec la précision d'un service de palace et la flexibilité d'un partenaire qui connaît les exigences des organisateurs d'événements d'entreprise.",
    roomsTotal: 109,
    roomsTwin: 48,
    bedroomText: "109 chambres et suites baignées de lumière forestière : Chaque chambre offre une vue sur la canopée de la forêt de Chantilly à travers de grandes fenêtres. Certaines disposent de balcons ou terrasses privés pour profiter du cadre forestier. Décoration élégante dans l'esprit du château — bois nobles, teintes naturelles, literie premium — avec tout le confort d'un palace 5 étoiles : Wi-Fi haut débit, coffre-fort, minibar, room service.\n\n48 chambres Twin — un format pensé pour les séminaires : Près de la moitié des chambres sont configurables en Twin, un ratio idéal pour les événements d'entreprise où le partage de chambre permet d'optimiser le budget hébergement. Chaque lit dispose de sa propre literie haut de gamme, et l'espace généreux des chambres garantit un confort de partage agréable. Pour les séminaires internationaux accueillant des participants arrivant de CDG, c'est une solution pratique et élégante.\n\nSpa Biologique Recherche — la référence du soin premium : Le spa du palace utilise les produits Biologique Recherche, marque de référence dans le soin haut de gamme. Piscine intérieure chauffée, jacuzzi, sauna et salle de fitness avec vue sur la forêt. Des protocoles de soins personnalisés et des séances collectives (yoga, stretching) peuvent être intégrés à votre programme de séminaire pour alterner productivité et bien-être.\n\nUn château de compositeur comme cadre de travail : Séjourner dans le château que Fernand Halphen a construit par amour de la musique, c'est offrir à vos collaborateurs un cadre qui élève l'ordinaire. Le restaurant L'Opéra dans l'ancien salon de musique, le bar Le Stradivarius dans l'ancienne bibliothèque avec ses boiseries et sa cheminée — chaque espace raconte une histoire. C'est cette atmosphère qui transforme un simple séminaire en une expérience que vos équipes n'oublieront pas.",
    meetingText: "Salle Halphen — 380 m², 250 places, le cœur de vos plénières : Nommée en hommage au compositeur qui bâtit ce château, la salle Halphen est le joyau du centre de conférences. 380 m² de surface, 250 personnes en théâtre, 150 en classe, 180 en banquet ou 300 en cocktail — avec lumière naturelle et vue sur la forêt. Divisible en deux espaces autonomes (Halphen 1 et 2), elle s'adapte à vos plénières le matin et à votre dîner de gala le soir. Régie audiovisuelle professionnelle, système son, éclairage modulable.\n\n11 salons aux noms de compositeurs — du Vivaldi au Berlioz : Autour du patio central, 11 salons complémentaires (de 33 à 108 m²) portent les noms des plus grands compositeurs : Callas, Caruso, Vivaldi, Debussy, Chopin, Berlioz, Sibelius, Symphonie... Chaque salon est équipé en audiovisuel professionnel et bénéficie de lumière naturelle. Les configurations U, classe, théâtre ou boardroom permettent de passer de la plénière aux ateliers en quelques minutes. Le Creativity Room (52 m²) est spécialement conçu pour les sessions de brainstorming et de design thinking.\n\nLe patio — vos pauses café entre forêt et château : Ce qui rend ce centre de conférences unique, c'est l'organisation autour d'un patio central où s'organisent naturellement les pauses café, les cocktails déjeunatoires et les échanges informels. Deux grandes terrasses face à la forêt complètent cet espace de respiration. Vos participants alternent entre sessions de travail concentrées et moments de networking dans un cadre qui stimule les conversations — un atout que les centres de congrès urbains ne peuvent pas offrir.\n\nActivités & cohésion au cœur de la forêt de Chantilly : Ateliers culinaires avec chef, dégustations œnologiques, activités équestres, tennis, pétanque, VTT en forêt et randonnées dans les allées de Chantilly. Le cadre forestier du domaine permet aussi des formats créatifs en plein air — réunions sous les arbres, workshops en terrasse, sessions de réflexion en marchant. Un coordinateur événementiel dédié conçoit votre programme sur mesure, du café d'accueil à la soirée de clôture.",
    meetingRooms: 12,
    faq: [
      {
        question: "Pourquoi ce palace est-il idéal pour les séminaires internationaux ?",
        answer: "À seulement 15 minutes de l'aéroport Roissy-CDG et 40 minutes de Paris, ce palace est le point de rendez-vous le plus pratique d'Île-de-France pour les événements réunissant des participants internationaux. La navette aéroport est organisable sur demande. Le centre de conférences de 700 m² avec salle plénière de 250 places et 11 salons complémentaires offre une infrastructure professionnelle complète dans un cadre de château en forêt."
      },
      {
        question: "Quelle est l'histoire musicale du château ?",
        answer: "Le château a été construit entre 1907 et 1911 par le compositeur Fernand Halphen, qui voulait offrir à son épouse « une vue qui l'enchantait ». L'architecture Louis XVI est ornée de bas-reliefs du sculpteur Georges Gardet. L'héritage musical est omniprésent : les salons portent les noms de compositeurs (Chopin, Debussy, Vivaldi, Callas, Caruso...), le restaurant L'Opéra occupe l'ancien salon de musique et le bar Le Stradivarius l'ancienne bibliothèque."
      },
      {
        question: "Quelles activités de team building sont proposées ?",
        answer: "Le cadre forestier de Chantilly permet des ateliers culinaires avec chef, dégustations œnologiques, activités équestres, tennis, pétanque, VTT en forêt et randonnées. Des formats créatifs en plein air sont possibles : workshops en terrasse, brainstorming dans le Creativity Room, sessions de réflexion en marchant dans le parc. Un coordinateur événementiel dédié conçoit votre programme sur mesure."
      },
      {
        question: "Le palace a-t-il une démarche environnementale ?",
        answer: "Oui, le palace est labellisé Clef Verte (Green Key), la référence internationale en hébergement éco-responsable. Cette certification garantit des pratiques concrètes en gestion de l'eau, de l'énergie et des déchets. Pour les entreprises engagées RSE, organiser un séminaire dans un établissement certifié renforce la cohérence entre valeurs et actions."
      },
      {
        question: "Quelles sont les options de restauration ?",
        answer: "L'Opéra, restaurant gastronomique installé dans l'ancien salon de musique sous des lustres majestueux, propose une cuisine française contemporaine. Le Stradivarius, bar installé dans l'ancienne bibliothèque du château avec boiseries et cheminée, sert cocktails et produits locaux en terrasse face à la forêt. Déjeuners d'affaires, dîners de gala jusqu'à 180 en banquet, cocktails jusqu'à 300 personnes et brunchs dominicaux sont personnalisables."
      },
      {
        question: "Le centre de conférences dispose-t-il de lumière naturelle ?",
        answer: "Oui, les 12 salons du centre de conférences de 700 m² bénéficient tous de lumière naturelle et de vues sur la forêt de Chantilly. Ils sont organisés autour d'un patio central avec deux grandes terrasses, créant un flux naturel entre les sessions de travail et les pauses. Tous les espaces sont climatisés et équipés en audiovisuel professionnel."
      }
    ],
  },
];

export const typesEvenements: TypeEvenement[] = [
  {
    id: "seminaire",
    titre: "Séminaire Résidentiel",
    description:
      "Organisez vos séminaires stratégiques dans un cadre d'exception. Salles de réunion équipées, hébergement premium et restauration gastronomique pour fédérer vos équipes.",
    icon: "presentation",
    servicesInclus: [
      "Salles de réunion modulables",
      "Équipements audiovisuels professionnels",
      "Hébergement en chambres premium",
      "Restauration gastronomique 3 repas/jour",
      "Animations team-building sur mesure",
      "Service de conciergerie dédié",
    ],
    image: imgPath("Chateau de Montvillargene", "chateau-montvillargene-60-oise-chateau-montvillargene-60-oise-chateau-montvillargene-60-oise-j&f-4-copie.webp"),
  },
  {
    id: "journee-etude",
    titre: "Journée d'Étude",
    description:
      "Un environnement propice à la réflexion et à la concentration. Espaces de travail intimistes, pauses raffinées et cadre inspirant pour vos sessions stratégiques.",
    icon: "book-open",
    servicesInclus: [
      "Espace de travail avec lumière naturelle",
      "Matériel de présentation haute définition",
      "Pauses café et déjeuner gastronomique",
      "Bibliothèque et espaces calmes",
      "Support technique permanent",
      "Parking privé sécurisé",
    ],
    image: imgPath("Chateau Mont Royal", "chateau-mont-royal-60-oise-chantilly-salle-reunion-board-u-rectangulaire-chaises-beiges-ecran.webp"),
  },
  {
    id: "soiree-entreprise",
    titre: "Soirée d'Entreprise",
    description:
      "Célébrez vos succès dans un cadre prestigieux. Cocktails raffinés, dîners gastronomiques et animations exclusives pour marquer les esprits de vos collaborateurs et partenaires.",
    icon: "champagne",
    servicesInclus: [
      "Cocktail de réception avec champagne",
      "Dîner gastronomique personnalisé",
      "DJ et animations sur mesure",
      "Éclairages et décoration d'ambiance",
      "Service traiteur étoilé",
      "Photographe professionnel",
    ],
    image: "/images/evenement-entreprise-chateau-montvillargenne-salle-pleniere-theatre.webp",
  },
  {
    id: "team-building",
    titre: "Team Building",
    description:
      "Renforcez la cohésion de vos équipes à travers des activités ludiques et immersives. Nos domaines offrent un terrain de jeu exceptionnel pour des challenges mémorables.",
    icon: "users",
    servicesInclus: [
      "Activités outdoor dans les parcs",
      "Ateliers culinaires avec chef",
      "Chasse au trésor dans le château",
      "Dégustations de vins commentées",
      "Parcours aventure et sports",
      "Coaching et débriefing professionnel",
    ],
    image: "/images/team-building-chateau-activites-entreprise.webp",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "1",
    nom: "Sophie Moreau",
    entreprise: "TechVision France",
    poste: "Directrice des Ressources Humaines",
    contenu:
      "Ce domaine a transformé notre séminaire annuel en une expérience inoubliable. Le cadre exceptionnel et le service impeccable ont permis à nos équipes de renforcer leur cohésion.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=80",
    note: 5,
  },
  {
    id: "2",
    nom: "Mamadou Diallo",
    entreprise: "Groupe InnovBank",
    poste: "Directeur Général",
    contenu:
      "Une convention annuelle mémorable dans ce refuge historique. Infrastructure moderne et prestige du lieu ont impressionné nos 180 collaborateurs. L'équipe sur place s'est montrée d'une réactivité remarquable.",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80",
    note: 5,
  },
  {
    id: "3",
    nom: "Isabelle Laurent",
    entreprise: "Creative Solutions",
    poste: "Chef de Projet Événementiel",
    contenu:
      "Un cadre magique pour nos événements clients. La restauration exceptionnelle et l'attention aux détails font toute la différence. Nos clients repartent toujours enchantés.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&auto=format&fit=crop&q=80",
    note: 5,
  },
  {
    id: "4",
    nom: "Thomas Beaumont",
    entreprise: "Luxe Consulting Group",
    poste: "Associé Fondateur",
    contenu:
      "Un lieu qui reflète nos valeurs d'excellence. Cette abbaye cistercienne a dépassé toutes nos attentes pour notre gala annuel. L'authenticité médiévale combinée au luxe contemporain crée une ambiance unique.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80",
    note: 5,
  },
  {
    id: "5",
    nom: "Leïla Benali",
    entreprise: "Airbus Group",
    poste: "Responsable Événementiel International",
    contenu:
      "Des conventions internationales réussies dans ce grand domaine de Chantilly. Les infrastructures sont de niveau international et le cadre forestier offre une déconnexion bienvenue.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80",
    note: 5,
  },
  {
    id: "6",
    nom: "Rachid El Fassi",
    entreprise: "BNP Paribas Asset Management",
    poste: "Directeur de la Stratégie",
    contenu:
      "Une discrétion rare pour nos réunions stratégiques. L'accessibilité et le jardin suspendu créent une bulle hors du temps en plein cœur de la région parisienne.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
    note: 5,
  },
  {
    id: "7",
    nom: "Valérie Rousseau",
    entreprise: "L'Oréal Paris",
    poste: "VP Marketing Europe",
    contenu:
      "Cette abbaye cistercienne a offert un effet 'wow' garanti pour notre lancement produit. Les salles voûtées ont apporté une dimension spectaculaire à notre événement. Un succès retentissant.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80",
    note: 5,
  },
  {
    id: "8",
    nom: "Antoine Chevalier",
    entreprise: "Mercedes-Benz France",
    poste: "Directeur Commercial",
    contenu:
      "Un lieu à la hauteur de notre image de marque. Ce domaine a été parfait pour notre convention. Le parc nous a permis d'organiser des essais privés dans un cadre somptueux.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80",
    note: 5,
  },
  {
    id: "9",
    nom: "Aminata Touré",
    entreprise: "Orange Business Services",
    poste: "Chief Innovation Officer",
    contenu:
      "Un environnement inspirant pour notre séminaire d'innovation. L'architecture historique mêlée aux équipements modernes a créé le parfait équilibre entre tradition et innovation.",
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=300&auto=format&fit=crop&q=80",
    note: 5,
  },
  {
    id: "10",
    nom: "François Legrand",
    entreprise: "LVMH Corporate",
    poste: "Directeur des Affaires Publiques",
    contenu:
      "Ce domaine incarne nos valeurs : patrimoine, excellence et raffinement. Nos partenaires institutionnels ont été conquis par l'authenticité du lieu et la qualité du service.",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&auto=format&fit=crop&q=80",
    note: 5,
  },
  {
    id: "12",
    nom: "Laurent Deschamps",
    entreprise: "Danone Groupe",
    poste: "VP Human Resources",
    contenu:
      "Un team-building qui a dépassé nos espérances. Les activités sur l'étang et dans le parc ont renforcé la cohésion de nos équipes de direction. Un moment authentique et fédérateur.",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=300&auto=format&fit=crop&q=80",
    note: 5,
  },
];

export const chiffresCles: ChiffreCle[] = [
  {
    valeur: 15,
    label: "Années d'expérience",
    suffix: "ans",
  },
  {
    valeur: 4,
    label: "Lieux d'exception",
  },
  {
    valeur: 500,
    unite: "+",
    label: "Événements organisés",
  },
  {
    valeur: 98,
    suffix: "%",
    label: "Clients satisfaits",
  },
];

// Logos clients (grandes entreprises réelles) - Vrais logos officiels avec couleurs
export const clientLogos = [
  { nom: "Microsoft", url: "/logos/microsoft.svg" },
  { nom: "Amazon", url: "/logos/amazon.svg" },
  { nom: "Apple", url: "/logos/apple.svg" },
  { nom: "Mercedes-Benz", url: "/logos/mercedes-benz.svg" },
  { nom: "Airbus", url: "/logos/airbus.svg" },
  { nom: "L'Oréal", url: "/logos/loreal.svg" },
  { nom: "Orange", url: "/logos/orange.svg" },
  { nom: "BNP Paribas", url: "/logos/bnp-paribas.svg" },
  { nom: "LVMH", url: "/logos/lvmh.svg" },
  { nom: "Danone", url: "/logos/danone.svg" },
];

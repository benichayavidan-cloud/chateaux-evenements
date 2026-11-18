// Chemins relatifs avec extension : ce fichier est aussi lu par node (tests, rapport de build).
import type { Chateau, TypeEvenement, Testimonial, ChiffreCle } from "../types/index.ts";
import { chateauImage as imgPath } from "../lib/media.ts";
import { aligneChiffres } from "../lib/fiche-chateau.ts";

const fiches: Chateau[] = [
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
        imgPath("Manoir Chantilly", "seminaire-chateau-chantilly-facade-lierre-colombages.webp"),
        "/images/seminaire-chateau-chantilly-allee-parc-arboree.webp",
        "/images/seminaire-chateau-chantilly-salle-pleniere-theatre.webp",
        "/images/seminaire-chateau-chantilly-salle-pleniere-brique.webp",
      ],
      openGraph: imgPath("Manoir Chantilly", "seminaire-chateau-chantilly-facade-anglo-normande.webp"),
      card: imgPath("Manoir Chantilly", "seminaire-chateau-chantilly-vue-aerienne-domaine.webp"),
      galerie: [
        "/images/seminaire-chateau-chantilly-vue-aerienne-domaine.webp",
        "/images/seminaire-chateau-chantilly-terrasse-restaurant-exterieur.webp",
        "/images/seminaire-chateau-chantilly-salle-reunion-prestige.webp",
        "/images/seminaire-chateau-chantilly-salle-reunion-carte-murale.webp",
        "/images/seminaire-chateau-chantilly-jardin-amphitheatre-exterieur.webp",
        "/images/seminaire-chateau-chantilly-facade-chateau.webp",
        "/images/seminaire-chateau-chantilly-chambre-elegante-moderne.webp",
        "/images/seminaire-chateau-chantilly-chambre-prestige-rouge.webp",
        "/images/seminaire-chateau-chantilly-bar-lounge-chic.webp",
      ],
    },
    slug: "manoir-anglo-normand-chantilly",
    seoH1: "Grand Château de style Anglo-Normand à Chantilly",
    titreFiche: { motCle: "Séminaire au vert dans un château en forêt de Chantilly", lieu: "Grand Château de style Anglo-Normand" },
    trajet: "à 35 min de Paris",
    seoTitle: "Séminaire au vert à Chantilly | Château {chambres} chambres",
    seoDescription: "Séminaire résidentiel dans un château anglo-normand en forêt de Chantilly : plénière de {capacite} places, {salles} salles, {chambres} chambres. Devis sous 24 h.",
    accrocheHero: "Le Plus Grand Château-Hôtel de France pour vos Séminaires — 280 Personnes, Forêt de Chantilly, à 35 min de Paris",
    descriptionLongue: "Construit au début du XXe siècle pour une grande famille de banquiers, ce château de style anglo-normand est aujourd'hui le plus grand château-hôtel de France. Ses colombages, ses fenêtres à l'anglaise et ses toitures d'inspiration germanique se déploient sur 6 hectares de parc paysager au cœur de la forêt de Chantilly. Des terrasses en cascade, conçues à la manière d'un jardin italien, descendent vers les bois centenaires. Pour vos collaborateurs, l'effet est immédiat : dès l'arrivée dans l'allée bordée d'arbres, ils comprennent que ce séminaire ne ressemblera à aucun autre.\n\nCe qui rend ce domaine unique pour les événements d'entreprise, c'est l'unité de lieu totale sur un seul site. Plénière de 280 personnes dans une salle immersive équipée des dernières technologies, ateliers en sous-commission dans 18 salles modulables (21 salles au total), déjeuner au restaurant avec terrasse plein sud, dîner de gala sous les lustres, nuit en chambre avec vue sur la forêt, réveil au spa avec piscine intérieure — tout se déroule sans aucun transfert. Vos participants restent immergés dans l'expérience du premier café d'accueil au cocktail de clôture, et vous éliminez toute la logistique de transport qui complique les séminaires multi-sites.\n\nL'infrastructure est celle d'un centre de congrès, mais dans un cadre qui inspire et valorise votre événement. Trois restaurants dont un avec terrasse panoramique, un bar lounge, une serre événementielle de 300 m² nichée au cœur du parc, un spa complet et un parc de 6 hectares pour les activités outdoor. Labellisé Clef Verte pour son engagement environnemental, le domaine conjugue prestige historique et responsabilité écologique — un message fort pour les entreprises soucieuses de leur impact RSE.\n\nUne équipe événementielle dédiée vous accompagne de la première visite au dernier participant. Scénographie des salles, gestion des flux entre plénière et ateliers, menus personnalisés, programme d'activités sur mesure : chaque détail est orchestré pour que vous puissiez vous concentrer sur le contenu de votre événement, pas sur la logistique. À seulement 35 km de Paris et 25 minutes de Roissy-CDG, c'est le cadre d'exception le plus accessible d'Île-de-France pour vos conventions, kick-offs et séminaires résidentiels.",
    roomsTotal: 119, // 110 chambres + 9 suites (fiche technique officielle, 16/11/2026)
    roomsTwin: 103,
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
        answer: "Le domaine propose des activités exclusives liées à son cadre : rallye en 2CV à travers Chantilly et ses environs, atelier crème Chantilly avec chef pâtissier, dragon boat, VTT en forêt, olympiades sportives, cours d'équitation, dégustations œnologiques et soirées DJ. Chaque programme est personnalisé selon vos objectifs de cohésion. Le parc de 6 hectares et la forêt servent de terrain de jeu naturel."
      },
      {
        question: "Pourquoi choisir un séminaire résidentiel plutôt qu'à la journée ?",
        answer: "Le format résidentiel crée une immersion totale. Vos équipes sont coupées du quotidien, concentrées sur les objectifs du séminaire. Les moments informels — petit-déjeuner face au parc, pause au spa, dîner sous les lustres — renforcent la cohésion bien au-delà des sessions de travail. Avec 119 chambres dont 103 Twin et une capacité totale de 243 résidents, le domaine est conçu pour maximiser l'impact de vos séminaires résidentiels multi-jours."
      },
      {
        question: "Le domaine est-il accessible facilement depuis Paris ?",
        answer: "Le domaine se situe à 35 km de Paris (35 minutes par l'A1) et à 25 minutes de l'aéroport Roissy-CDG. La gare de Chantilly, accessible en 25 minutes environ de TER depuis la Gare du Nord, est à 5 minutes en voiture. Des navettes privées sont organisables pour l'ensemble de vos participants. Un parking gratuit est disponible sur site. Le domaine est également accessible PMR."
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
    // 70 en réunion : page officielle des réunions du lieu (« jusqu'à 70 participants ») et fiche de
    // réservation officielle, relues le 18/11/2026. L'ancien « 80 à 180 » n'avait aucune source.
    // Le jardin reçoit 300 invités (cocktail, banquet) : dit dans les textes, pas dans ce champ.
    capacite: {
      min: 10,
      max: 70,
    },
    styleArchitectural: "Bâtisse du XVIIe siècle classée Monument Historique",
    description:
      "Boutique-hôtel 5 étoiles à 2 arrêts de métro de Paris. Vue Tour Eiffel, jardin de 9 500 m², spa 300 m², chapelle transformée en bar à rhum et restaurant bistronomique bio. L'adresse confidentielle par excellence.",
    atouts: [
      "Boutique-Hôtel 5 Étoiles",
      "Vue Tour Eiffel",
      "Accessible Métro",
      "Spa 300 m²",
    ],
    images: {
      hero: [
        imgPath("Hotel Paris 92", "seminaire-hotel-historique-paris-92-vue-aerienne-facade-jardin.webp"),
        imgPath("Hotel Paris 92", "seminaire-hotel-historique-paris-92-restaurant-verriere-tables-dressees.webp"),
        imgPath("Hotel Paris 92", "seminaire-hotel-historique-paris-92-salle-reunion-board-bleue.webp"),
        imgPath("Hotel Paris 92", "seminaire-hotel-historique-paris-92-chambre-luxe-terrasse-vue-paris.webp"),
      ],
      openGraph: imgPath("Hotel Paris 92", "seminaire-hotel-historique-paris-92-vue-aerienne-facade-jardin.webp"),
      card: imgPath("Hotel Paris 92", "seminaire-hotel-historique-paris-92-vue-aerienne-facade-jardin.webp"),
      galerie: [
        "/images/seminaire-hotel-historique-paris-92-chambre-doree.webp",
        "/images/seminaire-hotel-historique-paris-92-chapelle-exterieur-coucher-soleil.webp",
        "/images/seminaire-hotel-historique-paris-92-chapelle-lounge-interieur.webp",
        "/images/seminaire-hotel-historique-paris-92-espace-pause-cafe-accueil.webp",
        "/images/seminaire-hotel-historique-paris-92-facade-illuminee-soiree.webp",
        "/images/seminaire-hotel-historique-paris-92-facade-jardin-terrasse.webp",
        "/images/seminaire-hotel-historique-paris-92-jardin-paysager.webp",
        "/images/seminaire-hotel-historique-paris-92-restaurant-verriere.webp",
        "/images/seminaire-hotel-historique-paris-92-serre-verriere-diner.webp",
        "/images/seminaire-hotel-historique-paris-92-spa-piscine-interieure.webp",
      ],
    },
    slug: "hotel-historique-seminaire-paris-92",
    seoH1: "Domaine Historique de Luxe aux Portes de Paris",
    titreFiche: { motCle: "Séminaire au calme dans un jardin, aux portes de Paris", lieu: "Domaine Historique de Luxe" },
    trajet: "à 5 min à pied du métro",
    seoTitle: "Séminaire aux portes de Paris | Hôtel 5 étoiles en métro",
    seoDescription: "Votre séminaire dans un domaine du XVIIe siècle, jardin et vue tour Eiffel : {salles} espaces de réunion, {chambres} chambres, métro à 5 min à pied. Devis sous 24 h.",
    accrocheHero: "Boutique-Hôtel 5 Étoiles aux Portes de Paris — Chapelle Classée, Jardin du XVIIe & Vue Tour Eiffel",
    descriptionLongue: "Au début du XVIIe siècle, une reine de France fuyant la peste qui ravageait Paris trouvait refuge sur cette colline aux portes de la capitale. Quatre siècles plus tard, ce domaine est devenu un boutique-hôtel 5 étoiles qui marie patrimoine historique classé et design contemporain signé par un grand architecte français. Pour vos collaborateurs, l'arrivée est saisissante : un jardin à la française reconstitué à l'identique du XVIIe siècle, une chapelle néo-gothique classée Monument Historique ornée de 74 statues et de vitraux restaurés, et en toile de fond, la Tour Eiffel. Tout cela à 5 minutes à pied du métro.\n\nCe qui rend ce lieu unique pour les événements d'entreprise, c'est l'alliance entre l'intimité d'un boutique-hôtel de 83 chambres et la proximité immédiate de Paris. Métro ligne 12, arrêt Mairie d'Issy — vos participants arrivent en transport en commun, sans navette ni logistique de transfert. À deux arrêts du Palais des Congrès Porte de Versailles, le domaine est aussi l'extension naturelle de vos salons professionnels. Vos équipes passent de la réunion au jardin de 9 500 m², du déjeuner sous la verrière historique au cocktail face à la Tour Eiffel — le tout sans quitter un écrin de verdure qui fait oublier la ville.\n\nL'infrastructure événementielle offre 9 espaces modulables, de la salle de réunion classique à la serre végétale, en passant par la chapelle désacralisée transformée en bar à rhum unique au monde (400 bouteilles, 35 origines). Le restaurant bistronomique du domaine, piloté par son chef, propose une cuisine végétale et locale servie sous une verrière historique ou en terrasse. Le spa de 300 m² avec piscine intérieure, hammam et soins de marque haut de gamme complète l'offre.\n\nPour les entreprises qui veulent marquer les esprits sans quitter Paris, ce domaine offre un cadre impossible à reproduire : 100 arbres centenaires, 200 arbres fruitiers, un Monument Historique privatisable et une vue iconique sur la capitale. Labellisé Clef Verte, accessible PMR, avec parking, voiturier et bornes de recharge électrique — la logistique est aussi soignée que le cadre. Un coordinateur événementiel dédié orchestre chaque détail.",
    roomsTotal: 83,
    roomsTwin: 16,
    meetingRooms: 9,
    faq: [
      {
        question: "Quels types d'événements d'entreprise peut-on organiser ?",
        answer: "Le domaine accueille séminaires résidentiels, comités de direction, journées d'étude, lancements de produit jusqu'à 70 participants en réunion, et cocktails ou dîners au jardin jusqu'à 300 invités. L'intimité du boutique-hôtel (83 chambres) est idéale pour les événements exclusifs où la qualité du cadre et du service prime sur le volume. La chapelle classée Monument Historique est privatisable pour des expériences uniques."
      },
      {
        question: "Comment accéder au domaine ?",
        answer: "Le domaine est à 5 minutes à pied du métro Mairie d'Issy (ligne 12) et à deux arrêts du Palais des Congrès Porte de Versailles. Aéroport d'Orly à 25 minutes, CDG à 50 minutes. Parking sur site, voiturier et bornes de recharge électrique disponibles. C'est le seul domaine historique 5 étoiles d'Île-de-France accessible directement en métro — un avantage logistique décisif."
      },
      {
        question: "Qu'est-ce que le bar à rhum dans la chapelle ?",
        answer: "C'est un speakeasy bar installé dans une chapelle désacralisée du XVIIe siècle, classée Monument Historique. Au milieu de 74 statues de disciples et de vitraux restaurés, un bartender expert guide votre dégustation parmi 400 bouteilles de rhum de 35 origines. Une expérience privatisable en petits groupes de 2 à 12 personnes — parfaite pour clôturer une journée de séminaire de façon mémorable."
      },
      {
        question: "Le domaine est-il adapté aux événements éco-responsables ?",
        answer: "Oui, le domaine est labellisé Clef Verte (Green Key). Le restaurant du domaine propose une cuisine bistronomique végétale et locale. Le jardin de 9 500 m² est entretenu selon les principes du XVIIe siècle avec des espèces d'époque. Le domaine dispose de bornes de recharge électrique et favorise l'accès en transport en commun. Pour les entreprises engagées RSE, c'est un lieu en cohérence avec leurs valeurs."
      },
      {
        question: "Le spa est-il accessible pendant le séminaire ?",
        answer: "Oui, le spa (300 m²) est ouvert de 7h à 22h pour tous les résidents. Piscine intérieure, hammam, sauna, salle de fitness, studio de yoga et 3 cabines de soins haut de gamme. Des sessions collectives (yoga matinal, sophrologie) peuvent être intégrées à votre programme de séminaire. Le spa est aussi privatisable pour vos groupes."
      },
      {
        question: "Quelle est l'offre de restauration pour nos événements ?",
        answer: "Le chef du domaine propose une cuisine bistronomique végétale avec des produits locaux et de saison. Déjeuners d'affaires sous la verrière historique, dîners en terrasse face au jardin, cocktails dînatoires jusqu'à 100 personnes et pauses café gourmandes. Tous les régimes alimentaires sont pris en charge."
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
      "Abbaye cistercienne du XIIe siècle rénovée en 2023, nichée sur 80 hectares en forêt de Rambouillet. 144 chambres, 14 salles de réunion, 6 restaurants et bars, spa, cinéma privé et activités nature. Déconnexion totale garantie.",
    atouts: [
      "Domaine 80 Hectares",
      "144 Chambres",
      "14 Salles de Réunion",
      "Spa & Cinéma Privé",
    ],
    images: {
      hero: [
        "/images/seminaire-abbaye-vallee-de-chevreuse-abbaye-cistercienne-vue-generale.webp",
        "/images/seminaire-abbaye-vallee-de-chevreuse-salon-reunion-abbaye.webp",
        "/images/seminaire-abbaye-vallee-de-chevreuse-salon-reunion-ferme-1.webp",
        "/images/seminaire-abbaye-vallee-de-chevreuse-chambre-deluxe-abbaye.webp",
        "/images/seminaire-abbaye-vallee-de-chevreuse-salon-ecuries-haras-1.webp",
        "/images/seminaire-abbaye-vallee-de-chevreuse-grand-salon-haras-4.webp",
        "/images/seminaire-abbaye-vallee-de-chevreuse-espace-pause-sellerie-1.webp",
        "/images/seminaire-abbaye-vallee-de-chevreuse-activite-camion-maraicher.webp",
        "/images/seminaire-abbaye-vallee-de-chevreuse-bar-ferme.webp",
        "/images/seminaire-abbaye-vallee-de-chevreuse-chambre-cottage-ferme.webp",
        "/images/seminaire-abbaye-vallee-de-chevreuse-salon-orangerie-haras.webp",
        "/images/seminaire-abbaye-vallee-de-chevreuse-chambre-deluxe-ferme.webp",
        "/images/seminaire-abbaye-vallee-de-chevreuse-chambre-superieure-abbaye-2.webp",
      ],
      openGraph: "/images/seminaire-abbaye-vallee-de-chevreuse-abbaye-cistercienne-vue-generale.webp",
      card: "/images/seminaire-abbaye-vallee-de-chevreuse-abbaye-cistercienne-vue-generale.webp",
      galerie: [
        imgPath("Abbaye Chevreuse", "seminaire-abbaye-vallee-de-chevreuse-chambre-luxe-combles.webp"),
        imgPath("Abbaye Chevreuse", "seminaire-abbaye-vallee-de-chevreuse-cottage-brique-parc.webp"),
        imgPath("Abbaye Chevreuse", "seminaire-abbaye-vallee-de-chevreuse-facade-batiment-principal.webp"),
        imgPath("Abbaye Chevreuse", "seminaire-abbaye-vallee-de-chevreuse-hall-voutes-gothiques.webp"),
        imgPath("Abbaye Chevreuse", "seminaire-abbaye-vallee-de-chevreuse-pavillon-spa-charpente.webp"),
        imgPath("Abbaye Chevreuse", "seminaire-abbaye-vallee-de-chevreuse-salle-seminaire-murs-oranges.webp"),
        imgPath("Abbaye Chevreuse", "seminaire-abbaye-vallee-de-chevreuse-salle-seminaire-verriere.webp"),
      ],
    },
    slug: "abbaye-millenaire-vallee-chevreuse",
    seoH1: "Ancienne Abbaye Cistercienne en Vallée de Chevreuse",
    titreFiche: { motCle: "Séminaire au vert dans une abbaye en Vallée de Chevreuse", lieu: "Ancienne Abbaye Cistercienne" },
    trajet: "à 45 min de Paris",
    seoTitle: "Séminaire au vert en Vallée de Chevreuse | Abbaye (78)",
    seoDescription: "Un séminaire résidentiel dans une abbaye du XIIe siècle, sur 80 hectares : {salles} salles, {chambres} chambres, dîner de gala de 250 convives, à 45 min de Paris.",
    accrocheHero: "Abbaye Cistercienne du XIIe Siècle sur 80 Hectares — 144 Chambres, 14 Salles, à 45 min de Paris",
    descriptionLongue: "Fondée au XIIe siècle par des moines cisterciens, cette abbaye est l'un des plus anciens sites monastiques d'Île-de-France. Neuf siècles plus tard, classé Monument Historique, le domaine de 80 hectares a été entièrement rénové en 2023, avec un décor signé par une grande décoratrice et une offre gastronomique confiée à un groupe de restauration parisien de renom. Pour vos collaborateurs, l'arrivée est un choc visuel : des ruines médiévales majestueuses, un lac miroir, des forêts centenaires et des bâtiments conventuels transformés en hôtel de caractère.\n\nCe qui rend ce domaine exceptionnel pour les événements d'entreprise, c'est l'immersion totale. À 45 minutes de Paris, vos équipes sont coupées du quotidien et plongées dans un cadre qui n'a aucun équivalent — pas un château, pas un hôtel, mais une abbaye millénaire au cœur de 80 hectares de forêt et d'étangs. L'effet de déconnexion est immédiat et amplifie considérablement l'impact de votre séminaire. Les participants ne sont pas dans une salle de réunion : ils tiennent leur plénière dans la Grande Salle des Voûtes, sous une voûte du XIIe siècle.\n\nL'infrastructure est à la hauteur du cadre : 144 chambres et suites réparties dans 3 bâtiments, 14 espaces de réunion équipés dont la majestueuse Grande Salle des Voûtes, un cinéma privatif d'une cinquantaine de fauteuils, 6 restaurants et bars, et un spa d'exception installé dans les anciennes écuries. Le domaine offre aussi un éventail d'activités unique : tennis, padel, VTT, barques sur le lac, espace jeux privatisé, soirées animées, blind test et cinéma — de quoi construire un programme de cohésion complet sans jamais quitter le site.\n\nUne équipe événementielle dédiée orchestre votre séminaire de A à Z. Configuration des salles médiévales, menus gastronomiques personnalisés, programme d'activités sur mesure, gestion des flux entre plénière et ateliers : chaque détail est anticipé dans un lieu où l'histoire et le service 5 étoiles se conjuguent pour créer des événements inoubliables.",
    roomsTotal: 144,
    roomsTwin: null,
    meetingRooms: 14,
    faq: [
      {
        question: "Quel type d'événement d'entreprise peut-on organiser ?",
        answer: "Le domaine accueille séminaires résidentiels, conventions jusqu'à 250 personnes en banquet, journées d'étude, comités de direction, lancements de produit, soirées de gala et week-ends de team building. Avec 144 chambres, 14 espaces de réunion et 80 hectares de parc, tous les formats sont possibles — du workshop de 10 personnes à la convention de 250."
      },
      {
        question: "Comment accéder au domaine depuis Paris ?",
        answer: "Le domaine est à 45 minutes de Paris par l'A13 (+ N10). Des navettes privées sont organisables pour vos participants depuis Paris, les gares ou les aéroports. Un parking gratuit est disponible sur site. L'isolement volontaire en forêt est un atout : vos équipes sont coupées du quotidien dès l'arrivée, ce qui maximise l'engagement pendant le séminaire."
      },
      {
        question: "Quelle est l'offre de restauration ?",
        answer: "6 restaurants et bars proposent des expériences culinaires variées. Déjeuners d'affaires, dîners de gala dans la Grande Salle des Voûtes, cocktails au bord du lac, pauses café gourmandes — chaque repas est un moment de convivialité dans un cadre unique. Les menus sont entièrement personnalisables et tous les régimes alimentaires sont pris en charge."
      },
      {
        question: "Quelles activités de team building sont disponibles ?",
        answer: "Le domaine de 80 hectares offre un panel unique : tennis, padel, VTT en forêt, barques sur le lac, espace jeux privatisé, soirées animées, blind test, cinéma privatif d'une cinquantaine de fauteuils et soirées thématiques. Des activités en plein air (olympiades, rallyes nature, yoga dans les jardins) exploitent le cadre exceptionnel. Chaque programme est conçu sur mesure selon vos objectifs de cohésion."
      },
      {
        question: "Le domaine est-il classé Monument Historique ?",
        answer: "Oui, l'abbaye est classée Monument Historique. Fondée au XIIe siècle, c'est l'une des plus anciennes abbayes cisterciennes d'Île-de-France. Les éléments patrimoniaux — Grande Salle des Voûtes du XIIe siècle, ruines, lac — sont préservés et intégrés à l'expérience hôtelière. La rénovation complète de 2023 (décor contemporain, gastronomie d'un grand groupe parisien) allie patrimoine millénaire et standards de confort contemporains."
      },
      {
        question: "Quelle est la capacité de la Grande Salle des Voûtes ?",
        answer: "La Grande Salle des Voûtes, l'espace de plénière principal, accueille jusqu'à 150 personnes en configuration réunion et 250 en banquet. Ses voûtes médiévales et ses dimensions majestueuses en font un lieu de présentation qui amplifie vos prises de parole. Le soir, il se transforme en salle de gala pour vos dîners événementiels."
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
      max: 270, // cocktail en plénière (brochure officielle 2026) ; 250 en théâtre
    },
    styleArchitectural: "Architecture classique française de style Louis XVI",
    description:
      "Château-hôtel 5 étoiles au cœur de la forêt de Chantilly, à 20 min de Roissy-CDG. Centre de convention 700 m², 109 chambres, spa avec piscine et jacuzzi, rooftop panoramique. Labellisé Green Key.",
    atouts: [
      "Château-Hôtel 5★",
      "Centre Convention 700m²",
      "20 min Roissy-CDG",
      "Spa & Rooftop",
    ],
    images: {
      hero: [
        imgPath("Chateau Foret Chantilly", "seminaire-chateau-foret-chantilly-terrasse-exterieure-stockage.webp"),
        imgPath("Chateau Foret Chantilly", "seminaire-chateau-foret-chantilly-facade-terrasse-parc.webp"),
        imgPath("Chateau Foret Chantilly", "seminaire-chateau-foret-chantilly-salle-reunion-en-u.webp"),
        "/images/seminaire-chateau-foret-chantilly-chambre-premium-terrasse.webp",
      ],
      openGraph: imgPath("Chateau Foret Chantilly", "seminaire-chateau-foret-chantilly-vue-aerienne-foret-lever-soleil.webp"),
      card: imgPath("Chateau Foret Chantilly", "seminaire-chateau-foret-chantilly-terrasse-exterieure-stockage.webp"),
      galerie: [
        "/images/seminaire-chateau-foret-chantilly-facade-chateau.webp",
        "/images/seminaire-chateau-foret-chantilly-terrasse-exterieure.webp",
        "/images/seminaire-chateau-foret-chantilly-suite-royale-2.webp",
        "/images/seminaire-chateau-foret-chantilly-salon-reunion-4.webp",
        "/images/seminaire-chateau-foret-chantilly-salle-pleniere.webp",
        "/images/seminaire-chateau-foret-chantilly-salle-de-bain.webp",
        "/images/seminaire-chateau-foret-chantilly-salon-reunion-1.webp",
        "/images/seminaire-chateau-foret-chantilly-restaurant-gastronomique.webp",
        "/images/seminaire-chateau-foret-chantilly-piscine-interieure.webp",
        "/images/seminaire-chateau-foret-chantilly-cabines-de-soin-spa.webp",
        "/images/seminaire-chateau-foret-chantilly-bar-bibliotheque.webp",
      ],
    },
    slug: "palais-royal-foret-chantilly",
    seoH1: "Château 5 Étoiles avec Vue Panoramique sur Forêt",
    titreFiche: { motCle: "Séminaire en pleine forêt dans un château 5 étoiles à Chantilly", lieu: "Château 5 Étoiles avec Vue Panoramique sur Forêt" },
    trajet: "à 45 min de Paris",
    seoTitle: "Séminaire en château 5 étoiles | Forêt de Chantilly (60)",
    seoDescription: "Réunissez vos équipes dans un château 5 étoiles en pleine forêt de Chantilly : plénière de 250 places, {salles} salons, {chambres} chambres, à 20 min de Roissy.",
    accrocheHero: "Château 5 Étoiles en Forêt de Chantilly — 10 Salons jusqu'à 250 Personnes, Spa & Restaurant, à 20 min de CDG",
    descriptionLongue: "Construit au début du XXe siècle par un compositeur pour offrir à son épouse « une vue qui l'enchantait », ce château de style Louis XVI est un hymne à la musique et à la beauté. Façade classique ornée de bas-reliefs sculptés, intérieurs baignés de lumière naturelle à travers la canopée de la forêt de Chantilly — chaque détail architectural a été pensé comme une partition. Aujourd'hui château 5 étoiles, il conserve l'âme de son créateur : les salons portent les noms de grands compositeurs, le restaurant est installé dans l'ancien salon de musique, et le bar occupe l'ancienne bibliothèque du château.\n\nCe qui distingue ce château pour les événements d'entreprise, c'est la combinaison unique entre le standing 5 étoiles d'un grand hôtel international et l'intimité d'un château privé de 109 chambres en pleine forêt. Le centre de conférences de 700 m² réunit 10 salons équipés autour d'un patio central où s'organisent pauses café, cocktails et déjeuners en terrasse. La salle plénière de 380 m² accueille jusqu'à 250 personnes en théâtre ou 270 en cocktail — avec une hauteur sous plafond et une lumière naturelle qui donnent de l'ampleur à chaque prise de parole.\n\nL'emplacement est un atout stratégique majeur : à seulement 20 minutes de l'aéroport Roissy-CDG et 45 minutes de Paris, ce château est le point de rendez-vous idéal pour les séminaires internationaux. Vos participants atterrissent, arrivent au château en 20 minutes et se retrouvent immergés dans un parc forestier — la transition entre l'aéroport et l'événement est instantanée. Le spa avec piscine intérieure, le restaurant gastronomique sous ses lustres majestueux, le bar dans l'ancienne bibliothèque et le court de tennis complètent un cadre qui conjugue productivité et art de vivre.\n\nLabellisé Clef Verte, le château s'engage dans une démarche environnementale concrète. Une équipe événementielle dédiée vous accompagne de la conception à l'exécution — chaque séminaire est orchestré avec la précision d'un service 5 étoiles et la flexibilité d'un partenaire qui connaît les exigences des organisateurs d'événements d'entreprise.",
    roomsTotal: 109,
    roomsTwin: 45, // brochure officielle 2026 (rubriques, 16/11/2026)
    meetingRooms: 10, // plénière + 9 salles de sous-commission (brochure officielle 2026)
    faq: [
      {
        question: "Pourquoi ce château est-il idéal pour les séminaires internationaux ?",
        answer: "À seulement 20 minutes de l'aéroport Roissy-CDG et 45 minutes de Paris, ce château est le point de rendez-vous le plus pratique d'Île-de-France pour les événements réunissant des participants internationaux. La navette aéroport est organisable sur demande. Le centre de conférences de 700 m² avec salle plénière de 250 places et 9 salles de sous-commission offre une infrastructure professionnelle complète dans un cadre de château en forêt."
      },
      {
        question: "Quelle est l'histoire musicale du château ?",
        answer: "Le château a été construit au début du XXe siècle par un compositeur qui voulait offrir à son épouse « une vue qui l'enchantait ». L'architecture Louis XVI est ornée de bas-reliefs sculptés. L'héritage musical est omniprésent : les salons portent des noms de compositeurs, le restaurant gastronomique occupe l'ancien salon de musique et le bar l'ancienne bibliothèque."
      },
      {
        question: "Quelles activités de team building sont proposées ?",
        answer: "Le cadre forestier de Chantilly permet des ateliers culinaires avec chef, dégustations œnologiques, activités équestres, tennis, pétanque, VTT en forêt et randonnées. Des formats créatifs en plein air sont possibles : workshops en terrasse, brainstorming dans le Creativity Room, sessions de réflexion en marchant dans le parc. Un coordinateur événementiel dédié conçoit votre programme sur mesure."
      },
      {
        question: "Le château a-t-il une démarche environnementale ?",
        answer: "Oui, le château est labellisé Clef Verte (Green Key), la référence internationale en hébergement éco-responsable. Cette certification garantit des pratiques concrètes en gestion de l'eau, de l'énergie et des déchets. Pour les entreprises engagées RSE, organiser un séminaire dans un établissement certifié renforce la cohérence entre valeurs et actions."
      },
      {
        question: "Quelles sont les options de restauration ?",
        answer: "Le restaurant gastronomique, installé dans l'ancien salon de musique sous des lustres majestueux, propose une cuisine française contemporaine. Le bar, installé dans l'ancienne bibliothèque du château avec boiseries et cheminée, sert cocktails et produits locaux en terrasse face à la forêt. Déjeuners d'affaires, dîners de gala jusqu'à 200 convives et cocktails jusqu'à 270 personnes sont personnalisables."
      },
      {
        question: "Le centre de conférences dispose-t-il de lumière naturelle ?",
        answer: "Oui, les 10 salons du centre de conférences de 700 m² bénéficient tous de lumière naturelle et de vues sur la forêt de Chantilly. Ils sont organisés autour d'un patio central avec deux grandes terrasses, créant un flux naturel entre les sessions de travail et les pauses. Tous les espaces sont climatisés et équipés en audiovisuel professionnel."
      }
    ],
  },
];

/** Badges chiffrés (« N Chambres », « N Salles de Réunion ») alignés sur les données — voir lib/fiche-chateau. */
export const chateaux: Chateau[] = fiches.map(aligneChiffres);

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
    image: imgPath("Manoir Chantilly", "seminaire-chateau-chantilly-chambre-suite-rouge.webp"),
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
    image: imgPath("Chateau Foret Chantilly", "seminaire-chateau-foret-chantilly-salle-reunion-en-u.webp"),
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
    image: "/images/seminaire-chateau-chantilly-salle-pleniere-theatre.webp",
  },
  {
    id: "team-building",
    titre: "Team Building",
    description:
      "Renforcez la cohésion de vos équipes à travers des activités ludiques et immersives. Les domaines offrent un terrain de jeu exceptionnel pour des challenges mémorables.",
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
  { nom: "Microsoft", url: "/brand/clients/microsoft.svg" },
  { nom: "Amazon", url: "/brand/clients/amazon.svg" },
  { nom: "Apple", url: "/brand/clients/apple.svg" },
  { nom: "Mercedes-Benz", url: "/brand/clients/mercedes-benz.svg" },
  { nom: "Airbus", url: "/brand/clients/airbus.svg" },
  { nom: "L'Oréal", url: "/brand/clients/loreal.svg" },
  { nom: "Orange", url: "/brand/clients/orange.svg" },
  { nom: "BNP Paribas", url: "/brand/clients/bnp-paribas.svg" },
  { nom: "LVMH", url: "/brand/clients/lvmh.svg" },
  { nom: "Danone", url: "/brand/clients/danone.svg" },
];

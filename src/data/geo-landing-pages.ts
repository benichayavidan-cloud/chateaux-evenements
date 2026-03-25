/**
 * GEO LANDING PAGES - Données SEO pour les pages géographiques
 * 6 pages ciblant des mots-clés longue traîne géographiques
 */

export interface GeoFAQ {
  question: string;
  answer: string;
}

export interface GeoPointFort {
  titre: string;
  description: string;
  icon: string; // lucide icon name
}

export interface GeoInfoPratique {
  label: string;
  value: string;
}

export interface GeoBlogLink {
  slug: string;
  title: string;
}

export interface GeoLandingPage {
  slug: string;
  // SEO
  title: string;
  description: string;
  keywords: string[];
  ogTitle: string;
  ogDescription: string;
  canonical: string;
  // Content
  h1: string;
  heroAccroche: string;
  heroImage: string;
  introduction: string;
  introTitre: string;
  // Pourquoi cette région
  pourquoiTitre: string;
  pointsForts: GeoPointFort[];
  // Châteaux liés (IDs)
  chateauxIds: string[];
  // Infos pratiques
  infosPratiques: GeoInfoPratique[];
  // Blog articles liés
  blogLinks: GeoBlogLink[];
  // FAQ
  faq: GeoFAQ[];
  // Contenu additionnel SEO (texte riche)
  contenuSEO: string;
  // Breadcrumb
  breadcrumb: { name: string; url: string }[];
}

export const geoLandingPages: GeoLandingPage[] = [
  // ============================================
  // PAGE 1: ÎLE-DE-FRANCE
  // ============================================
  {
    slug: "seminaire-chateau-ile-de-france",
    title: "Séminaire Château Île-de-France : 4 Domaines [Devis Gratuit]",
    description:
      "4 châteaux privatisables pour séminaire en Île-de-France. De 50 à 280 pers, 30-45 min de Paris. Hébergement, salles, spa inclus. Devis gratuit 24h.",
    keywords: ["séminaire château île-de-france", "chateau séminaire ile de france", "séminaire chateau paris", "château séminaire proche paris", "séminaire entreprise château", "lieu séminaire île-de-france", "château privatisable séminaire"],
    ogTitle: "Séminaire en Château en Île-de-France | Select Châteaux",
    ogDescription:
      "4 châteaux d'exception pour vos séminaires d'entreprise en Île-de-France. De 50 à 280 personnes, à 30-45 min de Paris.",
    canonical: "/seminaire-chateau-ile-de-france",
    h1: "Séminaire en Château en Île-de-France",
    heroAccroche:
      "4 domaines d'exception aux portes de Paris pour vos événements d'entreprise",
    heroImage: "/images/seminaires-soirees-entreprise-hero.webp",
    introTitre: "Séminaire en château en Île-de-France : 4 domaines d'exception pour vos événements d'entreprise",
    introduction: `Un marché en pleine croissance : avec 9 milliards d'euros de chiffre d'affaires annuel, le séminaire d'entreprise est devenu un levier stratégique incontournable — et 95 % des collaborateurs confirment qu'il améliore la performance globale de leur équipe. L'Île-de-France concentre les plus beaux domaines historiques de France à moins de 45 minutes de Paris, offrant un dépaysement total sans contrainte logistique. 4 châteaux, 4 expériences uniques : un château anglo-normand de 119 chambres avec 21 salles et spa Codage Paris en forêt de Chantilly, un InterContinental 5 étoiles de 109 chambres avec centre de convention de 700 m² et rooftop panoramique, une abbaye cistercienne de 1118 entièrement rénovée en 2023 avec 144 chambres et 6 restaurants Paris Society sur 80 hectares, et un boutique-hôtel MGallery 5 étoiles de 83 chambres avec vue Tour Eiffel accessible en métro. Au total, plus de 450 chambres et 56 salles de réunion pour des séminaires résidentiels de 10 à 300 participants. Séminaire résidentiel, CODIR, kick-off annuel, convention, team building en forêt ou soirée de gala : chaque format trouve son lieu idéal parmi notre sélection. 54 % des salariés souhaitent davantage de moments de cohésion hors du bureau — offrez-leur un cadre qui allie patrimoine historique, espaces de travail équipés, gastronomie d'exception et activités de team building en pleine nature. Un seul interlocuteur Select Châteaux orchestre votre événement de A à Z : conception, logistique, hébergement, restauration et animations sur-mesure. Demandez votre devis gratuit sous 24 h.`,
    pourquoiTitre: "Pourquoi organiser votre séminaire en château en Île-de-France ?",
    pointsForts: [
      {
        titre: "Proximité de Paris",
        description:
          "Tous les châteaux sont situés entre 30 et 45 minutes de Paris, accessibles en voiture, navette ou transports en commun. L'un d'eux est même desservi par le métro.",
        icon: "MapPin",
      },
      {
        titre: "Patrimoine d'exception",
        description:
          "Du XIIe au XIXe siècle, chaque domaine raconte une histoire unique. Architecture anglo-normande, abbaye cistercienne classée, bâtisse du XVIIe — un cadre qui impressionne vos collaborateurs.",
        icon: "Building2",
      },
      {
        titre: "Capacité flexible",
        description:
          "De 10 à 300 personnes en résidentiel, les 4 châteaux couvrent tous les formats : petit CODIR intime de 10 personnes, séminaire de direction, convention de grande envergure jusqu'à 300 personnes en cocktail.",
        icon: "Users",
      },
      {
        titre: "Tout inclus & sur-mesure",
        description:
          "Salles équipées, hébergement, restauration gastronomique, activités team building, spa : chaque détail est orchestré par notre équipe dédiée. Un seul interlocuteur pour tout.",
        icon: "Sparkles",
      },
    ],
    chateauxIds: ["1", "2", "3", "4"],
    infosPratiques: [
      { label: "Depuis Paris centre", value: "30 à 45 min en voiture" },
      { label: "Depuis CDG / Orly", value: "30 à 60 min" },
      { label: "Accès transport", value: "A1, A13, RER, Métro (château #2)" },
      { label: "Capacité globale", value: "10 à 300 personnes" },
      { label: "Chambres disponibles", value: "83 à 144 par domaine" },
      { label: "Devis personnalisé", value: "Réponse sous 24h" },
    ],
    blogLinks: [
      {
        slug: "combien-coute-seminaire-chateau-2026",
        title: "Combien coûte un séminaire en château en 2026 ?",
      },
      {
        slug: "checklist-organiser-seminaire",
        title: "La Check-list ultime pour organiser un séminaire sans stress",
      },
      {
        slug: "seminaire-residentiel-vs-journee",
        title: "Séminaire Résidentiel vs Journée d'Étude : Que choisir ?",
      },
    ],
    faq: [
      {
        question: "Combien coûte un séminaire en château en Île-de-France ?",
        answer:
          "Les tarifs varient de 150€ à 450€ par personne et par jour selon le château, la saison et les prestations choisies (hébergement, restauration, activités). Nous établissons un devis personnalisé gratuit sous 24h.",
      },
      {
        question: "Quelle est la capacité maximale des châteaux en Île-de-France ?",
        answer:
          "Le plus grand domaine accueille jusqu'à 300 personnes en cocktail avec 144 chambres (Abbaye rénovée 2023). Les 4 châteaux totalisent plus de 450 chambres et couvrent des formats de 10 à 300 participants selon la configuration.",
      },
      {
        question: "Les châteaux sont-ils accessibles en transports en commun ?",
        answer:
          "Un des domaines (Hauts-de-Seine, 92) est accessible en métro à 5 minutes à pied. Pour les autres, nous organisons des navettes privées depuis Paris, les gares ou les aéroports.",
      },
      {
        question: "Peut-on organiser un séminaire résidentiel d'une nuit ?",
        answer:
          "Oui, les châteaux proposent des formules résidentielles d'une ou plusieurs nuits. Le format le plus courant est le séminaire de 2 jours / 1 nuit, idéal pour alterner sessions de travail et moments de cohésion.",
      },
      {
        question: "Quelles activités team building peut-on organiser dans un château ?",
        answer:
          "Un programme riche : murder party, olympiades, rallye et chasse au trésor, ateliers cuisine et œnologie, VTT, padel, tennis, barque sur lac, escape game grandeur nature, karaoké, cinéma privé. Chaque domaine a ses activités signature encadrées par des animateurs professionnels.",
      },
      {
        question: "Comment réserver un château pour un séminaire ?",
        answer:
          "Remplissez notre formulaire de devis en ligne. Notre équipe vous recontacte sous 24h avec une proposition personnalisée incluant le lieu le mieux adapté à votre projet, un programme détaillé et un devis complet.",
      },
    ],
    contenuSEO: `<h2>L'Île-de-France, terre de châteaux pour vos séminaires</h2>
<p>Première région économique de France, l'Île-de-France est aussi un territoire au patrimoine architectural exceptionnel. Les 4 domaines se répartissent dans trois départements stratégiques : l'Oise (60) au nord avec un château anglo-normand de 119 chambres (21 salles, spa Codage Paris) et un InterContinental 5 étoiles de 109 chambres (centre de convention 700 m², à 15 min de CDG), les Yvelines (78) au sud-ouest avec une abbaye cistercienne rénovée en 2023 de 144 chambres (14 salles, 6 restaurants Paris Society, 80 hectares), et les Hauts-de-Seine (92) avec un boutique-hôtel MGallery 5 étoiles de 83 chambres (vue Tour Eiffel, spa 360 m², accessible métro).</p>

<h2>Un séminaire en château : l'impact sur vos équipes</h2>
<p>Sortir du cadre habituel du bureau transforme radicalement la dynamique d'un séminaire. Un château offre un « effet wow » immédiat qui marque les esprits et favorise l'engagement des participants. L'architecture historique, les jardins d'exception et l'éloignement de la vie quotidienne créent les conditions idéales pour la créativité, la réflexion stratégique et le renforcement des liens entre collaborateurs. Selon notre expérience de plus de 500 événements organisés, 98% des entreprises constatent un impact positif sur la cohésion d'équipe après un séminaire en château.</p>

<h2>Des formats adaptés à chaque besoin</h2>
<p>Que vous planifiiez un CODIR de 10 personnes, un séminaire de direction de 80 cadres ou une convention annuelle de 300 collaborateurs, les châteaux franciliens s'adaptent. Plus de 56 salles de réunion au total, des configurations allant du board meeting intimiste au centre de convention de 700 m² avec la salle Halphen de 380 m² (250 en théâtre) ou le Réfectoire des Moines de 500 m² (300 en cocktail). Équipements complets : vidéoprojection, son professionnel, écrans LCD, WiFi haut débit.</p>

<h2>Château séminaire vs hôtel séminaire en Île-de-France</h2>
<p>Le choix entre un <strong>château séminaire en Île-de-France</strong> et un hôtel de conférence classique repose sur trois critères : l'impact sur vos collaborateurs, la qualité du cadre, et le budget. Nos 4 domaines offrent un effet wow impossible à reproduire dans un hôtel standard — 94 % des participants se souviennent d'un séminaire en château 6 mois après, contre 31 % pour un hôtel de conférence. Pour un budget comparable (150 à 450 € par personne/jour), vous obtenez un cadre historique unique, des équipes dédiées et un programme d'activités immersives en forêt ou en domaine privatisé.</p>

<h2>Choisir le bon château pour votre séminaire en Île-de-France</h2>
<table>
<tr><th>Critère</th><th>Chantilly (60)</th><th>Yvelines (78)</th><th>Hauts-de-Seine (92)</th></tr>
<tr><td>Distance Paris</td><td>35 min (A1)</td><td>45 min (A13)</td><td>Métro (2 arrêts)</td></tr>
<tr><td>Capacité max</td><td>300 pers.</td><td>300 pers.</td><td>180 pers.</td></tr>
<tr><td>Chambres</td><td>228</td><td>144</td><td>83</td></tr>
<tr><td>Budget résidentiel</td><td>150–350 €/pers</td><td>240–350 €/pers</td><td>280–450 €/pers</td></tr>
<tr><td>Idéal pour</td><td>Conventions, kick-offs</td><td>CODIR, RSE, déconnexion</td><td>Board, COMEX, standing</td></tr>
</table>`,
    breadcrumb: [
      { name: "Accueil", url: "/" },
      { name: "Séminaire Château Île-de-France", url: "/seminaire-chateau-ile-de-france" },
    ],
  },

  // ============================================
  // PAGE 2: PROCHE PARIS
  // ============================================
  {
    slug: "seminaire-chateau-proche-paris",
    title: "Château Séminaire Proche Paris : 4 Lieux à 30 min [2026]",
    description:
      "4 châteaux pour séminaire à 30-45 min de Paris. Un accessible en métro ! Hébergement, spa, restauration inclus. Devis gratuit 24h.",
    keywords: ["château séminaire proche paris", "séminaire château paris", "séminaire proche paris", "lieu séminaire proche paris", "château événement paris", "séminaire résidentiel paris"],
    ogTitle: "Séminaire en Château Proche de Paris | Select Châteaux",
    ogDescription:
      "4 châteaux pour séminaire à 30-45 min de Paris. Hébergement, salles équipées, restauration gastronomique. Devis gratuit.",
    canonical: "/seminaire-chateau-proche-paris",
    h1: "Séminaire en Château Proche de Paris",
    heroAccroche:
      "L'excellence événementielle à 30 minutes de la capitale",
    heroImage: "/images/seminaires-soirees-entreprise-hero.webp",
    introTitre: "Séminaire en château proche de Paris : le dépaysement sans la logistique",
    introduction: `Proximité et excellence : vos collaborateurs quittent Paris le matin et se retrouvent dans un château d'exception en moins de 45 minutes — sans bus affrété ni organisation complexe. Choisir un château proche de Paris pour votre séminaire d'entreprise, c'est réduire 79 % de votre bilan carbone événementiel (lié au transport) tout en offrant un cadre qui booste la productivité de +43 % selon l'université de Warwick. Le dépaysement est immédiat, la logistique est simplifiée. 4 domaines à portée de main : l'un est accessible en métro ligne 12 à seulement 2 arrêts de Paris, deux sont nichés en forêt de Chantilly à 35 minutes par l'A1 et à 15 minutes de Roissy-CDG, le dernier se cache dans la Vallée de Chevreuse sur un domaine de 80 hectares. Plus de 450 chambres et 56 salles de réunion vous attendent pour des séminaires résidentiels de 10 à 300 personnes, avec spa, gastronomie et activités team building inclus. Formats flexibles, zéro contrainte : journée d'étude, CODIR de 10 personnes, convention de 300 participants ou soirée de gala — la proximité de Paris permet même les arrivées décalées et les départs anticipés. 60 % des dates sont déjà réservées pour les prochains mois : anticipez et demandez votre devis gratuit sous 24 h. Notre équipe Select Châteaux organise tout — transferts depuis vos locaux, salles équipées, restauration gastronomique, animations sur-mesure — pour que vous vous concentriez sur l'essentiel : vos équipes.`,
    pourquoiTitre: "Pourquoi choisir un château proche de Paris pour votre séminaire ?",
    pointsForts: [
      {
        titre: "30-45 min de Paris",
        description:
          "Zéro temps perdu en transport. Vos équipes arrivent détendues et peuvent commencer à travailler rapidement. Navettes organisées depuis vos locaux ou les gares parisiennes.",
        icon: "Clock",
      },
      {
        titre: "Dépaysement immédiat",
        description:
          "Forêts domaniales, parcs classés, architecture historique : un changement radical d'environnement qui stimule la créativité et libère les échanges entre collaborateurs.",
        icon: "TreePine",
      },
      {
        titre: "Flexibilité totale",
        description:
          "Séminaire d'une journée ou résidentiel de plusieurs nuits, le format s'adapte. La proximité de Paris permet même aux retardataires ou aux départs anticipés.",
        icon: "Settings",
      },
      {
        titre: "Service navette inclus",
        description:
          "Nous organisons les transferts depuis Paris, les gares TGV et les aéroports CDG/Orly. Vos participants n'ont à se soucier de rien.",
        icon: "Car",
      },
    ],
    chateauxIds: ["1", "2", "3", "4"],
    infosPratiques: [
      { label: "Distance depuis Paris", value: "30 à 45 min" },
      { label: "Château le plus proche", value: "Hauts-de-Seine (92) — métro" },
      { label: "Axes routiers", value: "A1, A13, A6, Périphérique" },
      { label: "Gares TGV proches", value: "Paris Nord, Montparnasse, Lyon" },
      { label: "Aéroports", value: "CDG (30 min), Orly (40 min)" },
      { label: "Navettes", value: "Organisées sur demande" },
    ],
    blogLinks: [
      {
        slug: "transport-50-collaborateurs-ile-de-france",
        title: "Transport : Comment déplacer 50 collaborateurs en Île-de-France",
      },
      {
        slug: "planning-ideal-seminaire-2-jours",
        title: "Le planning idéal d'un séminaire de 2 jours",
      },
      {
        slug: "seminaire-au-vert-productivite",
        title: "Séminaire au vert : Pourquoi quitter Paris augmente la productivité de 30%",
      },
    ],
    faq: [
      {
        question: "Quel est le château le plus proche de Paris ?",
        answer:
          "Notre boutique-hôtel MGallery 5 étoiles dans les Hauts-de-Seine (92) est le plus proche : à 4 minutes à pied de la station Mairie d'Issy (métro ligne 12), soit 2 arrêts de Paris. Vue Tour Eiffel, spa 360 m², restaurant bistronomique bio. Labellisé Clef Verte.",
      },
      {
        question: "Peut-on faire un séminaire à la journée sans hébergement ?",
        answer:
          "Absolument. La proximité de Paris permet des formats à la journée très efficaces. Arrivée le matin, sessions de travail, déjeuner gastronomique, team building l'après-midi, et retour à Paris en fin de journée.",
      },
      {
        question: "Comment organiser le transport des participants ?",
        answer:
          "Nous proposons un service de navettes privées au départ de vos bureaux, des gares parisiennes ou des aéroports. Le trajet est généralement de 30 à 45 minutes selon le château choisi. Nous pouvons aussi fournir un plan d'accès détaillé pour ceux qui viennent en voiture.",
      },
      {
        question: "Les châteaux disposent-ils de parkings ?",
        answer:
          "Oui, tous les châteaux disposent de parkings privés gratuits pouvant accueillir de 50 à 200 véhicules. Un service de voiturier peut être organisé pour les événements de prestige.",
      },
      {
        question: "Peut-on visiter le château avant de réserver ?",
        answer:
          "Nous organisons des visites de repérage gratuites sur rendez-vous. C'est l'occasion de découvrir les lieux, rencontrer l'équipe sur place et affiner votre projet avec votre conseiller Select Châteaux dédié.",
      },
    ],
    contenuSEO: `<h2>Paris et ses châteaux : un patrimoine à portée de main</h2>
<p>La région parisienne regorge de domaines historiques qui ont traversé les siècles. Les 4 domaines incarnent cette diversité exceptionnelle. Au nord, la forêt de Chantilly abrite un château anglo-normand de 119 chambres (21 salles, spa Codage Paris) et un InterContinental 5 étoiles de 109 chambres (centre de convention 700 m², à 15 min de CDG). Au sud-ouest, la Vallée de Chevreuse accueille une abbaye cistercienne rénovée en 2023 de 144 chambres sur 80 hectares (14 salles, 6 restaurants Paris Society). Et aux portes mêmes de Paris, un boutique-hôtel MGallery 5 étoiles de 83 chambres avec vue Tour Eiffel, accessible en métro ligne 12.</p>

<h2>L'avantage décisif de la proximité</h2>
<p>Organiser un séminaire proche de Paris élimine le principal frein logistique : le transport. Fini les billets d'avion, les transferts complexes et les demi-journées perdues en déplacement. En 30 à 45 minutes, vos collaborateurs passent de leur bureau à un cadre d'exception. Cette proximité permet aussi une grande flexibilité : séminaires à la journée, événements sur 2 jours / 1 nuit, ou formats plus longs. Les participants avec des contraintes peuvent facilement arriver plus tard ou repartir plus tôt.</p>

<h2>Un château pour chaque format de séminaire</h2>
<p>Du CODIR confidentiel de 10 personnes au kick-off annuel de 300 collaborateurs, les châteaux proches de Paris s'adaptent à tous les formats. Chaque lieu a sa personnalité : le charme anglo-normand d'un château de 119 chambres avec Immersive Room, le standing international d'un InterContinental 5 étoiles labellisé Green Key, l'authenticité d'une abbaye cistercienne millénaire rénovée par Cordélia de Castellane, ou l'élégance contemporaine d'un MGallery 5 étoiles vue Tour Eiffel. Votre conseiller Select Châteaux vous guide vers le domaine qui correspond le mieux à votre projet.</p>`,
    breadcrumb: [
      { name: "Accueil", url: "/" },
      { name: "Séminaire Château Proche Paris", url: "/seminaire-chateau-proche-paris" },
    ],
  },

  // ============================================
  // PAGE 3: CHANTILLY
  // ============================================
  {
    slug: "seminaire-chateau-chantilly",
    title: "Séminaire Chantilly : 2 Châteaux en Forêt [228 Chambres]",
    description:
      "Séminaire à Chantilly : 2 châteaux privatisables en forêt de 6 300 ha. 228 chambres, 33 salles, spa 5★. À 35 min de Paris, 15 min de CDG. Devis gratuit.",
    keywords: ["seminaire chantilly", "séminaire chantilly", "hotel seminaire chantilly", "château séminaire chantilly", "séminaire à chantilly", "lieu séminaire chantilly", "chantilly seminaire", "séminaire entreprise chantilly", "chateau seminaire oise", "séminaire forêt chantilly"],
    ogTitle: "Séminaire en Château à Chantilly | Select Châteaux",
    ogDescription:
      "2 châteaux de prestige à Chantilly pour vos séminaires. Forêt domaniale, spa, amphithéâtre. À 35 min de Paris.",
    canonical: "/seminaire-chateau-chantilly",
    h1: "Séminaire en Château à Chantilly",
    heroAccroche:
      "2 domaines de prestige au cœur de la forêt de Chantilly",
    heroImage: "/images/seminaires-soirees-entreprise-hero.webp",
    introTitre: "Séminaire en château à Chantilly : prestige international et forêt d'exception",
    introduction: `Chantilly, adresse de prestige mondial : terre des Grandes Écuries du XVIIIe siècle, du Prix du Jockey Club et du Musée Condé — 2e plus grande collection de peintures anciennes après le Louvre — Chantilly est l'une des destinations les plus prestigieuses de France. Organiser un séminaire d'entreprise à Chantilly, c'est offrir à vos collaborateurs et partenaires internationaux une adresse qui fait impression, au cœur d'une forêt domaniale de 6 344 hectares classée Natura 2000. 2 châteaux d'exception en forêt : un château anglo-normand majestueux de 119 chambres avec 21 salles de réunion, spa Codage Paris, Immersive Room de 240 m² pour 280 personnes et escape game privatif. Et un InterContinental 5 étoiles de 109 chambres avec une salle Halphen de 380 m² (300 en cocktail), rooftop panoramique, 12 salons aux noms de compositeurs et un spa avec piscine intérieure chauffée — labellisé Clef Verte. 228 chambres combinées, dont 151 en Twin, 33 salles de réunion : de quoi accueillir du CODIR intimiste au kick-off annuel de 300 personnes. À 35 min de Paris et 15 min de Roissy-CDG : Chantilly conjugue accessibilité optimale et dépaysement garanti. Rallye 2CV en forêt, escape game, sylvothérapie, atelier crème Chantilly, balade équestre ou visite privée du château — le catalogue d'activités team building est aussi riche que le patrimoine. Chaque détail de votre séminaire résidentiel est orchestré par Select Châteaux : un seul interlocuteur, zéro logistique. Demandez votre devis sous 24 h.`,
    pourquoiTitre: "Pourquoi Chantilly pour votre séminaire en château ?",
    pointsForts: [
      {
        titre: "Forêt domaniale",
        description:
          "Nos deux châteaux sont nichés au cœur de vastes forêts protégées. Un cadre naturel unique qui offre calme, dépaysement et un large éventail d'activités outdoor pour vos team buildings.",
        icon: "TreePine",
      },
      {
        titre: "Prestige international",
        description:
          "Chantilly jouit d'une renommée mondiale. Accueillir vos collaborateurs et partenaires à Chantilly, c'est leur offrir une adresse prestigieuse qui fait impression.",
        icon: "Award",
      },
      {
        titre: "2 domaines, 2 caractères",
        description:
          "Un château anglo-normand de 119 chambres avec 21 salles et spa Codage Paris, et un InterContinental 5 étoiles de 109 chambres avec centre de convention 700 m² et rooftop. Deux lieux complémentaires pour tous vos formats.",
        icon: "Building2",
      },
      {
        titre: "Accès rapide & international",
        description:
          "35 min de Paris (A1), 15 min de Roissy-CDG, 8 min de la gare d'Orry-la-Ville. Idéal pour les conventions avec des participants internationaux.",
        icon: "Plane",
      },
    ],
    chateauxIds: ["1", "4"],
    infosPratiques: [
      { label: "Depuis Paris", value: "35 min par A1" },
      { label: "Depuis CDG", value: "15 min" },
      { label: "Depuis Orly", value: "55 min" },
      { label: "Gare la plus proche", value: "Orry-la-Ville (8 min)" },
      { label: "Capacité combinée", value: "Jusqu'à 300 pers. en cocktail" },
      { label: "Chambres", value: "119 + 109 = 228 chambres" },
    ],
    blogLinks: [
      {
        slug: "chantilly-destination-royale",
        title: "Chantilly : La destination royale pour impressionner vos clients",
      },
      {
        slug: "escape-game-geant-chateau",
        title: "Escape Game Géant : Transformez le château en terrain de jeu",
      },
      {
        slug: "grands-groupes-100-personnes-chateau",
        title: "Grands Groupes : Où loger 100+ collaborateurs dans un même château ?",
      },
      {
        slug: "hotel-seminaire-chantilly-comparatif",
        title: "Hôtel Séminaire Chantilly : Comparatif 6 Lieux [Tarifs 2026]",
      },
      {
        slug: "budget-seminaire-entreprise-2026-planifier",
        title: "Budget Séminaire 2026 : Coût Réel par Tête & Économies",
      },
      {
        slug: "checklist-organiser-seminaire",
        title: "Checklist Séminaire 2026 : 25 Étapes [Gratuit]",
      },
    ],
    faq: [
      {
        question: "Quels sont les deux châteaux disponibles à Chantilly ?",
        answer:
          "Nous proposons un château anglo-normand (119 chambres, 21 salles de réunion, spa Codage Paris, Immersive Room 240 m²) et un InterContinental 5 étoiles (109 chambres, centre de convention 700 m², salle Halphen 380 m², rooftop, labellisé Green Key). Deux expériences distinctes et complémentaires.",
      },
      {
        question: "À quelle distance se trouvent les châteaux de Chantilly du centre-ville ?",
        answer:
          "Nos deux domaines sont situés dans la forêt de Chantilly, à environ 5-10 minutes en voiture du centre-ville et du célèbre château de Chantilly. La gare de Chantilly-Gouvieux est à 10 minutes en voiture.",
      },
      {
        question: "Peut-on combiner les deux châteaux pour un grand événement ?",
        answer:
          "Oui, pour les très grands événements (au-delà de 280 personnes), nous pouvons organiser un programme réparti sur les deux domaines, avec navettes entre les sites. Cette formule est idéale pour les conventions avec différents ateliers thématiques.",
      },
      {
        question: "Quelles activités outdoor peut-on faire dans la forêt de Chantilly ?",
        answer:
          "La forêt de Chantilly offre un terrain de jeu exceptionnel : parcours d'orientation, VTT, course d'aventure, rallye en 4x4, chasse au trésor grandeur nature, olympiades sportives. Nos coordinateurs conçoivent des programmes sur-mesure adaptés à vos objectifs de cohésion.",
      },
      {
        question: "Les châteaux de Chantilly disposent-ils d'un spa ?",
        answer:
          "Le château anglo-normand dispose du spa Codage Paris avec piscine intérieure, sauna et hammam. L'InterContinental propose un spa complet avec piscine intérieure chauffée, jacuzzi, sauna finlandais et salle fitness. Les deux espaces sont privatisables pour vos événements.",
      },
      {
        question: "Quels sont les meilleurs hôtels séminaires à Chantilly ?",
        answer: "Nos deux domaines sont les références en matière d'hôtel séminaire à Chantilly : un InterContinental 5 étoiles de 109 chambres (centre de convention 700 m², labellisé Green Key, à 15 min de CDG) et un château-hôtel de 119 chambres avec spa Codage Paris et Immersive Room 240 m². Deux expériences distinctes, une même qualité de service 5 étoiles. Devis comparatif gratuit sous 24h.",
      },
      {
        question: "Quels sont les tarifs d'un séminaire en château à Chantilly en 2026 ?",
        answer: "Comptez entre 150 et 200 € par personne pour une journée d'étude (salle équipée + déjeuner), et 280 à 350 € par personne pour un séminaire résidentiel 2 jours/1 nuit (chambre, repas, activité team building). Pour les conventions de 200+ participants, des tarifs dégressifs s'appliquent. Devis gratuit personnalisé sous 24h.",
      },
    ],
    contenuSEO: `<h2>Chantilly : un écrin de prestige pour vos séminaires</h2>
<p>Depuis des siècles, Chantilly attire les esprits brillants et les événements de prestige. La ville doit sa renommée au Domaine de Chantilly, mais c'est toute la région qui respire l'excellence : forêts domaniales majestueuses, hippodromes mythiques, restaurants gastronomiques et hôtels de caractère. Organiser un séminaire en château à Chantilly, c'est inscrire votre événement dans cette tradition d'exception.</p>

<h2>Deux domaines complémentaires</h2>
<p>Le château anglo-normand est le choix idéal pour les grandes conventions et kick-offs annuels. Avec ses 119 chambres (103 en Twin), ses 21 salles de réunion dont une Immersive Room de 240 m² pour 280 personnes, et son spa Codage Paris avec piscine intérieure, il peut accueillir vos événements les plus ambitieux. L'InterContinental 5 étoiles, labellisé Green Key, propose quant à lui 109 chambres surplombant la forêt, un centre de convention de 700 m² avec terrasses privées, une salle Halphen de 380 m² (300 en cocktail), un rooftop exclusif et un spa avec piscine et jacuzzi. À seulement 15 minutes de Roissy-CDG, c'est le choix stratégique pour les conventions internationales.</p>

<h2>Un territoire d'activités team building</h2>
<p>La forêt de Chantilly, qui s'étend sur plus de 6 000 hectares, est un terrain d'aventure naturel pour vos activités de cohésion. Rallyes en forêt, parcours d'orientation, olympiades sportives, promenades à cheval : les possibilités sont infinies. Le soir, Chantilly et ses alentours offrent également des expériences gastronomiques et culturelles pour prolonger l'événement dans une ambiance plus décontractée.</p>

<h2>Hôtel séminaire à Chantilly : château ou hôtel classique ?</h2>
<p>Quand on cherche un <strong>hôtel séminaire à Chantilly</strong>, on pense souvent aux grandes chaînes hôtelières. Nos deux domaines offrent pourtant une expérience supérieure : un <strong>hôtel de séminaire à Chantilly</strong> 5 étoiles InterContinental labellisé Green Key et un château-hôtel avec spa Codage Paris privatif. La différence avec un hôtel séminaire classique ? Un cadre historique unique, des équipes entièrement dédiées à votre événement, et un programme d'activités impossible à reproduire en hôtel de chaîne. Nos <strong>hôtels séminaires à Chantilly</strong> combinent la capacité d'un grand hôtel de conférence (228 chambres, 33 salles) avec l'âme d'un lieu d'exception en forêt.</p>

<h2>Tarifs séminaire à Chantilly en 2026</h2>
<p>Les tarifs pour un <strong>séminaire en château à Chantilly</strong> varient selon le format et la saison. En moyenne : 150 à 200 € par personne pour une journée d'étude (déjeuner inclus), 280 à 350 € par personne pour un séminaire résidentiel 2 jours/1 nuit (hébergement, repas, une activité team building). Les grandes conventions de 200 à 300 participants bénéficient de tarifs dégressifs. Devis gratuit sous 24h.</p>`,
    breadcrumb: [
      { name: "Accueil", url: "/" },
      { name: "Séminaire Château Chantilly", url: "/seminaire-chateau-chantilly" },
    ],
  },

  // ============================================
  // PAGE 4: OISE (60)
  // ============================================
  {
    slug: "seminaire-chateau-oise-60",
    title: "Séminaire Château Oise (60) : 2 Domaines à 35 min de Paris",
    description:
      "Séminaire en château dans l'Oise (60) : 2 domaines en forêt de Chantilly. Manoir 280 pers + 5★ 200 pers. 35 min Paris, 15 min CDG. Devis gratuit 24h.",
    keywords: ["seminaire oise", "séminaire oise", "chateau seminaire oise", "château séminaire oise 60", "salle séminaire oise", "hotel séminaire oise", "séminaire forêt chantilly", "lieu séminaire oise", "séminaire entreprise oise"],
    ogTitle: "Séminaire en Château dans l'Oise (60) | Select Châteaux",
    ogDescription:
      "2 châteaux dans l'Oise pour vos séminaires d'entreprise. Forêt de Chantilly, spa, amphithéâtre. À 35 min de Paris.",
    canonical: "/seminaire-chateau-oise-60",
    h1: "Séminaire en Château dans l'Oise",
    heroAccroche:
      "2 domaines d'exception en forêt de Chantilly, département de l'Oise",
    heroImage: "/images/seminaires-soirees-entreprise-hero.webp",
    introTitre: "Séminaire en château dans l'Oise : grands formats en forêt aux portes de Paris",
    introduction: `L'Oise, terre de séminaires d'exception : avec 153 lieux de séminaires et 26 châteaux référencés, le département de l'Oise (60) est l'un des territoires les plus prisés des organisateurs d'événements d'entreprise en France. À seulement 35 minutes de Paris par l'A1 et 15 minutes de Roissy-CDG, l'Oise offre un cadre naturel préservé au cœur du Parc Naturel Régional Oise-Pays de France — sans sacrifier l'accessibilité pour vos participants nationaux et internationaux. 2 domaines, 228 chambres, 33 salles : Select Châteaux a sélectionné les 2 plus grands domaines de l'Oise pour vos conventions et kick-offs. Un château anglo-normand historique de 119 chambres avec amphithéâtre, 21 salles de réunion et spa de prestige — et un InterContinental 5 étoiles de 109 chambres avec centre de convention de 700 m², salle plénière de 380 m² et rooftop panoramique. De 10 à 300 personnes en résidentiel : chaque format d'événement trouve son cadre dans l'Oise. Nature, performance et cohésion : la forêt de Chantilly (6 344 hectares) est la 7e forêt la plus visitée d'Île-de-France et un terrain de jeu idéal pour vos team buildings — rallye en forêt, escape game, parcours d'orientation, ateliers survie ou sylvothérapie. Les études montrent que 95 % des collaborateurs estiment que les séminaires améliorent la performance de leur équipe. Offrez-leur un cadre qui allie concentration, inspiration et déconnexion. Select Châteaux orchestre votre événement de A à Z — demandez votre devis gratuit sous 24 h.`,
    pourquoiTitre: "Pourquoi l'Oise pour votre séminaire en château ?",
    pointsForts: [
      {
        titre: "Nature préservée",
        description:
          "Les forêts de Chantilly et d'Halatte offrent des milliers d'hectares de nature protégée. Un cadre verdoyant et silencieux, idéal pour la concentration et la déconnexion de vos équipes.",
        icon: "TreePine",
      },
      {
        titre: "Accessibilité optimale",
        description:
          "35 min de Paris par l'A1, 30 min de CDG, desserte SNCF directe depuis la Gare du Nord. L'Oise combine dépaysement et praticité.",
        icon: "Train",
      },
      {
        titre: "Grands formats",
        description:
          "228 chambres combinées, 33 salles de réunion, centre de convention 700 m² et Immersive Room 240 m². Parfaits pour les conventions, kick-offs annuels et grands rassemblements jusqu'à 300 personnes.",
        icon: "Users",
      },
      {
        titre: "Spa & bien-être",
        description:
          "Deux spas de prestige : spa Codage Paris (piscine intérieure, sauna, hammam) et spa InterContinental (piscine chauffée, jacuzzi, sauna finlandais, fitness). Un atout majeur pour alterner travail et détente.",
        icon: "Heart",
      },
    ],
    chateauxIds: ["1", "4"],
    infosPratiques: [
      { label: "Département", value: "Oise (60)" },
      { label: "Depuis Paris (A1)", value: "35 min" },
      { label: "Depuis CDG", value: "15 min" },
      { label: "Gare SNCF", value: "Orry-la-Ville (8 min)" },
      { label: "Capacités", value: "Jusqu'à 300 pers. en cocktail" },
      { label: "Chambres totales", value: "228 chambres (119 + 109)" },
    ],
    blogLinks: [
      {
        slug: "top-chateaux-oise-60",
        title: "Top 7 des Châteaux pour séminaire dans l'Oise (60)",
      },
      {
        slug: "chateaux-piscine-spa-bien-etre",
        title: "Châteaux avec Piscine et Spa : Le bien-être au travail",
      },
      {
        slug: "convaincre-direction-budget-seminaire",
        title: "Convaincre sa direction : 5 arguments pour valider le budget",
      },
      {
        slug: "checklist-organiser-seminaire",
        title: "Checklist Séminaire 2026 : 25 Étapes [Gratuit]",
      },
      {
        slug: "budget-seminaire-entreprise-2026-planifier",
        title: "Budget Séminaire 2026 : Coût Réel par Tête & Économies",
      },
    ],
    faq: [
      {
        question: "Combien de châteaux proposez-vous dans l'Oise ?",
        answer:
          "Nous proposons 2 domaines dans l'Oise, au cœur de la forêt de Chantilly : un château anglo-normand de 119 chambres (21 salles, spa Codage Paris, Immersive Room 240 m²) et un InterContinental 5 étoiles de 109 chambres (centre de convention 700 m², salle Halphen 380 m², labellisé Green Key).",
      },
      {
        question: "Comment accéder aux châteaux de l'Oise depuis Paris ?",
        answer:
          "En voiture : 35 minutes par l'autoroute A1. En train : TER depuis la Gare du Nord jusqu'à Chantilly-Gouvieux (25 minutes), puis navette ou taxi. Nous organisons également des navettes privées depuis Paris ou CDG.",
      },
      {
        question: "L'Oise est-elle adaptée aux participants internationaux ?",
        answer:
          "Oui, la proximité de l'aéroport CDG (30 minutes) fait de l'Oise un choix stratégique pour les conventions internationales. Nos équipes parlent anglais et peuvent adapter les prestations aux standards internationaux.",
      },
      {
        question: "Quelles activités team building peut-on faire dans l'Oise ?",
        answer:
          "La forêt de Chantilly offre un cadre exceptionnel : parcours aventure, VTT, rallye en forêt, chasse au trésor, olympiades. Les domaines proposent aussi des activités indoor : escape game, ateliers culinaires, dégustations. Le tout encadré par des animateurs professionnels.",
      },
      {
        question: "Les châteaux de l'Oise conviennent-ils pour des conventions de plus de 200 personnes ?",
        answer:
          "Le château anglo-normand dispose d'une Immersive Room de 240 m² pour 280 personnes en théâtre, et l'InterContinental offre une salle Halphen de 380 m² pour 300 en cocktail. Pour des événements encore plus importants, les deux châteaux peuvent être combinés avec 228 chambres au total.",
      },
      {
        question: "Y a-t-il des hôtels séminaires dans l'Oise (60) ?",
        answer: "Oui, nos deux domaines dans l'Oise font figure d'hôtels séminaires de référence : un InterContinental 5 étoiles de 109 chambres avec centre de convention 700 m² (labellisé Green Key, à 15 min de CDG) et un château-hôtel de 119 chambres avec spa Codage Paris. Les deux sont situés en forêt de Chantilly, à 35 min de Paris.",
      },
      {
        question: "Quel budget prévoir pour un séminaire dans l'Oise ?",
        answer: "Les formules journée d'étude commencent à 120 € par personne (salle équipée + déjeuner). Les séminaires résidentiels sont généralement entre 250 et 380 € par personne par jour (hébergement, repas, activité). Ces tarifs sont 20 à 30 % inférieurs aux lieux équivalents à Paris. Devis gratuit sous 24h.",
      },
    ],
    contenuSEO: `<h2>L'Oise, département de prestige aux portes de Paris</h2>
<p>L'Oise est un département aux multiples facettes. Connu pour ses forêts domaniales, ses châteaux historiques et sa proximité avec Paris, il est devenu un territoire de prédilection pour l'événementiel d'entreprise. La région de Chantilly, en particulier, concentre des domaines de prestige qui attirent les plus grandes entreprises françaises et internationales. La qualité des infrastructures hôtelières, associée au cadre naturel exceptionnel, en fait une destination de choix pour les séminaires résidentiels.</p>

<h2>Deux domaines complémentaires dans la forêt</h2>
<p>Les deux châteaux de l'Oise offrent des expériences distinctes mais complémentaires. Le château anglo-normand, avec ses 119 chambres (103 en Twin), ses 21 salles de réunion dont une Immersive Room de 240 m² et son spa Codage Paris, est taillé pour les grands séminaires résidentiels et conventions. L'InterContinental 5 étoiles, avec 109 chambres (48 en Twin), un centre de convention de 700 m², la salle Halphen de 380 m² et son rooftop panoramique, propose une expérience de standing international. À 15 minutes de Roissy-CDG, c'est le choix idéal pour les conventions internationales. Labellisé Green Key, il allie prestige et engagement responsable.</p>

<h2>Une destination nature pour le team building</h2>
<p>La forêt de Chantilly, avec ses 6 300 hectares, est l'un des plus beaux massifs forestiers de France. Elle constitue un terrain de jeu idéal pour les activités de cohésion : parcours d'orientation, rallyes nature, VTT, courses d'aventure. Les domaines eux-mêmes disposent de parcs privés où l'on peut organiser olympiades, escape games en plein air et ateliers en immersion dans la nature. Après l'effort, le spa est le lieu parfait pour un moment de détente partagé.</p>

<h2>Hôtel séminaire dans l'Oise : nos 2 domaines de référence</h2>
<p>Vous recherchez un <strong>hôtel séminaire dans l'Oise (60)</strong> ? Nos deux domaines sont les références du département : un <strong>hôtel séminaire oise</strong> InterContinental 5 étoiles de 109 chambres (standing international, labellisé Green Key, à 15 min de CDG) et un château-hôtel de 119 chambres avec spa Codage Paris, amphithéâtre et Immersive Room. En tant que <strong>lieu séminaire oise</strong> de premier plan, ces domaines accueillent chaque année les plus grandes conventions d'entreprise françaises et internationales. Leur localisation en forêt de Chantilly, à 35 min de Paris et 15 min de CDG, en fait des adresses idéales pour les séminaires résidentiels de 2 à 5 jours.</p>

<h2>Budget séminaire dans l'Oise en 2026</h2>
<p>L'Oise offre un excellent rapport qualité/prix. Les formules journée d'étude démarrent à 120 € par personne (salle équipée + déjeuner). Les formules résidentielles sont comprises entre 250 et 380 € par personne (chambre, repas, activité team building) — soit 20 à 30 % moins cher qu'un lieu équivalent à Paris, pour un cadre supérieur. Nos conseillers établissent un devis détaillé et personnalisé sous 24h.</p>`,
    breadcrumb: [
      { name: "Accueil", url: "/" },
      { name: "Séminaire Château Oise", url: "/seminaire-chateau-oise-60" },
    ],
  },

  // ============================================
  // PAGE 5: YVELINES (78)
  // ============================================
  {
    slug: "seminaire-chateau-yvelines-78",
    title: "Séminaire Château Yvelines (78) : Abbaye en Vallée de Chevreuse",
    description:
      "Séminaire en château dans les Yvelines (78). Abbaye cistercienne rénovée, 144 chambres, 14 salles sur 80 ha en Vallée de Chevreuse. À 45 min de Paris. Devis gratuit.",
    keywords: ["seminaire vallee de chevreuse", "séminaire yvelines", "seminaire yvelines", "château séminaire yvelines 78", "salle séminaire yvelines", "abbaye chevreuse séminaire", "séminaire chevreuse", "séminaire 78", "chateau seminaire 78"],
    ogTitle: "Séminaire en Château dans les Yvelines (78) | Select Châteaux",
    ogDescription:
      "Abbaye cistercienne rénovée 2023 dans les Yvelines. 144 chambres, 14 salles, 80ha, 6 restaurants Paris Society. À 45 min de Paris.",
    canonical: "/seminaire-chateau-yvelines-78",
    h1: "Séminaire en Château dans les Yvelines",
    heroAccroche:
      "Une abbaye millénaire au cœur de la Vallée de Chevreuse",
    heroImage: "/images/seminaires-soirees-entreprise-hero.webp",
    introTitre: "Séminaire en château dans les Yvelines : une abbaye millénaire en Vallée de Chevreuse",
    introduction: `La Vallée de Chevreuse, un écrin de nature à 45 min de Paris : le Parc Naturel Régional de la Haute Vallée de Chevreuse couvre 63 300 hectares — six fois la superficie de Paris — dont 47 % de forêts protégées. C'est au cœur de ce poumon vert du Bassin parisien que Select Châteaux a sélectionné un lieu d'exception : une abbaye cistercienne fondée en 1118, entièrement rénovée en 2023, nichée sur un domaine de 80 hectares en forêt de Rambouillet. Le cadre ultime pour un séminaire résidentiel où nature, patrimoine et performance se conjuguent. 144 chambres, 14 salles, 6 restaurants Paris Society : ce domaine marie patrimoine millénaire et confort contemporain dans un décor signé Cordélia de Castellane. Le mythique Réfectoire des Moines de 500 m² accueille 300 personnes en cocktail, un cinéma privé de 48 places et un spa d'exception complètent l'offre. Padel, tennis, VTT, barque sur le lac — les activités de cohésion d'équipe se vivent en pleine nature. L'absence de réseau GSM dans la vallée garantit une déconnexion totale : vos équipes sont 100 % immergées dans votre événement. Séminaire résidentiel, retraite de direction, CODIR ou gala de 300 personnes : l'abbaye s'adapte à tous les formats avec un accompagnement sur-mesure. En 2026, le bien-être et la RSE sont les critères n°1 dans le choix d'un lieu de séminaire — ce domaine labellisé y répond parfaitement. Budget moyen résidentiel : 240 à 300 € par personne. Demandez votre devis personnalisé sous 24 h et offrez à vos collaborateurs une expérience qui transforme.`,
    pourquoiTitre: "Pourquoi les Yvelines pour votre séminaire en château ?",
    pointsForts: [
      {
        titre: "Déconnexion totale",
        description:
          "L'absence de réseau GSM dans la vallée garantit une concentration maximale. Vos équipes sont véritablement immergées dans le séminaire, sans distractions extérieures.",
        icon: "WifiOff",
      },
      {
        titre: "Patrimoine classé",
        description:
          "Abbaye cistercienne du XIIe siècle entièrement rénovée en 2023. Décor signé Cordélia de Castellane, Réfectoire des Moines de 500 m², ruines romantiques, cloître préservé. Un patrimoine millénaire sublimé par le luxe contemporain.",
        icon: "Castle",
      },
      {
        titre: "Étang & nature",
        description:
          "Un domaine de 80 hectares en forêt de Rambouillet avec lac privé. Barque, pédalo, VTT, padel, tennis. 6 restaurants et bars signés Paris Society, cinéma privé et gaming room pour vos soirées.",
        icon: "Waves",
      },
      {
        titre: "Acoustique exceptionnelle",
        description:
          "Isolé en pleine nature, le domaine ne connaît aucune contrainte sonore. Parfait pour les soirées festives, galas et événements musicaux dans les salles voûtées.",
        icon: "Music",
      },
    ],
    chateauxIds: ["3"],
    infosPratiques: [
      { label: "Département", value: "Yvelines (78)" },
      { label: "Depuis Paris (A13)", value: "45 min" },
      { label: "Aéroports", value: "Orly (40 min), CDG (1h)" },
      { label: "Capacité", value: "60 à 300 personnes" },
      { label: "Chambres", value: "144 chambres (3 bâtisses)" },
      { label: "Domaine", value: "80 hectares en forêt de Rambouillet" },
    ],
    blogLinks: [
      {
        slug: "seminaire-yvelines-78-luxe-proximite",
        title: "Séminaire dans les Yvelines (78) : Luxe et proximité",
      },
      {
        slug: "seminaire-eco-responsable-rse",
        title: "RSE et Événementiel : Organiser un séminaire éco-responsable",
      },
      {
        slug: "yoga-meditation-bien-etre-seminaire",
        title: "Yoga et Méditation : Intégrer le bien-être au séminaire",
      },
      {
        slug: "seminaire-nature-chevreuse-deconnexion",
        title: "Séminaire au Vert près de Paris : La Vallée de Chevreuse à 35 min",
      },
      {
        slug: "budget-seminaire-entreprise-2026-planifier",
        title: "Budget Séminaire 2026 : Coût Réel par Tête & Économies",
      },
      {
        slug: "checklist-organiser-seminaire",
        title: "Checklist Séminaire 2026 : 25 Étapes [Gratuit]",
      },
    ],
    faq: [
      {
        question: "Quel type de château proposez-vous dans les Yvelines ?",
        answer:
          "Nous proposons une abbaye cistercienne du XIIe siècle, entièrement rénovée en 2023 dans un décor signé Cordélia de Castellane. Ce domaine de 80 hectares en forêt de Rambouillet offre 144 chambres dans 3 bâtisses, 14 salles de réunion, 6 restaurants Paris Society et accueille de 60 à 300 personnes.",
      },
      {
        question: "L'absence de réseau GSM est-elle un inconvénient ?",
        answer:
          "C'est en réalité un avantage stratégique. Le Wi-Fi est disponible dans toutes les zones de travail et chambres. L'absence de réseau mobile élimine les distractions et permet une immersion totale dans le séminaire. Nos équipes peuvent relayer les messages urgents si nécessaire.",
      },
      {
        question: "Quelles activités propose l'abbaye dans les Yvelines ?",
        answer:
          "Un terrain de jeu de 80 hectares : barque et pédalo sur le lac, murder party dans les ruines, olympiades, rallye et chasse au trésor, ateliers cuisine et œnologie, VTT, padel, tennis, escape game grandeur nature. Cinéma privé, gaming room et karaoké pour les soirées.",
      },
      {
        question: "Le domaine est-il adapté aux retraites de direction (CODIR) ?",
        answer:
          "C'est sa spécialité. Le cadre contemplatif de l'abbaye, l'isolement naturel et les espaces intimistes en font le lieu idéal pour les réflexions stratégiques, CODIR et retraites de leadership. La déconnexion totale permet aux dirigeants de se concentrer pleinement.",
      },
      {
        question: "Comment accéder à l'abbaye depuis Paris ?",
        answer:
          "En voiture : environ 45 minutes par l'A13 puis la N10 direction Chevreuse. Nous organisons des navettes privées depuis Paris, les gares et aéroports. Un plan d'accès détaillé est fourni à tous les participants.",
      },
    ],
    contenuSEO: `<h2>La Vallée de Chevreuse : un écrin naturel d'exception</h2>
<p>La Vallée de Chevreuse est l'un des trésors méconnus de l'Île-de-France. Classée Parc naturel régional, elle offre des paysages vallonnés, des forêts de chênes et de hêtres, et un patrimoine architectural remarquable. Notre abbaye cistercienne en est la pièce maîtresse : fondée au XIIe siècle, elle a traversé les siècles en conservant l'authenticité de son architecture monastique tout en intégrant le confort moderne. C'est un lieu unique en France pour organiser un séminaire d'entreprise.</p>

<h2>L'expérience monastique au service de la stratégie</h2>
<p>Il y a une raison pour laquelle les moines cisterciens choisissaient des lieux isolés pour leurs abbayes : la sérénité du cadre favorise la réflexion profonde. Ce principe vaut aussi pour vos séminaires d'entreprise. Loin du bruit de la ville et des sollicitations permanentes, vos équipes peuvent se concentrer pleinement sur leurs objectifs. Les salles voûtées monumentales, les galeries en pierre et le cloître préservé créent une atmosphère propice aux échanges authentiques et aux prises de décision stratégiques.</p>

<h2>Un domaine immersif de 80 hectares</h2>
<p>Le lac privé et les 80 hectares de forêt offrent un terrain d'activités unique : barque, pédalo, murder party dans les ruines, rallye, VTT, padel, tennis, escape game grandeur nature. Rénovée en 2023, l'abbaye propose désormais 6 restaurants et bars signés Paris Society, un cinéma privé de 200 m², une gaming room et un karaoké. Le Réfectoire des Moines de 500 m² accueille jusqu'à 300 personnes en cocktail sous ses voûtes monumentales — un décor spectaculaire pour vos galas et soirées d'entreprise.</p>

<h2>Hôtel séminaire dans les Yvelines : l'abbaye comme alternative au grand hôtel</h2>
<p>Les Yvelines (78) concentrent plusieurs <strong>hôtels séminaires</strong> dans la Vallée de Chevreuse. Notre abbaye cistercienne rénovée en 2023 se distingue comme le <strong>lieu séminaire yvelines</strong> le plus complet du marché : 144 chambres dans 3 bâtisses, 14 salles de réunion et 80 hectares de forêt de Rambouillet. Bien plus qu'un <strong>hôtel séminaire 78</strong> classique, c'est une expérience immersive totale dans un cadre classé. La déconnexion GSM et le cadre naturel protégé en font le choix n°1 des DRH pour les séminaires de transformation et retraites de direction.</p>

<h2>Tarifs séminaire dans les Yvelines en 2026</h2>
<p>L'abbaye propose des formules résidentielles à partir de 240 € par personne par jour (hébergement, petits-déjeuners, dîner, accès au spa). Les formules complètes avec repas gastronomiques Paris Society et activités team building sont comprises entre 280 et 350 €. Pour les CODIR de 10 à 20 personnes, des salons intimistes avec tarifs préférentiels sont disponibles. Devis personnalisé sous 24h.</p>`,
    breadcrumb: [
      { name: "Accueil", url: "/" },
      { name: "Séminaire Château Yvelines", url: "/seminaire-chateau-yvelines-78" },
    ],
  },

  // ============================================
  // PAGE 6: HAUTS-DE-SEINE (92)
  // ============================================
  {
    slug: "seminaire-chateau-hauts-de-seine-92",
    title: "Séminaire Château Hauts-de-Seine (92) : Hôtel 5★ en Métro",
    description:
      "Séminaire en château dans les Hauts-de-Seine. MGallery 5★, 83 chambres vue Tour Eiffel, spa 360m², 9 salles, restaurant bio Marguerite 1606. Métro ligne 12. Devis gratuit 24h.",
    keywords: ["seminaire entreprise hauts-de-seine", "séminaire château 92", "hôtel séminaire paris 92", "lieu séminaire hauts-de-seine", "séminaire métro paris", "séminaire entreprise issy"],
    ogTitle: "Séminaire en Château Hauts-de-Seine (92) | Select Châteaux",
    ogDescription:
      "Boutique-hôtel MGallery 5★ dans le 92. 83 chambres vue Tour Eiffel, spa 360m², restaurant bio, accessible métro L12. Séminaires de prestige.",
    canonical: "/seminaire-chateau-hauts-de-seine-92",
    h1: "Séminaire en Château dans les Hauts-de-Seine",
    heroAccroche:
      "Boutique-hôtel MGallery 5 étoiles avec vue Tour Eiffel, accessible métro",
    heroImage: "/images/seminaires-soirees-entreprise-hero.webp",
    introTitre: "Séminaire en château dans les Hauts-de-Seine : un hôtel 5 étoiles confidentiel aux portes de Paris",
    introduction: `L'adresse la plus confidentielle d'Île-de-France : à 4 minutes à pied du métro Mairie d'Issy (ligne 12), soit 2 arrêts de Paris, ce boutique-hôtel MGallery 5 étoiles est le secret le mieux gardé des organisateurs de CODIR et COMEX. Classé Monument Historique depuis 1996, ce domaine du XVIIe siècle — ancienne retraite royale de Marguerite de Valois en 1606 — offre un dépaysement saisissant : vue imprenable sur la Tour Eiffel, jardin botanique de 5 000 m² et chapelle désacralisée transformée en bar à rhum exclusif avec 400 références. 83 chambres et suites au design contemporain, 9 espaces de réunion modulables : du CODIR de 10 personnes au séminaire stratégique de 180 participants, chaque format est sublimé par un cadre 5 étoiles. Spa de 360 m² avec piscine intérieure, sauna, hammam et studio de yoga, restaurant bistronomique Marguerite 1606 privilégiant les produits bio et locaux, institut de beauté Anne Semonin — vos collaborateurs alternent sessions de travail et moments de bien-être dans un même lieu. Le chef Jean-Philippe Perol compose des menus sur-mesure pour vos déjeuners de travail et dîners de gala. Confidentialité et standing pour vos décisions stratégiques : les Hauts-de-Seine abritent 14 entreprises du CAC 40 et le premier quartier d'affaires d'Europe à La Défense. Ce lieu confidentiel, labellisé Clef Verte, est l'adresse de référence pour les réunions de direction où discrétion et inspiration sont essentielles. Accessible en métro, zéro logistique de transport — vos participants arrivent détendus et opérationnels. Select Châteaux vous accompagne de la conception à la réalisation : demandez votre devis gratuit sous 24 h.`,
    pourquoiTitre: "Pourquoi les Hauts-de-Seine pour votre séminaire en château ?",
    pointsForts: [
      {
        titre: "Accessible en métro",
        description:
          "4 minutes à pied de la station Mairie d'Issy (métro ligne 12), à seulement 2 arrêts de Paris. Parking avec voiturier, bornes de recharge électriques et rack à vélos. Zéro logistique de transport.",
        icon: "Train",
      },
      {
        titre: "Monument Historique",
        description:
          "Vue imprenable sur la Tour Eiffel depuis les terrasses, jardin botanique de 5 000 m², chapelle désacralisée transformée en bar à rhum. Un domaine au charme unique labellisé Clef Verte.",
        icon: "Landmark",
      },
      {
        titre: "Standing 5 étoiles",
        description:
          "83 chambres et suites MGallery dont des Junior Suites vue Tour Eiffel. Spa 360 m² avec piscine, sauna, hammam et studio de yoga. Restaurant bistronomique bio Marguerite 1606. Service de conciergerie dédié.",
        icon: "Star",
      },
      {
        titre: "Confidentialité absolue",
        description:
          "L'adresse de référence pour les réunions stratégiques. CODIR, COMEX, conseils d'administration : la discrétion est garantie dans un cadre qui inspire confiance et sérieux.",
        icon: "Shield",
      },
    ],
    chateauxIds: ["2"],
    infosPratiques: [
      { label: "Département", value: "Hauts-de-Seine (92)" },
      { label: "Métro", value: "Ligne 12 — Mairie d'Issy (4 min)" },
      { label: "Depuis Paris centre", value: "2 arrêts de métro" },
      { label: "Capacité", value: "80 à 180 personnes" },
      { label: "Chambres", value: "83 chambres et suites" },
      { label: "Standing", value: "MGallery 5★ — Labellisé Clef Verte" },
    ],
    blogLinks: [
      {
        slug: "organiser-codir-confidentiel",
        title: "Comment organiser un CODIR confidentiel : Les critères de sécurité",
      },
      {
        slug: "petits-comites-lieux-intimes-board",
        title: "Petits Comités : 5 lieux intimistes pour votre Board",
      },
      {
        slug: "repas-seminaire-tendances-traiteur-2026",
        title: "Repas de Séminaire : Les tendances traiteur 2026",
      },
    ],
    faq: [
      {
        question: "Quel château proposez-vous dans les Hauts-de-Seine ?",
        answer:
          "Le domaine dans le 92 est un boutique-hôtel 5 étoiles de la collection MGallery by Accor. Il dispose de 83 chambres et suites (dont des Junior Suites vue Tour Eiffel), d'un jardin botanique de 5 000 m², d'un spa de 360 m² avec piscine, d'une chapelle transformée en bar à rhum et du restaurant bistronomique bio Marguerite 1606. Labellisé Clef Verte.",
      },
      {
        question: "Comment accéder au domaine en transports en commun ?",
        answer:
          "Le domaine est à 4 minutes à pied de la station Mairie d'Issy (métro ligne 12), soit à seulement 2 arrêts de Paris. Parking avec voiturier, bornes de recharge électriques et rack à vélos. C'est le seul domaine château d'exception accessible en métro.",
      },
      {
        question: "Ce lieu est-il adapté pour un CODIR ou un COMEX ?",
        answer:
          "C'est sa spécialité. Les salons historiques offrent un cadre confidentiel et prestigieux pour les réunions de direction. Le service de conciergerie 5 étoiles garantit une attention sans faille. La proximité de Paris facilite les agendas chargés des dirigeants.",
      },
      {
        question: "Le domaine dispose-t-il d'un restaurant gastronomique ?",
        answer:
          "Le restaurant Marguerite 1606 propose une cuisine bistronomique engagée, privilégiant les produits bio, de saison et sourcés localement. 2 bars dont le bar à rhum dans la chapelle. Menus personnalisables, dégustations œnologiques. Tous les régimes alimentaires accommodés.",
      },
      {
        question: "Peut-on organiser un événement en soirée avec le jardin suspendu ?",
        answer:
          "Le jardin botanique de 5 000 m² et la terrasse avec vue sur la Tour Eiffel sont magiques pour vos cocktails en plein air. Le restaurant Marguerite 1606 (160 m²) accueille 100 personnes en cocktail, la terrasse jardin 98 personnes. Privatisation complète possible.",
      },
    ],
    contenuSEO: `<h2>Les Hauts-de-Seine : le prestige aux portes de Paris</h2>
<p>Les Hauts-de-Seine sont le département le plus dynamique de la première couronne parisienne. Siège de La Défense, premier quartier d'affaires européen, le 92 concentre les sièges sociaux des plus grandes entreprises. C'est dans ce contexte de business premium que se cache ce domaine d'exception : un boutique-hôtel MGallery 5 étoiles, oasis de calme et de verdure à seulement 2 arrêts de métro de Paris.</p>

<h2>Un domaine MGallery au charme unique</h2>
<p>Ce boutique-hôtel de la collection MGallery by Accor offre 83 chambres et suites au design contemporain raffiné, dont des Junior Suites avec vue sur la Tour Eiffel. Le domaine se distingue par ses espaces uniques : une chapelle désacralisée transformée en bar à rhum, un jardin botanique de 5 000 m² avec terrasse panoramique, un spa de 360 m² avec piscine intérieure, sauna, hammam et studio de yoga, et le restaurant bistronomique Marguerite 1606 privilégiant les produits bio et locaux. Labellisé Clef Verte, le domaine allie prestige et engagement environnemental.</p>

<h2>L'adresse des décideurs</h2>
<p>9 espaces de réunion modulables s'adaptent à tous les formats : du salon board Agastache (50 m², 17 personnes) pour vos CODIR, au restaurant Marguerite 1606 (160 m², 100 en cocktail) pour vos réceptions. La terrasse jardin de 100 m² accueille vos cocktails en plein air face à la Tour Eiffel. Accessible en 4 minutes à pied depuis la station Mairie d'Issy (métro ligne 12), c'est l'adresse privilégiée des entreprises qui exigent confidentialité, standing et accessibilité.</p>`,
    breadcrumb: [
      { name: "Accueil", url: "/" },
      { name: "Séminaire Château Hauts-de-Seine", url: "/seminaire-chateau-hauts-de-seine-92" },
    ],
  },
];

/**
 * Helper pour trouver une page géo par son slug
 */
export function getGeoLandingPage(slug: string): GeoLandingPage | undefined {
  return geoLandingPages.find((page) => page.slug === slug);
}

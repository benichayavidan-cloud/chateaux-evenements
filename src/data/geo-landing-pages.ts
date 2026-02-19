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
    title: "Séminaire en Château en Île-de-France | 4 Domaines d'Exception",
    description:
      "Organisez votre séminaire en château en Île-de-France. 4 domaines exclusifs de 50 à 280 personnes, à 30-45 min de Paris. Devis gratuit sous 24h.",
    keywords: [
      "château séminaire île de france",
      "séminaire château ile de france",
      "location château séminaire île-de-france",
      "lieu séminaire prestige île-de-france",
      "domaine séminaire résidentiel île-de-france",
    ],
    ogTitle: "Séminaire en Château en Île-de-France | Select Châteaux",
    ogDescription:
      "4 châteaux d'exception pour vos séminaires d'entreprise en Île-de-France. De 50 à 280 personnes, à 30-45 min de Paris.",
    canonical: "/seminaire-chateau-ile-de-france",
    h1: "Séminaire en Château en Île-de-France",
    heroAccroche:
      "4 domaines d'exception aux portes de Paris pour vos événements d'entreprise",
    heroImage: "/images/seminaires-soirees-entreprise-hero.webp",
    introTitre: "Un patrimoine d'exception aux portes de Paris",
    introduction: `L'Île-de-France concentre un patrimoine historique d'une richesse exceptionnelle. À moins d'une heure de Paris, des châteaux centenaires ouvrent leurs portes aux entreprises en quête d'un cadre hors du commun pour leurs séminaires. Organiser un séminaire en château en Île-de-France, c'est offrir à vos collaborateurs une parenthèse inspirante, loin de l'agitation urbaine, tout en restant facilement accessible depuis la capitale et ses gares TGV. Chez Select Châteaux, nous avons sélectionné 4 domaines d'exception — du manoir anglo-normand à l'abbaye millénaire — qui répondent à toutes les configurations : séminaires résidentiels de 50 à 280 participants, journées d'étude, CODIR, team building ou soirées de gala. Chaque lieu offre des salles de réunion équipées, un hébergement premium, une restauration gastronomique et un cadre naturel propice à la cohésion d'équipe. Notre accompagnement sur-mesure vous garantit un événement clé en main, de la conception à la réalisation.`,
    pourquoiTitre: "Pourquoi organiser votre séminaire en château en Île-de-France ?",
    pointsForts: [
      {
        titre: "Proximité de Paris",
        description:
          "Tous nos châteaux sont situés entre 30 et 45 minutes de Paris, accessibles en voiture, navette ou transports en commun. L'un d'eux est même desservi par le métro.",
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
          "De 50 à 280 personnes en résidentiel, nos 4 châteaux couvrent tous les formats : petit CODIR intime, séminaire de direction, convention de grande envergure.",
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
      { label: "Capacité globale", value: "50 à 280 personnes" },
      { label: "Chambres disponibles", value: "83 à 147 par domaine" },
      { label: "Devis personnalisé", value: "Réponse sous 24h" },
    ],
    blogLinks: [
      {
        slug: "combien-coute-seminaire-chateau-2026",
        title: "Combien coûte un séminaire en château en 2026 ?",
      },
      {
        slug: "top-10-chateaux-seminaire-ile-de-france",
        title: "Top 10 des châteaux pour séminaire en Île-de-France",
      },
      {
        slug: "organiser-seminaire-chateau-guide-complet",
        title: "Guide complet : organiser un séminaire en château",
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
          "Notre plus grand domaine accueille jusqu'à 280 personnes en résidentiel avec 120 chambres. Pour les événements non-résidentiels, la capacité peut aller au-delà. Nos 4 châteaux couvrent des formats de 50 à 280 participants.",
      },
      {
        question: "Les châteaux sont-ils accessibles en transports en commun ?",
        answer:
          "Un de nos domaines (Hauts-de-Seine, 92) est accessible en métro à 5 minutes à pied. Pour les autres, nous organisons des navettes privées depuis Paris, les gares ou les aéroports.",
      },
      {
        question: "Peut-on organiser un séminaire résidentiel d'une nuit ?",
        answer:
          "Oui, nos châteaux proposent des formules résidentielles d'une ou plusieurs nuits. Le format le plus courant est le séminaire de 2 jours / 1 nuit, idéal pour alterner sessions de travail et moments de cohésion.",
      },
      {
        question: "Quelles activités team building peut-on organiser dans un château ?",
        answer:
          "Nos châteaux proposent un large éventail : olympiades dans le parc, chasse au trésor, ateliers culinaires avec chef, dégustations de vins, escape game, parcours aventure en forêt, activités nautiques sur étang, séances de spa et bien-être.",
      },
      {
        question: "Comment réserver un château pour un séminaire ?",
        answer:
          "Remplissez notre formulaire de devis en ligne. Notre équipe vous recontacte sous 24h avec une proposition personnalisée incluant le lieu le mieux adapté à votre projet, un programme détaillé et un devis complet.",
      },
    ],
    contenuSEO: `<h2>L'Île-de-France, terre de châteaux pour vos séminaires</h2>
<p>Première région économique de France, l'Île-de-France est aussi un territoire au patrimoine architectural exceptionnel. Avec plus de 300 châteaux et domaines historiques, la région offre un potentiel unique pour l'événementiel d'entreprise. Nos 4 châteaux soigneusement sélectionnés se répartissent dans trois départements stratégiques : l'Oise (60) au nord avec deux domaines à Chantilly, les Yvelines (78) au sud-ouest avec une abbaye millénaire, et les Hauts-de-Seine (92) aux portes immédiates de Paris.</p>

<h2>Un séminaire en château : l'impact sur vos équipes</h2>
<p>Sortir du cadre habituel du bureau transforme radicalement la dynamique d'un séminaire. Un château offre un « effet wow » immédiat qui marque les esprits et favorise l'engagement des participants. L'architecture historique, les jardins d'exception et l'éloignement de la vie quotidienne créent les conditions idéales pour la créativité, la réflexion stratégique et le renforcement des liens entre collaborateurs. Selon notre expérience de plus de 500 événements organisés, 98% des entreprises constatent un impact positif sur la cohésion d'équipe après un séminaire en château.</p>

<h2>Des formats adaptés à chaque besoin</h2>
<p>Que vous planifiiez un CODIR de 15 personnes, un séminaire de direction de 80 cadres ou une convention annuelle de 250 collaborateurs, nos châteaux franciliens s'adaptent. Chaque domaine dispose de salles de réunion modulables, d'équipements audiovisuels professionnels et d'espaces de travail en sous-groupes. Les configurations vont du board meeting intimiste dans un salon historique à la plénière en amphithéâtre de 280 places.</p>`,
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
    title: "Séminaire en Château Proche de Paris | 30-45 min de la Capitale",
    description:
      "Trouvez votre château pour séminaire proche de Paris. 4 domaines exclusifs à 30-45 min, de 50 à 280 pers. Navettes, hébergement premium. Devis gratuit 24h.",
    keywords: [
      "séminaire château proche paris",
      "château séminaire près de paris",
      "lieu séminaire château paris",
      "séminaire résidentiel proche paris",
      "château événement entreprise paris",
    ],
    ogTitle: "Séminaire en Château Proche de Paris | Select Châteaux",
    ogDescription:
      "4 châteaux pour séminaire à 30-45 min de Paris. Hébergement, salles équipées, restauration gastronomique. Devis gratuit.",
    canonical: "/seminaire-chateau-proche-paris",
    h1: "Séminaire en Château Proche de Paris",
    heroAccroche:
      "L'excellence événementielle à 30 minutes de la capitale",
    heroImage: "/images/seminaires-soirees-entreprise-hero.webp",
    introTitre: "L'excellence événementielle à proximité immédiate",
    introduction: `Organiser un séminaire en château près de Paris, c'est conjuguer le prestige d'un lieu historique avec la praticité d'un accès rapide depuis la capitale. Vos collaborateurs quittent leur bureau le matin et se retrouvent, moins d'une heure plus tard, dans un cadre totalement dépaysant : parcs arborés, salons historiques, jardins classés. Nos 4 châteaux sont tous situés entre 30 et 45 minutes de Paris par la route, et l'un d'entre eux est même accessible en métro. Ce positionnement stratégique permet d'optimiser le temps de vos équipes tout en offrant un véritable changement de décor. Plus besoin de prévoir de longs trajets ou des vols intérieurs : le dépaysement est aux portes de Paris. Nous prenons en charge l'intégralité de l'organisation : navettes depuis vos bureaux ou les gares, hébergement en chambres premium, restauration gastronomique, salles de réunion équipées et activités team building adaptées à vos objectifs.`,
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
        slug: "top-10-chateaux-seminaire-ile-de-france",
        title: "Top 10 des châteaux pour séminaire en Île-de-France",
      },
      {
        slug: "combien-coute-seminaire-chateau-2026",
        title: "Combien coûte un séminaire en château en 2026 ?",
      },
      {
        slug: "checklist-organisation-seminaire-chateau",
        title: "Checklist : organiser un séminaire en château",
      },
    ],
    faq: [
      {
        question: "Quel est le château le plus proche de Paris ?",
        answer:
          "Notre Domaine Historique dans les Hauts-de-Seine (92) est le plus proche : accessible en métro à 5 minutes à pied d'une station, soit environ 20 minutes depuis le centre de Paris. C'est un ancien bâtiment du XVIIe siècle classé, aujourd'hui hôtel 5 étoiles.",
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
          "Oui, tous nos châteaux disposent de parkings privés gratuits pouvant accueillir de 50 à 200 véhicules. Un service de voiturier peut être organisé pour les événements de prestige.",
      },
      {
        question: "Peut-on visiter le château avant de réserver ?",
        answer:
          "Nous organisons des visites de repérage gratuites sur rendez-vous. C'est l'occasion de découvrir les lieux, rencontrer l'équipe sur place et affiner votre projet avec votre conseiller Select Châteaux dédié.",
      },
    ],
    contenuSEO: `<h2>Paris et ses châteaux : un patrimoine à portée de main</h2>
<p>La région parisienne regorge de domaines historiques qui ont traversé les siècles. Résidences royales, abbayes médiévales, manoirs de la Belle Époque : à quelques kilomètres du périphérique, un autre monde s'ouvre. Nos 4 châteaux sélectionnés incarnent cette diversité exceptionnelle. Au nord, la région de Chantilly offre deux domaines au cœur de forêts domaniales. Au sud-ouest, la Vallée de Chevreuse abrite une abbaye cistercienne classée dans un écrin de 70 hectares. Et aux portes mêmes de Paris, un hôtel 5 étoiles dans une bâtisse classée Monument Historique.</p>

<h2>L'avantage décisif de la proximité</h2>
<p>Organiser un séminaire proche de Paris élimine le principal frein logistique : le transport. Fini les billets d'avion, les transferts complexes et les demi-journées perdues en déplacement. En 30 à 45 minutes, vos collaborateurs passent de leur bureau à un cadre d'exception. Cette proximité permet aussi une grande flexibilité : séminaires à la journée, événements sur 2 jours / 1 nuit, ou formats plus longs. Les participants avec des contraintes peuvent facilement arriver plus tard ou repartir plus tôt.</p>

<h2>Un château pour chaque format de séminaire</h2>
<p>Du CODIR confidentiel de 15 personnes au kick-off annuel de 280 collaborateurs, nos châteaux proches de Paris s'adaptent à tous les formats. Chaque lieu a sa personnalité : le prestige classique d'un château Louis XV, l'authenticité spirituelle d'une abbaye cistercienne, le charme anglo-normand d'un manoir en forêt, ou l'élégance contemporaine d'un hôtel 5 étoiles classé. Votre conseiller Select Châteaux vous guide vers le domaine qui correspond le mieux à votre projet et à votre budget.</p>`,
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
    title: "Séminaire en Château à Chantilly | 2 Domaines Prestige",
    description:
      "Organisez votre séminaire en château à Chantilly. 2 domaines de prestige au cœur de la forêt : manoir 280 pers et château 5★ 200 pers. À 35 min de Paris. Devis 24h.",
    keywords: [
      "château séminaire chantilly",
      "séminaire château chantilly",
      "lieu séminaire chantilly",
      "domaine séminaire chantilly forêt",
      "château événement entreprise chantilly",
    ],
    ogTitle: "Séminaire en Château à Chantilly | Select Châteaux",
    ogDescription:
      "2 châteaux de prestige à Chantilly pour vos séminaires. Forêt domaniale, spa, amphithéâtre. À 35 min de Paris.",
    canonical: "/seminaire-chateau-chantilly",
    h1: "Séminaire en Château à Chantilly",
    heroAccroche:
      "2 domaines de prestige au cœur de la forêt de Chantilly",
    heroImage: "/images/seminaires-soirees-entreprise-hero.webp",
    introTitre: "Le prestige de Chantilly pour vos séminaires",
    introduction: `Chantilly est synonyme d'excellence, de patrimoine et de raffinement. Cette ville emblématique de l'Oise, célèbre pour son château princier, ses écuries royales et son hippodrome, est aussi un haut lieu de l'événementiel d'entreprise. À 35 minutes de Paris par l'autoroute A1 et à 30 minutes de l'aéroport Roissy-Charles de Gaulle, Chantilly offre un accès remarquable pour vos participants venant de toute la France ou de l'international. Select Châteaux a sélectionné 2 domaines d'exception au cœur de la forêt de Chantilly : un grand manoir de style anglo-normand de 120 chambres pouvant accueillir 280 personnes, et un château 5 étoiles de style Louis XV niché dans 500 hectares de forêt domaniale. Deux caractères distincts, une même promesse d'excellence pour vos séminaires résidentiels, conventions, lancements de produits et soirées de gala.`,
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
          "Un manoir anglo-normand de 280 places avec amphithéâtre et spa, et un château Louis XV 5 étoiles de 200 places avec salle de bal et spa 1500m². Deux lieux complémentaires pour tous vos formats.",
        icon: "Building2",
      },
      {
        titre: "Accès rapide & international",
        description:
          "35 min de Paris (A1), 30 min de CDG, desserte TGV gare TGV Haute-Picardie. Idéal pour les conventions avec des participants internationaux.",
        icon: "Plane",
      },
    ],
    chateauxIds: ["1", "4"],
    infosPratiques: [
      { label: "Depuis Paris", value: "35 min par A1" },
      { label: "Depuis CDG", value: "30 min" },
      { label: "Depuis Orly", value: "55 min" },
      { label: "Gare la plus proche", value: "Chantilly-Gouvieux (25 min TER)" },
      { label: "Capacité combinée", value: "Jusqu'à 280 personnes" },
      { label: "Chambres", value: "120 + 108 = 228 chambres" },
    ],
    blogLinks: [
      {
        slug: "top-10-chateaux-seminaire-ile-de-france",
        title: "Top 10 des châteaux pour séminaire en Île-de-France",
      },
      {
        slug: "seminaire-nature-foret-bienfaits-equipes",
        title: "Les bienfaits d'un séminaire en pleine nature",
      },
      {
        slug: "combien-coute-seminaire-chateau-2026",
        title: "Combien coûte un séminaire en château en 2026 ?",
      },
    ],
    faq: [
      {
        question: "Quels sont les deux châteaux disponibles à Chantilly ?",
        answer:
          "Nous proposons un grand manoir de style anglo-normand (120 chambres, 280 personnes, amphithéâtre, spa 800m²) et un château 5 étoiles de style Louis XV (108 chambres, 200 personnes, salle de bal, spa 1500m²). Deux styles architecturaux distincts pour des expériences différentes.",
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
          "Les deux domaines disposent de spas de prestige : 800m² pour le manoir anglo-normand (piscine, sauna, hammam, cabines de soins) et 1500m² pour le château 5 étoiles (piscine 25m, parcours aquatique, fitness). Les spas sont privatisables pour vos événements.",
      },
    ],
    contenuSEO: `<h2>Chantilly : un écrin de prestige pour vos séminaires</h2>
<p>Depuis des siècles, Chantilly attire les esprits brillants et les événements de prestige. La ville doit sa renommée au Domaine de Chantilly, mais c'est toute la région qui respire l'excellence : forêts domaniales majestueuses, hippodromes mythiques, restaurants gastronomiques et hôtels de caractère. Organiser un séminaire en château à Chantilly, c'est inscrire votre événement dans cette tradition d'exception.</p>

<h2>Deux domaines complémentaires</h2>
<p>Notre manoir anglo-normand est le choix idéal pour les grandes conventions et kick-offs annuels. Avec ses 120 chambres, son amphithéâtre de 280 places et ses 18 salles de réunion, il peut accueillir vos événements les plus ambitieux. Son spa de 800m² avec piscine intérieure offre un espace de détente bienvenu entre les sessions de travail. Le château 5 étoiles de style Louis XV, quant à lui, incarne l'excellence à la française. Sa salle de bal monumentale, son spa de 1500m² et son restaurant gastronomique en font le lieu privilégié des lancements de produits, galas et séminaires de direction où chaque détail compte.</p>

<h2>Un territoire d'activités team building</h2>
<p>La forêt de Chantilly, qui s'étend sur plus de 6 000 hectares, est un terrain d'aventure naturel pour vos activités de cohésion. Rallyes en forêt, parcours d'orientation, olympiades sportives, promenades à cheval : les possibilités sont infinies. Le soir, Chantilly et ses alentours offrent également des expériences gastronomiques et culturelles pour prolonger l'événement dans une ambiance plus décontractée.</p>`,
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
    title: "Séminaire en Château dans l'Oise (60) | 2 Domaines Forêt Chantilly",
    description:
      "Séminaire en château dans l'Oise. 2 domaines prestigieux en forêt de Chantilly : manoir 280 pers + château 5★ 200 pers. À 35 min de Paris & 30 min de CDG. Devis 24h.",
    keywords: [
      "séminaire château oise",
      "château séminaire oise 60",
      "lieu séminaire oise",
      "domaine événement entreprise oise",
      "château séminaire résidentiel oise",
    ],
    ogTitle: "Séminaire en Château dans l'Oise (60) | Select Châteaux",
    ogDescription:
      "2 châteaux dans l'Oise pour vos séminaires d'entreprise. Forêt de Chantilly, spa, amphithéâtre. À 35 min de Paris.",
    canonical: "/seminaire-chateau-oise-60",
    h1: "Séminaire en Château dans l'Oise",
    heroAccroche:
      "2 domaines d'exception en forêt de Chantilly, département de l'Oise",
    heroImage: "/images/seminaires-soirees-entreprise-hero.webp",
    introTitre: "L'Oise, terre de châteaux et de forêts",
    introduction: `Le département de l'Oise (60), au nord de l'Île-de-France, est un territoire de forêts majestueuses et de châteaux séculaires. Traversé par la forêt de Chantilly et bordé par la forêt d'Halatte, l'Oise offre un cadre naturel préservé à seulement 35 minutes de Paris. C'est dans ce département que Select Châteaux a sélectionné ses 2 plus grands domaines : un manoir de style anglo-normand de 280 places et un château 5 étoiles de 200 places, tous deux nichés au cœur de la forêt. L'Oise est particulièrement bien positionnée pour les séminaires d'entreprise : proche de Paris, de l'aéroport CDG et du réseau autoroutier, elle offre un dépaysement total tout en restant facilement accessible. Le département attire chaque année des centaines d'entreprises qui y organisent leurs séminaires résidentiels, conventions et événements de prestige.`,
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
          "Nos 2 domaines de l'Oise sont nos plus grandes capacités : 280 et 200 personnes en résidentiel. Parfaits pour les conventions, kick-offs annuels et grands rassemblements.",
        icon: "Users",
      },
      {
        titre: "Spa & bien-être",
        description:
          "Deux spas de prestige (800m² et 1500m²) avec piscines, soins et fitness. Un atout majeur pour alterner sessions de travail intenses et moments de récupération.",
        icon: "Heart",
      },
    ],
    chateauxIds: ["1", "4"],
    infosPratiques: [
      { label: "Département", value: "Oise (60)" },
      { label: "Depuis Paris (A1)", value: "35 min" },
      { label: "Depuis CDG", value: "30 min" },
      { label: "Gare SNCF", value: "Chantilly-Gouvieux (TER depuis Gare du Nord)" },
      { label: "Capacités", value: "200 à 280 personnes" },
      { label: "Chambres totales", value: "228 chambres (120 + 108)" },
    ],
    blogLinks: [
      {
        slug: "top-10-chateaux-seminaire-ile-de-france",
        title: "Top 10 des châteaux pour séminaire en Île-de-France",
      },
      {
        slug: "seminaire-nature-foret-bienfaits-equipes",
        title: "Les bienfaits d'un séminaire en pleine nature",
      },
      {
        slug: "organiser-convention-entreprise-200-personnes",
        title: "Organiser une convention de 200+ personnes",
      },
    ],
    faq: [
      {
        question: "Combien de châteaux proposez-vous dans l'Oise ?",
        answer:
          "Nous proposons 2 domaines dans l'Oise, tous deux situés dans la région de Chantilly : un grand manoir anglo-normand de 120 chambres (280 personnes) et un château 5 étoiles Louis XV de 108 chambres (200 personnes).",
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
          "Notre manoir anglo-normand accueille jusqu'à 280 personnes en résidentiel avec un amphithéâtre de 280 places. C'est le domaine idéal pour les grandes conventions. Pour des événements encore plus importants, les deux châteaux peuvent être combinés.",
      },
    ],
    contenuSEO: `<h2>L'Oise, département de prestige aux portes de Paris</h2>
<p>L'Oise est un département aux multiples facettes. Connu pour ses forêts domaniales, ses châteaux historiques et sa proximité avec Paris, il est devenu un territoire de prédilection pour l'événementiel d'entreprise. La région de Chantilly, en particulier, concentre des domaines de prestige qui attirent les plus grandes entreprises françaises et internationales. La qualité des infrastructures hôtelières, associée au cadre naturel exceptionnel, en fait une destination de choix pour les séminaires résidentiels.</p>

<h2>Deux domaines complémentaires dans la forêt</h2>
<p>Nos deux châteaux de l'Oise offrent des expériences distinctes mais complémentaires. Le manoir anglo-normand, avec ses 120 chambres et son amphithéâtre de 280 places, est taillé pour les grands événements : conventions, kick-offs, plénières. Son spa de 800m² et ses 18 salles de réunion en font un lieu tout-en-un. Le château 5 étoiles, plus intimiste avec 108 chambres, propose une expérience de luxe avec sa salle de bal, son spa de 1500m² et sa gastronomie étoilée. Parfait pour les CODIR, lancements de produits et événements premium.</p>

<h2>Une destination nature pour le team building</h2>
<p>La forêt de Chantilly, avec ses 6 300 hectares, est l'un des plus beaux massifs forestiers de France. Elle constitue un terrain de jeu idéal pour les activités de cohésion : parcours d'orientation, rallyes nature, VTT, courses d'aventure. Les domaines eux-mêmes disposent de parcs privés où l'on peut organiser olympiades, escape games en plein air et ateliers en immersion dans la nature. Après l'effort, le spa est le lieu parfait pour un moment de détente partagé.</p>`,
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
    title: "Séminaire en Château dans les Yvelines (78) | Abbaye Cistercienne",
    description:
      "Séminaire en château dans les Yvelines. Abbaye cistercienne classée MH, 147 chambres, étang 70ha, salles voûtées. Vallée de Chevreuse à 45 min de Paris. Devis 24h.",
    keywords: [
      "séminaire château yvelines",
      "château séminaire yvelines 78",
      "abbaye séminaire yvelines",
      "lieu séminaire vallée de chevreuse",
      "domaine événement entreprise yvelines",
    ],
    ogTitle: "Séminaire en Château dans les Yvelines (78) | Select Châteaux",
    ogDescription:
      "Abbaye cistercienne classée dans les Yvelines pour vos séminaires. 147 chambres, étang 70ha, déconnexion totale. À 45 min de Paris.",
    canonical: "/seminaire-chateau-yvelines-78",
    h1: "Séminaire en Château dans les Yvelines",
    heroAccroche:
      "Une abbaye millénaire au cœur de la Vallée de Chevreuse",
    heroImage: "/images/seminaires-soirees-entreprise-hero.webp",
    introTitre: "La Vallée de Chevreuse, un écrin de nature",
    introduction: `Les Yvelines (78) abritent l'un des joyaux les mieux gardés de l'Île-de-France : une abbaye cistercienne du XIIe siècle classée Monument Historique, nichée dans le Parc naturel régional de la Haute Vallée de Chevreuse. Ce domaine extraordinaire de 70 hectares avec étang privé offre une expérience de séminaire unique en France. Ici, le temps semble suspendu. Les salles voûtées millénaires, les ruines romantiques et l'absence de réseau GSM créent les conditions d'une déconnexion stratégique totale — un atout précieux pour les entreprises qui souhaitent que leurs équipes se concentrent pleinement sur leurs objectifs. À 45 minutes de Paris par l'autoroute A13, cette abbaye propose 147 chambres et peut accueillir de 60 à 150 personnes en résidentiel. Select Châteaux y organise des retraites de direction, incentives commerciaux, séminaires de réflexion stratégique et team buildings immersifs dans un cadre qui ne ressemble à aucun autre.`,
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
          "Abbaye cistercienne du XIIe siècle classée Monument Historique. Salles voûtées monumentales, ruines romantiques, cloître préservé. Un cadre chargé d'histoire qui inspire le respect et la réflexion.",
        icon: "Castle",
      },
      {
        titre: "Étang & nature",
        description:
          "Un domaine de 70 hectares avec étang privé au cœur du Parc naturel régional. Barques, promenades, activités nautiques. La nature à l'état pur pour vos team buildings.",
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
      { label: "Capacité", value: "60 à 150 personnes" },
      { label: "Chambres", value: "147 chambres" },
      { label: "Domaine", value: "70 hectares avec étang" },
    ],
    blogLinks: [
      {
        slug: "seminaire-nature-foret-bienfaits-equipes",
        title: "Les bienfaits d'un séminaire en pleine nature",
      },
      {
        slug: "top-10-chateaux-seminaire-ile-de-france",
        title: "Top 10 des châteaux pour séminaire en Île-de-France",
      },
      {
        slug: "team-building-chateau-activites-originales",
        title: "Les meilleures activités team building en château",
      },
    ],
    faq: [
      {
        question: "Quel type de château proposez-vous dans les Yvelines ?",
        answer:
          "Nous proposons une abbaye cistercienne du XIIe siècle classée Monument Historique, située dans la Vallée de Chevreuse. Ce domaine de 70 hectares avec étang privé offre 147 chambres et accueille de 60 à 150 personnes en résidentiel.",
      },
      {
        question: "L'absence de réseau GSM est-elle un inconvénient ?",
        answer:
          "C'est en réalité un avantage stratégique. Le Wi-Fi est disponible dans toutes les zones de travail et chambres. L'absence de réseau mobile élimine les distractions et permet une immersion totale dans le séminaire. Nos équipes peuvent relayer les messages urgents si nécessaire.",
      },
      {
        question: "Quelles activités propose l'abbaye dans les Yvelines ?",
        answer:
          "Le domaine offre un éventail unique : barque sur l'étang de 70 hectares, escape game géant dans les ruines historiques, olympiades dans le parc, parcours d'orientation en forêt, ateliers œnologiques. L'acoustique des salles voûtées est aussi idéale pour les soirées musicales et galas.",
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

<h2>Un domaine immersif de 70 hectares</h2>
<p>L'étang de 70 hectares est la pièce maîtresse du domaine. Il offre un panorama spectaculaire et un terrain d'activités unique pour vos team buildings : barques, pédalo, jeux nautiques. Le parc boisé de 65 hectares est le cadre idéal pour les parcours d'aventure, chasses au trésor et olympiades. Les ruines romantiques de l'ancienne église abbatiale constituent un décor exceptionnel pour les escape games grandeur nature et les soirées à thème.</p>`,
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
    title: "Séminaire en Château dans les Hauts-de-Seine (92) | Hôtel 5★ Métro",
    description:
      "Séminaire en château dans les Hauts-de-Seine. Hôtel 5★ classé MH, 83 chambres, jardin suspendu, accessible métro. Aux portes de Paris. Devis gratuit 24h.",
    keywords: [
      "séminaire château hauts de seine",
      "château séminaire hauts de seine 92",
      "lieu séminaire 92",
      "hôtel séminaire luxe paris 92",
      "domaine événement entreprise hauts-de-seine",
    ],
    ogTitle: "Séminaire en Château Hauts-de-Seine (92) | Select Châteaux",
    ogDescription:
      "Hôtel 5 étoiles classé Monument Historique dans le 92. 83 chambres, jardin suspendu, accessible métro. Séminaires de prestige.",
    canonical: "/seminaire-chateau-hauts-de-seine-92",
    h1: "Séminaire en Château dans les Hauts-de-Seine",
    heroAccroche:
      "Un hôtel 5 étoiles classé Monument Historique aux portes de Paris",
    heroImage: "/images/seminaires-soirees-entreprise-hero.webp",
    introTitre: "Un Monument Historique aux portes de Paris",
    introduction: `Les Hauts-de-Seine (92), première couronne parisienne, abritent un secret bien gardé : une bâtisse du XVIIe siècle classée Monument Historique, transformée en hôtel 5 étoiles. Ce domaine d'exception est le seul château-hôtel accessible en métro en Île-de-France. À 5 minutes à pied d'une station de métro, il offre un accès inégalé pour vos collaborateurs tout en proposant un dépaysement total : jardin suspendu classé avec vue panoramique sur Paris, chapelle désacralisée transformée en spa, restaurant gastronomique étoilé et salons historiques pour vos réunions. Ce lieu est l'adresse de référence pour les CODIR, COMEX et séminaires stratégiques qui exigent confidentialité, standing et accessibilité. De 80 à 180 personnes, ce domaine conjugue l'élégance du patrimoine historique avec le confort et la technologie d'un hôtel contemporain de premier plan.`,
    pourquoiTitre: "Pourquoi les Hauts-de-Seine pour votre séminaire en château ?",
    pointsForts: [
      {
        titre: "Accessible en métro",
        description:
          "Le seul château-hôtel d'Île-de-France desservi par le métro. 5 minutes à pied de la station, 20 minutes du centre de Paris. Zéro logistique de transport.",
        icon: "Train",
      },
      {
        titre: "Monument Historique",
        description:
          "Bâtisse du XVIIe siècle classée, avec jardin suspendu classé offrant une vue panoramique sur Paris. Un patrimoine architectural exceptionnel préservé avec soin.",
        icon: "Landmark",
      },
      {
        titre: "Standing 5 étoiles",
        description:
          "83 chambres et suites au design raffiné, restaurant gastronomique étoilé, spa dans une chapelle classée, service de conciergerie. L'excellence hôtelière au service de votre événement.",
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
      { label: "Métro", value: "5 min à pied de la station" },
      { label: "Depuis Paris / La Défense", value: "15 à 20 min" },
      { label: "Capacité", value: "80 à 180 personnes" },
      { label: "Chambres", value: "83 chambres et suites" },
      { label: "Standing", value: "Hôtel 5 étoiles classé MH" },
    ],
    blogLinks: [
      {
        slug: "top-10-chateaux-seminaire-ile-de-france",
        title: "Top 10 des châteaux pour séminaire en Île-de-France",
      },
      {
        slug: "combien-coute-seminaire-chateau-2026",
        title: "Combien coûte un séminaire en château en 2026 ?",
      },
      {
        slug: "organiser-codir-chateau-guide",
        title: "Comment organiser un CODIR en château",
      },
    ],
    faq: [
      {
        question: "Quel château proposez-vous dans les Hauts-de-Seine ?",
        answer:
          "Notre domaine dans le 92 est une bâtisse du XVIIe siècle classée Monument Historique, aujourd'hui hôtel 5 étoiles. Il dispose de 83 chambres et suites, d'un jardin suspendu classé avec vue sur Paris, d'un spa en chapelle classée et d'un restaurant gastronomique étoilé.",
      },
      {
        question: "Comment accéder au domaine en transports en commun ?",
        answer:
          "Le domaine est à 5 minutes à pied d'une station de métro, soit environ 20 minutes depuis le centre de Paris. C'est le seul château-hôtel accessible en métro en Île-de-France. Nous pouvons aussi organiser des navettes depuis les gares et aéroports.",
      },
      {
        question: "Ce lieu est-il adapté pour un CODIR ou un COMEX ?",
        answer:
          "C'est sa spécialité. Les salons historiques offrent un cadre confidentiel et prestigieux pour les réunions de direction. Le service de conciergerie 5 étoiles garantit une attention sans faille. La proximité de Paris facilite les agendas chargés des dirigeants.",
      },
      {
        question: "Le domaine dispose-t-il d'un restaurant gastronomique ?",
        answer:
          "Oui, le restaurant est dirigé par un chef étoilé qui propose une cuisine gastronomique raffinée avec des produits de saison. Les menus sont entièrement personnalisables. La cave à vins d'exception permet d'organiser des dégustations commentées. Tous les régimes alimentaires sont pris en compte.",
      },
      {
        question: "Peut-on organiser un événement en soirée avec le jardin suspendu ?",
        answer:
          "Le jardin suspendu classé est un lieu magique pour les cocktails et réceptions en plein air avec vue panoramique sur Paris. En soirée, l'éclairage créé une ambiance féerique. Le jardin peut être privatisé pour votre événement, accueillant jusqu'à 180 personnes en cocktail.",
      },
    ],
    contenuSEO: `<h2>Les Hauts-de-Seine : le prestige aux portes de Paris</h2>
<p>Les Hauts-de-Seine sont le département le plus dynamique de la première couronne parisienne. Siège de La Défense, premier quartier d'affaires européen, le 92 concentre les sièges sociaux des plus grandes entreprises françaises et internationales. C'est dans ce contexte de business premium que se cache notre domaine d'exception : une bâtisse historique classée, oasis de calme et de verdure au milieu de l'agitation urbaine.</p>

<h2>Un monument historique devenu hôtel de luxe</h2>
<p>La transformation de cette bâtisse du XVIIe siècle en hôtel 5 étoiles est une réussite architecturale remarquable. Les éléments historiques — voûtes en ogive de la chapelle, boiseries d'époque, jardin suspendu classé — ont été préservés et mis en valeur, tandis que les chambres, les espaces de réunion et les services ont été dotés des technologies et du confort les plus récents. Le résultat est un lieu unique qui conjugue l'âme du patrimoine avec l'excellence de l'hôtellerie contemporaine.</p>

<h2>L'adresse des décideurs</h2>
<p>Ce domaine attire naturellement les événements de direction : CODIR, COMEX, conseils d'administration, séminaires stratégiques. La confidentialité du lieu, son accessibilité exceptionnelle (métro) et son standing 5 étoiles en font l'adresse privilégiée des entreprises du CAC 40 et des organisations internationales. Le jardin suspendu avec vue sur Paris est un atout incomparable pour impressionner vos invités de marque et créer des moments de networking mémorables lors de cocktails en plein air.</p>`,
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

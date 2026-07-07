/**
 * ============================================================
 * GOOGLE ADS SCRIPT — JOURS FÉRIÉS + PONTS FRANCE
 * Select Châteaux — Campagne SÉMINAIRE CHÂTEAU IDF
 * ============================================================
 *
 * Ce script gère automatiquement :
 * - PAUSE de la campagne pendant les jours fériés français
 * - PAUSE pendant les ponts (ex : vendredi de l'Ascension)
 * - REPRISE automatique le jour suivant
 *
 * Couvre 2026 et 2027.
 *
 * Logique de sécurité :
 * - Ne réactive PAS la campagne si le cap mensuel a été atteint
 *   (laisse le script principal gérer ce cas)
 *
 * Installation :
 * 1. Google Ads → Outils → Scripts → "+" → Nouveau script
 * 2. Coller ce code
 * 3. Autoriser
 * 4. Planifier : "Tous les jours" à 00h45 (15 min APRÈS le script principal)
 */

// ============================================================
// CONFIGURATION
// ============================================================

var CONFIG = {
  CAMPAIGN_NAME: "SÉMINAIRE CHÂTEAU IDF",
  MONTHLY_CAP: 7300,  // Cap mensuel en ₪ (pour coordination avec script principal)
  EMAIL: "seminaires@selectchateaux.com",
  SEND_EMAILS: true,
  DRY_RUN: false
};

// ============================================================
// CALENDRIER JOURS FÉRIÉS + PONTS — FRANCE 2026-2027
// ============================================================
// Format : "YYYY-MM-DD" = jour de PAUSE
// (reprise automatique le lendemain si non férié)

var PAUSE_DAYS = {

  // ========== 2026 ==========

  // Jour de l'An (jeudi 1 jan 2026)
  "2026-01-01": "Jour de l'An",
  "2026-01-02": "Pont Jour de l'An (vendredi)",

  // Lundi de Pâques (lundi 6 avril 2026)
  "2026-04-06": "Lundi de Pâques",

  // Fête du Travail (vendredi 1 mai 2026)
  "2026-05-01": "Fête du Travail",

  // Victoire 1945 (vendredi 8 mai 2026)
  "2026-05-08": "Victoire 1945",

  // Ascension (jeudi 14 mai 2026) + Pont (vendredi 15 mai)
  "2026-05-14": "Ascension",
  "2026-05-15": "Pont de l'Ascension",

  // Lundi de Pentecôte (lundi 25 mai 2026)
  "2026-05-25": "Lundi de Pentecôte",

  // Fête Nationale (mardi 14 juillet 2026) + Pont (lundi 13)
  "2026-07-13": "Pont du 14 juillet",
  "2026-07-14": "Fête Nationale 14 juillet",

  // Assomption (samedi 15 août 2026) — déjà OFF via calendrier (samedi)
  // Pas besoin de l'ajouter

  // Toussaint (dimanche 1 nov 2026) — déjà OFF via calendrier (dimanche)
  // Pont lundi 2 nov possible
  "2026-11-02": "Pont de la Toussaint",

  // Armistice (mercredi 11 nov 2026)
  "2026-11-11": "Armistice 11 novembre",

  // Noël (vendredi 25 déc 2026) + Pont semaine entre Noël et Jour de l'An
  "2026-12-24": "Veille de Noël",
  "2026-12-25": "Noël",
  "2026-12-28": "Entre Noël et Nouvel An (lundi)",
  "2026-12-29": "Entre Noël et Nouvel An (mardi)",
  "2026-12-30": "Entre Noël et Nouvel An (mercredi)",
  "2026-12-31": "Saint-Sylvestre",

  // ========== 2027 ==========

  // Jour de l'An (vendredi 1 jan 2027)
  "2027-01-01": "Jour de l'An",

  // Lundi de Pâques (lundi 29 mars 2027)
  "2027-03-29": "Lundi de Pâques",

  // Fête du Travail (samedi 1 mai 2027) — déjà OFF samedi
  // Pas besoin

  // Victoire 1945 (samedi 8 mai 2027) — déjà OFF samedi
  // Pas besoin

  // Ascension (jeudi 6 mai 2027) + Pont (vendredi 7 mai)
  "2027-05-06": "Ascension",
  "2027-05-07": "Pont de l'Ascension",

  // Lundi de Pentecôte (lundi 17 mai 2027)
  "2027-05-17": "Lundi de Pentecôte",

  // Fête Nationale (mercredi 14 juillet 2027)
  "2027-07-14": "Fête Nationale 14 juillet",

  // Assomption (dimanche 15 août 2027) — déjà OFF dimanche
  // Pas besoin

  // Toussaint (lundi 1 nov 2027) — long weekend
  "2027-11-01": "Toussaint",

  // Armistice (jeudi 11 nov 2027) + Pont (vendredi 12 nov)
  "2027-11-11": "Armistice 11 novembre",
  "2027-11-12": "Pont 11 novembre",

  // Noël (samedi 25 déc 2027) — déjà OFF samedi
  // Semaine avant Noël et entre Noël et Nouvel An
  "2027-12-24": "Veille de Noël",
  "2027-12-27": "Entre Noël et Nouvel An (lundi)",
  "2027-12-28": "Entre Noël et Nouvel An (mardi)",
  "2027-12-29": "Entre Noël et Nouvel An (mercredi)",
  "2027-12-30": "Entre Noël et Nouvel An (jeudi)",
  "2027-12-31": "Saint-Sylvestre"
};

// ============================================================
// MAIN
// ============================================================

function main() {
  Logger.log("=== Script Jours Fériés — Select Châteaux ===");
  Logger.log("Date: " + new Date().toString());

  var campaign = getCampaign();
  if (!campaign) {
    logError("Campagne non trouvée : " + CONFIG.CAMPAIGN_NAME);
    return;
  }

  var today = formatDate(new Date());
  var isHoliday = PAUSE_DAYS.hasOwnProperty(today);
  var holidayLabel = isHoliday ? PAUSE_DAYS[today] : null;
  var status = campaign.isPaused() ? "PAUSED" : "ENABLED";
  var monthCost = getMonthCost(campaign);
  var capReached = monthCost >= CONFIG.MONTHLY_CAP;

  Logger.log("Aujourd'hui: " + today);
  Logger.log("Jour férié/pont: " + (isHoliday ? "OUI (" + holidayLabel + ")" : "NON"));
  Logger.log("Statut campagne: " + status);
  Logger.log("Dépense mois: " + monthCost.toFixed(2) + " ₪ / Cap: " + CONFIG.MONTHLY_CAP + " ₪");

  // Cas 1 : Jour férié + campagne active → PAUSER
  if (isHoliday && status === "ENABLED") {
    pauseForHoliday(campaign, holidayLabel);
    return;
  }

  // Cas 2 : Jour non férié + campagne en pause + cap NON atteint → REPRENDRE
  if (!isHoliday && status === "PAUSED" && !capReached) {
    resumeAfterHoliday(campaign);
    return;
  }

  // Cas 3 : Cap atteint → laisser la pause au script principal
  if (status === "PAUSED" && capReached) {
    Logger.log("Cap mensuel atteint — pause gérée par script principal. Aucune action.");
    return;
  }

  // Cas 4 : Rien à faire
  Logger.log("Aucune action nécessaire.");
}

// ============================================================
// ACTIONS
// ============================================================

function pauseForHoliday(campaign, label) {
  Logger.log("🛑 PAUSE jour férié/pont : " + label);

  if (!CONFIG.DRY_RUN) {
    campaign.pause();
  }

  sendEmail(
    "🛑 [Select Châteaux] Pause jour férié : " + label,
    "La campagne '" + CONFIG.CAMPAIGN_NAME + "' a été mise en pause.\n\n" +
    "Raison : " + label + "\n" +
    "Date : " + formatDate(new Date()) + "\n\n" +
    "Reprise automatique le prochain jour ouvré."
  );
}

function resumeAfterHoliday(campaign) {
  Logger.log("🟢 REPRISE après jour férié");

  if (!CONFIG.DRY_RUN) {
    campaign.enable();
  }

  sendEmail(
    "🟢 [Select Châteaux] Reprise après jour férié",
    "La campagne '" + CONFIG.CAMPAIGN_NAME + "' a été réactivée.\n\n" +
    "Date : " + formatDate(new Date()) + "\n" +
    "Budget quotidien conservé : " + campaign.getBudget().getAmount() + " ₪"
  );
}

// ============================================================
// HELPERS
// ============================================================

function getCampaign() {
  var iter = AdsApp.campaigns()
    .withCondition("Name = '" + CONFIG.CAMPAIGN_NAME + "'")
    .get();
  return iter.hasNext() ? iter.next() : null;
}

function getMonthCost(campaign) {
  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var firstDay = year + pad(month) + "01";
  var today = year + pad(month) + pad(now.getDate());
  return campaign.getStatsFor(firstDay, today).getCost();
}

function formatDate(date) {
  return date.getFullYear() + "-" + pad(date.getMonth() + 1) + "-" + pad(date.getDate());
}

function pad(n) {
  return n < 10 ? "0" + n : "" + n;
}

function sendEmail(subject, body) {
  if (!CONFIG.SEND_EMAILS) return;
  try {
    MailApp.sendEmail(CONFIG.EMAIL, subject, body);
  } catch (e) {
    Logger.log("Erreur email : " + e.message);
  }
}

function logError(msg) {
  Logger.log("❌ ERREUR : " + msg);
  sendEmail("❌ [Select Châteaux] Erreur script Jours Fériés", msg);
}

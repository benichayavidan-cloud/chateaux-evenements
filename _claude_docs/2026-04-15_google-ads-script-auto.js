ds/**
 * ============================================================
 * GOOGLE ADS SCRIPT — SELECT CHÂTEAUX
 * Gestion automatique : CAP mensuel + Reprise + Soft Restart
 * ============================================================
 *
 * Installation :
 * 1. Google Ads → Outils → Scripts → "+" → Nouveau script
 * 2. Coller ce code
 * 3. Autoriser l'exécution
 * 4. Planifier : "Quotidien" à 00h15
 *
 * Ce script gère :
 * - CAP mensuel à 8 500 ₪ → pause auto
 * - Reprise le 1er du mois à 00h15 → réactivation + soft restart
 * - Soft restart : J+0 = 200₪ / J+2 = 290₪ / J+4 = 370₪ / J+6 = 450₪
 * - Notifications email à chaque action
 *
 * Vérifier les paramètres ci-dessous avant de déployer.
 */

// ============================================================
// CONFIGURATION — À MODIFIER SI BESOIN
// ============================================================

var CONFIG = {
  // Nom exact de la campagne (sensible à la casse et aux accents)
  CAMPAIGN_NAME: "SÉMINAIRE CHÂTEAU IDF",

  // Plafond mensuel en ₪ (~2 300 € ≈ 8 500 ₪)
  MONTHLY_CAP: 8500,

  // Budget cible normal (en ₪)
  TARGET_BUDGET: 450,

  // Budgets du soft restart (en ₪)
  SOFT_RESTART: {
    DAY_0: 200,   // Jour de reprise (~45% du target)
    DAY_2: 290,   // J+2 (~65%)
    DAY_4: 370,   // J+4 (~82%)
    DAY_6: 450    // J+6 (retour cible 100%)
  },

  // Email pour les notifications
  EMAIL: "seminaires@selectchateaux.com",

  // Activer les emails (true/false)
  SEND_EMAILS: true,

  // Mode test (true = pas d'action réelle, juste des logs)
  DRY_RUN: false
};

// ============================================================
// MAIN — POINT D'ENTRÉE
// ============================================================

function main() {
  Logger.log("=== Google Ads Script — Select Châteaux ===");
  Logger.log("Date: " + new Date().toString());
  Logger.log("Dry run: " + CONFIG.DRY_RUN);

  var campaign = getCampaign();
  if (!campaign) {
    logError("Campagne non trouvée : " + CONFIG.CAMPAIGN_NAME);
    return;
  }

  var status = campaign.isPaused() ? "PAUSED" : "ENABLED";
  var currentBudget = campaign.getBudget().getAmount();
  var monthCost = getMonthCost(campaign);

  Logger.log("Statut actuel: " + status);
  Logger.log("Budget actuel: " + currentBudget + " ₪");
  Logger.log("Dépense ce mois: " + monthCost.toFixed(2) + " ₪ (cap: " + CONFIG.MONTHLY_CAP + " ₪)");

  // 1. Vérifier si on doit PAUSER (cap atteint)
  if (status === "ENABLED" && monthCost >= CONFIG.MONTHLY_CAP) {
    pauseCampaign(campaign, monthCost);
    return;
  }

  // 2. Vérifier si on doit REPRENDRE (1er du mois)
  if (status === "PAUSED" && isFirstOfMonth()) {
    resumeCampaign(campaign);
    return;
  }

  // 3. Gérer le SOFT RESTART (jours 1 à 7 du mois, si campagne active)
  if (status === "ENABLED" && isInSoftRestartWindow()) {
    manageSoftRestart(campaign, currentBudget);
    return;
  }

  Logger.log("Aucune action nécessaire.");
}

// ============================================================
// FONCTIONS DE GESTION DE LA CAMPAGNE
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

  var stats = campaign.getStatsFor(firstDay, today);
  return stats.getCost();
}

function pauseCampaign(campaign, cost) {
  Logger.log("🛑 CAP ATTEINT — Pause de la campagne");

  if (!CONFIG.DRY_RUN) {
    campaign.pause();
  }

  sendEmail(
    "🛑 [Select Châteaux] Google Ads — Campagne mise en PAUSE",
    "La campagne '" + CONFIG.CAMPAIGN_NAME + "' a atteint le plafond mensuel.\n\n" +
    "Dépense ce mois : " + cost.toFixed(2) + " ₪\n" +
    "Plafond : " + CONFIG.MONTHLY_CAP + " ₪\n\n" +
    "La campagne sera automatiquement réactivée le 1er du mois suivant en mode soft restart."
  );
}

function resumeCampaign(campaign) {
  Logger.log("🟢 REPRISE — Réactivation de la campagne (1er du mois)");

  if (!CONFIG.DRY_RUN) {
    campaign.enable();
    setBudget(campaign, CONFIG.SOFT_RESTART.DAY_0);
  }

  sendEmail(
    "🟢 [Select Châteaux] Google Ads — Reprise automatique",
    "La campagne '" + CONFIG.CAMPAIGN_NAME + "' a été réactivée.\n\n" +
    "Mode : Soft Restart\n" +
    "Budget J+0 : " + CONFIG.SOFT_RESTART.DAY_0 + " ₪\n\n" +
    "Paliers prévus :\n" +
    "- J+2 : " + CONFIG.SOFT_RESTART.DAY_2 + " ₪\n" +
    "- J+4 : " + CONFIG.SOFT_RESTART.DAY_4 + " ₪\n" +
    "- J+6 : " + CONFIG.SOFT_RESTART.DAY_6 + " ₪"
  );
}

function manageSoftRestart(campaign, currentBudget) {
  var day = new Date().getDate();
  var targetBudget;
  var label;

  if (day === 3) { targetBudget = CONFIG.SOFT_RESTART.DAY_2; label = "J+2"; }
  else if (day === 5) { targetBudget = CONFIG.SOFT_RESTART.DAY_4; label = "J+4"; }
  else if (day === 7) { targetBudget = CONFIG.SOFT_RESTART.DAY_6; label = "J+6"; }
  else {
    Logger.log("Soft restart : pas de palier à appliquer aujourd'hui.");
    return;
  }

  if (currentBudget === targetBudget) {
    Logger.log("Budget déjà à " + targetBudget + " ₪ — aucune action.");
    return;
  }

  Logger.log("📈 Soft Restart " + label + " : " + currentBudget + " → " + targetBudget + " ₪");

  if (!CONFIG.DRY_RUN) {
    setBudget(campaign, targetBudget);
  }

  sendEmail(
    "📈 [Select Châteaux] Google Ads — Palier " + label,
    "Soft Restart — Palier " + label + " appliqué.\n\n" +
    "Budget : " + currentBudget + " ₪ → " + targetBudget + " ₪\n" +
    "Campagne : " + CONFIG.CAMPAIGN_NAME
  );
}

// ============================================================
// HELPERS
// ============================================================

function setBudget(campaign, amount) {
  campaign.getBudget().setAmount(amount);
  Logger.log("Budget mis à " + amount + " ₪");
}

function isFirstOfMonth() {
  return new Date().getDate() === 1;
}

function isInSoftRestartWindow() {
  var day = new Date().getDate();
  return day >= 1 && day <= 7;
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
  sendEmail("❌ [Select Châteaux] Erreur script Google Ads", msg);
}

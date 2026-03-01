/**
 * Enhanced Conversions - Hachage SHA-256 des données utilisateur
 * Utilise Web Crypto API (natif, 0 dépendance)
 * Google Ads requiert les données hachées en SHA-256 hex lowercase
 */

async function sha256(value: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(value);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function normalizePhone(phone: string): string {
  // Supprimer tout sauf les chiffres et le +
  let cleaned = phone.replace(/[^\d+]/g, "");
  // Convertir format français en E.164
  if (cleaned.startsWith("0")) {
    cleaned = "+33" + cleaned.slice(1);
  }
  if (!cleaned.startsWith("+")) {
    cleaned = "+33" + cleaned;
  }
  return cleaned;
}

function normalizeName(name: string): string {
  return name.trim().toLowerCase();
}

export interface HashedUserData {
  sha256_email_address: string;
  sha256_phone_number: string;
  address: {
    sha256_first_name: string;
    sha256_last_name: string;
  };
}

export async function hashUserData(data: {
  email: string;
  phone: string;
  fullName: string;
}): Promise<HashedUserData> {
  const nameParts = data.fullName.trim().split(/\s+/);
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";

  const [hashedEmail, hashedPhone, hashedFirstName, hashedLastName] =
    await Promise.all([
      sha256(normalizeEmail(data.email)),
      sha256(normalizePhone(data.phone)),
      sha256(normalizeName(firstName)),
      sha256(normalizeName(lastName)),
    ]);

  return {
    sha256_email_address: hashedEmail,
    sha256_phone_number: hashedPhone,
    address: {
      sha256_first_name: hashedFirstName,
      sha256_last_name: hashedLastName,
    },
  };
}

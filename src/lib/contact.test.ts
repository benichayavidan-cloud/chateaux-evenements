import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { CONTACT_PHONE_DISPLAY, CONTACT_PHONE_E164, CONTACT_PHONE_INTL } from './contact';

// ── Garde-fou : le numéro de téléphone n'existe qu'en un seul endroit ──
// Le 01/11/2026, changer le numéro a demandé 37 retouches dans 17 fichiers.
// Ce test interdit qu'un numéro soit à nouveau écrit en dur hors de contact.ts.

const SRC = fileURLToPath(new URL('..', import.meta.url));

function walk(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (/\.(tsx?|mjs|js)$/.test(name)) out.push(p);
  }
  return out;
}

test('les trois formats du numéro désignent le même numéro', () => {
  const digits = (s: string) => s.replace(/\D/g, '');
  assert.equal(digits(CONTACT_PHONE_E164), '33' + digits(CONTACT_PHONE_DISPLAY).slice(1));
  assert.equal(digits(CONTACT_PHONE_INTL), digits(CONTACT_PHONE_E164));
});

/**
 * Motif qui attrape un numéro national à 10 chiffres sous toutes ses écritures :
 * « 01 83 80 60 00 », « 0183806000 », « 01.83.80.60.00 », « +33 1 83 80 60 00 »,
 * « +33183806000 », « +33 (0)1 83 80 60 00 ». Borné : un identifiant plus long
 * qui contiendrait ces chiffres n'est pas signalé.
 */
function motifNumero(national: string): string {
  const sep = '[\\s.-]?';
  const chiffres = national.replace(/\D/g, '');
  const sansZero = chiffres.slice(1).split('').join(sep);
  return `(?<!\\d)(?:0${sep}${sansZero}|\\+33\\s?(?:\\(0\\)\\s?)?${sansZero})(?!\\d)`;
}

const ANCIEN_NUMERO = '0757991146';

test('le motif reconnaît les écritures courantes et ignore les nombres ordinaires', () => {
  const motif = new RegExp(motifNumero(CONTACT_PHONE_DISPLAY));
  for (const ok of ['01 83 80 60 00', '0183806000', '01.83.80.60.00', '+33 1 83 80 60 00', '+33183806000', '+33 (0)1 83 80 60 00']) {
    assert.ok(motif.test(ok), ok);
  }
  for (const non of ['10183806000', '01838060001', '2026-01-83', '#018380']) {
    assert.ok(!motif.test(non), non);
  }
});

test("aucun numéro de téléphone de l'entreprise écrit en dur hors de contact.ts", () => {
  const motif = new RegExp(`${motifNumero(CONTACT_PHONE_DISPLAY)}|${motifNumero(ANCIEN_NUMERO)}`);
  const fautifs = walk(SRC)
    .filter((f) => !f.endsWith('/lib/contact.ts') && !f.endsWith('/lib/contact.test.ts'))
    .filter((f) => motif.test(readFileSync(f, 'utf8')));
  assert.deepEqual(fautifs.map((f) => f.replace(SRC, 'src/')), []);
});

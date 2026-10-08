// Tests du backlog de Marcus — `node --test scripts/agent-seo/actions.test.mjs`
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { construireBacklog } from './actions.mjs';

const muette = (p, imp) => ({ p, imp, pos: 8 });
const commandes = (snapshot) => construireBacklog(snapshot).filter((a) => a.type === 'commande-reecriture').map((a) => a.cible);

test('un article retiré de Google n’est jamais commandé en réécriture : la page suivante l’est', () => {
  const snapshot = { gsc28: { pages_muettes: [
    muette('/blog/escape-game-geant-chateau', 400),
    muette('/blog/murder-party-chateau-activite-immersive#format-1', 300),
    muette('/blog/checklist-organiser-seminaire', 200),
  ] } };
  assert.deepEqual(commandes(snapshot), ['/blog/checklist-organiser-seminaire']);
});

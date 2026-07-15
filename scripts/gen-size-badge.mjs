// Generates .github/badges/size.json — a shields.io "endpoint" badge with the
// minzipped size of the published ESM bundle. Self-hosted so the README size
// badge is reliable (bundlejs/bundlephobia frequently time out or rate-limit).
//
// Run after `npm run build` (which emits lib/Avatoon.es.js). Peer dependencies
// (react, three, @react-three/*) are external in the lib build, so this measures
// avatoon's own code — the same basis bundlephobia uses.

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { gzipSync } from 'node:zlib';

const BUNDLE = 'lib/Avatoon.es.js';
const OUT = '.github/badges/size.json';

const code = await readFile(BUNDLE);
const gz = gzipSync(code, { level: 9 });
const kb = gz.length / 1024;
const message = `${kb.toFixed(1)} kB`;

const color =
  kb < 10 ? 'brightgreen' :
  kb < 25 ? 'green' :
  kb < 50 ? 'yellowgreen' :
  kb < 100 ? 'yellow' :
  'orange';

const badge = { schemaVersion: 1, label: 'minzipped size', message, color };

await mkdir('.github/badges', { recursive: true });
await writeFile(OUT, JSON.stringify(badge, null, 2) + '\n');
console.log(`wrote ${OUT}: ${message} (${badge.color})`);

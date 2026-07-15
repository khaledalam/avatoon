// Generates .github/badges/coverage.json — a shields.io "endpoint" badge built
// from jest's own coverage summary. This keeps the README coverage badge
// accurate and self-hosted (no Codecov account or integration required).
//
// Run after `jest --coverage` (which emits coverage/coverage-summary.json via
// the json-summary reporter). The README badge points at this file's raw URL:
//   https://img.shields.io/endpoint?url=<raw>/.github/badges/coverage.json

import { readFile, writeFile, mkdir } from 'node:fs/promises';

const SUMMARY = 'coverage/coverage-summary.json';
const OUT = '.github/badges/coverage.json';

const { total } = JSON.parse(await readFile(SUMMARY, 'utf8'));
const pct = Math.round(total.lines.pct);

const color =
  pct >= 90 ? 'brightgreen' :
  pct >= 80 ? 'green' :
  pct >= 70 ? 'yellowgreen' :
  pct >= 60 ? 'yellow' :
  pct >= 50 ? 'orange' :
  'red';

const badge = {
  schemaVersion: 1,
  label: 'coverage',
  message: `${pct}%`,
  color,
};

await mkdir('.github/badges', { recursive: true });
await writeFile(OUT, JSON.stringify(badge, null, 2) + '\n');
console.log(`wrote ${OUT}: ${badge.message} (${badge.color})`);

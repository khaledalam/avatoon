// Generates assets/downloads.png — a weekly npm downloads chart for the README.
// Data source: npm's official downloads API. Rendering: QuickChart (Chart.js as PNG).
// Run by .github/workflows/downloads-chart.yml on a daily cron so the image is
// always current on both GitHub and npm (README images are fetched at view-time).

import { writeFile, mkdir } from 'node:fs/promises';

const PKG = 'avatoon';
const OUT = 'assets/downloads.png';
const WIDTH = 900;
const HEIGHT = 240;

// --- fetch daily downloads for the last year ---------------------------------
const res = await fetch(`https://api.npmjs.org/downloads/range/last-year/${PKG}`);
if (!res.ok) throw new Error(`npm downloads API ${res.status}`);
const { downloads } = await res.json();

// --- aggregate into ISO weeks (sum of daily downloads) -----------------------
const weeks = new Map();
for (const { day, downloads: n } of downloads) {
  const d = new Date(day + 'T00:00:00Z');
  // Monday-based week key: shift to the Monday of that week.
  const dow = (d.getUTCDay() + 6) % 7; // Mon=0..Sun=6
  d.setUTCDate(d.getUTCDate() - dow);
  const key = d.toISOString().slice(0, 10);
  weeks.set(key, (weeks.get(key) || 0) + n);
}
const points = [...weeks.entries()].sort(([a], [b]) => a.localeCompare(b));
const labels = points.map(([k]) =>
  new Date(k + 'T00:00:00Z').toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  })
);
const data = points.map(([, v]) => v);
const total = data.reduce((s, v) => s + v, 0);

// --- Chart.js config (rendered by QuickChart) --------------------------------
const accent = '#8b5cf6';
const muted = '#8b949e';
const config = {
  type: 'line',
  data: {
    labels,
    datasets: [
      {
        label: 'weekly downloads',
        data,
        borderColor: accent,
        backgroundColor: 'rgba(139,92,246,0.15)',
        borderWidth: 2,
        pointRadius: 0,
        fill: true,
        tension: 0.35,
      },
    ],
  },
  options: {
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: `${PKG} — ${total.toLocaleString()} downloads in the last year`,
        color: muted,
        font: { size: 14 },
      },
    },
    scales: {
      x: {
        ticks: { color: muted, maxTicksLimit: 12, maxRotation: 0, autoSkip: true },
        grid: { display: false },
      },
      y: {
        beginAtZero: true,
        ticks: { color: muted, precision: 0 },
        grid: { color: 'rgba(139,148,158,0.15)' },
      },
    },
  },
};

// --- render via QuickChart POST (returns PNG bytes) --------------------------
const qc = await fetch('https://quickchart.io/chart', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    chart: config,
    version: '4',
    width: WIDTH,
    height: HEIGHT,
    format: 'png',
    backgroundColor: 'transparent',
  }),
});
if (!qc.ok) throw new Error(`QuickChart ${qc.status}: ${await qc.text()}`);
const buf = Buffer.from(await qc.arrayBuffer());

await mkdir('assets', { recursive: true });
await writeFile(OUT, buf);
console.log(`wrote ${OUT} (${buf.length} bytes, ${points.length} weeks, total ${total})`);

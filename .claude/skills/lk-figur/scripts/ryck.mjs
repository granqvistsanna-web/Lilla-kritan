// node .claude/skills/lk-figur/scripts/ryck.mjs [rigg …]   (från repots rot; utan namn: alla riggar)
// Letar ryck: rutor (60 fps) där ett ansikts- eller posevärde ändras mycket mer än i rutorna runt omkring (över 15 % av
// värdets omfång och 4 × grannarna). Kör ?film=1 och varje rörelse i ROR. Hoppar över rutor där riggen är dold bakom
// sovbilden, och gnista/zzz/sovbild/x. Ingen rad = inga ryck. Se SKILL.md 3b.
import { createServer } from 'node:http'; import { readFile } from 'node:fs/promises'; import { readdirSync } from 'node:fs';
import { join, extname } from 'node:path'; import { homedir } from 'node:os';
const { chromium } = await import(join(homedir(), '.claude/skills/launch-video/scripts/node_modules/playwright/index.mjs'));
const ROT = process.cwd(), T = { '.html': 'text/html', '.png': 'image/png', '.js': 'text/javascript' };
const srv = createServer(async (q, r) => { try { const f = join(ROT, decodeURIComponent(new URL(q.url, 'http://x').pathname)); const d = await readFile(f);
  r.writeHead(200, { 'Content-Type': T[extname(f)] || 'application/octet-stream' }); r.end(d); } catch { r.writeHead(404); r.end(); } }).listen(0);
const b = await chromium.launch(), riggar = process.argv.slice(2).length ? process.argv.slice(2) : readdirSync('assets/karaktarer').filter(n => !n.includes('.'));
for (const n of riggar) { const sida = `assets/karaktarer/${n}/premium/uttryck.html`; try { await readFile(sida); } catch { continue; }
  const p0 = await b.newPage(); await p0.goto(`http://localhost:${srv.address().port}/${sida}`); const ror = await p0.evaluate(() => Object.keys(window.ROR || {})); await p0.close();
  for (const q of ['?film=1', ...ror.map(r => '?rorelse=' + r)]) { const p = await b.newPage();
    await p.goto(`http://localhost:${srv.address().port}/${sida}${q}`); await p.waitForLoadState('networkidle');
    const res = await p.evaluate(() => { window.stilla = true; const L = window.LANGD || 8, fps = 60, rows = [];
      const fig = () => [...document.querySelectorAll('g')].find(g => g.pose);
      const flat = (o, pre, out) => { for (const k in o) { const v = o[k]; if (typeof v === 'number') out[pre + k] = v;
        else if (Array.isArray(v)) v.forEach((x, i) => typeof x === 'number' && (out[pre + k + i] = x)); } return out; };
      for (let i = 0; i <= L * fps; i++) { window.render(i / fps); const g = fig(); if (!g) return 'ingen figur';
        const fu = g.querySelector('.figuren') || g.querySelector('.kanel'); rows.push({ dold: !!fu && fu.getAttribute('opacity') === '0', ...flat(g.ansikte || {}, 'a.', {}), ...flat(g.pose || {}, '', {}) }); }
      const keys = [...new Set(rows.flatMap(Object.keys))].filter(k => k !== 'dold'), hits = [];
      for (const k of keys) { if (/sovbild|zzz|gnista|^x$/.test(k)) continue;
        const d = rows.map((r, i) => i ? Math.abs((r[k] ?? 0) - (rows[i - 1][k] ?? 0)) : 0), range = Math.max(...rows.map(r => r[k] ?? 0)) - Math.min(...rows.map(r => r[k] ?? 0));
        for (let i = 2; i < d.length - 2; i++) { if (rows[i].dold || rows[i - 1].dold) continue; const nb = Math.max(d[i - 2], d[i - 1], d[i + 1], d[i + 2]);
          if (d[i] > 0.15 * range && d[i] > 4 * nb + 1e-3 && range > 1e-3) hits.push(`${(i / fps).toFixed(2)}s ${k} Δ${d[i].toFixed(3)} (nb ${nb.toFixed(3)}, range ${range.toFixed(2)})`); } }
      return hits; }).catch(e => 'FEL ' + e.message);
    if (typeof res === 'string' || res.length) console.log(n + q, '→', typeof res === 'string' ? res : '\n   ' + res.join('\n   ') + (res.length > 12 ? `\n   … ${res.length} totalt` : ''));
    await p.close(); } }
await b.close(); srv.close(); console.log('klart');

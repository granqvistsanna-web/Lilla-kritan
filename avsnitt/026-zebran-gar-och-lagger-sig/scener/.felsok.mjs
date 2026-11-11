import { createServer } from 'node:http'; import { readFile } from 'node:fs/promises'; import { join, extname } from 'node:path'; import { homedir } from 'node:os';
const { chromium } = await import(join(homedir(), '.claude/skills/launch-video/scripts/node_modules/playwright/index.mjs'));
const ROT = '/Users/sannagranqvist/Documents/Lilla-kritan/', T = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript' };
const srv = createServer(async (q, r) => { try { const f = join(ROT, decodeURIComponent(new URL(q.url, 'http://x').pathname)); const d = await readFile(f); r.writeHead(200, { 'Content-Type': T[extname(f)] || 'application/octet-stream' }); r.end(d); } catch { r.writeHead(404); r.end(); } }).listen(0);
const b = await chromium.launch(), p = await b.newPage({ viewport: { width: 480, height: 270 } });
for (const e of process.argv.slice(2)) {
  await p.goto(`http://localhost:${srv.address().port}/avsnitt/${e}/scener/sovrummet/index.html`); await p.evaluate(() => window.ready);
  const fel = await p.evaluate(() => { const ut = []; for (let t = 0; t < window.DURATION; t += 0.1) { try { window.seek(t); } catch (x) { ut.push(t.toFixed(1) + ' ' + x.message); if (ut.length > 3) break; } } return ut; });
  console.log(e, fel.length ? fel : 'inga fel');
}
await b.close(); srv.close();

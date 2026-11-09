// Bakar in nosen (.nasa i figurens premium/uttryck.html) i cut/<namn>-nos.png, så att avsnitten, som bara laddar bilden, får samma nos.
// Sanna 2026-11-09: "oops the noses need updating". Nosarna ritades om i kod (5558ae8) och bilderna blev utan, så avsnitten tappade nosen.
// uttryck.html ritar samma form ovanpå, vilket ser likadant ut. Bilden utan nos ligger kvar som cut/<namn>-nos-utan-nasa.png.
// Kör: node verktyg/baka-nasor.mjs
import { readFileSync, copyFileSync, existsSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';
const { chromium } = await import(join(homedir(), '.claude/skills/launch-video/scripts/node_modules/playwright/index.mjs'));
const ROT = new URL('..', import.meta.url).pathname;
const FIG = { 'bjornen-bulle': 'bulle', 'igelkotten-igge': 'igge', 'kaninen-kanel': 'kanel', 'lejonet-lage': 'lage', 'leoparden-lova': 'lova', 'musen-mille': 'mille' };
const b = await chromium.launch(), p = await b.newPage({ viewport: { width: 1024, height: 1024 } });
for (const [mapp, n] of Object.entries(FIG)) {
  const P = join(ROT, 'assets/karaktarer', mapp, 'premium'), html = readFileSync(join(P, 'uttryck.html'), 'utf8');
  const nasa = [...html.matchAll(/<(ellipse|path|circle) class="nasa"[^>]*\/>/g)].map(m => m[0]).join('');
  if (!nasa) { console.log(n, 'ingen .nasa, hoppar över'); continue; }
  const bild = join(P, `cut/${n}-nos.png`), utan = join(P, `cut/${n}-nos-utan-nasa.png`);
  if (!existsSync(utan)) copyFileSync(bild, utan);   // alltid baka på bilden utan nos, så att skriptet kan köras igen
  const data = readFileSync(utan).toString('base64');
  await p.setContent(`<style>html,body{margin:0;background:transparent}</style><svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
    <image href="data:image/png;base64,${data}" width="1024" height="1024"/>${nasa}</svg>`);
  writeFileSync(bild, await p.screenshot({ omitBackground: true, clip: { x: 0, y: 0, width: 1024, height: 1024 } }));
  console.log(n, 'klar');
}
await b.close();

import { readdir, readFile, access } from 'node:fs/promises';
import { constants } from 'node:fs';
import { join, normalize } from 'node:path';

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(full)));
    } else {
      files.push(full);
    }
  }
  return files;
}

const dist = join(process.cwd(), 'dist');
const siteFiles = (await walk(dist)).filter((file) => file.endsWith('.html'));

const hrefPattern = /\b(?:href|src)=["']([^"'#]+)(#[^"']*)?["']/g;
const looksLikeFile = (clean) => /\.[^/]+$/.test(clean) && !clean.endsWith('/');

function localTarget(clean) {
  if (clean === '/') return join(dist, 'index.html');
  const segments = clean.split('/').filter(Boolean);
  const candidate = join(dist, ...segments);
  return looksLikeFile(clean) ? candidate : join(candidate, 'index.html');
}

const broken = new Map();

for (const file of siteFiles) {
  const html = await readFile(file, 'utf8');
  let match;
  while ((match = hrefPattern.exec(html)) !== null) {
    const raw = match[1];
    if (!raw.startsWith('/') || raw.startsWith('//')) continue;
    const clean = normalize(raw.replace(/[?#].*$/, ''));
    const target = localTarget(clean);
    try {
      await access(target, constants.R_OK);
    } catch {
      const rel = file.slice(dist.length + 1);
      if (!broken.has(rel)) broken.set(rel, []);
      broken.get(rel).push(raw);
    }
  }
}

if (broken.size > 0) {
  for (const [page, links] of broken) {
    console.error(`Broken links in ${page}:`);
    for (const link of links) console.error(`  - ${link}`);
  }
  process.exit(1);
}

console.log(`Checked ${siteFiles.length} pages: no broken internal links.`);

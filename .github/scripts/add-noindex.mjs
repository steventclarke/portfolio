import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

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

const root = process.cwd();
const meta = '<meta name="robots" content="noindex,nofollow" />';

const htmlFiles = (await walk(join(root, 'dist'))).filter((file) => file.endsWith('.html'));

for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  if (html.includes('noindex')) continue;
  await writeFile(file, html.replace('</head>', `${meta}\n</head>`), 'utf8');
}

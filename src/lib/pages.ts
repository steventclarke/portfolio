import { getEntry, render } from 'astro:content';

export async function getPage(id: string) {
  const entry = await getEntry('pages', id);

  if (!entry) {
    throw new Error(`Missing page content entry for "${id}"`);
  }

  const { Content } = await render(entry);
  return { entry, Content };
}

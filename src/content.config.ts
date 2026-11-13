import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const pageLink = z.object({
  label: z.string(),
  href: z.string(),
  variant: z.enum(['primary', 'secondary']).default('secondary'),
});

const pageCard = z.object({
  eyebrow: z.string().optional(),
  title: z.string(),
  body: z.string(),
  href: z.string(),
  linkLabel: z.string().default('Read more'),
  links: z
    .array(
      z.object({
        label: z.string(),
        href: z.string(),
      }),
    )
    .default([]),
});

const pageSection = z.object({
  id: z.string().optional(),
  heading: z.string().optional(),
  intro: z.string().optional(),
  body: z.string().optional(),
  items: z.array(z.string()).default([]),
  cards: z.array(pageCard).default([]),
  ctas: z.array(pageLink).default([]),
  linkLabel: z.string().optional(),
  linkHref: z.string().optional(),
});

const pageContact = z.object({
  label: z.string(),
  value: z.string(),
  href: z.string(),
  wide: z.boolean().default(false),
});

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '*.md' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    role: z.string(),
    timeline: z.string(),
    status: z.enum(['live', 'in-progress', 'archived', 'case-study']),
    statusNote: z.string().optional(),
    tag: z.string(),
    featured: z.boolean().default(false),
    order: z.number().int().nonnegative().default(0),
    technologies: z.array(z.string()).default([]),
    sourceUrl: z.url().optional(),
    demoUrl: z.url().optional(),
    demoNote: z.string().optional(),
    architectureUrl: z.url().optional(),
    architectureLabel: z.string().default('Architecture notes'),
    architectureNote: z.string().optional(),
    coverImage: z.string().optional(),
    gallery: z.array(z.string()).default([]),
    confidential: z.boolean().default(false),
    draft: z.boolean().default(false),
    progressCompleted: z.number().int().nonnegative().optional(),
    progressTotal: z.number().int().positive().optional(),
    lastUpdated: z.coerce.date().optional(),
  }),
});

const pages = defineCollection({
  loader: glob({ base: './src/content/pages', pattern: '*.md' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    noindex: z.boolean().default(false),
    eyebrow: z.string().optional(),
    heading: z.string(),
    intro: z.array(z.string()).default([]),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    imageWidth: z.number().int().positive().default(750),
    imageHeight: z.number().int().positive().default(750),
    ctas: z.array(pageLink).default([]),
    sections: z.array(pageSection).default([]),
    contacts: z.array(pageContact).default([]),
  }),
});

export const collections = { projects, pages };

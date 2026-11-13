import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

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

export const collections = { projects };

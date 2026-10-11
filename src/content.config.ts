import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * A question is one entry in the collection. Adding a question is a matter of
 * adding a new markdown file to src/content/questions — no template changes.
 *
 * The markdown body is the "why this matters" explanation. Everything else
 * is structured so the template can give each part its own typographic
 * treatment.
 */
const questions = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/questions' }),
  schema: z.object({
    /** Position in the collection, 1-based. Drives "01", ordering and prev/next. */
    number: z.number().int().positive(),
    /** Short category shown above the question, e.g. "Flow". */
    category: z.string().min(1).max(24),
    /** The question itself. Keep it to one sentence. */
    question: z.string().min(8),
    /** One of the named accent tokens in global.css. */
    accent: z.enum(['teal', 'ochre', 'plum', 'terracotta', 'moss']),
    /** 1–2 sentence summary used for <meta description> and social cards. */
    summary: z.string().min(40).max(220),
    /** The core idea in one sentence — shown as a standfirst on the page and on the homepage index. */
    coreIdea: z.string().min(20),
    /** The opening: one or two short paragraphs that challenge a familiar assumption. */
    opening: z.array(z.string().min(20)).min(1).max(3),
    /** A practical exercise the reader can try. The prompt is quoted; the notes expand on it. */
    exercise: z.object({
      prompt: z.string().min(20),
      notes: z.array(z.string()).default([]),
    }),
    /** A follow-up question that encourages deeper thinking. */
    followUp: z.object({
      question: z.string().min(10),
      note: z.string().optional(),
    }),
    /** One carefully chosen resource. Optional. */
    resource: z
      .object({
        name: z.string(),
        url: z.url(),
        description: z.string(),
      })
      .optional(),
    /** Set true to keep a draft out of the build. */
    draft: z.boolean().default(false),
  }),
});

export const collections = { questions };

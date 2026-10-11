import { getCollection, type CollectionEntry } from 'astro:content';

export type Question = CollectionEntry<'questions'>;

/** All published questions, ordered by number. */
export async function getQuestions(): Promise<Question[]> {
  const all = await getCollection('questions', ({ data }) => !data.draft);
  return all.sort((a, b) => a.data.number - b.data.number);
}

/** Previous/next neighbours, wrapping so the last question leads back to the first. */
export function neighbours(list: Question[], current: Question) {
  const i = list.findIndex((q) => q.id === current.id);
  const next = list[(i + 1) % list.length];
  const prev = list[(i - 1 + list.length) % list.length];
  return { prev, next, index: i, total: list.length };
}

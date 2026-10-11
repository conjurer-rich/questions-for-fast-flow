/**
 * Site-wide configuration. Anything a future maintainer might reasonably
 * want to change without touching a template lives here or in .env.
 */
export const site = {
  name: 'Better questions',
  tagline: 'Better questions for faster flow.',
  url: 'https://questions.richallen.info',
  locale: 'en_GB',
  description:
    'Sometimes the most useful thing we can do is challenge the question we’re asking. Five questions about how organisations work, how value flows, and what might be getting in the way.',
  /** Shown on cards and pages as a reference to the physical set. */
  collectionLabel: 'One of five better questions.',
  /** Masthead provenance line. Change when a new edition of cards is issued. */
  edition: { volume: 'Vol. I', note: 'First edition · October 2026' },
  author: {
    name: 'Rich Allen',
    /** Short, factual, verified against the brief and public profiles. */
    role: 'Sociotechnical architecture consultant',
    /** The same headshot as richallen.info, 320 × 320, transparent background. */
    photo: { src: '/rich-allen.webp', alt: 'Rich Allen' },
    bio: [
      'Rich Allen is a UK-based sociotechnical architecture consultant. He helps organisations improve the flow of value through people, teams, technology and organisational structure.',
      'He is the author of User Needs Mapping: Aligning Teams Around What Matters, a long-standing Team Topologies Valued Practitioner and the creator of the Fast Flow Toolkit.',
    ],
    /**
     * One sentence on what an engagement looks like, so a reader can tell
     * what "continue the conversation" might lead to. The linked phrase is
     * the lowest-commitment way in.
     */
    engagement: {
      before: 'He works with engineering and product leaders to make the flow of work visible and to change team boundaries on evidence. ',
      link: { label: 'Flow Awareness Sessions', url: 'https://www.richallen.info/flow-awareness-sessions' },
      after: ' are a low-commitment place to start.',
    },
    /** Organisations named in the testimonials on richallen.info. Shown on the homepage only. */
    clients: ['Thales', 'Blue Lagoon', 'LHV Bank', 'PureGym', 'Syngenta Digital'],
    links: {
      /** The root site: footer, structured data and the masthead. */
      website: { label: 'richallen.info', url: 'https://www.richallen.info' },
      /** Deep links used by the About and Contact blocks. */
      bio: { label: 'richallen.info', url: 'https://www.richallen.info/bio' },
      contact: { label: 'richallen.info', url: 'https://www.richallen.info/lets-talk' },
      linkedin: { label: 'LinkedIn', url: 'https://www.linkedin.com/in/richardallen' },
      userNeedsMapping: { label: 'User Needs Mapping', url: 'https://userneedsmapping.com' },
      fastFlowToolkit: { label: 'Fast Flow Toolkit', url: 'https://fastflowtoolkit.com' },
    },
  },
  contact: {
    heading: 'Have a question worth exploring together?',
    body:
      'Sometimes an outside perspective helps make a difficult organisational problem clearer. If one of these questions resonates, I’d be happy to explore it with you.',
    /** Default email subject; question pages append the question. */
    subject: 'A question worth exploring',
    /** Set PUBLIC_CONTACT_EMAIL in .env / Netlify to show a mailto link. */
    email: (import.meta.env.PUBLIC_CONTACT_EMAIL as string | undefined)?.trim() || null,
  },
  analytics: {
    provider: ((import.meta.env.PUBLIC_ANALYTICS_PROVIDER as string | undefined) || 'none')
      .trim()
      .toLowerCase() as 'none' | 'plausible' | 'umami' | 'goatcounter',
    id: (import.meta.env.PUBLIC_ANALYTICS_ID as string | undefined)?.trim() || '',
    host: (import.meta.env.PUBLIC_ANALYTICS_HOST as string | undefined)?.trim() || '',
  },
} as const;

export const pad = (n: number) => String(n).padStart(2, '0');

/** Approximate reading time in whole minutes at ~210 words per minute. */
export const readMinutes = (text: string) => Math.max(1, Math.round(text.trim().split(/\s+/).length / 210));

import type { Site } from './types';

const gh = (repo: string) => `https://github.com/pushpam2404/${repo}`;

export const site: Site = {
  name: 'Pushpam Raj Satyarthi',
  email: 'prsatyarthi2404@gmail.com',
  github: 'https://github.com/pushpam2404',
  linkedin: 'https://www.linkedin.com/in/pushpamrajsatyarthi',
  resume: '/Pushpam-Raj-Satyarthi-Resume.pdf',
  location: 'Visakhapatnam, IN',
  tz: 'Asia/Kolkata',
  splineScene: '',
  cgpa: 9.17,
  heroNote: 'Backend, data & everything in between.',
  status: 'Open to SDE roles',
  about:
    "I'm a CSE student at GITAM who goes deep on *data* and *backend* systems, then ships whatever else the product needs: pipelines, APIs, models, frontends, even a Mac app. I lead IEEE-CS on campus and I like hard problems that real people will use.",

  experience: {
    company: 'Motherson Technology Services',
    role: 'Software Engineering Intern, AIML team',
    dates: 'May – Jun 2026',
    summary: 'Backend for an AI legal-research platform: FastAPI, Azure Blob, React/TypeScript',
  },

  numbers: [
    { value: 101000, suffix: '+', label: 'accounts trained on', source: 'resume' },
    { value: 9.17, decimals: 2, label: 'CGPA, B.Tech CSE', source: 'resume' },
    { value: 23, prefix: '+', label: 'accuracy points, from cleaning bad data', source: 'resume' },
  ],

  featured: [
    {
      slug: 'threat-detection',
      title: 'Threat Detection Engine',
      kicker: 'Smart India Hackathon · SIH-1775 · ITBP / MHA',
      year: '2026',
      role: 'Lead developer',
      stack: ['Python', 'XGBoost', 'SHAP', 'FastAPI', 'React', 'TypeScript', 'Playwright', 'NetworkX'],
      result: '96.87% accuracy',
      links: [
        { label: 'Live', href: 'https://fake-acc.vercel.app' },
        { label: 'Code', href: gh('fake_acc') },
      ],
      problem:
        'Fake accounts, bot networks and impersonators spread fast across X, Instagram and Facebook. Analysts needed a tool that scores an account in seconds and says, in plain words, why it looks fake.',
      built: [
        'Two XGBoost classifiers, one per platform family: 13 features for X, 7 for Instagram and Facebook, trained on 101,000+ labelled accounts.',
        'SHAP explanations turned into plain-English reasons, so a score never arrives without a "because".',
        'A URL scan that reads a public profile with headless Chromium, then adds caption similarity and a name-versus-handle check to catch impersonation.',
        'A NetworkX graph of related accounts, a case workflow that only moves forward one step at a time, and one-click PDF case files.',
      ],
      howItWorks: {
        caption: 'One request, one score, and the reasons behind it.',
        code: `POST /analyze
{ "platform": "twitter", "followers": 12, "following": 4500,
  "post_count": 5000, "account_age_days": 2 }

→ risk score + SHAP reasons:
  "follows far more accounts than follow it back"
  "account is 2 days old"`,
      },
      metrics: [
        { value: 96.87, decimals: 2, suffix: '%', label: 'accuracy on Instagram / Facebook', source: 'repo' },
        { value: 90.04, decimals: 2, suffix: '%', label: 'accuracy on X', source: 'repo' },
        { value: 23, prefix: '+', label: 'points on X after removing a mislabelled 50,000-row dataset', source: 'resume' },
      ],
      still: '/work/threat-detection.webp',
      backdrop: { kind: 'liquid', tint: '#9aa7b8' },
    },
    {
      slug: 'orbitune',
      title: 'Orbitune',
      kicker: 'A 3D universe made of your music',
      year: '2026',
      role: 'Solo project',
      stack: ['Three.js', 'WebGL', 'Node.js', 'Express', 'IndexedDB', 'Spotify API'],
      result: '51,772 plays mapped',
      links: [
        { label: 'Live', href: 'https://orbitune-music.vercel.app' },
        { label: 'Code', href: gh('orbitune') },
      ],
      problem:
        "A listening history is thousands of rows nobody reads. I wanted to fly through mine: artists that belong together pulled into the same system, each cluster with a planet at its centre.",
      built: [
        'An in-browser ETL that parses a full Spotify streaming-history export (even a 100 MB zip never leaves the browser) and merges it with live Spotify data.',
        'Louvain community detection on an artist-similarity graph, a 3D UMAP layout and TF-IDF cluster names, with genres looked up from Wikidata and MusicBrainz.',
        'A Three.js scene with instanced planets and moons, lenses for each year of history, and state kept in the URL so links reopen the same view.',
        'Spotify tokens that never reach the browser: sessions live in an AES-256-GCM encrypted cookie, with no database.',
      ],
      howItWorks: {
        caption: 'History in, universe out. Everything heavy runs on your machine.',
        diagram: 'export.zip → parse → merge → similarity graph → Louvain → UMAP 3D → planets',
      },
      metrics: [
        { value: 3363, label: 'artists in my own map', source: 'repo' },
        { value: 7776, label: 'songs', source: 'repo' },
        { value: 51772, label: 'plays, 2020 – 2026', source: 'repo' },
      ],
      still: '/work/orbitune.webp',
      backdrop: { kind: 'flow', tint: '#5b5f8a' },
    },
    {
      slug: 'banking-etl',
      title: 'Global Banking ETL',
      kicker: 'Data engineering',
      year: '2026',
      role: 'Solo project',
      stack: ['Python', 'Pandas', 'NumPy', 'BeautifulSoup', 'SQLite'],
      result: '−30% redundancy',
      links: [{ label: 'Code', href: gh('global-finance-etl') }],
      problem:
        'Market-cap data for the world’s largest banks lives on web pages in one currency and changing HTML. Analysts need it clean, converted and in a warehouse, every run, without silent breakage.',
      built: [
        'Resilient extraction that copes with variations in the source HTML.',
        'Vectorised NumPy currency conversion and schema normalisation in place of row-by-row loops.',
        'Incremental delta loads instead of full refreshes, so each run only processes what changed.',
        'Stage-by-stage logging that catches ingestion failures and schema mismatches before anything reaches the warehouse.',
      ],
      howItWorks: {
        caption: 'Extract → transform → load, with a checkpoint at every arrow.',
        diagram: 'web tables → extract → normalise + convert (NumPy) → validate → delta load → SQLite',
      },
      metrics: [{ value: 30, prefix: '−', suffix: '%', label: 'data redundancy', source: 'resume' }],
      still: '/work/banking-etl.webp',
      backdrop: { kind: 'grain', tint: '#8c8576' },
    },
    {
      slug: 'sluice',
      title: 'Sluice',
      kicker: 'A pipeline runner that refuses to fail quietly',
      year: '2026',
      role: 'Author & maintainer',
      stack: ['Python', 'TOML', 'SQLite', 'Zero dependencies'],
      result: 'zero dependencies',
      links: [{ label: 'Code', href: gh('sluice') }],
      problem:
        'Most data pipelines fail the same way: they don’t. They report success while a column quietly arrives empty, and someone finds out six weeks later.',
      built: [
        'A tiny runner where each pipeline is one TOML file, read top to bottom.',
        'Checks between steps (row counts, not-null, unique) that stop the run instead of warning.',
        'Errors that name the row, the column and the value, and where a duplicate first appeared.',
        'Built as an open-source practice ground, with intermediate and advanced issues for contributors.',
      ],
      howItWorks: {
        caption: 'When something is wrong, it says exactly what.',
        code: `CheckFailed: check 'unique' failed: 1 problem(s) in 7 rows
    - row 7: 'customer_id' = '1001' already appeared on row 1`,
      },
      metrics: [{ value: 0, label: 'third-party dependencies', source: 'repo' }],
      still: '/work/sluice.webp',
      backdrop: { kind: 'grain', tint: '#6f7a70' },
    },
    {
      slug: 'scrollo',
      title: 'Scrollo',
      kicker: 'Native macOS menu bar app',
      year: '2026',
      role: 'Solo project',
      stack: ['Swift', 'CGEventTap', 'Accessibility API', 'AVAudioEngine', 'Haptics'],
      result: '~0% CPU at idle',
      links: [
        { label: 'Download', href: 'https://github.com/pushpam2404/scrollo/releases/latest' },
        { label: 'Code', href: gh('scrollo') },
      ],
      problem:
        'Scrolling on a Mac is silent and weightless. The paid apps that add clicks fire on every finger movement, even when the page has stopped at its edge.',
      built: [
        'A listen-only event tap that reads scroll deltas and times a click to each notch.',
        'Edge awareness: Scrollo asks the app under the pointer, through the Accessibility API, whether the content actually moved, so it stays silent at the top and bottom.',
        'Ten real recorded click sounds, pitch-varied per click, plus five strengths of Force Touch trackpad haptics.',
        'No network access, no analytics, and an audio engine that sleeps when you are not scrolling.',
      ],
      howItWorks: {
        caption: 'Click only when something really moved.',
        diagram: 'scroll event → probe scroll area under pointer → position changed? → click + haptic : stay silent',
      },
      metrics: [
        { value: 10, label: 'recorded click sounds', source: 'repo' },
        { value: 5, label: 'haptic strengths', source: 'repo' },
      ],
      still: '/work/scrollo.webp',
      backdrop: { kind: 'liquid', tint: '#b9b2a6' },
    },
  ],

  archive: [
    { name: 'KAPS MedTech', blurb: 'Healthcare backend: 3NF PostgreSQL schema, raw SQL, JWT + BCrypt. Shipped in 24 hours at Gitathon.', lang: 'JavaScript', links: [{ label: 'Live', href: 'https://kaps-medtech.vercel.app' }, { label: 'Code', href: gh('KAPS-Medtech') }] },
    { name: 'TripSync', blurb: 'AI travel companion with multi-stop Mapbox routes. Built from zero in 24 hours for SIH 2025.', lang: 'TypeScript', links: [{ label: 'Live', href: 'https://trip-sync-rho.vercel.app' }, { label: 'Code', href: gh('Trip-Sync') }] },
    { name: 'MealBridge', blurb: 'MERN app connecting kitchens with NGOs to rescue surplus food before it spoils.', lang: 'JavaScript', links: [{ label: 'Live', href: 'https://mealbridge-app.vercel.app' }, { label: 'Code', href: gh('mealbridge') }] },
    { name: 'Autocomplete Engine', blurb: 'Trie + min-heap autocomplete in C. O(k) lookups, zero leaks under Valgrind.', lang: 'C', links: [] },
    { name: 'Entity Resolution', blurb: 'ML Challenge 2026: country-scoped blocking plus an XGBoost matcher, scored by macro F0.5.', lang: 'Python', links: [{ label: 'Code', href: gh('ml') }] },
    { name: 'Secure Erase & Recovery', blurb: 'SIH 2026 (NTRO) desktop app: drive erasure, file carving and a hash-chained audit log.', lang: 'Python', links: [{ label: 'Code', href: gh('sih_149') }] },
    { name: 'LiDAR Obstacle Map', blurb: 'SIH (DRDO): foveated 2.5D elevation map with moving and negative obstacle detection. C++, ROS 2.', lang: 'Python', links: [{ label: 'Code', href: gh('sih_053') }] },
    { name: 'Open Source Launchpad', blurb: 'Make your first pull request on a real site. Every PR merges itself once checks pass.', lang: 'HTML', links: [{ label: 'Live', href: 'https://pushpam2404.github.io/open-source-launchpad/' }, { label: 'Code', href: gh('open-source-launchpad') }] },
    { name: 'Terminal Arcade', blurb: 'Small terminal games in pure Python, and a friendly place for a first PR.', lang: 'Python', links: [{ label: 'Code', href: gh('terminal-arcade') }] },
    { name: 'IEEE Recruitments', blurb: 'Recruitment site for IEEE-CS GITAM, built with Next.js.', lang: 'TypeScript', links: [{ label: 'Code', href: gh('IEEE-RECRUITMENTS') }] },
    { name: 'Web Application Framework', blurb: 'Coursework web framework assignment, deployed on Vercel.', lang: 'JavaScript', links: [{ label: 'Live', href: 'https://assignment-4-gules.vercel.app' }, { label: 'Code', href: gh('Web-Application-Framework') }] },
  ],

  leadership: [
    'President, IEEE-CS GITAM Vizag',
    'Domain Lead, Open Source, GitHub Community GITAM Vizag',
    'Smart India Hackathon 2026: internal-round qualifier (SIH-1775)',
    'Smart India Hackathon 2025: internal-round qualifier (TripSync)',
    'Gitathon: full healthcare backend shipped in 24 hours',
  ],
};

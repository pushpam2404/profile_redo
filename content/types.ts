export type Link = { label: string; href: string };

export type Metric = {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  source: 'resume' | 'repo';
};

export type ShaderBackdrop = { kind: 'liquid' | 'flow' | 'grain'; tint: string };

export type CaseStudy = {
  slug: string;
  title: string;
  kicker: string;
  year: string;
  role: string;
  stack: string[];
  result: string;
  links: Link[];
  problem: string;
  built: string[];
  howItWorks: { caption: string; code?: string; diagram?: string };
  metrics: Metric[];
  still: string;
  backdrop: ShaderBackdrop;
};

export type ArchiveItem = { name: string; blurb: string; lang: string; links: Link[] };

export type Site = {
  name: string;
  email: string;
  github: string;
  linkedin: string;
  resume: string;
  location: 'Visakhapatnam, IN';
  tz: 'Asia/Kolkata';
  cgpa: 9.17;
  heroNote: string;
  status: string;
  about: string;
  experience: { company: string; role: string; dates: string; summary: string };
  numbers: Metric[];
  featured: CaseStudy[];
  archive: ArchiveItem[];
  leadership: string[];
};

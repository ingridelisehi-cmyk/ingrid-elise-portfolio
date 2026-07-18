export type SiteSettingsData = {
  fullName?: string;
  tagline?: string;
  location?: string;
  email?: string;
  linkedinUrl?: string;
  skills?: string[];
  languages?: Array<{name?: string; level?: string}>;
  otherInfo?: string;
};

export type FeaturedProject = {
  title: string;
  description: string;
  slug?: string;
};

export type HomepageData = {
  settings?: SiteSettingsData;
  featuredProjects?: FeaturedProject[];
};

export type ProjectItem = {
  title: string;
  slug: string;
  year?: number;
  category?: string;
  imageUrl?: string;
  summary: string;
};

export type ProjectLink = {
  label: string;
  url: string;
};

export type ProjectDetail = {
  title: string;
  slug: string;
  category?: string;
  year?: number;
  summary: string;
  challenge?: string;
  process?: string;
  outcome?: string;
  learnings?: string[];
  skills?: string[];
  projectUrl?: string;
  links?: ProjectLink[];
  imageUrls?: string[];
};

export type CVEntry = {
  period: string;
  title: string;
  detail: string;
};

export type CVData = {
  settings?: SiteSettingsData;
  experience?: CVEntry[];
  education?: CVEntry[];
};

export type ContactData = {
  email?: string;
  location?: string;
  linkedinUrl?: string;
};

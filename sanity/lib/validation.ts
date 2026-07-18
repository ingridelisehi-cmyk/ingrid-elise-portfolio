import {z} from "zod";
import type {
  ContactData,
  CVData,
  HomepageData,
  ProjectDetail,
  ProjectItem,
} from "./types";

const languageSchema = z.object({
  name: z.string().optional(),
  level: z.string().optional(),
});

const siteSettingsSchema = z
  .object({
    fullName: z.string().optional(),
    tagline: z.string().optional(),
    location: z.string().optional(),
    email: z.string().email().optional(),
    linkedinUrl: z.string().url().optional(),
    skills: z.array(z.string()).optional(),
    languages: z.array(languageSchema).optional(),
    otherInfo: z.string().optional(),
  })
  .partial();

const featuredProjectSchema = z.object({
  title: z.string(),
  description: z.string(),
  slug: z.string().optional(),
});

const homepageDataSchema = z.object({
  settings: siteSettingsSchema.optional(),
  featuredProjects: z.array(featuredProjectSchema).optional(),
});

const projectItemSchema = z.object({
  title: z.string(),
  slug: z.string(),
  year: z.number().optional(),
  category: z.string().optional(),
  imageUrl: z.string().url().optional(),
  summary: z.string(),
});

const projectDetailSchema = z.object({
  title: z.string(),
  slug: z.string(),
  category: z.string().optional(),
  year: z.number().optional(),
  summary: z.string(),
  challenge: z.string().optional(),
  process: z.string().optional(),
  outcome: z.string().optional(),
  learnings: z.array(z.string()).optional(),
  skills: z.array(z.string()).optional(),
  projectUrl: z.string().url().optional(),
  links: z
    .array(
      z.object({
        label: z.string(),
        url: z.string().url(),
      }),
    )
    .optional(),
  imageUrls: z.array(z.string().url()).optional(),
});

const cvEntrySchema = z.object({
  period: z.string(),
  title: z.string(),
  detail: z.string(),
});

const cvDataSchema = z.object({
  settings: siteSettingsSchema.optional(),
  experience: z.array(cvEntrySchema).optional(),
  education: z.array(cvEntrySchema).optional(),
});

const contactDataSchema = z.object({
  email: z.string().email().optional(),
  location: z.string().optional(),
  linkedinUrl: z.string().url().optional(),
});

export function parseHomepageData(input: unknown): HomepageData {
  const result = homepageDataSchema.safeParse(input);
  return result.success ? result.data : {};
}

export function parseProjectsData(input: unknown): ProjectItem[] {
  if (!Array.isArray(input)) {
    return [];
  }

  const parsed: ProjectItem[] = [];

  for (const item of input) {
    const result = projectItemSchema.safeParse(item);
    if (result.success) {
      parsed.push(result.data);
    }
  }

  return parsed;
}

export function parseProjectDetail(input: unknown): ProjectDetail | null {
  const result = projectDetailSchema.safeParse(input);
  return result.success ? result.data : null;
}

export function parseCVData(input: unknown): CVData {
  const result = cvDataSchema.safeParse(input);
  return result.success ? result.data : {};
}

export function parseContactData(input: unknown): ContactData {
  const result = contactDataSchema.safeParse(input);
  return result.success ? result.data : {};
}

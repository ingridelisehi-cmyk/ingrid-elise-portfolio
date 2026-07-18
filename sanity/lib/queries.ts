import {groq} from "next-sanity";

export const homepageQuery = groq`{
  "settings": *[_type == "siteSettings"][0] {
    fullName,
    tagline,
    location
  },
  "featuredProjects": *[_type == "project" && featured == true] | order(order asc, year desc, _createdAt desc)[0...5] {
    title,
    "description": summary,
    "slug": slug.current
  }
}`;

export const projectsQuery = groq`*[_type == "project"] | order(order asc, year desc, _createdAt desc) {
  title,
  "slug": slug.current,
  category,
  year,
  summary,
  "imageUrl": imageUrls[0]
}`;

export const projectSlugsQuery = groq`*[_type == "project" && defined(slug.current)][].slug.current`;

export const projectBySlugQuery = groq`*[_type == "project" && slug.current == $slug][0] {
  title,
  "slug": slug.current,
  category,
  year,
  summary,
  challenge,
  process,
  outcome,
  learnings,
  skills,
  projectUrl,
  imageUrls
}`;

export const cvQuery = groq`{
  "settings": *[_type == "siteSettings"][0] {
    fullName,
    location,
    skills,
    languages,
    otherInfo
  },
  "experience": *[_type == "experience"] | order(order asc, _createdAt desc) {
    period,
    "title": select(
      defined(role) && defined(company) => role + " · " + company,
      defined(role) => role,
      defined(company) => company,
      "Erfaring"
    ),
    detail
  },
  "education": *[_type == "education"] | order(order asc, _createdAt desc) {
    period,
    "title": select(
      defined(degree) && defined(institution) => degree + " · " + institution,
      defined(degree) => degree,
      defined(institution) => institution,
      "Utdanning"
    ),
    detail
  }
}`;

export const contactQuery = groq`*[_type == "siteSettings"][0] {
  email,
  location,
  linkedinUrl
}`;

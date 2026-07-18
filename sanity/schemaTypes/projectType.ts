import {defineField, defineType} from 'sanity'

export const projectType = defineType({
  name: 'project',
  title: 'Prosjekt',
  type: 'document',
  initialValue: {
    category: 'Kategori',
    summary: 'Kort prosjektbeskrivelse...',
    challenge: 'Hva var hovedutfordringen?',
    process: 'Hvordan jobbet du med prosjektet fra start til slutt?',
    outcome: 'Hva ble resultatet?',
    learnings: ['Viktig læring 1'],
    skills: ['Ferdighet 1'],
    featured: false,
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Tittel',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Kategori',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Kort beskrivelse',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'challenge',
      title: 'Utfordring',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'process',
      title: 'Prosess',
      type: 'text',
      rows: 5,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'outcome',
      title: 'Resultat',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'learnings',
      title: 'Læringer',
      type: 'array',
      of: [{type: 'string'}],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'skills',
      title: 'Ferdigheter',
      type: 'array',
      of: [{type: 'string'}],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'projectUrl',
      title: 'Prosjektlenke',
      type: 'url',
      validation: (rule) => rule.uri({allowRelative: false}),
    }),
    defineField({
      name: 'imageUrls',
      title: 'Bilde-URL-er (eksterne)',
      type: 'array',
      of: [{type: 'url'}],
      description: 'Legg inn 1-6 bilde-URL-er fra prosjektet.',
      validation: (rule) => rule.max(6),
    }),
    defineField({
      name: 'year',
      title: 'År',
      type: 'number',
      validation: (rule) => rule.required().integer().min(2000).max(2100),
    }),
    defineField({
      name: 'featured',
      title: 'Vis på forsiden',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Sortering',
      type: 'number',
      description: 'Lavere tall vises først.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      year: 'year',
    },
    prepare({title, subtitle, year}) {
      return {
        title,
        subtitle:
          subtitle && year
            ? `${subtitle} · ${year}`
            : subtitle || (year ? String(year) : 'Uten kategori'),
      }
    },
  },
})

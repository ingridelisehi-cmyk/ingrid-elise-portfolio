import {defineField, defineType} from 'sanity'

export const experienceType = defineType({
  name: 'experience',
  title: 'Erfaring',
  type: 'document',
  fields: [
    defineField({
      name: 'period',
      title: 'Periode',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Rolle',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'company',
      title: 'Arbeidssted',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Sted',
      type: 'string',
    }),
    defineField({
      name: 'employmentType',
      title: 'Stillingstype',
      type: 'string',
    }),
    defineField({
      name: 'detail',
      title: 'Beskrivelse',
      type: 'text',
      rows: 6,
      validation: (rule) => rule.required(),
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
      role: 'role',
      company: 'company',
      period: 'period',
    },
    prepare({role, company, period}) {
      return {
        title: `${role ?? ''} · ${company ?? ''}`,
        subtitle: period,
      }
    },
  },
})

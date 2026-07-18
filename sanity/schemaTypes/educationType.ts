import {defineField, defineType} from 'sanity'

export const educationType = defineType({
  name: 'education',
  title: 'Utdanning',
  type: 'document',
  fields: [
    defineField({
      name: 'period',
      title: 'Periode',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'degree',
      title: 'Grad',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'institution',
      title: 'Institusjon',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'detail',
      title: 'Beskrivelse',
      type: 'text',
      rows: 8,
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
      degree: 'degree',
      institution: 'institution',
      period: 'period',
    },
    prepare({degree, institution, period}) {
      return {
        title: `${degree ?? ''} · ${institution ?? ''}`,
        subtitle: period,
      }
    },
  },
})

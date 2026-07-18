import {defineField, defineType} from 'sanity'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Nettstedsinnstillinger',
  type: 'document',
  fields: [
    defineField({
      name: 'fullName',
      title: 'Fullt navn',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'E-post',
      type: 'string',
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: 'location',
      title: 'Sted',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'linkedinUrl',
      title: 'LinkedIn URL',
      type: 'url',
    }),
    defineField({
      name: 'skills',
      title: 'Ferdigheter',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'languages',
      title: 'Språk',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Språk',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'level',
              title: 'Nivå',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'level',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'otherInfo',
      title: 'Annet',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: 'fullName',
      subtitle: 'location',
    },
  },
})

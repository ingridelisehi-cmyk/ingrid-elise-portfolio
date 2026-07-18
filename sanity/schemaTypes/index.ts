import { type SchemaTypeDefinition } from 'sanity'

import {educationType} from './educationType'
import {experienceType} from './experienceType'
import {projectType} from './projectType'
import {siteSettingsType} from './siteSettingsType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [siteSettingsType, projectType, experienceType, educationType],
}

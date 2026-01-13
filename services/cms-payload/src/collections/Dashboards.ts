import type { CollectionConfig } from 'payload'

import { slugField } from '../fields/slug'

export const Dashboards: CollectionConfig = {
  slug: 'dashboards',
  access:{
     read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },

  admin: {
    defaultColumns: ['title', 'identifier', 'updatedAt'],
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'identifier',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'modules',
      type: 'relationship',
      relationTo: 'modules' as any,
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
    ...slugField('title'),
  ],
  versions: {
    drafts: true,
    maxPerDoc: 10,
  },
}

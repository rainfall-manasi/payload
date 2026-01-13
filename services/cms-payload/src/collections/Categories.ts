import type { CollectionConfig } from 'payload'

import { slugField } from '@/fields/slug'

export const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },

  admin: {
    group: 'Content Library',
    useAsTitle: 'title',
    defaultColumns: ['name', 'slug', 'updatedAt'],
    hidden: false,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    ...slugField(),
  ],
}

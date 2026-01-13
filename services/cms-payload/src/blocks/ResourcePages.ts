import type { Block } from 'payload'

export const ResourcePages: Block = {
  slug: 'resourcePages',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'text',
    },
    {
      name: 'url',
      type: 'text',
    },
    {
      name: 'isExternal',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'icon',
      type: 'text',
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Documentation', value: 'docs' },
        { label: 'Tutorial', value: 'tutorial' },
        { label: 'Reference', value: 'reference' },
        { label: 'Guide', value: 'guide' },
      ],
    },
  ],
}

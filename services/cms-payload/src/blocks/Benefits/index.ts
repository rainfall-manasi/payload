import { Block } from "payload";

export const Benefits: Block = {
  slug: 'benefits',
  labels: {
    singular: 'Benefits Section',
    plural: 'Benefits Sections',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Benefits',
    },
    {
      name: 'titleStyling',
      type: 'group',
      fields: [
        {
          name: 'fontSize',
          type: 'select',
          options: [
            { label: 'Large', value: 'text-3xl' },
            { label: 'X-Large', value: 'text-4xl' },
          ],
          defaultValue: 'text-3xl',
        },
        {
          name: 'fontWeight',
          type: 'select',
          options: [
            { label: 'Semibold', value: 'font-semibold' },
            { label: 'Bold', value: 'font-bold' },
          ],
          defaultValue: 'font-bold',
        },
        {
          name: 'textAlign',
          type: 'select',
          options: [
            { label: 'Center', value: 'text-center' },
            { label: 'Left', value: 'text-left' },
            { label: 'Right', value: 'text-right' },

          ],
          defaultValue: 'text-center',
        },
      ],
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'items',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'richText',
        },
        {
          name: 'icon',
          type: 'text',
          admin: {
            description: 'Enter emoji or icon class',
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'layout',
      type: 'select',
      options: [
        { label: 'Grid 2 Columns', value: 'grid-2' },
        { label: 'Grid 3 Columns', value: 'grid-3' },
        { label: 'Grid 4 Columns', value: 'grid-4' },
      ],
      defaultValue: 'grid-3',
    },
  ],
}
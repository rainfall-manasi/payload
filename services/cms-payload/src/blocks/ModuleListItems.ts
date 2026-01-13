import type { Block } from 'payload'

export const ModuleListItems: Block = {
  slug: 'moduleListItems',
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
      name: 'icon',
      type: 'text',
    },
    {
      name: 'value',
      type: 'text',
    },
    {
      name: 'action',
      type: 'group',
      fields: [
        {
          name: 'actionType',
          type: 'select',
          options: [
            { label: 'None', value: 'none' },
            { label: 'Link', value: 'link' },
            { label: 'Toggle', value: 'toggle' },
            { label: 'Copy', value: 'copy' },
          ],
        },
        {
          name: 'url',
          type: 'text',
          admin: {
            condition: (data, siblingData) => siblingData.actionType === 'link',
          },
        },
        {
          name: 'copyText',
          type: 'text',
          admin: {
            condition: (data, siblingData) => siblingData.actionType === 'copy',
          },
        },
      ],
    },
  ],
}

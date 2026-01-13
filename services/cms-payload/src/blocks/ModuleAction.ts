import type { Block } from 'payload'

export const ModuleAction: Block = {
  slug: 'moduleAction',
  fields: [
    {
      name: 'actionType',
      type: 'select',
      options: [
        { label: 'Link', value: 'link' },
        { label: 'Button', value: 'button' },
        { label: 'Modal', value: 'modal' },
        { label: 'API Call', value: 'api' },
      ],
    },
    {
      name: 'label',
      type: 'text',
    },
    {
      name: 'url',
      type: 'text',
      admin: {
        condition: (data, siblingData) => siblingData.actionType === 'link',
      },
    },
    {
      name: 'apiEndpoint',
      type: 'text',
      admin: {
        condition: (data, siblingData) => siblingData.actionType === 'api',
      },
    },
    {
      name: 'modalContent',
      type: 'richText',
      admin: {
        condition: (data, siblingData) => siblingData.actionType === 'modal',
      },
    },
  ],
}

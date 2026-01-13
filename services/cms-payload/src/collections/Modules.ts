import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'

export const Modules: CollectionConfig = {
  slug: 'modules',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'style', 'category', 'isActive', 'updatedAt'],
    useAsTitle: 'name',
    group: 'Apps',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Module name for identification and reuse',
      },
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      admin: {
        description: 'Unique identifier for this module (auto-generated if empty)',
      },
      hooks: {
        beforeValidate: [
          ({ data, operation }) => {
            if (operation === 'create' && !data?.slug && data?.name) {
              return data.name
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '')
            }
            return data?.slug
          },
        ],
      },
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'title',
      type: 'text',
      admin: {
        description: 'Display title for the module (can be different from name)',
      },
    },
    {
      name: 'style',
      type: 'select',
      required: true,
      options: [
        { label: 'Activities', value: 'activities' },
        { label: 'Rainmaker', value: 'rainmaker' },
        { label: 'Timeline', value: 'timeline' },
        { label: 'Full', value: 'full' },
        { label: 'Button 1', value: 'button1' },
        { label: 'Card', value: 'card' },
        { label: 'Banner', value: 'banner' },
      ],
      admin: {
        description: 'Visual style/layout of the module',
      },
    },
    {
      name: 'category',
      type: 'text',
      admin: {
        description: 'Category for organizing modules (e.g., "Navigation", "Content", "Actions")',
      },
    },
    {
      name: 'uiStyle',
      type: 'select',
      defaultValue: 'light',
      options: [
        { label: 'Light', value: 'light' },
        { label: 'Dark', value: 'dark' },
      ],
      admin: {
        description: 'UI theme for the module',
      },
      dbName: 'ui_style',
    },
    {
      name: 'dismissible',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Can users dismiss/close this module?',
      },
    },
    {
      name: 'startDate',
      type: 'date',
      admin: {
        condition: (data, siblingData) => ['rainmaker', 'timeline'].includes(siblingData?.style),
        date: {
          pickerAppearance: 'dayAndTime',
        },
        description: 'Start date for time-based modules',
      },
    },
    {
      name: 'body',
      type: 'relationship',
      relationTo: 'platform-content' as any,
      admin: {
        condition: (data, siblingData) =>
          !['activities', 'rainmaker', 'timeline'].includes(siblingData?.style),
        description: 'Main content for the module',
      },
    },
    {
      name: 'bgImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (data, siblingData) => ['full', 'card', 'banner'].includes(siblingData?.style),
        description: 'Background image for visual modules',
      },
    },
    {
      name: 'bgImageUrl',
      type: 'text',
      admin: {
        description: 'External image URL (alternative to uploaded image)',
        condition: (data, siblingData) => ['full', 'card', 'banner'].includes(siblingData?.style),
      },
    },
    {
      name: 'listItems',
      type: 'array',
      admin: {
        condition: (data, siblingData) => ['activities', 'timeline'].includes(siblingData?.style),
        description: 'Items for list-based modules',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'timestamp',
          type: 'date',
          admin: {
            date: {
              pickerAppearance: 'dayAndTime',
            },
          },
        },
        {
          name: 'status',
          type: 'select',
          options: [
            { label: 'Active', value: 'active' },
            { label: 'Completed', value: 'completed' },
            { label: 'Pending', value: 'pending' },
            { label: 'Cancelled', value: 'cancelled' },
          ],
        },
      ],
    },
    {
      name: 'action',
      type: 'group',
      label: 'Module Action',
      fields: [
        {
          name: 'type',
          type: 'select',
          required: true,
          options: [
            { label: 'Show Content', value: 'showContent' },
            { label: 'Email', value: 'email' },
            { label: 'Open Web Page', value: 'openWebPage' },
            { label: 'Deep Link', value: 'deepLink' },
            { label: 'No Action', value: 'none' },
          ],
          admin: {
            description: 'Select the type of action this module should perform',
          },
        },
        {
          name: 'emailAddress',
          type: 'email',
          admin: {
            condition: (data, siblingData) => siblingData?.type === 'email',
          },
        },
        {
          name: 'webPageURL',
          type: 'text',
          admin: {
            condition: (data, siblingData) => siblingData?.type === 'openWebPage',
          },
        },
        {
          name: 'webPageOptions',
          type: 'select',
          options: [
            { label: 'Same Window', value: 'same' },
            { label: 'New Window', value: 'new' },
            { label: 'Modal', value: 'modal' },
          ],
          admin: {
            condition: (data, siblingData) => siblingData?.type === 'openWebPage',
          },
          dbName: 'web_opts',
        },
        {
          name: 'deepLinkURL',
          type: 'text',
          admin: {
            condition: (data, siblingData) => siblingData?.type === 'deepLink',
            description: 'App deep link URL (e.g., myapp://screen/detail)',
          },
        },
        {
          name: 'content',
          type: 'relationship',
          relationTo: 'platform-content' as any,
          admin: {
            condition: (data, siblingData) => siblingData?.type === 'showContent',
          },
        },
      ],
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Whether this module is currently active/available for use',
      },
    },
    {
      name: 'metadata',
      type: 'group',
      label: 'Metadata',
      fields: [
        {
          name: 'description',
          type: 'textarea',
          admin: {
            description: 'Internal description or notes about this module',
          },
        },
        {
          name: 'tags',
          type: 'text',
          hasMany: true,
          admin: {
            description: 'Tags for better organization and searchability',
          },
        },
        {
          name: 'version',
          type: 'text',
          admin: {
            description: 'Version number or identifier',
          },
        },
      ],
    },
  ],
  versions: {
    drafts: {
      autosave: {
        interval: 300,
      },
    },
    maxPerDoc: 50,
  },
}


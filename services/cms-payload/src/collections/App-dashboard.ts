import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'

export const AppDashboards: CollectionConfig = {
  slug: 'app-dashboards',

  admin: {
    defaultColumns: ['title', 'identifier', 'slug', 'updatedAt'],
    useAsTitle: 'title',
    group: 'Apps',
  },
  labels: {
    singular: 'Dashboard',
    plural: 'Dashboard',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: { description: 'Dashboard title for internal reference' },
    },
    {
      name: 'identifier',
      type: 'text',
      required: true,
      unique: true,
      admin: { description: 'Unique identifier for API reference (e.g., R.1_Dashboard)' },
    },
    // Modules array
    {
      name: 'modules',
      type: 'array',
      label: 'Modules',
      admin: { description: 'Select modules for this dashboard - vertical list format', initCollapsed: false },
      fields: [
        { name: 'module', type: 'relationship', relationTo: 'modules' as any, required: true },
        { name: 'order', type: 'number' },
        {
          name: 'overrides',
          type: 'group',
          label: 'Module Overrides',
          fields: [
            { name: 'title', type: 'text' },
            {
              name: 'uiStyle',
              type: 'select',
              options: [
                { label: 'Use Module Default', value: 'default' },
                { label: 'Light', value: 'light' },
                { label: 'Dark', value: 'dark' },
              ],
              defaultValue: 'default',
            },
            { name: 'dismissible', type: 'checkbox' },
          ],
        },
      ],
    },
    // FAQs array
    {
      name: 'faqs',
      type: 'array',
      label: 'FAQs',
      admin: { description: 'Select FAQs for this dashboard - vertical list format', initCollapsed: false },
      fields: [{ name: 'faq', type: 'relationship', relationTo: 'faq-content' as any, required: true }],
    },
    // Dashboard-level settings
    {
      name: 'dashboardSettings',
      type: 'group',
      label: 'Dashboard Settings',
      fields: [
        { name: 'layout', type: 'select', options: [{ label: 'Grid', value: 'grid' }, { label: 'List', value: 'list' }, { label: 'Custom', value: 'custom' }], defaultValue: 'grid' },
        { name: 'theme', type: 'select', options: [{ label: 'Light', value: 'light' }, { label: 'Dark', value: 'dark' }, { label: 'Auto', value: 'auto' }], defaultValue: 'auto' },
        { name: 'refreshInterval', type: 'number' },
      ],
    },
    // Target audience / permissions
    {
      name: 'targetAudience',
      type: 'group',
      label: 'Target Audience',
      fields: [
        { name: 'userRoles', type: 'text', hasMany: true },
        { name: 'appVersions', type: 'text', hasMany: true },
        { name: 'platforms', type: 'select', hasMany: true, options: [{ label: 'iOS', value: 'ios' }, { label: 'Android', value: 'android' }, { label: 'Web', value: 'web' }] },
      ],
    },
    ...slugField('identifier'),
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (!data.identifier && data.title) {
          data.identifier = data.title
            .toLowerCase()
            .replace(/[^a-z0-9]/g, '_') // replace non-alphanumeric with _
            .replace(/_+/g, '_')          // collapse multiple underscores
            .replace(/^_|_$/g, '')        // trim leading/trailing underscores
        }
        return data
      },
    ],
  },
  versions: { drafts: { autosave: { interval: 300 } }, maxPerDoc: 50 },
}

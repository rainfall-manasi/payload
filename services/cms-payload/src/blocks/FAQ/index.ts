import { Block } from 'payload'

export const FAQ: Block = {
  slug: 'faq',
  labels: {
    singular: 'FAQ Section',
    plural: 'FAQ Sections',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Frequently Asked Questions',
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
          name: 'textAlign',
          type: 'select',
          options: [
            { label: 'Center', value: 'text-center' },
            { label: 'Left', value: 'text-left' },
          ],
          defaultValue: 'text-center',
        },
      ],
    },
    // Replace the items array with relationship to FAQ collection
    {
      name: 'faqs',
      type: 'relationship',
      relationTo: 'faq-content' as any,
      hasMany: true,
      admin: {
        description: 'Select FAQs to display in this section',
      },
    },
    // Optional: Add filtering options
    {
      name: 'filterByTags',
      type: 'text',
      hasMany: true,
      admin: {
        description: 'Optional: Filter FAQs by tags (leave empty to use selected FAQs above)',
        condition: (data, siblingData) => !siblingData?.faqs || siblingData.faqs.length === 0,
      },
    },
    {
      name: 'maxItems',
      type: 'number',
      admin: {
        description: 'Maximum number of FAQs to display (leave empty for no limit)',
      },
    },
    {
      name: 'sortBy',
      type: 'select',
      options: [
        { label: 'Manual Order (Selected Order)', value: 'manual' },
        { label: 'Newest First', value: 'newest' },
        { label: 'Oldest First', value: 'oldest' },
      ],
      defaultValue: 'manual',
      admin: {
        description: 'How to sort the displayed FAQs',
      },
    },
  ],
}

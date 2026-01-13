import type { Block } from 'payload'

export const LandingPageFAQ: Block = {
  slug: 'landingPageFAQ',
  fields: [
    {
      name: 'question',
      type: 'text',
      required: true,
    },
    {
      name: 'answer',
      type: 'richText',
      required: true,
    },
    {
      name: 'isExpanded',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Whether this FAQ item should be expanded by default',
      },
    },
    {
      name: 'category',
      type: 'text',
      admin: {
        description: 'Category for grouping FAQ items',
      },
    },
  ],
}
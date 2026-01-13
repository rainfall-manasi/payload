import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'
import { LandingPageHeader } from '../blocks/LandingPageHeader'
import { LandingPageBenefits } from '../blocks/LandingPageBenefits'
import { LandingPageContents } from '../blocks/LandingPageContents'
import { LandingPageFAQ } from '../blocks/LandingPageFAQ'
import { LandingPageSignUp } from '../blocks/LandingPageSignUp'

export const Pages: CollectionConfig = {
  slug: 'rainfall-pages',
  access: {
     read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  admin: {
    defaultColumns: ['identifier', 'updatedAt'],
    useAsTitle: 'identifier',
  },
  fields: [
    {
      name: 'identifier',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'themeColor',
      type: 'text',
      admin: {
        description: 'Hex color code for page theme',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Header',
          fields: [
            {
              name: 'landingPageHeader',
              type: 'group',
              fields: LandingPageHeader.fields,
            },
          ],
        },
        {
          label: 'Content Sections',
          fields: [
            {
              name: 'landingPageBenefits',
              type: 'array',
              minRows: 1,
              maxRows: 3,
              fields: LandingPageBenefits.fields,
            },
            {
              name: 'landingPageContents',
              type: 'array',
              minRows: 1,
              fields: LandingPageContents.fields,
            },
          ],
        },
        {
          label: 'Interactive Elements',
          fields: [
            {
              name: 'landingPageFAQ',
              type: 'array',
              fields: LandingPageFAQ.fields,
            },
            {
              name: 'landingPageSignUp',
              type: 'group',
              fields: LandingPageSignUp.fields,
            },
          ],
        },
      ],
    },
  ],
  versions: {
    drafts: true,
    maxPerDoc: 15,
  },
}
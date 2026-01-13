import type { GlobalConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'

export const StarAuras: GlobalConfig = {
  slug: 'star-auras',
  access: {
    read: () => true,
    update: () => true,
  },
  admin: {
    group: 'Sites',
  },
  label: 'Investor',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Your Favorite Celebrity. Their Star Aura.',
      admin: {
        description: 'Main page title',
      },
    },
    {
      name: 'subtitle',
      type: 'text',
      admin: {
        description: 'Subtitle or tagline for the page',
      },
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'Background image for the page',
      },
    },
    {
      name: 'foregroundImage',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'Foreground/hero image for the page',
      },
    },
    {
      name: 'content',
      type: 'relationship',
      relationTo: 'platform-content' as any,
      hasMany: false, // one-to-one relationship
      admin: {
        description: 'Select content from the platform content library',
      },
    },
    {
      name: 'disclaimerText',
      type: 'text',
      admin: {
        description: 'Disclaimer text to display on the page',
        placeholder: 'Enter any legal disclaimers or important notices...',
      },
    },
  ],
  versions: {
    drafts: true,
  },
}

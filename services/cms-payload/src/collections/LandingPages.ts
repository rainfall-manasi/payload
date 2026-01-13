import { authenticated } from '@/access/authenticated'
import { CollectionConfig } from 'payload'

export const LandingPages: CollectionConfig = {
  slug: 'landing-pages',
  dbName: 'lp',
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'isActive'],
    group: 'Sites',
  },
   labels: {
    singular: 'Rainmaker',
    plural: 'Rainmaker',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Internal name (e.g., "Beta Landing", "Nillion Site")',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL slug (e.g., "beta", "nillion")',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: 'Toggle to activate/deactivate this page',
      },
    },

    // Star Auras Configuration - Always included
    {
      name: 'starAuras',
      type: 'group',
      label: 'Star Auras Section',
      admin: {
        description: 'Configure Star Auras display for this page',
      },
      fields: [
        {
          name: 'includeStarAuras',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Show Star Auras section on this page',
          },
        },
      ],
    },
    {
      name: 'blocks',
      type: 'blocks',
      minRows: 1,
      blocks: [
        // Hero Block
        {
          slug: 'hero',
          dbName: 'h',
          labels: { singular: 'Hero Section', plural: 'Hero Sections' },
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'subtitle',
              type: 'text',
            },
            {
              name: 'isBannerVisible',
              type: 'checkbox',
              defaultValue: false,
            },
            {
              name: 'bannerText',
              type: 'text',
              required: false,
              admin: {
                condition: (data, siblingData) => {
                  return siblingData?.isBannerVisible === true
                },
              },
            },
            {
              name: 'style',
              type: 'group',
              fields: [
                {
                  name: 'titleSize',
                  dbName: 'ts',
                  type: 'radio',
                  options: [
                    { label: 'Large', value: 'lg' },
                    { label: 'XL', value: 'xl' },
                    { label: 'XXL', value: 'xxl' },
                  ],
                  defaultValue: 'xl',
                },
                {
                  name: 'alignment',
                  dbName: 'align',
                  type: 'radio',
                  options: [
                    { label: 'Left', value: 'left' },
                    { label: 'Center', value: 'center' },
                  ],
                  defaultValue: 'center',
                },
              ],
            },
            {
              name: 'bgMedia',
              type: 'group',
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                },
                {
                  name: 'logo',
                  type: 'upload',
                  relationTo: 'media',
                },
                {
                  name: 'brand-avatar',
                  type: 'upload',
                  relationTo: 'media',
                },
              ],
            },
            {
              name: 'buttons',
              dbName: 'btn',
              type: 'array',
              maxRows: 3,
              fields: [
                {
                  name: 'text',
                  type: 'text',
                  required: true,
                },

                {
                  name: 'isPrimary',
                  type: 'checkbox',
                  defaultValue: true,
                  admin: {
                    description: 'Primary button style vs secondary',
                  },
                },
                {
                  name: 'isLarge',
                  type: 'checkbox',
                  defaultValue: false,
                  admin: {
                    description: 'Large button size',
                  },
                },
              ],
            },
          ],
        },

        // Benefits Block
        {
          slug: 'benefits',
          dbName: 'b',
          labels: { singular: 'Benefits Section', plural: 'Benefits Sections' },
          fields: [
            {
              name: 'title',
              type: 'text',
              defaultValue: 'Benefits',
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
                    description: 'Enter emoji or icon class (e.g., 🚀, fa-rocket)',
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
              type: 'radio',
              options: [
                { label: '2 Columns', value: '2' },
                { label: '3 Columns', value: '3' },
                { label: '4 Columns', value: '4' },
              ],
              defaultValue: '3',
            },
          ],
        },

        // Content Block
        {
          slug: 'content-features',
          dbName: 'c',
          labels: { singular: 'Content Section', plural: 'Content Sections' },
          fields: [
            {
              name: 'title',
              type: 'text',
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
                  required: true,
                },
                {
                  name: 'logo',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                  admin: {
                    description: 'Logo/icon for this content item',
                  },
                },
              ],
            },
          ],
        },

        {
          slug: 'guidelince',
          dbName: 'g',
          labels: { singular: 'Guidelince Section', plural: 'Guidelince Sections' },
          fields: [
            {
              name: 'buttonText',
              type: 'text',
              admin: {
                description: 'Button text for the guideline section',
              },
            },
            {
              name: 'content',
              type: 'richText',
              required: true,
            },
            {
              name: 'guidelineBrief',
              type: 'richText',
              required: true,
              admin: {
                description: 'Brief description of the guidelines',
              },
            },
          ],
        },

        // FAQ Block
        {
          slug: 'faq',
          dbName: 'f',
          labels: { singular: 'FAQ Section', plural: 'FAQ Sections' },
          fields: [
            {
              name: 'title',
              type: 'text',
              defaultValue: 'Frequently Asked Questions',
            },

            {
              name: 'faqs',
              type: 'array',
              label: 'FAQs',
              admin: {
                description: 'Select FAQs to display in this section - vertical list format',
                initCollapsed: false,
              },
              fields: [
                {
                  name: 'faq',
                  type: 'relationship',
                  relationTo: 'faq-content' as any,
                  required: true,
                  admin: {
                    description: 'Select FAQ - the question will show in the dropdown',
                  },
                },
              ],
            },
          ],
        },

        // Sign Up Block (for Nillion-style pages)
        {
          slug: 'signup',
          dbName: 'su',
          labels: { singular: 'Sign Up Section', plural: 'Sign Up Sections' },
          fields: [
            {
              name: 'title',
              type: 'text',
              defaultValue: 'Sign Up',
            },
            {
              name: 'description',
              type: 'richText',
            },
            {
              name: 'helpingTextTestflight',
              type: 'text',
              admin: {
                description: 'Additional helping text for iOS users',
              },
            },
            {
              name: 'isAndroidWaitlistEnabled',
              type: 'checkbox',
              defaultValue: false,
              admin: {
                description: 'Enable Android waitlist functionality',
              },
            },
            {
              name: 'askSocialMediaHandle',
              type: 'checkbox',
              defaultValue: false,
              admin: {
                description: 'Ask users for their social media handle',
              },
            },
            {
              name: 'formFields',
              dbName: 'fields',
              type: 'array',
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'Field name (e.g., email, firstName)',
                  },
                },
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'Display label (e.g., Email Address)',
                  },
                },
                {
                  name: 'type',
                  type: 'radio',
                  options: [
                    { label: 'Text', value: 'text' },
                    { label: 'Email', value: 'email' },
                    { label: 'Phone', value: 'phone' },
                  ],
                  defaultValue: 'text',
                },
                {
                  name: 'required',
                  type: 'checkbox',
                  defaultValue: false,
                },
                {
                  name: 'placeholder',
                  type: 'text',
                },
              ],
            },
            {
              name: 'submitText',
              type: 'text',
              defaultValue: 'Submit',
            },
          ],
        },
      ],
      admin: {
        description: 'Build your page by adding and arranging blocks',
      },
    },

    // SEO Meta
    {
      name: 'seo',
      type: 'group',
      admin: {
        position: 'sidebar',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          admin: {
            description: 'SEO page title (appears in browser tab)',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          maxLength: 160,
          admin: {
            description: 'Meta description for search engines (max 160 chars)',
          },
        },
        {
          name: 'keywords',
          type: 'text',
          admin: {
            description: 'Keywords separated by commas',
          },
        },
        {
          name: 'ogImage',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Social sharing image (1200x630px recommended)',
          },
        },
      ],
    },
  ],

  hooks: {
    beforeValidate: [
      ({ data }) => {
        // Auto-generate slug from name if not provided
        if (data && data.name && !data.slug) {
          data.slug = data.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')
        }
        return data
      },
    ],
  },
}


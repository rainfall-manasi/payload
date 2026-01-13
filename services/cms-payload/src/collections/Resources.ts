import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'
import { ResourcePages } from '../blocks/ResourcePages'
import {
  AlignFeature,
  BoldFeature,
  ChecklistFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  IndentFeature,
  InlineToolbarFeature,
  ItalicFeature,
  lexicalEditor,
  LinkFeature,
  OrderedListFeature,
  ParagraphFeature,
  StrikethroughFeature,
  SubscriptFeature,
  SuperscriptFeature,
  UnderlineFeature,
  UnorderedListFeature,
} from '@payloadcms/richtext-lexical'

export const Resources: CollectionConfig = {
  slug: 'resources',
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  admin: {
    defaultColumns: ['title', 'lastModified'],
    useAsTitle: 'title',
    group: 'Sites',
  },
  labels: {
   singular: 'Marketing',
  plural: 'Marketing',
  },
  fields: [
    // Main Title Field
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Main page title displayed in header',
      },
    },

    // Page Description
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Brief description of the resource page',
      },
    },

    {
      name: 'body',
      type: 'relationship',
      relationTo: 'platform-content' as any,
      label: 'Overview Content',

      hasMany: false, // one-to-one relationship
      admin: {
        description: 'Select content from the platform content library',
      },
    },

    // Sub-pages (Primary Content)
    {
      name: 'subPages',
      type: 'array',
      label: 'Sub-pages',
      admin: {
        description: 'Individual pages for each section with detailed content',
      },
      fields: [
        {
          name: 'pageTitle',
          type: 'text',
          required: true,
          label: 'Page Title',
        },
        {
          name: 'pageDescription',
          type: 'textarea',
          label: 'Page Description',
        },
        {
          name: 'pageSlug',
          type: 'text',
          required: true,
          label: 'Page Slug',
          admin: {
            description: 'URL slug for this page (e.g., "what-is-rainfall")',
          },
        },
        {
          name: 'pageBody',
          type: 'relationship',
          relationTo: 'platform-content' as any,
          label: 'Page Content',

          hasMany: false, // one-to-one relationship
          admin: {
            description: 'Select content from the platform content library',
          },
        },
      ],
    },

    // Navigation Items (References to sub-pages)
    {
      name: 'navigation',
      type: 'group',
      label: 'Navigation Component',
      fields: [
        {
          name: 'items',
          type: 'array',
          label: 'Navigation Items',
          admin: {
            description: 'Navigation items that reference sub-pages',
          },
          fields: [
            {
              name: 'navTitle',
              type: 'text',
              required: true,
              label: 'Navigation Title',
              admin: {
                description: 'Title shown in navigation',
              },
            },
            {
              name: 'subPageReference',
              type: 'text',
              label: 'Sub-page Slug Reference',
              admin: {
                description: 'Should match the slug of a sub-page above',
              },
            },
            {
              name: 'active',
              type: 'checkbox',
              defaultValue: false,
              label: 'Active State',
            },
          ],
        },
      ],
    },

    // Content Sections (Overview sections that point to sub-pages)
    {
      name: 'overviewSections',
      type: 'array',
      label: 'Overview Content Sections',
      admin: {
        description:
          'Overview sections like "What is Rainfall", "Getting Started" that link to sub-pages',
      },
      fields: [
        {
          name: 'sectionTitle',
          type: 'text',
          required: true,
          label: 'Section Title',
          admin: {
            description: 'Section title (e.g., "What is Rainfall")',
          },
        },
        {
          name: 'sectionDescription',
          type: 'textarea',
          required: true,
          label: 'Section Description',
          admin: {
            description: 'Brief description of the section content',
          },
        },
        {
          name: 'linkedSubPage',
          type: 'text',
          required: true,
          label: 'Linked Sub-page Slug',
          admin: {
            description:
              'Slug of the sub-page this section links to (must match a sub-page slug above)',
          },
        },
        {
          name: 'linkText',
          type: 'text',
          defaultValue: 'Read more',
          label: 'Link Text',
          admin: {
            description: 'Text for the section link (default: "Read more")',
          },
        },
        {
          name: 'sectionOrder',
          type: 'number',
          defaultValue: 1,
          label: 'Section Order',
          admin: {
            description: 'Display order of sections in overview',
          },
        },
      ],
    },

    // // Metadata
    // {
    //   name: 'metadata',
    //   type: 'group',
    //   label: 'Metadata',
    //   admin: {
    //     position: 'sidebar',
    //   },
    //   fields: [
    //     {
    //       name: 'contentType',
    //       type: 'select',
    //       options: [
    //         { label: 'Documentation', value: 'documentation' },
    //         { label: 'API Reference', value: 'api-reference' },
    //         { label: 'Guide', value: 'guide' },
    //         { label: 'Tutorial', value: 'tutorial' },
    //       ],
    //       defaultValue: 'documentation',
    //     },
    //     {
    //       name: 'template',
    //       type: 'text',
    //       defaultValue: 'overview-page',
    //     },
    //   ],
    // },

    // Last Modified (keeping your existing logic)
    {
      name: 'lastModified',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          () => {
            return new Date()
          },
        ],
      },
    },
  ],
  versions: {
    drafts: true,
    maxPerDoc: 10,
  },
}

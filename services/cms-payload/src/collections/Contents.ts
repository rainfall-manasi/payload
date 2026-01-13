import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'

import {
  AlignFeature,
  BlocksFeature,
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

export const AppContents: CollectionConfig = {
  slug: 'app-contents',
  access: {
     read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  admin: {
    defaultColumns: ['identifier', 'title', 'category', 'updatedAt'],
    useAsTitle: 'identifier',
    group: 'App Management',
  },
  fields: [
    {
      name: 'identifier',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
        description: 'Unique identifier for content reference',
      },
    },
    {
      name: 'title',
      type: 'text',
      admin: {
        description: 'Internal title for content management',
      },
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Article', value: 'article' },
        { label: 'Tutorial', value: 'tutorial' },
        { label: 'Announcement', value: 'announcement' },
        { label: 'FAQ', value: 'faq' },
        { label: 'Policy', value: 'policy' },
        { label: 'About', value: 'about' },
        { label: 'Feature', value: 'feature' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'summary',
      type: 'textarea',
      maxLength: 200,
      admin: {
        description: 'Brief summary of the content (max 200 characters)',
      },
    },
    {
      name: 'body',
      type: 'richText',
      admin: {
        className: 'noto-sans-editor',
        description: 'Main content with Noto Sans typography',
      },
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,

            // Text Formatting Features
            HeadingFeature({
              enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
            }),

            // List Features
            UnorderedListFeature(),
            OrderedListFeature(),
            ChecklistFeature(),

            // Alignment Features
            AlignFeature(),

            // Text Styling Features
            BoldFeature(),
            ItalicFeature(),
            UnderlineFeature(),
            StrikethroughFeature(),
            SubscriptFeature(),
            SuperscriptFeature(),

            // Link Features
           LinkFeature({
                            enabledCollections: ['posts'] as any,
                          }),

            // Editor UI Features
            FixedToolbarFeature(),
            InlineToolbarFeature(),
            HorizontalRuleFeature(),

            // Layout Features
            IndentFeature(),

            // Content Management Features
            ParagraphFeature(),

            // Blocks for rich content
            BlocksFeature({
              blocks: [
                {
                  slug: 'callout',
                  fields: [
                    {
                      name: 'type',
                      type: 'select',
                      options: [
                        { label: 'Info', value: 'info' },
                        { label: 'Warning', value: 'warning' },
                        { label: 'Success', value: 'success' },
                        { label: 'Error', value: 'error' },
                      ],
                      defaultValue: 'info',
                    },
                    {
                      name: 'content',
                      type: 'richText',
                      editor: lexicalEditor({
                        features: ({ rootFeatures }) => [
                          ...rootFeatures,
                          BoldFeature(),
                          ItalicFeature(),
                          LinkFeature({
                            enabledCollections: ['posts'] as any,
                          }),
                        ],
                      }),
                    },
                    {
                      name: 'faqs',
                      type: 'array',
                      label: 'FAQs',
                      admin: {
                        description: 'Select FAQs to display in this content',
                        initCollapsed: false,
                      },
                      fields: [
                        {
                          name: 'faq',
                          type: 'relationship',
                          relationTo: 'faq-content' as any,
                          required: true,
                          admin: {
                            description: 'Select FAQ — question shows with tags',
                          },
                        },
                      ],
                    },
                  ],
                },
                {
                  slug: 'codeBlock',
                  fields: [
                    {
                      name: 'language',
                      type: 'select',
                      options: [
                        { label: 'JavaScript', value: 'javascript' },
                        { label: 'TypeScript', value: 'typescript' },
                        { label: 'Python', value: 'python' },
                        { label: 'JSON', value: 'json' },
                        { label: 'HTML', value: 'html' },
                        { label: 'CSS', value: 'css' },
                      ],
                    },
                    {
                      name: 'code',
                      type: 'code',
                      required: true,
                    },
                  ],
                },
              ],
            }),
          ]
        },
      }),
      required: true,
    },
    {
      name: 'tags',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'AI', value: 'ai' },
        { label: 'Privacy', value: 'privacy' },
        { label: 'Data', value: 'data' },
        { label: 'Blockchain', value: 'blockchain' },
        { label: 'Decentralized', value: 'decentralized' },
        { label: 'Self-Sovereign', value: 'self-sovereign' },
        { label: 'Tutorial', value: 'tutorial' },
        { label: 'Guide', value: 'guide' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'readingTime',
      type: 'number',
      admin: {
        position: 'sidebar',
        description: 'Estimated reading time in minutes',
        readOnly: true,
      },
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        position: 'sidebar',
      },
    },

    ...slugField('identifier'),
  ],
  hooks: {
    beforeChange: [
      ({ data }: { data: any }) => {
        // Auto-calculate reading time based on body content
        if (data.body) {
          const wordCount = JSON.stringify(data.body).split(' ').length
          data.readingTime = Math.ceil(wordCount / 200) // Average reading speed
        }

        // Auto-generate identifier if not provided
        if (!data.identifier && data.title) {
          data.identifier = data.title
            .toLowerCase()
            .replace(/[^a-z0-9]/g, '_')
            .replace(/_+/g, '_')
            .replace(/^_|_$/g, '')
        }

        return data
      },
    ],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 300,
      },
    },
    maxPerDoc: 25,
  },
}


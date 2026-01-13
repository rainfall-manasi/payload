import type { CollectionConfig } from 'payload'
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
import { MediaBlock } from '@/blocks/MediaBlock/index'
import { Code } from '@/blocks/Code/config'

export const PlatformContent: CollectionConfig = {
  slug: 'platform-content',
  access: {
     read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  admin: {
    group: 'Assets',
    useAsTitle: 'name',

    defaultColumns: ['name', 'slug', 'platform', 'updatedAt'],
  },
  labels: {
    singular: 'Content',
    plural: 'Content',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description:
          'Display name for this content (e.g., "Website Terms of Use", "App Privacy Policy")',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'title for this content (e.g., "Website Terms of Use", "App Privacy Policy")',
      },
    },
    {
      name: 'summury',
      type: 'text',
      required: true,
      admin: {
        description:
          'summury for this content (e.g., "Website Terms of Use", "App Privacy Policy")',
      },
    },

    {
      name: 'platform',
      type: 'select',
      required: true,
      options: [
        {
          label: 'Website',
          value: 'website',
        },
        {
          label: 'Mobile App',
          value: 'app',
        },
        {
          label: 'Both',
          value: 'both',
        },
      ],
      admin: {
        description: 'Which platform this content is intended for',
      },
    },

    {
      name: 'content',
      type: 'richText',
      required: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
          BoldFeature(),
          ItalicFeature(),
          UnderlineFeature(),
          StrikethroughFeature(),
          SubscriptFeature(),
          SuperscriptFeature(),
          UnorderedListFeature(),
          OrderedListFeature(),
          ChecklistFeature(),
          // Links
         LinkFeature({
                            enabledCollections: ['posts'] as any,
                          }),

          // Blocks - Make sure these are properly imported
          BlocksFeature({
            blocks: [Code, MediaBlock],
          }),

          AlignFeature(),
          IndentFeature(),
          ParagraphFeature(),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
          HorizontalRuleFeature(),
        ],
      }),
      admin: {
        description: 'The rich text content',
      },
    },
    {
      name: 'faqs',
      type: 'array',
      label: 'FAQs',
      admin: {
        description: 'Select FAQs to display for this platform content',
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
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Whether this content is currently active/published',
      },
    },
  ],
}

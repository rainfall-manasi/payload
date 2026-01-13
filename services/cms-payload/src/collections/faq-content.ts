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
  UploadFeature,
} from '@payloadcms/richtext-lexical'
import { MediaBlock } from '@/blocks/MediaBlock'

export const FAQContent: CollectionConfig = {
  slug: 'faq-content',
  labels: {
    singular: 'FAQ',
    plural: 'FAQs',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  admin: {
    group: 'Assets',
    useAsTitle: 'label',
    defaultColumns: ['question', 'metadata.tags', 'isActive', 'updatedAt'],
  },
  hooks: {
    afterRead: [
      ({ doc }) => {
        const question = doc?.question || ''
        const tags = Array.isArray(doc?.metadata?.tags) ? doc.metadata.tags : []
        const tagStr = tags.length ? ` [${tags.join(', ')}]` : ''
        return { ...doc, label: doc?.label ?? `${question}${tagStr}` }
      },
    ],
  },
  fields: [
    {
      name: 'question',
      type: 'text',
      required: true,
      admin: {
        description: 'The FAQ question',
      },
    },
    {
      name: 'label',
      type: 'text',
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Auto-generated label combining question and tags for selection',
      },
      hooks: {
        beforeValidate: [
          ({ data }) => {
            const question = data?.question || ''
            const tags = Array.isArray(data?.metadata?.tags) ? data.metadata.tags : []
            const tagStr = tags.length ? ` [${tags.join(', ')}]` : ''
            return `${question}${tagStr}`
          },
        ],
      },
    },

    {
      name: 'answer',
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
          LinkFeature({
            enabledCollections: ['posts'] as any,
          }),
          AlignFeature(),
          IndentFeature(),
          ParagraphFeature(),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
          HorizontalRuleFeature(),
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
              MediaBlock,
            ],
          }),
          UploadFeature({
            collections: {
              media: {
                fields: [
                  {
                    name: 'caption',
                    type: 'richText',
                    editor: lexicalEditor(),
                  },
                ],
              },
            },
          }),
        ],
      }),
      admin: {
        description: 'The detailed answer to the question',
      },
    },

    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Whether this FAQ is currently active/published',
      },
    },
    {
      name: 'metadata',
      type: 'group',
      label: 'Metadata',
      fields: [
        {
          name: 'tags',
          type: 'text',
          hasMany: true,
          admin: {
            description: 'Tags for better searchability and organization',
          },
        },
        {
          name: 'lastReviewed',
          type: 'date',
          admin: {
            description: 'Date when this FAQ was last reviewed for accuracy',
          },
        },
        {
          name: 'internalNotes',
          type: 'textarea',
          admin: {
            description: 'Internal notes or comments about this FAQ',
          },
        },
      ],
    },
  ],
}

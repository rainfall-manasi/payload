import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'
import { InvestmentFAQ } from '../blocks/InvestmentFAQ'
import { InvestmentToken } from '../blocks/InvestmentToken'
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

export const Investments: CollectionConfig = {
  slug: 'investments',
  access: {
  read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  admin: {
    defaultColumns: ['title', 'updatedAt'],
    useAsTitle: 'title',
    group: 'Site Management',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'description',
              type: 'richText',
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,

                    // 📝 Text Formatting Features
                    HeadingFeature({
                      enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
                    }),

                    // 📋 List Features
                    UnorderedListFeature(), // • Bullet points
                    OrderedListFeature(), // 1. Numbered lists
                    ChecklistFeature(), // ☐ Todo/checklist items

                    // 📐 Alignment Features
                    AlignFeature(),

                    // 🎨 Text Styling Features
                    BoldFeature(),
                    ItalicFeature(),
                    UnderlineFeature(),
                    StrikethroughFeature(),
                    SubscriptFeature(),
                    SuperscriptFeature(),

                    // 🔗 Link Features
                  LinkFeature({
                            enabledCollections: ['posts'] as any,
                          }),

                    // 🧩 Custom Blocks

                    // 🔧 Editor UI Features
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                    HorizontalRuleFeature(),

                    // 📏 Layout Features
                    IndentFeature(), // Text indentation

                    // 🎨 Advanced Formatting

                    // 📋 Content Management Features
                    ParagraphFeature(),
                  ]
                },
              }),
            },
            {
              name: 'videoLink',
              type: 'text',
              admin: {
                description: 'Video URL for investment presentation',
              },
            },
            {
              name: 'docsendLink',
              type: 'text',
              admin: {
                description: 'DocSend link for investment documents',
              },
            },
          ],
        },
        {
          label: 'Token Information',
          fields: [
            {
              name: 'tokenSection',
              type: 'group',
              fields: InvestmentToken.fields,
            },
          ],
        },
        {
          label: 'FAQ & Overview',
          fields: [
            {
              name: 'faq',
              type: 'array',
              fields: InvestmentFAQ.fields,
            },
            {
              name: 'overviewPoints',
              type: 'array',
              fields: InvestmentToken.fields, // Reusing token structure for overview points
            },
          ],
        },
      ],
    },
  ],
  versions: {
    drafts: true,
    maxPerDoc: 10,
  },
}

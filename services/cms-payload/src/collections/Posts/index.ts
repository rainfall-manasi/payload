// src/collections/Posts.ts - Fixed version with explicit content field visibility

import type { CollectionConfig } from 'payload'

import { populateAuthors } from './hooks/populateAuthors'
import { revalidateDelete, revalidatePost } from './hooks/revalidatePost'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { slugField } from '@/fields/slug'
import {
  lexicalEditor,
  HeadingFeature,
  UnorderedListFeature,
  OrderedListFeature,
  ChecklistFeature,
  AlignFeature,
  BoldFeature,
  ItalicFeature,
  UnderlineFeature,
  StrikethroughFeature,
  SubscriptFeature,
  SuperscriptFeature,
  LinkFeature,
  FixedToolbarFeature,
  InlineToolbarFeature,
  HorizontalRuleFeature,
  IndentFeature,
  ParagraphFeature,
  BlocksFeature,
} from '@payloadcms/richtext-lexical'
import { MediaBlock } from '@/blocks/MediaBlock/index'

export const Posts: CollectionConfig = {
  slug: 'posts',
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    categories: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],

    useAsTitle: 'name',
    group: 'Assets',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },

    {
      name: 'title',
      type: 'text',
      required: true,
    },

    ...slugField(),
    {
      name: 'relatedPosts',
      type: 'relationship',
      admin: {
        position: 'sidebar',
      },
      filterOptions: ({ id }) => {
        return {
          id: {
            not_in: [id],
          },
        }
      },
      hasMany: true,
      relationTo: 'posts' as any,
    },
    {
      name: 'relatedCategories',
      type: 'relationship',
      hasMany: false,
      relationTo: 'categories',
      admin: {
        // This ensures a simple dropdown with all categories
        description: 'Select a category related to this post.',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Featured image for the post',
              },
            },
            {
              name: 'body',
              type: 'richText',
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
                  ]
                },
              }),
              required: true,
            },
          ],
        },
      ],
    },

    {
      name: 'authors',
      type: 'relationship',
      admin: {
        position: 'sidebar',
      },
      hasMany: true,
      relationTo: 'users',
    },
    {
      name: 'populatedAuthors',
      type: 'array',
      access: {
        update: () => false,
      },
      admin: {
        disabled: true,
        readOnly: true,
      },
      fields: [
        {
          name: 'id',
          type: 'text',
        },
        {
          name: 'name',
          type: 'text',
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },

    {
      name: 'isPublish',
      type: 'checkbox',
      label: 'Is Published?',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Check this box to publish the post',
      },
    },

    {
      name: 'seo',
      type: 'group',
      admin: {
        position: 'sidebar', // or remove this to keep in main form
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          admin: {
            placeholder: 'Enter SEO title...',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          admin: {
            placeholder: 'Enter meta description...',
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidatePost],
    afterRead: [populateAuthors],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}

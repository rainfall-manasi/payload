import type { CollectionConfig } from 'payload'

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

/**
 * MEDIA CONFIG – DOCKER SAFE
 *
 * Docker volume mounted at:
 *   /app/public/media
 *
 * Files are served at:
 *   https://cms.rainfall.one/media/<filename>
 */

export const Media: CollectionConfig = {
  slug: 'media',

  admin: {
    group: 'Assets',
    defaultColumns: ['filename', 'mimeType', 'updatedAt'],
  },

  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },

  fields: [
    {
      name: 'alt',
      type: 'text',
    },
    {
      name: 'caption',
      type: 'text',
    },
    {
      name: 'poster',
      type: 'relationship',
      relationTo: 'media',
      admin: {
        description: 'Optional poster image to represent video files',
        condition: (data) =>
          typeof data?.mimeType === 'string' &&
          data.mimeType.startsWith('video'),
      },
    },
  ],

  upload: {
    /**
     * IMPORTANT:
     * This must resolve to /app/public/media INSIDE the container
     */
    staticDir: 'public/media',

    adminThumbnail: 'thumbnail',
    focalPoint: true,

    mimeTypes: [
      'image/*',
      'video/mp4',
      'video/webm',
      'video/ogg',
      'video/quicktime',
    ],

    imageSizes: [
      { name: 'thumbnail', width: 300 },
      { name: 'square', width: 500, height: 500 },
      { name: 'small', width: 600 },
      { name: 'medium', width: 900 },
      { name: 'large', width: 1400 },
      { name: 'xlarge', width: 1920 },
      { name: 'og', width: 1200, height: 630, crop: 'center' },
    ],
  },
}

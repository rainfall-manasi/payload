import type { Block } from 'payload'

export const LandingPageContents: Block = {
  slug: 'landingPageContents',
  fields: [
    {
      name: 'contentType',
      type: 'select',
      required: true,
      options: [
        { label: 'Text Block', value: 'text' },
        { label: 'Image Gallery', value: 'gallery' },
        { label: 'Video', value: 'video' },
        { label: 'Feature List', value: 'features' },
        { label: 'Testimonial', value: 'testimonial' },
      ],
    },
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'content',
      type: 'richText',
      admin: {
        condition: (data, siblingData) => ['text', 'features', 'testimonial'].includes(siblingData.contentType),
      },
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (data, siblingData) => ['gallery', 'video'].includes(siblingData.contentType),
      },
    },
    {
      name: 'mediaGallery',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'caption',
          type: 'text',
        },
      ],
      admin: {
        condition: (data, siblingData) => siblingData.contentType === 'gallery',
      },
    },
    {
      name: 'features',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'text',
        },
        {
          name: 'icon',
          type: 'text',
        },
      ],
      admin: {
        condition: (data, siblingData) => siblingData.contentType === 'features',
      },
    },
    {
      name: 'author',
      type: 'group',
      fields: [
        {
          name: 'name',
          type: 'text',
        },
        {
          name: 'position',
          type: 'text',
        },
        {
          name: 'avatar',
          type: 'upload',
          relationTo: 'media',
        },
      ],
      admin: {
        condition: (data, siblingData) => siblingData.contentType === 'testimonial',
      },
    },
  ],
}
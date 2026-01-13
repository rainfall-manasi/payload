import type { Block } from 'payload'

export const LandingPageSignUp: Block = {
  slug: 'landingPageSignUp',
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
      name: 'formType',
      type: 'select',
      required: true,
      options: [
        { label: 'Email Only', value: 'email' },
        { label: 'Full Registration', value: 'full' },
        { label: 'Beta Request', value: 'beta' },
        { label: 'Waitlist', value: 'waitlist' },
      ],
    },
    {
      name: 'fields',
      type: 'array',
      fields: [
        {
          name: 'fieldType',
          type: 'select',
          required: true,
          options: [
            { label: 'Text', value: 'text' },
            { label: 'Email', value: 'email' },
            { label: 'Phone', value: 'phone' },
            { label: 'Select', value: 'select' },
            { label: 'Checkbox', value: 'checkbox' },
          ],
        },
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'placeholder',
          type: 'text',
        },
        {
          name: 'required',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'options',
          type: 'array',
          fields: [
            {
              name: 'label',
              type: 'text',
            },
            {
              name: 'value',
              type: 'text',
            },
          ],
          admin: {
            condition: (data, siblingData) => siblingData.fieldType === 'select',
          },
        },
      ],
    },
    {
      name: 'submitButton',
      type: 'group',
      fields: [
        {
          name: 'text',
          type: 'text',
          defaultValue: 'Sign Up',
        },
        {
          name: 'style',
          type: 'select',
          options: [
            { label: 'Primary', value: 'primary' },
            { label: 'Secondary', value: 'secondary' },
          ],
          defaultValue: 'primary',
        },
      ],
    },
    {
      name: 'successMessage',
      type: 'richText',
    },
    {
      name: 'redirectUrl',
      type: 'text',
      admin: {
        description: 'URL to redirect to after successful form submission',
      },
    },
  ],
}

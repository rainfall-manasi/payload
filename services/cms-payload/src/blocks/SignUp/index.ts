import { Block } from "payload";

export const SignUp: Block = {
  slug: 'signup',
  labels: {
    singular: 'Sign Up Section',
    plural: 'Sign Up Sections',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Sign Up',
    },
    {
      name: 'titleStyling',
      type: 'group',
      fields: [
        {
          name: 'fontSize',
          type: 'select',
          options: [
            { label: 'Large', value: 'text-3xl' },
            { label: 'X-Large', value: 'text-4xl' },
          ],
          defaultValue: 'text-3xl',
        },
        {
          name: 'textAlign',
          type: 'select',
          options: [
            { label: 'Center', value: 'text-center' },
            { label: 'Left', value: 'text-left' },
          ],
          defaultValue: 'text-center',
        },
      ],
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'formFields',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'type',
          type: 'select',
          options: [
            { label: 'Text', value: 'text' },
            { label: 'Email', value: 'email' },
            { label: 'Phone', value: 'phone' },
            { label: 'Select', value: 'select' },
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
      name: 'submitButton',
      type: 'group',
      fields: [
        {
          name: 'text',
          type: 'text',
          defaultValue: 'Submit',
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
  ],
}
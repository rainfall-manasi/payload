import type { Block } from 'payload'

export const InvestmentToken: Block = {
  slug: 'investmentToken',
  fields: [
    {
      name: 'tokenName',
      type: 'text',
    },
    {
      name: 'tokenSymbol',
      type: 'text',
    },
    {
      name: 'totalSupply',
      type: 'number',
    },
    {
      name: 'price',
      type: 'number',
    },
    {
      name: 'currency',
      type: 'select',
      options: [
        { label: 'USD', value: 'USD' },
        { label: 'ETH', value: 'ETH' },
        { label: 'BTC', value: 'BTC' },
      ],
      defaultValue: 'USD',
    },
    {
      name: 'description',
      type: 'richText',
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
    },
  ],
}
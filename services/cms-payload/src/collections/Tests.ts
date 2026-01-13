// import type { CollectionConfig } from 'payload'
// import { authenticated } from '../access/authenticated'

// export const Tests: CollectionConfig = {
//   slug: 'tests',
//   access: {
//     create: authenticated,
//     delete: authenticated,
//     read: authenticated,
//     update: authenticated,
//   },
//   admin: {
//     defaultColumns: ['testStuff', 'bool', 'updatedAt'],
//     useAsTitle: 'testStuff',
//     hidden: process.env.NODE_ENV === 'production', // Hide in production
//   },
//   fields: [
//     {
//       name: 'testStuff',
//       type: 'text',
//       defaultValue: 'def',
//     },
//     {
//       name: 'bool',
//       type: 'checkbox',
//       defaultValue: true,
//       required: true,
//     },
//     {
//       name: 'testext',
//       type: 'text',
//       unique: true,
//     },
//     {
//       name: 'teststrapitest',
//       type: 'text',
//     },
//   ],
// }

import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  admin: {
    useAsTitle: 'email',
    group: 'General',
  },
  auth: true,

  fields: [
    // Email added by default
    // Add more fields as needed
  ],
}

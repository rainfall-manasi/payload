import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'

// 🧩 Collections
import { Users } from './collections/Users'
import { Posts } from './collections/Posts'
import { AppDashboards } from './collections/App-dashboard'
import { Categories } from './collections/Categories'
import { FAQContent } from './collections/faq-content'
import { LandingPages } from './collections/LandingPages'
import { Modules } from './collections/Modules'
import { PlatformContent } from './collections/platform-content'
import { Resources } from './collections/Resources'
import { StarAuras } from './collections/StarAuras'
import { Media } from './collections/Media'

// 🧠 Editor
import { defaultLexical } from './fields/defaultLexical'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  // ✅ Server configuration
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',
  cookiePrefix: 'payload',

  // ✅ Admin configuration
  admin: {
    user: Users.slug,
    components: {
      beforeDashboard: ['./components/StylesInjector'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },

  // ✅ CORS & CSRF setup
  cors: [
    process.env.PAYLOAD_PUBLIC_SERVER_URL || '',
    process.env.PAYLOAD_PUBLIC_APP_URL || '',
    'http://localhost:3000',
    'https://testcms.eng.rainfall.one',
    'https://staging.rainfall.one',
    'https://rainfall.one',
  ],
  csrf: [
    process.env.PAYLOAD_PUBLIC_SERVER_URL || '',
    process.env.PAYLOAD_PUBLIC_APP_URL || '',
    'http://localhost:3000',
    'https://testcms.eng.rainfall.one',
    'https://staging.rainfall.one',
    'https://rainfall.one',
  ],

  // ✅ Upload limits
  upload: {
    limits: {
      fileSize: 200 * 1024 * 1024, // 200 MB
    },
  },

  // ✅ Collections
  collections: [
    Users,
    Posts,
    Categories,
    LandingPages,
    Resources,
    AppDashboards,
    PlatformContent,
    FAQContent,
    Media,
    Modules,
  ],

  // ✅ Globals
  globals: [StarAuras],

  // ✅ Rich text editor
  editor: defaultLexical,

  // ✅ Secrets & DB
  secret: process.env.PAYLOAD_SECRET || '',
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),

  // ✅ TypeScript types
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  // ✅ Image processor
  sharp,

  // 🚫 IMPORTANT: NO plugins here
  // payloadCloudPlugin REMOVED to enable local media serving
})

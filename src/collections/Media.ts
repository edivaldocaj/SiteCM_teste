import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticDir: '../public/media',
    mimeTypes: ['image/*', 'application/pdf'],
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 300, position: 'centre' },
      { name: 'card', width: 768, height: 512, position: 'centre' },
      { name: 'hero', width: 1920, height: 1080, position: 'centre' },
    ],
  },
  admin: { useAsTitle: 'alt' },
  fields: [
    { name: 'alt', type: 'text', required: true, label: 'Texto Alternativo' },
  ],
}

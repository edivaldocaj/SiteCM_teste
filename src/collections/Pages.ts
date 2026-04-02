import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: { useAsTitle: 'title' },
  fields: [
    { name: 'title', type: 'text', required: true, label: 'Título' },
    { name: 'slug', type: 'text', required: true, unique: true, admin: { position: 'sidebar' } },
    { name: 'content', type: 'richText', label: 'Conteúdo' },
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      fields: [
        { name: 'metaTitle', type: 'text', label: 'Meta Title' },
        { name: 'metaDescription', type: 'textarea', label: 'Meta Description' },
        { name: 'ogImage', type: 'upload', relationTo: 'media', label: 'OG Image' },
      ],
    },
    { name: 'status', type: 'select', options: ['draft', 'published'], defaultValue: 'draft', admin: { position: 'sidebar' } },
  ],
}

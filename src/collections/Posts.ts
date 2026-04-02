import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'category', 'status', 'publishedAt'] },
  fields: [
    { name: 'title', type: 'text', required: true, label: 'Título' },
    { name: 'slug', type: 'text', required: true, unique: true, admin: { position: 'sidebar' } },
    { name: 'excerpt', type: 'textarea', required: true, label: 'Resumo', maxLength: 300 },
    { name: 'featuredImage', type: 'upload', relationTo: 'media', label: 'Imagem Destaque' },
    { name: 'content', type: 'richText', required: true, label: 'Conteúdo' },
    {
      name: 'category',
      type: 'select',
      required: true,
      label: 'Categoria',
      options: [
        { label: 'Direito Digital', value: 'direito-digital' },
        { label: 'Direito Civil', value: 'direito-civil' },
        { label: 'Direito do Consumidor', value: 'direito-consumidor' },
        { label: 'Direito Imobiliário', value: 'direito-imobiliario' },
        { label: 'Direito Tributário', value: 'direito-tributario' },
        { label: 'Licitações', value: 'licitacoes' },
        { label: 'Direito Penal', value: 'direito-penal' },
        { label: 'LGPD', value: 'lgpd' },
        { label: 'Geral', value: 'geral' },
      ],
    },
    {
      name: 'author',
      type: 'select',
      label: 'Autor',
      options: [
        { label: 'Dr. Edivaldo Cavalcante', value: 'edivaldo' },
        { label: 'Dra. Gabrielly Melo', value: 'gabrielly' },
        { label: 'Cavalcante & Melo', value: 'escritorio' },
      ],
    },
    { name: 'tags', type: 'text', hasMany: true, label: 'Tags' },
    { name: 'readTime', type: 'number', label: 'Tempo de Leitura (min)', admin: { position: 'sidebar' } },
    { name: 'publishedAt', type: 'date', label: 'Data de Publicação', admin: { position: 'sidebar' } },
    { name: 'status', type: 'select', options: ['draft', 'published'], defaultValue: 'draft', admin: { position: 'sidebar' } },
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      fields: [
        { name: 'metaTitle', type: 'text' },
        { name: 'metaDescription', type: 'textarea' },
      ],
    },
  ],
}

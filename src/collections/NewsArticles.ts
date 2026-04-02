import type { CollectionConfig } from 'payload'

export const NewsArticles: CollectionConfig = {
  slug: 'news-articles',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'source', 'category', 'publishedAt', 'status'],
    description: 'Notícias jurídicas — alimentadas automaticamente via API e curadas manualmente.',
  },
  fields: [
    { name: 'title', type: 'text', required: true, label: 'Título' },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'excerpt', type: 'textarea', required: true, label: 'Resumo', maxLength: 400 },
    { name: 'content', type: 'richText', label: 'Conteúdo / Comentário do Escritório' },
    { name: 'sourceUrl', type: 'text', label: 'URL da Fonte Original' },
    { name: 'source', type: 'text', label: 'Nome da Fonte (ex: Conjur, STJ)' },
    { name: 'imageUrl', type: 'text', label: 'URL da Imagem' },
    {
      name: 'category',
      type: 'select',
      label: 'Categoria',
      options: [
        { label: 'Direito Digital', value: 'direito-digital' },
        { label: 'Direito Civil', value: 'direito-civil' },
        { label: 'Direito do Consumidor', value: 'direito-consumidor' },
        { label: 'Direito Imobiliário', value: 'direito-imobiliario' },
        { label: 'Direito Tributário', value: 'direito-tributario' },
        { label: 'Direito Penal', value: 'direito-penal' },
        { label: 'LGPD', value: 'lgpd' },
        { label: 'Legislação', value: 'legislacao' },
        { label: 'STF / STJ', value: 'tribunais' },
        { label: 'Geral', value: 'geral' },
      ],
    },
    {
      name: 'status',
      type: 'select',
      label: 'Status',
      options: [
        { label: 'Pendente (auto)', value: 'pending' },
        { label: 'Publicada', value: 'published' },
        { label: 'Rejeitada', value: 'rejected' },
      ],
      defaultValue: 'pending',
      admin: { position: 'sidebar' },
    },
    { name: 'autoImported', type: 'checkbox', label: 'Importada Automaticamente', defaultValue: true, admin: { position: 'sidebar' } },
    { name: 'publishedAt', type: 'date', label: 'Data de Publicação', admin: { position: 'sidebar' } },
    { name: 'linkedCampaign', type: 'relationship', relationTo: 'campaigns', label: 'Campanha Vinculada', admin: { position: 'sidebar' } },
  ],
}

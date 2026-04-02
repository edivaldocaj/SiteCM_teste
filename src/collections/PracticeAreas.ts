import type { CollectionConfig } from 'payload'

export const PracticeAreas: CollectionConfig = {
  slug: 'practice-areas',
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'slug', 'order'] },
  fields: [
    { name: 'title', type: 'text', required: true, label: 'Nome da Área' },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'shortDescription', type: 'textarea', required: true, label: 'Descrição Curta', maxLength: 200 },
    { name: 'icon', type: 'text', required: true, label: 'Ícone (Lucide icon name)' },
    { name: 'heroHeadline', type: 'text', label: 'Headline da Página' },
    { name: 'content', type: 'richText', label: 'Conteúdo Completo' },
    {
      name: 'caseTypes',
      type: 'array',
      label: 'Tipos de Casos Atendidos',
      fields: [
        { name: 'name', type: 'text', required: true },
      ],
    },
    {
      name: 'faq',
      type: 'array',
      label: 'Perguntas Frequentes',
      fields: [
        { name: 'question', type: 'text', required: true },
        { name: 'answer', type: 'textarea', required: true },
      ],
    },
    {
      name: 'attorney',
      type: 'select',
      label: 'Advogado Responsável',
      options: [
        { label: 'Dr. Edivaldo Cavalcante', value: 'edivaldo' },
        { label: 'Dra. Gabrielly Melo', value: 'gabrielly' },
        { label: 'Ambos', value: 'both' },
      ],
    },
    { name: 'is24h', type: 'checkbox', label: 'Atendimento 24h', defaultValue: false },
    { name: 'order', type: 'number', label: 'Ordem de Exibição', admin: { position: 'sidebar' } },
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      fields: [
        { name: 'metaTitle', type: 'text' },
        { name: 'metaDescription', type: 'textarea' },
        { name: 'keywords', type: 'text', hasMany: true },
      ],
    },
  ],
}

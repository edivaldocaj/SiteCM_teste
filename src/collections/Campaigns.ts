import type { CollectionConfig } from 'payload'

export const Campaigns: CollectionConfig = {
  slug: 'campaigns',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'status', 'featuredOnHomepage'],
    description: 'Campanhas jurídicas — cada campanha gera uma landing page independente.',
  },
  fields: [
    { name: 'title', type: 'text', required: true, label: 'Título da Campanha' },
    { name: 'slug', type: 'text', required: true, unique: true, admin: { position: 'sidebar' } },
    {
      name: 'category',
      type: 'select',
      required: true,
      label: 'Categoria',
      options: [
        { label: 'Consumidor / Cível', value: 'consumidor' },
        { label: 'Digital / LGPD', value: 'digital' },
        { label: 'Criminal', value: 'criminal' },
        { label: 'Imobiliário', value: 'imobiliario' },
        { label: 'Tributário', value: 'tributario' },
      ],
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      label: 'Status',
      options: [
        { label: 'Rascunho', value: 'draft' },
        { label: 'Ativa', value: 'active' },
        { label: 'Pausada', value: 'paused' },
        { label: 'Encerrada', value: 'ended' },
      ],
      defaultValue: 'draft',
      admin: { position: 'sidebar' },
    },
    { name: 'heroImage', type: 'upload', relationTo: 'media', label: 'Imagem Hero' },
    { name: 'subtitle', type: 'text', label: 'Subtítulo / Headline' },
    { name: 'problemDescription', type: 'richText', required: true, label: 'Descrição do Problema' },
    { name: 'rightsExplanation', type: 'richText', required: true, label: 'Explicação dos Direitos' },
    { name: 'benefits', type: 'richText', label: 'Benefícios da Atuação Jurídica' },
    {
      name: 'socialProof',
      type: 'array',
      label: 'Prova Social',
      fields: [
        { name: 'text', type: 'textarea', required: true, label: 'Depoimento' },
        { name: 'author', type: 'text', label: 'Nome (pode ser iniciais)' },
        { name: 'caseType', type: 'text', label: 'Tipo de Caso' },
      ],
    },
    {
      name: 'faq',
      type: 'array',
      label: 'Perguntas Frequentes',
      fields: [
        { name: 'question', type: 'text', required: true, label: 'Pergunta' },
        { name: 'answer', type: 'textarea', required: true, label: 'Resposta' },
      ],
    },
    { name: 'whatsappMessage', type: 'text', label: 'Mensagem WhatsApp (pré-preenchida)' },
    { name: 'showForm', type: 'checkbox', label: 'Exibir Formulário de Captação', defaultValue: true },
    { name: 'urgencyText', type: 'text', label: 'Texto de Urgência (barra topo)' },
    { name: 'featuredOnHomepage', type: 'checkbox', label: 'Destaque na Homepage', admin: { position: 'sidebar' } },
    { name: 'startDate', type: 'date', label: 'Início', admin: { position: 'sidebar' } },
    { name: 'endDate', type: 'date', label: 'Término (opcional)', admin: { position: 'sidebar' } },
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      fields: [
        { name: 'metaTitle', type: 'text', label: 'Meta Title' },
        { name: 'metaDescription', type: 'textarea', label: 'Meta Description' },
      ],
    },
  ],
}

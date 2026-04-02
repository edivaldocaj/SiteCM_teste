import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: { useAsTitle: 'authorName', defaultColumns: ['authorName', 'caseType', 'rating', 'featured'] },
  fields: [
    { name: 'authorName', type: 'text', required: true, label: 'Nome do Cliente' },
    { name: 'text', type: 'textarea', required: true, label: 'Depoimento' },
    { name: 'caseType', type: 'text', label: 'Tipo de Caso' },
    { name: 'rating', type: 'number', min: 1, max: 5, defaultValue: 5, label: 'Avaliação (1-5)' },
    { name: 'featured', type: 'checkbox', label: 'Destaque na Homepage', defaultValue: false },
  ],
}

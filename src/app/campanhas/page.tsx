import type { Metadata } from 'next'
import Link from 'next/link'
import { AlertTriangle } from 'lucide-react'
import { getPayloadClient } from '@/lib/payload'

export const revalidate = 1800

export const metadata: Metadata = {
  title: 'Campanhas Jurídicas',
  description: 'Campanhas jurídicas ativas da Cavalcante & Melo. Verifique se seu caso se encaixa.',
}

const categoryLabels: Record<string, string> = { consumidor: 'Consumidor', digital: 'Digital / LGPD', criminal: 'Criminal', imobiliario: 'Imobiliário', tributario: 'Tributário' }

const fallbackCampaigns = [
  { slug: 'fraudes-bancarias', title: 'Fraudes Bancárias', category: 'consumidor', subtitle: 'Cobranças abusivas? Você pode ter direito a restituição.' },
  { slug: 'negativacao-indevida', title: 'Negativação Indevida', category: 'consumidor', subtitle: 'Nome sujo sem razão? Exija seus direitos.' },
  { slug: 'vazamento-de-dados', title: 'Vazamento de Dados', category: 'digital', subtitle: 'Seus dados foram expostos? Você tem direito a indenização.' },
  { slug: 'golpes-online', title: 'Golpes Online', category: 'digital', subtitle: 'Caiu em um golpe digital? Saiba como recuperar.' },
  { slug: 'defesa-criminal', title: 'Defesa Criminal Urgente', category: 'criminal', subtitle: 'Atendimento imediato 24 horas.' },
]

export default async function CampanhasPage() {
  let campaigns: any[] = []

  try {
    const payload = await getPayloadClient()
    if (!payload) return null as any
    const result = await payload.find({
      collection: 'campaigns',
      where: { status: { equals: 'active' } },
      sort: '-createdAt',
      limit: 20,
    })
    campaigns = result.docs
  } catch {}

  const items = campaigns.length > 0 ? campaigns : fallbackCampaigns

  return (
    <>
      <section className="gradient-navy pt-32 pb-20">
        <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-brand-gold-dark text-xs font-body uppercase tracking-[0.25em] mb-4 block">Ações em Andamento</span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-brand-champagne leading-tight mb-6">Campanhas Jurídicas</h1>
          <p className="text-brand-silver/70 font-body text-lg max-w-2xl leading-relaxed">Verifique se o seu caso se encaixa e entre em contato.</p>
        </div>
      </section>
      <section className="section-padding bg-brand-cream">
        <div className="container-wide mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((c: any) => (
              <Link key={c.slug} href={`/campanhas/${c.slug}`} className="block bg-white rounded-lg p-8 border border-brand-gold/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group h-full">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[11px] font-body uppercase tracking-wider text-brand-gold-dark bg-brand-gold/10 px-3 py-1 rounded-sm">{categoryLabels[c.category] || c.category}</span>
                  <AlertTriangle className="w-8 h-8 text-brand-navy/20 group-hover:text-brand-gold-dark transition-colors" />
                </div>
                <h2 className="font-display text-xl font-semibold text-brand-navy mb-3 group-hover:text-brand-gold-dark transition-colors">{c.title}</h2>
                <p className="text-brand-navy/50 font-body text-sm leading-relaxed mb-6">{c.subtitle || ''}</p>
                <span className="text-brand-gold-dark font-body font-semibold text-xs uppercase tracking-wider">Verificar meu caso →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

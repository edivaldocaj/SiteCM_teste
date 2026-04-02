'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, AlertTriangle, Shield, Smartphone } from 'lucide-react'

const fallbackCampaigns = [
  { slug: 'fraudes-bancarias', title: 'Fraudes Bancárias', categoryLabel: 'Consumidor', subtitle: 'Cobranças abusivas? Você pode ter direito a restituição.', icon: AlertTriangle },
  { slug: 'vazamento-de-dados', title: 'Vazamento de Dados', categoryLabel: 'LGPD / Digital', subtitle: 'Seus dados foram expostos? Você tem direito a indenização.', icon: Shield },
  { slug: 'golpes-online', title: 'Golpes Online', categoryLabel: 'Digital', subtitle: 'Caiu em um golpe digital? Saiba como recuperar seu dinheiro.', icon: Smartphone },
]

const categoryLabels: Record<string, string> = {
  consumidor: 'Consumidor', digital: 'Digital / LGPD', criminal: 'Criminal',
  imobiliario: 'Imobiliário', tributario: 'Tributário',
}

export function FeaturedCampaigns({ cmsCampaigns = [] }: { cmsCampaigns?: any[] }) {
  const hasCms = cmsCampaigns.length > 0
  const items = hasCms
    ? cmsCampaigns.map((c: any) => ({
        slug: c.slug, title: c.title,
        categoryLabel: categoryLabels[c.category] || c.category,
        subtitle: c.subtitle || '',
        icon: AlertTriangle,
      }))
    : fallbackCampaigns

  return (
    <section className="section-padding bg-brand-cream">
      <div className="container-wide mx-auto">
        <div className="text-center mb-16">
          <span className="text-brand-gold-dark text-xs font-body uppercase tracking-[0.25em] mb-4 block">Ações em Andamento</span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-brand-navy mb-6">Campanhas Jurídicas</h2>
          <p className="text-brand-navy/60 font-body text-lg max-w-2xl mx-auto">Ações coletivas e individuais em andamento. Verifique se o seu caso se encaixa.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((campaign, i) => (
            <motion.div key={campaign.slug} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
              <Link href={`/campanhas/${campaign.slug}`} className="block bg-white rounded-lg p-8 border border-brand-gold/10 card-hover group h-full">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[11px] font-body uppercase tracking-wider text-brand-gold-dark bg-brand-gold/10 px-3 py-1 rounded-sm">{campaign.categoryLabel}</span>
                  <campaign.icon className="w-8 h-8 text-brand-navy/20 group-hover:text-brand-gold-dark transition-colors" />
                </div>
                <h3 className="font-display text-xl font-semibold text-brand-navy mb-3 group-hover:text-brand-gold-dark transition-colors">{campaign.title}</h3>
                <p className="text-brand-navy/50 font-body text-sm leading-relaxed mb-6">{campaign.subtitle}</p>
                <span className="text-brand-gold-dark font-body font-semibold text-xs uppercase tracking-wider inline-flex items-center gap-2 group-hover:gap-3 transition-all">Verificar meu caso <ArrowRight className="w-4 h-4" /></span>
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-12"><Link href="/campanhas" className="btn-primary">Ver Todas as Campanhas</Link></div>
      </div>
    </section>
  )
}

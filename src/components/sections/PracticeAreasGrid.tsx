'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Shield, Scale, ShoppingBag, Home, Receipt,
  FileText, Gavel, AlertTriangle
} from 'lucide-react'

const areas = [
  { icon: Shield, title: 'Direito Digital e LGPD', slug: 'direito-digital-lgpd', description: 'Proteção de dados, crimes cibernéticos, compliance digital e adequação à LGPD.' },
  { icon: Scale, title: 'Direito Civil', slug: 'direito-civil', description: 'Contratos, responsabilidade civil, família, sucessões e ações indenizatórias.' },
  { icon: ShoppingBag, title: 'Direito do Consumidor', slug: 'direito-consumidor', description: 'Fraudes bancárias, negativação indevida, revisão de juros e planos de saúde.' },
  { icon: Home, title: 'Direito Imobiliário', slug: 'direito-imobiliario', description: 'Compra e venda, contratos imobiliários, usucapião e regularização.' },
  { icon: Receipt, title: 'Direito Tributário', slug: 'direito-tributario', description: 'Planejamento fiscal, defesa em execuções fiscais e recuperação de tributos.' },
  { icon: FileText, title: 'Licitações e Contratos', slug: 'licitacoes-contratos', description: 'Assessoria em licitações, impugnações, contratos administrativos.' },
  { icon: Gavel, title: 'Direito Penal', slug: 'direito-penal', description: 'Defesa criminal, habeas corpus, audiência de custódia. Atendimento 24h.', is24h: true },
]

export function PracticeAreasGrid() {
  return (
    <section className="section-padding bg-brand-cream">
      <div className="container-wide mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-brand-gold-dark text-xs font-body uppercase tracking-[0.25em] mb-4 block">
            Especialidades
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-brand-navy mb-6">
            Áreas de Atuação
          </h2>
          <p className="text-brand-navy/60 font-body text-lg max-w-2xl mx-auto">
            Atuação estratégica em diversas áreas do Direito, sempre com foco na defesa dos seus interesses.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {areas.map((area, i) => (
            <motion.div
              key={area.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Link
                href={`/areas-de-atuacao/${area.slug}`}
                className={`block p-8 rounded-lg card-hover group relative overflow-hidden ${
                  area.is24h
                    ? 'bg-brand-navy text-brand-silver-light border border-brand-gold-dark/20'
                    : 'bg-white border border-brand-gold/10 hover:border-brand-gold-dark/30'
                }`}
              >
                {area.is24h && (
                  <span className="absolute top-4 right-4 bg-brand-urgency text-white text-[10px] font-body font-bold uppercase tracking-wider px-3 py-1 rounded-sm">
                    24h
                  </span>
                )}

                <area.icon className={`w-10 h-10 mb-6 transition-colors duration-300 ${
                  area.is24h
                    ? 'text-brand-gold-dark'
                    : 'text-brand-navy/30 group-hover:text-brand-gold-dark'
                }`} />

                <h3 className={`font-display text-lg font-semibold mb-3 ${
                  area.is24h ? 'text-brand-champagne' : 'text-brand-navy'
                }`}>
                  {area.title}
                </h3>

                <p className={`font-body text-sm leading-relaxed ${
                  area.is24h ? 'text-brand-silver/70' : 'text-brand-navy/50'
                }`}>
                  {area.description}
                </p>

                <div className={`mt-6 text-xs font-body uppercase tracking-wider font-semibold transition-colors ${
                  area.is24h
                    ? 'text-brand-gold-dark'
                    : 'text-brand-navy/30 group-hover:text-brand-gold-dark'
                }`}>
                  Saiba mais →
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

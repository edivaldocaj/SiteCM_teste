'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const partners = [
  {
    name: 'Dr. Edivaldo Cavalcante',
    fullName: 'Edivaldo Cavalcante de Albuquerque Junior',
    role: 'Sócio-Administrador',
    areas: ['Direito Digital', 'LGPD', 'Direito Civil', 'Licitações e Contratos', 'Direito Penal'],
    initials: 'EC',
  },
  {
    name: 'Dra. Gabrielly Melo',
    fullName: 'Neura Gabrielly Evangelista de Melo Freitas',
    role: 'Sócia-Administradora',
    areas: ['Direito Tributário', 'Direito Imobiliário', 'Direito Civil'],
    initials: 'GM',
  },
]

export function AboutPartners() {
  return (
    <section className="section-padding bg-white">
      <div className="container-wide mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-brand-gold-dark text-xs font-body uppercase tracking-[0.25em] mb-4 block">
            Quem Somos
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-brand-navy mb-6">
            Sócios Fundadores
          </h2>
          <p className="text-brand-navy/60 font-body text-lg max-w-2xl mx-auto">
            Profissionais comprometidos com a excelência, ética e resultados para nossos clientes.
          </p>
        </div>

        {/* Partners */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto">
          {partners.map((partner, i) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="bg-brand-cream rounded-lg p-8 border border-brand-gold/10 card-hover"
            >
              {/* Avatar placeholder */}
              <div className="w-24 h-24 rounded-full gradient-navy flex items-center justify-center mb-6 mx-auto">
                <span className="text-silver-gradient font-display text-2xl font-bold">
                  {partner.initials}
                </span>
              </div>

              <div className="text-center">
                <h3 className="font-display text-xl font-semibold text-brand-navy mb-1">
                  {partner.name}
                </h3>
                <p className="text-brand-gold-dark text-sm font-body font-medium mb-4">
                  {partner.role}
                </p>
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {partner.areas.map((area) => (
                    <span
                      key={area}
                      className="text-[11px] font-body uppercase tracking-wider text-brand-navy/50 bg-white px-3 py-1 rounded-sm border border-brand-gold/10"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/sobre" className="inline-flex items-center gap-2 text-brand-gold-dark font-body font-semibold text-sm uppercase tracking-wider hover:gap-3 transition-all">
            Conheça nossa história <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

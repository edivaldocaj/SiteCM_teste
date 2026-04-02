'use client'

import { Phone, Calendar } from 'lucide-react'
import { motion } from 'framer-motion'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center gradient-navy overflow-hidden">
      {/* Subtle geometric pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30z' fill='none' stroke='%23ffffff' stroke-width='0.5'/%3E%3C/svg%3E")`,
        backgroundSize: '60px 60px',
      }} />

      {/* Gradient accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-gold-dark/5 to-transparent" />

      <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-28 pb-20">
        <div className="max-w-3xl">
          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <span className="inline-block px-4 py-2 border border-brand-gold-dark/30 text-brand-gold-dark text-xs font-body uppercase tracking-[0.25em] rounded-sm">
              Advocacia Estratégica em Natal/RN
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold leading-[1.1] mb-8"
          >
            <span className="text-silver-gradient">Seu direito,</span>
            <br />
            <span className="text-brand-champagne">nossa missão.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-brand-silver/70 font-body text-lg sm:text-xl leading-relaxed mb-12 max-w-xl"
          >
            Assessoria jurídica completa com atendimento humanizado. 
            Direito Digital, Civil, Consumidor, Tributário, Imobiliário e{' '}
            <span className="text-brand-gold-dark font-medium">Defesa Criminal 24h</span>.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5584999999999'}?text=${encodeURIComponent(process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE || 'Olá! Gostaria de falar com um advogado.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp text-base"
            >
              <Phone className="w-5 h-5" />
              Fale com um Advogado
            </a>
            <a href="/contato" className="btn-outline text-base">
              <Calendar className="w-5 h-5" />
              Agendar Consulta
            </a>
          </motion.div>
        </div>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand-gold-dark/30 to-transparent origin-left"
        />
      </div>
    </section>
  )
}

'use client'

import { Phone, Shield, Clock, Heart } from 'lucide-react'
import { motion } from 'framer-motion'

export function CriminalUrgency() {
  return (
    <section className="relative overflow-hidden">
      {/* Dark background with subtle accent */}
      <div className="absolute inset-0 bg-brand-navy-dark" />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-urgency/10 via-transparent to-brand-urgency/5" />
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-urgency via-brand-gold-dark to-brand-urgency" />

      <div className="container-wide mx-auto section-padding relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — Message */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-6 h-6 text-brand-gold-dark" />
              <span className="text-brand-gold-dark text-xs font-body uppercase tracking-[0.25em]">
                Defesa Criminal — Atendimento Imediato
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-brand-champagne leading-tight mb-8">
              Você não está sozinho.
              <br />
              <span className="text-brand-gold-dark">Nós sabemos o que fazer.</span>
            </h2>

            <p className="text-brand-silver/60 font-body text-lg leading-relaxed mb-8">
              Se você ou alguém que você ama está sendo investigado, 
              foi preso ou precisa de defesa criminal urgente, nossa equipe 
              está pronta para agir imediatamente. Cada minuto conta.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5584999999999'}?text=${encodeURIComponent('Preciso de ajuda urgente com um caso criminal.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp text-base"
              >
                <Phone className="w-5 h-5" />
                Ajuda Urgente — WhatsApp
              </a>
              <a
                href="tel:+5584999999999"
                className="btn-outline !border-brand-gold-dark/40 !text-brand-gold-dark hover:!bg-brand-gold-dark/10"
              >
                <Phone className="w-5 h-5" />
                Ligar Agora
              </a>
            </div>
          </motion.div>

          {/* Right — Features */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6"
          >
            {[
              { icon: Clock, title: 'Atendimento 24 horas', text: 'Plantão permanente para situações de urgência. Noites, fins de semana e feriados.' },
              { icon: Shield, title: 'Habeas Corpus Imediato', text: 'Atuação célere para garantir sua liberdade nos casos de prisão ilegal ou abusiva.' },
              { icon: Heart, title: 'Acolhimento e Sigilo', text: 'Sabemos que este é um momento difícil. Tratamos cada caso com empatia, discrição e respeito absoluto.' },
            ].map((item) => (
              <div
                key={item.title}
                className="glass-card p-6 flex gap-5 hover:border-brand-gold-dark/20 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-brand-gold-dark/10 flex items-center justify-center shrink-0">
                  <item.icon className="w-6 h-6 text-brand-gold-dark" />
                </div>
                <div>
                  <h3 className="font-display text-brand-champagne font-semibold text-lg mb-2">
                    {item.title}
                  </h3>
                  <p className="text-brand-silver/50 font-body text-sm leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

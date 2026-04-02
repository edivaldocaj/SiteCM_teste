'use client'

import { useState } from 'react'
import { Phone, Send, MapPin, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'

export function ContactCTA() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const form = e.currentTarget
    const data = new FormData(form)

    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          phone: data.get('phone'),
          subject: data.get('subject'),
          message: data.get('message'),
        }),
      })
      setSubmitted(true)
    } catch {
      alert('Erro ao enviar. Tente pelo WhatsApp.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="relative gradient-navy overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand-gold-dark/30 to-transparent" />

      <div className="container-wide mx-auto section-padding">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left — CTA */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-brand-gold-dark text-xs font-body uppercase tracking-[0.25em] mb-4 block">
              Entre em Contato
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-brand-champagne leading-tight mb-8">
              Conte-nos o seu caso.
              <br />
              <span className="text-brand-gold-dark">Podemos ajudar.</span>
            </h2>

            <p className="text-brand-silver/60 font-body text-lg leading-relaxed mb-10">
              Preencha o formulário ou fale diretamente pelo WhatsApp. 
              Respondemos em até 2 horas durante o horário comercial.
            </p>

            <div className="space-y-4 mb-10">
              <div className="flex items-center gap-4 text-brand-silver/60">
                <MapPin className="w-5 h-5 text-brand-gold-dark shrink-0" />
                <span className="font-body text-sm">Rua Francisco Maia Sobrinho, 1950 — Lagoa Nova, Natal/RN</span>
              </div>
            </div>

            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5584999999999'}?text=${encodeURIComponent('Olá! Gostaria de agendar uma consulta.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp text-base"
            >
              <Phone className="w-5 h-5" />
              Falar pelo WhatsApp
            </a>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {submitted ? (
              <div className="glass-card p-12 text-center">
                <CheckCircle className="w-16 h-16 text-[#25D366] mx-auto mb-6" />
                <h3 className="font-display text-2xl text-brand-champagne font-semibold mb-4">
                  Mensagem Enviada!
                </h3>
                <p className="text-brand-silver/60 font-body">
                  Recebemos sua mensagem e retornaremos em breve. Obrigado pela confiança.
                </p>
              </div>
            ) : (
              <div className="glass-card p-8 sm:p-10">
                <h3 className="font-display text-xl text-brand-champagne font-semibold mb-8">
                  Envie sua mensagem
                </h3>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-brand-silver/60 text-xs font-body uppercase tracking-wider mb-2">
                      Nome completo
                    </label>
                    <input
                      name="name"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-brand-silver-light font-body text-sm placeholder:text-brand-silver/30 focus:outline-none focus:border-brand-gold-dark/50 transition-colors"
                      placeholder="Seu nome"
                    />
                  </div>

                  <div>
                    <label className="block text-brand-silver/60 text-xs font-body uppercase tracking-wider mb-2">
                      Telefone / WhatsApp
                    </label>
                    <input
                      name="phone"
                      type="tel"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-brand-silver-light font-body text-sm placeholder:text-brand-silver/30 focus:outline-none focus:border-brand-gold-dark/50 transition-colors"
                      placeholder="(84) 99999-9999"
                    />
                  </div>

                  <div>
                    <label className="block text-brand-silver/60 text-xs font-body uppercase tracking-wider mb-2">
                      Assunto
                    </label>
                    <select
                      name="subject"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-brand-silver-light font-body text-sm focus:outline-none focus:border-brand-gold-dark/50 transition-colors"
                    >
                      <option value="">Selecione o tipo de problema</option>
                      <option value="consumidor">Direito do Consumidor</option>
                      <option value="digital">Direito Digital / LGPD</option>
                      <option value="civil">Direito Civil</option>
                      <option value="imobiliario">Direito Imobiliário</option>
                      <option value="tributario">Direito Tributário</option>
                      <option value="licitacoes">Licitações</option>
                      <option value="penal">Direito Penal (Urgente)</option>
                      <option value="outro">Outro Assunto</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-brand-silver/60 text-xs font-body uppercase tracking-wider mb-2">
                      Mensagem
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-brand-silver-light font-body text-sm placeholder:text-brand-silver/30 focus:outline-none focus:border-brand-gold-dark/50 transition-colors resize-none"
                      placeholder="Descreva brevemente seu caso..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                    {loading ? 'Enviando...' : 'Enviar Mensagem'}
                  </button>

                  <p className="text-brand-silver/30 text-xs font-body text-center">
                    Suas informações são protegidas conforme a LGPD.
                  </p>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

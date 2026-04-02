'use client'

import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react'

export default function ContatoPage() {
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
        body: JSON.stringify({ name: data.get('name'), phone: data.get('phone'), subject: data.get('subject'), message: data.get('message') }),
      })
      setSubmitted(true)
    } catch { alert('Erro ao enviar. Tente pelo WhatsApp.') }
    finally { setLoading(false) }
  }

  return (
    <>
      <section className="gradient-navy pt-32 pb-20">
        <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-brand-gold-dark text-xs font-body uppercase tracking-[0.25em] mb-4 block">Fale Conosco</span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-brand-champagne leading-tight mb-6">Contato</h1>
          <p className="text-brand-silver/70 font-body text-lg max-w-2xl leading-relaxed">
            Entre em contato pelo formulário, WhatsApp ou visite nosso escritório.
          </p>
        </div>
      </section>

      <section className="section-padding bg-brand-cream">
        <div className="container-wide mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Info */}
            <div>
              <h2 className="font-display text-2xl font-semibold text-brand-navy mb-8">Informações</h2>
              <div className="space-y-6 mb-10">
                <div className="flex gap-4"><MapPin className="w-6 h-6 text-brand-gold-dark shrink-0 mt-1" /><div><p className="font-body font-semibold text-brand-navy">Endereço</p><p className="text-brand-navy/60 font-body text-sm">Rua Francisco Maia Sobrinho, 1950<br/>Lagoa Nova — Natal/RN</p></div></div>
                <div className="flex gap-4"><Phone className="w-6 h-6 text-brand-gold-dark shrink-0" /><div><p className="font-body font-semibold text-brand-navy">Telefone / WhatsApp</p><p className="text-brand-navy/60 font-body text-sm">(84) 99999-9999</p></div></div>
                <div className="flex gap-4"><Mail className="w-6 h-6 text-brand-gold-dark shrink-0" /><div><p className="font-body font-semibold text-brand-navy">E-mail</p><p className="text-brand-navy/60 font-body text-sm">contato@cavalcantemelo.adv.br</p></div></div>
                <div className="flex gap-4"><Clock className="w-6 h-6 text-brand-gold-dark shrink-0" /><div><p className="font-body font-semibold text-brand-navy">Horário</p><p className="text-brand-navy/60 font-body text-sm">Seg a Sex: 8h às 18h<br/>Penal: Atendimento 24h</p></div></div>
              </div>
              <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5584999999999'}`} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
                <Phone className="w-5 h-5" /> Falar pelo WhatsApp
              </a>
            </div>

            {/* Form */}
            <div>
              {submitted ? (
                <div className="bg-white rounded-lg p-12 border border-brand-gold/10 text-center">
                  <CheckCircle className="w-16 h-16 text-[#25D366] mx-auto mb-6" />
                  <h3 className="font-display text-2xl text-brand-navy font-semibold mb-4">Mensagem Enviada!</h3>
                  <p className="text-brand-navy/60 font-body">Retornaremos em breve. Obrigado pela confiança.</p>
                </div>
              ) : (
                <div className="bg-white rounded-lg p-8 border border-brand-gold/10">
                  <h2 className="font-display text-2xl font-semibold text-brand-navy mb-8">Envie sua mensagem</h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-brand-navy/70 text-xs font-body uppercase tracking-wider mb-2">Nome completo</label>
                      <input name="name" required className="w-full border border-brand-gold/20 rounded-sm px-4 py-3 font-body text-sm focus:outline-none focus:border-brand-gold-dark transition-colors bg-brand-cream/50" placeholder="Seu nome" />
                    </div>
                    <div>
                      <label className="block text-brand-navy/70 text-xs font-body uppercase tracking-wider mb-2">Telefone / WhatsApp</label>
                      <input name="phone" type="tel" required className="w-full border border-brand-gold/20 rounded-sm px-4 py-3 font-body text-sm focus:outline-none focus:border-brand-gold-dark transition-colors bg-brand-cream/50" placeholder="(84) 99999-9999" />
                    </div>
                    <div>
                      <label className="block text-brand-navy/70 text-xs font-body uppercase tracking-wider mb-2">Assunto</label>
                      <select name="subject" required className="w-full border border-brand-gold/20 rounded-sm px-4 py-3 font-body text-sm focus:outline-none focus:border-brand-gold-dark transition-colors bg-brand-cream/50">
                        <option value="">Selecione</option>
                        <option value="consumidor">Direito do Consumidor</option>
                        <option value="digital">Direito Digital / LGPD</option>
                        <option value="civil">Direito Civil</option>
                        <option value="imobiliario">Direito Imobiliário</option>
                        <option value="tributario">Direito Tributário</option>
                        <option value="licitacoes">Licitações</option>
                        <option value="penal">Direito Penal (Urgente)</option>
                        <option value="outro">Outro</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-brand-navy/70 text-xs font-body uppercase tracking-wider mb-2">Mensagem</label>
                      <textarea name="message" rows={4} className="w-full border border-brand-gold/20 rounded-sm px-4 py-3 font-body text-sm focus:outline-none focus:border-brand-gold-dark transition-colors bg-brand-cream/50 resize-none" placeholder="Descreva brevemente seu caso..." />
                    </div>
                    <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
                      <Send className="w-4 h-4" />{loading ? 'Enviando...' : 'Enviar Mensagem'}
                    </button>
                    <p className="text-brand-navy/30 text-xs font-body text-center">Protegido conforme a LGPD.</p>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

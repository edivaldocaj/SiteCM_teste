'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'

const fallbackTestimonials = [
  { text: 'Fui negativado indevidamente e não sabia o que fazer. A equipe resolveu tudo e ainda consegui uma indenização.', author: 'M.S.', caseType: 'Negativação Indevida', rating: 5 },
  { text: 'Minha empresa precisava de adequação à LGPD e o Dr. Edivaldo conduziu todo o processo com excelência.', author: 'R.A.', caseType: 'LGPD Empresarial', rating: 5 },
  { text: 'Situação muito difícil envolvendo um familiar preso. O atendimento foi imediato e conseguiram o habeas corpus em tempo recorde.', author: 'L.F.', caseType: 'Habeas Corpus', rating: 5 },
  { text: 'A Dra. Gabrielly cuidou do meu processo imobiliário com toda atenção. Resolveu uma disputa que já durava anos.', author: 'C.P.', caseType: 'Direito Imobiliário', rating: 5 },
]

export function TestimonialsCarousel({ cmsTestimonials = [] }: { cmsTestimonials?: any[] }) {
  const testimonials = cmsTestimonials.length > 0
    ? cmsTestimonials.map((t: any) => ({ text: t.text, author: t.authorName, caseType: t.caseType || '', rating: t.rating || 5 }))
    : fallbackTestimonials

  const [current, setCurrent] = useState(0)
  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1))
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1))

  return (
    <section className="section-padding gradient-navy relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0v40M0 20h40' stroke='%23ffffff' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")` }} />
      <div className="container-narrow mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="text-brand-gold-dark text-xs font-body uppercase tracking-[0.25em] mb-4 block">Depoimentos</span>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-brand-champagne">O que nossos clientes dizem</h2>
        </div>
        <div className="max-w-3xl mx-auto relative">
          <Quote className="absolute -top-4 -left-4 w-16 h-16 text-brand-gold-dark/10" />
          <AnimatePresence mode="wait">
            <motion.div key={current} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }} className="text-center px-8">
              <div className="flex justify-center gap-1 mb-8">
                {Array.from({ length: testimonials[current].rating }).map((_, i) => (<Star key={i} className="w-5 h-5 fill-brand-gold-dark text-brand-gold-dark" />))}
              </div>
              <p className="font-body text-xl sm:text-2xl text-brand-silver-light leading-relaxed mb-8 italic">&ldquo;{testimonials[current].text}&rdquo;</p>
              <p className="font-display text-brand-champagne font-semibold text-lg">{testimonials[current].author}</p>
              <p className="text-brand-silver/50 font-body text-sm mt-1">{testimonials[current].caseType}</p>
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-center gap-4 mt-12">
            <button onClick={prev} className="w-12 h-12 rounded-full border border-brand-silver/20 flex items-center justify-center text-brand-silver/60 hover:border-brand-gold-dark hover:text-brand-gold-dark transition-all" aria-label="Anterior"><ChevronLeft className="w-5 h-5" /></button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (<button key={i} onClick={() => setCurrent(i)} className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === current ? 'bg-brand-gold-dark w-8' : 'bg-brand-silver/30'}`} aria-label={`Depoimento ${i + 1}`} />))}
            </div>
            <button onClick={next} className="w-12 h-12 rounded-full border border-brand-silver/20 flex items-center justify-center text-brand-silver/60 hover:border-brand-gold-dark hover:text-brand-gold-dark transition-all" aria-label="Próximo"><ChevronRight className="w-5 h-5" /></button>
          </div>
        </div>
      </div>
    </section>
  )
}

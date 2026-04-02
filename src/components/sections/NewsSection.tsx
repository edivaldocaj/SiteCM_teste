'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Newspaper, ArrowRight, Clock, ExternalLink } from 'lucide-react'

const fallbackNews = [
  { slug: 'stj-revisao-juros', title: 'STJ firma entendimento sobre revisão de juros abusivos', excerpt: 'Decisão reforça direito do consumidor à revisão contratual.', source: 'Conjur', category: 'Direito do Consumidor', publishedAt: '2026-03-25', linkedCampaign: 'fraudes-bancarias' },
  { slug: 'anpd-multa-vazamento', title: 'ANPD aplica multa milionária por vazamento de dados', excerpt: 'Empresa é penalizada após exposição de dados pessoais.', source: 'Migalhas', category: 'LGPD', publishedAt: '2026-03-24', linkedCampaign: 'vazamento-de-dados' },
  { slug: 'nova-lei-estelionato', title: 'Nova lei amplia penas para estelionato digital', excerpt: 'Legislação aumenta rigor contra golpes praticados pela internet.', source: 'Consultor Jurídico', category: 'Direito Penal', publishedAt: '2026-03-22', linkedCampaign: 'golpes-online' },
  { slug: 'tjrn-usucapiao', title: 'TJRN decide sobre requisitos de usucapião urbana em Natal', excerpt: 'Novos parâmetros para regularização fundiária na capital.', source: 'TJRN', category: 'Direito Imobiliário', publishedAt: '2026-03-20', linkedCampaign: null },
]

function formatDate(d: string) { return new Date(d).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }) }

export function NewsSection({ cmsNews = [] }: { cmsNews?: any[] }) {
  const hasCms = cmsNews.length > 0
  const items = hasCms
    ? cmsNews.map((n: any) => ({
        slug: n.slug, title: n.title, excerpt: n.excerpt, source: n.source || '',
        category: n.category || 'Geral', publishedAt: n.publishedAt || new Date().toISOString(),
        linkedCampaign: n.linkedCampaign?.slug || null, sourceUrl: n.sourceUrl || null,
      }))
    : fallbackNews

  return (
    <section className="section-padding bg-white">
      <div className="container-wide mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
          <div>
            <span className="text-brand-gold-dark text-xs font-body uppercase tracking-[0.25em] mb-3 block">Atualidades Jurídicas</span>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-brand-navy">Notícias do Direito</h2>
          </div>
          <p className="text-brand-navy/50 font-body text-sm max-w-md">Notícias relevantes do mundo jurídico, selecionadas e comentadas pela nossa equipe.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {items.map((news, i) => (
            <motion.article key={news.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }} className="bg-brand-cream rounded-lg p-6 border border-brand-gold/10 card-hover group">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[10px] font-body uppercase tracking-wider text-brand-gold-dark bg-brand-gold/10 px-2 py-1 rounded-sm">{news.category}</span>
                <span className="text-brand-navy/30 text-xs font-body flex items-center gap-1"><Clock className="w-3 h-3" />{formatDate(news.publishedAt)}</span>
              </div>
              <h3 className="font-display text-lg font-semibold text-brand-navy mb-3 leading-snug group-hover:text-brand-gold-dark transition-colors">{news.title}</h3>
              <p className="text-brand-navy/50 font-body text-sm leading-relaxed mb-4">{news.excerpt}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-brand-navy/30 text-xs font-body flex items-center gap-1"><Newspaper className="w-3 h-3" />{news.source}</span>
                  {'sourceUrl' in news && news.sourceUrl && (
                    <a href={news.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-brand-navy/30 hover:text-brand-gold-dark text-xs transition-colors"><ExternalLink className="w-3 h-3" /></a>
                  )}
                </div>
                {news.linkedCampaign && (
                  <Link href={`/campanhas/${news.linkedCampaign}`} className="text-brand-gold-dark font-body text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-1 hover:gap-2 transition-all">
                    Campanha <ArrowRight className="w-3 h-3" />
                  </Link>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

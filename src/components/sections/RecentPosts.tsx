'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Clock, User } from 'lucide-react'

const authorNames: Record<string, string> = { edivaldo: 'Dr. Edivaldo Cavalcante', gabrielly: 'Dra. Gabrielly Melo', escritorio: 'Cavalcante & Melo' }

const fallbackPosts = [
  { slug: 'guia-lgpd-empresas', title: 'O Guia Completo da LGPD para Empresas em 2026', excerpt: 'Tudo que sua empresa precisa saber para se adequar à LGPD.', category: 'LGPD', author: 'Dr. Edivaldo Cavalcante', readTime: 12 },
  { slug: 'negativacao-indevida-direitos', title: 'Negativação Indevida: Conheça Seus Direitos', excerpt: 'O que fazer quando seu nome é incluído indevidamente em cadastros de inadimplentes.', category: 'Consumidor', author: 'Dra. Gabrielly Melo', readTime: 8 },
  { slug: 'direitos-preso-flagrante', title: '5 Direitos de Toda Pessoa Presa em Flagrante', excerpt: 'Direitos fundamentais garantidos pela Constituição em caso de prisão.', category: 'Penal', author: 'Dr. Edivaldo Cavalcante', readTime: 6 },
]

export function RecentPosts({ cmsPosts = [] }: { cmsPosts?: any[] }) {
  const hasCms = cmsPosts.length > 0
  const items = hasCms
    ? cmsPosts.map((p: any) => ({ slug: p.slug, title: p.title, excerpt: p.excerpt, category: p.category || 'Geral', author: authorNames[p.author] || 'Cavalcante & Melo', readTime: p.readTime || 5 }))
    : fallbackPosts

  return (
    <section className="section-padding bg-brand-cream">
      <div className="container-wide mx-auto">
        <div className="text-center mb-16">
          <span className="text-brand-gold-dark text-xs font-body uppercase tracking-[0.25em] mb-4 block">Blog Jurídico</span>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-brand-navy mb-6">Artigos Recentes</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((post, i) => (
            <motion.article key={post.slug} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
              <Link href={`/blog/${post.slug}`} className="block bg-white rounded-lg overflow-hidden border border-brand-gold/10 card-hover group h-full">
                <div className="h-48 gradient-navy flex items-center justify-center"><span className="text-brand-silver/20 font-display text-6xl font-bold">CM</span></div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] font-body uppercase tracking-wider text-brand-gold-dark bg-brand-gold/10 px-2 py-1 rounded-sm">{post.category}</span>
                    <span className="text-brand-navy/30 text-xs font-body flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime} min</span>
                  </div>
                  <h3 className="font-display text-lg font-semibold text-brand-navy mb-3 leading-snug group-hover:text-brand-gold-dark transition-colors">{post.title}</h3>
                  <p className="text-brand-navy/50 font-body text-sm leading-relaxed mb-4">{post.excerpt}</p>
                  <div className="flex items-center gap-2 text-brand-navy/30 text-xs font-body"><User className="w-3 h-3" />{post.author}</div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
        <div className="text-center mt-12"><Link href="/blog" className="inline-flex items-center gap-2 text-brand-gold-dark font-body font-semibold text-sm uppercase tracking-wider hover:gap-3 transition-all">Ver todos os artigos <ArrowRight className="w-4 h-4" /></Link></div>
      </div>
    </section>
  )
}

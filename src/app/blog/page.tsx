import type { Metadata } from 'next'
import Link from 'next/link'
import { Clock, User } from 'lucide-react'
import { getPayloadClient } from '@/lib/payload'

export const revalidate = 1800

export const metadata: Metadata = {
  title: 'Blog Jurídico',
  description: 'Artigos sobre Direito Digital, LGPD, Consumidor, Imobiliário, Tributário e Penal.',
}

const authorNames: Record<string, string> = { edivaldo: 'Dr. Edivaldo Cavalcante', gabrielly: 'Dra. Gabrielly Melo', escritorio: 'Cavalcante & Melo' }

export default async function BlogPage() {
  let posts: any[] = []

  try {
    const payload = await getPayloadClient()
    if (!payload) return null as any
    const result = await payload.find({
      collection: 'posts',
      where: { status: { equals: 'published' } },
      sort: '-publishedAt',
      limit: 20,
    })
    posts = result.docs
  } catch {
    // CMS not available — show placeholder
  }

  return (
    <>
      <section className="gradient-navy pt-32 pb-20">
        <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-brand-gold-dark text-xs font-body uppercase tracking-[0.25em] mb-4 block">Conteúdo Jurídico</span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-brand-champagne leading-tight mb-6">Blog Jurídico</h1>
          <p className="text-brand-silver/70 font-body text-lg max-w-2xl leading-relaxed">Artigos, guias e notícias para ajudar você a entender seus direitos.</p>
        </div>
      </section>

      <section className="section-padding bg-brand-cream">
        <div className="container-wide mx-auto">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-brand-navy/50 font-body text-lg mb-4">Novos artigos em breve.</p>
              <p className="text-brand-navy/30 font-body text-sm">Os artigos são gerenciados pelo painel administrativo em <code className="bg-white px-2 py-1 rounded">/admin</code></p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post: any) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="block bg-white rounded-lg overflow-hidden border border-brand-gold/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group">
                  <div className="h-48 gradient-navy flex items-center justify-center"><span className="text-brand-silver/20 font-display text-6xl font-bold">CM</span></div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-[10px] font-body uppercase tracking-wider text-brand-gold-dark bg-brand-gold/10 px-2 py-1 rounded-sm">{post.category}</span>
                      {post.readTime && <span className="text-brand-navy/30 text-xs font-body flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime} min</span>}
                    </div>
                    <h2 className="font-display text-lg font-semibold text-brand-navy mb-3 leading-snug group-hover:text-brand-gold-dark transition-colors">{post.title}</h2>
                    <p className="text-brand-navy/50 font-body text-sm leading-relaxed mb-4">{post.excerpt}</p>
                    <span className="text-brand-navy/30 text-xs font-body flex items-center gap-1"><User className="w-3 h-3" />{authorNames[post.author] || 'Cavalcante & Melo'}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}

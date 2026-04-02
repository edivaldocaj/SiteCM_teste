import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Clock, User, Phone, Calendar } from 'lucide-react'
import { getPayloadClient } from '@/lib/payload'

const authorNames: Record<string, string> = { edivaldo: 'Dr. Edivaldo Cavalcante', gabrielly: 'Dra. Gabrielly Melo', escritorio: 'Cavalcante & Melo' }

export const revalidate = 1800

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  try {
    const payload = await getPayloadClient()
	 if (!payload) return null as any
    const result = await payload.find({ collection: 'posts', where: { slug: { equals: slug } }, limit: 1 })
    const post = result.docs[0]
    if (!post) return { title: 'Artigo não encontrado' }
    return {
      title: post.seo?.metaTitle || post.title,
      description: post.seo?.metaDescription || post.excerpt,
      openGraph: { type: 'article', title: post.title, description: post.excerpt },
    }
  } catch {
    return { title: slug.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase()) }
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  let post: any = null

  try {
    const payload = await getPayloadClient()
	if (!payload) return null as any
    const result = await payload.find({ collection: 'posts', where: { slug: { equals: slug }, status: { equals: 'published' } }, limit: 1 })
    post = result.docs[0]
  } catch {}

  if (!post) {
    return (
      <>
        <section className="gradient-navy pt-32 pb-16">
          <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/blog" className="inline-flex items-center gap-2 text-brand-silver/50 hover:text-brand-gold-dark text-sm font-body mb-6 transition-colors"><ArrowLeft className="w-4 h-4" /> Blog</Link>
            <h1 className="font-display text-3xl sm:text-4xl font-semibold text-brand-champagne leading-tight mb-4">
              {slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
            </h1>
          </div>
        </section>
        <section className="section-padding bg-brand-cream">
          <div className="container-narrow mx-auto">
            <div className="bg-white rounded-lg p-12 border border-brand-gold/10 text-center">
              <p className="text-brand-navy/60 font-body text-lg mb-4">Este artigo será publicado em breve.</p>
              <p className="text-brand-navy/40 font-body text-sm">Gerencie artigos pelo painel em <code className="bg-brand-cream px-2 py-1 rounded">/admin</code></p>
            </div>
          </div>
        </section>
      </>
    )
  }

  const authorName = authorNames[post.author] || 'Cavalcante & Melo'

  return (
    <>
      {/* Schema.org Article */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: post.title, description: post.excerpt,
        author: { '@type': 'Person', name: authorName },
        publisher: { '@type': 'Organization', name: 'Cavalcante & Melo Sociedade de Advogados' },
        datePublished: post.publishedAt, dateModified: post.updatedAt,
        mainEntityOfPage: { '@type': 'WebPage', '@id': `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${slug}` },
      })}} />

      <section className="gradient-navy pt-32 pb-16">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blog" className="inline-flex items-center gap-2 text-brand-silver/50 hover:text-brand-gold-dark text-sm font-body mb-6 transition-colors"><ArrowLeft className="w-4 h-4" /> Blog</Link>
          <span className="text-brand-gold-dark text-xs font-body uppercase tracking-[0.25em] mb-3 block">{post.category}</span>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold text-brand-champagne leading-tight mb-6">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-brand-silver/50 text-sm font-body">
            <span className="flex items-center gap-1"><User className="w-4 h-4" />{authorName}</span>
            {post.readTime && <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{post.readTime} min</span>}
            {post.publishedAt && <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{new Date(post.publishedAt).toLocaleDateString('pt-BR')}</span>}
          </div>
        </div>
      </section>

      <section className="section-padding bg-brand-cream">
        <div className="container-narrow mx-auto">
          <article className="bg-white rounded-lg p-8 sm:p-12 border border-brand-gold/10 mb-12 prose prose-lg max-w-none">
            <p className="text-brand-navy/70 font-body text-lg leading-relaxed">{post.excerpt}</p>
            {/* Rich text content would render here via Payload's rich text renderer */}
          </article>

          <div className="gradient-navy rounded-lg p-8 text-center">
            <h2 className="font-display text-2xl font-semibold text-brand-champagne mb-4">Precisa de orientação jurídica?</h2>
            <p className="text-brand-silver/60 font-body mb-6">Fale com um advogado especialista.</p>
            <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5584999999999'}`} target="_blank" rel="noopener noreferrer" className="btn-whatsapp"><Phone className="w-5 h-5" /> Falar com Advogado</a>
          </div>
        </div>
      </section>
    </>
  )
}

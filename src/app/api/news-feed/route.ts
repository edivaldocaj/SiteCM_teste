import { NextRequest, NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'

const RSS_FEEDS = [
  { url: 'https://www.conjur.com.br/rss.xml', source: 'Conjur' },
  { url: 'https://www.migalhas.com.br/rss/quentes', source: 'Migalhas' },
]

const GOOGLE_NEWS_QUERIES = [
  { query: 'direito consumidor fraude banco Brasil', category: 'direito-consumidor' },
  { query: 'LGPD proteção dados vazamento Brasil', category: 'lgpd' },
  { query: 'direito penal criminal habeas corpus Brasil', category: 'direito-penal' },
  { query: 'direito imobiliário usucapião Brasil', category: 'direito-imobiliario' },
  { query: 'STJ STF decisão jurisprudência Brasil', category: 'tribunais' },
]

function slugify(t: string): string {
  return t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80)
}

function autoCategory(text: string): string {
  const t = text.toLowerCase()
  if (t.includes('lgpd') || t.includes('proteção de dados')) return 'lgpd'
  if (t.includes('consumidor') || t.includes('banco') || t.includes('negativação')) return 'direito-consumidor'
  if (t.includes('penal') || t.includes('criminal') || t.includes('habeas')) return 'direito-penal'
  if (t.includes('imobiliário') || t.includes('imóvel') || t.includes('usucapião')) return 'direito-imobiliario'
  if (t.includes('tributário') || t.includes('imposto')) return 'direito-tributario'
  if (t.includes('stj') || t.includes('stf') || t.includes('tribunal')) return 'tribunais'
  return 'geral'
}

async function parseRSS(url: string, source: string) {
  try {
    const res = await fetch(url, { next: { revalidate: 0 } })
    if (!res.ok) return []
    const xml = await res.text()
    const items: any[] = []
    const regex = /<item>([\s\S]*?)<\/item>/g
    let match
    while ((match = regex.exec(xml)) !== null && items.length < 5) {
      const x = match[1]
      const title = x.match(/<title>(.*?)<\/title>/)?.[1]?.replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1') || ''
      const link = x.match(/<link>(.*?)<\/link>/)?.[1] || ''
      const desc = x.match(/<description>(.*?)<\/description>/)?.[1]?.replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1')?.replace(/<[^>]+>/g, '') || ''
      const date = x.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] || ''
      if (title && link) {
        items.push({
          title: title.trim(),
          excerpt: (desc || title).trim().slice(0, 300),
          sourceUrl: link.trim(),
          source,
          publishedAt: date ? new Date(date).toISOString() : new Date().toISOString(),
          slug: slugify(title) + '-' + Date.now().toString(36),
          category: autoCategory(title + ' ' + desc),
        })
      }
    }
    return items
  } catch {
    return []
  }
}

async function parseGoogleNews(query: string, category: string) {
  try {
    const url = `https://news.google.com/rss/search?q=${encodeURIComponent(query + ' when:3d')}&hl=pt-BR&gl=BR&ceid=BR:pt-419`
    const res = await fetch(url, { next: { revalidate: 0 } })
    if (!res.ok) return []
    const xml = await res.text()
    const items: any[] = []
    const regex = /<item>([\s\S]*?)<\/item>/g
    let match
    while ((match = regex.exec(xml)) !== null && items.length < 3) {
      const x = match[1]
      const title = x.match(/<title>(.*?)<\/title>/)?.[1]?.replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1') || ''
      const link = x.match(/<link>(.*?)<\/link>/)?.[1] || ''
      const date = x.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] || ''
      const src = x.match(/<source.*?>(.*?)<\/source>/)?.[1]?.replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1') || 'Google News'
      if (title && link) {
        items.push({
          title: title.trim(),
          excerpt: title.trim(),
          sourceUrl: link.trim(),
          source: src.trim(),
          publishedAt: date ? new Date(date).toISOString() : new Date().toISOString(),
          slug: slugify(title) + '-' + Date.now().toString(36),
          category,
        })
      }
    }
    return items
  } catch {
    return []
  }
}

export async function POST(req: NextRequest) {
  const auth = req.headers.get('authorization')
  if (auth !== `Bearer ${process.env.NEWS_REVALIDATE_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const all: any[] = []

  for (const feed of RSS_FEEDS) {
    const items = await parseRSS(feed.url, feed.source)
    all.push(...items)
  }

  for (const q of GOOGLE_NEWS_QUERIES) {
    const items = await parseGoogleNews(q.query, q.category)
    all.push(...items)
  }

  const seen = new Set<string>()
  const unique = all.filter((a) => {
    const k = a.title.toLowerCase().slice(0, 50)
    if (seen.has(k)) return false
    seen.add(k)
    return true
  }).slice(0, 20)

  let saved = 0
  try {
    const payload = await getPayloadClient()
	if (!payload) return NextResponse.json({ success: false, error: 'CMS not available', fetched: unique.length })
    for (const article of unique) {
      try {
        await payload.create({
          collection: 'news-articles',
          data: {
            title: article.title,
            slug: article.slug,
            excerpt: article.excerpt,
            sourceUrl: article.sourceUrl,
            source: article.source,
            category: article.category,
            status: 'pending',
            autoImported: true,
            publishedAt: article.publishedAt,
          },
        })
        saved++
      } catch {
        // skip duplicates
      }
    }
  } catch {
    return NextResponse.json({ success: false, error: 'CMS not available', fetched: unique.length })
  }

  return NextResponse.json({ success: true, fetched: unique.length, saved })
}

export async function GET() {
  return NextResponse.json({
    info: 'POST with Bearer token to fetch legal news.',
    sources: RSS_FEEDS.map((f) => f.source).concat(['Google News']),
  })
}

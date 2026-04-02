import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Phone, CheckCircle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { getPayloadClient } from '@/lib/payload'

export const revalidate = 1800

// Static fallback data (used when CMS is not configured yet)
const fallbackData: Record<string, { title: string; subtitle: string; category: string; problem: string; rights: string; benefits: string[]; faq: { q: string; a: string }[] }> = {
  'fraudes-bancarias': { title: 'Fraudes Bancárias', subtitle: 'Cobranças abusivas? Restituição em dobro.', category: 'Consumidor', problem: 'Milhares de brasileiros são vítimas de cobranças abusivas e taxas não autorizadas.', rights: 'O CDC garante devolução em dobro de valores cobrados indevidamente.', benefits: ['Análise gratuita', 'Restituição em dobro', 'Indenização moral', 'Processo rápido'], faq: [{ q: 'Quanto tempo demora?', a: 'Em média 6 a 12 meses no Juizado Especial.' }] },
  'negativacao-indevida': { title: 'Negativação Indevida', subtitle: 'Nome sujo sem razão? Exija seus direitos.', category: 'Consumidor', problem: 'Negativação indevida causa transtornos enormes.', rights: 'Negativação indevida gera dano moral presumido.', benefits: ['Retirada urgente', 'Indenização', 'Sem custo inicial', 'Acompanhamento completo'], faq: [{ q: 'Preciso provar que não devo?', a: 'Não. O ônus da prova é de quem negativou.' }] },
  'vazamento-de-dados': { title: 'Vazamento de Dados', subtitle: 'Dados expostos? Direito a indenização.', category: 'Digital / LGPD', problem: 'Vazamentos expõem milhões a fraudes e golpes.', rights: 'A LGPD prevê responsabilidade das empresas pela segurança dos dados.', benefits: ['Indenização', 'Notificação à empresa', 'Representação na ANPD', 'Monitoramento'], faq: [{ q: 'Como saber se meus dados vazaram?', a: 'Sites como Have I Been Pwned verificam e-mails expostos.' }] },
  'golpes-online': { title: 'Golpes Online', subtitle: 'Caiu em golpe? Saiba como agir.', category: 'Digital', problem: 'Golpes digitais crescem exponencialmente no Brasil.', rights: 'Vítimas podem buscar reparação civil e responsabilizar bancos.', benefits: ['Orientação imediata', 'Ação contra responsáveis', 'Recuperação de valores', 'Registro policial'], faq: [{ q: 'O banco é responsável?', a: 'Em muitos casos sim, quando há falha de segurança.' }] },
  'defesa-criminal': { title: 'Defesa Criminal Urgente', subtitle: 'Atendimento imediato 24h.', category: 'Criminal', problem: 'Ser investigado ou preso é angustiante. Cada minuto sem orientação compromete a defesa.', rights: 'A Constituição garante ampla defesa, silêncio e assistência de advogado.', benefits: ['Atendimento 24h', 'Habeas corpus urgente', 'Acompanhamento em delegacia', 'Defesa em todas instâncias'], faq: [{ q: 'Posso ficar em silêncio?', a: 'Sim. Direito constitucional. Nunca declare sem advogado.' }] },
  'revisao-juros': { title: 'Revisão de Juros', subtitle: 'Parcelas abusivas? A justiça pode reduzir.', category: 'Consumidor', problem: 'Juros acima da média e cláusulas abusivas são comuns em contratos bancários.', rights: 'O STJ permite revisão judicial de juros acima da média de mercado.', benefits: ['Redução de parcelas', 'Recálculo do saldo', 'Devolução de valores', 'Renegociação'], faq: [{ q: 'Qualquer contrato pode ser revisado?', a: 'Contratos com juros acima da média do Bacen podem ser questionados.' }] },
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  let c: any = null
  try {
    const payload = await getPayloadClient()
	if (!payload) return null as any
    const result = await payload.find({ collection: 'campaigns', where: { slug: { equals: slug } }, limit: 1 })
    c = result.docs[0]
  } catch {}
  if (!c) c = fallbackData[slug]
  if (!c) return { title: 'Campanha não encontrada' }
  return { title: c.seo?.metaTitle || c.title, description: c.seo?.metaDescription || c.subtitle }
}

export default async function CampaignPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  let campaign: any = null
  let fromCms = false

  try {
    const payload = await getPayloadClient()
	 if (!payload) return null as any
    const result = await payload.find({ collection: 'campaigns', where: { slug: { equals: slug } }, limit: 1 })
    if (result.docs[0]) { campaign = result.docs[0]; fromCms = true }
  } catch {}

  if (!campaign) campaign = fallbackData[slug]
  if (!campaign) notFound()

  // Normalize data whether from CMS or fallback
  const title = campaign.title
  const subtitle = campaign.subtitle || ''
  const category = campaign.category || ''
  const problem = fromCms ? 'CMS content' : campaign.problem
  const rights = fromCms ? 'CMS content' : campaign.rights
  const benefits = fromCms ? (campaign.benefits || []) : (campaign.benefits || [])
  const faq = fromCms ? (campaign.faq || []) : (campaign.faq || [])
  const faqItems = faq.map((f: any) => ({ q: f.question || f.q, a: f.answer || f.a }))

  const whatsappMsg = campaign.whatsappMessage || `Olá! Vi a campanha "${title}" e gostaria de saber mais.`
  const whatsappUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5584999999999'}?text=${encodeURIComponent(whatsappMsg)}`

  return (
    <>
      {/* Schema.org FAQPage */}
      {faqItems.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org', '@type': 'FAQPage',
          mainEntity: faqItems.map((f: any) => ({
            '@type': 'Question', name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        })}} />
      )}

      <section className="gradient-navy pt-32 pb-16">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
          {campaign.urgencyText && <div className="bg-brand-urgency text-white text-center py-2 px-4 rounded-sm text-sm font-body font-semibold mb-6">{campaign.urgencyText}</div>}
          <Link href="/campanhas" className="inline-flex items-center gap-2 text-brand-silver/50 hover:text-brand-gold-dark text-sm font-body mb-6 transition-colors"><ArrowLeft className="w-4 h-4" /> Campanhas</Link>
          <span className="block text-brand-gold-dark text-xs font-body uppercase tracking-[0.25em] mb-4">{category}</span>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-brand-champagne leading-tight mb-4">{title}</h1>
          <p className="text-brand-silver/70 font-body text-xl mb-8">{subtitle}</p>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-whatsapp"><Phone className="w-5 h-5" /> Falar com Advogado</a>
        </div>
      </section>

      <section className="section-padding bg-brand-cream">
        <div className="container-narrow mx-auto">
          {!fromCms ? (
            <>
              <div className="bg-white rounded-lg p-8 border border-brand-gold/10 mb-8">
                <h2 className="font-display text-2xl font-semibold text-brand-navy mb-4">Você sabia?</h2>
                <p className="text-brand-navy/60 font-body leading-relaxed">{problem}</p>
              </div>
              <div className="bg-white rounded-lg p-8 border border-brand-gold/10 mb-8">
                <h2 className="font-display text-2xl font-semibold text-brand-navy mb-4">Seus Direitos</h2>
                <p className="text-brand-navy/60 font-body leading-relaxed">{rights}</p>
              </div>
              {benefits.length > 0 && (
                <div className="bg-white rounded-lg p-8 border border-brand-gold/10 mb-8">
                  <h2 className="font-display text-2xl font-semibold text-brand-navy mb-4">Como Podemos Ajudar</h2>
                  <div className="space-y-3">{benefits.map((b: string) => (
                    <div key={b} className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-brand-gold-dark shrink-0" /><span className="text-brand-navy/70 font-body">{b}</span></div>
                  ))}</div>
                </div>
              )}
            </>
          ) : (
            <div className="bg-white rounded-lg p-8 border border-brand-gold/10 mb-8">
              <p className="text-brand-navy/60 font-body">Conteúdo gerenciado pelo CMS.</p>
            </div>
          )}

          {faqItems.length > 0 && (
            <div className="bg-white rounded-lg p-8 border border-brand-gold/10 mb-12">
              <h2 className="font-display text-2xl font-semibold text-brand-navy mb-6">Perguntas Frequentes</h2>
              {faqItems.map((item: any) => (
                <div key={item.q} className="mb-4 last:mb-0">
                  <h3 className="font-display text-lg font-semibold text-brand-navy mb-2">{item.q}</h3>
                  <p className="text-brand-navy/60 font-body text-sm">{item.a}</p>
                </div>
              ))}
            </div>
          )}

          <div className="gradient-navy rounded-lg p-8 text-center">
            <h2 className="font-display text-2xl font-semibold text-brand-champagne mb-4">Não espere mais.</h2>
            <p className="text-brand-silver/60 font-body mb-6">Converse com um advogado e saiba se você tem direito.</p>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-whatsapp"><Phone className="w-5 h-5" /> Verificar Meu Caso</a>
          </div>
        </div>
      </section>
    </>
  )
}

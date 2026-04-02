import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Phone, ArrowLeft } from 'lucide-react'

const areasData: Record<string, { title: string; headline: string; description: string; cases: string[]; faq: { q: string; a: string }[] }> = {
  'direito-digital-lgpd': {
    title: 'Direito Digital e LGPD',
    headline: 'Proteção digital para sua empresa e seus dados',
    description: 'Assessoria completa em proteção de dados, adequação à LGPD, resposta a incidentes de segurança, crimes cibernéticos e consultoria para empresas de tecnologia.',
    cases: ['Adequação à LGPD', 'Vazamento de dados', 'Crimes cibernéticos', 'Contratos digitais', 'Política de privacidade', 'Consultoria para startups'],
    faq: [
      { q: 'Minha empresa precisa se adequar à LGPD?', a: 'Sim. Toda empresa que coleta dados pessoais de clientes, funcionários ou fornecedores precisa estar em conformidade com a LGPD, independente do porte.' },
      { q: 'O que fazer em caso de vazamento de dados?', a: 'É necessário notificar a ANPD e os titulares afetados, além de tomar medidas técnicas imediatas. Um advogado especializado pode orientar todo o processo.' },
    ],
  },
  'direito-civil': {
    title: 'Direito Civil',
    headline: 'Defesa dos seus direitos nas relações civis',
    description: 'Atuação em contratos, responsabilidade civil, direito de família, sucessões, ações indenizatórias e mediação de conflitos.',
    cases: ['Ações de indenização', 'Contratos civis', 'Direito de família', 'Inventário e sucessões', 'Responsabilidade civil', 'Cobranças judiciais'],
    faq: [
      { q: 'Quanto tempo demora uma ação de indenização?', a: 'Depende da complexidade do caso e da vara. Em média, entre 1 a 3 anos em primeira instância. Casos mais simples podem ser resolvidos via acordo extrajudicial.' },
    ],
  },
  'direito-consumidor': {
    title: 'Direito do Consumidor',
    headline: 'Seus direitos como consumidor protegidos',
    description: 'Defesa contra fraudes bancárias, negativação indevida, revisão de juros abusivos, problemas com planos de saúde e cobranças indevidas.',
    cases: ['Fraudes bancárias', 'Negativação indevida', 'Revisão de juros', 'Planos de saúde', 'Cobranças indevidas', 'Vícios de produto/serviço'],
    faq: [
      { q: 'Fui negativado indevidamente. Tenho direito a indenização?', a: 'Sim. A negativação indevida gera dano moral presumido, e você pode pleitear indenização além da retirada do nome dos cadastros.' },
    ],
  },
  'direito-imobiliario': {
    title: 'Direito Imobiliário',
    headline: 'Segurança jurídica nas suas transações imobiliárias',
    description: 'Compra e venda de imóveis, contratos imobiliários, usucapião, regularização fundiária e resolução de disputas de propriedade.',
    cases: ['Compra e venda', 'Usucapião', 'Regularização fundiária', 'Contratos de locação', 'Disputas de propriedade', 'Distrato imobiliário'],
    faq: [
      { q: 'O que é usucapião?', a: 'É a forma de adquirir a propriedade de um imóvel pela posse prolongada e ininterrupta, desde que atendidos os requisitos legais de tempo e finalidade.' },
    ],
  },
  'direito-tributario': {
    title: 'Direito Tributário',
    headline: 'Planejamento fiscal e defesa tributária',
    description: 'Planejamento fiscal estratégico, defesa em execuções fiscais, recuperação de tributos pagos indevidamente e consultoria tributária para empresas.',
    cases: ['Planejamento fiscal', 'Execução fiscal', 'Recuperação de tributos', 'Consultoria tributária', 'Parcelamento de dívidas', 'Defesa administrativa'],
    faq: [
      { q: 'É possível reduzir a carga tributária da minha empresa?', a: 'Sim, através de planejamento tributário legal, é possível identificar o melhor regime de tributação e aproveitar benefícios fiscais aplicáveis.' },
    ],
  },
  'licitacoes-contratos': {
    title: 'Licitações e Contratos',
    headline: 'Assessoria completa em licitações públicas',
    description: 'Assessoria em processos licitatórios, impugnações, contratos administrativos e defesa em processos do TCE/TCU.',
    cases: ['Assessoria em licitações', 'Impugnação de edital', 'Contratos administrativos', 'Recursos administrativos', 'Defesa no TCE/TCU', 'Reequilíbrio contratual'],
    faq: [
      { q: 'Posso impugnar um edital de licitação?', a: 'Sim. Qualquer cidadão ou licitante pode impugnar o edital caso identifique irregularidades ou cláusulas restritivas à competitividade.' },
    ],
  },
  'direito-penal': {
    title: 'Direito Penal',
    headline: 'Defesa criminal com atendimento 24 horas',
    description: 'Defesa criminal em todas as fases processuais, habeas corpus, audiência de custódia, crimes contra a honra, estelionato e mais. Atendimento imediato para situações de urgência.',
    cases: ['Defesa em inquérito', 'Habeas corpus', 'Audiência de custódia', 'Prisão preventiva', 'Crimes contra a honra', 'Estelionato', 'Tráfico de drogas', 'Crimes de trânsito'],
    faq: [
      { q: 'Fui preso em flagrante. O que fazer?', a: 'O mais importante é não prestar declarações sem a presença de um advogado. Entre em contato imediatamente — atendemos 24 horas em casos de urgência criminal.' },
      { q: 'O que é habeas corpus?', a: 'É um instrumento jurídico que protege o direito de ir e vir. Pode ser impetrado quando há prisão ilegal, abusiva ou quando o réu tem direito a responder em liberdade.' },
    ],
  },
}

export async function generateStaticParams() {
  return Object.keys(areasData).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const area = areasData[slug]
  if (!area) return {}
  return {
    title: area.title,
    description: area.description,
  }
}

export default async function AreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const area = areasData[slug]
  if (!area) notFound()

  const isPenal = slug === 'direito-penal'

  return (
    <>
      <section className={`pt-32 pb-20 ${isPenal ? 'bg-brand-navy-dark' : 'gradient-navy'}`}>
        {isPenal && <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-urgency via-brand-gold-dark to-brand-urgency" />}
        <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/areas-de-atuacao" className="inline-flex items-center gap-2 text-brand-silver/50 hover:text-brand-gold-dark text-sm font-body mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Áreas de Atuação
          </Link>
          {isPenal && <span className="ml-4 bg-brand-urgency text-white text-[10px] font-body font-bold uppercase tracking-wider px-3 py-1 rounded-sm">Atendimento 24h</span>}
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-brand-champagne leading-tight mb-4">{area.title}</h1>
          <p className="text-brand-silver/70 font-body text-xl max-w-2xl">{area.headline}</p>
        </div>
      </section>

      <section className="section-padding bg-brand-cream">
        <div className="container-narrow mx-auto">
          <p className="text-brand-navy/70 font-body text-lg leading-relaxed mb-12">{area.description}</p>

          <h2 className="font-display text-2xl font-semibold text-brand-navy mb-6">Tipos de Casos</h2>
          <div className="grid sm:grid-cols-2 gap-3 mb-16">
            {area.cases.map((c) => (
              <div key={c} className="bg-white rounded-lg p-4 border border-brand-gold/10 text-brand-navy/70 font-body text-sm">{c}</div>
            ))}
          </div>

          <h2 className="font-display text-2xl font-semibold text-brand-navy mb-6">Perguntas Frequentes</h2>
          <div className="space-y-4 mb-16">
            {area.faq.map((item) => (
              <div key={item.q} className="bg-white rounded-lg p-6 border border-brand-gold/10">
                <h3 className="font-display text-lg font-semibold text-brand-navy mb-3">{item.q}</h3>
                <p className="text-brand-navy/60 font-body text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>

          <div className={`rounded-lg p-8 text-center ${isPenal ? 'bg-brand-navy-dark' : 'gradient-navy'}`}>
            <h2 className="font-display text-2xl font-semibold text-brand-champagne mb-4">
              {isPenal ? 'Precisa de ajuda urgente?' : 'Tem um caso nessa área?'}
            </h2>
            <p className="text-brand-silver/60 font-body mb-6">Fale com um advogado especialista agora mesmo.</p>
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5584999999999'}?text=${encodeURIComponent(`Olá! Preciso de orientação sobre ${area.title}.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
            >
              <Phone className="w-5 h-5" />
              Falar com Advogado
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

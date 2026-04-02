import type { Metadata } from 'next'
import Link from 'next/link'
import { Shield, Scale, ShoppingBag, Home, Receipt, FileText, Gavel } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Áreas de Atuação',
  description: 'Conheça as áreas de atuação da Cavalcante & Melo: Direito Digital, LGPD, Civil, Consumidor, Imobiliário, Tributário, Licitações e Penal.',
}

const areas = [
  { icon: Shield, title: 'Direito Digital e LGPD', slug: 'direito-digital-lgpd', description: 'Proteção de dados pessoais, adequação à LGPD, crimes cibernéticos, compliance digital e consultoria para empresas de tecnologia.', attorney: 'Dr. Edivaldo Cavalcante' },
  { icon: Scale, title: 'Direito Civil', slug: 'direito-civil', description: 'Contratos, responsabilidade civil, direito de família, sucessões, ações indenizatórias e resolução de conflitos.', attorney: 'Ambos os sócios' },
  { icon: ShoppingBag, title: 'Direito do Consumidor', slug: 'direito-consumidor', description: 'Fraudes bancárias, negativação indevida, revisão de juros abusivos, problemas com planos de saúde e defesa contra cobranças indevidas.', attorney: 'Dra. Gabrielly Melo' },
  { icon: Home, title: 'Direito Imobiliário', slug: 'direito-imobiliario', description: 'Compra e venda de imóveis, contratos imobiliários, usucapião, regularização fundiária e disputas de propriedade.', attorney: 'Dra. Gabrielly Melo' },
  { icon: Receipt, title: 'Direito Tributário', slug: 'direito-tributario', description: 'Planejamento fiscal, defesa em execuções fiscais, recuperação de tributos pagos indevidamente e consultoria tributária.', attorney: 'Dra. Gabrielly Melo' },
  { icon: FileText, title: 'Licitações e Contratos', slug: 'licitacoes-contratos', description: 'Assessoria em licitações públicas, impugnações, contratos administrativos e defesa em processos do TCE/TCU.', attorney: 'Dr. Edivaldo Cavalcante' },
  { icon: Gavel, title: 'Direito Penal', slug: 'direito-penal', description: 'Defesa criminal em todas as fases, habeas corpus, audiência de custódia, crimes contra a honra e estelionato. Atendimento 24h.', attorney: 'Dr. Edivaldo Cavalcante', is24h: true },
]

export default function AreasDeAtuacaoPage() {
  return (
    <>
      <section className="gradient-navy pt-32 pb-20">
        <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-brand-gold-dark text-xs font-body uppercase tracking-[0.25em] mb-4 block">Especialidades</span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-brand-champagne leading-tight mb-6">
            Áreas de Atuação
          </h1>
          <p className="text-brand-silver/70 font-body text-lg max-w-2xl leading-relaxed">
            Atuação estratégica em diversas áreas do Direito, com foco na defesa dos seus interesses e na busca por resultados concretos.
          </p>
        </div>
      </section>

      <section className="section-padding bg-brand-cream">
        <div className="container-wide mx-auto">
          <div className="grid gap-6">
            {areas.map((area) => (
              <Link
                key={area.slug}
                href={`/areas-de-atuacao/${area.slug}`}
                className={`block rounded-lg p-8 border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group ${
                  area.is24h
                    ? 'bg-brand-navy text-brand-silver-light border-brand-gold-dark/20'
                    : 'bg-white border-brand-gold/10 hover:border-brand-gold-dark/30'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className={`w-16 h-16 rounded-lg flex items-center justify-center shrink-0 ${
                    area.is24h ? 'bg-brand-gold-dark/10' : 'bg-brand-cream'
                  }`}>
                    <area.icon className={`w-8 h-8 ${area.is24h ? 'text-brand-gold-dark' : 'text-brand-navy/30 group-hover:text-brand-gold-dark'} transition-colors`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className={`font-display text-xl font-semibold ${area.is24h ? 'text-brand-champagne' : 'text-brand-navy'}`}>
                        {area.title}
                      </h2>
                      {area.is24h && (
                        <span className="bg-brand-urgency text-white text-[10px] font-body font-bold uppercase tracking-wider px-3 py-1 rounded-sm">24h</span>
                      )}
                    </div>
                    <p className={`font-body text-sm leading-relaxed mb-3 ${area.is24h ? 'text-brand-silver/60' : 'text-brand-navy/50'}`}>
                      {area.description}
                    </p>
                    <span className={`text-xs font-body ${area.is24h ? 'text-brand-silver/40' : 'text-brand-navy/30'}`}>
                      {area.attorney}
                    </span>
                  </div>
                  <span className={`text-xs font-body uppercase tracking-wider font-semibold shrink-0 ${
                    area.is24h ? 'text-brand-gold-dark' : 'text-brand-navy/30 group-hover:text-brand-gold-dark'
                  } transition-colors`}>
                    Saiba mais →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

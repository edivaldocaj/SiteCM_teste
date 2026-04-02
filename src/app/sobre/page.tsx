import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Award, Users, Scale, Phone } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Sobre o Escritório',
  description: 'Conheça a história, missão e os sócios fundadores da Cavalcante & Melo Sociedade de Advogados em Natal/RN.',
}

const timeline = [
  { year: '2025', title: 'Fundação', description: 'Cavalcante & Melo Sociedade de Advogados é fundada em Natal/RN.' },
  { year: '2025', title: 'Especialização Digital', description: 'Foco estratégico em Direito Digital, LGPD e tecnologia jurídica.' },
  { year: '2026', title: 'Expansão', description: 'Ampliação das áreas de atuação e consolidação no mercado potiguar.' },
]

const partners = [
  {
    name: 'Dr. Edivaldo Cavalcante',
    fullName: 'Edivaldo Cavalcante de Albuquerque Junior',
    role: 'Sócio-Administrador',
    areas: ['Direito Digital', 'LGPD', 'Direito Civil', 'Licitações e Contratos', 'Direito Penal'],
    initials: 'EC',
    bio: 'Advogado com atuação estratégica em Direito Digital e LGPD, aliando tecnologia e inovação à prática jurídica. Também atua em Direito Civil, Licitações e Contratos Administrativos, além de Direito Penal com atendimento 24 horas para casos urgentes.',
  },
  {
    name: 'Dra. Gabrielly Melo',
    fullName: 'Neura Gabrielly Evangelista de Melo Freitas',
    role: 'Sócia-Administradora',
    areas: ['Direito Tributário', 'Direito Imobiliário', 'Direito Civil'],
    initials: 'GM',
    bio: 'Advogada especialista em Direito Tributário e Imobiliário, com foco em planejamento fiscal, regularização de imóveis e assessoria contratual. Atua também em Direito Civil com atenção ao detalhe e compromisso com resultados.',
  },
]

const values = [
  { icon: Scale, title: 'Ética', description: 'Compromisso absoluto com a ética profissional e o Código da OAB.' },
  { icon: Users, title: 'Proximidade', description: 'Atendimento humanizado, tratando cada cliente com atenção individual.' },
  { icon: Award, title: 'Resultado', description: 'Foco em soluções concretas e eficazes para cada caso.' },
]

export default function SobrePage() {
  return (
    <>
      {/* Hero */}
      <section className="gradient-navy pt-32 pb-20">
        <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-brand-gold-dark text-xs font-body uppercase tracking-[0.25em] mb-4 block">
            Quem Somos
          </span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-brand-champagne leading-tight mb-6">
            Sobre o Escritório
          </h1>
          <p className="text-brand-silver/70 font-body text-lg max-w-2xl leading-relaxed">
            Advocacia estratégica e humanizada, construída sobre os pilares da ética, proximidade e busca por resultados concretos.
          </p>
        </div>
      </section>

      {/* História */}
      <section className="section-padding bg-brand-cream">
        <div className="container-narrow mx-auto">
          <h2 className="font-display text-3xl font-semibold text-brand-navy mb-8">Nossa História</h2>
          <p className="text-brand-navy/70 font-body text-lg leading-relaxed mb-12">
            A Cavalcante & Melo Sociedade de Advogados nasceu em 2025 com a missão de oferecer advocacia de excelência em Natal/RN. Fundada por profissionais com experiência complementar, o escritório se destaca pela combinação de expertise em áreas tradicionais do Direito com a inovação do Direito Digital e LGPD.
          </p>

          {/* Timeline */}
          <div className="space-y-8 border-l-2 border-brand-gold/30 pl-8 ml-4">
            {timeline.map((item) => (
              <div key={item.title} className="relative">
                <div className="absolute -left-[41px] w-4 h-4 rounded-full bg-brand-gold-dark border-4 border-brand-cream" />
                <span className="text-brand-gold-dark font-body text-sm font-semibold uppercase tracking-wider">
                  {item.year}
                </span>
                <h3 className="font-display text-xl font-semibold text-brand-navy mt-1 mb-2">{item.title}</h3>
                <p className="text-brand-navy/60 font-body">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="section-padding bg-white">
        <div className="container-narrow mx-auto">
          <h2 className="font-display text-3xl font-semibold text-brand-navy mb-12 text-center">Nossos Valores</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value) => (
              <div key={value.title} className="text-center p-8 bg-brand-cream rounded-lg border border-brand-gold/10">
                <value.icon className="w-10 h-10 text-brand-gold-dark mx-auto mb-4" />
                <h3 className="font-display text-xl font-semibold text-brand-navy mb-3">{value.title}</h3>
                <p className="text-brand-navy/60 font-body text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sócios */}
      <section className="section-padding bg-brand-cream">
        <div className="container-narrow mx-auto">
          <h2 className="font-display text-3xl font-semibold text-brand-navy mb-12 text-center">Sócios Fundadores</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {partners.map((partner) => (
              <div key={partner.name} className="bg-white rounded-lg p-8 border border-brand-gold/10">
                <div className="w-20 h-20 rounded-full gradient-navy flex items-center justify-center mb-6">
                  <span className="text-silver-gradient font-display text-xl font-bold">{partner.initials}</span>
                </div>
                <h3 className="font-display text-xl font-semibold text-brand-navy">{partner.name}</h3>
                <p className="text-brand-gold-dark text-sm font-body font-medium mb-4">{partner.role}</p>
                <p className="text-brand-navy/60 font-body text-sm leading-relaxed mb-6">{partner.bio}</p>
                <div className="flex flex-wrap gap-2">
                  {partner.areas.map((area) => (
                    <span key={area} className="text-[11px] font-body uppercase tracking-wider text-brand-navy/50 bg-brand-cream px-3 py-1 rounded-sm border border-brand-gold/10">
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Localização */}
      <section className="section-padding gradient-navy">
        <div className="container-narrow mx-auto text-center">
          <MapPin className="w-10 h-10 text-brand-gold-dark mx-auto mb-6" />
          <h2 className="font-display text-3xl font-semibold text-brand-champagne mb-4">Localização</h2>
          <p className="text-brand-silver/60 font-body text-lg mb-8">
            Rua Francisco Maia Sobrinho, 1950 — Lagoa Nova, Natal/RN
          </p>
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5584999999999'}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp"
          >
            <Phone className="w-5 h-5" />
            Fale com um Advogado
          </a>
        </div>
      </section>
    </>
  )
}

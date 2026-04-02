import Link from 'next/link'
import { MapPin, Phone, Mail, Clock, Instagram, Linkedin } from 'lucide-react'

const practiceAreas = [
  { href: '/areas-de-atuacao/direito-digital-lgpd', label: 'Direito Digital e LGPD' },
  { href: '/areas-de-atuacao/direito-civil', label: 'Direito Civil' },
  { href: '/areas-de-atuacao/direito-consumidor', label: 'Direito do Consumidor' },
  { href: '/areas-de-atuacao/direito-imobiliario', label: 'Direito Imobiliário' },
  { href: '/areas-de-atuacao/direito-tributario', label: 'Direito Tributário' },
  { href: '/areas-de-atuacao/licitacoes-contratos', label: 'Licitações e Contratos' },
  { href: '/areas-de-atuacao/direito-penal', label: 'Direito Penal' },
]

export function Footer() {
  return (
    <footer className="bg-brand-navy text-brand-silver/70">
      {/* Main Footer */}
      <div className="container-wide mx-auto section-padding !py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="mb-6">
              <h3 className="font-display text-brand-silver-light text-xl font-semibold">
                Cavalcante & Melo
              </h3>
              <p className="text-brand-silver/40 text-xs uppercase tracking-[0.2em] mt-1">
                Sociedade de Advogados
              </p>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              Advocacia estratégica e humanizada em Natal/RN. Comprometidos com a defesa dos seus direitos e a busca por resultados concretos.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-full border border-brand-silver/20 flex items-center justify-center hover:border-brand-gold hover:text-brand-gold transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-brand-silver/20 flex items-center justify-center hover:border-brand-gold hover:text-brand-gold transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Áreas */}
          <div>
            <h4 className="font-display text-brand-silver-light font-semibold mb-6 text-sm uppercase tracking-wider">
              Áreas de Atuação
            </h4>
            <ul className="space-y-3">
              {practiceAreas.map((area) => (
                <li key={area.href}>
                  <Link href={area.href} className="text-sm hover:text-brand-gold transition-colors duration-300">
                    {area.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display text-brand-silver-light font-semibold mb-6 text-sm uppercase tracking-wider">
              Navegação
            </h4>
            <ul className="space-y-3">
              <li><Link href="/sobre" className="text-sm hover:text-brand-gold transition-colors">Sobre o Escritório</Link></li>
              <li><Link href="/campanhas" className="text-sm hover:text-brand-gold transition-colors">Campanhas Jurídicas</Link></li>
              <li><Link href="/blog" className="text-sm hover:text-brand-gold transition-colors">Blog Jurídico</Link></li>
              <li><Link href="/contato" className="text-sm hover:text-brand-gold transition-colors">Contato</Link></li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="font-display text-brand-silver-light font-semibold mb-6 text-sm uppercase tracking-wider">
              Contato
            </h4>
            <ul className="space-y-4">
              <li className="flex gap-3 text-sm">
                <MapPin className="w-5 h-5 text-brand-gold-dark shrink-0 mt-0.5" />
                <span>Rua Francisco Maia Sobrinho, 1950<br />Lagoa Nova — Natal/RN</span>
              </li>
              <li className="flex gap-3 text-sm">
                <Phone className="w-5 h-5 text-brand-gold-dark shrink-0" />
                <a href="tel:+5584999999999" className="hover:text-brand-gold transition-colors">(84) 99999-9999</a>
              </li>
              <li className="flex gap-3 text-sm">
                <Mail className="w-5 h-5 text-brand-gold-dark shrink-0" />
                <a href="mailto:contato@cavalcantemelo.adv.br" className="hover:text-brand-gold transition-colors">contato@cavalcantemelo.adv.br</a>
              </li>
              <li className="flex gap-3 text-sm">
                <Clock className="w-5 h-5 text-brand-gold-dark shrink-0" />
                <span>Seg a Sex: 8h às 18h<br />Penal: Atendimento 24h</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-brand-silver/10">
        <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-brand-silver/40">
            &copy; {new Date().getFullYear()} Cavalcante & Melo Sociedade de Advogados. Todos os direitos reservados.
          </p>
          <p className="text-xs text-brand-silver/30">
            OAB/RN — Advocacia responsável conforme Código de Ética da OAB
          </p>
        </div>
      </div>
    </footer>
  )
}

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Phone } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Início' },
  { href: '/sobre', label: 'Sobre' },
  { href: '/areas-de-atuacao', label: 'Áreas de Atuação' },
  { href: '/campanhas', label: 'Campanhas' },
  { href: '/blog', label: 'Blog' },
  { href: '/contato', label: 'Contato' },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-brand-navy/95 backdrop-blur-md shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 sm:w-12 sm:h-12">
            <div className="w-full h-full flex items-center justify-center text-brand-silver font-display text-xl font-bold">
              CM
            </div>
          </div>
          <div className="hidden sm:block">
            <div className="text-brand-silver-light font-display text-lg font-semibold tracking-wide leading-tight group-hover:text-brand-gold transition-colors">
              Cavalcante & Melo
            </div>
            <div className="text-brand-silver/60 text-[10px] uppercase tracking-[0.2em] font-body">
              Sociedade de Advogados
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-brand-silver/80 hover:text-brand-gold text-sm font-body font-medium uppercase tracking-wider transition-colors duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-brand-gold-dark after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA Desktop */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5584999999999'}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary !py-3 !px-6 !text-xs"
          >
            <Phone className="w-4 h-4" />
            Fale com um Advogado
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-brand-silver hover:text-brand-gold transition-colors p-2"
          aria-label="Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ${
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-brand-navy/98 backdrop-blur-md border-t border-brand-silver/10 px-4 py-6">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-brand-silver/80 hover:text-brand-gold hover:bg-white/5 text-base font-body py-3 px-4 rounded transition-all"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-6 px-4">
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5584999999999'}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp w-full"
            >
              <Phone className="w-4 h-4" />
              Fale com um Advogado
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}

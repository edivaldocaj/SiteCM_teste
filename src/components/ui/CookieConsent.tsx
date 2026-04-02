'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

export function CookieConsent() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const accepted = localStorage.getItem('cm-cookies-accepted')
    if (!accepted) setShow(true)
  }, [])

  function accept() {
    localStorage.setItem('cm-cookies-accepted', 'true')
    setShow(false)
  }

  if (!show) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-4 sm:p-6">
      <div className="max-w-3xl mx-auto bg-brand-navy/95 backdrop-blur-md border border-brand-silver/10 rounded-lg p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-2xl">
        <p className="text-brand-silver/70 font-body text-sm flex-1">
          Utilizamos cookies para melhorar sua experiência. Ao continuar navegando, você concorda com nossa{' '}
          <a href="/politica-de-privacidade" className="text-brand-gold-dark underline">
            Política de Privacidade
          </a>{' '}
          conforme a LGPD.
        </p>
        <div className="flex gap-3 shrink-0">
          <button onClick={accept} className="btn-primary !py-2 !px-6 !text-xs">
            Aceitar
          </button>
          <button
            onClick={accept}
            className="text-brand-silver/40 hover:text-brand-silver transition-colors"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

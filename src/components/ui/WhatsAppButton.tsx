'use client'

import { MessageCircle } from 'lucide-react'

export function WhatsAppButton() {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5584999999999'
  const message = encodeURIComponent(process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE || 'Olá! Gostaria de falar com um advogado.')

  return (
    <a
      href={`https://wa.me/${number}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl shadow-[#25D366]/30 hover:scale-110 transition-transform duration-300 whatsapp-pulse"
      aria-label="Fale pelo WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
    </a>
  )
}

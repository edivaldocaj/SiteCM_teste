'use client'

import { useEffect, useRef, useState } from 'react'

const stats = [
  { value: 15, suffix: '+', label: 'Anos de Experiência Combinada' },
  { value: 500, suffix: '+', label: 'Clientes Atendidos' },
  { value: 7, suffix: '', label: 'Áreas de Atuação' },
  { value: 98, suffix: '%', label: 'Satisfação dos Clientes' },
]

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const counted = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true
          const duration = 2000
          const start = performance.now()
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3) // easeOutCubic
            setCount(Math.floor(eased * target))
            if (progress < 1) requestAnimationFrame(step)
          }
          requestAnimationFrame(step)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return (
    <div ref={ref} className="text-4xl sm:text-5xl font-display font-bold text-brand-navy">
      {count}{suffix}
    </div>
  )
}

export function TrustBar() {
  return (
    <section className="bg-brand-champagne border-y border-brand-gold/20">
      <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              <p className="text-brand-navy/60 font-body text-sm mt-2 uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

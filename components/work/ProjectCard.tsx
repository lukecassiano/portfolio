'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { GradientBlob } from '@/components/ui/GradientBlob'

interface Spec {
  label: string
  value: string
}

interface ProjectLink {
  label: string
  href: string
  external?: boolean
}

interface ProjectCardProps {
  index: string
  category: string
  status: string
  title: string
  tagline: string
  body: string[]
  specs?: Spec[]
  essays?: string[]
  links: ProjectLink[]
  blob: {
    colors: string[]
    position?: React.CSSProperties
    blur?: string
    duration?: number
  }
  tone?: 'light' | 'dark'
  align?: 'left' | 'right'
  logo?: { src: string; alt?: string }
  essaysLabel?: string
  backdrop?: React.ReactNode
}

export function ProjectCard({
  index,
  category,
  status,
  title,
  tagline,
  body,
  specs,
  essays,
  links,
  blob,
  tone = 'light',
  align = 'left',
  logo,
  essaysLabel = 'Recent essays',
  backdrop,
}: ProjectCardProps) {
  const reduce = useReducedMotion()
  const dark = tone === 'dark'
  const offset = align === 'right' ? 'md:self-end' : 'md:self-start'

  const shell = dark
    ? 'bg-[#0D0D12] text-cream'
    : 'bg-white/70 backdrop-blur-sm text-ink'
  const border = dark ? 'border-cream/12' : 'border-ink/10'
  const hairline = dark ? 'border-cream/12' : 'border-ink/10'
  const muted = dark ? 'text-cream/55' : 'text-ink/50'
  const pill = dark ? 'border-cream/25 text-cream/80' : 'border-ink/20 text-ink/70'

  return (
    <motion.article
      aria-label={title}
      className={`group relative overflow-hidden rounded-3xl border ${border} ${shell} shadow-[0_1px_3px_rgba(0,0,0,0.04)] w-full md:w-[94%] ${offset}`}
      initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      whileHover={reduce ? undefined : { y: -4 }}
    >
      <GradientBlob
        colors={blob.colors}
        size="120%"
        position={blob.position}
        blur={blob.blur ?? '80px'}
        duration={blob.duration ?? 16}
        className="opacity-60"
      />

      {backdrop}

      {logo && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={logo.src}
          alt=""
          aria-hidden="true"
          className={`pointer-events-none absolute -top-8 -right-8 w-40 md:w-52 ${
            dark ? 'invert opacity-[0.16]' : 'opacity-[0.09]'
          }`}
        />
      )}

      <div className="relative z-10 flex flex-col gap-7 p-8 md:p-12">
        {/* Meta row */}
        <header className="flex items-center justify-between gap-4">
          <span className={`font-mono font-medium text-xs uppercase tracking-[0.18em] ${muted}`}>
            {index} — {category}
          </span>
          <span
            className={`font-mono font-medium text-[10px] uppercase tracking-[0.14em] border ${pill} rounded-full px-3 py-1`}
          >
            {status}
          </span>
        </header>

        {/* Title + tagline */}
        <div className="flex flex-col gap-4">
          <h3 className="wordmark" style={{ fontSize: 'clamp(34px, 5vw, 60px)', lineHeight: 1.0 }}>
            {title}
          </h3>
          <p
            className="font-mono font-medium leading-snug max-w-2xl"
            style={{ fontSize: 'clamp(15px, 1.6vw, 19px)' }}
          >
            {tagline}
          </p>
        </div>

        <hr className={`border-t ${hairline}`} />

        {/* Body + spec sheet */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          <div className="md:col-span-2 flex flex-col gap-4">
            {body.map((para, i) => (
              <p key={i} className="font-mono font-medium text-sm leading-relaxed">
                {para}
              </p>
            ))}

            {links.length > 0 && (
              <div className="flex flex-wrap items-center gap-3 pt-3">
                {links.map((link, i) => {
                  const primary = i === 0
                  const variant = primary
                    ? dark
                      ? 'bg-cream text-ink hover:bg-cream/85'
                      : 'bg-ink text-cream hover:bg-ink/85'
                    : dark
                      ? 'border border-cream/35 text-cream hover:bg-cream/10'
                      : 'border border-ink/30 text-ink hover:bg-ink/[0.06]'
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 font-mono font-medium text-xs uppercase tracking-[0.1em] transition-colors duration-200 ${variant}`}
                    >
                      {link.label}
                      <span aria-hidden="true">→</span>
                      {link.external && <span className="sr-only"> (opens in new tab)</span>}
                    </a>
                  )
                })}
              </div>
            )}
          </div>

          <div className="md:col-span-1">
            {specs && (
              <dl className="flex flex-col gap-4">
                {specs.map((spec) => (
                  <div key={spec.label} className="flex flex-col gap-1">
                    <dt className={`font-mono font-medium text-[10px] uppercase tracking-[0.16em] ${muted}`}>
                      {spec.label}
                    </dt>
                    <dd className="font-mono font-medium text-sm leading-snug">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            )}

            {essays && (
              <div className="flex flex-col gap-3">
                <p className={`font-mono font-medium text-[10px] uppercase tracking-[0.16em] ${muted}`}>
                  {essaysLabel}
                </p>
                <ul className="flex flex-col gap-2">
                  {essays.map((essay) => (
                    <li key={essay} className="font-mono font-medium text-sm leading-snug">
                      {essay}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  )
}

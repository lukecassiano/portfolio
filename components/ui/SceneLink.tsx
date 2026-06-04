interface SceneLinkProps {
  href: string
  children: React.ReactNode
  external?: boolean
  /** Use 'light' on dark scene backgrounds so the link stays legible. */
  tone?: 'dark' | 'light'
}

export function SceneLink({ href, children, external, tone = 'dark' }: SceneLinkProps) {
  const color = tone === 'light' ? 'text-[#F5F3EE]' : 'text-ink'

  return (
    <a
      href={href}
      className={`font-mono font-medium text-xs tracking-wide ${color} hover:opacity-60 transition-opacity duration-200`}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
      {external && <span className="sr-only"> (opens in new tab)</span>}
    </a>
  )
}

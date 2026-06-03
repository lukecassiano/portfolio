interface SceneLinkProps {
  href: string
  children: React.ReactNode
  external?: boolean
}

export function SceneLink({ href, children, external }: SceneLinkProps) {
  return (
    <a
      href={href}
      className="font-mono font-medium text-xs tracking-wide text-ink hover:opacity-60 transition-opacity duration-200"
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
      {external && <span className="sr-only"> (opens in new tab)</span>}
    </a>
  )
}

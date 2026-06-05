/**
 * Non-sticky top nav, overlaid on the hero. Scrolls away with the page.
 * Recruiter-oriented: Work, About, and a one-click résumé.
 */
export function Nav() {
  return (
    <nav className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-5 md:px-10 md:py-6">
      <a
        href="/"
        aria-label="Home"
        className="wordmark text-xl md:text-2xl text-ink hover:opacity-60 transition-opacity duration-200"
      >
        LC
      </a>

      <div className="flex items-center gap-5 md:gap-7 font-mono font-medium text-xs uppercase tracking-[0.14em] text-ink">
        <a href="/#work" className="hover:opacity-60 transition-opacity duration-200">
          Work
        </a>
        <a href="/about" className="hover:opacity-60 transition-opacity duration-200">
          About
        </a>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-60 transition-opacity duration-200"
        >
          Résumé ↗<span className="sr-only"> (opens in new tab)</span>
        </a>
      </div>
    </nav>
  )
}

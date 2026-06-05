export function Footer() {
  return (
    <footer className="w-full px-8 py-12 text-center font-mono text-sm">
      <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
        <a
          href="mailto:lukecassiano7@gmail.com"
          className="underline underline-offset-4 hover:no-underline"
        >
          lukecassiano7@gmail.com
        </a>
        <span aria-hidden="true" className="opacity-40">·</span>
        <a
          href="https://www.linkedin.com/in/lukecassiano/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4 hover:no-underline"
        >
          LinkedIn
        </a>
        <span aria-hidden="true" className="opacity-40">·</span>
        <a
          href="https://github.com/lukecassiano"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4 hover:no-underline"
        >
          GitHub
        </a>
        <span aria-hidden="true" className="opacity-40">·</span>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4 hover:no-underline"
        >
          Résumé
        </a>
      </nav>
    </footer>
  )
}

export default function Home() {
  return (
    <main id="main-content">
      <section className="min-h-[100svh] flex flex-col items-center justify-center gap-4 p-8">
        <h1 className="wordmark text-6xl">Luke Cassiano</h1>
        <p className="font-mono text-sm">Scroll down — Lenis smooth scroll active.</p>
      </section>
      <section className="min-h-[100svh] flex items-center justify-center bg-cream">
        <p className="font-mono text-sm">Section two</p>
      </section>
      <section className="min-h-[100svh] flex items-center justify-center bg-cream">
        <p className="font-mono text-sm">Section three</p>
      </section>
    </main>
  )
}

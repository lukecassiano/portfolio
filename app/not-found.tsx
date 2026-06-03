import Link from 'next/link'
import { GradientBlob } from '@/components/ui/GradientBlob'

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="relative flex min-h-[100svh] flex-col items-center justify-center gap-6 overflow-hidden bg-cream p-8 text-center"
    >
      <GradientBlob
        colors={['#F4A8C7', '#C4B5FD', '#93C5FD']}
        size="50vmax"
        position={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
      />
      <h1 className="wordmark relative text-7xl">404</h1>
      <p className="relative font-mono text-sm text-ink">
        This page drifted out past the break.
      </p>
      <Link
        href="/"
        className="relative font-mono text-sm underline underline-offset-4 hover:no-underline"
      >
        Back to start
      </Link>
    </main>
  )
}

import type { Metadata } from 'next'
import { fraunces, ibmPlexMono } from '@/lib/fonts'
import { LenisProvider } from '@/components/providers/LenisProvider'
import './globals.css'

export const metadata: Metadata = {
  title: 'Luke Cassiano',
  description: 'Portfolio of Luke Cassiano',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${ibmPlexMono.variable}`}
    >
      <body className="font-serif bg-cream text-ink antialiased">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  )
}

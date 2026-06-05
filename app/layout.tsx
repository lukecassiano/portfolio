import type { Metadata } from 'next'
import { syne, ibmPlexMono, fraunces, bagelFatOne } from '@/lib/fonts'
import { LenisProvider } from '@/components/providers/LenisProvider'
import { SkipLink } from '@/components/ui/SkipLink'
import { CustomCursor } from '@/components/ui/CustomCursor'
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
      className={`${syne.variable} ${ibmPlexMono.variable} ${fraunces.variable} ${bagelFatOne.variable}`}
    >
      <body className="bg-cream text-ink antialiased">
        <SkipLink />
        <CustomCursor />
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  )
}

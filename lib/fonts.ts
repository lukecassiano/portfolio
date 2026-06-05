import { Syne, IBM_Plex_Mono, Fraunces, Bagel_Fat_One } from 'next/font/google'

export const syne = Syne({
  weight: ['700', '800'],
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
})

export const fraunces = Fraunces({
  weight: ['500', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
})

// Lineup's logo face.
export const bagelFatOne = Bagel_Fat_One({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bagel',
  display: 'swap',
})

export const ibmPlexMono = IBM_Plex_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

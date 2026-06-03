import localFont from 'next/font/local'
import { IBM_Plex_Mono } from 'next/font/google'

export const fraunces = localFont({
  src: [
    {
      path: '../app/fonts/Fraunces-Italic-VF.woff2',
      style: 'italic',
      weight: '100 900',
    },
  ],
  variable: '--font-fraunces',
  display: 'swap',
})

export const ibmPlexMono = IBM_Plex_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

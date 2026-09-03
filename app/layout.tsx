import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import SessionProvider from '@/components/providers/session-provider'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://karmveerstudio.com'),
  title: {
    default: 'Karmveer Studio | Video Editor & Motion Graphics Designer',
    template: '%s | Karmveer Studio'
  },
  description: 'Video Editor & Motion Graphics Designer helping creators and brands turn ideas into high-impact visual content.',
  keywords: ['video editing', 'motion graphics', 'color grading', 'SaaS animation', 'visual content', 'Karmveer Studio'],
  authors: [{ name: 'Karmveer Kumar' }],
  creator: 'Karmveer Studio',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://karmveerstudio.com',
    siteName: 'Karmveer Studio',
    title: 'Karmveer Studio | Video Editor & Motion Graphics Designer',
    description: 'Video Editor & Motion Graphics Designer helping creators and brands turn ideas into high-impact visual content.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Karmveer Studio | Video Editor & Motion Graphics Designer',
    description: 'Video Editor & Motion Graphics Designer helping creators and brands turn ideas into high-impact visual content.',
    creator: '@editwithkarmveer',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans antialiased">
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}

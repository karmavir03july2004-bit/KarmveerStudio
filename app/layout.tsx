import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import SessionProvider from '@/components/providers/session-provider'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const space = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://karmveerstudio.netlify.app'),
  title: 'Karmveer Studio | Video Editor & Motion Designer',
  description: 'Video Editor & Motion Designer for AI, SaaS & Personal Brands. High-retention content and performance ads for India and international clients.',
  authors: [{ name: 'Karmveer' }],
  creator: 'Karmveer Studio',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    title: 'Karmveer Studio | Video Editor & Motion Designer',
    description: 'High-retention content and performance ads for AI, SaaS & Personal Brands.'
  },
  robots: { index: true, follow: true }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${space.variable}`}>
      <body className="font-sans antialiased">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  )
}

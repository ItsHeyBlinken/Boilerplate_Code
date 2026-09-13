import type { Metadata } from 'next'
import { Libre_Baskerville, Source_Sans_3 } from 'next/font/google'
import { SiteHeader } from '@/components/SiteHeader'
import './globals.css'

const display = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-display',
})

const sans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME || 'Blog CMS',
  description: 'Lean Next.js blog and CMS starter with Prisma and PostgreSQL',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${display.variable} font-sans`}>
        <SiteHeader />
        <main className="mx-auto max-w-3xl px-4 py-10">{children}</main>
      </body>
    </html>
  )
}

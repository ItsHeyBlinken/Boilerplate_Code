import type { Metadata } from 'next'
import { Fraunces, Manrope } from 'next/font/google'
import { SiteHeader } from '@/components/SiteHeader'
import { TRPCProvider } from '@/trpc/Provider'
import './globals.css'

const display = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
})

const sans = Manrope({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME || 'tRPC Starter',
  description: 'Lean Next.js + tRPC + Prisma starter',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${display.variable}`}>
        <TRPCProvider>
          <SiteHeader />
          <main className="mx-auto max-w-2xl px-4 py-10">{children}</main>
        </TRPCProvider>
      </body>
    </html>
  )
}

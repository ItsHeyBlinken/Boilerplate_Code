import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Next.js Starter',
  description: 'A modern Next.js application with authentication and database integration',
  keywords: ['nextjs', 'react', 'typescript', 'tailwind', 'prisma', 'nextauth'],
  authors: [{ name: 'Your Name' }],
  openGraph: {
    title: 'Next.js Starter',
    description: 'A modern Next.js application with authentication and database integration',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
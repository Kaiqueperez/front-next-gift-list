'use client'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { ModalProvider, WishListProvider } from '@/contexts'

import ThemeRegistry from '@/theme/ThemeRegistry'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ModalProvider>
      <WishListProvider>
        <html lang="en">
          <ThemeRegistry>
            <body className={inter.className}>
              <Header />
              {children}
              <Footer />
            </body>
          </ThemeRegistry>
        </html>
      </WishListProvider>
    </ModalProvider>
  )
}

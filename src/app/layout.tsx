'use client'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { ModalProvider, WishListProvider } from '@/contexts'
import ThemeRegistry from '@/theme/ThemeRegistry'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ModalProvider>
      <html lang="pt-br">
        <WishListProvider>
          <ThemeRegistry>
            <body>
              <Header />
              {children}
              <Footer />
            </body>
          </ThemeRegistry>
        </WishListProvider>
      </html>
    </ModalProvider>
  )
}

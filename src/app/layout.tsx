'use client'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { ModalProvider, WishListProvider } from '@/contexts'
import ThemeRegistry from '@/theme/ThemeRegistry'
import Head from 'next/head'
import Script from 'next/script'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ModalProvider>
      <html lang="pt-br">
        <Script strategy='afterInteractive' async src="https://www.googletagmanager.com/gtag/js?id=G-1J3433RX9G" />
        <Script id='gtm-script'>
          {
            ` window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-1J3433RX9G');`
          }
        </Script>
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

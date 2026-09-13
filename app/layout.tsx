import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Chakra_Petch } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

import { CartProvider } from "@/components/cart-provider"
import { CartDrawer } from "@/components/cart-drawer"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { WhatsappFloat } from "@/components/whatsapp-float"
import { ScrollReveal } from "@/components/scroll-reveal"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const chakra = Chakra_Petch({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-chakra",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Elásticos 8 de Agosto | Elásticos y suspensión para camiones",
  description:
    "Fabricación, reparación y venta de elásticos, hojas, bujes, grampas y amortiguadores para camiones, acoplados y utilitarios. Taller propio en Ciudadela, Buenos Aires.",
  keywords: [
    "elásticos para camiones",
    "muelles de suspensión",
    "reparación de elásticos",
    "hojas de elástico",
    "bujes",
    "grampas",
    "Buenos Aires",
    "Podesta",
    "Elasticos",
    "taller de elasticos",
  ],
}

export const viewport: Viewport = {
  themeColor: "#0a192f",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`bg-background ${inter.variable} ${chakra.variable}`}>
      <body className="font-sans antialiased">
        <CartProvider>
          <SiteHeader />
          <main className="pt-[72px] lg:pt-[84px]">{children}</main>
          <SiteFooter />
          <WhatsappFloat />
          <CartDrawer />
        </CartProvider>
        <ScrollReveal />
        <Analytics />
      </body>
    </html>
  )
}

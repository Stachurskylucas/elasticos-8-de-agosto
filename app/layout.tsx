import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Chakra_Petch } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { WhatsappFloat } from "@/components/whatsapp-float"
import { ScrollReveal } from "@/components/scroll-reveal"
import { ScrollFx } from "@/components/scroll-fx"
import { Analitica } from "@/components/analitica"

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
  title: {
    default: "Elásticos 8 de Agosto | Elásticos y suspensión para camiones 6x4 y 8x4",
    template: "%s | Elásticos 8 de Agosto",
  },
  description:
    "Venta y reparación de elásticos, hojas, bujes, grampas y amortiguadores para camiones de carga pesada. Taller especializado en Pablo Podestá, Buenos Aires.",
  keywords: [
    "elásticos para camiones",
    "muelles de suspensión",
    "reparación de elásticos",
    "hojas de elástico",
    "bujes para camiones",
    "grampas de suspensión",
    "suspensión 6x4",
    "suspensión 8x4",
    "taller de elásticos Pablo Podestá",
    "Buenos Aires",
  ],
  metadataBase: new URL("https://elasticos8deagosto.com.ar"),
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: "Elásticos 8 de Agosto",
    title: "Elásticos 8 de Agosto | Suspensión para camiones de carga pesada",
    description:
      "Venta y reparación de elásticos para camiones 6x4 y 8x4. Taller propio en Pablo Podestá, Buenos Aires. Más de 30 años en el rubro.",
    images: [{ url: "/images/logo-full.png", width: 1200, height: 630, alt: "Elásticos 8 de Agosto" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Elásticos 8 de Agosto | Suspensión para camiones pesados",
    description:
      "Venta y reparación de elásticos para camiones 6x4 y 8x4. Taller propio en Pablo Podestá.",
    images: ["/images/logo-full.png"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://elasticos8deagosto.com.ar" },
}

export const viewport: Viewport = {
  themeColor: "#0a192f",
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  name: "Elásticos 8 de Agosto",
  description:
    "Venta y reparación de elásticos, hojas, bujes y grampas para camiones de carga pesada 6x4 y 8x4.",
  url: "https://elasticos8deagosto.com.ar",
  telephone: "+541146690000",
  email: "contacto@elasticos8deagosto.com.ar",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Pablo Podestá",
    addressRegion: "Buenos Aires",
    addressCountry: "AR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -34.5666772,
    longitude: -58.6213974,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "07:00",
      closes: "13:00",
    },
  ],
  priceRange: "$$",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.6",
    reviewCount: "50",
  },
  image: "https://elasticos8deagosto.com.ar/images/logo-full.png",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`bg-background ${inter.variable} ${chakra.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        <SiteHeader />
        <main className="pt-[72px] lg:pt-[84px]">{children}</main>
        <SiteFooter />
        <WhatsappFloat />
        <ScrollReveal />
        <ScrollFx />
        <Analytics />
        <Analitica />
      </body>
    </html>
  )
}

import type { Metadata } from "next"
import { preload } from "react-dom"
import { getAllBrands } from "@/lib/db/brands"
import { getAllCategories } from "@/lib/db/categories"
import { getAllProducts, publicProduct } from "@/lib/db/products"
import { CatalogoInformativo } from "./catalogo-informativo"

// El catálogo se renderiza en el servidor (visible para Google) y se regenera cada 5 minutos.
export const revalidate = 300

export const metadata: Metadata = {
  // El layout agrega " | Elásticos 8 de Agosto" con su template.
  title: "Catálogo de elásticos y repuestos para camiones",
  description:
    "Elásticos completos armados, hojas de recambio, bujes, grampas Grado 8/10.9, pernos y amortiguadores para camiones 6x4, 8x4 y utilitarios. Stock permanente en Pablo Podestá.",
  keywords: [
    "elásticos para camiones",
    "hojas de elástico",
    "paquetes de elásticos",
    "grampas U de elásticos",
    "bujes de goma",
    "suspensión camiones 6x4 8x4",
    "repuestos pesados Pablo Podestá",
    "elásticos zona oeste",
  ],
  alternates: {
    canonical: "/productos",
  },
  openGraph: {
    title: "Catálogo de Elásticos y Repuestos Pesados | Elásticos 8 de Agosto",
    description:
      "Stock físico permanente de elásticos completos, hojas maestras, grampas Grado 8 y bujes para camiones y acoplados.",
    url: "/productos",
    type: "website",
    locale: "es_AR",
    siteName: "Elásticos 8 de Agosto",
    images: [{ url: "/images/og-taller.jpg", width: 1200, height: 630, alt: "Catálogo Elásticos 8 de Agosto" }],
  },
}

const catalogSchema = {
  "@context": "https://schema.org",
  "@type": "AutoPartsStore",
  name: "Elásticos 8 de Agosto - Catálogo de Repuestos",
  description:
    "Distribución y provisión directa de elásticos completos, hojas, bujes, grampas y amortiguadores para camiones pesados 6x4 y 8x4.",
  url: "https://elasticos8deagosto.com.ar/productos",
  // Mismos datos NAP que el JSON-LD del layout (Google compara nombre, dirección y teléfono).
  telephone: "+541146690000",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Pablo Podestá",
    addressRegion: "Buenos Aires",
    addressCountry: "AR",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Líneas de Repuestos de Suspensión Pesada",
    itemListElement: [
      {
        "@type": "OfferCatalog",
        name: "Elásticos Completos Armados",
        description: "Delanteros, traseros y tándem 6x4 y 8x4 listos para colocar.",
      },
      {
        "@type": "OfferCatalog",
        name: "Hojas de Recambio Sueltas y Refuerzos",
        description: "Hojas maestras, segundas hojas y hojas de apoyo en acero templado.",
      },
      {
        "@type": "OfferCatalog",
        name: "Grampas, Abrazaderas U y Placas",
        description: "Acero Grado 8 y 10.9 para fijación crítica con tuercas altas.",
      },
      {
        "@type": "OfferCatalog",
        name: "Bujes y Soportes",
        description: "Goma vulcanizada y poliuretano inyectado de alta durabilidad.",
      },
      {
        "@type": "OfferCatalog",
        name: "Pernos Centrales y Grilletes",
        description: "Pernos capuchinos cementados y rectificados con alemites de engrase.",
      },
      {
        "@type": "OfferCatalog",
        name: "Amortiguadores y Tensores",
        description: "Doble efecto y gran cilindrada para tándem y balancines.",
      },
    ],
  },
}

export default async function ProductosPage() {
  // La foto del hero es un background CSS: sin esto el navegador la descubre tarde (LCP).
  preload("/images/banner-ruta.webp", { as: "image", fetchPriority: "high" })

  const [{ products }, categories, { brands }] = await Promise.all([
    getAllProducts(),
    getAllCategories(),
    getAllBrands(),
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(catalogSchema).replace(/</g, "\\u003c") }}
      />

      {/* ============ HERO ============ */}
      <section className="page-hero-bg relative py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="reveal max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-bold tracking-wider text-white uppercase">
                STOCK EN PABLO PODESTÁ
              </span>
            </div>

            <h1 className="mb-5 font-display text-4xl font-bold leading-[1.05] text-white md:text-6xl">
              <span className="text-brand">CATÁLOGO</span> DE REPUESTOS
            </h1>

            <p className="text-base leading-relaxed text-white/85 md:text-lg">
              Elásticos armados, hojas sueltas, grampas y bujes para camiones.
              Lo que ves acá lo tenemos en el depósito.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              ¿No sabés la medida? Mandanos por WhatsApp la marca y el modelo, o una foto, y te decimos
              cuál es y cuánto sale.
            </p>
          </div>
        </div>
      </section>

      {/* ============ CATÁLOGO INFORMATIVO, ESTANTERÍAS Y FORMULARIO DE CONTACTO ============ */}
      <CatalogoInformativo
        initialProducts={products.map(publicProduct)}
        initialCategories={categories}
        initialBrands={brands.map(({ id, name }) => ({ id, name }))}
      />
    </>
  )
}

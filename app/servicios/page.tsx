import type { Metadata } from "next"
import Link from "next/link"
import { preload } from "react-dom"
import {
  Camera,
  CircleDot,
  ClipboardList,
  Layers,
  MessageSquare,
  MoveDiagonal,
  Search,
  Truck,
  Waves,
  Wrench,
} from "lucide-react"
import { wa } from "@/lib/site"
import { TallerCarousel, type WorkshopPhoto } from "@/components/taller-carousel"
import { TrabajosGallery } from "@/components/trabajos-gallery"

export const metadata: Metadata = {
  // El layout agrega " | Elásticos 8 de Agosto" con su template.
  title: "Taller de suspensión para camiones 6x4 y 8x4",
  description:
    "Reparación de elásticos, bujes, tensores y alineación para camiones 6x4 y 8x4. Taller propio en Pablo Podestá, Buenos Aires.",
  alternates: { canonical: "/servicios" },
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: "Elásticos 8 de Agosto",
    url: "/servicios",
    title: "Servicios de taller | Elásticos 8 de Agosto",
    description: "Reparación de elásticos, bujes, tensores y alineación para camiones 6x4 y 8x4 en Pablo Podestá.",
    images: [{ url: "/images/og-taller.jpg", width: 1200, height: 630, alt: "Taller Elásticos 8 de Agosto" }],
  },
}

const TALLER_FOTOS: WorkshopPhoto[] = [
  {
    src: "/images/taller/camion-volcador.webp",
    alt: "Camión volcador Ford Cargo dentro de la nave del taller",
    title: "LUGAR PARA CAMIONES GRANDES",
    desc: "Entran 6x4, 8x4, acoplados y semirremolques.",
    tag: "LA NAVE",
  },
  {
    src: "/images/taller/pared-hojas-elevador.webp",
    alt: "Pared con cientos de hojas de elástico y elevador de dos columnas",
    title: "LA PARED DE HOJAS",
    desc: "Cientos de hojas colgadas por medida. Si hay que cambiar una, la buscamos acá.",
    tag: "STOCK",
  },
  {
    src: "/images/taller/rack-elasticos-2.webp",
    alt: "Racks de elásticos para camiones y utilitarios",
    title: "ELÁSTICOS ARMADOS",
    desc: "Para camiones, acoplados y utilitarios. Los más pedidos están para llevar.",
    tag: "DEPÓSITO",
  },
  {
    src: "/images/taller/elastico-prensa.webp",
    alt: "Paquete de elástico montado en la prensa de trabajo",
    title: "ARMADO DE PAQUETES",
    desc: "El paquete va a la prensa para desarmarlo, cambiar lo que haga falta y volver a ajustarlo.",
    tag: "MAQUINARIA",
  },
  {
    src: "/images/taller/sector-herramientas.webp",
    alt: "Sector de herramientas con yunque, cortadora y cajoneras",
    title: "EL BANCO DE TRABAJO",
    desc: "Yunque, cortadora y cajoneras llenas de bulonería.",
    tag: "HERRAMENTAL",
  },
  {
    src: "/images/taller/pared-hojas-autoelevador.webp",
    alt: "Pared de hojas de elástico con autoelevador y taladro de banco",
    title: "AUTOELEVADOR",
    desc: "Un elástico de 8x4 no se levanta a mano. Lo movemos con el autoelevador.",
    tag: "EQUIPAMIENTO",
  },
  {
    src: "/images/taller/rack-elasticos-1.webp",
    alt: "Detalle de elásticos con bujes en estanterías",
    title: "MARCADOS POR MODELO",
    desc: "Cada elástico tiene escrita la marca y el modelo. Así encontramos rápido el tuyo.",
    tag: "DEPÓSITO",
  },
  {
    src: "/images/taller/nave-interior.webp",
    alt: "Interior de la nave del taller con prensas y máquinas",
    title: "DONDE SE ARMA TODO",
    desc: "Prensas, soldadoras y hojas a mano, todo en la misma nave.",
    tag: "LA NAVE",
  },
]

const SERVICIOS = [
  {
    icon: Truck,
    t: "CAMIONES 6X4 Y 8X4",
    d: "Suspensiones tándem, bogies y balancines. Reparamos, alineamos y reforzamos.",
  },
  {
    icon: Waves,
    t: "CURVADO DE ELÁSTICOS",
    d: "En frío o en caliente, según cómo esté el acero. El elástico vuelve a su flecha original.",
  },
  {
    icon: CircleDot,
    t: "BUJES Y SOPORTES",
    d: "Si el camión golpea o hace ruido atrás, casi siempre son los bujes. Los cambiamos por goma o poliuretano.",
  },
  {
    icon: MoveDiagonal,
    t: "TENSORES",
    d: "Un tensor flojo hace que el eje se mueva. Con uno nuevo el camión vuelve a ir derecho.",
  },
  {
    icon: Layers,
    t: "ALINEACIÓN",
    d: "Nivelamos chasis y ejes para que las cubiertas se gasten parejo.",
  },
  {
    icon: ClipboardList,
    t: "REFUERZOS",
    d: "Hojas de más en el paquete para camiones que trabajan con sobrecarga.",
  },
  {
    icon: Wrench,
    t: "GRAMPAS, PERNOS Y GRILLETES",
    d: "Grampas grado 8 y 10.9, pernos de centro y grilletes nuevos.",
  },
  {
    icon: Search,
    t: "REVISIÓN COMPLETA",
    d: "Antes de un viaje largo, revisamos toda la suspensión y te avisamos si hay fisuras o desgaste.",
  },
]

export default function ServiciosPage() {
  // La foto del hero es un background CSS: sin esto el navegador la descubre tarde (LCP).
  preload("/images/banner-ruta.webp", { as: "image", fetchPriority: "high" })

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="page-hero-bg py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-bold tracking-wider text-white uppercase">
              TALLER PROPIO EN PABLO PODESTÁ
            </span>
          </div>

          <h1 className="mb-4 font-display text-4xl font-bold leading-[0.95] text-white md:text-6xl">
            <span className="block">
              QUÉ HACEMOS EN EL <span className="text-brand">TALLER</span>
            </span>
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
            Elásticos, bujes, tensores y alineación. Traé el camión, desde un utilitario hasta un 8x4.
          </p>
        </div>
      </section>

      {/* ============ SERVICIOS (blanco) ============ */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          {/* Banner 6x4/8x4 */}
          <div className="reveal mb-14 flex flex-col items-center justify-between gap-6 rounded-2xl border border-slate-200/90 bg-slate-50/70 p-6 shadow-sm transition-all hover:bg-white hover:shadow-md md:flex-row md:p-8">
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                <Truck className="h-6 w-6" />
              </span>
              <div>
                <span className="text-xs font-bold tracking-wider text-brand uppercase">
                  Camiones grandes
                </span>
                <h3 className="font-display text-xl font-bold text-dark sm:text-2xl">
                  Suspensión para 6x4 y 8x4
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">
                  No cualquier taller tiene lugar para un 8x4. Nosotros sí: prensas hidráulicas y espacio
                  para tándem, balancines, bateas, tolvas, camiones de cantera y hormigoneros.
                </p>
              </div>
            </div>
            <a
              href={wa("Hola! Quiero consultar por reparación de suspensión para camión 6x4 / 8x4.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-brand flex shrink-0 items-center gap-2 rounded-none px-6 py-3.5 text-xs font-bold text-white"
            >
              AVISAR QUE VOY <span>→</span>
            </a>
          </div>

          {/* Grilla */}
          <div className="reveal mb-12 max-w-2xl">
            <p className="mb-3 text-sm font-bold tracking-[0.2em] text-brand">TRABAJOS</p>
            <h2 className="font-display text-3xl font-bold text-dark md:text-5xl">
              LO QUE REPARAMOS
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICIOS.map((s) => {
              const Icon = s.icon
              return (
                <div
                  key={s.t}
                  className="reveal service-card rounded-2xl border border-slate-200 bg-light p-6 transition-all hover:border-brand/40 hover:shadow-md"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-brand/10">
                    <Icon className="h-6 w-6 text-brand" />
                  </div>
                  <h3 className="mb-2 font-display text-base font-bold text-dark">{s.t}</h3>
                  <p className="text-sm leading-relaxed text-slate-500">{s.d}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ============ GALERÍA TRABAJOS REALES ============ */}
      <section className="border-t border-slate-200 bg-[#0a192f] py-20 md:py-24 text-white">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="reveal mb-12">
            <p className="mb-2 text-xs font-bold tracking-[0.2em] text-brand uppercase">
              GALERÍA
            </p>
            <h2 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              ASÍ <span className="text-brand">TRABAJAMOS</span>
            </h2>
            <p className="mt-3 max-w-xl text-sm text-white/70 md:text-base">
              El taller, los repuestos y algunos de los camiones que pasaron por acá. Tocá una foto para verla grande.
            </p>

            <div className="mt-6">
              <a
                href={wa("Hola! Quiero consultar por un trabajo para mi camión / vehículo.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whats inline-flex items-center gap-2 rounded-none px-7 py-3.5 text-xs font-bold text-white shadow-lg transition-all hover:scale-105"
              >
                <MessageSquare className="h-4 w-4" />
                CONTANOS QUÉ NECESITÁS <span>→</span>
              </a>
            </div>
          </div>

          <div className="reveal">
            <TrabajosGallery />
          </div>
        </div>
      </section>

      {/* ============ TALLER POR DENTRO — CARRUSEL ============ */}
      <section className="bg-white py-20 md:py-24 border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="reveal mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <div className="mb-3 inline-flex items-center gap-2 text-sm font-bold tracking-[0.2em] text-brand">
                <Camera className="h-4 w-4" />
                EL TALLER
              </div>
              <h2 className="font-display text-3xl font-bold text-dark md:text-5xl">
                EL TALLER POR DENTRO
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
                La nave, las prensas y el stock de hojas. Si querés verlo en persona, pasá: estamos en Pablo Podestá.
              </p>
            </div>
            <Link
              href="/productos"
              className="btn btn-ghost-dark link-arrow flex items-center gap-2 rounded-none border-2 border-dark px-5 py-3 text-sm text-dark"
            >
              VER CATÁLOGO DE REPUESTOS <span>→</span>
            </Link>
          </div>

          <div className="reveal">
            <TallerCarousel photos={TALLER_FOTOS} />
          </div>
        </div>
      </section>
    </>
  )
}

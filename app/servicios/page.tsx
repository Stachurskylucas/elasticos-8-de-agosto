import type { Metadata } from "next"
import Link from "next/link"
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
  title: "Servicios de Taller | Elásticos 8 de Agosto — Especialistas en Suspensión Pesada",
  description:
    "Especialistas en reparación y suspensión de camiones 6x4 y 8x4. Curvado de elásticos, bujes, tensores, balancines y alineación en Pablo Podestá, Buenos Aires.",
}

// ============================================================
// FOTOS DEL TALLER
// ============================================================
const TALLER_FOTOS: WorkshopPhoto[] = [
  {
    src: "/images/taller-interior.png",
    alt: "Fosas especializadas para camiones pesados 6x4 y 8x4",
    title: "FOSAS DE ALTA CAPACIDAD 6X4 & 8X4",
    desc: "Instalaciones pesadas preparadas para recibir camiones de gran porte, chasis 6x4, 8x4, acoplados y semirremolques.",
    tag: "INFRAESTRUCTURA",
  },
  {
    src: "/images/hero-taller.png",
    alt: "Banco de forja y curvado de elásticos",
    title: "CURVADO Y TRABAJO EN CALIENTE",
    desc: "Prensas hidráulicas pesadas y hornos de forja para devolver la flecha, curvatura y resistencia original del acero.",
    tag: "MAQUINARIA",
  },
  {
    src: "/images/detalle-elastico.png",
    alt: "Banco de trabajo con herramientas y repuestos de suspensión",
    title: "ARMADO Y RECAMBIO DE PAQUETES",
    desc: "Herramental específico para el desarme seguro y ajuste de grampas, pernos centrales y bujes de suspensión.",
    tag: "HERRAMENTAL",
  },
  {
    src: "/images/banner-ruta.png",
    alt: "Unidades en servicio y puesta a punto final",
    title: "ALINEACIÓN Y CONTROL FINAL",
    desc: "Nivelación exacta de ejes tándem y control integral de suspensión para máxima estabilidad en ruta y cuidado de neumáticos.",
    tag: "CONTROL EN RUTA",
  },
]

const SERVICIOS = [
  {
    icon: Truck,
    t: "ESPECIALIDAD 6X4 Y 8X4",
    d: "Reparación integral, alineación y refuerzo de suspensiones tándem, bogies y balancines para camiones de carga pesada.",
  },
  {
    icon: Waves,
    t: "CURVADO DE ELÁSTICOS",
    d: "Restauramos elásticos dañados con curvado profesional en frío y en caliente, devolviendo la geometría original.",
  },
  {
    icon: CircleDot,
    t: "CAMBIO DE BUJES Y SILENTBLOCKS",
    d: "Reemplazo de bujes de goma y poliuretano para eliminar ruidos y mejorar la estabilidad de la unidad.",
  },
  {
    icon: MoveDiagonal,
    t: "CAMBIO DE TENSORES",
    d: "Reemplazamos tensores de suspensión desgastados para recuperar firmeza y control en la ruta.",
  },
  {
    icon: Layers,
    t: "ALINEACIÓN DE SUSPENSIÓN",
    d: "Alineamos y nivelamos el chasis y ejes tándem para un desgaste parejo de neumáticos y mejor manejo.",
  },
  {
    icon: ClipboardList,
    t: "ARMADO DE REFUERZOS A MEDIDA",
    d: "Ensamblamos paquetes de hojas adicionales para soportar sobrecarga en trabajo severo y fuera de ruta.",
  },
  {
    icon: Wrench,
    t: "GRAMPAS, PERNOS Y GRILLETES",
    d: "Cambio de grampas en acero grado 8/10.9, pernos centrales y grilletes para una fijación segura.",
  },
  {
    icon: Search,
    t: "DIAGNÓSTICO INTEGRAL",
    d: "Evaluamos el estado completo de la suspensión para detectar desgastes o fisuras antes de que fallen.",
  },
]

export default function ServiciosPage() {
  return (
    <>
      {/* ============ PAGE HERO ============ */}
      <section className="page-hero-bg py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-bold tracking-wider text-white uppercase">
              TALLER PROPIO & FOSAS PESADAS
            </span>
          </div>

          <h1 className="mb-4 font-display text-4xl font-bold leading-[0.95] text-white md:text-6xl">
            <span className="block">
              NUESTROS <span className="text-brand">SERVICIOS</span>
            </span>
            <span className="block text-white">DE TALLER</span>
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
            Reparación de elásticos, bujes, tensores y alineación de suspensión. Especialistas en
            camiones de carga pesada 6x4 y 8x4.
          </p>
        </div>
      </section>

      {/* ============ SECCIÓN INTEGRADA: BANNER 6X4/8X4 + DETALLE DE SERVICIOS (blanco continuo) ============ */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          {/* Tarjeta destacada 6x4 y 8x4 integrada directamente arriba */}
          <div className="mb-14 flex flex-col items-center justify-between gap-6 rounded-2xl border border-slate-200/90 bg-slate-50/70 p-6 shadow-sm transition-all hover:bg-white hover:shadow-md md:flex-row md:p-8">
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                <Truck className="h-6 w-6" />
              </span>
              <div>
                <span className="text-xs font-bold tracking-wider text-brand uppercase">
                  Ventaja & Diferencial Exclusivo
                </span>
                <h3 className="font-display text-xl font-bold text-dark sm:text-2xl">
                  Líderes en Suspensión para Camiones 6x4 y 8x4
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">
                  Tenemos la infraestructura, prensas hidráulicas y fosas preparadas para recibir
                  unidades con tandem trasero, ejes balancines y camiones de carga extrapesada
                  (bateas, tolvas, canteras y hormigoneros).
                </p>
              </div>
            </div>
            <a
              href={wa("Hola! Quiero consultar por reparación de suspensión para camión 6x4 / 8x4.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-brand flex shrink-0 items-center gap-2 rounded-none px-6 py-3.5 text-xs font-bold text-white"
            >
              COORDINAR ATENCIÓN <span>→</span>
            </a>
          </div>

          {/* Título de la grilla de servicios */}
          <div className="mb-12 max-w-2xl">
            <p className="mb-3 text-sm font-bold tracking-[0.2em] text-brand">TRABAJO DE TALLER</p>
            <h2 className="font-display text-3xl font-bold text-dark md:text-5xl">
              TODO LO QUE REPARAMOS
            </h2>
          </div>

          {/* Grilla de servicios */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICIOS.map((s) => {
              const Icon = s.icon
              return (
                <div
                  key={s.t}
                  className="service-card rounded-2xl border border-slate-200 bg-light p-6 transition-all hover:border-brand/40 hover:shadow-md"
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

      {/* ============ TRABAJOS REALES — GALERÍA SOLO FOTOS CON LIGHTBOX ============ */}
      <section className="border-t border-slate-200 bg-[#0a192f] py-20 md:py-24 text-white">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-12">
            <p className="mb-2 text-xs font-bold tracking-[0.2em] text-brand uppercase">
              GALERÍA DE TALLER
            </p>
            <h2 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              TRABAJOS <span className="text-brand">REALES</span>
            </h2>
            <p className="mt-3 max-w-xl text-sm text-white/70 md:text-base">
              Fotos de nuestras fosas, reparaciones de suspensión y unidades atendidas. Clic en
              cualquier foto para ampliar en pantalla completa.
            </p>

            {/* Botón de contacto debajo del título */}
            <div className="mt-6">
              <a
                href={wa("Hola! Quiero consultar por un trabajo para mi camión / vehículo.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whats inline-flex items-center gap-2 rounded-none px-7 py-3.5 text-xs font-bold text-white shadow-lg transition-all hover:scale-105"
              >
                <MessageSquare className="h-4 w-4" />
                CONSULTAR POR TU TRABAJO <span>→</span>
              </a>
            </div>
          </div>

          {/* Galería Interactiva con Lightbox */}
          <TrabajosGallery />
        </div>
      </section>

      {/* ============ NUESTRO TALLER EN ACCIÓN — CARRUSEL DESLIZABLE (blanco) ============ */}
      <section className="bg-white py-20 md:py-24 border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="reveal mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <div className="mb-3 inline-flex items-center gap-2 text-sm font-bold tracking-[0.2em] text-brand">
                <Camera className="h-4 w-4" />
                INSTALACIONES & EQUIPAMIENTO
              </div>
              <h2 className="font-display text-3xl font-bold text-dark md:text-5xl">
                NUESTRO TALLER POR DENTRO
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
                Fosas de gran porte, prensas de curvado en caliente y herramental especializado para
                camiones pesados y semirremolques.
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

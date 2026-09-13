import type { Metadata } from "next"
import { CatalogoInformativo } from "./catalogo-informativo"

export const metadata: Metadata = {
  title: "Catálogo de Elásticos y Repuestos | Elásticos 8 de Agosto",
  description:
    "Elásticos completos, hojas de recambio, bujes, grampas, pernos, amortiguadores y tensores para camiones, acoplados y utilitarios. Provisión y distribución directa.",
}

export default function ProductosPage() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="page-hero-bg relative py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-bold tracking-wider text-white uppercase">
                STOCK PERMANENTE & DISTRIBUCIÓN DIRECTA
              </span>
            </div>

            <h1 className="mb-5 font-display text-4xl font-bold leading-[1.05] text-white md:text-6xl">
              NUESTRO <span className="text-brand">CATÁLOGO</span> DE REPUESTOS
            </h1>

            <p className="text-base leading-relaxed text-white/80 md:text-lg">
              Conocé todas las líneas de suspensión pesada que distribuimos y proveemos. Te asesoramos
              de forma directa y personalizada: consultanos por medidas, compatibilidad o cotización
              inmediata para tu flota.
            </p>
          </div>
        </div>
      </section>

      {/* ============ CATÁLOGO INFORMATIVO, ESTANTERÍAS Y FORMULARIO DE CONTACTO ============ */}
      <CatalogoInformativo />
    </>
  )
}

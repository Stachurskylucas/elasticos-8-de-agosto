import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  Boxes,
  Check,
  MessageSquare,
  Settings,
  Shield,
  Star,
  Truck,
  Wrench,
  Zap,
} from "lucide-react"
import { wa } from "@/lib/site"
import { FaqAccordion } from "@/components/faq-accordion"
import { BrandLogosSlider } from "@/components/brand-logos-slider"
import { VehicleCardsInteractive } from "@/components/vehicle-cards-interactive"
import { GoogleReviewsSection } from "@/components/google-reviews-section"

const PRODUCT_CATEGORIES = [
  {
    id: "elasticos-completos",
    title: "ELÁSTICOS COMPLETOS",
    desc: "Paquetes armados delanteros, traseros y tándem 6x4/8x4 listos para montar. Alta resistencia para carga pesada.",
    image: "/images/prod-elasticos.png",
    tag: "6x4 · 8x4 · Pesados",
  },
  {
    id: "hojas-recambio",
    title: "HOJAS DE RECAMBIO",
    desc: "Hojas maestras, 2das hojas con envoltura de seguridad y refuerzos para sobrecarga en todas las marcas.",
    image: "/images/prod-hojas.png",
    tag: "Refuerzos & Stock",
  },
  {
    id: "grampas-abrazaderas",
    title: "GRAMPAS Y FIJACIÓN",
    desc: "Grampas U en acero grado 8/10.9, tuercas altas, placas de asiento y pernos de centro para ejes pesados.",
    image: "/images/prod-grampas.png",
    tag: "Seguridad Crítica",
  },
  {
    id: "bujes-silentblocks",
    title: "BUJES Y AMORTIGUADORES",
    desc: "Bujes vulcanizados, silentblocks de poliuretano, amortiguadores pesados y tensores para balancines y tándem.",
    image: "/images/prod-bujes.png",
    tag: "Conducción Firme",
  },
]

const REPARACIONES = [
  {
    t: "ESPECIALISTAS EN CAMIONES 6X4 Y 8X4",
    d: "Reparación, refuerzo y nivelación integral de suspensión para camiones de carga pesada, bateas, volcadores y tolvas.",
  },
  {
    t: "REPARACIÓN Y CURVADO DE ELÁSTICOS",
    d: "Restauramos elásticos dañados con curvado profesional en frío y en caliente, devolviendo la geometría original.",
  },
  {
    t: "CAMBIO DE BUJES, BALANCINES Y TENSORES",
    d: "Reemplazamos bujes y tensores desgastados en ejes simples y tándem para eliminar ruidos y recuperar estabilidad.",
  },
  {
    t: "ALINEACIÓN Y ARMADO DE REFUERZOS",
    d: "Alineamos el chasis y ensamblamos paquetes de hojas de alta resistencia según el tonelaje real de tu unidad.",
  },
]

const FAQS = [
  {
    q: "¿Se especializan en camiones de carga 6x4 y 8x4?",
    a: "Sí, es una de nuestras principales especialidades. Contamos con fosas pesadas, herramental de alto porte y repuestos reforzados para suspensiones tándem, bogies y balancines de camiones 6x4 y 8x4 (bateas, volcadores, hormigoneros y chasis extrapesados).",
  },
  {
    q: "¿Hacen envíos al interior del país?",
    a: "Sí. Despachamos paquetes de elásticos, hojas y repuestos a todas las provincias en el día mediante los principales expresos del país, con número de seguimiento inmediato.",
  },
  {
    q: "¿Necesito sacar turno para llevar mi camión al taller?",
    a: "Recomendamos coordinar turno para trabajos programados en fosas, pero atendemos urgencias de ruta y roturas en el día en nuestro taller de Pablo Podestá.",
  },
  {
    q: "¿Trabajan con todas las marcas de camiones y acoplados?",
    a: "Sí, trabajamos con Scania, Volvo, Mercedes-Benz, Iveco, Ford, Volkswagen, Renault y marcas líderes de semirremolques como Randon, Helvetica, Montenegro y Cormetal.",
  },
  {
    q: "¿Qué garantía tienen los repuestos y reparaciones?",
    a: "Todos nuestros repuestos de fábrica y trabajos mecánicos en taller cuentan con garantía total sobre materiales, calidad de acero y mano de obra especializada.",
  },
]

export default function HomePage() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="hero-bg relative flex min-h-[88vh] items-center py-24">
        <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
          <div className="max-w-2xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_8px_20px_rgba(0,0,0,0.25)] backdrop-blur-md sm:mb-8 sm:px-4">
              <span className="text-xs leading-none">⭐</span>
              <span className="text-[10px] font-bold tracking-wider text-white sm:text-[11px]">
                ESPECIALISTAS EN CAMIONES 6X4 & 8X4 · SUSPENSIÓN PESADA
              </span>
            </div>

            <h1 className="mb-6 font-display font-bold leading-[0.95] text-white">
              <span className="block text-5xl sm:text-6xl md:text-7xl">ELÁSTICOS</span>
              <span className="block text-5xl text-brand sm:text-6xl md:text-7xl">8 DE AGOSTO</span>
            </h1>

            <p className="mb-9 max-w-xl text-base leading-relaxed text-white/90 md:text-lg">
              Más de 30 años de trayectoria en provisión, refuerzo y reparación de suspensión.
              Especialistas en camiones de carga pesada <strong className="text-white font-bold">6x4 y 8x4</strong>,
              bateas, volcadores y flotas de transporte en Argentina.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/productos"
                className="btn btn-brand link-arrow flex items-center justify-center gap-2 rounded-none px-7 py-4 text-center text-white"
              >
                VER CATÁLOGO <span>→</span>
              </Link>
              <Link
                href="/servicios"
                className="btn btn-outline-light flex items-center justify-center rounded-none border-2 border-white/70 px-7 py-4 text-center text-white"
              >
                SERVICIOS DE TALLER
              </Link>
            </div>
          </div>
        </div>

        <svg
          className="absolute bottom-0 right-0 hidden opacity-20 md:block"
          width="420"
          height="260"
          viewBox="0 0 420 260"
          fill="none"
          aria-hidden="true"
        >
          <path d="M20 220C120 150 300 150 400 220" stroke="#0088cc" strokeWidth="3" />
          <path d="M40 180C130 120 290 120 380 180" stroke="#ffffff" strokeWidth="2" />
          <path d="M60 140C140 95 280 95 360 140" stroke="#0088cc" strokeWidth="2" />
        </svg>
      </section>

      {/* ============ SOLUCIONES INTEGRALES (blanco) ============ */}
      <section className="bg-white py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="reveal mx-auto mb-14 max-w-2xl text-center">
            <p className="mb-3 text-sm font-bold tracking-[0.2em] text-brand">
              LO QUE HACEMOS POR TU FLOTA
            </p>
            <h2 className="mb-5 font-display text-3xl font-bold text-dark md:text-5xl">
              SOLUCIONES INTEGRALES
            </h2>
            <p className="text-base leading-relaxed text-slate-500 md:text-lg">
              Cubrimos todo el ciclo de la suspensión: desde la provisión directa del repuesto exacto
              hasta la mano de obra especializada para instalarlo en camiones 4x2, 6x2, 6x4 y 8x4.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="solution-card reveal rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-brand/10">
                <Boxes className="h-7 w-7 text-brand" />
              </div>
              <h3 className="mb-3 font-display text-xl font-bold text-dark">STOCK DE REPUESTOS</h3>
              <p className="mb-6 leading-relaxed text-slate-500">
                Provisión directa de fábrica de paquetes armados, hojas de recambio, grampas y bujes para todas las configuraciones.
              </p>
              <Link
                href="/productos"
                className="link-arrow inline-flex items-center gap-1.5 text-sm font-bold text-brand"
              >
                VER CATÁLOGO INFORMATIVO <span>→</span>
              </Link>
            </div>

            <div className="solution-card reveal rounded-2xl border-t-4 border-brand bg-dark p-8 shadow-lg">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-white/10">
                <Settings className="h-7 w-7 text-brand" />
              </div>
              <h3 className="mb-3 font-display text-xl font-bold text-white">
                TALLER ESPECIALIZADO
              </h3>
              <p className="mb-6 leading-relaxed text-white/70">
                Fosas de gran porte preparadas para desarme de ejes simples y tándem 6x4/8x4. Curvamos y restauramos la geometría original.
              </p>
              <Link
                href="/servicios"
                className="link-arrow inline-flex items-center gap-1.5 text-sm font-bold text-brand"
              >
                VER SERVICIOS <span>→</span>
              </Link>
            </div>

            <div className="solution-card reveal rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-brand/10">
                <Wrench className="h-7 w-7 text-brand" />
              </div>
              <h3 className="mb-3 font-display text-xl font-bold text-dark">ARMADO Y REFUERZOS</h3>
              <p className="mb-6 leading-relaxed text-slate-500">
                Curvamos, ensamblamos y reforzamos paquetes y hojas según la carga real y exigencia severa de tu camión.
              </p>
              <a
                href={wa("Hola! Quiero consultar por armado / refuerzo de elásticos para mi camión.")}
                target="_blank"
                rel="noopener noreferrer"
                className="link-arrow inline-flex items-center gap-1.5 text-sm font-bold text-brand"
              >
                CONSULTAR REFUERZOS <span>→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============ NUESTRAS LÍNEAS DE REPUESTOS (gris) ============ */}
      <section className="section-gray py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="reveal mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="mb-2 text-sm font-bold tracking-[0.2em] text-brand">SHOWROOM DE SUSPENSIÓN</p>
              <h2 className="font-display text-2xl font-bold text-dark md:text-4xl">
                NUESTRAS LÍNEAS DE REPUESTOS
              </h2>
              <p className="mt-2 text-sm text-slate-600 max-w-xl">
                Stock permanente y provisión directa para todas las marcas de camiones 6x4, 8x4, semirremolques y utilitarios.
              </p>
            </div>
            <Link
              href="/productos"
              className="btn btn-ghost-dark link-arrow flex items-center gap-2 rounded-none border-2 border-dark px-5 py-3 text-sm text-dark"
            >
              VER CATÁLOGO COMPLETO <span>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PRODUCT_CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={`/productos#${cat.id}`}
                className="quick-card reveal group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-lg"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-none bg-dark/85 px-2.5 py-0.5 text-[10px] font-bold text-brand backdrop-blur-sm">
                    {cat.tag}
                  </span>
                </div>
                <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    <h3 className="font-display text-base font-bold text-dark group-hover:text-brand transition-colors">
                      {cat.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-slate-500">
                      {cat.desc}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                    <span className="text-xs font-bold text-brand">Ver detalles & cotizar</span>
                    <ArrowRight className="h-4 w-4 text-brand transition-transform duration-200 group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ MARCAS QUE ATENDEMOS ============ */}
      <section className="bg-white pt-8 pb-14 md:pt-10 md:pb-18">
        {/* Deslizador de marcas arriba a 100% de ancho sin líneas divisorias */}
        <div className="w-full overflow-hidden mb-10 md:mb-12">
          <BrandLogosSlider bgClassName="bg-white" showGradients={false} />
        </div>

        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="reveal mx-auto mb-10 max-w-3xl text-center">
            <p className="mb-2 text-xs font-bold tracking-[0.2em] text-brand uppercase">
              COBERTURA & ATENCIÓN DE FLOTAS
            </p>
            <h2 className="font-display text-3xl font-bold text-dark md:text-5xl">
              MARCAS QUE ATENDEMOS
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600 md:text-lg">
              Reparación, refuerzo de elásticos y provisión de repuestos para las principales marcas
              del transporte pesado, semirremolques y utilitarios comerciales.
            </p>
          </div>

          {/* Tarjetas Visuales Grandes con Carrusel de Múltiples Fotos por Categoría */}
          <VehicleCardsInteractive />

          {/* Botón rectangular azul a Servicios */}
          <div className="mt-10 text-center">
            <Link
              href="/servicios"
              className="btn btn-brand link-arrow inline-flex items-center gap-2 rounded-none px-8 py-4 text-xs font-bold text-white shadow-md transition-all hover:shadow-lg"
            >
              VER NUESTROS SERVICIOS DE TALLER <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ============ TALLER PROPIO — PARALLAX ============ */}
      <section className="parallax-taller relative py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="reveal mb-10 max-w-3xl">
            <p className="mb-3 text-sm font-bold tracking-[0.2em] text-brand">TALLER PROPIO</p>
            <h2 className="mb-4 font-display text-3xl font-bold text-white md:text-4xl">
              ESPECIALISTAS EN <span className="text-brand">6X4 Y 8X4</span>
            </h2>
            <p className="text-lg leading-relaxed text-white/80">
              Nacimos en el taller y entendemos la exigencia de la carga pesada. Reparamos bujes,
              elásticos, balancines, tensores y hacemos alineación integral en camiones 6x4, 8x4,
              bateas y tolvas con técnicos de décadas de experiencia.
            </p>
          </div>

          <ul className="reveal grid gap-6 md:grid-cols-2">
            {REPARACIONES.map((r) => (
              <li key={r.t} className="flex gap-4">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand/20">
                  <Check className="h-4 w-4 text-brand" />
                </span>
                <div>
                  <h3 className="mb-1 font-display text-base font-bold tracking-wide text-white">
                    {r.t}
                  </h3>
                  <p className="text-base leading-relaxed text-white/65">{r.d}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="reveal mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/servicios"
              className="btn btn-outline-light rounded-none border-2 border-white/40 px-6 py-3.5 text-center text-white"
            >
              VER SERVICIOS DE TALLER
            </Link>
            <a
              href={wa("Hola! Necesito consultar por reparación de suspensión para camión 6x4 / 8x4.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whats rounded-none px-6 py-3.5 text-center text-white shadow-lg"
            >
              CONSULTAR POR WHATSAPP
            </a>
          </div>
        </div>
      </section>

      {/* ============ SECCIÓN DE RESEÑAS GOOGLE (debajo de taller propio y arriba de FAQ) ============ */}
      <GoogleReviewsSection />

      {/* ============ FAQ CON ACORDEÓN FLUIDO (blanco) ============ */}
      <section className="bg-white py-20 md:py-24">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <div className="reveal mb-12 text-center">
            <p className="mb-3 text-sm font-bold tracking-[0.2em] text-brand">DUDAS FRECUENTES</p>
            <h2 className="font-display text-3xl font-bold text-dark md:text-5xl">
              PREGUNTAS FRECUENTES
            </h2>
            <p className="mt-3 text-sm text-slate-500 md:text-base">
              Respuestas rápidas a las consultas más comunes sobre nuestros repuestos, envíos y
              servicios de taller especializado.
            </p>
          </div>

          <div className="reveal">
            <FaqAccordion items={FAQS} />
          </div>
        </div>
      </section>
    </>
  )
}

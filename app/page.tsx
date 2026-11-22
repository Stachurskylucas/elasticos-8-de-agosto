import Image from "next/image"
import Link from "next/link"
import { Boxes, Check, Wrench } from "lucide-react"
import { wa } from "@/lib/site"
import { FaqAccordion } from "@/components/faq-accordion"
import { BrandLogosSlider } from "@/components/brand-logos-slider"
import { VehicleCardsInteractive } from "@/components/vehicle-cards-interactive"
import { GoogleReviewsSection } from "@/components/google-reviews-section"
import { PartsExplorer } from "@/components/parts-explorer"

const REPARACIONES = [
  {
    t: "CAMIONES 6X4 Y 8X4",
    d: "Bateas, volcadores y tolvas. Reparamos, reforzamos y nivelamos la suspensión.",
  },
  {
    t: "CURVADO DE ELÁSTICOS",
    d: "Con el uso el elástico pierde la flecha. Lo curvamos en frío o en caliente hasta que vuelve a su medida.",
  },
  {
    t: "BUJES, BALANCINES Y TENSORES",
    d: "Cambiamos los que están gastados, en eje simple o en tándem.",
  },
  {
    t: "ALINEACIÓN Y REFUERZOS",
    d: "Alineamos el chasis y armamos el paquete para la carga que realmente llevás.",
  },
]

const FAQS = [
  {
    q: "¿Qué trabajos hacen en el taller?",
    a: "Curvado de elásticos en frío y en caliente, cambio de hojas rotas o vencidas, refuerzos para sobrecarga, bujes, balancines, tensores, pernos de centro y alineación de ejes. Trabajamos con camiones, utilitarios y semirremolques.",
  },
  {
    q: "¿Hacen envíos al interior?",
    a: "Sí, mandamos a todo el país por expreso. Cuando sale el paquete te pasamos el número de seguimiento.",
  },
  {
    q: "¿Necesito turno para llevar mi camión?",
    a: "Conviene avisar antes por WhatsApp así te esperamos con lugar. Si se te rompió algo en la ruta, llamanos igual: las urgencias las atendemos.",
  },
  {
    q: "¿Trabajan con todas las marcas?",
    a: "Sí. Scania, Volvo, Mercedes-Benz, Iveco, Ford, Volkswagen y Renault. En semirremolques, Randon, Helvetica, Montenegro y Cormetal, entre otros.",
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
              <span className="h-2 w-2 rounded-full bg-brand" aria-hidden="true" />
              <span className="text-[10px] font-bold tracking-wider text-white sm:text-[11px]">
                SUSPENSIÓN PARA CAMIONES · PABLO PODESTÁ
              </span>
            </div>

            <h1 className="mb-6 font-display font-bold leading-[0.95] text-white">
              <span className="block text-5xl sm:text-6xl md:text-7xl">ELÁSTICOS</span>
              <span className="block text-5xl text-brand sm:text-6xl md:text-7xl">8 DE AGOSTO</span>
            </h1>

            <p className="mb-9 max-w-xl text-base leading-relaxed text-white/90 md:text-lg">
              Hace más de 30 años que vendemos y reparamos elásticos para camiones.
              Taller propio en Pablo Podestá, con lugar para{" "}
              <strong className="text-white font-bold">6x4 y 8x4</strong>.
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

      {/* ============ SOLUCIONES (blanco) ============ */}
      <section className="bg-white py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="reveal mx-auto mb-14 max-w-2xl text-center">
            <p className="mb-3 text-sm font-bold tracking-[0.2em] text-brand">
              QUÉ HACEMOS
            </p>
            <h2 className="mb-5 font-display text-3xl font-bold text-dark md:text-5xl">
              REPUESTO Y TALLER EN EL MISMO LUGAR
            </h2>
            <p className="text-base leading-relaxed text-slate-500 md:text-lg">
              Te vendemos la pieza y, si querés, te la colocamos acá. Camiones 4x2, 6x2, 6x4 y 8x4.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="solution-card reveal rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-brand/10">
                <Boxes className="h-7 w-7 text-brand" />
              </div>
              <h3 className="mb-3 font-display text-xl font-bold text-dark">STOCK DE REPUESTOS</h3>
              <p className="mb-6 leading-relaxed text-slate-500">
                Paquetes armados, hojas sueltas, grampas y bujes. Lo más pedido lo tenemos para llevar en el momento.
              </p>
              <Link
                href="/productos"
                className="link-arrow inline-flex items-center gap-1.5 text-sm font-bold text-brand"
              >
                VER CATÁLOGO <span>→</span>
              </Link>
            </div>

            <div className="solution-card reveal rounded-2xl border-t-4 border-brand bg-dark p-8 shadow-lg">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-white/10">
                <Image
                  src="/images/logo-icon.png"
                  alt=""
                  width={36}
                  height={20}
                  className="h-6 w-auto object-contain"
                  aria-hidden="true"
                />
              </div>
              <h3 className="mb-3 font-display text-xl font-bold text-white">
                TALLER PROPIO
              </h3>
              <p className="mb-6 leading-relaxed text-white/70">
                Una nave grande, preparada para camiones con eje simple o tándem. Si el elástico se venció, lo curvamos y vuelve a su forma.
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
                ¿El camión anda siempre cargado al tope? Le sumamos hojas al paquete para que no se venza.
              </p>
              <a
                href={wa("Hola! Quiero consultar por armado / refuerzo de elásticos para mi camión.")}
                target="_blank"
                rel="noopener noreferrer"
                className="link-arrow inline-flex items-center gap-1.5 text-sm font-bold text-brand"
              >
                CONSULTAR UN REFUERZO <span>→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============ QUÉ VENDEMOS — elástico 3D sobre blanco ============ */}
      <PartsExplorer />

      {/* ============ MARCAS QUE ATENDEMOS ============ */}
      <section className="bg-white pt-8 pb-14 md:pt-10 md:pb-18">
        <div className="w-full overflow-hidden mb-10 md:mb-12">
          <BrandLogosSlider bgClassName="bg-white" showGradients={false} />
        </div>

        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="reveal mx-auto mb-10 max-w-3xl text-center">
            <p className="mb-2 text-xs font-bold tracking-[0.2em] text-brand uppercase">
              A QUIÉN LE TRABAJAMOS
            </p>
            <h2 className="font-display text-3xl font-bold text-dark md:text-5xl">
              DEL UTILITARIO A LA FLOTA ENTERA
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600 md:text-lg">
              Líneas de colectivos, transportistas, volquetes y empresas de logística. También el que viene con su utilitario.
            </p>
          </div>

          <VehicleCardsInteractive />

          <div className="mt-10 text-center">
            <Link
              href="/servicios"
              className="btn btn-brand link-arrow inline-flex items-center gap-2 rounded-none px-8 py-4 text-xs font-bold text-white shadow-md transition-all hover:shadow-lg"
            >
              VER SERVICIOS DE TALLER <span>→</span>
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
              Empezamos como taller y lo seguimos siendo. Todos los días pasan por acá bujes,
              elásticos, balancines y tensores de camiones pesados, bateas y tolvas.
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

      {/* ============ RESEÑAS GOOGLE ============ */}
      <GoogleReviewsSection />

      {/* ============ FAQ (blanco) ============ */}
      <section className="bg-white py-20 md:py-24">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <div className="reveal mb-12 text-center">
            <p className="mb-3 text-sm font-bold tracking-[0.2em] text-brand">ANTES DE VENIR</p>
            <h2 className="font-display text-3xl font-bold text-dark md:text-5xl">
              PREGUNTAS FRECUENTES
            </h2>
            <p className="mt-3 text-sm text-slate-500 md:text-base">
              Lo que más nos preguntan sobre repuestos, envíos y taller.
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

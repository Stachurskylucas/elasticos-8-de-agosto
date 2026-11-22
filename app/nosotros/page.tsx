import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Clock, ShieldCheck, Truck } from "lucide-react"
import { wa } from "@/lib/site"

export const metadata: Metadata = {
  title: "Nosotros | Elásticos 8 de Agosto — Suspensión Pesada 6x4 y 8x4",
  description:
    "Más de 30 años reparando y vendiendo elásticos para camiones de carga pesada. Taller propio en Pablo Podestá, Buenos Aires.",
}

export default function NosotrosPage() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="page-hero-bg relative flex min-h-[50vh] items-center justify-center pt-24 text-center">
        <div className="mx-auto max-w-2xl px-5">
          <p className="mb-4 text-sm font-bold tracking-[0.2em] text-brand">NUESTRA HISTORIA</p>
          <h1 className="mb-6 font-display text-4xl font-bold leading-tight text-white md:text-6xl">
            30 AÑOS EN
            <br />
            <span className="text-brand">SUSPENSIÓN PESADA</span>
          </h1>
          <p className="text-base text-white/85 md:text-lg">
            Un taller de Pablo Podestá que empezó arreglando elásticos y nunca dejó de hacerlo.
          </p>
        </div>
      </section>

      {/* ============ HISTORIA (blanco) ============ */}
      <section className="overflow-hidden bg-white py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div className="reveal order-2 lg:order-1">
              <p className="mb-3 text-sm font-bold tracking-[0.2em] text-brand">
                CÓMO EMPEZAMOS
              </p>
              <h2 className="mb-6 font-display text-3xl font-bold leading-tight text-dark md:text-5xl">
                NACIMOS EN EL TALLER.
              </h2>

              <div className="mb-8 flex flex-col gap-5 text-base leading-relaxed text-slate-500">
                <p>
                  Hace más de 30 años abrimos el taller para arreglar elásticos de camión.
                  Hoy seguimos haciendo lo mismo, en Pablo Podestá.
                </p>
                <p>
                  Sabemos que si el camión está parado,{" "}
                  <strong className="text-dark">no está trabajando.</strong>{" "}
                  Por eso tratamos de que salga lo antes posible.
                </p>
                <p>
                  Con el tiempo nos fuimos quedando con los trabajos más pesados:{" "}
                  <strong className="text-dark font-bold">camiones 6x4 y 8x4</strong>,
                  bateas y volcadores. Además vendemos elásticos, hojas y bujes, y los
                  mandamos a todo el país.
                </p>
              </div>

              <blockquote className="mb-8 border-l-4 border-brand pl-5">
                <p className="font-display text-lg font-bold leading-snug text-dark">
                  {"\"Si tu camión anda, nosotros hicimos bien nuestro trabajo.\""}
                </p>
                <cite className="text-sm font-semibold not-italic text-brand">
                  Elásticos 8 de Agosto
                </cite>
              </blockquote>

              <Link
                href="/servicios"
                className="btn btn-brand link-arrow inline-flex items-center gap-2 rounded-none px-6 py-3.5 text-white"
              >
                VER SERVICIOS <span>→</span>
              </Link>
            </div>

            <div className="reveal relative order-1 lg:order-2">
              <div className="relative h-[420px] overflow-hidden rounded-2xl shadow-xl">
                <Image
                  src="/images/taller/nave-porton-luminosa.webp"
                  alt="Nave del taller Elásticos 8 de Agosto vista desde el portón"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <span className="founder-badge absolute -bottom-6 -right-4 rounded-xl bg-brand px-5 py-4 text-center leading-tight text-white sm:right-6">
                <span className="block font-display text-2xl font-bold">30+</span>
                <span className="block text-[10px] font-semibold tracking-widest">
                  AÑOS EN EL RUBRO
                </span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ============ POR QUÉ NOS ELIGEN (gris) ============ */}
      <section className="section-gray py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="reveal mx-auto mb-14 max-w-2xl text-center">
            <p className="mb-3 text-sm font-bold tracking-[0.2em] text-brand">POR QUÉ VENIR</p>
            <h2 className="font-display text-3xl font-bold text-dark md:text-5xl">
              LO QUE NOS PIDEN Y CUMPLIMOS
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="value-card reveal rounded-2xl border border-slate-200 bg-white p-8 text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-dark">
                <Clock className="h-7 w-7 text-white" />
              </div>
              <h3 className="mb-3 font-display text-lg font-bold text-dark">QUE SEA RÁPIDO</h3>
              <p className="text-slate-500 leading-relaxed">
                Nos escribís por WhatsApp y te contestamos. Si la pieza está en stock,
                no hay que esperar a que llegue.
              </p>
            </div>

            <div className="value-card reveal relative rounded-2xl border-2 border-brand bg-white p-8 text-center shadow-lg">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand px-4 py-1 text-[10px] font-bold tracking-widest text-white">
                LO MÁS PEDIDO
              </span>
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand">
                <Truck className="h-7 w-7 text-white" />
              </div>
              <h3 className="mb-3 font-display text-lg font-bold text-dark">LUGAR PARA 6X4 Y 8X4</h3>
              <p className="text-slate-500 leading-relaxed">
                Muchos talleres no tienen dónde meter un camión con tándem. Nosotros
                trabajamos bateas, volcadores y tolvas todos los días.
              </p>
            </div>

            <div className="value-card reveal rounded-2xl border border-slate-200 bg-white p-8 text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-dark">
                <ShieldCheck className="h-7 w-7 text-white" />
              </div>
              <h3 className="mb-3 font-display text-lg font-bold text-dark">ACERO QUE AGUANTA</h3>
              <p className="text-slate-500 leading-relaxed">
                Usamos acero para elásticos con tratamiento térmico. Aguanta ruta,
                tierra y cantera.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CTA BANNER ============ */}
      <section className="bg-dark py-16 text-center text-white">
        <div className="reveal mx-auto max-w-3xl px-5 md:px-8">
          <h2 className="mb-4 font-display text-3xl font-bold md:text-4xl">
            ¿TU CAMIÓN HACE ALGO RARO?
          </h2>
          <p className="mb-8 text-base text-white/70">
            Escribinos por WhatsApp y contanos qué le pasa. Te atiende alguien del taller.
          </p>
          <a
            href={wa("Hola! Quiero consultar por asesoramiento de suspensión.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whats inline-flex items-center gap-2 rounded-none px-8 py-4 text-xs font-bold text-white shadow-xl"
          >
            CONSULTAR POR WHATSAPP
          </a>
        </div>
      </section>
    </>
  )
}

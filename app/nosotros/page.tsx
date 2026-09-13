import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Clock, ShieldCheck, Truck, Users } from "lucide-react"
import { wa } from "@/lib/site"

export const metadata: Metadata = {
  title: "Nosotros | Elásticos 8 de Agosto — Especialistas en Suspensión 6x4 y 8x4",
  description:
    "Conocé la historia de Elásticos 8 de Agosto: especialistas en suspensión de camiones de carga pesada 6x4 y 8x4, taller propio y distribución directa en Pablo Podestá.",
}

export default function NosotrosPage() {
  return (
    <>
      {/* ============ PAGE HERO ============ */}
      <section className="page-hero-bg relative flex min-h-[50vh] items-center justify-center pt-24 text-center">
        <div className="mx-auto max-w-2xl px-5">
          <p className="mb-4 text-sm font-bold tracking-[0.2em] text-brand">NUESTRA HISTORIA</p>
          <h1 className="mb-6 font-display text-4xl font-bold leading-tight text-white md:text-6xl">
            FORJANDO CONFIANZA
            <br />
            <span className="text-brand">HACE MÁS DE 30 AÑOS</span>
          </h1>
          <p className="text-base text-white/85 md:text-lg">
            Conocé quiénes están detrás de Elásticos 8 de Agosto y por qué los transportistas y
            flotas de camiones 6x4 y 8x4 más exigentes del país nos eligen día a día.
          </p>
        </div>
      </section>

      {/* ============ NACIMOS EN EL TALLER (blanco) ============ */}
      <section className="overflow-hidden bg-white py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div className="reveal order-2 lg:order-1">
              <p className="mb-3 text-sm font-bold tracking-[0.2em] text-brand">
                DE LOS FIERROS A LA INDUSTRIA
              </p>
              <h2 className="mb-6 font-display text-3xl font-bold leading-tight text-dark md:text-5xl">
                NACIMOS EN EL TALLER, ENTENDEMOS TU URGENCIA.
              </h2>

              <div className="mb-8 flex flex-col gap-5 text-base leading-relaxed text-slate-500">
                <p>
                  Hace más de tres décadas, Elásticos 8 de Agosto comenzó con un objetivo simple:
                  brindar un servicio de suspensión pesada tan resistente como los camiones que
                  reparábamos.
                </p>
                <p>
                  Conocemos los fierros desde adentro. Sabemos perfectamente que un transporte
                  parado al costado de la ruta o en una fosa no es solo un problema mecánico,{" "}
                  <strong className="text-dark">es dinero que tu empresa está perdiendo.</strong>
                </p>
                <p>
                  Esa mentalidad nos llevó a especializarnos en el segmento más exigente del mercado:
                  la reparación integral, refuerzo y alineación de suspensión para{" "}
                  <strong className="text-dark font-bold">camiones de carga pesada 6x4 y 8x4</strong>,
                  bateas, volcadores y chasis extrapesados, además de abastecer con distribución
                  directa de fábrica de elásticos, hojas y bujes a todo el país.
                </p>
              </div>

              <blockquote className="mb-8 border-l-4 border-brand pl-5">
                <p className="font-display text-lg font-bold leading-snug text-dark">
                  {'"Nuestro trabajo es asegurar que el tuyo nunca se detenga."'}
                </p>
                <cite className="text-sm font-semibold not-italic text-brand">
                  El equipo de Elásticos 8 de Agosto
                </cite>
              </blockquote>

              <Link
                href="/servicios"
                className="btn btn-brand link-arrow inline-flex items-center gap-2 rounded-none px-6 py-3.5 text-white"
              >
                VER NUESTROS SERVICIOS <span>→</span>
              </Link>
            </div>

            <div className="reveal relative order-1 lg:order-2">
              <div className="relative h-[420px] overflow-hidden rounded-2xl shadow-xl">
                <Image
                  src="/images/detalle-elastico.png"
                  alt="Herramientas y banco de trabajo del taller"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <span className="founder-badge absolute -bottom-6 -right-4 rounded-xl bg-brand px-5 py-4 text-center leading-tight text-white sm:right-6">
                <span className="block font-display text-2xl font-bold">30+</span>
                <span className="block text-[10px] font-semibold tracking-widest">
                  AÑOS DE EXPERIENCIA
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
            <p className="mb-3 text-sm font-bold tracking-[0.2em] text-brand">NUESTRA FILOSOFÍA</p>
            <h2 className="font-display text-3xl font-bold text-dark md:text-5xl">
              POR QUÉ LAS FLOTAS NOS ELIGEN
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="value-card reveal rounded-2xl border border-slate-200 bg-white p-8 text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-dark">
                <Clock className="h-7 w-7 text-white" />
              </div>
              <h3 className="mb-3 font-display text-lg font-bold text-dark">RESPUESTA RÁPIDA</h3>
              <p className="text-slate-500 leading-relaxed">
                Optimizamos nuestros procesos de taller y logística de envíos porque entendemos que
                cada hora que tu camión no circula, es dinero perdido.
              </p>
            </div>

            <div className="value-card reveal relative rounded-2xl border-2 border-brand bg-white p-8 text-center shadow-lg">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand px-4 py-1 text-[10px] font-bold tracking-widest text-white">
                DIFERENCIAL
              </span>
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand">
                <Truck className="h-7 w-7 text-white" />
              </div>
              <h3 className="mb-3 font-display text-lg font-bold text-dark">ESPECIALIDAD 6X4 Y 8X4</h3>
              <p className="text-slate-500 leading-relaxed">
                Mano de obra capacitada y fosas equipadas para camiones de gran porte, tándem
                pesado, bateas, volcadores y tolvas de máxima exigencia de carga.
              </p>
            </div>

            <div className="value-card reveal rounded-2xl border border-slate-200 bg-white p-8 text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-dark">
                <ShieldCheck className="h-7 w-7 text-white" />
              </div>
              <h3 className="mb-3 font-display text-lg font-bold text-dark">CALIDAD DE ACERO</h3>
              <p className="text-slate-500 leading-relaxed">
                Utilizamos aceros aleados de alta elasticidad certificados y tratamientos térmicos
                homogéneos que garantizan máxima durabilidad en ruta y fuera de camino.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CONTACTO / CTA BANNER ============ */}
      <section className="bg-dark py-16 text-center text-white">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <h2 className="mb-4 font-display text-3xl font-bold md:text-4xl">
            ¿TENÉS DUDAS O QUERÉS CONSULTAR POR TU CAMIÓN?
          </h2>
          <p className="mb-8 text-base text-white/70">
            Hablás directo con nuestro especialista por WhatsApp y recibís asesoramiento inmediato.
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

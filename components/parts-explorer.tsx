import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { LeafSpringScene } from "@/components/leaf-spring-scene"

const PARTS = [
  {
    id: "elasticos-completos",
    title: "ELÁSTICOS COMPLETOS",
    desc: "Delanteros, traseros y de tándem para 6x4 y 8x4. Vienen armados, listos para colocar.",
    image: "/images/prod-elasticos.webp",
    tag: "Armados",
  },
  {
    id: "hojas-recambio",
    title: "HOJAS DE RECAMBIO",
    desc: "Hoja maestra, segunda hoja o refuerzo. Si se partió una, cambiamos esa sola.",
    image: "/images/prod-hojas.webp",
    tag: "Por unidad",
  },
  {
    id: "grampas-abrazaderas",
    title: "GRAMPAS Y FIJACIÓN",
    desc: "Grampas U grado 8 y 10.9, tuercas altas, placas de asiento y pernos de centro.",
    image: "/images/prod-grampas.webp",
    tag: "Grado 8 / 10.9",
  },
  {
    id: "bujes-goma",
    title: "BUJES Y AMORTIGUADORES",
    desc: "Bujes de goma y de poliuretano. Amortiguadores para tándem y balancines.",
    image: "/images/prod-bujes.webp",
    tag: "Goma o poliuretano",
  },
]

/**
 * "Qué vendemos": la sección queda fija mientras el elástico 3D gira y se
 * desarma con el scroll. Cada tramo resalta la pieza de una línea de repuestos.
 * El estado activo lo escribe ScrollFx en data-step; acá no hay estado de React.
 */
export function PartsExplorer() {
  return (
    <section className="parts relative bg-white" data-scroll="pin" data-steps={PARTS.length}>
      <div className="parts-sticky overflow-hidden">
        <div className="mx-auto grid h-full max-w-7xl grid-rows-[auto_minmax(0,1fr)_auto] gap-x-10 px-5 pb-6 pt-24 md:px-8 lg:grid-cols-12 lg:grid-rows-1 lg:pb-12 lg:pt-28">
          {/* Título */}
          <div className="lg:col-span-5 lg:flex lg:flex-col lg:justify-center">
            <p className="mb-2 text-sm font-bold tracking-[0.2em] text-brand">REPUESTOS EN STOCK</p>
            <h2 className="font-display text-3xl font-bold text-dark md:text-5xl">QUÉ VENDEMOS</h2>
            <p className="mt-3 hidden max-w-sm text-base leading-relaxed text-slate-600 sm:block">
              Para camiones, semirremolques y utilitarios de todas las marcas.
            </p>

            {/* Lista en desktop */}
            <div className="relative mt-8 hidden pl-6 lg:block">
              <span className="absolute left-0 top-0 h-full w-0.5 bg-slate-200" aria-hidden="true" />
              <span className="parts-bar absolute left-0 top-0 h-full w-0.5 bg-brand" aria-hidden="true" />
              <PartsList />
            </div>

            <Link
              href="/productos"
              className="btn btn-ghost-dark link-arrow mt-8 hidden items-center gap-2 self-start rounded-none border-2 border-dark px-5 py-3 text-sm text-dark lg:inline-flex"
            >
              VER CATÁLOGO COMPLETO <span>→</span>
            </Link>
          </div>

          {/* Escena 3D */}
          <div className="relative min-h-0 lg:col-span-7">
            <LeafSpringScene />

            <div className="absolute bottom-0 right-20 hidden w-52 xl:block">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-sm">
                {PARTS.map((p, i) => (
                  <Image
                    key={p.id}
                    src={p.image}
                    alt=""
                    fill
                    sizes="208px"
                    data-i={i}
                    className="part-shot object-cover"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Lista en mobile */}
          <div className="border-t border-slate-200 pt-3 lg:hidden">
            <PartsList />
          </div>
        </div>
      </div>
    </section>
  )
}

function PartsList() {
  return (
    <ol>
      {PARTS.map((p, i) => (
        <li key={p.id} className="part" data-i={i}>
          <Link href={`/productos#${p.id}`} className="group block py-2 lg:py-2.5">
            <h3 className="part-title font-display text-lg font-bold leading-tight md:text-xl lg:text-2xl">
              {p.title}
            </h3>
            <div className="part-body">
              <div className="overflow-hidden">
                <p className="max-w-md pr-16 pt-1.5 text-sm lg:pr-0 leading-relaxed text-slate-600 lg:text-base">
                  {p.desc}
                </p>
                <p className="flex items-center gap-3 pb-1 pt-2 text-xs font-bold text-brand">
                  <span className="hidden text-slate-400 sm:inline">{p.tag}</span>
                  <span className="inline-flex items-center gap-1.5">
                    Ver y pedir precio
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </p>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ol>
  )
}

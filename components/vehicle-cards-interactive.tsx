"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface VehicleGroup {
  id: string
  title: string
  tag: string
  description: string
  detail: string
  images: {
    src: string
    alt: string
    caption: string
  }[]
}

const VEHICLES: VehicleGroup[] = [
  {
    id: "pesados",
    title: "Camiones de Carga Pesada",
    tag: "6X4 · 8X4 · PESADOS",
    description:
      "Mercedes-Benz (Axor, Actros, Atego, 1634), Scania (R, P, G), Volvo (FH, FM, VM), Iveco (Stralis, Trakker), Ford Cargo y VW Constellation.",
    detail: "Ejes delanteros, traseros, nivelación y refuerzos tándem",
    images: [
      {
        src: "/images/camiones-6x4-8x4.webp",
        alt: "Camiones volcadores 6x4 y 8x4 en taller",
        caption: "Volcadores y chasis 6x4 / 8x4",
      },
      {
        src: "/images/banner-ruta.webp",
        alt: "Flota de camiones pesados en ruta",
        caption: "Unidades de larga distancia",
      },
      {
        src: "/images/taller-interior.webp",
        alt: "Fosas especializadas para camiones pesados",
        caption: "Fosas para ejes tándem",
      },
    ],
  },
  {
    id: "utilitarios",
    title: "Utilitarios & Camionetas",
    tag: "VANS · UTILITARIOS · PICK-UPS",
    description:
      "Mercedes-Benz Sprinter, Iveco Daily, Toyota Hilux, Ford Ranger, Volkswagen Amarok y Renault Master.",
    detail: "Refuerzos para sobrecarga, reparto urbano y trabajo severo",
    images: [
      {
        src: "/images/utilitarios-vans.webp",
        alt: "Mercedes Sprinter y Toyota Hilux en taller",
        caption: "Mercedes Sprinter & Hilux",
      },
      {
        src: "/images/detalle-elastico.webp",
        alt: "Paquete de elásticos y armado para utilitarios",
        caption: "Recambio y hojas adicionales",
      },
      {
        src: "/images/prod-bujes.webp",
        alt: "Bujes y silentblocks reforzados",
        caption: "Bujes y amortiguadores",
      },
    ],
  },
  {
    id: "semirremolques",
    title: "Semirremolques & Bateas",
    tag: "ARRASTRE · 2 Y 3 EJES",
    description:
      "Randon, Helvetica, Montenegro, Cormetal, Maldonado, Guerra, Lambert y bateas volcadoras.",
    detail: "Balancines, bujes y suspensión pesada de 2 y 3 ejes",
    images: [
      {
        src: "/images/semirremolques-bateas.webp",
        alt: "Bateas y tolvas graneleras en taller",
        caption: "Bateas volcadoras y tolvas",
      },
      {
        src: "/images/taller-interior.webp",
        alt: "Mantenimiento de ejes de arrastre",
        caption: "Ejes balancines y suspensión",
      },
      {
        src: "/images/hero-taller.webp",
        alt: "Curvado y forja de hojas pesadas",
        caption: "Curvado en caliente",
      },
    ],
  },
]

function VehicleCard({ vehicle }: { vehicle: VehicleGroup }) {
  const [currentIdx, setCurrentIdx] = useState(0)

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentIdx((prev) => (prev === 0 ? vehicle.images.length - 1 : prev - 1))
  }

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentIdx((prev) => (prev === vehicle.images.length - 1 ? 0 : prev + 1))
  }

  const currentImage = vehicle.images[currentIdx]

  return (
    <div className="reveal flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:border-brand/40 hover:shadow-lg">
      {/* Contenedor de Foto más Grande con Carrusel Interactivo */}
      <div className="group relative aspect-[16/11] w-full overflow-hidden bg-slate-900 sm:aspect-[4/3] lg:aspect-[16/11]">
        {vehicle.images.map((img, idx) => (
          <div
            key={img.src}
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
              idx === currentIdx ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        ))}

        {/* Badge Superior */}
        <span className="absolute left-3.5 top-3.5 z-10 rounded-none bg-dark/95 px-3 py-1.5 text-[11px] font-bold text-brand backdrop-blur-sm shadow-md">
          {vehicle.tag}
        </span>

        {/* Pie de foto actual */}
        <span className="absolute right-3.5 bottom-3.5 z-10 rounded-none bg-dark/85 px-2.5 py-1 text-[11px] font-semibold text-white/95 backdrop-blur-xs">
          {currentImage.caption} ({currentIdx + 1}/{vehicle.images.length})
        </span>

        {/* Botones de navegación (Flechas) */}
        {vehicle.images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              aria-label="Foto anterior"
              className="absolute left-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-none bg-dark/75 text-white opacity-90 backdrop-blur-xs transition-all hover:bg-brand hover:opacity-100"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Foto siguiente"
              className="absolute right-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-none bg-dark/75 text-white opacity-90 backdrop-blur-xs transition-all hover:bg-brand hover:opacity-100"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Puntos / Indicadores inferiores */}
            <div className="absolute bottom-3.5 left-3.5 z-20 flex items-center gap-1.5">
              {vehicle.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setCurrentIdx(idx)
                  }}
                  aria-label={`Ver foto ${idx + 1}`}
                  className={`h-2 transition-all ${
                    idx === currentIdx ? "w-6 bg-brand" : "w-2 bg-white/60 hover:bg-white"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Contenido de la Tarjeta más Espacioso */}
      <div className="flex flex-1 flex-col justify-between p-6 md:p-7">
        <div>
          <h3 className="font-display text-xl font-bold text-dark md:text-2xl">{vehicle.title}</h3>
          <p className="mt-2.5 text-sm leading-relaxed text-slate-600">{vehicle.description}</p>
        </div>
        <div className="mt-5 border-t border-slate-100 pt-3.5 text-xs font-bold text-brand">
          <span>{vehicle.detail}</span>
        </div>
      </div>
    </div>
  )
}

export function VehicleCardsInteractive() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-2 md:mb-4">
      {VEHICLES.map((vehicle) => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} />
      ))}
    </div>
  )
}

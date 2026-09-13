"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react"

interface WorkPhoto {
  id: string
  src: string
  alt: string
  badge: string
}

const TRABAJOS_FOTOS: WorkPhoto[] = [
  {
    id: "trabajo-1",
    src: "/images/camiones-6x4-8x4.png",
    alt: "Camiones volcadores 6x4 y 8x4 en taller",
    badge: "CAMIONES 6X4 & 8X4",
  },
  {
    id: "trabajo-2",
    src: "/images/utilitarios-vans.png",
    alt: "Mercedes Sprinter y camionetas utilitarias en taller",
    badge: "MERCEDES SPRINTER & HILUX",
  },
  {
    id: "trabajo-3",
    src: "/images/semirremolques-bateas.png",
    alt: "Bateas volcadoras y tolvas en taller",
    badge: "BATEAS & TOLVAS 3 EJES",
  },
  {
    id: "trabajo-4",
    src: "/images/hero-taller.png",
    alt: "Prensa y banco de forja en caliente de elásticos",
    badge: "CURVADO EN CALIENTE",
  },
  {
    id: "trabajo-5",
    src: "/images/banner-ruta.png",
    alt: "Flota de camiones en ruta",
    badge: "LARGA DISTANCIA",
  },
  {
    id: "trabajo-6",
    src: "/images/taller-interior.png",
    alt: "Fosas especializadas para camiones pesados",
    badge: "FOSAS PESADAS 6X4",
  },
  {
    id: "trabajo-7",
    src: "/images/detalle-elastico.png",
    alt: "Armado de paquete de elásticos en banco de trabajo",
    badge: "ARMADO DE PAQUETES",
  },
  {
    id: "trabajo-8",
    src: "/images/prod-bujes.png",
    alt: "Bujes vulcanizados y amortiguadores",
    badge: "BUJES & SILENTBLOCKS",
  },
]

export function TrabajosGallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const handleOpen = (index: number) => {
    setSelectedIndex(index)
  }

  const handleClose = () => {
    setSelectedIndex(null)
  }

  const handlePrev = useCallback(() => {
    if (selectedIndex === null) return
    setSelectedIndex((prev) => (prev === 0 ? TRABAJOS_FOTOS.length - 1 : (prev ?? 0) - 1))
  }, [selectedIndex])

  const handleNext = useCallback(() => {
    if (selectedIndex === null) return
    setSelectedIndex((prev) => (prev === TRABAJOS_FOTOS.length - 1 ? 0 : (prev ?? 0) + 1))
  }, [selectedIndex])

  // Manejo de teclado (ESC, Izquierda, Derecha)
  useEffect(() => {
    if (selectedIndex === null) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose()
      if (e.key === "ArrowLeft") handlePrev()
      if (e.key === "ArrowRight") handleNext()
    }

    window.addEventListener("keydown", handleKeyDown)
    document.body.style.overflow = "hidden"

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "unset"
    }
  }, [selectedIndex, handlePrev, handleNext])

  const currentPhoto = selectedIndex !== null ? TRABAJOS_FOTOS[selectedIndex] : null

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-4">
        {TRABAJOS_FOTOS.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => handleOpen(idx)}
            className="group relative aspect-[4/3] w-full overflow-hidden border-2 border-dark/10 bg-dark text-left transition-all duration-300 hover:border-brand hover:shadow-xl focus:outline-none"
            aria-label={`Ver foto ampliada ${item.badge}`}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-108"
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 transition-opacity group-hover:opacity-90" />

            <div className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-none bg-dark/80 text-white opacity-0 backdrop-blur-xs transition-opacity duration-300 group-hover:opacity-100">
              <ZoomIn className="h-3.5 w-3.5 text-brand" />
            </div>

            <div className="absolute bottom-2.5 left-2.5 right-2.5 z-10">
              <span className="inline-block rounded-none bg-brand px-2.5 py-1 text-[10px] font-extrabold tracking-wider text-white uppercase shadow-md sm:text-[11px]">
                {item.badge}
              </span>
            </div>
          </button>
        ))}
      </div>

      {currentPhoto && selectedIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-2 sm:p-4 backdrop-blur-md animate-in fade-in duration-200"
          onClick={handleClose}
        >
          <button
            onClick={handleClose}
            aria-label="Cerrar visor"
            className="absolute right-4 top-4 z-50 flex h-11 w-11 items-center justify-center rounded-none bg-white/10 text-white transition-all hover:bg-brand hover:text-white"
          >
            <X className="h-6 w-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              handlePrev()
            }}
            aria-label="Foto anterior"
            className="absolute left-2 top-1/2 z-50 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-none bg-black/60 text-white transition-all hover:bg-brand hover:text-white md:left-6"
          >
            <ChevronLeft className="h-7 w-7" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              handleNext()
            }}
            aria-label="Foto siguiente"
            className="absolute right-2 top-1/2 z-50 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-none bg-black/60 text-white transition-all hover:bg-brand hover:text-white md:right-6"
          >
            <ChevronRight className="h-7 w-7" />
          </button>

          <div
            className="relative flex h-[82vh] w-full max-w-5xl items-center justify-center overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={currentPhoto.src}
              alt={currentPhoto.alt}
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-contain"
            />
          </div>
        </div>
      )}
    </>
  )
}

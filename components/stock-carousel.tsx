"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react"

export interface StockPhoto {
  src: string
  alt: string
  title: string
  desc: string
  tag: string
}

// ============================================================
// FOTOS DE ESTANTERÍAS Y STOCK DEL TALLER
// Podés agregar o reemplazar fotos acá guardando las imágenes
// en /public/images/ y referenciándolas.
// ============================================================
export const DEFAULT_STOCK_PHOTOS: StockPhoto[] = [
  {
    src: "/images/taller-interior.png",
    alt: "Estanterías de elásticos y repuestos en el taller",
    title: "ESTANTERÍAS DE STOCK PERMANENTE",
    desc: "Amplio stock de paquetes de elásticos completos y hojas de recambio ordenadas listas para entrega inmediata.",
    tag: "ESTANTERÍAS & DEPÓSITO",
  },
  {
    src: "/images/detalle-elastico.png",
    alt: "Paquetes armados y hojas de recambio clasificadas",
    title: "HOJAS Y ACCESORIOS CLASIFICADOS",
    desc: "Disponibilidad continua de hojas maestras, bujes silentblock, pernos y grampas para todas las marcas.",
    tag: "REPUESTOS EN STOCK",
  },
  {
    src: "/images/hero-taller.png",
    alt: "Sector de almacenamiento y armado en fosa",
    title: "SECTOR DE ARMADO Y CONTROL",
    desc: "Materiales certificados listos para ser colocados o despachados en el día hacia todo el país.",
    tag: "INFRAESTRUCTURA",
  },
  {
    src: "/images/banner-ruta.png",
    alt: "Despacho de repuestos para unidades pesadas",
    title: "DESPACHO DIRECTO DE REPUESTOS",
    desc: "Envíos directos a expresos y atención inmediata en mostrador para transportistas y empresas de flota.",
    tag: "LOGÍSTICA & DESPACHO",
  },
]

export function StockCarousel({ photos = DEFAULT_STOCK_PHOTOS }: { photos?: StockPhoto[] }) {
  const [current, setCurrent] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

  const total = photos.length

  const next = () => {
    setCurrent((prev) => (prev + 1) % total)
  }

  const prev = () => {
    setCurrent((prev) => (prev - 1 + total) % total)
  }

  // Auto-play
  useEffect(() => {
    if (!isAutoPlaying || total <= 1) return
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total)
    }, 4500)
    return () => clearInterval(timer)
  }, [isAutoPlaying, total])

  // Touch handling
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX
  }

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return
    const distance = touchStartX.current - touchEndX.current
    if (distance > 50) next()
    else if (distance < -50) prev()
    touchStartX.current = null
    touchEndX.current = null
  }

  return (
    <div
      className="relative mx-auto w-full max-w-6xl"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Contenedor principal de la foto activa */}
      <div
        className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-slate-200 bg-dark shadow-2xl md:aspect-[21/10]"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {photos.map((photo, index) => {
          const isActive = index === current
          return (
            <div
              key={photo.title}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 1280px) 100vw, 1200px"
                priority={index === 0}
                className="object-cover"
              />
              {/* Gradiente para legibilidad */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/30 to-transparent" />

              {/* Información sobre la foto */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="rounded-none bg-brand px-3 py-1 text-xs font-bold tracking-wider text-white shadow-md">
                    {photo.tag}
                  </span>
                  <span className="text-xs font-semibold tracking-widest text-white/70">
                    FOTO {index + 1} DE {total}
                  </span>
                </div>
                <h3 className="font-display text-2xl font-bold text-white sm:text-3xl md:text-4xl text-balance">
                  {photo.title}
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base">
                  {photo.desc}
                </p>
              </div>
            </div>
          )
        })}

        {/* Botones de navegación Anterior / Siguiente */}
        <button
          onClick={prev}
          aria-label="Foto anterior"
          className="absolute left-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-dark/60 text-white backdrop-blur-md transition-all hover:scale-110 hover:bg-brand hover:border-brand"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <button
          onClick={next}
          aria-label="Siguiente foto"
          className="absolute right-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-dark/60 text-white backdrop-blur-md transition-all hover:scale-110 hover:bg-brand hover:border-brand"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Toggle AutoPlay */}
        <button
          onClick={() => setIsAutoPlaying((v) => !v)}
          aria-label={isAutoPlaying ? "Pausar carrusel" : "Reproducir carrusel"}
          className="absolute right-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-dark/60 text-white backdrop-blur-md transition-all hover:bg-dark/90"
        >
          {isAutoPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
        </button>
      </div>

      {/* Miniaturas de selección rápida */}
      <div className="mt-5 grid grid-cols-4 gap-3 sm:gap-4">
        {photos.map((photo, index) => {
          const isActive = index === current
          return (
            <button
              key={`thumb-${photo.title}`}
              onClick={() => setCurrent(index)}
              className={`group relative aspect-[16/10] overflow-hidden rounded-xl border-2 transition-all duration-300 ${
                isActive
                  ? "border-brand shadow-lg shadow-brand/20 scale-[1.02]"
                  : "border-transparent opacity-60 hover:opacity-100 hover:border-slate-300"
              }`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 768px) 25vw, 200px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-dark/40 transition-opacity group-hover:opacity-0" />
              <span className="absolute bottom-1.5 left-2 right-2 truncate text-left font-display text-[10px] font-bold text-white drop-shadow-md hidden sm:block">
                {photo.tag}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react"

export interface WorkshopPhoto {
  src: string
  alt: string
  title: string
  desc: string
  tag: string
}

export function TallerCarousel({ photos }: { photos: WorkshopPhoto[] }) {
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

  // Auto-play timer
  useEffect(() => {
    if (!isAutoPlaying || total <= 1) return
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total)
    }, 4500)
    return () => clearInterval(timer)
  }, [isAutoPlaying, total])

  // Touch swipe handling
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

  const activePhoto = photos[current]

  return (
    <div
      className="relative mx-auto w-full max-w-6xl"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Contenedor principal de la foto activa */}
      <div
        className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl border border-slate-200 bg-dark shadow-2xl md:aspect-[21/10]"
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
              {/* Gradiente para legibilidad del texto */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/30 to-transparent" />

              {/* Información sobre la foto */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="rounded-md bg-brand px-3 py-1 text-xs font-bold tracking-wider text-white shadow-md">
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
          className="absolute left-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-dark/60 text-white backdrop-blur-md transition-all hover:scale-110 hover:bg-brand hover:border-brand"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <button
          onClick={next}
          aria-label="Siguiente foto"
          className="absolute right-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-dark/60 text-white backdrop-blur-md transition-all hover:scale-110 hover:bg-brand hover:border-brand"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Indicador de AutoPlay toggle */}
        <button
          onClick={() => setIsAutoPlaying((v) => !v)}
          aria-label={isAutoPlaying ? "Pausar carrusel" : "Reproducir carrusel"}
          className="absolute right-5 top-5 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-dark/60 text-white backdrop-blur-md transition-all hover:bg-dark/90"
        >
          {isAutoPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </button>
      </div>

      {/* Miniaturas de selección rápida */}
      <div className="mt-6 grid grid-cols-4 gap-3 sm:gap-4">
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
              <span className="absolute bottom-1.5 left-2 right-2 truncate text-left font-display text-[11px] font-bold text-white drop-shadow-md hidden sm:block">
                {photo.tag}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

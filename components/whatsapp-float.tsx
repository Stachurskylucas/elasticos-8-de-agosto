"use client"

import { useEffect, useState } from "react"
import { ArrowUp } from "lucide-react"
import { wa } from "@/lib/site"

export function WhatsappFloat() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 220) {
        setShowScrollTop(true)
      } else {
        setShowScrollTop(false)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-center gap-2.5">
      {/* Botón Flotante de WhatsApp Cuadrado */}
      <a
        href={wa("Hola! Quiero consultar por elásticos y repuestos de suspensión.")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escribinos por WhatsApp"
        className="group relative flex h-13 w-13 items-center justify-center rounded-none bg-[#128c4a] text-white shadow-2xl shadow-emerald-950/40 transition-all hover:scale-105 hover:bg-[#0d6c39]"
      >
        <svg viewBox="0 0 24 24" className="h-7 w-7 fill-white" aria-hidden="true">
          <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.49-.9-.8-1.5-1.79-1.68-2.09-.17-.3-.02-.46.13-.61.15-.15.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.09 3.34 5.08 4.55 2.99 1.21 2.99.8 3.53.75.54-.05 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35zM12 22a10 10 0 1 1 10-10c0 1.82-.49 3.53-1.34 5l1.31 4.79-4.93-1.29A9.95 9.95 0 0 1 12 22z" />
        </svg>
        <span className="sr-only">WhatsApp</span>
      </a>

      {/* Botón Flotante para Volver Arriba (Mismo tamaño exacto que WhatsApp: h-13 w-13) */}
      <button
        onClick={scrollToTop}
        aria-label="Volver arriba de la página"
        className={`flex h-13 w-13 items-center justify-center rounded-none border border-white/20 bg-[#0a192f] text-white shadow-2xl transition-all duration-300 hover:bg-brand hover:border-brand hover:scale-105 ${
          showScrollTop
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "translate-y-3 opacity-0 pointer-events-none"
        }`}
      >
        <ArrowUp className="h-6 w-6 text-white stroke-[2.5]" />
      </button>
    </div>
  )
}

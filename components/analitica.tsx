"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { evento } from "@/lib/analitica"

/**
 * Mide visitas y clics de contacto (WhatsApp, teléfono, mail, mapa) en toda la web.
 * Los links de producto llevan data-producto="..." para saber qué se consulta más.
 */
export function Analitica() {
  const ruta = usePathname()
  const primera = useRef(true)

  useEffect(() => {
    if (!ruta || ruta.startsWith("/admin")) return
    const extra: Record<string, string> = {}
    if (primera.current) {
      // de dónde vino: solo en la primera página (después el referrer es la propia web)
      const utm = new URLSearchParams(location.search).get("utm_source")
      if (utm) extra.utm = utm
      if (document.referrer) extra.referrer = document.referrer
      primera.current = false
    }
    evento("visita", extra)
  }, [ruta])

  useEffect(() => {
    const alClic = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.("a")
      if (!a) return
      const href = a.getAttribute("href") || ""
      const producto = a.dataset.producto
      if (/wa\.me|api\.whatsapp\.com|whatsapp:/.test(href)) evento("whatsapp", producto ? { dato: producto } : {})
      else if (href.startsWith("tel:")) evento("telefono")
      else if (href.startsWith("mailto:")) evento("email")
      else if (/google\.[^/]+\/maps|maps\.google|maps\.app\.goo\.gl/.test(href)) evento("mapa")
    }
    document.addEventListener("click", alClic, { capture: true })
    return () => document.removeEventListener("click", alClic, { capture: true })
  }, [])

  return null
}

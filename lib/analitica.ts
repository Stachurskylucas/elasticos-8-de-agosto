"use client"

import type { TipoEvento } from "@/lib/db/eventos"

/** Manda un evento a /api/evento sin frenar la página (sendBeacon sobrevive aunque el link abra WhatsApp). */
export function evento(tipo: TipoEvento, extra: Record<string, string | number> = {}) {
  if (typeof window === "undefined" || location.pathname.startsWith("/admin")) return
  if (location.hostname === "localhost" && !process.env.NEXT_PUBLIC_MEDIR_EN_LOCAL) return
  const body = JSON.stringify({ tipo, ruta: location.pathname, ...extra })
  try {
    if (navigator.sendBeacon?.("/api/evento", new Blob([body], { type: "text/plain" }))) return
  } catch {
    /* sigue con fetch */
  }
  fetch("/api/evento", { method: "POST", body, keepalive: true }).catch(() => {})
}

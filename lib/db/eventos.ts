import { getSupabaseServerClient } from "@/lib/supabase/server"

/**
 * Estadísticas propias de la web: visitas y contactos (WhatsApp, teléfono, formulario...).
 * Sin cookies ni datos personales: el "visitante" es un hash que cambia cada día.
 * Sin Supabase configurado (desarrollo local) se guardan en memoria y se pierden al reiniciar.
 */

export const TIPOS_EVENTO = [
  "visita",
  "whatsapp",
  "telefono",
  "email",
  "mapa",
  "formulario",
  "ver_producto",
  "busqueda",
] as const
export type TipoEvento = (typeof TIPOS_EVENTO)[number]
export const TIPOS_CONTACTO: TipoEvento[] = ["whatsapp", "telefono", "email", "formulario"]

export interface EventoWeb {
  creado: string
  tipo: TipoEvento
  ruta: string | null
  fuente: string | null
  dispositivo: string | null
  visitante: string | null
  dato: string | null
  resultados: number | null
}

const enMemoria: EventoWeb[] = []

export async function registrarEvento(e: Omit<EventoWeb, "creado">): Promise<void> {
  const supabase = getSupabaseServerClient()
  if (supabase) {
    const { error } = await supabase.from("eventos_web").insert(e)
    if (error) console.warn("No se pudo guardar el evento:", error.message)
    return
  }
  enMemoria.push({ ...e, creado: new Date().toISOString() })
  if (enMemoria.length > 20000) enMemoria.splice(0, enMemoria.length - 20000)
}

export async function eventosDesde(desde: Date): Promise<{ eventos: EventoWeb[]; origen: "supabase" | "memoria" }> {
  const supabase = getSupabaseServerClient()
  if (!supabase) {
    return { eventos: enMemoria.filter((e) => e.creado >= desde.toISOString()), origen: "memoria" }
  }
  const eventos: EventoWeb[] = []
  // de a 1000 filas (límite de Supabase por consulta), hasta 100 mil
  for (let desdeFila = 0; desdeFila < 100000; desdeFila += 1000) {
    const { data, error } = await supabase
      .from("eventos_web")
      .select("creado,tipo,ruta,fuente,dispositivo,visitante,dato,resultados")
      .gte("creado", desde.toISOString())
      .order("creado", { ascending: true })
      .range(desdeFila, desdeFila + 999)
    if (error) throw new Error(error.message)
    eventos.push(...((data || []) as EventoWeb[]))
    if (!data || data.length < 1000) break
  }
  return { eventos, origen: "supabase" }
}

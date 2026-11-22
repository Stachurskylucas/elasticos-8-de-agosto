import { timingSafeEqual } from "crypto"
import { NextResponse } from "next/server"
import { eventosDesde, TIPOS_CONTACTO, type EventoWeb } from "@/lib/db/eventos"

export const dynamic = "force-dynamic"

/**
 * Resumen de las estadísticas de la web para la app de Facturación del taller.
 * Pide el header "x-stats-token" igual a la variable STATS_TOKEN (sin ella, no responde).
 * GET /api/estadisticas?dias=30  → período actual + el anterior del mismo largo, para comparar.
 */

const ZONA = "America/Argentina/Buenos_Aires"
const diaAR = (iso: string) => new Date(iso).toLocaleDateString("en-CA", { timeZone: ZONA })
const horaAR = (iso: string) =>
  Number(new Date(iso).toLocaleString("en-US", { timeZone: ZONA, hour: "2-digit", hour12: false })) % 24

function autorizado(request: Request): boolean {
  const esperado = process.env.STATS_TOKEN || ""
  const dado = request.headers.get("x-stats-token") || ""
  if (esperado.length < 16 || dado.length !== esperado.length) return false
  return timingSafeEqual(Buffer.from(dado), Buffer.from(esperado))
}

function ranking(lista: (string | null)[], tope = 10) {
  const m = new Map<string, number>()
  for (const x of lista) if (x) m.set(x, (m.get(x) || 0) + 1)
  return [...m]
    .sort((a, b) => b[1] - a[1])
    .slice(0, tope)
    .map(([nombre, cantidad]) => ({ nombre, cantidad }))
}

function totales(ev: EventoWeb[]) {
  const visitas = ev.filter((e) => e.tipo === "visita")
  const contactos = ev.filter((e) => TIPOS_CONTACTO.includes(e.tipo))
  const visitantes = new Set(visitas.map((e) => `${diaAR(e.creado)}|${e.visitante}`)).size
  const conContacto = new Set(contactos.map((e) => `${diaAR(e.creado)}|${e.visitante}`)).size
  return { visitas: visitas.length, visitantes, contactos: contactos.length, personas_que_contactaron: conContacto }
}

export async function GET(request: Request) {
  if (!autorizado(request)) return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  const dias = Math.min(365, Math.max(1, Number(new URL(request.url).searchParams.get("dias")) || 30))
  const ahora = new Date()
  const inicio = new Date(ahora.getTime() - dias * 864e5)
  const inicioAnt = new Date(ahora.getTime() - 2 * dias * 864e5)

  let todos: EventoWeb[]
  let origen: string
  try {
    ;({ eventos: todos, origen } = await eventosDesde(inicioAnt))
  } catch (e) {
    return NextResponse.json({ error: `Base de datos: ${(e as Error).message}` }, { status: 500 })
  }
  const ev = todos.filter((e) => e.creado >= inicio.toISOString())
  const ant = todos.filter((e) => e.creado < inicio.toISOString())

  // por día (todos los días del período, aunque estén en cero)
  const porDia = new Map<string, { visitas: number; visitantes: Set<string>; contactos: number }>()
  for (let d = 0; d < dias; d++) {
    porDia.set(diaAR(new Date(inicio.getTime() + (d + 1) * 864e5).toISOString()), {
      visitas: 0,
      visitantes: new Set(),
      contactos: 0,
    })
  }
  for (const e of ev) {
    const x = porDia.get(diaAR(e.creado))
    if (!x) continue
    if (e.tipo === "visita") {
      x.visitas++
      if (e.visitante) x.visitantes.add(e.visitante)
    } else if (TIPOS_CONTACTO.includes(e.tipo)) x.contactos++
  }

  const visitas = ev.filter((e) => e.tipo === "visita")
  const busquedas = ev.filter((e) => e.tipo === "busqueda" && e.dato)
  const horas = Array.from({ length: 24 }, () => 0)
  for (const e of ev) if (TIPOS_CONTACTO.includes(e.tipo)) horas[horaAR(e.creado)]++

  return NextResponse.json({
    origen,
    dias,
    generado: ahora.toISOString(),
    totales: totales(ev),
    anterior: totales(ant),
    contactos_por_tipo: Object.fromEntries([...TIPOS_CONTACTO, "mapa"].map((t) => [t, ev.filter((e) => e.tipo === t).length])),
    por_dia: [...porDia].map(([dia, x]) => ({ dia, visitas: x.visitas, visitantes: x.visitantes.size, contactos: x.contactos })),
    fuentes: ranking(visitas.map((e) => e.fuente)),
    paginas: ranking(visitas.map((e) => e.ruta)),
    dispositivos: ranking(visitas.map((e) => e.dispositivo)),
    productos_vistos: ranking(ev.filter((e) => e.tipo === "ver_producto").map((e) => e.dato)),
    productos_consultados: ranking(ev.filter((e) => e.tipo === "whatsapp" && e.dato).map((e) => e.dato)),
    busquedas: ranking(busquedas.map((e) => e.dato!.toLowerCase())),
    busquedas_sin_resultado: ranking(busquedas.filter((e) => e.resultados === 0).map((e) => e.dato!.toLowerCase())),
    contactos_por_hora: horas,
  })
}

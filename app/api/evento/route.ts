import { createHash } from "crypto"
import { NextResponse } from "next/server"
import { registrarEvento, TIPOS_EVENTO, type TipoEvento } from "@/lib/db/eventos"

export const dynamic = "force-dynamic"

const BOTS = /bot|crawl|spider|slurp|preview|headless|lighthouse|facebookexternalhit|whatsapp|telegram|curl|wget|python/i
const SAL = process.env.STATS_TOKEN || process.env.ADMIN_SESSION_SECRET || "elasticos"

// Límite simple por IP: 120 eventos por minuto (frena a quien quiera inflar los números)
const porIp = new Map<string, { n: number; desde: number }>()

function fuenteDe(referrer: string, utm: string, host: string): string {
  if (utm) return utm.slice(0, 40)
  if (!referrer) return "Directo"
  let h = ""
  try {
    h = new URL(referrer).hostname.replace(/^www\./, "")
  } catch {
    return "Directo"
  }
  if (!h || h === host.replace(/^www\./, "")) return "Directo"
  if (/google\./.test(h)) return "Google"
  if (/bing\.|duckduckgo|yahoo\./.test(h)) return "Otros buscadores"
  if (/instagram\./.test(h)) return "Instagram"
  if (/facebook\.|fb\.|messenger/.test(h)) return "Facebook"
  if (/whatsapp|wa\.me/.test(h)) return "WhatsApp"
  if (/mercadolibre|mercadolivre/.test(h)) return "Mercado Libre"
  if (/youtube|youtu\.be/.test(h)) return "YouTube"
  if (/tiktok/.test(h)) return "TikTok"
  return h.slice(0, 60)
}

function dispositivoDe(ua: string): string {
  if (/ipad|tablet/i.test(ua)) return "tablet"
  if (/mobi|android|iphone/i.test(ua)) return "celular"
  return "compu"
}

const texto = (v: unknown, max: number) => (typeof v === "string" && v.trim() ? v.trim().slice(0, max) : null)

export async function POST(request: Request) {
  const ua = request.headers.get("user-agent") || ""
  if (!ua || BOTS.test(ua)) return new NextResponse(null, { status: 204 })

  const ip = (request.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "local"
  const ahora = Date.now()
  const r = porIp.get(ip)
  if (r && ahora - r.desde < 60_000) {
    if (++r.n > 120) return new NextResponse(null, { status: 429 })
  } else porIp.set(ip, { n: 1, desde: ahora })

  let body: Record<string, unknown>
  try {
    body = JSON.parse(await request.text())
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 })
  }
  const tipo = body.tipo as TipoEvento
  if (!TIPOS_EVENTO.includes(tipo)) return NextResponse.json({ error: "Tipo inválido" }, { status: 400 })

  const host = request.headers.get("host") || ""
  // Visitante anónimo: hash de IP + navegador + día. No se guarda la IP y cambia cada día.
  const dia = new Date().toISOString().slice(0, 10)
  const visitante = createHash("sha256").update(`${SAL}|${dia}|${ip}|${ua}`).digest("hex").slice(0, 16)
  const resultados = Number.isFinite(Number(body.resultados)) ? Math.max(0, Math.round(Number(body.resultados))) : null

  await registrarEvento({
    tipo,
    ruta: texto(body.ruta, 200),
    fuente: tipo === "visita" ? fuenteDe(String(body.referrer || ""), String(body.utm || ""), host) : null,
    dispositivo: dispositivoDe(ua),
    visitante,
    dato: texto(body.dato, 120),
    resultados: tipo === "busqueda" ? resultados : null,
  })
  return new NextResponse(null, { status: 204 })
}

import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { createHmac, randomBytes, timingSafeEqual } from "crypto"
import { adminConfigurado, COOKIE_ADMIN, crearSesion, DURACION_SESION_S, sesionValida } from "@/lib/admin-session"

export const dynamic = "force-dynamic"

// Sin contraseña por defecto: si falta ADMIN_PASSWORD, el panel no deja entrar a nadie.
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || ""

// Las dos contraseñas se pasan por HMAC con una clave al azar del proceso: quedan del mismo largo
// y timingSafeEqual no filtra por tiempo ni el contenido ni la longitud.
const CLAVE_COMPARACION = randomBytes(32)
const huella = (s: string) => createHmac("sha256", CLAVE_COMPARACION).update(s).digest()

// Límite en memoria por IP: 5 intentos cada 15 minutos.
const VENTANA_MS = 15 * 60 * 1000
const MAX_INTENTOS = 5
const rateLimit = new Map<string, { count: number; timestamp: number }>()

function ipDe(request: Request): string {
  // En Vercel la primera IP de x-forwarded-for es la del cliente; x-real-ip como respaldo.
  return (
    (request.headers.get("x-forwarded-for") || "").split(",")[0].trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  )
}

function limpiarVencidos(now: number) {
  if (rateLimit.size < 500) return
  for (const [ip, r] of rateLimit) if (now - r.timestamp >= VENTANA_MS) rateLimit.delete(ip)
}

export async function POST(request: Request) {
  try {
    const ip = ipDe(request)
    const now = Date.now()
    limpiarVencidos(now)

    const record = rateLimit.get(ip)
    if (record && now - record.timestamp < VENTANA_MS) {
      if (record.count >= MAX_INTENTOS) {
        return NextResponse.json({ error: "Demasiados intentos. Intentá más tarde." }, { status: 429 })
      }
      record.count++
    } else {
      rateLimit.set(ip, { count: 1, timestamp: now })
    }

    const config = adminConfigurado()
    if (!config.ok) {
      return NextResponse.json(
        { error: `El panel no está configurado: falta ${config.falta} en las variables de entorno.` },
        { status: 503 },
      )
    }

    const body = await request.json().catch(() => null)
    const password = typeof body?.password === "string" ? body.password : ""

    if (!password || password.length > 256) {
      return NextResponse.json({ error: "Contraseña requerida" }, { status: 400 })
    }

    const isValid = timingSafeEqual(huella(password), huella(ADMIN_PASSWORD))

    if (!isValid) {
      return NextResponse.json({ error: "Contraseña incorrecta" }, { status: 401 })
    }

    // Reset rate limit on success
    rateLimit.delete(ip)

    const cookieStore = await cookies()
    cookieStore.set(COOKIE_ADMIN, await crearSesion(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      // strict: la cookie del panel nunca viaja en navegaciones o pedidos que vienen de otro sitio (CSRF).
      sameSite: "strict",
      maxAge: DURACION_SESION_S, // 7 días
      path: "/",
    })

    return NextResponse.json({ success: true, message: "Sesión iniciada correctamente" })
  } catch (error) {
    console.error("Error en /api/admin/auth:", error)
    return NextResponse.json({ error: "Error al autenticar" }, { status: 500 })
  }
}

export async function GET() {
  const cookieStore = await cookies()
  const session = cookieStore.get(COOKIE_ADMIN)

  const isAuthenticated = await sesionValida(session?.value)
  return NextResponse.json({ authenticated: isAuthenticated })
}

export async function DELETE() {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_ADMIN)
  return NextResponse.json({ success: true, message: "Sesión cerrada" })
}

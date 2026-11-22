import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { timingSafeEqual, scryptSync } from "crypto"
import { adminConfigurado, COOKIE_ADMIN, crearSesion, DURACION_SESION_S, sesionValida } from "@/lib/admin-session"

export const dynamic = "force-dynamic"

// Sin contraseña por defecto: si falta ADMIN_PASSWORD, el panel no deja entrar a nadie.
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || ""

// Basic in-memory rate limiting (IP -> attempts)
const rateLimit = new Map<string, { count: number; timestamp: number }>()

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "unknown"
    const now = Date.now()
    
    // Rate limit check: 5 attempts per 15 minutes
    const record = rateLimit.get(ip)
    if (record && now - record.timestamp < 15 * 60 * 1000) {
      if (record.count >= 5) {
        return NextResponse.json({ error: "Demasiados intentos. Intenta más tarde." }, { status: 429 })
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

    const { password } = await request.json()

    if (!password) {
      return NextResponse.json({ error: "Contraseña requerida" }, { status: 400 })
    }

    // Secure comparison to prevent timing attacks
    const key = scryptSync(password, 'salt', 32)
    const expected = scryptSync(ADMIN_PASSWORD, 'salt', 32)
    const isValid = timingSafeEqual(key, expected)

    if (!isValid) {
      return NextResponse.json({ error: "Contraseña incorrecta" }, { status: 401 })
    }

    // Reset rate limit on success
    rateLimit.delete(ip)

    const cookieStore = await cookies()
    cookieStore.set(COOKIE_ADMIN, await crearSesion(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: DURACION_SESION_S, // 7 días
      path: "/",
    })

    return NextResponse.json({ success: true, message: "Sesión iniciada correctamente" })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Error al autenticar" }, { status: 500 })
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

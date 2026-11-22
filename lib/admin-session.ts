import { NextResponse } from "next/server"

/**
 * Sesión del panel /admin: cookie firmada con HMAC-SHA256 (ADMIN_SESSION_SECRET) y con vencimiento.
 * Formato: "<vence (ms)>.<nonce>.<firma>". Sin el secreto no se puede fabricar una cookie válida.
 * Usa Web Crypto para andar igual en el middleware (edge) y en las rutas de API (node).
 */

export const COOKIE_ADMIN = "admin_session"
export const DURACION_SESION_S = 60 * 60 * 24 * 7 // 7 días

// El valor de ejemplo de .env.example es público: no sirve como secreto.
const SECRETO_EJEMPLO = "elasticos-8-de-agosto-super-secret-key-2026"

function secreto(): string | null {
  const s = process.env.ADMIN_SESSION_SECRET || ""
  if (s.length < 32 || s === SECRETO_EJEMPLO) return null
  return s
}

/** Configuración lista para iniciar sesión (contraseña y secreto cargados). */
export function adminConfigurado(): { ok: boolean; falta?: string } {
  if (!process.env.ADMIN_PASSWORD) return { ok: false, falta: "ADMIN_PASSWORD" }
  if (!secreto()) return { ok: false, falta: "ADMIN_SESSION_SECRET (32+ caracteres al azar, distinto del de ejemplo)" }
  return { ok: true }
}

const b64url = (buf: ArrayBuffer | Uint8Array) =>
  btoa(String.fromCharCode(...new Uint8Array(buf as ArrayBuffer)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "")

async function firma(datos: string, clave: string): Promise<string> {
  const k = await crypto.subtle.importKey("raw", new TextEncoder().encode(clave), { name: "HMAC", hash: "SHA-256" }, false, [
    "sign",
  ])
  return b64url(await crypto.subtle.sign("HMAC", k, new TextEncoder().encode(datos)))
}

function igualesSeguro(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let dif = 0
  for (let i = 0; i < a.length; i++) dif |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return dif === 0
}

export async function crearSesion(): Promise<string> {
  const clave = secreto()
  if (!clave) throw new Error("Falta ADMIN_SESSION_SECRET")
  const vence = Date.now() + DURACION_SESION_S * 1000
  const nonce = b64url(crypto.getRandomValues(new Uint8Array(12)))
  const datos = `${vence}.${nonce}`
  return `${datos}.${await firma(datos, clave)}`
}

export async function sesionValida(valor: string | undefined | null): Promise<boolean> {
  const clave = secreto()
  if (!clave || !valor) return false
  const partes = valor.split(".")
  if (partes.length !== 3) return false
  const [vence, nonce, f] = partes
  if (!/^\d{13}$/.test(vence) || Number(vence) < Date.now()) return false
  return igualesSeguro(f, await firma(`${vence}.${nonce}`, clave))
}

function cookieDe(request: Request): string | null {
  const m = (request.headers.get("cookie") || "").match(new RegExp(`(?:^|;\\s*)${COOKIE_ADMIN}=([^;]+)`))
  return m ? decodeURIComponent(m[1]) : null
}

/** En rutas de API que modifican datos: devuelve un 401 si no hay sesión válida, o null si puede seguir. */
export async function exigirAdmin(request: Request): Promise<NextResponse | null> {
  if (await sesionValida(cookieDe(request))) return null
  return NextResponse.json({ error: "No autorizado. Iniciá sesión en /admin." }, { status: 401 })
}

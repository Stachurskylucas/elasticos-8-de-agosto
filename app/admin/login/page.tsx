"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, KeyRound, Loader2, Lock, ShieldCheck } from "lucide-react"

export default function AdminLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!password) return

    setLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || "Contraseña incorrecta")
      }

      router.push("/admin")
      router.refresh()
    } catch (err: any) {
      setError(err.message || "Error al iniciar sesión")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-[85vh] items-center justify-center bg-slate-950 px-5 py-20">
      <div className="w-full max-w-md">
        {/* Volver */}
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-xs font-bold text-slate-400 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          VOLVER AL SITIO
        </Link>

        {/* Card */}
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/90 p-8 shadow-2xl backdrop-blur-xl">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/20 text-brand">
              <Lock className="h-7 w-7" />
            </div>
            <h1 className="font-display text-2xl font-bold text-white">
              PANEL DE <span className="text-brand">ADMINISTRADOR</span>
            </h1>
            <p className="mt-1 text-xs text-slate-400">
              Ingresá la clave maestra para gestionar el catálogo y stock
            </p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            {error && (
              <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-center text-xs font-semibold text-red-400">
                {error}
              </div>
            )}

            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-300">
                Contraseña de Acceso
              </label>
              <div className="relative">
                <KeyRound className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  required
                  autoFocus
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-white/15 bg-white/5 py-3 pl-10 pr-4 text-sm text-white outline-none transition-all placeholder:text-slate-600 focus:border-brand focus:ring-1 focus:ring-brand"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !password}
              className="btn btn-brand mt-2 flex items-center justify-center gap-2 rounded-xl py-3.5 text-xs text-white disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  VERIFICANDO...
                </>
              ) : (
                <>
                  <ShieldCheck className="h-4 w-4" />
                  INGRESAR AL PANEL
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

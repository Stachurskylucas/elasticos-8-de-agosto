"use client"

import Link from "next/link"
import { Clock, MessageSquare } from "lucide-react"
import { wa } from "@/lib/site"

export default function CheckoutPendingPage() {
  const msgWA = "Hola! Tengo un pago pendiente por Mercado Pago y quería consultar por mi pedido."

  return (
    <div className="section-gray min-h-[75vh] py-16 flex items-center justify-center">
      <div className="mx-auto w-full max-w-lg px-4">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-amber-100 text-amber-600 shadow-inner">
            <Clock className="h-10 w-10" />
          </div>

          <span className="rounded-full bg-amber-50 border border-amber-200 px-3 py-1 text-xs font-bold text-amber-800">
            PAGO EN PROCESO / PENDIENTE
          </span>

          <h1 className="font-display mt-4 text-2xl font-bold text-dark sm:text-3xl">
            Tu pago se está procesando
          </h1>

          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            Si pagaste mediante cupón de Pago Fácil / Rapipago o transferencia bancaria, la acreditación puede demorar unos minutos u horas. Te notificaremos apenas se confirme.
          </p>

          <div className="mt-8 flex flex-col gap-3">
            <a
              href={wa(msgWA)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whats flex items-center justify-center gap-2 rounded-xl py-3.5 text-xs text-white"
            >
              <MessageSquare className="h-4 w-4" />
              CONSULTAR POR WHATSAPP
            </a>

            <Link
              href="/productos"
              className="btn rounded-xl border border-slate-200 py-3 text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              VOLVER AL CATÁLOGO
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

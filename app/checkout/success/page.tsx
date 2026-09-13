"use client"

import { Suspense } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { CheckCircle2, MessageSquare } from "lucide-react"
import { wa } from "@/lib/site"

function SuccessContent() {
  const searchParams = useSearchParams()
  const paymentId = searchParams.get("payment_id") || searchParams.get("collection_id") || "PAGO-OK"

  const msgWA = `Hola! Acabo de realizar el pago de mi compra (Ref: #${paymentId}). Quiero coordinar el retiro en taller o despacho por expreso.`

  return (
    <div className="section-gray min-h-[75vh] py-16 flex items-center justify-center">
      <div className="mx-auto w-full max-w-lg px-4">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl">
          {/* Icono de Éxito */}
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shadow-inner">
            <CheckCircle2 className="h-10 w-10" />
          </div>

          <span className="rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-bold text-emerald-800">
            PAGO APROBADO CON ÉXITO
          </span>

          <h1 className="font-display mt-4 text-2xl font-bold text-dark sm:text-3xl">
            ¡Muchas gracias por tu compra!
          </h1>

          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            Tu pago fue procesado correctamente mediante Mercado Pago. Hemos registrado tu pedido en nuestro sistema.
          </p>

          <div className="my-6 rounded-2xl bg-slate-50 border border-slate-200 p-4 text-left">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Referencia de Pago:</span>
              <span className="font-mono font-bold text-dark">#{paymentId}</span>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Estado:</span>
              <span className="font-bold text-emerald-600">✓ Acreditado</span>
            </div>
          </div>

          {/* Acciones */}
          <div className="flex flex-col gap-3">
            <a
              href={wa(msgWA)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whats flex items-center justify-center gap-2 rounded-xl py-3.5 text-xs text-white shadow-lg shadow-emerald-700/20"
            >
              <MessageSquare className="h-4 w-4" />
              COORDINAR RETIRO O ENVÍO POR WHATSAPP
            </a>

            <Link
              href="/productos"
              className="btn rounded-xl border border-slate-200 py-3 text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              VOLVER AL CATÁLOGO DE REPUESTOS
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[75vh] flex items-center justify-center text-xs text-slate-400">
          Cargando confirmación...
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  )
}

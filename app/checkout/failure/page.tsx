"use client"

import Link from "next/link"
import { AlertCircle, ArrowLeft, MessageSquare } from "lucide-react"
import { wa } from "@/lib/site"

export default function CheckoutFailurePage() {
  const msgWA = "Hola! Tuve un problema al intentar pagar por Mercado Pago y quería consultar por otro medio de pago."

  return (
    <div className="section-gray min-h-[75vh] py-16 flex items-center justify-center">
      <div className="mx-auto w-full max-w-lg px-4">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100 text-red-600 shadow-inner">
            <AlertCircle className="h-10 w-10" />
          </div>

          <span className="rounded-full bg-red-50 border border-red-200 px-3 py-1 text-xs font-bold text-red-800">
            NO SE PUDO COMPLETAR EL PAGO
          </span>

          <h1 className="font-display mt-4 text-2xl font-bold text-dark sm:text-3xl">
            El pago fue rechazado
          </h1>

          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            No te preocupes, no se realizó ningún cargo en tu tarjeta. Podés intentar con otro medio de pago o coordinar una transferencia bancaria directa.
          </p>

          <div className="mt-8 flex flex-col gap-3">
            <Link
              href="/productos"
              className="btn btn-brand flex items-center justify-center gap-2 rounded-xl py-3.5 text-xs font-bold text-white shadow-md shadow-brand/25"
            >
              <ArrowLeft className="h-4 w-4" />
              REINTENTAR COMPRA
            </Link>

            <a
              href={wa(msgWA)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whats flex items-center justify-center gap-2 rounded-xl py-3.5 text-xs text-white"
            >
              <MessageSquare className="h-4 w-4" />
              PAGAR POR TRANSFERENCIA O WHATSAPP
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

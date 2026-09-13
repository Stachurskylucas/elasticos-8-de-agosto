"use client"

import Image from "next/image"
import {
  MessageSquare,
  Minus,
  Plus,
  ShoppingBag,
  ShoppingCart,
  Trash2,
  X,
} from "lucide-react"
import { useCart } from "@/components/cart-provider"
import { wa } from "@/lib/site"

export function CartDrawer() {
  const { items, count, isOpen, close, inc, dec, remove, clear } = useCart()

  // Mensaje para consultar cotización y stock por WhatsApp
  const mensajeWA =
    items.length > 0
      ? `Hola! Quiero consultar disponibilidad y cotización para estos repuestos:\n\n${items
          .map((i) => `• ${i.qty}x ${i.name}${i.sku ? ` (Ref: ${i.sku})` : ""}`)
          .join("\n")}\n\nTotal de artículos: ${count}\n¿Tienen stock y me podrían pasar el presupuesto?`
      : "Hola! Quiero consultar por repuestos de elásticos y suspensión."

  return (
    <>
      {/* Fondo Backdrop */}
      <div
        onClick={close}
        aria-hidden="true"
        className={`fixed inset-0 z-[60] bg-dark/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Panel Drawer */}
      <aside
        role="dialog"
        aria-label="Carrito de pedido"
        aria-hidden={!isOpen}
        className={`fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <header className="flex items-center justify-between border-b border-slate-200 bg-dark px-5 py-4 text-white">
          <h2 className="flex items-center gap-2 font-display text-base font-bold tracking-wide">
            <ShoppingCart className="h-5 w-5 text-brand" />
            MI LISTA DE PEDIDO
            <span className="ml-1 rounded-full bg-brand px-2 py-0.5 text-xs font-mono font-bold">
              {count}
            </span>
          </h2>
          <button
            onClick={close}
            aria-label="Cerrar carrito"
            className="rounded-lg p-1.5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        {/* Lista de Productos */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                <ShoppingBag className="h-8 w-8" />
              </div>
              <p className="font-display text-base font-bold text-dark">Tu lista está vacía</p>
              <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                Agregá repuestos desde el catálogo para consultar disponibilidad y armar tu cotización por WhatsApp.
              </p>
              <button
                onClick={close}
                className="btn btn-brand mt-3 rounded-full px-6 py-2.5 text-xs text-white"
              >
                VER CATÁLOGO
              </button>
            </div>
          ) : (
            <ul className="flex flex-col divide-y divide-slate-100">
              {items.map((i) => (
                <li key={i.id} className="py-4 first:pt-0 last:pb-0">
                  <div className="flex gap-3.5">
                    {/* Imagen */}
                    <div className="relative h-18 w-20 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
                      <Image
                        src={i.image || "/placeholder.svg"}
                        alt={i.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>

                    {/* Info & Controles */}
                    <div className="flex flex-1 flex-col justify-between">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-display text-xs font-bold leading-snug text-dark line-clamp-2">
                            {i.name}
                          </h4>
                          {i.sku && (
                            <p className="mt-0.5 font-mono text-[10px] text-slate-400">
                              Ref: {i.sku}
                            </p>
                          )}
                        </div>

                        <button
                          onClick={() => remove(i.id)}
                          className="shrink-0 text-[11px] font-semibold text-slate-400 underline hover:text-red-500 transition-colors"
                          title="Eliminar repuesto"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <div className="mt-2.5 flex items-center justify-between">
                        {/* Selector de cantidad */}
                        <div className="inline-flex items-center rounded-lg border border-slate-300 bg-white">
                          <button
                            onClick={() => dec(i.id)}
                            aria-label={`Quitar uno de ${i.name}`}
                            className="p-1 text-slate-600 hover:bg-slate-100 hover:text-dark transition-colors"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-7 text-center font-mono text-xs font-bold text-dark">
                            {i.qty}
                          </span>
                          <button
                            onClick={() => inc(i.id)}
                            aria-label={`Agregar uno de ${i.name}`}
                            className="p-1 text-slate-600 hover:bg-slate-100 hover:text-dark transition-colors"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        <span className="text-[11px] font-semibold text-slate-500">
                          {i.qty} {i.qty === 1 ? "unidad" : "unidades"}
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer con Acción de Consulta por WhatsApp */}
        {items.length > 0 && (
          <footer className="border-t border-slate-200 bg-slate-50/80 p-5">
            <div className="mb-3 flex items-center justify-between">
              <span className="font-display text-sm font-bold text-dark">Total de repuestos:</span>
              <span className="font-display text-base font-bold text-dark">
                {count} {count === 1 ? "artículo" : "artículos"}
              </span>
            </div>

            <p className="mb-4 text-xs text-slate-500 leading-relaxed">
              Enviá tu pedido directamente por WhatsApp para recibir cotización de inmediato y coordinar retiro en taller o despacho por expreso.
            </p>

            {/* Botón Principal: Enviar Pedido por WhatsApp */}
            <div className="flex flex-col gap-2">
              <a
                href={wa(mensajeWA)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whats flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-xs font-bold text-white shadow-lg shadow-emerald-700/20 transition-all hover:shadow-xl"
              >
                <MessageSquare className="h-4 w-4" />
                ENVIAR PEDIDO POR WHATSAPP
              </a>

              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  onClick={close}
                  className="text-xs font-semibold text-slate-500 underline hover:text-dark transition-colors"
                >
                  Ver más repuestos
                </button>

                <button
                  type="button"
                  onClick={clear}
                  className="text-xs font-semibold text-slate-400 hover:text-red-500 transition-colors"
                >
                  Vaciar lista
                </button>
              </div>
            </div>
          </footer>
        )}
      </aside>
    </>
  )
}

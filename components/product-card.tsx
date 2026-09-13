"use client"

import Image from "next/image"
import { useCart } from "@/components/cart-provider"
import type { Product } from "@/lib/products"
import { MessageSquare, Plus } from "lucide-react"
import { wa } from "@/lib/site"

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart()
  const inStock = product.in_stock !== false

  const msgConsultar = `Hola! Quiero consultar por el repuesto: ${product.name} (Ref: ${
    product.sku || product.id.toUpperCase()
  }). ¿Tienen disponibilidad inmediata?`

  return (
    <article className="product-card group flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:border-slate-300 hover:shadow-md">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="product-img object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {inStock ? (
          <span className="absolute right-2.5 top-2.5 inline-flex items-center gap-1 rounded-full border border-emerald-500/40 bg-emerald-950/80 px-2 py-0.5 text-[10px] font-bold text-emerald-300 backdrop-blur-sm shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            EN STOCK
          </span>
        ) : (
          <span className="absolute right-2.5 top-2.5 inline-flex items-center gap-1 rounded-full border border-red-500/60 bg-red-950/80 px-2 py-0.5 text-[10px] font-bold text-red-300 backdrop-blur-sm shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
            SIN STOCK
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        {product.brand && product.brand !== "Universal" && (
          <span className="text-[11px] font-bold uppercase tracking-wider text-brand mb-1">
            {product.brand}
          </span>
        )}

        <h3 className="font-display text-sm font-bold leading-snug text-dark line-clamp-1">
          {product.name}
        </h3>

        <p className="mt-1.5 flex-1 text-xs text-slate-500 line-clamp-2 leading-relaxed">
          {product.desc}
        </p>

        <div className="mt-4 flex flex-col gap-2 pt-2 border-t border-slate-100">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() =>
                add({
                  id: product.id,
                  name: product.name,
                  image: product.image,
                  sku: product.sku || product.id.toUpperCase(),
                })
              }
              className="btn btn-brand flex items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-bold text-white shadow-sm shadow-brand/20 transition-all hover:shadow-md"
            >
              <Plus className="h-3.5 w-3.5" />
              AGREGAR
            </button>

            <a
              href={wa(msgConsultar)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whats flex items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-bold text-white shadow-sm transition-all"
            >
              <MessageSquare className="h-3.5 w-3.5" />
              CONSULTAR
            </a>
          </div>
        </div>
      </div>
    </article>
  )
}

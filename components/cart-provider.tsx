"use client"

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react"
import Image from "next/image"
import { CheckCircle2, ChevronRight, ShoppingBag, X } from "lucide-react"

export type CartItem = {
  id: string
  name: string
  image: string
  price?: number | null
  sku?: string
  qty: number
}

type CartCtx = {
  items: CartItem[]
  count: number
  totalAmount: number
  isOpen: boolean
  open: () => void
  close: () => void
  add: (item: Omit<CartItem, "qty">) => void
  inc: (id: string) => void
  dec: (id: string) => void
  remove: (id: string) => void
  clear: () => void
}

const Ctx = createContext<CartCtx | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [toastVisible, setToastVisible] = useState(false)
  const [lastAddedItem, setLastAddedItem] = useState<CartItem | null>(null)
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const add = useCallback((item: Omit<CartItem, "qty">) => {
    let updatedItem: CartItem = { ...item, qty: 1 }

    setItems((prev) => {
      const found = prev.find((i) => i.id === item.id)
      if (found) {
        updatedItem = { ...found, qty: found.qty + 1 }
        return prev.map((i) => (i.id === item.id ? updatedItem : i))
      }
      return [...prev, updatedItem]
    })

    // Guardar para el popup toast
    setLastAddedItem(updatedItem)
    setToastVisible(true)

    // Auto-ocultar con difuminado suave después de 4.5 segundos
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current)
    }
    toastTimeoutRef.current = setTimeout(() => {
      setToastVisible(false)
    }, 4500)
  }, [])

  const inc = useCallback((id: string) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)))\n  }, [])

  const dec = useCallback((id: string) => {
    setItems((prev) =>
      prev.flatMap((i) => (i.id === id ? (i.qty > 1 ? [{ ...i, qty: i.qty - 1 }] : []) : [i]))
    )
  }, [])

  const remove = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }, [])

  const totalAmount = useMemo(() => {
    return items.reduce((acc, item) => {
      const itemPrice = item.price && item.price > 0 ? item.price : 0
      return acc + itemPrice * item.qty
    }, 0)
  }, [items])

  const count = useMemo(() => {
    return items.reduce((a, i) => a + i.qty, 0)
  }, [items])

  const value = useMemo<CartCtx>(
    () => ({
      items,
      count,
      totalAmount,
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      add,
      inc,
      dec,
      remove,
      clear: () => setItems([]),
    }),
    [items, count, totalAmount, isOpen, add, inc, dec, remove]
  )

  return (
    <Ctx.Provider value={value}>
      {children}

      {/* Pop-up Toast Flotante Grande con Difuminado Suave */}
      {lastAddedItem && (\n        <aside
          role="status"
          aria-live="polite"
          onClick={() => {
            setToastVisible(false)
            setIsOpen(true)
          }}
          className={`fixed bottom-6 right-5 z-[80] flex w-[90vw] max-w-md cursor-pointer items-center gap-4 rounded-2xl border border-slate-200/90 bg-white/95 p-4 shadow-2xl backdrop-blur-md transition-all duration-500 ease-out sm:bottom-8 sm:right-8 sm:p-4.5 ${
            toastVisible
              ? "translate-y-0 opacity-100 scale-100 pointer-events-auto"
              : "translate-y-4 opacity-0 scale-95 pointer-events-none"
          } hover:border-brand/40 hover:shadow-brand/10`}
        >
          {/* Miniatura grande con insignia de check exterior bien posicionada */}
          <div className="relative shrink-0">
            <div className="relative h-14 w-14 sm:h-16 sm:w-16 overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-sm">
              <Image
                src={lastAddedItem.image || "/placeholder.svg"}
                alt={lastAddedItem.name}
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>
            {/* Insignia verde circular exterior sin recortes */}
            <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-black text-white shadow-md ring-2 ring-white">
              ✓
            </span>
          </div>

          {/* Información y Texto de Acción */}
          <div className="flex-1 pr-1 text-left">
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
              <span>¡Agregado al pedido!</span>
            </div>
            <p className="font-display text-sm font-bold leading-snug text-dark line-clamp-1 mt-0.5">
              {lastAddedItem.name}
            </p>
            <p className="mt-1 text-xs font-semibold text-brand flex items-center gap-1">
              <span>
                Tocá para ver tu lista ({count} {count === 1 ? "repuesto" : "repuestos"})
              </span>
              <ChevronRight className="h-3.5 w-3.5" />
            </p>
          </div>

          {/* Botón Cerrar */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setToastVisible(false)
            }}
            aria-label="Cerrar notificación"
            className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-dark transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </aside>
      )}
    </Ctx.Provider>
  )
}

export function useCart() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>")
  return ctx
}

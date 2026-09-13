"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import { Image as ImageIcon, Loader2, Plus, Tag, X } from "lucide-react"
import {
  INITIAL_BRANDS,
  INITIAL_CATEGORIES,
  type Category,
  type CategoryId,
  type Product,
} from "@/lib/products"

interface ProductFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSaved: (product: Product) => void
  productToEdit?: Product | null
  categories?: Category[]
  onCategoryCreated?: (cat: Category) => void
  brands?: string[]
}

const PRESET_IMAGES = [
  { label: "Elásticos", url: "/images/prod-elasticos.png" },
  { label: "Hojas", url: "/images/prod-hojas.png" },
  { label: "Bujes", url: "/images/prod-bujes.png" },
  { label: "Grampas", url: "/images/prod-grampas.png" },
  { label: "Pernos", url: "/images/prod-pernos.png" },
  { label: "Amortiguadores", url: "/images/prod-amortiguadores.png" },
  { label: "Tensores", url: "/images/prod-tensores.png" },
]

export function ProductFormModal({
  isOpen,
  onClose,
  onSaved,
  productToEdit,
  categories = INITIAL_CATEGORIES,
  onCategoryCreated,
  brands = INITIAL_BRANDS,
}: ProductFormModalProps) {
  const [name, setName] = useState("")
  const [sku, setSku] = useState("")
  const [category, setCategory] = useState<CategoryId>("elasticos")
  const [brand, setBrand] = useState("Universal")
  const [desc, setDesc] = useState("")
  const [image, setImage] = useState("/images/prod-elasticos.png")
  const [inStock, setInStock] = useState(true)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Crear categoría inline
  const [isCreatingCat, setIsCreatingCat] = useState(false)
  const [newCatLabel, setNewCatLabel] = useState("")
  const [catLoading, setCatLoading] = useState(false)

  const isEditing = Boolean(productToEdit)

  // Lista unificada de marcas disponibles
  const availableBrands = useMemo(() => {
    const set = new Set([...brands, "Universal", "Mercedes-Benz", "Scania", "Ford", "Iveco", "Volvo", "Volkswagen", "Aesa", "Asicha", "Faesa", "Molas"])
    if (brand) set.add(brand)
    return Array.from(set).sort((a, b) => a.localeCompare(b))
  }, [brands, brand])

  useEffect(() => {
    if (isOpen) {
      if (productToEdit) {
        setName(productToEdit.name)
        setSku(productToEdit.sku || "")
        setCategory(productToEdit.category)
        setBrand(productToEdit.brand || "Universal")
        setDesc(productToEdit.desc || "")
        setImage(productToEdit.image || "/images/prod-elasticos.png")
        setInStock(productToEdit.in_stock !== false)
      } else {
        setName("")
        setSku("")
        setCategory(categories[0]?.id || "elasticos")
        setBrand("Universal")
        setDesc("")
        setImage("/images/prod-elasticos.png")
        setInStock(true)
      }
      setIsCreatingCat(false)
      setNewCatLabel("")
      setError(null)
    }
  }, [isOpen, productToEdit, categories])

  if (!isOpen) return null

  const handleCreateCategoryInline = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCatLabel.trim()) return

    setCatLoading(true)
    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ label: newCatLabel.trim().toUpperCase() }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Error al crear categoría")

      if (onCategoryCreated) {
        onCategoryCreated(data.category)
      }
      setCategory(data.category.id)
      setIsCreatingCat(false)
      setNewCatLabel("")
    } catch (err: any) {
      alert(err.message || "Error al crear categoría")
    } finally {
      setCatLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) {
      setError("El nombre del repuesto es obligatorio")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const payload = {
        name: name.trim(),
        sku: sku.trim() || undefined,
        category,
        brand: brand.trim() || "Universal",
        desc: desc.trim(),
        image,
        in_stock: inStock,
      }

      const url = isEditing ? `/api/products/${productToEdit!.id}` : "/api/products"
      const method = isEditing ? "PUT" : "POST"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || "Error al guardar el producto")
      }

      onSaved(data.product)
      onClose()
    } catch (err: any) {
      setError(err.message || "Ocurrió un error al guardar")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-dark/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Box */}
      <div className="relative z-10 my-6 w-full max-w-2xl overflow-hidden rounded-3xl border border-white/15 bg-slate-900 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-6 py-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand font-display font-bold text-white shadow-md">
              {isEditing ? "✎" : "+"}
            </span>
            <div>
              <h3 className="font-display text-base font-bold text-white">
                {isEditing ? `Editar Repuesto: ${productToEdit?.name}` : "Nuevo Repuesto en Catálogo"}
              </h3>
              <p className="text-xs text-slate-400">
                Completá los datos del repuesto para publicarlo en el catálogo
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="p-6 max-h-[80vh] overflow-y-auto">
          {error && (
            <div className="mb-5 rounded-xl border border-red-500/30 bg-red-950/50 p-3.5 text-xs font-semibold text-red-300">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-5">
            {/* 1. SECCIÓN: DATOS GENERALES */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
              <span className="mb-3 block text-xs font-bold uppercase tracking-wider text-brand">
                1. Información del Repuesto
              </span>

              {/* Nombre */}
              <div className="mb-4">
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-300">
                  Nombre del Repuesto <span className="text-brand">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej: Elástico Delantero 10 Hojas Mercedes 1114"
                  className="w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-xs text-white outline-none placeholder:text-slate-500 focus:border-brand"
                />
              </div>

              {/* Grid: SKU, Categoría y Marca */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {/* SKU */}
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-300">
                    Código / SKU
                  </label>
                  <input
                    type="text"
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    placeholder="Ej: EL-MB1114-D"
                    className="w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 font-mono text-xs text-white outline-none placeholder:text-slate-500 focus:border-brand"
                  />
                </div>

                {/* Categoría */}
                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                      Categoría
                    </label>
                    {!isEditing && !isCreatingCat && (
                      <button
                        type="button"
                        onClick={() => setIsCreatingCat(true)}
                        className="text-[11px] font-bold text-brand hover:underline"
                      >
                        + Nueva
                      </button>
                    )}
                  </div>

                  {!isCreatingCat ? (
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as CategoryId)}
                      className="w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-xs font-semibold text-white outline-none focus:border-brand"
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.id} className="bg-slate-900 text-white">
                          {c.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className="flex gap-1.5">
                      <input
                        type="text"
                        placeholder="NOMBRE CATEGORÍA"
                        value={newCatLabel}
                        onChange={(e) => setNewCatLabel(e.target.value)}
                        className="w-full rounded-xl border border-brand bg-white/10 px-2.5 py-2 text-xs uppercase text-white outline-none"
                      />
                      <button
                        type="button"
                        onClick={handleCreateCategoryInline}
                        disabled={catLoading || !newCatLabel.trim()}
                        className="btn btn-brand rounded-xl px-3 py-2 text-xs text-white disabled:opacity-50"
                      >
                        {catLoading ? "..." : "✓"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsCreatingCat(false)}
                        className="rounded-xl border border-white/15 bg-white/5 px-2.5 py-2 text-xs text-slate-400 hover:text-white"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>

                {/* Marca / Fabricante Desplegable */}
                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                      Marca / Fabricante
                    </label>
                  </div>
                  <select
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-xs font-semibold text-white outline-none focus:border-brand"
                  >
                    {availableBrands.map((b) => (
                      <option key={b} value={b} className="bg-slate-900 text-white">
                        {b}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Descripción */}
              <div className="mt-4">
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-300">
                  Descripción Técnica y Aplicación
                </label>
                <textarea
                  rows={2}
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="Ej: Acero SAE 5160 templado. Apto para camiones Mercedes-Benz 1114 / 1518. Alta resistencia."
                  className="w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-xs text-white outline-none placeholder:text-slate-500 focus:border-brand"
                />
              </div>
            </div>

            {/* 2. SECCIÓN: IMAGEN Y DISPONIBILIDAD */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
              <span className="mb-3 block text-xs font-bold uppercase tracking-wider text-brand">
                2. Imagen y Disponibilidad
              </span>

              {/* Presets de imagen */}
              <div className="mb-3">
                <label className="mb-1.5 block text-[11px] font-bold uppercase text-slate-400">
                  Imágenes Predeterminadas
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {PRESET_IMAGES.map((preset) => (
                    <button
                      key={preset.url}
                      type="button"
                      onClick={() => setImage(preset.url)}
                      className={`rounded-lg border px-2.5 py-1 text-xs font-semibold transition-colors ${
                        image === preset.url
                          ? "border-brand bg-brand text-white shadow-sm"
                          : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input URL y Vista Previa */}
              <div className="flex items-center gap-3">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-white/15 bg-white/5">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt="Vista previa"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <label className="mb-1 block text-[11px] font-bold uppercase text-slate-400">
                    O ingresá una URL personalizada
                  </label>
                  <input
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="https://ejemplo.com/foto.jpg"
                    className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs text-white outline-none placeholder:text-slate-500 focus:border-brand"
                  />
                </div>
              </div>

              {/* Toggle de Stock */}
              <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
                <div>
                  <span className="font-display text-xs font-bold text-white">Disponibilidad en Taller</span>
                  <p className="text-[11px] text-slate-400">
                    {inStock ? "✓ Se muestra con badge EN STOCK" : "⚠ Se muestra con badge SIN STOCK"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setInStock(!inStock)}
                  className={`rounded-xl px-4 py-1.5 text-xs font-bold transition-colors ${
                    inStock
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                      : "bg-red-500/20 text-red-300 border border-red-500/40"
                  }`}
                >
                  {inStock ? "EN STOCK" : "SIN STOCK"}
                </button>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex items-center justify-end gap-3 border-t border-white/10 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="btn rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-xs font-bold text-slate-300 hover:bg-white/10"
              >
                CANCELAR
              </button>
              <button
                type="submit"
                disabled={loading}
                className="btn btn-brand flex items-center gap-2 rounded-xl px-6 py-2.5 text-xs text-white shadow-lg shadow-brand/25 disabled:opacity-50"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                {isEditing ? "GUARDAR CAMBIOS" : "CREAR PRODUCTO"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

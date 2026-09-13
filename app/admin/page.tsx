"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  AlertCircle,
  Boxes,
  Check,
  ChevronLeft,
  ChevronRight,
  Database,
  Edit2,
  ExternalLink,
  Layers,
  Loader2,
  LogOut,
  PackageCheck,
  Plus,
  RefreshCw,
  Search,
  Tag,
  Trash2,
  X,
} from "lucide-react"
import { ProductFormModal } from "@/components/admin/product-form-modal"
import {
  categoryLabel,
  INITIAL_BRANDS,
  INITIAL_CATEGORIES,
  type Category,
  type CategoryId,
  type Product,
} from "@/lib/products"

export default function AdminPage() {
  const router = useRouter()
  const [authChecked, setAuthChecked] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES)
  const [brands, setBrands] = useState<{ id: string; name: string }[]>([])
  const [dbSource, setDbSource] = useState<"supabase" | "local">("local")
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("todos")
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error"
    text: string
  } | null>(null)

  // Modales
  const [modalOpen, setModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [catManagerOpen, setCatManagerOpen] = useState(false)
  const [newCatLabel, setNewCatLabel] = useState("")
  const [creatingCatLoading, setCreatingCatLoading] = useState(false)
  const [deletingCatId, setDeletingCatId] = useState<string | null>(null)

  // Gestor de Marcas
  const [brandManagerOpen, setBrandManagerOpen] = useState(false)
  const [newBrandName, setNewBrandName] = useState("")
  const [creatingBrandLoading, setCreatingBrandLoading] = useState(false)
  const [deletingBrandId, setDeletingBrandId] = useState<string | null>(null)

  // Sincronización Supabase
  const [seedLoading, setSeedLoading] = useState(false)

  const categorySliderRef = useRef<HTMLDivElement>(null)

  // 1. Verificar autenticación
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/admin/auth")
        const data = await res.json()
        if (!data.authenticated) {
          router.replace("/admin/login")
          return
        }
        setAuthChecked(true)
      } catch (err) {
        router.replace("/admin/login")
      }
    }
    checkAuth()
  }, [router])

  // 2. Cargar productos, categorías y marcas
  const loadData = async () => {
    setLoading(true)
    try {
      const [resP, resC, resB] = await Promise.all([
        fetch("/api/products"),
        fetch("/api/categories"),
        fetch("/api/brands"),
      ])

      const dataP = await resP.json()
      if (dataP.products) {
        setProducts(dataP.products)
        setDbSource(dataP.source)
      }

      const dataC = await resC.json()
      if (dataC.categories && Array.isArray(dataC.categories)) {
        setCategories(dataC.categories)
      }

      const dataB = await resB.json()
      if (dataB.brands && Array.isArray(dataB.brands)) {
        setBrands(dataB.brands)
      } else {
        setBrands(INITIAL_BRANDS.map((b) => ({ id: b.toLowerCase().replace(/\s+/g, "-"), name: b })))
      }
    } catch (err) {
      console.error("Error cargando datos:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (authChecked) {
      loadData()
    }
  }, [authChecked])

  // 3. Desplazar slider de categorías
  const scrollCategories = (direction: "left" | "right") => {
    if (categorySliderRef.current) {
      const scrollAmount = direction === "left" ? -220 : 220
      categorySliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  // 4. Cerrar sesión
  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" })
    router.push("/admin/login")
  }

  // 5. Alternar stock rápidamente
  const handleToggleStock = async (product: Product) => {
    const nextStock = !(product.in_stock !== false)
    setProducts((prev) =>
      prev.map((p) => (p.id === product.id ? { ...p, in_stock: nextStock } : p))
    )

    try {
      const res = await fetch(`/api/products/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ in_stock: nextStock }),
      })
      if (!res.ok) throw new Error()
    } catch (err) {
      setProducts((prev) =>
        prev.map((p) => (p.id === product.id ? { ...p, in_stock: !nextStock } : p))
      )
      alert("Error al actualizar el stock.")
    }
  }

  // 6. Eliminar producto
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error()
      setProducts((prev) => prev.filter((p) => p.id !== id))
      setDeletingId(null)
      setStatusMessage({ type: "success", text: "Producto eliminado correctamente." })
    } catch (err) {
      alert("Error al eliminar el producto.")
    }
  }

  // 7. Crear categoría
  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCatLabel.trim()) return

    setCreatingCatLoading(true)
    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ label: newCatLabel.trim().toUpperCase() }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Error al crear categoría")

      setCategories((prev) => [...prev, data.category])
      setNewCatLabel("")
      setStatusMessage({
        type: "success",
        text: `Categoría "${data.category.label}" creada con éxito.`,
      })
    } catch (err: any) {
      alert(err.message || "Error al crear la categoría")
    } finally {
      setCreatingCatLoading(false)
    }
  }

  // 8. Eliminar categoría
  const handleDeleteCategory = async (catId: string) => {
    try {
      const res = await fetch(`/api/categories?id=${encodeURIComponent(catId)}`, {
        method: "DELETE",
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Error al eliminar categoría")

      setCategories((prev) => prev.filter((c) => c.id !== catId))
      if (categoryFilter === catId) {
        setCategoryFilter("todos")
      }
      setDeletingCatId(null)
      setStatusMessage({ type: "success", text: "Categoría eliminada correctamente." })
    } catch (err: any) {
      alert(err.message || "Error al eliminar la categoría")
    }
  }

  // 9. Crear marca
  const handleCreateBrand = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newBrandName.trim()) return

    setCreatingBrandLoading(true)
    try {
      const res = await fetch("/api/brands", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newBrandName.trim() }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Error al crear marca")

      setBrands((prev) => [...prev, data.brand].sort((a, b) => a.name.localeCompare(b.name)))
      setNewBrandName("")
      setStatusMessage({
        type: "success",
        text: `Marca "${data.brand.name}" agregada con éxito.`,
      })
    } catch (err: any) {
      alert(err.message || "Error al crear la marca")
    } finally {
      setCreatingBrandLoading(false)
    }
  }

  // 10. Eliminar marca
  const handleDeleteBrand = async (brandId: string) => {
    try {
      const res = await fetch(`/api/brands?id=${encodeURIComponent(brandId)}`, {
        method: "DELETE",
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Error al eliminar marca")

      setBrands((prev) => prev.filter((b) => b.id !== brandId))
      setDeletingBrandId(null)
      setStatusMessage({ type: "success", text: "Marca eliminada correctamente." })
    } catch (err: any) {
      alert(err.message || "Error al eliminar la marca")
    }
  }

  // 11. Sembrado en Supabase
  const handleSeed = async () => {
    setSeedLoading(true)
    setStatusMessage(null)
    try {
      const res = await fetch("/api/admin/seed", { method: "POST" })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Error al sincronizar")
      setStatusMessage({
        type: "success",
        text: data.message || "Productos sincronizados con Supabase.",
      })
      loadData()
    } catch (err: any) {
      setStatusMessage({ type: "error", text: err.message || "Error al sincronizar." })
    } finally {
      setSeedLoading(false)
    }
  }

  // Productos filtrados
  const filteredProducts = useMemo(() => {
    const q = search.trim().toLowerCase()
    return products.filter((p) => {
      const matchesCat = categoryFilter === "todos" || p.category === categoryFilter
      if (!matchesCat) return false
      if (!q) return true
      return (
        p.name.toLowerCase().includes(q) ||
        (p.desc && p.desc.toLowerCase().includes(q)) ||
        (p.sku && p.sku.toLowerCase().includes(q)) ||
        (p.brand && p.brand.toLowerCase().includes(q))
      )
    })
  }, [products, search, categoryFilter])

  // Contadores
  const stats = useMemo(() => {
    const total = products.length
    const inStock = products.filter((p) => p.in_stock !== false).length
    const outOfStock = total - inStock
    return { total, inStock, outOfStock, categoriesCount: categories.length, brandsCount: brands.length }
  }, [products, categories, brands])

  if (!authChecked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <Loader2 className="h-8 w-8 animate-spin text-brand" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-brand selection:text-white">
      {/* Top Bar Admin */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-900/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand font-display font-black text-white shadow-md shadow-brand/30">
                8A
              </span>
              <div className="hidden sm:block">
                <span className="block font-display text-xs font-black tracking-widest text-white">
                  ELÁSTICOS 8 DE AGOSTO
                </span>
                <span className="block text-[10px] font-bold text-brand uppercase tracking-wider">
                  Administrador de Catálogo
                </span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/productos"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Ver Catálogo Público
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs font-bold text-red-400 hover:bg-red-500/20 transition-colors"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* Banner de Estado de Base de Datos */}
        <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-white/10 bg-slate-900/60 p-4 sm:flex-row sm:items-center sm:justify-between shadow-lg">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                dbSource === "supabase"
                  ? "bg-emerald-500/20 text-emerald-400"
                  : "bg-amber-500/20 text-amber-400"
              }`}
            >
              <Database className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display text-sm font-bold text-white">
                  {dbSource === "supabase"
                    ? "BASE DE DATOS SUPABASE CONECTADA"
                    : "MODO DEMO / RESPALDO LOCAL"}
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-black uppercase tracking-wider ${
                    dbSource === "supabase"
                      ? "bg-emerald-500/20 text-emerald-300"
                      : "bg-amber-500/20 text-amber-300"
                  }`}
                >
                  {dbSource === "supabase" ? "ONLINE" : "LOCAL"}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {dbSource === "supabase"
                  ? "Todos los repuestos del catálogo se guardan y actualizan en tiempo real en la nube."
                  : "Para sincronizar tu catálogo con Supabase, completá tus credenciales en .env.local."}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSeed}
              disabled={seedLoading}
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-3.5 py-2 text-xs font-bold text-slate-200 hover:bg-white/10 disabled:opacity-50 transition-colors"
              title="Cargar repuestos y categorías iniciales"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${seedLoading ? "animate-spin" : ""}`} />
              Sincronizar Supabase
            </button>
          </div>
        </div>

        {/* Mensajes de Feedback */}
        {statusMessage && (\n          <div
            className={`mb-6 flex items-center justify-between rounded-xl border p-4 text-xs font-semibold shadow-md ${
              statusMessage.type === "success"
                ? "border-emerald-500/30 bg-emerald-950/40 text-emerald-300"
                : "border-red-500/30 bg-red-950/40 text-red-300"
            }`}
          >
            <div className="flex items-center gap-2">
              {statusMessage.type === "success" ? (
                <Check className="h-4 w-4 text-emerald-400" />
              ) : (
                <AlertCircle className="h-4 w-4 text-red-400" />
              )}
              <span>{statusMessage.text}</span>
            </div>
            <button
              onClick={() => setStatusMessage(null)}
              className="rounded p-1 text-slate-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Tarjetas de Estadísticas */}
        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 shadow-lg">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
              <span>Total Repuestos</span>
              <Layers className="h-4 w-4 text-brand" />
            </div>
            <div className="font-display mt-2 text-3xl font-bold text-white">{stats.total}</div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 shadow-lg">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
              <span>En Stock</span>
              <PackageCheck className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="font-display mt-2 text-3xl font-bold text-emerald-400">
              {stats.inStock}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 shadow-lg">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
              <span>Sin Stock</span>
              <Boxes className="h-4 w-4 text-amber-400" />
            </div>
            <div className="font-display mt-2 text-3xl font-bold text-amber-400">
              {stats.outOfStock}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 shadow-lg">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
              <span>Categorías / Marcas</span>
              <Tag className="h-4 w-4 text-purple-400" />
            </div>
            <div className="font-display mt-2 text-3xl font-bold text-white">
              {stats.categoriesCount} <span className="text-base text-slate-500 font-normal">/ {stats.brandsCount}</span>
            </div>
          </div>
        </div>

        {/* Barra de Acciones y Filtros */}
        <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-white/10 bg-slate-900/60 p-4 shadow-lg">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            {/* Buscador */}
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar por nombre, SKU, marca..."
                className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-xs text-white outline-none placeholder:text-slate-500 focus:border-brand focus:ring-1 focus:ring-brand"
              />
            </div>

            {/* Slider de Categorías con flechas de navegación limpias */}
            <div className="flex items-center gap-1.5 max-w-full lg:max-w-md">
              <button
                onClick={() => scrollCategories("left")}
                aria-label="Desplazar a la izquierda"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <div
                ref={categorySliderRef}
                className="flex flex-1 items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth py-1"
              >
                <button
                  onClick={() => setCategoryFilter("todos")}
                  className={`rounded-lg px-3 py-1.5 text-xs font-bold whitespace-nowrap transition-colors ${
                    categoryFilter === "todos"
                      ? "bg-brand text-white shadow-sm"
                      : "border border-white/10 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  TODOS
                </button>
                {categories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setCategoryFilter(c.id)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-bold whitespace-nowrap transition-colors ${
                      categoryFilter === c.id
                        ? "bg-brand text-white shadow-sm"
                        : "border border-white/10 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>

              <button
                onClick={() => scrollCategories("right")}
                aria-label="Desplazar a la derecha"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            {/* Botones de acción principales */}
            <div className="flex shrink-0 flex-wrap items-center gap-2">
              <button
                onClick={() => setBrandManagerOpen(true)}
                className="btn inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-3.5 py-2.5 text-xs font-bold text-white hover:bg-white/10 whitespace-nowrap"
              >
                <Tag className="h-4 w-4" />
                MARCAS
              </button>

              <button
                onClick={() => setCatManagerOpen(true)}
                className="btn inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-3.5 py-2.5 text-xs font-bold text-white hover:bg-white/10 whitespace-nowrap"
              >
                <Layers className="h-4 w-4" />
                CATEGORÍAS
              </button>

              <button
                onClick={() => {
                  setEditingProduct(null)
                  setModalOpen(true)
                }}
                className="btn btn-brand flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-xs text-white shadow-lg shadow-brand/25 whitespace-nowrap"
              >
                <Plus className="h-4 w-4" />
                NUEVO PRODUCTO
              </button>
            </div>
          </div>
        </div>

        {/* Tabla de Productos del Catálogo */}
        {loading ? (
          <div className="flex h-64 items-center justify-center rounded-2xl border border-white/10 bg-slate-900/40">
            <Loader2 className="h-8 w-8 animate-spin text-brand" />
          </div>
        ) : filteredProducts.length === 0 ? (\n          <div className="rounded-2xl border border-dashed border-white/10 bg-slate-900/40 py-16 text-center shadow-lg">
            <Boxes className="mx-auto h-12 w-12 text-slate-600 mb-3" />
            <h3 className="font-display text-base font-bold text-white">No se encontraron productos</h3>
            <p className="mt-1 text-xs text-slate-400">
              Probá modificando el término de búsqueda o la categoría seleccionada.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70 shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-white/10 bg-white/5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  <tr>
                    <th className="px-4 py-3.5">Foto</th>
                    <th className="px-4 py-3.5">Nombre y SKU</th>
                    <th className="px-4 py-3.5">Categoría</th>
                    <th className="px-4 py-3.5">Marca / Fabricante</th>
                    <th className="px-4 py-3.5 text-center">Disponibilidad</th>
                    <th className="px-4 py-3.5 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredProducts.map((p) => {
                    const inStock = p.in_stock !== false

                    return (
                      <tr key={p.id} className="transition-colors hover:bg-white/[0.02]">
                        {/* Foto */}
                        <td className="px-4 py-3.5">
                          <div className="relative h-12 w-12 overflow-hidden rounded-xl border border-white/10 bg-white/5">
                            <Image
                              src={p.image || "/placeholder.svg"}
                              alt={p.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </td>

                        {/* Nombre & SKU */}
                        <td className="px-4 py-3.5">
                          <p className="font-display text-sm font-bold text-white">{p.name}</p>
                          <p className="mt-0.5 font-mono text-[11px] text-brand">
                            SKU: {p.sku || p.id.toUpperCase()}
                          </p>
                        </td>

                        {/* Categoría */}
                        <td className="px-4 py-3.5">
                          <span className="rounded-md bg-white/10 px-2 py-1 text-[10px] font-bold tracking-wider text-slate-300">
                            {categoryLabel(p.category as CategoryId, categories)}
                          </span>
                        </td>

                        {/* Marca */}
                        <td className="px-4 py-3.5">
                          <span className="font-semibold text-slate-200">
                            {p.brand || "Universal"}
                          </span>
                        </td>

                        {/* Stock */}
                        <td className="px-4 py-3.5 text-center">
                          <button
                            onClick={() => handleToggleStock(p)}
                            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold transition-all ${
                              inStock
                                ? "bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25"
                                : "bg-red-500/15 text-red-300 hover:bg-red-500/25"
                            }`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                inStock ? "bg-emerald-400" : "bg-red-400"
                              }`}
                            />
                            {inStock ? "EN STOCK" : "SIN STOCK"}
                          </button>
                        </td>

                        {/* Acciones */}
                        <td className="px-4 py-3.5 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => {
                                setEditingProduct(p)
                                setModalOpen(true)
                              }}
                              className="rounded-lg border border-white/10 bg-white/5 p-2 text-slate-300 hover:border-brand hover:bg-brand/20 hover:text-white transition-colors"
                              title="Editar producto"
                            >
                              <Edit2 className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => setDeletingId(p.id)}
                              className="rounded-lg border border-red-500/20 bg-red-500/10 p-2 text-red-400 hover:border-red-500 hover:bg-red-500 hover:text-white transition-colors"
                              title="Eliminar producto"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Modal Formulario de Producto */}
      <ProductFormModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false)
          setEditingProduct(null)
        }}
        onSaved={() => {
          loadData()
          setStatusMessage({
            type: "success",
            text: editingProduct
              ? `Producto "${editingProduct.name}" modificado con éxito.`
              : "Nuevo producto creado con éxito.",
          })
        }}
        productToEdit={editingProduct}
        categories={categories}
        brands={brands.map((b) => b.name)}
        onCategoryCreated={(cat) => setCategories((prev) => [...prev, cat])}
      />

      {/* Modal para Gestionar y Borrar Marcas */}
      {brandManagerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-dark/80 backdrop-blur-sm"
            onClick={() => setBrandManagerOpen(false)}
          />
          <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-6 py-4">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand/20 text-brand">
                  <Tag className="h-4 w-4" />
                </span>
                <div>
                  <h4 className="font-display text-base font-bold text-white">GESTIONAR MARCAS</h4>
                  <p className="text-xs text-slate-400">Creá o eliminá marcas compatibles del catálogo</p>
                </div>
              </div>
              <button
                onClick={() => setBrandManagerOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6">
              {/* Formulario para agregar */}
              <form onSubmit={handleCreateBrand} className="mb-6">
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-300">
                  Agregar Nueva Marca
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={newBrandName}
                    onChange={(e) => setNewBrandName(e.target.value)}
                    placeholder="Ej: Chevrolet, Renault, Agrale..."
                    className="flex-1 rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-xs font-bold text-white outline-none focus:border-brand"
                  />
                  <button
                    type="submit"
                    disabled={creatingBrandLoading || !newBrandName.trim()}
                    className="btn btn-brand shrink-0 rounded-xl px-5 py-2.5 text-xs text-white disabled:opacity-50"
                  >
                    {creatingBrandLoading ? "CREANDO..." : "+ AGREGAR"}
                  </button>
                </div>
              </form>

              {/* Lista de marcas existentes */}
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-300">
                  Marcas Registradas ({brands.length})
                </label>
                <div className="max-h-60 overflow-y-auto rounded-xl border border-white/10 bg-slate-950/50 p-2 divide-y divide-white/5">
                  {brands.map((b) => {
                    const count = products.filter((p) => p.brand === b.name).length
                    return (
                      <div
                        key={b.id}
                        className="flex items-center justify-between px-3 py-2.5 transition-colors hover:bg-white/[0.02]"
                      >
                        <div>
                          <p className="text-xs font-bold text-white">{b.name}</p>
                          <p className="font-mono text-[10px] text-slate-500">
                            {count} {count === 1 ? "repuesto asociado" : "repuestos asociados"}
                          </p>
                        </div>

                        <button
                          onClick={() => setDeletingBrandId(b.id)}
                          className="rounded-lg border border-red-500/20 bg-red-500/10 p-1.5 text-red-400 hover:border-red-500 hover:bg-red-500 hover:text-white transition-colors"
                          title="Eliminar marca"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 bg-white/5 px-6 py-3 text-right">
              <button
                type="button"
                onClick={() => setBrandManagerOpen(false)}
                className="btn rounded-lg border border-white/10 px-4 py-2 text-xs text-slate-300 hover:bg-white/10"
              >
                LISTO
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmación para borrar marca */}
      {deletingBrandId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-dark/80 backdrop-blur-sm"
            onClick={() => setDeletingBrandId(null)}
          />
          <div className="relative z-10 w-full max-w-sm rounded-2xl border border-white/10 bg-slate-900 p-6 text-center shadow-2xl">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/20 text-red-400">
              <Trash2 className="h-6 w-6" />
            </div>
            <h4 className="font-display text-lg font-bold text-white">¿Eliminar marca?</h4>
            <p className="mt-2 text-xs text-slate-400">
              Se eliminará esta marca ({deletingBrandId}). Los repuestos asociados seguirán existiendo con la marca por defecto.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                onClick={() => setDeletingBrandId(null)}
                className="btn rounded-lg border border-white/10 px-4 py-2 text-xs text-slate-300 hover:bg-white/10"
              >
                CANCELAR
              </button>
              <button
                onClick={() => handleDeleteBrand(deletingBrandId)}
                className="btn btn-alert rounded-lg px-4 py-2 text-xs text-white"
              >
                SÍ, ELIMINAR
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para Gestionar y Borrar Categorías */}
      {catManagerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-dark/80 backdrop-blur-sm"
            onClick={() => setCatManagerOpen(false)}
          />
          <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-6 py-4">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand/20 text-brand">
                  <Layers className="h-4 w-4" />
                </span>
                <div>
                  <h4 className="font-display text-base font-bold text-white">GESTIONAR CATEGORÍAS</h4>
                  <p className="text-xs text-slate-400">Creá o eliminá categorías del catálogo</p>
                </div>
              </div>
              <button
                onClick={() => setCatManagerOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6">
              {/* Formulario para agregar */}
              <form onSubmit={handleCreateCategory} className="mb-6">
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-300">
                  Agregar Nueva Categoría
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={newCatLabel}
                    onChange={(e) => setNewCatLabel(e.target.value)}
                    placeholder="Ej: SUSPENSIÓN NEUMÁTICA, BULONERÍA..."
                    className="flex-1 rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-xs font-bold uppercase text-white outline-none focus:border-brand"
                  />
                  <button
                    type="submit"
                    disabled={creatingCatLoading || !newCatLabel.trim()}
                    className="btn btn-brand shrink-0 rounded-xl px-5 py-2.5 text-xs text-white disabled:opacity-50"
                  >
                    {creatingCatLoading ? "CREANDO..." : "+ AGREGAR"}
                  </button>
                </div>
              </form>

              {/* Lista de categorías existentes */}
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-300">
                  Categorías Actuales ({categories.length})
                </label>
                <div className="max-h-60 overflow-y-auto rounded-xl border border-white/10 bg-slate-950/50 p-2 divide-y divide-white/5">
                  {categories.map((cat) => {
                    const count = products.filter((p) => p.category === cat.id).length
                    return (
                      <div
                        key={cat.id}
                        className="flex items-center justify-between px-3 py-2.5 transition-colors hover:bg-white/[0.02]"
                      >
                        <div>
                          <p className="text-xs font-bold text-white">{cat.label}</p>
                          <p className="font-mono text-[10px] text-slate-500">
                            id: {cat.id} · {count} {count === 1 ? "repuesto" : "repuestos"}
                          </p>
                        </div>

                        <button
                          onClick={() => setDeletingCatId(cat.id)}
                          className="rounded-lg border border-red-500/20 bg-red-500/10 p-1.5 text-red-400 hover:border-red-500 hover:bg-red-500 hover:text-white transition-colors"
                          title="Eliminar categoría"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 bg-white/5 px-6 py-3 text-right">
              <button
                type="button"
                onClick={() => setCatManagerOpen(false)}
                className="btn rounded-lg border border-white/10 px-4 py-2 text-xs text-slate-300 hover:bg-white/10"
              >
                LISTO
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmación para borrar categoría */}
      {deletingCatId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-dark/80 backdrop-blur-sm"
            onClick={() => setDeletingCatId(null)}
          />
          <div className="relative z-10 w-full max-w-sm rounded-2xl border border-white/10 bg-slate-900 p-6 text-center shadow-2xl">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/20 text-red-400">
              <Trash2 className="h-6 w-6" />
            </div>
            <h4 className="font-display text-lg font-bold text-white">¿Eliminar categoría?</h4>
            <p className="mt-2 text-xs text-slate-400">
              Se eliminará esta categoría ({deletingCatId}). Los productos asignados a ella deberán ser reasignados.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                onClick={() => setDeletingCatId(null)}
                className="btn rounded-lg border border-white/10 px-4 py-2 text-xs text-slate-300 hover:bg-white/10"
              >
                CANCELAR
              </button>
              <button
                onClick={() => handleDeleteCategory(deletingCatId)}
                className="btn btn-alert rounded-lg px-4 py-2 text-xs text-white"
              >
                SÍ, ELIMINAR
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmación de Eliminación de Producto */}
      {deletingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-dark/80 backdrop-blur-sm"
            onClick={() => setDeletingId(null)}
          />
          <div className="relative z-10 w-full max-w-sm rounded-2xl border border-white/10 bg-slate-900 p-6 text-center shadow-2xl">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/20 text-red-400">
              <Trash2 className="h-6 w-6" />
            </div>
            <h4 className="font-display text-lg font-bold text-white">¿Eliminar producto?</h4>
            <p className="mt-2 text-xs text-slate-400">
              Esta acción no se puede deshacer y el repuesto dejará de aparecer en el catálogo público.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                onClick={() => setDeletingId(null)}
                className="btn rounded-lg border border-white/10 px-4 py-2 text-xs text-slate-300 hover:bg-white/10"
              >
                CANCELAR
              </button>
              <button
                onClick={() => handleDelete(deletingId)}
                className="btn btn-alert rounded-lg px-4 py-2 text-xs text-white"
              >
                SÍ, ELIMINAR
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

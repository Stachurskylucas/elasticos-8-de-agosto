"use client"

import { useEffect, useMemo, useState } from "react"
import {
  ArrowUpDown,
  Boxes,
  Check,
  RotateCcw,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react"
import { ProductCard } from "@/components/product-card"
import {
  INITIAL_BRANDS,
  INITIAL_CATEGORIES,
  INITIAL_PRODUCTS,
  type Category,
  type CategoryId,
  type Product,
} from "@/lib/products"

type Filter = "todos" | CategoryId

type SortOption =
  | "destacado"
  | "az"
  | "za"
  | "nuevo-viejo"
  | "viejo-nuevo"

function normalizeText(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
}

export function ProductsCatalog() {
  const [filter, setFilter] = useState<Filter>("todos")
  const [query, setQuery] = useState("")
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [onlyInStock, setOnlyInStock] = useState(false)
  const [showAllBrands, setShowAllBrands] = useState(false)
  const [sortBy, setSortBy] = useState<SortOption>("destacado")
  const [items, setItems] = useState<Product[]>(INITIAL_PRODUCTS)
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES)
  const [allKnownBrands, setAllKnownBrands] = useState<string[]>(INITIAL_BRANDS)
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)

  // Cargar productos, categorías y marcas desde la base de datos
  useEffect(() => {
    async function fetchData() {
      try {
        const [resP, resC, resB] = await Promise.all([
          fetch("/api/products"),
          fetch("/api/categories"),
          fetch("/api/brands"),
        ])

        if (resP.ok) {
          const dataP = await resP.json()
          if (dataP.products && Array.isArray(dataP.products)) {
            setItems(dataP.products)
          }
        }

        if (resC.ok) {
          const dataC = await resC.json()
          if (dataC.categories && Array.isArray(dataC.categories)) {
            setCategories(dataC.categories)
          }
        }

        if (resB.ok) {
          const dataB = await resB.json()
          if (dataB.brands && Array.isArray(dataB.brands)) {
            setAllKnownBrands(dataB.brands.map((b: any) => b.name))
          }
        }
      } catch (err) {
        console.warn("Usando datos locales de repuesto:", err)
      }
    }
    fetchData()
  }, [])

  // Lista de marcas disponibles con conteo en tiempo real
  const brandList = useMemo(() => {
    const brandMap: Record<string, number> = {}

    // Inicializar marcas conocidas con 0
    allKnownBrands.forEach((b) => {
      brandMap[b] = 0
    })

    // Contar según productos activos
    items.forEach((p) => {
      const b = p.brand || "Universal"
      const matchesCategory = filter === "todos" || p.category === filter
      if (matchesCategory) {
        brandMap[b] = (brandMap[b] || 0) + 1
      }
    })

    return Object.entries(brandMap)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
  }, [items, filter, allKnownBrands])

  const toggleBrand = (brandName: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brandName)
        ? prev.filter((b) => b !== brandName)
        : [...prev, brandName]
    )
  }

  const visible = useMemo(() => {
    const q = normalizeText(query.trim())
    const list = items.filter((p) => {
      const okCat = filter === "todos" || p.category === filter
      if (!okCat) return false

      // Filtro por marcas seleccionadas
      if (selectedBrands.length > 0) {
        const pBrand = p.brand || "Universal"
        if (!selectedBrands.includes(pBrand)) return false
      }

      if (onlyInStock && p.in_stock === false) return false
      if (q === "") return true
      const normName = normalizeText(p.name)
      const normDesc = normalizeText(p.desc || "")
      const normSku = normalizeText(p.sku || "")
      const normBrand = normalizeText(p.brand || "")
      return (
        normName.includes(q) ||
        normDesc.includes(q) ||
        normSku.includes(q) ||
        normBrand.includes(q)
      )
    })

    // Ordenamiento
    switch (sortBy) {
      case "az":
        list.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "za":
        list.sort((a, b) => b.name.localeCompare(a.name))
        break
      case "nuevo-viejo":
        list.sort(
          (a, b) =>
            new Date(b.created_at || 0).getTime() -
            new Date(a.created_at || 0).getTime()
        )
        break
      case "viejo-nuevo":
        list.sort(
          (a, b) =>
            new Date(a.created_at || 0).getTime() -
            new Date(b.created_at || 0).getTime()
        )
        break
      case "destacado":
      default:
        break
    }

    return list
  }, [items, filter, query, selectedBrands, onlyInStock, sortBy])

  const categoryChips = [
    { id: "todos", label: "TODOS LOS REPUESTOS", count: items.length },
    ...categories.map((c) => ({
      id: c.id as Filter,
      label: c.label,
      count: items.filter((p) => p.category === c.id).length,
    })),
  ]

  const hasActiveFilters =
    filter !== "todos" || query !== "" || onlyInStock || selectedBrands.length > 0

  const resetFilters = () => {
    setFilter("todos")
    setQuery("")
    setSelectedBrands([])
    setOnlyInStock(false)
  }

  const displayedBrands = showAllBrands ? brandList : brandList.slice(0, 6)

  return (
    <section className="section-gray py-8 md:py-12">
      <div className="w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 mx-auto">
        {/* Botón de Filtros para Móviles */}
        <div className="mb-4 flex items-center justify-between lg:hidden">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="btn btn-dark inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold text-white shadow-sm"
          >
            <SlidersHorizontal className="h-4 w-4" />
            FILTRAR CATÁLOGO
          </button>
          <span className="text-xs font-semibold text-slate-500">
            {visible.length} repuestos
          </span>
        </div>

        {/* Layout de 2 Columnas estándar */}
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* ================= COLUMNA IZQUIERDA: FILTROS ================= */}
          <aside
            className={`fixed inset-0 z-40 bg-dark/80 backdrop-blur-sm transition-opacity lg:static lg:z-auto lg:block lg:w-60 lg:shrink-0 lg:bg-transparent ${
              mobileFilterOpen ? "block" : "hidden"
            }`}
          >
            <div className="fixed inset-y-0 left-0 w-80 max-w-[85vw] overflow-y-auto bg-white p-6 shadow-2xl lg:static lg:w-full lg:max-w-none lg:rounded-2xl lg:border lg:border-slate-200 lg:p-4 lg:shadow-sm">
              {/* Header en Mobile */}
              <div className="mb-5 flex items-center justify-between border-b border-slate-100 pb-3 lg:hidden">
                <div className="flex items-center gap-2 font-display text-sm font-bold text-dark">
                  <SlidersHorizontal className="h-4 w-4 text-brand" />
                  FILTRAR CATÁLOGO
                </div>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="rounded-lg p-1 text-slate-400 hover:text-dark"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Buscador */}
              <div className="mb-5">
                <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Buscar en catálogo
                </label>
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                  <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Repuesto, SKU..."
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 py-1.5 pl-8 pr-8 text-xs text-dark outline-none transition-colors focus:border-brand focus:bg-white"
                  />
                  {query && (
                    <button
                      onClick={() => setQuery("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-dark"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </div>
              </div>

              {/* Categorías */}
              <div className="mb-5 border-b border-slate-100 pb-5">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Categorías
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  {categoryChips.map((c) => {
                    const active = filter === c.id
                    return (
                      <button
                        key={c.id}
                        onClick={() => {
                          setFilter(c.id)
                          setMobileFilterOpen(false)
                        }}
                        className={`group flex items-center justify-between rounded-lg px-2.5 py-2 text-left text-xs font-bold transition-all ${
                          active
                            ? "bg-brand text-white shadow-sm shadow-brand/25 font-bold"
                            : "text-slate-700 hover:bg-slate-100 hover:text-dark"
                        }`}
                      >
                        <span className="truncate">{c.label}</span>
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                            active
                              ? "bg-white/20 text-white"
                              : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
                          }`}
                        >
                          {c.count}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* MARCA */}
              <div className="mb-5 border-b border-slate-100 pb-5">
                <div className="mb-2.5 flex items-center justify-between">
                  <span className="font-display text-xs font-bold uppercase tracking-wider text-dark">
                    MARCA
                  </span>
                  {selectedBrands.length > 0 && (
                    <button
                      onClick={() => setSelectedBrands([])}
                      className="text-[10px] font-bold text-brand hover:underline"
                    >
                      Limpiar ({selectedBrands.length})
                    </button>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  {displayedBrands.map((b) => {
                    const isChecked = selectedBrands.includes(b.name)
                    return (
                      <label
                        key={b.name}
                        onClick={() => toggleBrand(b.name)}
                        className="group flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer select-none transition-colors hover:text-dark"
                      >
                        {/* Custom Checkbox */}
                        <div
                          className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${
                            isChecked
                              ? "border-brand bg-brand text-white"
                              : "border-slate-300 bg-white group-hover:border-slate-400"
                          }`}
                        >
                          {isChecked && <Check className="h-3 w-3 stroke-[3]" />}
                        </div>
                        <span className="flex-1 truncate">{b.name}</span>
                        <span className="text-[11px] text-slate-400">({b.count})</span>
                      </label>
                    )
                  })}
                </div>

                {brandList.length > 6 && (
                  <button
                    type="button"
                    onClick={() => setShowAllBrands(!showAllBrands)}
                    className="mt-2.5 text-[11px] font-bold text-slate-500 underline hover:text-dark"
                  >
                    {showAllBrands ? "Ver menos" : `Ver más (${brandList.length - 6})`}
                  </button>
                )}
              </div>

              {/* Disponibilidad */}
              <div className="mb-5">
                <span className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Disponibilidad
                </span>

                <button
                  type="button"
                  onClick={() => setOnlyInStock(!onlyInStock)}
                  className={`flex w-full items-center justify-between rounded-xl border p-2.5 text-xs font-bold transition-all ${
                    onlyInStock
                      ? "border-emerald-500/40 bg-emerald-50 text-emerald-800 shadow-sm"
                      : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        onlyInStock ? "bg-emerald-500 animate-pulse" : "bg-slate-400"
                      }`}
                    />
                    <span>Solo en stock</span>
                  </div>

                  {/* Switch Pill */}
                  <div
                    className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                      onlyInStock ? "bg-emerald-600" : "bg-slate-300"
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        onlyInStock ? "translate-x-4" : "translate-x-0"
                      }`}
                    />
                  </div>
                </button>
              </div>

              {/* Limpiar Filtros */}
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-slate-300 py-1.5 text-xs font-bold text-slate-500 hover:border-brand hover:text-brand transition-colors"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  LIMPIAR TODOS LOS FILTROS
                </button>
              )}
            </div>
          </aside>

          {/* ================= COLUMNA DERECHA: REPUESTOS ================= */}
          <main className="flex-1 w-full">
            {/* Top Bar: Conteo y Ordenar por */}
            <div className="mb-5 flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-display text-sm font-bold text-dark">
                  {filter === "todos"
                    ? "CATÁLOGO DE REPUESTOS"
                    : categories.find((c) => c.id === filter)?.label || "CATÁLOGO"}
                  {selectedBrands.length > 0 && (
                    <span className="ml-2 text-xs font-normal text-slate-500">
                      ({selectedBrands.join(", ")})
                    </span>
                  )}
                </h2>
                <p className="text-[11px] text-slate-500">
                  Mostrando <span className="font-bold text-dark">{visible.length}</span>{" "}
                  {visible.length === 1 ? "repuesto" : "repuestos"}
                </p>
              </div>

              {/* Selector Ordenar por (recto, sin bordes redondeados) */}
              <div className="flex items-center gap-2">
                <label
                  htmlFor="catalog-sort"
                  className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 whitespace-nowrap"
                >
                  <ArrowUpDown className="h-3.5 w-3.5 text-brand" />
                  Ordenar por:
                </label>
                <select
                  id="catalog-sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="rounded-none border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-dark outline-none cursor-pointer hover:border-brand focus:border-brand"
                >
                  <option value="destacado">Destacados</option>
                  <option value="az">A - Z</option>
                  <option value="za">Z - A</option>
                  <option value="nuevo-viejo">Más nuevo al más viejo</option>
                  <option value="viejo-nuevo">Más viejo al más nuevo</option>
                </select>
              </div>
            </div>

            {/* Grilla de productos */}
            {visible.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {visible.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-slate-300 bg-white py-16 text-center shadow-sm">
                <Boxes className="mx-auto h-10 w-10 text-slate-400 mb-3" />
                <p className="font-display text-base font-bold text-dark">No se encontraron productos en el catálogo</p>
                <p className="mt-1 text-xs text-slate-500">
                  Probá modificando los filtros aplicados o la palabra de búsqueda.
                </p>
                <button
                  onClick={resetFilters}
                  className="btn btn-brand mt-4 rounded-full px-5 py-2 text-xs text-white"
                >
                  RESTABLECER FILTROS
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </section>
  )
}

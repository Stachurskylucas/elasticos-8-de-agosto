"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import {
  Camera,
  ChevronLeft,
  ChevronRight,
  Clock,
  Mail,
  MapPin,
  MessageSquare,
  Pause,
  Play,
  Search,
  Sparkles,
} from "lucide-react"
import { ADDRESS, EMAIL, HOURS, MAPS_URL, wa } from "@/lib/site"
import { evento } from "@/lib/analitica"
import type { Category, Product } from "@/lib/products"

interface ProductLine {
  id: string
  title: string
  subtitle: string
  category: "elasticos" | "fijacion" | "amortiguacion"
  image: string
  tag: string
  description: string
  specs: string[]
  applications: string[]
  whatsappMsg: string
}

// ============================================================
// LÍNEAS DE PRODUCTOS EN STOCK FÍSICO
// ============================================================
const COMMON_TAG = "EN STOCK"

const PRODUCT_LINES: ProductLine[] = [
  {
    id: "elasticos-completos",
    title: "Elásticos completos",
    subtitle: "Delanteros, traseros y de tándem, ya armados",
    category: "elasticos",
    image: "/images/prod-elasticos.webp",
    tag: COMMON_TAG,
    description: "El paquete entero, listo para colocar. Lo sacás del mostrador y va directo al camión.",
    specs: [
      "Acero para elásticos templado y revenido",
      "Ojos rolados en caliente",
      "Pintados contra el óxido",
      "Medida original o reforzados",
    ],
    applications: [
      "Mercedes-Benz, Scania, Volvo, Iveco, Ford Cargo, VW",
      "Semirremolques y bateas: Randon, Helvetica, Cormetal",
      "Utilitarios: Sprinter, Daily, Hilux, Ranger",
    ],
    whatsappMsg:
      "Hola! Quiero consultar por Elásticos Completos. Mi unidad es un [Marca y Modelo] y busco [Delantero / Trasero / Reforzado].",
  },
  {
    id: "hojas-recambio",
    title: "Hojas sueltas y refuerzos",
    subtitle: "Maestras, segundas hojas y hojas de apoyo",
    category: "elasticos",
    image: "/images/prod-hojas.webp",
    tag: COMMON_TAG,
    description: "Si se partió una hoja no hace falta cambiar todo el elástico. Cambiamos esa sola.",
    specs: [
      "Hojas maestras con el ojo listo para el buje",
      "Segundas hojas con vuelta entera o media vuelta",
      "Hojas comunes y parabólicas",
      "Distintos espesores y curvas",
    ],
    applications: [
      "Hoja fisurada o partida",
      "Refuerzo para camiones que andan con sobrecarga",
      "Camiones nacionales e importados",
    ],
    whatsappMsg:
      "Hola! Necesito consultar por Hojas de Recambio para mi elástico. Modelo de camión o medidas: ",
  },
  {
    id: "grampas-abrazaderas",
    title: "Grampas U y placas",
    subtitle: "Lo que sujeta el elástico al eje",
    category: "fijacion",
    image: "/images/prod-grampas.webp",
    tag: COMMON_TAG,
    description: "Grampas grado 8 y 10.9 con tuercas altas. Una grampa floja hace correr el paquete, así que conviene no ahorrar acá.",
    specs: [
      "Grado 8 y grado 10.9",
      "Rosca fina, con tuercas altas y arandelas",
      "Redondas, semirredondas y cuadradas",
      "Placas de asiento, cuñas y suplementos",
    ],
    applications: [
      "Ejes delanteros, de tracción y balancines",
      "Semirremolques de 2 y 3 ejes",
      "Bateas y acoplados tolva",
    ],
    whatsappMsg:
      "Hola! Quiero consultar stock de Grampas y Placas de fijación. Medidas aproximadas o modelo: ",
  },
  {
    id: "bujes-goma",
    title: "Bujes y soportes",
    subtitle: "Si el camión golpea atrás, empezá por acá",
    category: "fijacion",
    image: "/images/prod-bujes.webp",
    tag: COMMON_TAG,
    description: "Van en los ojos del elástico y absorben los golpes. Cuando se gastan, aparecen los ruidos.",
    specs: [
      "Goma y metal vulcanizados",
      "Poliuretano, que dura más",
      "Bronce para trabajo muy pesado",
    ],
    applications: [
      "Ojos de elástico y pernos de gemelo",
      "Tensores y barras estabilizadoras",
      "Camiones, bateas y utilitarios",
    ],
    whatsappMsg:
      "Hola! Consulto por Bujes de suspensión para mi unidad. Marca / Modelo: ",
  },
  {
    id: "pernos-grilletes",
    title: "Pernos de centro, grilletes y gemelos",
    subtitle: "Las articulaciones del elástico",
    category: "fijacion",
    image: "/images/prod-pernos.webp",
    tag: COMMON_TAG,
    description: "El perno de centro mantiene las hojas en su lugar. Los gemelos y grilletes dejan que el elástico trabaje.",
    specs: [
      "Pernos de centro con tratamiento térmico",
      "Pernos de gemelo con alemite para engrasar",
      "Grilletes y planchuelas de acero forjado",
      "Tuercas autofrenantes",
    ],
    applications: [
      "Armado de paquetes de hojas",
      "Unión de los extremos del elástico al chasis",
      "Camiones pesados, volcadores y carretones",
    ],
    whatsappMsg:
      "Hola! Quiero consultar por Pernos centrales y Grilletes para suspensión de: ",
  },
  {
    id: "amortiguadores-tensores",
    title: "Amortiguadores y tensores",
    subtitle: "Para que el eje no se mueva de su lugar",
    category: "amortiguacion",
    image: "/images/prod-amortiguadores.webp",
    tag: COMMON_TAG,
    description: "El amortiguador frena el rebote. El tensor mantiene el eje derecho. Si alguno falla, las cubiertas se gastan en serrucho.",
    specs: [
      "Amortiguadores de doble efecto para camión",
      "Tensores regulables con rótula",
      "Bujes de recambio para tensores",
    ],
    applications: [
      "Ejes de tracción, delanteros y de arrastre",
      "Suspensión de elásticos y neumática",
      "Semirremolques y camiones de larga distancia",
    ],
    whatsappMsg:
      "Hola! Quiero consultar precio y stock de Amortiguadores / Tensores para: ",
  },
]

const CATEGORIES = [
  { id: "todos", label: "TODO" },
  { id: "elasticos", label: "ELÁSTICOS Y HOJAS" },
  { id: "fijacion", label: "GRAMPAS Y FIJACIÓN" },
  { id: "amortiguacion", label: "AMORTIGUADORES Y TENSORES" },
]

// ============================================================
// FOTOS GRANDES DEL DEPÓSITO Y EL TALLER
// ============================================================
const LARGE_STOCK_SLIDES = [
  {
    src: "/images/taller/rack-elasticos-2.webp",
    alt: "Racks con elásticos armados en el depósito",
    title: "ELÁSTICOS ARMADOS",
    subtitle: "Listos para llevar o para colocar en el taller",
    tag: "DEPÓSITO",
  },
  {
    src: "/images/taller/pared-hojas-elevador.webp",
    alt: "Pared con hojas de elástico colgadas por medida",
    title: "HOJAS SUELTAS",
    subtitle: "Colgadas por medida, para cambiar solo la que se rompió",
    tag: "HOJAS",
  },
  {
    src: "/images/taller/elastico-prensa.webp",
    alt: "Elástico en la prensa del taller",
    title: "EL TALLER",
    subtitle: "Si querés, te lo colocamos acá mismo",
    tag: "TALLER",
  },
  {
    src: "/images/banner-ruta.webp",
    alt: "Camiones en la ruta",
    title: "ENVIAMOS A TODO EL PAÍS",
    subtitle: "Despachamos por expreso a cualquier provincia",
    tag: "ENVÍOS",
  },
]

type Brand = { id: string; name: string }

/**
 * Recibe los datos ya cargados en el servidor (así los productos quedan en el HTML para Google)
 * y después los refresca en el navegador.
 */
export function CatalogoInformativo({
  initialProducts = [],
  initialCategories = [],
  initialBrands = [],
}: {
  initialProducts?: Product[]
  initialCategories?: Category[]
  initialBrands?: Brand[]
} = {}) {
  const [selectedCat, setSelectedCat] = useState("todos")
  const [selectedBrand, setSelectedBrand] = useState("todas")
  const [search, setSearch] = useState("")

  const [expandedProduct, setExpandedProduct] = useState<Product | null>(null)

  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [categories, setCategories] = useState<Category[]>(
    initialCategories.length ? [{ id: "todos", label: "TODO" }, ...initialCategories] : [],
  )
  const [brands, setBrands] = useState<Brand[]>(
    initialBrands.length ? [{ id: "todas", name: "Todas" }, ...initialBrands] : [],
  )
  const [loading, setLoading] = useState(initialProducts.length === 0)

  useEffect(() => {
    async function loadData() {
      try {
        const [resP, resC, resB] = await Promise.all([
          fetch("/api/products"),
          fetch("/api/categories"),
          fetch("/api/brands"),
        ])
        const dataP = await resP.json()
        const dataC = await resC.json()
        const dataB = await resB.json()

        // Si una API falla, se conserva lo que vino del servidor en vez de vaciar el catálogo.
        if (resP.ok && Array.isArray(dataP.products)) setProducts(dataP.products)
        if (resC.ok && Array.isArray(dataC.categories))
          setCategories([{ id: "todos", label: "TODO" }, ...dataC.categories])
        if (resB.ok && Array.isArray(dataB.brands)) setBrands([{ id: "todas", name: "Todas" }, ...dataB.brands])
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  // Carrusel extra grande
  const [activeSlide, setActiveSlide] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)

  // Formulario de contacto
  const [nombre, setNombre] = useState("")
  const [telefono, setTelefono] = useState("")
  const [ciudad, setCiudad] = useState("")
  const [mensaje, setMensaje] = useState("")

  const totalSlides = LARGE_STOCK_SLIDES.length

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % totalSlides)
  }

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  useEffect(() => {
    if (!autoPlay) return
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % totalSlides)
    }, 4500)
    return () => clearInterval(timer)
  }, [autoPlay, totalSlides])

  const filtered = products.filter((p) => {
    const matchCat = selectedCat === "todos" || p.category === selectedCat
    const matchBrand = selectedBrand === "todas" || (p.brand && p.brand.toLowerCase() === selectedBrand.toLowerCase())
    const q = search.toLowerCase().trim()
    const matchSearch =
      q === "" ||
      p.name.toLowerCase().includes(q) ||
      p.desc.toLowerCase().includes(q) ||
      (p.brand && p.brand.toLowerCase().includes(q))

    return matchCat && matchBrand && matchSearch
  })

  useEffect(() => {
    const q = search.trim()
    if (q.length < 3 || loading) return
    const t = setTimeout(() => evento("busqueda", { dato: q, resultados: filtered.length }), 1500)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, loading])

  useEffect(() => {
    if (expandedProduct) evento("ver_producto", { dato: expandedProduct.name })
  }, [expandedProduct])

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault()
    evento("formulario")
    let text = `Hola! Me comunico desde el sitio web de Elásticos 8 de Agosto para consultar por repuestos:\n`
    if (nombre.trim()) text += `\n👤 *Nombre y Apellido:* ${nombre.trim()}`
    if (telefono.trim()) text += `\n📞 *Teléfono:* ${telefono.trim()}`
    if (ciudad.trim()) text += `\n📍 *Ciudad / Localidad:* ${ciudad.trim()}`
    if (mensaje.trim()) text += `\n\n💬 *Consulta / Repuesto:* ${mensaje.trim()}`

    window.open(wa(text), "_blank")
  }

  return (
    <div className="w-full bg-white">
      {/* ============ CATÁLOGO Y FILTROS INTEGRADOS ============ */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-[1400px] px-5 md:px-8">
          <div className="flex flex-col gap-8 md:flex-row">
            {/* Sidebar Filtros */}
            <aside className="w-full md:w-64 shrink-0 space-y-8">
              {/* Buscador */}
              <div>
                <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Buscar
                </h3>
                <div className="relative w-full">
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Repuesto, medida..."
                    className="w-full rounded-none border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-xs font-medium text-dark transition-all focus:border-brand focus:bg-white focus:outline-none"
                  />
                  <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                </div>
              </div>

              {/* Categorías */}
              <div>
                <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Categorías
                </h3>
                <div className="flex flex-col gap-1.5">
                  {categories.map((cat) => {
                    const isActive = selectedCat === cat.id
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCat(cat.id)}
                        className={`text-left rounded-none px-3 py-2 text-xs font-bold transition-all ${
                          isActive
                            ? "bg-brand text-white shadow-sm"
                            : "bg-transparent text-slate-600 hover:bg-slate-100 hover:text-dark"
                        }`}
                      >
                        {cat.label}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Marcas Frecuentes */}
              <div>
                <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Marcas
                </h3>
                <div className="flex flex-col gap-1.5">
                  {brands.map((brand) => {
                    const isActive = selectedBrand === brand.id
                    return (
                      <button
                        key={brand.id}
                        onClick={() => setSelectedBrand(brand.id)}
                        className={`text-left rounded-none px-3 py-2 text-xs font-bold transition-all ${
                          isActive
                            ? "bg-dark text-white shadow-sm"
                            : "bg-transparent text-slate-600 hover:bg-slate-100 hover:text-dark"
                        }`}
                      >
                        {brand.name}
                      </button>
                    )
                  })}
                </div>
              </div>
            </aside>

            {/* Grid de Productos - Rediseñado en Filas de 3 Compactas */}
            <div className="flex-1">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((item) => (
                  <article
                    key={item.id}
                    id={item.id}
                    className="reveal group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:border-brand/40 hover:shadow-lg"
                  >
                    {/* Foto del repuesto */}
                    <div 
                      className="relative aspect-[16/10] w-full cursor-pointer overflow-hidden bg-slate-100"
                      onClick={() => setExpandedProduct(item)}
                    >
                      <Image
                        src={item.image || "/images/prod-elasticos.webp"}
                        alt={item.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="absolute left-3 top-3 rounded-none bg-dark/90 px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-brand backdrop-blur-sm shadow-sm">
                        {item.in_stock !== false ? "STOCK DISPONIBLE" : "CONSULTAR"}
                      </span>
                      <div className="absolute inset-0 bg-dark/0 transition-colors duration-300 group-hover:bg-dark/10 flex items-center justify-center">
                        <span className="opacity-0 translate-y-4 transform transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 rounded-full bg-white/90 px-4 py-2 text-xs font-bold text-dark shadow-lg backdrop-blur-sm">
                          Ver más
                        </span>
                      </div>
                    </div>

                    {/* Contenido de la Card */}
                    <div className="flex flex-1 flex-col justify-between p-5 md:p-6">
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-brand">
                          Repuesto
                        </span>
                        <h3 
                          className="mt-1 font-display text-lg font-bold text-dark group-hover:text-brand transition-colors uppercase cursor-pointer"
                          onClick={() => setExpandedProduct(item)}
                        >
                          {item.name}
                        </h3>
                        {item.brand && (
                          <p className="mt-0.5 text-xs font-semibold text-slate-500">
                            {item.brand}
                          </p>
                        )}
                        <p className="mt-3 text-xs leading-relaxed text-slate-600">
                          {item.desc}
                        </p>
                      </div>

                      {/* Botón único de WhatsApp */}
                      <div className="mt-5 pt-3.5 border-t border-slate-100">
                        <a
                          href={wa(`Hola! Quiero consultar por ${item.name}.`)}
                          data-producto={item.name}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-whats flex w-full items-center justify-center gap-2 rounded-none py-2.5 text-xs font-bold text-white shadow-sm transition-all hover:shadow-md"
                        >
                          <MessageSquare className="h-4 w-4" />
                          CONSULTAR POR WHATSAPP
                        </a>
                      </div>
                    </div>
                  </article>
                ))}

                {loading ? (
                  <div className="col-span-full py-16 text-center text-slate-500">
                    <span className="inline-block animate-spin rounded-full border-4 border-slate-300 border-t-brand h-8 w-8 mb-4"></span>
                    <p className="font-bold tracking-widest text-xs uppercase">Cargando catálogo...</p>
                  </div>
                ) : filtered.length === 0 && (
                  <div className="col-span-full rounded-2xl border border-slate-200 bg-white p-12 text-center">
                    <p className="text-lg font-bold text-dark">No se encontraron productos</p>
                    <p className="mt-2 text-sm text-slate-500">
                      Probá con otro filtro o escribinos por WhatsApp con la medida que buscás.
                    </p>
                    <button
                      onClick={() => {
                        setSelectedCat("todos")
                        setSelectedBrand("todas")
                        setSearch("")
                      }}
                      className="btn btn-brand mt-6 rounded-none px-6 py-2.5 text-xs text-white"
                    >
                      Borrar filtros
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ PROCESO SIMPLE & DIRECTO (Ubicado después de las Cards) ============ */}
      <section className="border-t border-b border-slate-200/80 bg-slate-50/60 py-14 md:py-18">
        <div className="mx-auto max-w-[1400px] px-5 md:px-8">
          <div className="mb-10 text-center">
            <p className="text-xs font-bold tracking-[0.2em] text-brand uppercase">
              Cómo pedir
            </p>
            <h2 className="font-display text-2xl font-bold text-dark md:text-4xl">
              ¿CÓMO TE PASAMOS UN PRECIO?
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="reveal flex flex-col items-center rounded-2xl border border-slate-200/80 bg-white p-8 text-center transition-all hover:shadow-md">
              <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-dark font-display text-lg font-bold text-white shadow-sm">
                1
              </span>
              <h3 className="mb-2 font-display text-base font-bold text-dark">
                MANDANOS EL MODELO O UNA FOTO
              </h3>
              <p className="text-sm leading-relaxed text-slate-600">
                La marca y el año del camión, o una foto del elástico que tiene puesto.
              </p>
            </div>

            <div className="reveal flex flex-col items-center rounded-2xl border border-slate-200/80 bg-white p-8 text-center transition-all hover:shadow-md">
              <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand font-display text-lg font-bold text-white shadow-sm">
                2
              </span>
              <h3 className="mb-2 font-display text-base font-bold text-dark">
                TE CONFIRMAMOS LA MEDIDA
              </h3>
              <p className="text-sm leading-relaxed text-slate-600">
                Revisamos ancho, espesor y si lo tenemos. Te contestamos por WhatsApp.
              </p>
            </div>

            <div className="reveal flex flex-col items-center rounded-2xl border border-slate-200/80 bg-white p-8 text-center transition-all hover:shadow-md">
              <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600 font-display text-lg font-bold text-white shadow-sm">
                3
              </span>
              <h3 className="mb-2 font-display text-base font-bold text-dark">
                LO RETIRÁS, TE LO MANDAMOS O LO COLOCAMOS
              </h3>
              <p className="text-sm leading-relaxed text-slate-600">
                Pasás a buscarlo, traés el camión al taller o te lo mandamos por expreso.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CARRUSEL DE ESTANTERÍAS & STOCK FÍSICO ============ */}
      <section className="bg-slate-950 py-16 md:py-24 text-white">
        <div className="mx-auto max-w-[1400px] px-5 md:px-8">
          <div className="mb-10 text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold tracking-[0.2em] text-brand backdrop-blur-md">
              <Camera className="h-4 w-4 text-brand" />
              EL DEPÓSITO
            </div>
            <h2 className="font-display text-3xl font-bold text-white md:text-5xl">
              LO QUE TENEMOS EN STOCK
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-white/70 md:text-base">
              Elásticos, hojas y repuestos en nuestras estanterías de Pablo Podestá. Para llevar, para mandar o para colocar acá.
            </p>
          </div>

          {/* Gran visor de imagen en formato ultra amplio con difuminado (crossfade) */}
          <div
            className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-3xl border border-white/15 bg-black shadow-2xl"
            onMouseEnter={() => setAutoPlay(false)}
            onMouseLeave={() => setAutoPlay(true)}
          >
            <div className="relative aspect-[16/10] w-full min-h-[380px] sm:min-h-[480px] md:h-[620px] lg:h-[680px]">
              {LARGE_STOCK_SLIDES.map((slide, index) => {
                const isCurrent = index === activeSlide
                return (
                  <div
                    key={slide.title}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                      isCurrent ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                    }`}
                  >
                    <Image
                      src={slide.src}
                      alt={slide.alt}
                      fill
                      sizes="(max-width: 1280px) 100vw, 1200px"
                      preload={index === 0}
                      className="object-cover"
                    />

                    {/* Gradiente oscuro inferior */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />

                    {/* Información sobre la foto */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 md:p-12">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <span className="rounded-none bg-brand px-3.5 py-1 text-xs font-bold tracking-wider text-white shadow-md">
                          {slide.tag}
                        </span>
                        <span className="text-xs font-semibold tracking-widest text-white/70">
                          FOTO {index + 1} DE {totalSlides}
                        </span>
                      </div>
                      <h3 className="font-display text-2xl font-bold text-white sm:text-3xl md:text-5xl text-balance">
                        {slide.title}
                      </h3>
                      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base md:text-lg">
                        {slide.subtitle}
                      </p>
                    </div>
                  </div>
                )
              })}

              {/* Botones de navegación Anterior / Siguiente */}
              <button
                onClick={prevSlide}
                aria-label="Foto anterior"
                className="absolute left-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/60 text-white backdrop-blur-md transition-all hover:scale-110 hover:bg-brand hover:border-brand md:h-14 md:w-14 md:left-6"
              >
                <ChevronLeft className="h-7 w-7" />
              </button>

              <button
                onClick={nextSlide}
                aria-label="Siguiente foto"
                className="absolute right-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/60 text-white backdrop-blur-md transition-all hover:scale-110 hover:bg-brand hover:border-brand md:h-14 md:w-14 md:right-6"
              >
                <ChevronRight className="h-7 w-7" />
              </button>

              {/* Toggle de AutoPlay */}
              <button
                onClick={() => setAutoPlay((v) => !v)}
                aria-label={autoPlay ? "Pausar carrusel" : "Reproducir carrusel"}
                className="absolute right-5 top-5 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-md transition-all hover:bg-black/90"
              >
                {autoPlay ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </button>

              {/* Indicadores de puntos inferiores */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
                {LARGE_STOCK_SLIDES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveSlide(i)}
                    aria-label={`Ir a la foto ${i + 1}`}
                    className={`h-2 transition-all rounded-full ${
                      i === activeSlide ? "w-8 bg-brand" : "w-2 bg-white/40 hover:bg-white/70"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SECCIÓN DE CONTACTO & FORMULARIO ============ */}
      <section className="relative overflow-hidden bg-slate-50 py-16 md:py-24 border-t border-slate-200">
        <div className="mx-auto max-w-[1400px] px-5 md:px-8">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
            {/* Columna Izquierda: Formulario */}
            <div className="rounded-3xl border border-slate-200/80 bg-white p-7 shadow-xl shadow-slate-200/60 lg:col-span-7 sm:p-10">
              <div className="mb-7">
                <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-200">
                  <Sparkles className="h-3.5 w-3.5" />
                  CONSULTAS
                </div>
                <h3 className="font-display text-2xl font-bold text-dark sm:text-3xl">
                  Escribinos
                </h3>
                <p className="mt-1.5 text-xs text-slate-500 sm:text-sm">
                  Completá esto y se abre WhatsApp con tu mensaje armado. Te contestamos con precio y disponibilidad.
                </p>
              </div>

              <form onSubmit={handleSubmitForm} className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-bold text-slate-700">
                    Nombre y apellido
                  </label>
                  <input
                    type="text"
                    required
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Tu nombre"
                    className="w-full rounded-none border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-dark placeholder-slate-400 transition-all focus:border-brand focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand/10"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-slate-700">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      required
                      value={telefono}
                      onChange={(e) => setTelefono(e.target.value)}
                      placeholder="Ej: 11 4669 0000"
                      className="w-full rounded-none border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-dark placeholder-slate-400 transition-all focus:border-brand focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand/10"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-slate-700">
                      Ciudad / Localidad
                    </label>
                    <input
                      type="text"
                      value={ciudad}
                      onChange={(e) => setCiudad(e.target.value)}
                      placeholder="Ej: Podestá, Rosario, Córdoba..."
                      className="w-full rounded-none border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-dark placeholder-slate-400 transition-all focus:border-brand focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand/10"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-bold text-slate-700">
                    ¿Qué necesitás?
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                    placeholder="Ej: elástico trasero para Ford Cargo 1722, o la medida de la hoja"
                    className="w-full rounded-none border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-dark placeholder-slate-400 transition-all focus:border-brand focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand/10"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="btn btn-whats flex w-full items-center justify-center gap-2 rounded-none py-4 text-xs font-bold text-white shadow-lg shadow-emerald-700/20 transition-all hover:shadow-xl sm:text-sm"
                  >
                    <MessageSquare className="h-4 w-4" />
                    ENVIAR POR WHATSAPP
                  </button>
                </div>
              </form>
            </div>

            {/* Columna Derecha: Tarjetas de Información de Contacto */}
            <div className="flex flex-col gap-6 lg:col-span-5 lg:pt-2">
              <div>
                <p className="text-xs font-bold tracking-[0.2em] text-brand uppercase">
                  Contacto
                </p>
                <h2 className="mt-1 font-display text-3xl font-bold text-dark md:text-4xl">
                  Dónde estamos
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Te atiende gente del taller, que hace más de 30 años trabaja con elásticos.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                {/* Cuadrado 1: Dirección */}
                <div className="flex items-start gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all hover:border-brand/40 hover:shadow-md">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                    <MapPin className="h-6 w-6" />
                  </span>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Taller y depósito
                    </h4>
                    <p className="mt-1 font-display text-base font-bold text-dark">{ADDRESS}</p>
                    <a
                      href={MAPS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-flex items-center gap-1 text-xs font-bold text-brand hover:underline"
                    >
                      Ver ubicación en Google Maps <span>→</span>
                    </a>
                  </div>
                </div>

                {/* Cuadrado 2: Email */}
                <div className="flex items-start gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all hover:border-brand/40 hover:shadow-md">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                    <Mail className="h-6 w-6" />
                  </span>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Email
                    </h4>
                    <a
                      href={`mailto:${EMAIL}`}
                      className="mt-1 block font-display text-base font-bold text-dark hover:text-brand"
                    >
                      {EMAIL}
                    </a>
                    <a
                      href={`mailto:${EMAIL}`}
                      className="mt-1 inline-flex items-center gap-1 text-xs font-bold text-brand hover:underline"
                    >
                      Enviar correo electrónico <span>→</span>
                    </a>
                  </div>
                </div>

                {/* Cuadrado 3: Horario */}
                <div className="flex items-start gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all hover:border-brand/40 hover:shadow-md">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                    <Clock className="h-6 w-6" />
                  </span>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Horario
                    </h4>
                    <p className="mt-1 font-display text-base font-bold text-dark">{HOURS}</p>
                    <p className="mt-0.5 text-xs text-slate-500">
                      Mostrador y taller
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal del Producto (Efecto Ampliado) */}
      {expandedProduct && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md transition-all duration-300 animate-in fade-in"
          onClick={() => setExpandedProduct(null)}
        >
          <div 
            className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl flex flex-col md:flex-row animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setExpandedProduct(null)}
              className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-dark shadow-sm backdrop-blur-sm transition-transform hover:scale-110"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            {/* Imagen Ampliada */}
            <div className="relative h-64 w-full md:h-auto md:w-1/2 bg-slate-100">
              <Image
                src={expandedProduct.image || "/images/prod-elasticos.webp"}
                alt={expandedProduct.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Contenido Ampliado */}
            <div className="flex w-full flex-col p-6 md:w-1/2 md:p-10 max-h-[80vh] overflow-y-auto">
              <span className="text-xs font-bold uppercase tracking-wider text-brand">
                {expandedProduct.brand || "Línea Pesada"}
              </span>
              <h2 className="mt-2 font-display text-2xl font-bold text-dark md:text-3xl uppercase">
                {expandedProduct.name}
              </h2>
              
              <div className="mt-6 flex-1 space-y-4">
                <p className="text-sm leading-relaxed text-slate-600">
                  {expandedProduct.desc}
                </p>
                
                <div className="rounded-lg bg-slate-50 p-5 border border-slate-100">
                  <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">Detalles</h4>
                  <ul className="space-y-3 text-sm text-slate-600">
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand shrink-0"></span>
                      <span><strong>Material:</strong> Acero para elásticos.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand shrink-0"></span>
                      <span><strong>Tratamiento:</strong> Templado y revenido.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand shrink-0"></span>
                      <span><strong>Medidas:</strong> Original o reforzado, según el uso del camión.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand shrink-0"></span>
                      <span><strong>Estado:</strong> {expandedProduct.in_stock !== false ? "Lo tenemos en el depósito." : "Consultanos si lo tenemos."}</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <a
                  href={wa(`Hola! Quiero consultar detalles o cotizar por: ${expandedProduct.name}.`)}
                  data-producto={expandedProduct.name}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-brand flex w-full items-center justify-center gap-2 rounded-none py-3.5 text-sm font-bold text-white shadow-md transition-all hover:shadow-lg"
                >
                  <MessageSquare className="h-5 w-5" />
                  PREGUNTAR SI HAY
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import {
  Camera,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Layers,
  Mail,
  MapPin,
  MessageSquare,
  Pause,
  Play,
  Search,
  Sparkles,
} from "lucide-react"
import { ADDRESS, EMAIL, HOURS, MAPS_URL, wa } from "@/lib/site"

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
// LÍNEAS DE PRODUCTOS (Con etiqueta común "STOCK DISPONIBLE")
// ============================================================
const COMMON_TAG = "STOCK DISPONIBLE"

const PRODUCT_LINES: ProductLine[] = [
  {
    id: "elasticos-completos",
    title: "Elásticos Completos Armados",
    subtitle: "Delanteros y traseros listos para colocar",
    category: "elasticos",
    image: "/images/prod-elasticos.png",
    tag: COMMON_TAG,
    description:
      "Paquetes de elásticos completos ensamblados bajo estrictas normas de resistencia. Disponibles en configuración estándar o reforzada según el peso y exigencia de la unidad.",
    specs: [
      "Acero aleado de alta elasticidad (5160 / 60SiCrV7) templado y revenido",
      "Hojas maestras con ojos rolados en caliente y refuerzos de seguridad",
      "Pintura anticorrosiva de alta adherencia y lubricación entre hojas",
      "Listos para montaje directo sin adaptaciones",
    ],
    applications: [
      "Mercedes-Benz, Scania, Volvo, Iveco, Ford Cargo, VW",
      "Semirremolques, acoplados y carretones (Randon, Helvetica, etc.)",
      "Utilitarios y pick-ups (Hilux, Ranger, Amarok, Sprinter, Daily)",
    ],
    whatsappMsg:
      "Hola! Quiero consultar por Elásticos Completos. Mi unidad es un [Marca y Modelo] y busco [Delantero / Trasero / Reforzado].",
  },
  {
    id: "hojas-recambio",
    title: "Hojas de Recambio Sueltas y Refuerzos",
    subtitle: "Hojas maestras, secundarias y de refuerzo",
    category: "elasticos",
    image: "/images/prod-hojas.png",
    tag: COMMON_TAG,
    description:
      "Hojas sueltas para sustitución inmediata por rotura o para agregar capacidad de carga a paquetes existentes. Mantenemos una amplia variedad de medidas, anchos y espesores.",
    specs: [
      "Hojas maestras principales con ojos torneados de precisión",
      "Segundas hojas con envoltura de seguridad (vuelta entera o media vuelta)",
      "Hojas intermedias y hojas de apoyo (parabólicas y convencionales)",
      "Curvado y templado homogéneo para máxima durabilidad",
    ],
    applications: [
      "Recambio por hoja rota o fisurada",
      "Refuerzo de paquetes para sobrecarga y trabajo severo",
      "Todas las marcas de camiones nacionales e importados",
    ],
    whatsappMsg:
      "Hola! Necesito consultar por Hojas de Recambio para mi elástico. Modelo de camión / medidas: ",
  },
  {
    id: "grampas-abrazaderas",
    title: "Grampas, Abrazaderas U y Placas",
    subtitle: "Fijación crítica de alta resistencia",
    category: "fijacion",
    image: "/images/prod-grampas.png",
    tag: COMMON_TAG,
    description:
      "Grampas U en aceros tratados térmicamente para resistir las mayores torsiones y cargas de tracción sobre el eje. Se entregan con tuercas altas y arandelas especiales.",
    specs: [
      "Fabricadas en acero Grado 8 / 10.9 de alta resistencia",
      "Roscas laminadas que soportan altos torques de apriete sin estiramiento",
      "Formas redondas, cuadradas y semi-redondas para todo tipo de puente y eje",
      "Placas de asiento superior e inferior, cuñas de inclinación y suplementos",
    ],
    applications: [
      "Ejes tractores, delanteros, de apoyo y balancines",
      "Semirremolques de 2 y 3 ejes",
      "Bateas, volcadores y chasis especiales",
    ],
    whatsappMsg:
      "Hola! Quiero consultar disponibilidad de Grampas y Placas de fijación. Necesito medidas aproximadas / modelo: ",
  },
  {
    id: "bujes-silentblocks",
    title: "Bujes de Goma, Poliuretano y Bronce",
    subtitle: "Absorción de impacto y cero ruidos",
    category: "fijacion",
    image: "/images/prod-bujes.png",
    tag: COMMON_TAG,
    description:
      "Bujes diseñados para aislar vibraciones, absorber los golpes del camino y garantizar el alineamiento correcto de los ojos del elástico con los soportes de chasis.",
    specs: [
      "Bujes vulcanizados goma-metal de alto rendimiento (Silentblocks)",
      "Bujes de poliuretano inyectado de alta densidad (mayor vida útil)",
      "Bujes de bronce maquinados para aplicaciones extrapesadas",
      "Resistentes a aceites, grasas, humedad y trabajo continuo",
    ],
    applications: [
      "Ojos de elásticos principales y gemelos",
      "Soportes de tensor y barras estabilizadoras",
      "Bujes para utilitarios, colectivos y camiones de ruta",
    ],
    whatsappMsg:
      "Hola! Consulto por Bujes de suspensión para mi unidad. Marca / Modelo: ",
  },
  {
    id: "pernos-grilletes",
    title: "Pernos Centrales, Grilletes y Gemelos",
    subtitle: "Componentes de articulación",
    category: "fijacion",
    image: "/images/prod-pernos.png",
    tag: COMMON_TAG,
    description:
      "Pernos de centro (capuchinos) cementados y rectificados, grilletes forjados, pernos pasantes con canal de engrase y tuercas autofrenantes para armado seguro.",
    specs: [
      "Pernos centrales tratados térmicamente contra cizallamiento",
      "Pernos de gemelo con alemites de engrase para lubricación óptima",
      "Grilletes y planchuelas de gemelo de acero forjado reforzado",
      "Máxima resistencia al desgaste por fricción",
    ],
    applications: [
      "Armado y centrado de paquetes de elásticos",
      "Articulación de extremos en chasis",
      "Todo tipo de camiones y acoplados",
    ],
    whatsappMsg:
      "Hola! Quiero consultar por Pernos centrales y Grilletes para suspensión de: ",
  },
  {
    id: "amortiguadores-tensores",
    title: "Amortiguadores y Tensores de Suspensión",
    subtitle: "Estabilidad en curva y control dinámico",
    category: "amortiguacion",
    image: "/images/prod-amortiguadores.png",
    tag: COMMON_TAG,
    description:
      "Línea de amortiguadores pesados de doble efecto y tensores de eje regulables y fijos para asegurar el guiado perfecto de los ejes y evitar el desgaste prematuro de neumáticos.",
    specs: [
      "Amortiguadores hidráulicos y presurizados de gran cilindrada",
      "Válvulas reforzadas para soportar trabajo continuo en caminos irregulares",
      "Tensores de suspensión con bujes cónicos y rótulas blindadas",
      "Evita el coleo del semirremolque y la oscilación de la cabina",
    ],
    applications: [
      "Ejes direccionales, motrices y arrastre",
      "Suspensión neumática y mecánica",
      "Semirremolques de larga distancia",
    ],
    whatsappMsg:
      "Hola! Quiero consultar precio y stock de Amortiguadores / Tensores para: ",
  },
]

const CATEGORIES = [
  { id: "todos", label: "TODOS LOS REPUESTOS" },
  { id: "elasticos", label: "ELÁSTICOS Y HOJAS" },
  { id: "fijacion", label: "FIJACIÓN Y GRAMPAS" },
  { id: "amortiguacion", label: "AMORTIGUACIÓN Y TENSORES" },
]

// ============================================================
// FOTOS EN FORMATO EXTRA GRANDE DE LAS ESTANTERÍAS Y STOCK
// ============================================================
const LARGE_STOCK_SLIDES = [
  {
    src: "/images/taller-interior.png",
    alt: "Estanterías de elásticos y repuestos en el taller",
    title: "ESTANTERÍAS DE STOCK PERMANENTE",
    subtitle: "Paquetes armados y repuestos listos para entrega inmediata",
    tag: "ESTANTERÍAS & DEPÓSITO",
  },
  {
    src: "/images/detalle-elastico.png",
    alt: "Hojas de recambio y accesorios clasificados en estante",
    title: "HOJAS SUELTAS & ACCESORIOS CLASIFICADOS",
    subtitle: "Hojas maestras, secundarias, bujes y grampas por marca y modelo",
    tag: "REPUESTOS EN STOCK",
  },
  {
    src: "/images/hero-taller.png",
    alt: "Sector de almacenamiento pesado y fosas",
    title: "SECTOR DE ALMACENAMIENTO & FOSAS",
    subtitle: "Capacidad pesada para provisión, recambio y alineación en el día",
    tag: "INFRAESTRUCTURA",
  },
  {
    src: "/images/banner-ruta.png",
    alt: "Despacho y logística de suspensión pesada",
    title: "LOGÍSTICA DE DESPACHO A TODO EL PAÍS",
    subtitle: "Envíos directos a expresos en el día para todas las provincias",
    tag: "DESPACHO RÁPIDO",
  },
]

export function CatalogoInformativo() {
  const [selectedCat, setSelectedCat] = useState("todos")
  const [search, setSearch] = useState("")

  // Carrusel extra grande con difuminado suave
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

  const filtered = PRODUCT_LINES.filter((p) => {
    const matchCat = selectedCat === "todos" || p.category === selectedCat
    const q = search.toLowerCase().trim()
    const matchSearch =
      q === "" ||
      p.title.toLowerCase().includes(q) ||
      p.subtitle.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.specs.some((s) => s.toLowerCase().includes(q)) ||
      p.applications.some((a) => a.toLowerCase().includes(q))

    return matchCat && matchSearch
  })

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault()
    let text = `Hola! Me comunico desde el sitio web de Elásticos 8 de Agosto para consultar por repuestos:\n`
    if (nombre.trim()) text += `\n👤 *Nombre y Apellido:* ${nombre.trim()}`
    if (telefono.trim()) text += `\n📞 *Teléfono:* ${telefono.trim()}`
    if (ciudad.trim()) text += `\n📍 *Ciudad / Localidad:* ${ciudad.trim()}`
    if (mensaje.trim()) text += `\n\n💬 *Consulta / Repuesto solicitado:*\n${mensaje.trim()}`

    window.open(wa(text), "_blank")
  }

  return (
    <div className="w-full bg-white">
      {/* ============ PROCESO SIMPLE & RÁPIDO ============ */}
      <section className="border-b border-slate-100 py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-10 text-center">
            <p className="text-xs font-bold tracking-[0.2em] text-brand uppercase">
              Atención directa de taller
            </p>
            <h2 className="font-display text-2xl font-bold text-dark md:text-4xl">
              ¿CÓMO PEDIR O COTIZAR TU REPUESTO?
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex flex-col items-center rounded-2xl border border-slate-100 bg-slate-50/80 p-8 text-center transition-all hover:bg-white hover:shadow-md">
              <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-dark font-display text-lg font-bold text-white shadow-sm">
                1
              </span>
              <h3 className="mb-2 font-display text-base font-bold text-dark">
                DECINOS QUÉ NECESITÁS
              </h3>
              <p className="text-sm leading-relaxed text-slate-600">
                Marca y modelo de tu camión, utilitario o acoplado, o una foto del elástico actual.
              </p>
            </div>

            <div className="flex flex-col items-center rounded-2xl border border-slate-100 bg-slate-50/80 p-8 text-center transition-all hover:bg-white hover:shadow-md">
              <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand font-display text-lg font-bold text-white shadow-sm">
                2
              </span>
              <h3 className="mb-2 font-display text-base font-bold text-dark">
                CONTACTO POR WHATSAPP
              </h3>
              <p className="text-sm leading-relaxed text-slate-600">
                Hablás directamente con nuestro especialista para confirmar medidas exactas y stock.
              </p>
            </div>

            <div className="flex flex-col items-center rounded-2xl border border-slate-100 bg-slate-50/80 p-8 text-center transition-all hover:bg-white hover:shadow-md">
              <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600 font-display text-lg font-bold text-white shadow-sm">
                3
              </span>
              <h3 className="mb-2 font-display text-base font-bold text-dark">
                COTIZACIÓN & DESPACHO
              </h3>
              <p className="text-sm leading-relaxed text-slate-600">
                Presupuesto al instante. Envíos en el día a todo el país o colocación rápida en nuestro taller.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CATÁLOGO Y FILTROS INTEGRADOS ============ */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          {/* Barra de Filtros y Buscador integrada */}
          <div className="mb-10 flex flex-col gap-4 border-b border-slate-200/80 pb-6 md:flex-row md:items-center md:justify-between">
            {/* Chips de Categorías */}
            <div className="flex flex-wrap items-center gap-2">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCat === cat.id
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCat(cat.id)}
                    className={`rounded-none px-4 py-2.5 text-xs font-bold transition-all ${
                      isActive
                        ? "bg-brand text-white shadow-sm"
                        : "border border-slate-200 bg-white text-dark hover:bg-slate-100"
                    }`}
                  >
                    {cat.label}
                  </button>
                )
              })}
            </div>

            {/* Buscador */}
            <div className="relative w-full md:w-80">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar repuesto, medida, marca..."
                className="w-full rounded-none border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-xs font-medium text-dark transition-all focus:border-brand focus:bg-white focus:outline-none"
              />
              <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
            </div>
          </div>

          {/* Grid de Productos */}
          <div className="grid gap-8">
            {filtered.map((item) => (
              <article
                key={item.id}
                id={item.id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:border-slate-300 hover:shadow-md"
              >
                <div className="grid items-stretch lg:grid-cols-12">
                  {/* Foto de producto con etiqueta común */}
                  <div className="relative min-h-[260px] bg-slate-100 lg:col-span-5 lg:min-h-full">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover"
                    />
                    <span className="absolute left-4 top-4 rounded-none bg-dark/90 px-3 py-1 text-[11px] font-bold tracking-wider text-brand backdrop-blur-sm">
                      {item.tag}
                    </span>
                  </div>

                  {/* Información técnica y comercial */}
                  <div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-7">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-brand">
                        Línea de Suspensión
                      </p>
                      <h3 className="mt-1 font-display text-2xl font-bold text-dark sm:text-3xl">
                        {item.title}
                      </h3>
                      <p className="font-medium text-slate-500 text-sm">{item.subtitle}</p>

                      <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                        {item.description}
                      </p>

                      {/* Especificaciones */}
                      <div className="mt-6">
                        <h4 className="flex items-center gap-2 font-display text-xs font-bold uppercase tracking-wider text-dark">
                          <Layers className="h-4 w-4 text-brand" /> Características & Calidad:
                        </h4>
                        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                          {item.specs.map((spec, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" />
                              <span>{spec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Aplicaciones */}
                      <div className="mt-5 rounded-none bg-slate-50 p-3.5 border border-slate-100">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                          Marcas & Compatibilidad:
                        </p>
                        <p className="mt-1 text-xs font-medium text-dark">
                          {item.applications.join(" · ")}
                        </p>
                      </div>
                    </div>

                    {/* Botón único de WhatsApp sin border-radius */}
                    <div className="mt-8 pt-6 border-t border-slate-100">
                      <a
                        href={wa(item.whatsappMsg)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-whats flex w-full items-center justify-center gap-2 rounded-none py-3.5 text-xs font-bold text-white shadow-md transition-all sm:w-auto sm:px-8"
                      >
                        <MessageSquare className="h-4 w-4" />
                        CONSULTAR POR WHATSAPP
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            ))}

            {filtered.length === 0 && (
              <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
                <p className="text-lg font-bold text-dark">No se encontraron líneas con ese término</p>
                <p className="mt-2 text-sm text-slate-500">
                  Podés consultar directamente a nuestro WhatsApp por cualquier repuesto o medida.
                </p>
                <button
                  onClick={() => {
                    setSelectedCat("todos")
                    setSearch("")
                  }}
                  className="btn btn-brand mt-6 rounded-none px-6 py-2.5 text-xs text-white"
                >
                  Ver todos los repuestos
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ============ CARRUSEL DE FOTOS EXTRA GRANDES CON DIFUMINADO SUAVE ============ */}
      <section className="border-t border-slate-200 bg-slate-950 py-16 md:py-24 text-white">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-10 text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold tracking-[0.2em] text-brand backdrop-blur-md">
              <Camera className="h-4 w-4 text-brand" />
              GALERÍA DE STOCK & TALLER
            </div>
            <h2 className="font-display text-3xl font-bold text-white md:text-5xl">
              NUESTRAS ESTANTERÍAS & DEPÓSITO
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-white/70 md:text-base">
              Disponemos de stock físico permanente de paquetes de elásticos, hojas y repuestos
              organizados para despacho en el día o colocación inmediata en nuestro taller.
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
                      priority={index === 0}
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
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
            {/* Columna Izquierda: Formulario */}
            <div className="rounded-3xl border border-slate-200/80 bg-white p-7 shadow-xl shadow-slate-200/60 lg:col-span-7 sm:p-10">
              <div className="mb-7">
                <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-200">
                  <Sparkles className="h-3.5 w-3.5" />
                  RESPUESTA RÁPIDA
                </div>
                <h3 className="font-display text-2xl font-bold text-dark sm:text-3xl">
                  Envianos tu consulta
                </h3>
                <p className="mt-1.5 text-xs text-slate-500 sm:text-sm">
                  Completá tus datos y te responderemos por WhatsApp con disponibilidad y asesoramiento.
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
                    placeholder="Tu nombre completo"
                    className="w-full rounded-none border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-dark placeholder-slate-400 transition-all focus:border-brand focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand/10"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-slate-700">
                      Teléfono de contacto
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
                      placeholder="Ej: Rosario, Podestá, Córdoba..."
                      className="w-full rounded-none border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-dark placeholder-slate-400 transition-all focus:border-brand focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand/10"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-bold text-slate-700">
                    Consulta o repuesto que buscás:
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                    placeholder="Escribí marca/modelo del camión o medidas de los elásticos..."
                    className="w-full rounded-none border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-dark placeholder-slate-400 transition-all focus:border-brand focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand/10"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="btn btn-whats flex w-full items-center justify-center gap-2 rounded-none py-4 text-xs font-bold text-white shadow-lg shadow-emerald-700/20 transition-all hover:shadow-xl sm:text-sm"
                  >
                    <MessageSquare className="h-4 w-4" />
                    ENVIAR CONSULTA POR WHATSAPP
                  </button>
                </div>
              </form>
            </div>

            {/* Columna Derecha: Tarjetas de Información de Contacto */}
            <div className="flex flex-col gap-6 lg:col-span-5 lg:pt-2">
              <div>
                <p className="text-xs font-bold tracking-[0.2em] text-brand uppercase">
                  Atención Directa
                </p>
                <h2 className="mt-1 font-display text-3xl font-bold text-dark md:text-4xl">
                  Contactanos
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Hablás directamente con especialistas con más de 30 años de experiencia en
                  suspensión pesada.
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
                      Taller & Depósito
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

                {/* Cuadrado 2: Correo Electrónico */}
                <div className="flex items-start gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all hover:border-brand/40 hover:shadow-md">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                    <Mail className="h-6 w-6" />
                  </span>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Correo Electrónico
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

                {/* Cuadrado 3: Horario de Atención */}
                <div className="flex items-start gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all hover:border-brand/40 hover:shadow-md">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                    <Clock className="h-6 w-6" />
                  </span>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Horario de Atención
                    </h4>
                    <p className="mt-1 font-display text-base font-bold text-dark">{HOURS}</p>
                    <p className="mt-0.5 text-xs text-slate-500">
                      Atención en mostrador y recepción para taller
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

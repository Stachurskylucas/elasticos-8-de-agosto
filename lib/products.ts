// ============================================================
// TIPOS Y DATOS INICIALES DE PRODUCTOS, PRECIOS, MARCAS Y CUOTAS
// ============================================================

export type CategoryId = string

export interface Category {
  id: string
  label: string
}

export type Product = {
  id: string
  sku?: string
  name: string
  category: CategoryId
  brand?: string // Marca compatible o fabricante (ej: Mercedes-Benz, Scania, Ford)
  desc: string
  image: string
  in_stock?: boolean
  costo?: number | null
  margen?: number | null
  precio_manual?: number | null
  descuento?: number | null // Porcentaje de descuento (ej: 10 para 10% OFF)
  cuotas_cant?: number | null // Cantidad de cuotas (ej: 3, 6, 12)
  cuotas_sin_interes?: boolean
  mostrar_precio?: boolean
  price?: number | null // Precio final calculado o almacenado
  created_at?: string
  updated_at?: string
}

export const INITIAL_CATEGORIES: Category[] = [
  { id: "elasticos", label: "ELÁSTICOS" },
  { id: "fijacion", label: "FIJACIÓN" },
  { id: "amortiguacion", label: "AMORTIGUACIÓN" },
]

export const INITIAL_BRANDS: string[] = [
  "Mercedes-Benz",
  "Scania",
  "Ford",
  "Iveco",
  "Volvo",
  "Volkswagen",
  "Aesa",
  "Asicha",
  "Faesa",
  "Universal",
]

export const CATEGORIES: Category[] = INITIAL_CATEGORIES

export function categoryLabel(id: CategoryId, customCategories?: Category[]) {
  const cats = customCategories || CATEGORIES
  return cats.find((c) => c.id === id)?.label ?? id.toUpperCase()
}

/**
 * Calcula el precio base (antes de descuento)
 */
export function calculateBasePrice(product: {
  costo?: number | null
  margen?: number | null
  precio_manual?: number | null
  price?: number | null
}): number | null {
  if (product.precio_manual !== undefined && product.precio_manual !== null && Number(product.precio_manual) > 0) {
    return Math.round(Number(product.precio_manual))
  }

  if (product.costo !== undefined && product.costo !== null && Number(product.costo) > 0) {
    const margin = product.margen !== undefined && product.margen !== null ? Number(product.margen) : 0.40
    return Math.round(Number(product.costo) * (1 + margin))
  }

  if (product.price !== undefined && product.price !== null && Number(product.price) > 0) {
    return Math.round(Number(product.price))
  }

  return null
}

/**
 * Calcula dinámicamente el precio final de referencia aplicando descuento si existe
 */
export function calculateProductPrice(product: {
  costo?: number | null
  margen?: number | null
  precio_manual?: number | null
  descuento?: number | null
  mostrar_precio?: boolean
  price?: number | null
}): number | null {
  if (product.mostrar_precio === false) return null

  const basePrice = calculateBasePrice(product)
  if (basePrice === null) return null

  if (product.descuento !== undefined && product.descuento !== null && Number(product.descuento) > 0) {
    const discountFactor = 1 - Math.min(Number(product.descuento), 99) / 100
    return Math.round(basePrice * discountFactor)
  }

  return basePrice
}

/**
 * Formatea un número en pesos argentinos (ej: $ 58.500)
 */
export function formatARS(amount: number): string {
  return `$ ${new Intl.NumberFormat("es-AR", {
    maximumFractionDigits: 0,
  }).format(amount)}`
}

/** Lista de productos iniciales con marcas, costos y precios */
export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "elasticos-completos",
    sku: "ELA-COM-001",
    name: "ELÁSTICOS COMPLETOS",
    category: "elasticos",
    brand: "Mercedes-Benz",
    desc: "Conjuntos armados listos para colocar. Delanteros y traseros para todas las marcas.",
    image: "/images/prod-elasticos.webp",
    in_stock: true,
    costo: 185000,
    margen: 0.40,
    precio_manual: null,
    descuento: 0,
    cuotas_cant: 3,
    cuotas_sin_interes: true,
    mostrar_precio: true,
    price: 259000,
  },
  {
    id: "hojas-recambio",
    sku: "HOJ-REC-002",
    name: "HOJAS DE RECAMBIO",
    category: "elasticos",
    brand: "Scania",
    desc: "Hojas principales, segunda vuelta y refuerzos sueltos. Stock inmediato.",
    image: "/images/prod-hojas.webp",
    in_stock: true,
    costo: 41785,
    margen: 0.40,
    precio_manual: null,
    descuento: 0,
    cuotas_cant: 3,
    cuotas_sin_interes: true,
    mostrar_precio: true,
    price: 58500,
  },
  {
    id: "bujes",
    sku: "BUJ-POL-003",
    name: "BUJES DE GOMA Y POLIURETANO",
    category: "fijacion",
    brand: "Universal",
    desc: "Fijación segura y silenciosa para gemelos y extremos del elástico.",
    image: "/images/prod-bujes.webp",
    in_stock: true,
    costo: 13500,
    margen: 0.40,
    precio_manual: null,
    descuento: 0,
    cuotas_cant: 3,
    cuotas_sin_interes: true,
    mostrar_precio: true,
    price: 18900,
  },
  {
    id: "grampas",
    sku: "GRA-ABR-004",
    name: "GRAMPAS Y ABRAZADERAS",
    category: "fijacion",
    brand: "Ford",
    desc: "Grampas U, abrazaderas y placas de asiento para todo tipo de chasis.",
    image: "/images/prod-grampas.webp",
    in_stock: true,
    costo: 24000,
    margen: 0.40,
    precio_manual: null,
    descuento: 0,
    cuotas_cant: 3,
    cuotas_sin_interes: true,
    mostrar_precio: true,
    price: 33600,
  },
  {
    id: "pernos-grilletes",
    sku: "PER-GRI-005",
    name: "PERNOS Y GRILLETES",
    category: "fijacion",
    brand: "Iveco",
    desc: "Pernos centrales y grilletes delanteros y traseros para todo tipo de unidad.",
    image: "/images/prod-pernos.webp",
    in_stock: true,
    costo: 32000,
    margen: 0.40,
    precio_manual: null,
    descuento: 0,
    cuotas_cant: 3,
    cuotas_sin_interes: true,
    mostrar_precio: true,
    price: 44800,
  },
  {
    id: "amortiguadores",
    sku: "AMO-PES-006",
    name: "AMORTIGUADORES",
    category: "amortiguacion",
    brand: "Volvo",
    desc: "De gas y de aceite, para ejes delanteros y traseros de camiones y acoplados.",
    image: "/images/prod-amortiguadores.webp",
    in_stock: true,
    costo: 89000,
    margen: 0.40,
    precio_manual: null,
    descuento: 0,
    cuotas_cant: 3,
    cuotas_sin_interes: true,
    mostrar_precio: true,
    price: 124600,
  },
  {
    id: "tensores",
    sku: "TEN-SUS-007",
    name: "TENSORES DE SUSPENSIÓN",
    category: "amortiguacion",
    brand: "Volkswagen",
    desc: "Tensores originales y alternativos para recuperar firmeza y estabilidad.",
    image: "/images/prod-tensores.webp",
    in_stock: true,
    costo: 72000,
    margen: 0.40,
    precio_manual: null,
    descuento: 0,
    cuotas_cant: 3,
    cuotas_sin_interes: true,
    mostrar_precio: true,
    price: 100800,
  },
  {
    id: "placas-asiento",
    sku: "PLA-ASI-008",
    name: "PLACAS DE ASIENTO",
    category: "fijacion",
    brand: "Aesa",
    desc: "Placas de asiento reforzadas para distintos tipos de chasis y ejes.",
    image: "/images/prod-grampas.webp",
    in_stock: true,
    costo: 38000,
    margen: 0.40,
    precio_manual: null,
    descuento: 0,
    cuotas_cant: 3,
    cuotas_sin_interes: true,
    mostrar_precio: true,
    price: 53200,
  },
  {
    id: "kits-medida",
    sku: "KIT-MED-009",
    name: "KITS DE SUSPENSIÓN A MEDIDA",
    category: "elasticos",
    brand: "Mercedes-Benz",
    desc: "Paquetes armados a medida según el peso, uso y marca de la unidad.",
    image: "/images/prod-elasticos.webp",
    in_stock: true,
    costo: 245000,
    margen: 0.40,
    precio_manual: null,
    descuento: 0,
    cuotas_cant: 3,
    cuotas_sin_interes: true,
    mostrar_precio: true,
    price: 343000,
  },
]

/** Alias exportado para compatibilidad */
export const products: Product[] = INITIAL_PRODUCTS

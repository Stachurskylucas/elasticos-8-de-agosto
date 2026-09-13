import { calculateProductPrice, INITIAL_PRODUCTS, type Product } from "@/lib/products"
import { getSupabaseServerClient } from "@/lib/supabase/server"

// Almacén en memoria de respaldo para modo desarrollo / demo
let inMemoryProducts: Product[] = [...INITIAL_PRODUCTS]

/**
 * Transforma un registro de Supabase al tipo Product de la app con cálculo de precio dinámico
 */
function mapFromSupabase(row: any): Product {
  const costo = row.costo !== null && row.costo !== undefined ? Number(row.costo) : null
  const margen = row.margen !== null && row.margen !== undefined ? Number(row.margen) : 0.40
  const precio_manual = row.precio_manual !== null && row.precio_manual !== undefined ? Number(row.precio_manual) : null
  const descuento = row.descuento !== null && row.descuento !== undefined ? Number(row.descuento) : 0
  const cuotas_cant = row.cuotas_cant !== null && row.cuotas_cant !== undefined ? Number(row.cuotas_cant) : 3
  const cuotas_sin_interes = row.cuotas_sin_interes !== false
  const mostrar_precio = row.mostrar_precio !== false

  const computedPrice = calculateProductPrice({
    costo,
    margen,
    precio_manual,
    descuento,
    mostrar_precio,
    price: row.price ? Number(row.price) : null,
  })

  return {
    id: row.id,
    sku: row.sku || row.id.toUpperCase(),
    name: row.name,
    category: row.category,
    brand: row.brand || row.marca || "Universal",
    desc: row.description || row.desc || "",
    image: row.image || "/placeholder.svg",
    in_stock: row.in_stock !== false,
    costo,
    margen,
    precio_manual,
    descuento,
    cuotas_cant,
    cuotas_sin_interes,
    mostrar_precio,
    price: computedPrice,
    created_at: row.created_at,
    updated_at: row.updated_at,
  }
}

/**
 * Transforma un objeto Product al formato de la tabla de Supabase
 */
function mapToSupabase(product: Partial<Product>) {
  const result: any = {}
  if (product.id !== undefined) result.id = product.id
  if (product.sku !== undefined) result.sku = product.sku?.trim().toUpperCase()
  if (product.name !== undefined) result.name = product.name.trim().toUpperCase()
  if (product.category !== undefined) result.category = product.category
  if (product.brand !== undefined) result.brand = product.brand.trim()
  if (product.desc !== undefined) result.description = product.desc
  if (product.image !== undefined) result.image = product.image
  if (product.in_stock !== undefined) result.in_stock = Boolean(product.in_stock)
  if (product.costo !== undefined) result.costo = product.costo ? Number(product.costo) : null
  if (product.margen !== undefined) result.margen = product.margen ? Number(product.margen) : 0.40
  if (product.precio_manual !== undefined) result.precio_manual = product.precio_manual ? Number(product.precio_manual) : null
  if (product.descuento !== undefined) result.descuento = product.descuento ? Number(product.descuento) : 0
  if (product.cuotas_cant !== undefined) result.cuotas_cant = product.cuotas_cant ? Number(product.cuotas_cant) : 3
  if (product.cuotas_sin_interes !== undefined) result.cuotas_sin_interes = Boolean(product.cuotas_sin_interes)
  if (product.mostrar_precio !== undefined) result.mostrar_precio = Boolean(product.mostrar_precio)

  // Calcular precio final para guardarlo en la columna price
  const finalPrice = calculateProductPrice({
    costo: result.costo,
    margen: result.margen,
    precio_manual: result.precio_manual,
    descuento: result.descuento,
    mostrar_precio: result.mostrar_precio,
    price: product.price,
  })
  result.price = finalPrice

  result.updated_at = new Date().toISOString()
  return result
}

/**
 * Obtiene todos los productos (desde Supabase o respaldo)
 */
export async function getAllProducts(): Promise<{
  products: Product[]
  source: "supabase" | "local"
}> {
  const supabase = getSupabaseServerClient()

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false })

      if (!error && data && data.length > 0) {
        return {
          products: data.map(mapFromSupabase),
          source: "supabase",
        }
      }
    } catch (err) {
      console.warn("Error consultando Supabase, usando datos de respaldo:", err)
    }
  }

  return {
    products: inMemoryProducts.map((p) => ({
      ...p,
      price: calculateProductPrice(p),
    })),
    source: "local",
  }
}

/**
 * Obtiene un producto por ID
 */
export async function getProductById(id: string): Promise<Product | null> {
  const supabase = getSupabaseServerClient()

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single()

      if (!error && data) {
        return mapFromSupabase(data)
      }
    } catch (err) {
      console.warn("Error buscando en Supabase:", err)
    }
  }

  const found = inMemoryProducts.find((p) => p.id === id)
  return found ? { ...found, price: calculateProductPrice(found) } : null
}

/**
 * Crea un nuevo producto
 */
export async function createProduct(product: Omit<Product, "created_at" | "updated_at">): Promise<Product> {
  const formattedId =
    product.id?.trim().toLowerCase().replace(/\s+/g, "-") ||
    `prod-${Date.now()}`

  const sku = product.sku?.trim().toUpperCase() || `SKU-${Date.now().toString().slice(-4)}`

  const newProduct: Product = {
    ...product,
    id: formattedId,
    sku,
    name: product.name.trim().toUpperCase(),
    brand: product.brand?.trim() || "Universal",
    in_stock: product.in_stock !== false,
    costo: product.costo ? Number(product.costo) : null,
    margen: product.margen ? Number(product.margen) : 0.40,
    precio_manual: product.precio_manual ? Number(product.precio_manual) : null,
    descuento: product.descuento ? Number(product.descuento) : 0,
    cuotas_cant: product.cuotas_cant ? Number(product.cuotas_cant) : 3,
    cuotas_sin_interes: product.cuotas_sin_interes !== false,
    mostrar_precio: product.mostrar_precio !== false,
    price: calculateProductPrice(product),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }

  const supabase = getSupabaseServerClient()
  if (supabase) {
    const payload = {
      ...mapToSupabase(newProduct),
      id: formattedId,
      created_at: newProduct.created_at,
    }

    const { data, error } = await supabase
      .from("products")
      .insert(payload)
      .select()
      .single()

    if (error) {
      throw new Error(`Error en Supabase: ${error.message}`)
    }

    return mapFromSupabase(data)
  }

  // Fallback local
  inMemoryProducts = [newProduct, ...inMemoryProducts.filter((p) => p.id !== formattedId)]
  return newProduct
}

/**
 * Actualiza un producto existente
 */
export async function updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
  const supabase = getSupabaseServerClient()

  if (supabase) {
    const payload = mapToSupabase(updates)
    const { data, error } = await supabase
      .from("products")
      .update(payload)
      .eq("id", id)
      .select()
      .single()

    if (error) {
      throw new Error(`Error actualizando en Supabase: ${error.message}`)
    }

    return mapFromSupabase(data)
  }

  // Fallback local
  const index = inMemoryProducts.findIndex((p) => p.id === id)
  if (index === -1) {
    throw new Error(`Producto con ID ${id} no encontrado`)\n  }

  const updated: Product = {
    ...inMemoryProducts[index],
    ...updates,
    name: updates.name ? updates.name.trim().toUpperCase() : inMemoryProducts[index].name,
    sku: updates.sku ? updates.sku.trim().toUpperCase() : inMemoryProducts[index].sku,
    brand: updates.brand !== undefined ? updates.brand.trim() : inMemoryProducts[index].brand,
    updated_at: new Date().toISOString(),
  }
  updated.price = calculateProductPrice(updated)

  inMemoryProducts[index] = updated
  return updated
}

/**
 * Elimina un producto por ID
 */
export async function deleteProduct(id: string): Promise<boolean> {
  const supabase = getSupabaseServerClient()

  if (supabase) {
    const { error } = await supabase.from("products").delete().eq("id", id)
    if (error) {
      throw new Error(`Error eliminando en Supabase: ${error.message}`)
    }
    return true
  }

  // Fallback local
  inMemoryProducts = inMemoryProducts.filter((p) => p.id !== id)
  return true
}

/**
 * Aplica un aumento porcentual masivo a los costos / precios de productos
 */
export async function bulkIncreasePrices(input: {
  categoryId?: string
  percentage: number
}): Promise<{ count: number; message: string }> {
  const { categoryId, percentage } = input
  const factor = 1 + percentage / 100.0

  const supabase = getSupabaseServerClient()
  if (supabase) {
    try {
      const { data, error } = await supabase.rpc("bulk_increase_prices", {
        p_category_id: categoryId === "todos" ? null : categoryId,
        p_percentage: percentage,
      })

      if (!error && typeof data === "number") {
        return {
          count: data,
          message: `Se aplicó un aumento del ${percentage}% a ${data} repuestos en Supabase.`,
        }
      }
    } catch (rpcErr) {
      console.warn("RPC no disponible, aplicando mediante update manual:", rpcErr)
    }

    let query = supabase.from("products").select("*")
    if (categoryId && categoryId !== "todos") {
      query = query.eq("category", categoryId)
    }
    const { data: rows } = await query

    if (rows && rows.length > 0) {
      for (const row of rows) {
        const newCosto = row.costo ? Math.round(Number(row.costo) * factor) : null
        const newManual = row.precio_manual ? Math.round(Number(row.precio_manual) * factor) : null
        const margin = row.margen !== null ? Number(row.margen) : 0.40
        const newPrice = calculateProductPrice({
          costo: newCosto,
          margen: margin,
          precio_manual: newManual,
          descuento: row.descuento,
          mostrar_precio: row.mostrar_precio !== false,
        })

        await supabase
          .from("products")
          .update({
            costo: newCosto,
            precio_manual: newManual,
            price: newPrice,
            updated_at: new Date().toISOString(),
          })
          .eq("id", row.id)
      }

      return {
        count: rows.length,
        message: `Se aplicó un aumento del ${percentage}% a ${rows.length} repuestos en Supabase.`,
      }
    }
  }

  // Fallback local
  let updatedCount = 0
  inMemoryProducts = inMemoryProducts.map((p) => {
    if (categoryId && categoryId !== "todos" && p.category !== categoryId) {
      return p
    }

    const newCosto = p.costo ? Math.round(Number(p.costo) * factor) : null
    const newManual = p.precio_manual ? Math.round(Number(p.precio_manual) * factor) : null
    const updated: Product = {
      ...p,
      costo: newCosto,
      precio_manual: newManual,
      updated_at: new Date().toISOString(),
    }
    updated.price = calculateProductPrice(updated)
    updatedCount++
    return updated
  })

  return {
    count: updatedCount,
    message: `Se aplicó un aumento del ${percentage}% a ${updatedCount} repuestos.`,
  }
}

/**
 * Sembrado inicial de productos a Supabase
 */
export async function seedInitialProducts(): Promise<{ count: number; message: string }> {
  const supabase = getSupabaseServerClient()
  if (!supabase) {
    throw new Error("Supabase no está configurado en .env.local")
  }

  await supabase.from("categories").upsert([
    { id: "elasticos", label: "ELÁSTICOS" },
    { id: "fijacion", label: "FIJACIÓN" },
    { id: "amortiguacion", label: "AMORTIGUACIÓN" },
  ])

  const rows = INITIAL_PRODUCTS.map((p) => ({
    id: p.id,
    sku: p.sku || p.id.toUpperCase(),
    name: p.name,
    category: p.category,
    brand: p.brand || "Universal",
    description: p.desc,
    image: p.image,
    in_stock: p.in_stock !== false,
    costo: p.costo || null,
    margen: p.margen || 0.40,
    precio_manual: p.precio_manual || null,
    descuento: p.descuento || 0,
    cuotas_cant: p.cuotas_cant || 3,
    cuotas_sin_interes: p.cuotas_sin_interes !== false,
    mostrar_precio: p.mostrar_precio !== false,
    price: calculateProductPrice(p),
  }))

  const { error } = await supabase.from("products").upsert(rows, { onConflict: "id" })

  if (error) {
    throw new Error(`Error al sembrar datos: ${error.message}`)
  }

  return {
    count: rows.length,
    message: `Se insertaron/actualizaron ${rows.length} productos con éxito en Supabase con marcas, precios dinámicos y SKUs.`,
  }
}

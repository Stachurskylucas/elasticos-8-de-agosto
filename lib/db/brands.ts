import { INITIAL_BRANDS } from "@/lib/products"
import { getSupabaseServerClient } from "@/lib/supabase/server"

export interface Brand {
  id: string
  name: string
  created_at?: string
}

let inMemoryBrands: Brand[] = INITIAL_BRANDS.map((b) => ({
  id: b.toLowerCase().replace(/[\s\/\\]+/g, "-"),
  name: b,
}))

/**
 * Obtiene todas las marcas disponibles
 */
export async function getAllBrands(): Promise<{
  brands: Brand[]
  source: "supabase" | "local"
}> {
  const supabase = getSupabaseServerClient()

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("brands")
        .select("*")
        .order("name", { ascending: true })

      if (!error && data && data.length > 0) {
        return {
          brands: data,
          source: "supabase",
        }
      }
    } catch (err) {
      console.warn("Error consultando marcas en Supabase:", err)
    }
  }

  return {
    brands: inMemoryBrands,
    source: "local",
  }
}

/**
 * Crea una nueva marca
 */
export async function createBrand(name: string): Promise<Brand> {
  const cleanName = name.trim()
  if (!cleanName) throw new Error("El nombre de la marca es obligatorio")

  const id = cleanName.toLowerCase().replace(/[\s\/\\]+/g, "-")
  const newBrand: Brand = {
    id,
    name: cleanName,
    created_at: new Date().toISOString(),
  }

  const supabase = getSupabaseServerClient()
  if (supabase) {
    const { data, error } = await supabase
      .from("brands")
      .upsert({ id, name: cleanName })
      .select()
      .single()

    if (error) throw new Error(`Error en Supabase: ${error.message}`)
    return data
  }

  // Fallback local
  if (!inMemoryBrands.some((b) => b.id === id)) {
    inMemoryBrands = [...inMemoryBrands, newBrand].sort((a, b) => a.name.localeCompare(b.name))
  }
  return newBrand
}

/**
 * Elimina una marca por ID
 */
export async function deleteBrand(id: string): Promise<boolean> {
  const supabase = getSupabaseServerClient()
  if (supabase) {
    const { error } = await supabase.from("brands").delete().eq("id", id)
    if (error) throw new Error(`Error en Supabase: ${error.message}`)
    return true
  }

  inMemoryBrands = inMemoryBrands.filter((b) => b.id !== id)
  return true
}

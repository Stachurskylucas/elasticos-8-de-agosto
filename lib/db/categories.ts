import { INITIAL_CATEGORIES, type Category } from "@/lib/products"
import { getSupabaseServerClient } from "@/lib/supabase/server"

let inMemoryCategories: Category[] = [...INITIAL_CATEGORIES]

export async function getAllCategories(): Promise<Category[]> {
  const supabase = getSupabaseServerClient()

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("created_at", { ascending: true })

      if (!error && data && data.length > 0) {
        return data.map((c) => ({
          id: c.id,
          label: c.label || c.id.toUpperCase(),
        }))
      }
    } catch (err) {
      console.warn("Error consultando categorías en Supabase, usando locales:", err)
    }
  }

  return inMemoryCategories
}

export async function createCategory(input: { id?: string; label: string }): Promise<Category> {
  const label = input.label.trim().toUpperCase()
  const id =
    input.id?.trim().toLowerCase().replace(/\s+/g, "-") ||
    label
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "")

  const newCat: Category = { id, label }

  const supabase = getSupabaseServerClient()
  if (supabase) {
    const { data, error } = await supabase
      .from("categories")
      .upsert({ id, label })
      .select()
      .single()

    if (error) {
      throw new Error(`Error en Supabase: ${error.message}`)
    }

    return { id: data.id, label: data.label }
  }

  // Fallback local
  if (!inMemoryCategories.some((c) => c.id === id)) {
    inMemoryCategories = [...inMemoryCategories, newCat]
  }

  return newCat
}

export async function deleteCategory(id: string): Promise<boolean> {
  const supabase = getSupabaseServerClient()

  if (supabase) {
    const { error } = await supabase.from("categories").delete().eq("id", id)
    if (error) {
      throw new Error(`Error en Supabase: ${error.message}`)
    }
    return true
  }

  // Fallback local
  inMemoryCategories = inMemoryCategories.filter((c) => c.id !== id)
  return true
}

import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  ""

export const isServerSupabaseConfigured = Boolean(
  supabaseUrl &&
    supabaseKey &&
    supabaseUrl.startsWith("http") &&
    supabaseKey.length > 10
)

export function getSupabaseServerClient() {
  if (!isServerSupabaseConfigured) return null
  return createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
    },
  })
}

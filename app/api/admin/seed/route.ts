import { NextResponse } from "next/server"
import { seedInitialProducts } from "@/lib/db/products"
import { isServerSupabaseConfigured } from "@/lib/supabase/server"

export const dynamic = "force-dynamic"

export async function POST() {
  try {
    if (!isServerSupabaseConfigured) {
      return NextResponse.json(
        {
          error:
            "Supabase aún no está configurado en .env.local. Agregá NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY primero.",
        },
        { status: 400 }
      )
    }

    const result = await seedInitialProducts()
    return NextResponse.json({ success: true, ...result })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Error al sembrar productos" },
      { status: 500 }
    )
  }
}

import { NextResponse } from "next/server"
import { bulkIncreasePrices } from "@/lib/db/products"

export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const percentage = Number(body.percentage)

    if (isNaN(percentage) || percentage === 0) {
      return NextResponse.json(
        { error: "Debe ingresar un porcentaje de aumento válido (ej: 10 para +10%)" },
        { status: 400 }
      )
    }

    const result = await bulkIncreasePrices({
      categoryId: body.categoryId || "todos",
      percentage,
    })

    return NextResponse.json({ success: true, ...result })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Error al aplicar el aumento masivo" },
      { status: 500 }
    )
  }
}

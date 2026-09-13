import { NextResponse } from "next/server"
import { createProduct, getAllProducts } from "@/lib/db/products"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const result = await getAllProducts()
    return NextResponse.json(result)
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Error al obtener productos" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    if (!body.name || !body.category) {
      return NextResponse.json(
        { error: "Nombre y categoría son requeridos" },
        { status: 400 }
      )
    }

    const created = await createProduct({
      id: body.id,
      name: body.name,
      category: body.category,
      desc: body.desc || "",
      image: body.image || "/images/prod-elasticos.png",
      in_stock: body.in_stock !== false,
      price: body.price ? Number(body.price) : null,
    })

    return NextResponse.json({ success: true, product: created }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Error al crear el producto" },
      { status: 500 }
    )
  }
}

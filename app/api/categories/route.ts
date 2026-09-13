import { NextResponse } from "next/server"
import { createCategory, deleteCategory, getAllCategories } from "@/lib/db/categories"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const categories = await getAllCategories()
    return NextResponse.json({ categories })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Error al obtener categorías" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    if (!body.label || !body.label.trim()) {
      return NextResponse.json(
        { error: "El nombre de la categoría es obligatorio" },
        { status: 400 }
      )
    }

    const created = await createCategory({
      id: body.id,
      label: body.label,
    })

    return NextResponse.json({ success: true, category: created }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Error al crear la categoría" },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "ID de categoría requerido" }, { status: 400 })
    }

    await deleteCategory(id)
    return NextResponse.json({ success: true, message: "Categoría eliminada" })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Error al eliminar la categoría" },
      { status: 500 }
    )
  }
}

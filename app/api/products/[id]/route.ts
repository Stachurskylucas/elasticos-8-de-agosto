import { NextResponse } from "next/server"
import { deleteProduct, updateProduct } from "@/lib/db/products"

export const dynamic = "force-dynamic"

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    const updated = await updateProduct(id, body)
    return NextResponse.json({ success: true, product: updated })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Error al actualizar el producto" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await deleteProduct(id)
    return NextResponse.json({ success: true, message: "Producto eliminado correctamente" })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Error al eliminar el producto" },
      { status: 500 }
    )
  }
}

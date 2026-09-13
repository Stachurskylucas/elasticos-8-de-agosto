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
    return NextResponse.json({ success: true, product: updated })\n  } catch (error: any) {\n    return NextResponse.json(\n      { error: error.message || "Error al actualizar el producto" },\n      { status: 500 }\n    )\n  }\n}\n\nexport async function DELETE(\n  _request: Request,\n  { params }: { params: Promise<{ id: string }> }\n) {\n  try {\n    const { id } = await params\n    await deleteProduct(id)\n    return NextResponse.json({ success: true, message: "Producto eliminado correctamente" })\n  } catch (error: any) {\n    return NextResponse.json(\n      { error: error.message || "Error al eliminar el producto" },\n      { status: 500 }\n    )\n  }\n}\n
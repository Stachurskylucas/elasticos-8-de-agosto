import { NextResponse } from "next/server"
import { exigirAdmin } from "@/lib/admin-session"
import { createBrand, deleteBrand, getAllBrands } from "@/lib/db/brands"

export async function GET() {
  try {
    const data = await getAllBrands()
    return NextResponse.json(data)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function POST(req: Request) {
    const noAutorizado = await exigirAdmin(req)
    if (noAutorizado) return noAutorizado
  try {
    const body = await req.json()
    if (!body.name || typeof body.name !== "string") {
      return NextResponse.json({ error: "El nombre de la marca es requerido" }, { status: 400 })
    }

    const brand = await createBrand(body.name)
    return NextResponse.json({ brand, success: true }, { status: 201 })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 })
  }
}

export async function DELETE(req: Request) {
    const noAutorizado = await exigirAdmin(req)
    if (noAutorizado) return noAutorizado
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "El ID de la marca es requerido" }, { status: 400 })
    }

    await deleteBrand(id)
    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 })
  }
}

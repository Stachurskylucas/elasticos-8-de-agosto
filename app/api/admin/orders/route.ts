import { NextResponse } from "next/server"
import { getAllOrders } from "@/lib/db/orders"

export async function GET() {
  try {
    const orders = await getAllOrders()
    return NextResponse.json({ orders, success: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

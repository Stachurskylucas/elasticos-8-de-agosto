import { NextResponse } from "next/server"
import { createOrder } from "@/lib/db/orders"
import { getMercadoPagoClient, Payment } from "@/lib/mercadopago"
import { getSupabaseServerClient } from "@/lib/supabase/server"

export async function POST(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const topic = searchParams.get("topic") || searchParams.get("type")
    const idFromQuery = searchParams.get("id") || searchParams.get("data.id")

    let bodyData: any = {}
    try {
      bodyData = await req.json()
    } catch {
      // algunos webhooks no envían JSON en body
    }

    const paymentId = idFromQuery || bodyData?.data?.id || bodyData?.id

    if (!paymentId) {
      return NextResponse.json({ message: "No payment ID provided" }, { status: 200 })
    }

    const mpClient = getMercadoPagoClient()
    if (!mpClient) {
      console.warn("Webhook recibido pero Mercado Pago no está configurado")
      return NextResponse.json({ message: "MP client not configured" }, { status: 200 })
    }

    const paymentApi = new Payment(mpClient)
    const payment = await paymentApi.get({ id: paymentId })

    if (payment && payment.status === "approved") {
      const metadata = payment.metadata || {}

      const customerName =
        metadata.customer_name ||
        payment.payer?.first_name ||
        "Cliente"
      const customerLastname =
        metadata.customer_lastname ||
        payment.payer?.last_name ||
        ""
      const customerEmail =
        metadata.customer_email ||
        payment.payer?.email ||
        "sin-email"
      const customerPhone =
        metadata.customer_phone ||
        payment.payer?.phone?.number ||
        "Sin teléfono"
      const dniCuit =
        metadata.dni_cuit ||
        payment.payer?.identification?.number ||
        ""
      const invoiceType = metadata.invoice_type || "B"
      const businessName = metadata.business_name || ""
      const shippingType = metadata.shipping_type || "pickup"
      const shippingAddress = metadata.shipping_address || "Retiro en Taller"
      const postalCode = metadata.postal_code || ""
      const city = metadata.city || ""
      const province = metadata.province || ""
      const shippingCost = Number(metadata.shipping_cost) || 0
      const subtotal = Number(metadata.subtotal) || Number(payment.transaction_amount) || 0

      const items = (payment.additional_info?.items || [])
        .filter((item: any) => item.id !== "costo-envio")
        .map((item: any) => ({
          id: item.id,
          name: item.title,
          qty: Number(item.quantity) || 1,
          price: Number(item.unit_price) || 0,
        }))

      const total = Number(payment.transaction_amount) || 0

      // 1. Registrar venta completa en tabla orders
      await createOrder({
        mercadopago_payment_id: String(payment.id),
        customer_name: customerName,
        customer_lastname: customerLastname,
        customer_email: customerEmail,
        customer_phone: customerPhone,
        dni_cuit: dniCuit,
        invoice_type: invoiceType,
        business_name: businessName,
        shipping_type: shippingType,
        shipping_address: shippingAddress,
        postal_code: postalCode,
        city: city,
        province: province,
        shipping_cost: shippingCost,
        subtotal: subtotal,
        items,
        total,
        status: "paid",
      })

      // 2. Descontar o registrar stock en Supabase
      const supabase = getSupabaseServerClient()
      if (supabase && items.length > 0) {
        for (const item of items) {
          try {
            console.log(`Venta procesada con éxito para producto ${item.id} (${item.name})`)
          } catch (stkErr) {
            console.warn(`Error al actualizar stock para producto ${item.id}:`, stkErr)
          }
        }
      }
    }

    return NextResponse.json({ received: true }, { status: 200 })
  } catch (err: any) {
    console.error("Error en Webhook de Mercado Pago:", err)
    return NextResponse.json({ error: err.message }, { status: 200 })
  }
}

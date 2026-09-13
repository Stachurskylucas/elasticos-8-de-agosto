import { NextResponse } from "next/server"
import { createOrder } from "@/lib/db/orders"
import { getMercadoPagoClient, Preference } from "@/lib/mercadopago"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { items, customer, shipping, subtotal, total } = body

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "El carrito está vacío" }, { status: 400 })
    }

    if (!customer?.name || !customer?.email || !customer?.phone || !customer?.dni_cuit) {
      return NextResponse.json(
        { error: "Completá nombre, apellido, teléfono, email y DNI/CUIT" },
        { status: 400 }
      )
    }

    const host = req.headers.get("host") || "localhost:3000"
    const protocol = req.headers.get("x-forwarded-proto") || "http"
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || `${protocol}://${host}`

    const shippingCost = Number(shipping?.cost) || 0
    const grandTotal = Number(total) || (Number(subtotal) + shippingCost)

    const mpClient = getMercadoPagoClient()

    if (mpClient) {
      const preferenceApi = new Preference(mpClient)

      // Items de los repuestos
      const preferenceItems: any[] = items.map((item: any) => ({
        id: String(item.id),
        title: String(item.name).slice(0, 250),
        quantity: Number(item.qty) || 1,
        unit_price: Number(item.price) > 0 ? Number(item.price) : 1000,
        currency_id: "ARS",
        picture_url: item.image?.startsWith("http")
          ? item.image
          : `${appUrl}${item.image || "/placeholder.svg"}`,
      }))

      // Agregar costo de envío como ítem si aplica
      if (shippingCost > 0) {
        preferenceItems.push({
          id: "costo-envio",
          title: `Costo de Envío (${shipping?.city || "Destino"}, CP ${shipping?.postal_code || ""})`,
          quantity: 1,
          unit_price: shippingCost,
          currency_id: "ARS",
        })
      }

      const result = await preferenceApi.create({
        body: {
          items: preferenceItems,
          payer: {
            name: `${customer.name} ${customer.lastname || ""}`.trim(),
            email: customer.email.trim(),
            phone: {
              number: customer.phone.trim(),
            },
            identification: {
              type: customer.invoice_type === "A" ? "CUIT" : "DNI",
              number: customer.dni_cuit.trim(),
            },
            address: {
              street_name: shipping?.address || "Retiro en Taller",
              zip_code: shipping?.postal_code || "1657",
            },
          },
          back_urls: {
            success: `${appUrl}/checkout/success`,
            pending: `${appUrl}/checkout/pending`,
            failure: `${appUrl}/checkout/failure`,
          },
          auto_return: "approved",
          notification_url: `${appUrl}/api/webhooks/mercadopago`,
          statement_descriptor: "ELASTICOS 8 AGOSTO",
          metadata: {
            customer_name: customer.name,
            customer_lastname: customer.lastname || "",
            customer_email: customer.email,
            customer_phone: customer.phone,
            dni_cuit: customer.dni_cuit,
            invoice_type: customer.invoice_type || "B",
            business_name: customer.business_name || "",
            shipping_type: shipping?.type || "pickup",
            shipping_address: shipping?.address || "",
            postal_code: shipping?.postal_code || "",
            city: shipping?.city || "",
            province: shipping?.province || "",
            shipping_cost: shippingCost,
            subtotal: subtotal || grandTotal,
          },
        },
      })

      return NextResponse.json({
        init_point: result.init_point || result.sandbox_init_point,
        id: result.id,
      })
    }

    // Modo demostración si aún no está configurado el Access Token en .env.local
    const mockOrder = await createOrder({
      customer_name: customer.name,
      customer_lastname: customer.lastname,
      customer_email: customer.email,
      customer_phone: customer.phone,
      dni_cuit: customer.dni_cuit,
      invoice_type: customer.invoice_type,
      business_name: customer.business_name,
      shipping_type: shipping?.type,
      shipping_address: shipping?.address,
      postal_code: shipping?.postal_code,
      city: shipping?.city,
      province: shipping?.province,
      shipping_cost: shippingCost,
      subtotal: subtotal || grandTotal,
      items,
      total: grandTotal,
      status: "paid",
    })

    return NextResponse.json({
      init_point: `${appUrl}/checkout/success?payment_id=${mockOrder.id}&name=${encodeURIComponent(
        customer.name
      )}&total=${grandTotal}&shipping=${encodeURIComponent(shipping?.address || "")}`,
      isDemo: true,
    })
  } catch (err: any) {
    console.error("Error al crear preferencia en Mercado Pago:", err)
    return NextResponse.json(
      { error: err.message || "Error al conectar con la pasarela de pagos" },
      { status: 500 }
    )
  }
}

import { getSupabaseServerClient } from "@/lib/supabase/server"

export interface OrderItem {
  id: string
  name: string
  qty: number
  price: number
}

export interface Order {
  id: string
  mercadopago_payment_id?: string | null
  customer_name: string
  customer_lastname?: string
  customer_email: string
  customer_phone: string
  dni_cuit?: string
  invoice_type?: "B" | "A" | string
  business_name?: string
  shipping_type?: "pickup" | "delivery" | string
  shipping_address?: string
  postal_code?: string
  city?: string
  province?: string
  shipping_cost?: number
  subtotal?: number
  items: OrderItem[]
  total: number
  status: "pending" | "paid" | "cancelled"
  created_at: string
}

let inMemoryOrders: Order[] = []

/**
 * Registra una nueva orden en Supabase y localmente
 */
export async function createOrder(data: {
  mercadopago_payment_id?: string | null
  customer_name: string
  customer_lastname?: string
  customer_email: string
  customer_phone: string
  dni_cuit?: string
  invoice_type?: "B" | "A" | string
  business_name?: string
  shipping_type?: "pickup" | "delivery" | string
  shipping_address?: string
  postal_code?: string
  city?: string
  province?: string
  shipping_cost?: number
  subtotal?: number
  items: OrderItem[]
  total: number
  status?: "pending" | "paid" | "cancelled"
}): Promise<Order> {
  const newOrder: Order = {
    id: `ord-${Date.now()}`,
    mercadopago_payment_id: data.mercadopago_payment_id || null,
    customer_name: data.customer_name.trim(),
    customer_lastname: data.customer_lastname?.trim() || "",
    customer_email: data.customer_email.trim(),
    customer_phone: data.customer_phone.trim(),
    dni_cuit: data.dni_cuit?.trim() || "",
    invoice_type: data.invoice_type || "B",
    business_name: data.business_name?.trim() || "",
    shipping_type: data.shipping_type || "pickup",
    shipping_address: data.shipping_address?.trim() || "",
    postal_code: data.postal_code?.trim() || "",
    city: data.city?.trim() || "",
    province: data.province?.trim() || "",
    shipping_cost: Number(data.shipping_cost) || 0,
    subtotal: Number(data.subtotal) || data.total,
    items: data.items,
    total: data.total,
    status: data.status || "paid",
    created_at: new Date().toISOString(),
  }

  const supabase = getSupabaseServerClient()
  if (supabase) {
    try {
      const { data: inserted, error } = await supabase
        .from("orders")
        .insert({
          mercadopago_payment_id: newOrder.mercadopago_payment_id,
          customer_name: `${newOrder.customer_name} ${newOrder.customer_lastname}`.trim(),
          customer_email: newOrder.customer_email,
          customer_phone: newOrder.customer_phone,
          dni_cuit: newOrder.dni_cuit,
          invoice_type: newOrder.invoice_type,
          business_name: newOrder.business_name,
          shipping_type: newOrder.shipping_type,
          shipping_address: newOrder.shipping_address,
          postal_code: newOrder.postal_code,
          city: newOrder.city,
          province: newOrder.province,
          shipping_cost: newOrder.shipping_cost,
          subtotal: newOrder.subtotal,
          items: newOrder.items,
          total: newOrder.total,
          status: newOrder.status,
        })
        .select()
        .single()

      if (!error && inserted) {
        return inserted
      }
    } catch (err) {
      console.warn("Error guardando orden en Supabase:", err)
    }
  }

  inMemoryOrders = [newOrder, ...inMemoryOrders]
  return newOrder
}

/**
 * Obtiene todas las órdenes
 */
export async function getAllOrders(): Promise<Order[]> {
  const supabase = getSupabaseServerClient()
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false })

      if (!error && data) return data
    } catch (err) {
      console.warn("Error consultando órdenes en Supabase:", err)
    }
  }
  return inMemoryOrders
}

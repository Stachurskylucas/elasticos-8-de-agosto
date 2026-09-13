import { MercadoPagoConfig, Preference, Payment } from "mercadopago"

/**
 * Obtiene el cliente configurado de Mercado Pago
 */
export function getMercadoPagoClient() {
  const token = process.env.MERCADOPAGO_ACCESS_TOKEN?.trim()
  if (!token) return null

  return new MercadoPagoConfig({
    accessToken: token,
    options: { timeout: 7000 },
  })
}

export { Preference, Payment }

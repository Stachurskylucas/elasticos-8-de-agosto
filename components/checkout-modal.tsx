"use client"

import { useMemo, useState } from "react"
import {
  Building2,
  Check,
  CreditCard,
  FileText,
  Loader2,
  Lock,
  MapPin,
  ShieldCheck,
  Truck,
  User,
  X,
} from "lucide-react"
import { useCart } from "@/components/cart-provider"
import { formatARS } from "@/lib/products"

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
}

/**
 * Calcula el costo de envío según el Código Postal argentino
 */
function getShippingCostByCP(cpStr: string): { cost: number; region: string } {
  const cp = parseInt(cpStr.replace(/\D/g, ""), 10)
  if (isNaN(cp) || cp <= 0) {
    return { cost: 0, region: "Ingresá tu código postal para cotizar" }
  }

  // CABA y Gran Buenos Aires (AMBA)
  if (cp >= 1000 && cp <= 1999) {
    return { cost: 6500, region: "AMBA / CABA y Gran Buenos Aires (Envío prioritario)" }
  }

  // Provincia de Buenos Aires (Interior)
  if ((cp >= 2700 && cp <= 2999) || (cp >= 6000 && cp <= 8999)) {
    return { cost: 9800, region: "Provincia de Buenos Aires (Interior por Expreso)" }
  }

  // Litoral y Centro (Santa Fe, Córdoba, Entre Ríos)
  if ((cp >= 2000 && cp <= 2699) || (cp >= 3000 && cp <= 3999) || (cp >= 5000 && cp <= 5999)) {
    return { cost: 12500, region: "Región Centro y Litoral (Despacho en el día)" }
  }

  // Resto del País (Cuyo, Noroeste, Noreste, Patagonia)
  return { cost: 15800, region: "Resto del País / Expreso a Transporte de tu preferencia" }
}

export function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { items, totalAmount, clear } = useCart()

  // 1. Datos de Contacto
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")

  // 2. Datos Personales / Facturación
  const [name, setName] = useState("")
  const [lastname, setLastname] = useState("")
  const [dniCuit, setDniCuit] = useState("")
  const [invoiceType, setInvoiceType] = useState<"B" | "A">("B")
  const [businessName, setBusinessName] = useState("")

  // 3. Método de Entrega y Dirección
  const [deliveryMethod, setDeliveryMethod] = useState<"pickup" | "delivery">("delivery")
  const [postalCode, setPostalCode] = useState("")
  const [province, setProvince] = useState("Buenos Aires")
  const [city, setCity] = useState("")
  const [streetAddress, setStreetAddress] = useState("")
  const [floorApartment, setFloorApartment] = useState("")
  const [transportNote, setTransportNote] = useState("")

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Cálculo de Envío y Total
  const shippingInfo = useMemo(() => {
    if (deliveryMethod === "pickup") {
      return { cost: 0, region: "Retiro inmediato en taller (Pablo Podestá, Tres de Febrero)" }
    }
    return getShippingCostByCP(postalCode)
  }, [deliveryMethod, postalCode])

  const grandTotal = useMemo(() => {
    return totalAmount + shippingInfo.cost
  }, [totalAmount, shippingInfo.cost])

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validaciones
    if (!name.trim() || !lastname.trim() || !email.trim() || !phone.trim() || !dniCuit.trim()) {
      setError("Por favor completá todos los campos de contacto y facturación requeridos")
      return
    }

    if (invoiceType === "A" && !businessName.trim()) {
      setError("Ingresá la Razón Social para la emisión de Factura A")
      return
    }

    if (deliveryMethod === "delivery") {
      if (!postalCode.trim() || !streetAddress.trim() || !city.trim()) {
        setError("Completá tu Código Postal, Dirección y Localidad para coordinar el envío")
        return
      }
    }

    setLoading(true)
    setError(null)

    try {
      const fullAddress =
        deliveryMethod === "pickup"
          ? "Retiro en Taller Oficial (Pablo Podestá)"
          : `${streetAddress.trim()} ${floorApartment.trim() ? `(${floorApartment.trim()})` : ""}, ${city.trim()}, ${province} (CP ${postalCode.trim()})`

      const payload = {
        items,
        customer: {
          name: name.trim(),
          lastname: lastname.trim(),
          email: email.trim(),
          phone: phone.trim(),
          dni_cuit: dniCuit.trim(),
          invoice_type: invoiceType,
          business_name: invoiceType === "A" ? businessName.trim() : undefined,
        },
        shipping: {
          type: deliveryMethod,
          cost: shippingInfo.cost,
          address: fullAddress,
          postal_code: postalCode.trim(),
          city: city.trim(),
          province,
          notes: transportNote.trim(),
        },
        subtotal: totalAmount,
        total: grandTotal,
      }

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "No se pudo generar la orden de pago")
      }

      if (data.init_point) {
        clear() // Limpiar carrito
        window.location.href = data.init_point
      } else {
        throw new Error("No se recibió el enlace de pago de Mercado Pago")
      }
    } catch (err: any) {
      setError(err.message || "Error al conectar con Mercado Pago")
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-dark/85 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Box */}
      <div className="relative z-10 my-6 w-full max-w-2xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand text-white shadow-sm">
              <Lock className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-display text-sm font-bold tracking-wide text-dark">
                FINALIZAR COMPRA
              </h3>
              <p className="text-[11px] text-slate-500">
                Entrega, Facturación y Pago Seguro vía Mercado Pago
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-200 hover:text-dark transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="p-6 max-h-[80vh] overflow-y-auto">
          {error && (
            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-3.5 text-xs font-semibold text-red-700">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-5">
            {/* 1. SECCIÓN: DATOS DE CONTACTO */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4">
              <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-dark">
                <User className="h-4 w-4 text-brand" />
                1. Datos de Contacto
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-[11px] font-bold uppercase text-slate-600">
                    Correo Electrónico (Email) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ejemplo@gmail.com"
                    className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs text-dark outline-none focus:border-brand"
                  />
                  <span className="text-[10px] text-slate-400">Recibirás el comprobante y seguimiento aquí.</span>
                </div>

                <div>
                  <label className="mb-1 block text-[11px] font-bold uppercase text-slate-600">
                    Teléfono / Celular <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="11 4455 6677"
                    className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs text-dark outline-none focus:border-brand"
                  />
                  <span className="text-[10px] text-slate-400">Para coordinar el despacho o retiro.</span>
                </div>
              </div>
            </div>

            {/* 2. SECCIÓN: DATOS PERSONALES Y FACTURACIÓN */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-dark">
                  <FileText className="h-4 w-4 text-brand" />
                  2. Titular y Facturación
                </div>

                {/* Selector Factura A / B */}
                <div className="inline-flex rounded-lg border border-slate-300 bg-white p-0.5 text-[11px] font-bold">
                  <button
                    type="button"
                    onClick={() => setInvoiceType("B")}
                    className={`rounded-md px-2.5 py-1 transition-colors ${
                      invoiceType === "B"
                        ? "bg-brand text-white shadow-sm"
                        : "text-slate-600 hover:text-dark"
                    }`}
                  >
                    Factura B (Consumidor Final)
                  </button>
                  <button
                    type="button"
                    onClick={() => setInvoiceType("A")}
                    className={`rounded-md px-2.5 py-1 transition-colors ${
                      invoiceType === "A"
                        ? "bg-brand text-white shadow-sm"
                        : "text-slate-600 hover:text-dark"
                    }`}
                  >
                    Factura A (Empresa / Resp. Inscripto)
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div>
                  <label className="mb-1 block text-[11px] font-bold uppercase text-slate-600">
                    Nombre <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Carlos"
                    className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs text-dark outline-none focus:border-brand"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-[11px] font-bold uppercase text-slate-600">
                    Apellido <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    placeholder="González"
                    className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs text-dark outline-none focus:border-brand"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-[11px] font-bold uppercase text-slate-600">
                    {invoiceType === "A" ? "CUIT de la Empresa" : "DNI / CUIT"} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={dniCuit}
                    onChange={(e) => setDniCuit(e.target.value)}
                    placeholder={invoiceType === "A" ? "30-12345678-9" : "33444555"}
                    className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs text-dark outline-none focus:border-brand"
                  />
                </div>
              </div>

              {invoiceType === "A" && (
                <div className="mt-3">
                  <label className="mb-1 block text-[11px] font-bold uppercase text-slate-600">
                    Razón Social <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="Transportes González S.A."
                    className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs text-dark outline-none focus:border-brand"
                  />
                </div>
              )}
            </div>

            {/* 3. SECCIÓN: MÉTODO DE ENTREGA Y DIRECCIÓN */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-dark">
                  <Truck className="h-4 w-4 text-brand" />
                  3. Forma de Entrega
                </div>
              </div>

              {/* Botones de opción de entrega */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setDeliveryMethod("pickup")}
                  className={`flex flex-col rounded-xl border p-3.5 text-left transition-all ${
                    deliveryMethod === "pickup"
                      ? "border-brand bg-brand/5 ring-2 ring-brand/30"
                      : "border-slate-300 bg-white hover:border-slate-400"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display text-xs font-bold text-dark">
                      Retiro en Taller Oficial
                    </span>
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-black text-emerald-800">
                      GRATIS
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] text-slate-500">
                    Av. Márquez / Pablo Podestá (Tres de Febrero). Listo para retirar.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryMethod("delivery")}
                  className={`flex flex-col rounded-xl border p-3.5 text-left transition-all ${
                    deliveryMethod === "delivery"
                      ? "border-brand bg-brand/5 ring-2 ring-brand/30"
                      : "border-slate-300 bg-white hover:border-slate-400"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display text-xs font-bold text-dark">
                      Envío a Domicilio / Expreso
                    </span>
                    <span className="text-[11px] font-bold text-brand">
                      {shippingInfo.cost > 0 ? formatARS(shippingInfo.cost) : "Por CP"}
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] text-slate-500">
                    Despacho a todo el país por Expreso o Correo.
                  </p>
                </button>
              </div>

              {/* Campos de Dirección si es Envío */}
              {deliveryMethod === "delivery" && (
                <div className="mt-4 flex flex-col gap-3 border-t border-slate-200 pt-3">
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <div>
                      <label className="mb-1 block text-[11px] font-bold uppercase text-slate-600">
                        Código Postal <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        placeholder="Ej: 1657"
                        className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-bold text-dark outline-none focus:border-brand"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-[11px] font-bold uppercase text-slate-600">
                        Provincia <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={province}
                        onChange={(e) => setProvince(e.target.value)}
                        className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-dark outline-none focus:border-brand"
                      >
                        <option value="Buenos Aires">Buenos Aires / CABA</option>
                        <option value="Santa Fe">Santa Fe</option>
                        <option value="Córdoba">Córdoba</option>
                        <option value="Entre Ríos">Entre Ríos</option>
                        <option value="Mendoza">Mendoza</option>
                        <option value="Tucumán">Tucumán</option>
                        <option value="Salta">Salta</option>
                        <option value="Chaco">Chaco</option>
                        <option value="Corrientes">Corrientes</option>
                        <option value="Misiones">Misiones</option>
                        <option value="Neuquén">Neuquén</option>
                        <option value="Río Negro">Río Negro</option>
                        <option value="Chubut">Chubut</option>
                        <option value="Santa Cruz">Santa Cruz</option>
                        <option value="San Juan">San Juan</option>
                        <option value="San Luis">San Luis</option>
                        <option value="La Pampa">La Pampa</option>
                        <option value="Santiago del Estero">Santiago del Estero</option>
                        <option value="Jujuy">Jujuy</option>
                        <option value="Formosa">Formosa</option>
                        <option value="Catamarca">Catamarca</option>
                        <option value="La Rioja">La Rioja</option>
                        <option value="Tierra del Fuego">Tierra del Fuego</option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-1 block text-[11px] font-bold uppercase text-slate-600">
                        Ciudad / Localidad <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="San Martín, Rosario..."
                        className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs text-dark outline-none focus:border-brand"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <div className="sm:col-span-2">
                      <label className="mb-1 block text-[11px] font-bold uppercase text-slate-600">
                        Calle y Altura <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={streetAddress}
                        onChange={(e) => setStreetAddress(e.target.value)}
                        placeholder="Av. Rivadavia 1234"
                        className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs text-dark outline-none focus:border-brand"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-[11px] font-bold uppercase text-slate-600">
                        Piso / Dpto / Datos
                      </label>
                      <input
                        type="text"
                        value={floorApartment}
                        onChange={(e) => setFloorApartment(e.target.value)}
                        placeholder="Piso 2 B / Portón gris"
                        className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs text-dark outline-none focus:border-brand"
                      />
                    </div>
                  </div>

                  {/* Detalle del cálculo de envío */}
                  {postalCode.trim() && (
                    <div className="mt-1 flex items-center justify-between rounded-xl bg-emerald-50/80 border border-emerald-200 p-2.5 text-xs text-emerald-900">
                      <div>
                        <span className="font-bold">Costo de Envío ({shippingInfo.region}):</span>
                      </div>
                      <span className="font-display text-sm font-bold text-emerald-700">
                        {formatARS(shippingInfo.cost)}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 4. RESUMEN FINAL DEL PEDIDO */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between text-xs text-slate-600 mb-1.5">
                <span>Subtotal ({items.reduce((a, b) => a + b.qty, 0)} repuestos):</span>
                <span className="font-semibold text-dark">{formatARS(totalAmount)}</span>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-600 mb-2">
                <span>Costo de Entrega:</span>
                <span className="font-semibold text-dark">
                  {deliveryMethod === "pickup" ? "Gratis (Retiro en Taller)" : formatARS(shippingInfo.cost)}
                </span>
              </div>

              <div className="flex items-center justify-between border-t border-slate-200 pt-2.5 text-sm font-bold text-dark">
                <span>Total a Pagar:</span>
                <span className="font-display text-lg font-bold text-brand">
                  {formatARS(grandTotal)}
                </span>
              </div>
            </div>

            {/* Garantía de Seguridad */}
            <div className="flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-[11px] text-emerald-800">
              <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-600" />
              <span>
                Al hacer clic serás redirigido a la pasarela segura de <strong>Mercado Pago</strong> para abonar con Tarjetas, Débito o Dinero en cuenta.
              </span>
            </div>

            {/* Botón de Envío */}
            <div className="flex flex-col gap-2 pt-1">
              <button
                type="submit"
                disabled={loading}
                className="btn btn-brand flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-xs font-bold text-white shadow-lg shadow-brand/25 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    CONECTANDO CON MERCADO PAGO...
                  </>
                ) : (
                  <>
                    <CreditCard className="h-4 w-4" />
                    CONTINUAR AL PAGO CON MERCADO PAGO ({formatARS(grandTotal)})
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={onClose}
                className="text-xs font-semibold text-slate-500 py-1 text-center underline hover:text-dark"
              >
                Volver al Carrito
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

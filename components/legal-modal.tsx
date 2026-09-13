"use client"

import { useEffect, useState } from "react"
import { FileText, Shield, X } from "lucide-react"

export type LegalTab = "privacidad" | "terminos"

interface LegalModalProps {
  isOpen: boolean
  onClose: () => void
  initialTab?: LegalTab
}

export function LegalModal({ isOpen, onClose, initialTab = "privacidad" }: LegalModalProps) {
  const [activeTab, setActiveTab] = useState<LegalTab>(initialTab)

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab)
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen, initialTab])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    if (isOpen) window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-dark/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="legal-modal-title"
        className="relative z-10 flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-light px-6 py-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand/10 text-brand">
              {activeTab === "privacidad" ? (
                <Shield className="h-5 w-5" />
              ) : (
                <FileText className="h-5 w-5" />
              )}
            </span>
            <div>
              <h2 id="legal-modal-title" className="font-display text-lg font-bold text-dark">
                INFORMACIÓN LEGAL
              </h2>
              <p className="text-xs text-slate-500">Elásticos 8 de Agosto · Suspensión Pesada</p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Cerrar modal"
            className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-200 hover:text-dark"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-200 bg-slate-50/80 px-6 pt-3">
          <button
            onClick={() => setActiveTab("privacidad")}
            className={`relative pb-3 font-display text-sm font-bold tracking-wide transition-colors ${
              activeTab === "privacidad" ? "text-brand" : "text-slate-500 hover:text-dark"
            }`}
          >
            Políticas de Privacidad
            {activeTab === "privacidad" && (
              <span className="absolute bottom-0 left-0 h-0.5 w-full bg-brand" />
            )}
          </button>

          <button
            onClick={() => setActiveTab("terminos")}
            className={`relative ml-6 pb-3 font-display text-sm font-bold tracking-wide transition-colors ${
              activeTab === "terminos" ? "text-brand" : "text-slate-500 hover:text-dark"
            }`}
          >
            Términos y Condiciones
            {activeTab === "terminos" && (
              <span className="absolute bottom-0 left-0 h-0.5 w-full bg-brand" />
            )}
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 text-sm leading-relaxed text-slate-600 sm:p-8">
          {activeTab === "privacidad" ? (
            <div className="space-y-6">
              <div>
                <h3 className="mb-2 font-display text-base font-bold text-dark">
                  1. Responsabilidad sobre el Tratamiento de Datos
                </h3>
                <p>
                  En <strong>Elásticos 8 de Agosto</strong> respetamos y protegemos la privacidad de
                  nuestros clientes, transportistas y usuarios. Los datos personales provistos a
                  través de consultas telefónicas, formularios de contacto o canales de WhatsApp son
                  tratados conforme a la Ley N° 25.326 de Protección de los Datos Personales de la
                  República Argentina.
                </p>
              </div>

              <div>
                <h3 className="mb-2 font-display text-base font-bold text-dark">
                  2. Datos que Recopilamos
                </h3>
                <p>
                  Solo recopilamos la información estrictamente necesaria para brindar cotizaciones,
                  coordinar turnos de taller y gestionar envíos de repuestos al interior del país:
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-600">
                  <li>Nombre, apellido y datos de la empresa o chofer.</li>
                  <li>Número de teléfono celular / WhatsApp y correo electrónico.</li>
                  <li>
                    Datos del vehículo o flota (marca, modelo, año, configuración de suspensión).
                  </li>
                  <li>
                    Dirección de entrega o expreso de preferencia para despachos comerciales.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="mb-2 font-display text-base font-bold text-dark">
                  3. Finalidad y Uso de la Información
                </h3>
                <p>
                  La información provista se utiliza exclusivamente para la confección de
                  presupuestos, seguimiento de reparaciones mecánicas en taller, facturación y
                  coordinación logística de envíos. <strong>Elásticos 8 de Agosto</strong> no vende,
                  alquila ni cede datos a terceros con fines publicitarios.
                </p>
              </div>

              <div>
                <h3 className="mb-2 font-display text-base font-bold text-dark">
                  4. Seguridad y Confidencialidad
                </h3>
                <p>
                  Implementamos medidas técnicas y organizativas para salvaguardar la confidencialidad
                  de los datos y evitar su alteración, pérdida o acceso no autorizado.
                </p>
              </div>

              <div>
                <h3 className="mb-2 font-display text-base font-bold text-dark">
                  5. Derechos de Acceso, Rectificación y Supresión
                </h3>
                <p>
                  El titular de los datos personales tiene la facultad de ejercer el derecho de
                  acceso, rectificación o eliminación de sus datos de forma gratuita contactándonos
                  directamente por nuestros canales de atención oficial.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <h3 className="mb-2 font-display text-base font-bold text-dark">
                  1. Ámbito de Aplicación y Objeto
                </h3>
                <p>
                  Los presentes Términos y Condiciones regulan la consulta de catálogo, cotización,
                  adquisición de repuestos y contratación de servicios de taller en{" "}
                  <strong>Elásticos 8 de Agosto</strong> (Ciudadela, Buenos Aires).
                </p>
              </div>

              <div>
                <h3 className="mb-2 font-display text-base font-bold text-dark">
                  2. Cotizaciones, Pedidos y Precios
                </h3>
                <p>
                  Los productos listados en el catálogo digital constituyen una muestra referencial
                  de stock. Las cotizaciones emitidas a través de WhatsApp o llamada telefónica
                  tienen un período de validez informado al momento de la consulta, debido a las
                  variaciones en costos de materia prima y acero de suspensión pesada.
                </p>
              </div>

              <div>
                <h3 className="mb-2 font-display text-base font-bold text-dark">
                  3. Servicios de Taller y Mano de Obra
                </h3>
                <p>
                  Todos los trabajos de curvado, alineación, cambio de bujes, armado de paquetes y
                  reparación de suspensión se realizan bajo previa revisión técnica y presupuesto
                  acordado con el cliente antes de la intervención en fosa.
                </p>
              </div>

              <div>
                <h3 className="mb-2 font-display text-base font-bold text-dark">
                  4. Garantía de Repuestos y Reparaciones
                </h3>
                <p>
                  Garantizamos la calidad del acero y los repuestos provistos de fábrica, así como la
                  correcta instalación mecánica. La garantía cubre defectos de fabricación y mano de
                  obra bajo condiciones normales de carga y uso reglamentario de la unidad.
                </p>
              </div>

              <div>
                <h3 className="mb-2 font-display text-base font-bold text-dark">
                  5. Envíos y Despachos Nacionales
                </h3>
                <p>
                  Efectuamos despachos diarios a expresos de carga y transportes seleccionados. Una
                  vez entregada la mercadería en la empresa de transporte, se provee el número de guía
                  correspondiente para su seguimiento y retiro.
                </p>
              </div>

              <div>
                <h3 className="mb-2 font-display text-base font-bold text-dark">
                  6. Contacto y Jurisdicción
                </h3>
                <p>
                  Para cualquier consulta comercial o legal, podés comunicarte telefónicamente o
                  visitar nuestras instalaciones en Ciudadela, Provincia de Buenos Aires, República
                  Argentina.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between border-t border-slate-200 bg-light px-6 py-4">
          <span className="text-xs text-slate-500">Última actualización: Agosto 2026</span>
          <button
            onClick={onClose}
            className="btn btn-brand rounded-lg px-5 py-2 text-xs font-bold text-white"
          >
            ENTENDIDO
          </button>
        </div>
      </div>
    </div>
  )
}

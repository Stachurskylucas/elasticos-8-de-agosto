"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Clock, Mail, MapPin, Phone } from "lucide-react"
import { ADDRESS, EMAIL, HOURS, MAPS_EMBED_URL, MAPS_URL, PHONE_DISPLAY, PHONE_TEL, wa } from "@/lib/site"
import { LegalModal, type LegalTab } from "@/components/legal-modal"

export function SiteFooter() {
  const pathname = usePathname()
  const [legalOpen, setLegalOpen] = useState(false)
  const [legalTab, setLegalTab] = useState<LegalTab>("privacidad")

  // Ocultar footer en el panel de administrador
  if (pathname?.startsWith("/admin")) {
    return null
  }

  const openLegal = (tab: LegalTab) => {
    setLegalTab(tab)
    setLegalOpen(true)
  }
  return (
    <footer id="contacto" className="bg-dark pb-8 pt-16">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {/* Contacto + mapa */}
        <div className="grid gap-10 border-b border-white/10 pb-14 lg:grid-cols-2">
          <div className="reveal">
            <p className="mb-3 text-sm font-bold tracking-[0.2em] text-brand">CONTACTO</p>
            <h2 className="mb-5 font-display text-3xl font-bold leading-tight text-white md:text-4xl">
              ¿NECESITÁS UN REPUESTO O TRAER EL CAMIÓN?
            </h2>
            <p className="mb-8 max-w-md leading-relaxed text-white/60">
              Pedí precio por WhatsApp o vení directo al taller, en Pablo Podestá.
            </p>

            <div className="flex flex-col gap-5">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white/10">
                  <Phone className="h-5 w-5 text-brand" />
                </span>
                <div>
                  <p className="mb-0.5 text-xs font-bold tracking-widest text-white/40">
                    LLAMADAS Y WHATSAPP
                  </p>
                  <a
                    href={`tel:${PHONE_TEL}`}
                    className="font-display text-lg font-bold text-white transition-colors hover:text-brand"
                  >
                    {PHONE_DISPLAY}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white/10">
                  <MapPin className="h-5 w-5 text-brand" />
                </span>
                <div>
                  <p className="mb-0.5 text-xs font-bold tracking-widest text-white/40">
                    DIRECCIÓN
                  </p>
                  <p className="font-display text-lg font-bold text-white">{ADDRESS}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white/10">
                  <Mail className="h-5 w-5 text-brand" />
                </span>
                <div>
                  <p className="mb-0.5 text-xs font-bold tracking-widest text-white/40">
                    EMAIL
                  </p>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="font-display text-base font-bold text-white transition-colors hover:text-brand"
                  >
                    {EMAIL}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white/10">
                  <Clock className="h-5 w-5 text-brand" />
                </span>
                <div>
                  <p className="mb-0.5 text-xs font-bold tracking-widest text-white/40">HORARIOS</p>
                  <p className="font-display text-lg font-bold text-white">{HOURS}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-map reveal relative min-h-[300px] overflow-hidden rounded-2xl lg:min-h-0">
            <iframe
              src={MAPS_EMBED_URL}
              className="absolute inset-0 h-full w-full"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación de Elásticos 8 de Agosto en Google Maps"
            />
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textTransform: "none" }}
              className="btn btn-brand absolute bottom-4 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 rounded-lg px-5 py-2.5 text-xs font-semibold text-white shadow-xl backdrop-blur-sm sm:text-sm"
            >
              <MapPin className="h-4 w-4" />
              Ver en Google Maps
            </a>
          </div>
        </div>

        {/* Columnas */}
        <div className="grid gap-10 border-b border-white/10 py-12 md:grid-cols-3">
          <div>
            <div className="mb-5">
              <Link
                href="/"
                aria-label="Elásticos 8 de Agosto"
                className="inline-block transition-transform duration-200 hover:scale-[1.02]"
              >
                <Image
                  src="/images/logo-full-white.png"
                  alt="Elásticos 8 de Agosto"
                  width={180}
                  height={150}
                  className="h-16 w-auto object-contain sm:h-18 md:h-20 transition-opacity hover:opacity-90"
                />
              </Link>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-white/60">
              Taller en Pablo Podestá. Hace más de 30 años que vendemos y reparamos
              elásticos, hojas, bujes y grampas para camiones.
            </p>
          </div>

          <div>
            <h4 className="mb-5 font-display text-sm font-bold tracking-widest text-white">
              SECCIONES
            </h4>
            <ul className="flex flex-col gap-3 text-sm text-white/50">
              {[
                { href: "/", label: "Inicio" },
                { href: "/servicios", label: "Servicios" },
                { href: "/productos", label: "Catálogo" },
                { href: "/nosotros", label: "Nosotros" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="transition-colors hover:text-brand">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 font-display text-sm font-bold tracking-widest text-white">
              REPUESTOS
            </h4>
            <ul className="flex flex-col gap-3 text-sm text-white/50">
              {[
                "Elásticos Completos",
                "Hojas de Recambio",
                "Bujes y Tensores",
                "Pernos y Grilletes",
                "Amortiguadores",
              ].map((l) => (
                <li key={l}>
                  <Link href="/productos" className="transition-colors hover:text-brand">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 pt-8 text-xs text-white/40 sm:flex-row">
          <p>© {new Date().getFullYear()} Elásticos 8 de Agosto. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <button
              onClick={() => openLegal("privacidad")}
              className="transition-colors hover:text-white hover:underline"
            >
              Políticas de Privacidad
            </button>
            <button
              onClick={() => openLegal("terminos")}
              className="transition-colors hover:text-white hover:underline"
            >
              Términos y Condiciones
            </button>
          </div>
        </div>
      </div>

      <LegalModal
        isOpen={legalOpen}
        onClose={() => setLegalOpen(false)}
        initialTab={legalTab}
      />
    </footer>
  )
}

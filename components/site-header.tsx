"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { Menu, X } from "lucide-react"
import { wa } from "@/lib/site"

const NAV = [
  { href: "/", label: "INICIO" },
  { href: "/productos", label: "CATÁLOGO" },
  { href: "/servicios", label: "SERVICIOS" },
  { href: "/nosotros", label: "NOSOTROS" },
]

export function SiteHeader() {
  const pathname = usePathname()
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    lastY.current = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 20)
      if (y < 80) setHidden(false)
      else if (y > lastY.current + 6) setHidden(true)
      else if (y < lastY.current - 6) setHidden(false)
      lastY.current = y
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <header
      id="site-header"
      className={`fixed inset-x-0 top-0 z-50 bg-white/95 backdrop-blur ${scrolled ? "is-scrolled" : ""} ${
        hidden && !menuOpen ? "is-hidden" : ""
      }`}
    >
      <div className="h-1 w-full bg-gradient-to-r from-brand via-dark to-brand" />

      <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between gap-4 px-5 md:px-8 lg:h-20">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-3">
          <span className="leaf-mark flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-dark">
            <svg viewBox="0 0 32 32" className="h-6 w-6" fill="none" aria-hidden="true">
              <path d="M4 12C10 8 22 8 28 12" stroke="#0088cc" strokeWidth="2.4" strokeLinecap="round" />
              <path d="M4 17C10 13.5 22 13.5 28 17" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" />
              <path d="M4 22C10 19 22 19 28 22" stroke="#0088cc" strokeWidth="2.4" strokeLinecap="round" />
            </svg>
          </span>
          <span className="leading-tight">
            <span className="block font-display text-xl font-bold tracking-tight text-dark md:text-2xl">
              ELÁSTICOS
            </span>
            <span className="block font-display text-[11px] font-medium tracking-[0.25em] text-brand md:text-xs">
              8 DE AGOSTO
            </span>
          </span>
        </Link>

        {/* Nav desktop */}
        <nav aria-label="Navegación principal" className="hidden items-center gap-7 lg:flex">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`nav-link font-display text-sm font-bold tracking-wide text-dark transition-colors hover:text-brand ${
                pathname === n.href ? "active" : ""
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3.5 sm:gap-4">
          <a
            href={wa("Hola! Necesito información sobre elásticos para mi camión.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whats hidden items-center gap-2 rounded-none px-5 py-2.5 text-sm text-white sm:flex"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
              <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.49-.9-.8-1.5-1.79-1.68-2.09-.17-.3-.02-.46.13-.61.15-.15.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.09 3.34 5.08 4.55 2.99 1.21 2.99.8 3.53.75.54-.05 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35zM12 22a10 10 0 1 1 10-10c0 1.82-.49 3.53-1.34 5l1.31 4.79-4.93-1.29A9.95 9.95 0 0 1 12 22z" />
            </svg>
            WHATSAPP
          </a>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Abrir menú"
            aria-expanded={menuOpen}
            className="rounded-none border border-slate-200 p-2.5 text-dark transition-all duration-200 hover:border-dark hover:bg-dark hover:text-white lg:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Menú mobile */}
      <div
        id="mobile-menu"
        className={`overflow-hidden border-t border-slate-200 bg-white lg:hidden ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav aria-label="Navegación mobile" className="mx-auto flex max-w-7xl flex-col px-4 py-2">
          {NAV.map((n, i) => (
            <Link
              key={n.href}
              href={n.href}
              className={`py-3.5 font-display text-sm font-bold tracking-wide transition-colors hover:text-brand ${
                i < NAV.length - 1 ? "border-b border-slate-100" : ""
              } ${pathname === n.href ? "text-brand" : "text-dark"}`}
            >
              {n.label}
            </Link>
          ))}
          <div className="py-3">
            <a
              href={wa("Hola! Necesito información sobre elásticos para mi camión.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whats flex w-full items-center justify-center gap-2 rounded-none py-3 text-xs font-bold text-white shadow-sm"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.49-.9-.8-1.5-1.79-1.68-2.09-.17-.3-.02-.46.13-.61.15-.15.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.09 3.34 5.08 4.55 2.99 1.21 2.99.8 3.53.75.54-.05 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35zM12 22a10 10 0 1 1 10-10c0 1.82-.49 3.53-1.34 5l1.31 4.79-4.93-1.29A9.95 9.95 0 0 1 12 22z" />
              </svg>
              WHATSAPP
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}

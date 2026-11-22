"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

type Mode = "view" | "exit" | "pin"

interface Item {
  el: HTMLElement
  mode: Mode
  steps: number
  cur: number
  target: number
  step: number
}

const clamp = (n: number) => Math.min(1, Math.max(0, n))

/**
 * Motor de scroll del sitio. Cada elemento con `data-scroll` recibe una
 * variable CSS `--p` (0 a 1) suavizada con inercia; el CSS hace el resto.
 *
 *  - data-scroll="view": 0 cuando entra por abajo, 1 cuando sale por arriba.
 *  - data-scroll="exit": 0 con el elemento arriba de todo, 1 cuando terminó de salir.
 *  - data-scroll="pin":  avance dentro de una sección alta con hijo sticky.
 *  - data-steps="4":     además escribe data-step="0..3" según el avance.
 */
export function ScrollFx() {
  const pathname = usePathname()

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const items: Item[] = Array.from(
      document.querySelectorAll<HTMLElement>("[data-scroll]"),
    ).map((el) => ({
      el,
      mode: (el.dataset.scroll as Mode) || "view",
      steps: Number(el.dataset.steps || 0),
      cur: -1,
      target: 0,
      step: -1,
    }))
    if (!items.length) return

    let raf = 0

    const measure = () => {
      const vh = window.innerHeight
      for (const it of items) {
        const r = it.el.getBoundingClientRect()
        if (it.mode === "pin") {
          it.target = clamp(-r.top / Math.max(1, r.height - vh))
        } else if (it.mode === "exit") {
          it.target = clamp(-r.top / Math.max(1, r.height))
        } else {
          it.target = clamp((vh - r.top) / (vh + r.height))
        }
      }
    }

    const tick = () => {
      let moving = false
      for (const it of items) {
        if (it.cur < 0) it.cur = it.target
        const diff = it.target - it.cur
        if (Math.abs(diff) > 0.0004) {
          it.cur += diff * 0.11
          moving = true
        } else {
          it.cur = it.target
        }
        it.el.style.setProperty("--p", it.cur.toFixed(4))
        if (it.steps) {
          const step = Math.min(it.steps - 1, Math.floor(it.cur * it.steps))
          if (step !== it.step) {
            it.step = step
            it.el.dataset.step = String(step)
          }
        }
      }
      raf = moving ? requestAnimationFrame(tick) : 0
    }

    const kick = () => {
      measure()
      if (!raf) raf = requestAnimationFrame(tick)
    }

    kick()
    window.addEventListener("scroll", kick, { passive: true })
    window.addEventListener("resize", kick)

    return () => {
      window.removeEventListener("scroll", kick)
      window.removeEventListener("resize", kick)
      if (raf) cancelAnimationFrame(raf)
      for (const it of items) {
        it.el.style.removeProperty("--p")
        delete it.el.dataset.step
      }
    }
  }, [pathname])

  return null
}

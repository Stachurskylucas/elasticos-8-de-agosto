"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export function ScrollReveal() {
  const pathname = usePathname()

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible")
            io.unobserve(e.target)
          }
        }
      },
      { threshold: 0.02, rootMargin: "0px 0px 80px 0px" },
    )

    const observeElements = () => {
      const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal:not(.is-visible)"))
      els.forEach((el, i) => {
        // Si el elemento ya está visible en pantalla al cargar, mostrarlo directamente
        const rect = el.getBoundingClientRect()
        if (rect.top < window.innerHeight + 50 && rect.bottom > 0) {
          el.classList.add("is-visible")
        } else {
          el.style.transitionDelay = `${Math.min(i % 3, 2) * 40}ms`
          io.observe(el)
        }
      })
    }

    observeElements()

    const mo = new MutationObserver(() => {
      observeElements()
    })

    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [pathname])

  return null
}

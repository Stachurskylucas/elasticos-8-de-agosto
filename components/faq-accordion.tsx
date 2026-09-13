"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

export interface FaqItem {
  q: string
  a: string
}

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index))
  }

  return (
    <div className="flex flex-col gap-4">
      {items.map((item, index) => {
        const isOpen = openIndex === index
        const contentId = `faq-answer-${index}`
        const headerId = `faq-header-${index}`

        return (
          <div
            key={item.q}
            className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
              isOpen
                ? "border-brand/40 bg-white shadow-md shadow-brand/5"
                : "border-slate-200/80 bg-light hover:border-slate-300"
            }`}
          >
            <button
              id={headerId}
              type="button"
              onClick={() => toggle(index)}
              aria-expanded={isOpen}
              aria-controls={contentId}
              className="normal-case flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors"
            >
              <span
                className={`normal-case font-display text-base font-bold transition-colors md:text-lg ${
                  isOpen ? "text-brand" : "text-dark"
                }`}
              >
                {item.q}
              </span>
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                  isOpen ? "bg-brand/10 text-brand rotate-180" : "bg-white text-slate-400"
                }`}
              >
                <ChevronDown className="h-4 w-4" />
              </span>
            </button>

            <div
              id={contentId}
              role="region"
              aria-labelledby={headerId}
              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="border-t border-slate-100 px-6 pb-6 pt-3 text-sm leading-relaxed text-slate-600 md:text-base">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

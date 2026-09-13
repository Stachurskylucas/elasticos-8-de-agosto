import React from "react"

export function BrandLogosSlider({
  bgClassName = "bg-white",
  gradientColor = "white",
  showGradients = true,
}: {
  bgClassName?: string
  gradientColor?: "white" | "gray"
  showGradients?: boolean
}) {
  const logos = [
    {
      id: "scania",
      name: "Scania",
      svg: (
        <svg viewBox="0 0 160 40" className="h-9 md:h-11 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Griffin Emblem */}
          <circle cx="20" cy="20" r="17" fill="#041e42" stroke="#d4af37" strokeWidth="1.5" />
          <path d="M14 14C14 10 26 10 26 14L24 16C24 13 16 13 16 16C16 22 26 18 26 25C26 29 14 29 14 24L16 22C16 26 24 26 24 23C24 18 14 21 14 14Z" fill="#e31837" />
          <path d="M17 11L20 8L23 11L21 12L20 10L19 12L17 11Z" fill="#d4af37" />
          {/* SCANIA text */}
          <text x="44" y="27" fontFamily="Arial Black, Impact, sans-serif" fontWeight="900" fontSize="21" fill="#041e42" letterSpacing="1.5">
            SCANIA
          </text>
        </svg>
      ),
    },
    {
      id: "skf",
      name: "SKF",
      svg: (
        <svg viewBox="0 0 110 40" className="h-9 md:h-11 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="5" y="4" width="100" height="28" rx="3" fill="#005a9c" />
          <rect x="5" y="32" width="100" height="4" fill="#e31b23" />
          <text x="55" y="26" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="22" fill="#ffffff" textAnchor="middle" letterSpacing="2">
            SKF
          </text>
        </svg>
      ),
    },
    {
      id: "volvo",
      name: "Volvo",
      svg: (
        <svg viewBox="0 0 120 40" className="h-9 md:h-11 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Iron Mark Circle */}
          <circle cx="22" cy="20" r="16" stroke="#5a6872" strokeWidth="3" fill="#f8fafc" />
          <path d="M32 10L39 3M39 3H33M39 3V9" stroke="#5a6872" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="7" y="15" width="30" height="10" fill="#003057" rx="1" />
          <text x="22" y="23" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="7" fill="#ffffff" textAnchor="middle" letterSpacing="0.8">
            VOLVO
          </text>
          <text x="45" y="27" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="18" fill="#003057" letterSpacing="2">
            VOLVO
          </text>
        </svg>
      ),
    },
    {
      id: "vw",
      name: "Volkswagen",
      svg: (
        <svg viewBox="0 0 80 40" className="h-10 md:h-12 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="40" cy="20" r="18" fill="#001e50" stroke="#00438a" strokeWidth="2" />
          <circle cx="40" cy="20" r="15" stroke="#ffffff" strokeWidth="1.5" />
          <path d="M30 12L37 28L40 21L43 28L50 12" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M33 21L40 10L47 21" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      id: "asicha",
      name: "Asicha",
      svg: (
        <svg viewBox="0 0 130 40" className="h-9 md:h-11 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Spring Leaf Graphic */}
          <path d="M15 30C35 34 95 34 115 30" stroke="#8b1e41" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M25 34C45 37 85 37 105 34" stroke="#8b1e41" strokeWidth="2" strokeLinecap="round" />
          <text x="65" y="24" fontFamily="Impact, Arial Black, sans-serif" fontWeight="bold" fontSize="21" fill="#8b1e41" textAnchor="middle" letterSpacing="1.8">
            ASICHA
          </text>
        </svg>
      ),
    },
    {
      id: "fag",
      name: "FAG",
      svg: (
        <svg viewBox="0 0 110 40" className="h-9 md:h-11 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Bearing Gear Red */}
          <circle cx="20" cy="20" r="15" fill="#e30613" />
          <circle cx="20" cy="20" r="7" fill="#ffffff" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
            const rad = (angle * Math.PI) / 180
            const x = 20 + 11 * Math.cos(rad)
            const y = 20 + 11 * Math.sin(rad)
            return <circle key={angle} cx={x} cy={y} r="2" fill="#ffffff" />
          })}
          <text x="44" y="27" fontFamily="Arial Black, Impact, sans-serif" fontWeight="900" fontSize="21" fill="#e30613" letterSpacing="1.5">
            FAG
          </text>
        </svg>
      ),
    },
    {
      id: "ford",
      name: "Ford",
      svg: (
        <svg viewBox="0 0 110 40" className="h-9 md:h-11 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="55" cy="20" rx="46" ry="17" fill="#002c6c" stroke="#ffffff" strokeWidth="2" />
          <ellipse cx="55" cy="20" rx="44" ry="15" stroke="#ffffff" strokeWidth="1" />
          <text x="55" y="27" fontFamily="Brush Script MT, cursive, sans-serif" fontStyle="italic" fontWeight="bold" fontSize="24" fill="#ffffff" textAnchor="middle">
            Ford
          </text>
        </svg>
      ),
    },
    {
      id: "frasle",
      name: "Fras-le",
      svg: (
        <svg viewBox="0 0 130 40" className="h-9 md:h-11 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="10" y="24" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="18" fill="#002855" letterSpacing="1">
            FRAS-LE
          </text>
          {/* Slanted red stripes */}
          <g transform="translate(10, 26)">
            <rect x="0" y="0" width="8" height="5" transform="skewX(-30)" fill="#e30613" />
            <rect x="12" y="0" width="8" height="5" transform="skewX(-30)" fill="#e30613" />
            <rect x="24" y="0" width="8" height="5" transform="skewX(-30)" fill="#e30613" />
            <rect x="36" y="0" width="8" height="5" transform="skewX(-30)" fill="#e30613" />
            <rect x="48" y="0" width="8" height="5" transform="skewX(-30)" fill="#e30613" />
            <rect x="60" y="0" width="8" height="5" transform="skewX(-30)" fill="#e30613" />
            <rect x="72" y="0" width="8" height="5" transform="skewX(-30)" fill="#e30613" />
          </g>
        </svg>
      ),
    },
    {
      id: "mercedes",
      name: "Mercedes-Benz",
      svg: (
        <svg viewBox="0 0 150 40" className="h-9 md:h-11 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="16" stroke="#1e293b" strokeWidth="2.2" fill="none" />
          <path d="M20 4L20 20L8 28L20 20L32 28Z" fill="#1e293b" />
          <text x="44" y="25" fontFamily="Cinzel, Times New Roman, serif" fontWeight="bold" fontSize="13" fill="#0f172a" letterSpacing="1.2">
            MERCEDES-BENZ
          </text>
        </svg>
      ),
    },
    {
      id: "iveco",
      name: "Iveco",
      svg: (
        <svg viewBox="0 0 110 40" className="h-9 md:h-11 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="55" y="27" fontFamily="Arial Black, Impact, sans-serif" fontWeight="900" fontSize="22" fill="#003865" textAnchor="middle" letterSpacing="2">
            IVECO
          </text>
        </svg>
      ),
    },
    {
      id: "corven",
      name: "Corven",
      svg: (
        <svg viewBox="0 0 120 40" className="h-9 md:h-11 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="60" y="26" fontFamily="Arial Black, Impact, sans-serif" fontWeight="900" fontSize="20" fill="#d32f2f" textAnchor="middle" letterSpacing="1.5">
            CORVEN
          </text>
          <text x="60" y="36" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="7" fill="#64748b" textAnchor="middle" letterSpacing="2">
            AUTOPARTES
          </text>
        </svg>
      ),
    },
    {
      id: "randon",
      name: "Randon",
      svg: (
        <svg viewBox="0 0 120 40" className="h-9 md:h-11 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 12L22 4L30 12L22 20Z" fill="#0088cc" />
          <path d="M14 24L22 16L30 24L22 32Z" fill="#0a192f" />
          <text x="40" y="26" fontFamily="Arial Black, Impact, sans-serif" fontWeight="900" fontSize="19" fill="#0a192f" letterSpacing="1.5">
            RANDON
          </text>
        </svg>
      ),
    },
  ]

  const fromGrad = gradientColor === "gray" ? "from-slate-100" : "from-white"

  return (
    <div className={`relative w-full overflow-hidden py-8 md:py-10 ${bgClassName}`}>
      {/* Degradados en los bordes opcionales */}
      {showGradients && (
        <>
          <div className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r ${fromGrad} to-transparent md:w-32`} />
          <div className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l ${fromGrad} to-transparent md:w-32`} />
        </>
      )}

      {/* Marquee continuo ininterrumpido */}
      <div className="relative w-full overflow-hidden">
        <div className="animate-marquee flex items-center gap-14 sm:gap-16 md:gap-20">
          {[...logos, ...logos].map((logo, idx) => (
            <div
              key={`${logo.id}-${idx}`}
              className="flex shrink-0 items-center justify-center transition-transform duration-300 hover:scale-125"
              title={logo.name}
            >
              {logo.svg}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

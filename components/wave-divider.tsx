import React from "react"

const COLOR_MAP: Record<string, string> = {
  white: "#ffffff",
  gray: "#f1f5f9",
  navy: "#0f2947",
  dark: "#0a192f",
  brand: "#0088cc",
}

interface WaveDividerProps {
  fill?: "white" | "gray" | "navy" | "dark" | "brand"
  bgColor?: "white" | "gray" | "navy" | "dark" | "brand"
  flip?: boolean
  className?: string
  heightClass?: string
}

export function WaveDivider({
  fill = "gray",
  bgColor = "white",
  flip = false,
  className = "",
  heightClass = "h-8 sm:h-12 md:h-16",
}: WaveDividerProps) {
  const fillColor = COLOR_MAP[fill] || "#f1f5f9"
  const bg = COLOR_MAP[bgColor] || "#ffffff"

  return (
    <div
      className={`relative w-full overflow-hidden leading-none select-none ${className}`}
      style={{ backgroundColor: bg }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className={`relative block w-full ${heightClass} ${flip ? "rotate-180" : ""}`}
      >
        <path
          d="M0,32 C240,65 480,10 720,40 C960,70 1200,20 1440,45 L1440,80 L0,80 Z"
          fill={fillColor}
        />
      </svg>
    </div>
  )
}

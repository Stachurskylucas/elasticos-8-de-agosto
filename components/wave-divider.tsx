export function WaveDivider({
  className = "",
  flip = false,
  fillColor = "#f4f5f7",
}: {
  className?: string
  flip?: boolean
  fillColor?: string
}) {
  return (
    <div className={`w-full overflow-hidden leading-none ${className}`}>
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className={`relative block h-10 w-full md:h-14 ${flip ? "rotate-180" : ""}`}
      >
        <path
          d="M0,0 C150,90 350,-40 500,40 C650,120 900,20 1200,60 L1200,120 L0,120 Z"
          fill={fillColor}
        />
      </svg>
    </div>
  )
}

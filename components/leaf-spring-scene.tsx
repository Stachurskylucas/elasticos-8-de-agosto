import type { CSSProperties } from "react"

/**
 * Paquete de elástico dibujado con CSS 3D real (sin librerías ni imágenes).
 * Cada hoja es una cinta de segmentos orientados sobre la curva de la flecha.
 * El despiece y el giro los maneja el CSS con las variables --p y --e
 * (ver ".ls" en globals.css); este componente solo arma la geometría.
 */

const W = 64 // ancho de la hoja (profundidad)
const T = 11 // espesor
const PITCH = 12 // separación entre hojas armadas
const CAMBER = 78 // flecha
const SEG = 22 // largo aproximado de cada segmento
const HALF = [330, 300, 250, 200, 150, 105, 65] // medio largo de cada hoja
const STACK = HALF.length * PITCH

const curveY = (x: number) => -CAMBER * (x / HALF[0]) ** 2
const deg = (rad: number) => (rad * 180) / Math.PI
const r2 = (n: number) => Math.round(n * 100) / 100

function box(w: number, h: number, transform: string, extra?: CSSProperties): CSSProperties {
  return { width: r2(w), height: r2(h), transform, ...extra }
}

function Leaf({ index, half }: { index: number; half: number }) {
  const n = Math.ceil((half * 2) / SEG)
  const dx = (half * 2) / n
  const faces = []

  for (let k = 0; k < n; k++) {
    const x0 = -half + k * dx
    const x1 = x0 + dx
    const y0 = curveY(x0) + index * PITCH
    const y1 = curveY(x1) + index * PITCH
    const len = Math.hypot(dx, y1 - y0) + 0.7
    const ang = r2(deg(Math.atan2(y1 - y0, dx)))
    const light = Math.round(Math.min(24, Math.max(0, 7 - ang * 0.6)))
    const at = `${r2(x0)}px,${r2(y0)}px`

    faces.push(
      <i
        key={`t${k}`}
        className="ls-t"
        style={{
          ...box(len, W, `translate3d(${at},${-W / 2}px) rotateZ(${ang}deg) rotateX(90deg)`),
          ["--l" as string]: light,
        }}
      />,
      <i
        key={`f${k}`}
        className="ls-f"
        style={box(len, T, `translate3d(${at},${W / 2}px) rotateZ(${ang}deg)`)}
      />,
    )
  }

  // Tapas en las puntas
  for (const side of [-1, 1]) {
    const x = side * half
    const y = curveY(x) + index * PITCH
    const ang = r2(deg(Math.atan(((-2 * CAMBER) / HALF[0] ** 2) * x)))
    faces.push(
      <i
        key={`c${side}`}
        className="ls-c"
        style={box(W, T, `translate3d(${x}px,${r2(y)}px,${W / 2}px) rotateZ(${ang}deg) rotateY(90deg)`)}
      />,
    )
  }

  return (
    <div className="ls-g ls-leaf" data-i={index} style={{ ["--i" as string]: index }}>
      {faces}
      {index === 0 && <Eyes />}
    </div>
  )
}

/** Ojos de la hoja maestra, con sus bujes */
function Eyes() {
  const R = 18
  const RB = 11
  const slices = Array.from({ length: 9 }, (_, k) => -W / 2 + k * (W / 8))

  return (
    <>
      {[-1, 1].map((side) => {
        const cx = side * (HALF[0] + 5)
        const cy = curveY(HALF[0]) - R + T - 1
        return (
          <div key={side} className="ls-g">
            {slices.map((z, k) => (
              <i
                key={z}
                className={`ls-ring ${k === slices.length - 1 ? "ls-ring-front" : ""}`}
                style={box(R * 2, R * 2, `translate3d(${cx - R}px,${r2(cy - R)}px,${z}px)`)}
              />
            ))}
            <div className="ls-g ls-bush">
              {slices.map((z, k) => (
                <i
                  key={z}
                  className={`ls-rubber ${k === slices.length - 1 ? "ls-rubber-front" : ""}`}
                  style={box(RB * 2, RB * 2, `translate3d(${cx - RB}px,${r2(cy - RB)}px,${z + 3}px)`)}
                />
              ))}
            </div>
          </div>
        )
      })}
    </>
  )
}

function CenterBolt() {
  const top = -12
  const h = STACK + 30
  return (
    <div className="ls-g ls-bolt">
      <i className="ls-f" style={box(8, h, `translate3d(-4px,${top}px,0px)`)} />
      <i className="ls-c" style={box(8, h, `translate3d(0px,${top}px,4px) rotateY(90deg)`)} />
      <i className="ls-f" style={box(18, 9, `translate3d(-9px,${top - 9}px,9px)`)} />
      <i className="ls-c" style={box(18, 9, `translate3d(9px,${top - 9}px,9px) rotateY(90deg)`)} />
      <i className="ls-t" style={box(18, 18, `translate3d(-9px,${top - 9}px,-9px) rotateX(90deg)`)} />
    </div>
  )
}

function UBolts() {
  const wu = W + 18
  const hu = STACK + 46
  return (
    <div className="ls-g ls-ubolt">
      {[-58, -52, 52, 58].map((x) => (
        <i
          key={x}
          className="ls-u"
          style={box(wu, hu, `translate3d(${x}px,-16px,${wu / 2}px) rotateY(90deg)`)}
        />
      ))}
      {/* Patas vistas de frente, para que la grampa no desaparezca de canto */}
      {[-55, 55].flatMap((x) =>
        [-wu / 2 + 3, wu / 2 - 3].map((z) => (
          <i
            key={`${x}${z}`}
            className="ls-f"
            style={box(7, hu - 14, `translate3d(${x - 3.5}px,-2px,${z}px)`)}
          />
        )),
      )}
    </div>
  )
}

function SeatPlate() {
  const hw = 84
  const d = W + 18
  const y = STACK + 2
  return (
    <div className="ls-g ls-plate">
      <i className="ls-t" style={box(hw * 2, d, `translate3d(${-hw}px,${y}px,${-d / 2}px) rotateX(90deg)`)} />
      <i className="ls-f" style={box(hw * 2, 9, `translate3d(${-hw}px,${y}px,${d / 2}px)`)} />
      <i className="ls-c" style={box(d, 9, `translate3d(${hw}px,${y}px,${d / 2}px) rotateY(90deg)`)} />
      <i className="ls-c" style={box(d, 9, `translate3d(${-hw}px,${y}px,${d / 2}px) rotateY(90deg)`)} />
    </div>
  )
}

export function LeafSpringScene() {
  return (
    <div className="ls-stage" aria-hidden="true">
      <div className="ls-scale">
        <div className="ls">
          <i
            className="ls-shadow"
            style={box(900, 340, `translate3d(-450px,${STACK + 150}px,-170px) rotateX(90deg)`)}
          />
          <SeatPlate />
          {HALF.map((half, index) => (
            <Leaf key={half} index={index} half={half} />
          )).reverse()}
          <CenterBolt />
          <UBolts />
        </div>
      </div>
    </div>
  )
}

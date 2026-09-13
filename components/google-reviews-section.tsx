import { ExternalLink, Star } from "lucide-react"
import { MAPS_URL } from "@/lib/site"

interface Review {
  id: string
  text: string
  author: string
  stars: number
  opinions: string
}

const REVIEWS: Review[] = [
  {
    id: "pablo",
    text: "Es muy bueno y te buscan la solución para que te vayas con tu vehículo andando y bien. Son muy buenos con su trabajo, soy cliente de muchos años, se los recomiendo a todos, vale la pena ir, posta te vas contento. Lo que no te puede hacer otro mecánico él te lo hace. Son muy responsibles con su trabajo y cuidan al cliente porque saben que tienen que salir a trabajar con su unidad o vehículo.",
    author: "PABLO MAROTTA",
    stars: 5,
    opinions: "4 opiniones",
  },
  {
    id: "ramiro",
    text: "Súper serios y confiables. Te cantan la justa y te solucionan cualquier problema en el día. ¡Cristian y los chicos súper recomendables!",
    author: "RAMIRO GARCIA",
    stars: 5,
    opinions: "42 opiniones",
  },
  {
    id: "martin",
    text: "Son los mejores, te hacen los arreglos super rápido y con materiales de primera.",
    author: "MARTIN ALI",
    stars: 5,
    opinions: "81 opiniones",
  },
  {
    id: "sergio",
    text: "Concurrí a reparar un motorhome. Encontré profesionalismo, eficiencia, inmejorable precio, trabajo excelente en tiempo récord. Super recomendable.",
    author: "SERGIO OSCAR SARAVIA",
    stars: 5,
    opinions: "46 opiniones",
  },
  {
    id: "leo",
    text: "Trabajan a conciencia y cumplen con los tiempos. Los recomiendo. Muy buenos en lo que hacen.",
    author: "LEO LÓPEZ",
    stars: 5,
    opinions: "53 opiniones",
  },
  {
    id: "carlos",
    text: "Unos genios, rápidos y muy buenos precios.",
    author: "CARLOS RAMUNDO",
    stars: 5,
    opinions: "50 opiniones",
  },
  {
    id: "damian",
    text: "Cristian y los muchachos Nº 1, abrazo de la gente de Argecam.",
    author: "DAMIAN LEONEL LOPEZ",
    stars: 5,
    opinions: "121 opiniones",
  },
]

export function GoogleReviewsSection() {
  return (
    <section className="bg-[#f0f2f5] py-20 md:py-24 border-t border-slate-300">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {/* Encabezado Principal */}
        <div className="mb-12 flex flex-col items-start justify-between gap-6 border-b border-slate-300 pb-8 md:flex-row md:items-end">
          <div>
            <h2 className="font-display text-4xl font-bold tracking-tight text-dark md:text-6xl">
              LO QUE <span className="text-brand">DICEN</span>
            </h2>
          </div>

          {/* Calificación 4.6 Google */}
          <div className="flex items-center gap-6">
            <div className="text-left md:text-right">
              <div className="flex items-center gap-3">
                <span className="font-display text-5xl font-bold leading-none text-dark md:text-6xl">
                  4.6
                </span>
                <div className="flex flex-col items-start">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mt-1">
                    50 opiniones en Google
                  </span>
                </div>
              </div>
            </div>

            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-1.5 border-b border-dark pb-0.5 text-xs font-bold tracking-widest text-dark uppercase transition-all hover:border-brand hover:text-brand sm:inline-flex"
            >
              <span>VER EN GOOGLE</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* Lista de Reseñas Reales */}
        <div className="divide-y divide-slate-300/80">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="py-7 transition-colors hover:bg-white/40 md:py-8"
            >
              <div className="grid gap-4 md:grid-cols-12 md:items-start md:gap-8">
                {/* Texto de la Reseña */}
                <div className="md:col-span-8 lg:col-span-9">
                  <p className="font-display text-base font-semibold leading-relaxed text-slate-900 md:text-lg">
                    “{review.text}”
                  </p>
                </div>

                {/* Calificación y Autor */}
                <div className="flex flex-row items-center justify-between gap-2 md:col-span-4 md:flex-col md:items-end md:justify-start lg:col-span-3">
                  <div className="flex text-amber-500">
                    {[...Array(review.stars)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <div className="text-right">
                    <span className="block text-xs font-bold tracking-widest text-dark uppercase">
                      {review.author}
                    </span>
                    <span className="block text-[11px] font-medium text-slate-500 mt-0.5">
                      {review.opinions}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Botón inferior Ver más en Google */}
        <div className="mt-12 text-center">
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border-b-2 border-dark pb-1 text-xs font-bold tracking-widest text-dark uppercase transition-all hover:border-brand hover:text-brand"
          >
            <span>VER MÁS RESEÑAS EN GOOGLE MAPS</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </section>
  )
}

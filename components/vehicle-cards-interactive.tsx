import Image from "next/image"

interface VehicleGroup {
  id: string
  title: string
  tag: string
  description: string
  detail: string
  images: {
    src: string
    alt: string
    caption: string
  }[]
}

const VEHICLES: VehicleGroup[] = [
  {
    id: "pesados",
    title: "Camiones pesados",
    tag: "6X4 · 8X4",
    description:
      "Mercedes-Benz (Axor, Actros, Atego, 1634), Scania (R, P, G), Volvo (FH, FM, VM), Iveco (Stralis, Trakker), Ford Cargo y VW Constellation.",
    detail: "Eje delantero, trasero, tándem, nivelación y refuerzos",
    images: [
      {
        src: "/images/camiones-6x4-8x4.webp",
        alt: "Camiones volcadores 6x4 y 8x4 en taller",
        caption: "Volcadores y chasis 6x4 / 8x4",
      },
      {
        src: "/images/banner-ruta.webp",
        alt: "Flota de camiones pesados en ruta",
        caption: "Camiones de larga distancia",
      },
      {
        src: "/images/taller-interior.webp",
        alt: "Fosas especializadas para camiones pesados",
        caption: "Fosas para ejes tándem",
      },
    ],
  },
  {
    id: "utilitarios",
    title: "Utilitarios y camionetas",
    tag: "VANS · UTILITARIOS · PICK-UPS",
    description:
      "Mercedes-Benz Sprinter, Iveco Daily, Toyota Hilux, Ford Ranger, Volkswagen Amarok y Renault Master.",
    detail: "Refuerzos para los que andan siempre cargados, como los de reparto",
    images: [
      {
        src: "/images/utilitarios-vans.webp",
        alt: "Mercedes Sprinter y Toyota Hilux en taller",
        caption: "Sprinter y Hilux",
      },
      {
        src: "/images/detalle-elastico.webp",
        alt: "Paquete de elásticos y armado para utilitarios",
        caption: "Hojas de recambio y refuerzos",
      },
      {
        src: "/images/prod-bujes.webp",
        alt: "Bujes y silentblocks reforzados",
        caption: "Bujes y amortiguadores",
      },
    ],
  },
  {
    id: "semirremolques",
    title: "Semirremolques y bateas",
    tag: "ARRASTRE · 2 Y 3 EJES",
    description:
      "Randon, Helvetica, Montenegro, Cormetal, Maldonado, Guerra, Lambert y bateas volcadoras.",
    detail: "Balancines, bujes y suspensión de 2 y 3 ejes",
    images: [
      {
        src: "/images/semirremolques-bateas.webp",
        alt: "Bateas y tolvas graneleras en taller",
        caption: "Bateas volcadoras y tolvas",
      },
      {
        src: "/images/taller-interior.webp",
        alt: "Mantenimiento de ejes de arrastre",
        caption: "Ejes balancines y suspensión",
      },
      {
        src: "/images/hero-taller.webp",
        alt: "Curvado y forja de hojas pesadas",
        caption: "Curvado en caliente",
      },
    ],
  },
]

function VehicleCard({ vehicle }: { vehicle: VehicleGroup }) {
  const mainImage = vehicle.images[0]

  return (
    <div className="reveal flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:border-brand/40 hover:shadow-lg">
      {/* Contenedor con una sola foto limpia */}
      <div className="group relative aspect-[16/11] w-full overflow-hidden bg-slate-900 sm:aspect-[4/3] lg:aspect-[16/11]">
        <Image
          src={mainImage.src}
          alt={mainImage.alt}
          fill
          sizes="(max-width: 1024px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      {/* Contenido de la Tarjeta */}
      <div className="flex flex-1 flex-col justify-between p-6 md:p-7">
        <div>
          <h3 className="font-display text-xl font-bold text-dark md:text-2xl">{vehicle.title}</h3>
          <p className="mt-2.5 text-sm leading-relaxed text-slate-600">{vehicle.description}</p>
        </div>
      </div>
    </div>
  )
}

export function VehicleCardsInteractive() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-2 md:mb-4">
      {VEHICLES.map((vehicle) => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} />
      ))}
    </div>
  )
}

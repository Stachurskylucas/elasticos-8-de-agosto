import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/site"

const RUTAS: { path: string; priority: number; changeFrequency: "weekly" | "monthly" }[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/productos", priority: 0.9, changeFrequency: "weekly" },
  { path: "/servicios", priority: 0.8, changeFrequency: "monthly" },
  { path: "/nosotros", priority: 0.6, changeFrequency: "monthly" },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return RUTAS.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }))
}

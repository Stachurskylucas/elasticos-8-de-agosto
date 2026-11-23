import type { Metadata } from "next"

// El panel no tiene que aparecer en buscadores.
export const metadata: Metadata = {
  title: "Panel de administración",
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children
}

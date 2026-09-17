# Directrices y Reglas del Proyecto — Elásticos 8 de Agosto

Este archivo contiene las reglas y estándares de desarrollo para el proyecto de Elásticos 8 de Agosto.

---

## 1. Stack Tecnológico y Arquitectura
- **Framework**: Next.js 16 (App Router) con Turbopack y React 19.
- **Estilos**: Tailwind CSS v4 con variables CSS y tema oscuro automotriz (slate oscuro con acentos en azul eléctrico #1d63ff / #2563eb).
- **Base de Datos**: Supabase PostgreSQL con RLS (Row Level Security) y fallback a almacenamiento local en desarrollo.
- **Pasarela de Pagos**: Mercado Pago Checkout Pro & Webhooks IPN.
- **Iconos**: Lucide React.

---

## 2. Convenciones de Código
- **Tipado**: 100% TypeScript estricto.
- **Componentes**:
  - Preferir Server Components por defecto.
  - Usar "use client" solo en componentes interactivos (formularios, sliders, carrito, modales, admin).
- **Rutas de API (`app/api/`)**:
  - Exportar siempre `export const dynamic = "force-dynamic"` en endpoints que interactúan con base de datos o pagos.
  - Retornar respuestas JSON estandarizadas con códigos HTTP apropiados.

---

## 3. Base de Datos y Supabase
- El esquema oficial está en `supabase/schema.sql`.
- Tablas: `products`, `categories`, `brands`, `orders`.
- Al realizar cambios de columnas o tablas, actualizar tanto `supabase/schema.sql` como `lib/db/`.

---

## 4. UI/UX y Diseño
- Mantener la estética industrial automotriz: fondos oscuros `bg-slate-950`, tarjetas `bg-slate-900/60`, bordes finos `border-white/10`.
- Botones con transiciones suaves, tipografía clara y optimización responsive para dispositivos móviles.

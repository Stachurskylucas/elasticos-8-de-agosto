---
name: catalog-manager
description: Operaciones sobre el catálogo de repuestos, cálculo de márgenes, cuotas sin interés, descuentos y aumentos masivos de precios.
---

# Catalog Manager Skill

Esta skill describe las reglas de negocio para la gestión de productos, precios y stock en Elásticos 8 de Agosto.

## Reglas de Precios y Márgenes

- **Costo & Margen**: `price = Math.round(costo * (1 + margen))` (Margen estándar: 40%).
- **Precio Manual**: Si se define `precio_manual`, este prevalece sobre el costo + margen.
- **Descuento**: `finalPrice = Math.round(price * (1 - descuento / 100))`.
- **Cuotas**: `cuotas_cant` (default 3) y `cuotas_sin_interes` (boolean).
- **Aumento Masivo**:
  - Endpoint: `POST /api/admin/bulk-price-increase`
  - Body: `{ percentage: number, categoryId?: string }`
  - Aplica factor porcentual a `costo` y `precio_manual` recalculando precios finales.

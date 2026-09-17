---
name: elasticos-db-sync
description: Guía y procedimientos para sincronizar repuestos, categorías, marcas y esquemas de base de datos con Supabase.
---

# Elasticos DB Sync Skill

Esta skill proporciona los comandos y flujos para administrar y sincronizar la base de datos de Supabase en Elásticos 8 de Agosto.

## Procedimiento de Sincronización

1. **Verificar variables de entorno**:
   - Comprobar que `NEXT_PUBLIC_SUPABASE_URL` y `SUPABASE_SERVICE_ROLE_KEY` estén definidas en `.env.local`.

2. **Ejecutar esquema SQL**:
   - En el panel de Supabase SQL Editor, ejecutar el contenido de `supabase/schema.sql`.

3. **Sembrado de productos (Seed)**:
   - Endpoint: `POST /api/admin/seed`
   - O bien desde el botón "Sincronizar Supabase" en el panel `/admin`.

4. **Verificación**:
   - Comprobar que las tablas `products`, `categories`, `brands` y `orders` respondan con estado 200 en `/api/products`.

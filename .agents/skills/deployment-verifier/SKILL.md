---
name: deployment-verifier
description: Procedimientos de validación, compilación local y verificación de despliegues en Vercel.
---

# Deployment Verifier Skill

Esta skill permite validar que el proyecto compile sin errores antes y después de realizar despliegues en Vercel.

## Checklist Pre-Despliegue

1. **Compilación local**:
   ```bash
   npm run build
   ```
   Verificar que todas las páginas estáticas y rutas dinámicas compilen con código de salida 0.

2. **Variables en Vercel**:
   Asegurar que en Vercel Dashboard -> Settings -> Environment Variables estén configuradas:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `ADMIN_PASSWORD`
   - `MERCADOPAGO_ACCESS_TOKEN`

3. **Configuración de Vercel**:
   - **Root Directory**: `./` (vacío)
   - **Framework Preset**: `Next.js`
   - **Node.js Version**: 18.x o 20.x

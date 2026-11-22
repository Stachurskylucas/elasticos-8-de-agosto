-- ============================================================
-- ESQUEMA DE BASE DE DATOS PARA ELÁSTICOS 8 DE AGOSTO (SUPABASE)
-- ============================================================
-- Podés copiar y pegar todo este script en el "SQL Editor" de tu proyecto de Supabase.

-- 1. Tabla de Categorías
CREATE TABLE IF NOT EXISTS public.categories (
    id TEXT PRIMARY KEY,
    label TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

INSERT INTO public.categories (id, label) VALUES
    ('elasticos', 'ELÁSTICOS'),
    ('fijacion', 'FIJACIÓN'),
    ('amortiguacion', 'AMORTIGUACIÓN')
ON CONFLICT (id) DO NOTHING;

-- 2. Tabla de Marcas
CREATE TABLE IF NOT EXISTS public.brands (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

INSERT INTO public.brands (id, name) VALUES
    ('mercedes-benz', 'Mercedes-Benz'),
    ('scania', 'Scania'),
    ('ford', 'Ford'),
    ('iveco', 'Iveco'),
    ('volvo', 'Volvo'),
    ('volkswagen', 'Volkswagen'),
    ('aesa', 'Aesa'),
    ('asicha', 'Asicha'),
    ('faesa', 'Faesa'),
    ('molas', 'Molas'),
    ('universal', 'Universal')
ON CONFLICT (id) DO NOTHING;

-- 3. Tabla de Productos con Precios Dinámicos, Descuentos y Cuotas
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY,
    sku TEXT,
    name TEXT NOT NULL,
    category TEXT NOT NULL REFERENCES public.categories(id) ON UPDATE CASCADE,
    brand TEXT DEFAULT 'Universal',
    description TEXT NOT NULL,
    image TEXT NOT NULL,
    in_stock BOOLEAN DEFAULT true NOT NULL,
    costo NUMERIC(12, 2) DEFAULT NULL,
    margen NUMERIC(5, 2) DEFAULT 0.40,
    precio_manual NUMERIC(12, 2) DEFAULT NULL,
    descuento NUMERIC(5, 2) DEFAULT 0,
    cuotas_cant INTEGER DEFAULT 3,
    cuotas_sin_interes BOOLEAN DEFAULT true,
    mostrar_precio BOOLEAN DEFAULT true NOT NULL,
    price NUMERIC(12, 2) DEFAULT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Si la tabla ya existía, asegurar columnas nuevas
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS sku TEXT;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS brand TEXT DEFAULT 'Universal';
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS costo NUMERIC(12, 2);
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS margen NUMERIC(5, 2) DEFAULT 0.40;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS precio_manual NUMERIC(12, 2);
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS descuento NUMERIC(5, 2) DEFAULT 0;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS cuotas_cant INTEGER DEFAULT 3;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS cuotas_sin_interes BOOLEAN DEFAULT true;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS mostrar_precio BOOLEAN DEFAULT true;

-- 4. Tabla de Órdenes y Ventas (Mercado Pago & Guest Checkout)
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    mercadopago_payment_id TEXT UNIQUE,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    dni_cuit TEXT,
    invoice_type TEXT DEFAULT 'B',
    business_name TEXT,
    shipping_type TEXT DEFAULT 'pickup',
    shipping_address TEXT,
    postal_code TEXT,
    city TEXT,
    province TEXT,
    shipping_cost NUMERIC(12, 2) DEFAULT 0,
    subtotal NUMERIC(12, 2),
    items JSONB NOT NULL,
    total NUMERIC(12, 2) NOT NULL,
    status TEXT DEFAULT 'pending' NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS dni_cuit TEXT;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS invoice_type TEXT DEFAULT 'B';
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS business_name TEXT;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS shipping_type TEXT DEFAULT 'pickup';
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS shipping_address TEXT;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS postal_code TEXT;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS city TEXT;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS province TEXT;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS shipping_cost NUMERIC(12, 2) DEFAULT 0;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS subtotal NUMERIC(12, 2);

-- Habilitar Row Level Security (RLS)
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- 5. Políticas de Seguridad (RLS)
CREATE POLICY "Permitir lectura publica de categorias" ON public.categories FOR SELECT TO public USING (true);
CREATE POLICY "Permitir modificacion de categorias" ON public.categories FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Permitir lectura publica de marcas" ON public.brands FOR SELECT TO public USING (true);
CREATE POLICY "Permitir modificacion de marcas" ON public.brands FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Permitir lectura publica de productos" ON public.products FOR SELECT TO public USING (true);
CREATE POLICY "Permitir modificacion de productos" ON public.products FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Permitir lectura publica de ordenes" ON public.orders FOR SELECT TO public USING (true);
CREATE POLICY "Permitir creacion y modificacion de ordenes" ON public.orders FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

-- 6. Función de Aumento Masivo Porcentual en Base de Datos
CREATE OR REPLACE FUNCTION public.bulk_increase_prices(
    p_category_id TEXT DEFAULT NULL,
    p_percentage NUMERIC DEFAULT 10
)
RETURNS INTEGER AS $$
DECLARE
    v_factor NUMERIC := 1 + (p_percentage / 100.0);
    v_updated INTEGER;
BEGIN
    IF p_category_id IS NULL OR p_category_id = '' OR p_category_id = 'todos' THEN
        UPDATE public.products
        SET costo = ROUND(costo * v_factor),
            precio_manual = CASE WHEN precio_manual IS NOT NULL THEN ROUND(precio_manual * v_factor) ELSE NULL END,
            price = ROUND(COALESCE(
                CASE WHEN precio_manual IS NOT NULL THEN ROUND(precio_manual * v_factor) ELSE NULL END,
                ROUND(costo * v_factor) * (1 + COALESCE(margen, 0.40))
            ) * (1 - COALESCE(descuento, 0) / 100.0)),
            updated_at = timezone('utc'::text, now())
        WHERE costo IS NOT NULL OR precio_manual IS NOT NULL;
    ELSE
        UPDATE public.products
        SET costo = ROUND(costo * v_factor),
            precio_manual = CASE WHEN precio_manual IS NOT NULL THEN ROUND(precio_manual * v_factor) ELSE NULL END,
            price = ROUND(COALESCE(
                CASE WHEN precio_manual IS NOT NULL THEN ROUND(precio_manual * v_factor) ELSE NULL END,
                ROUND(costo * v_factor) * (1 + COALESCE(margen, 0.40))
            ) * (1 - COALESCE(descuento, 0) / 100.0)),
            updated_at = timezone('utc'::text, now())
        WHERE category = p_category_id AND (costo IS NOT NULL OR precio_manual IS NOT NULL);
    END IF;

    GET DIAGNOSTICS v_updated = ROW_COUNT;
    RETURN v_updated;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 7. Sembrado inicial de los repuestos
INSERT INTO public.products (id, sku, name, category, brand, description, image, in_stock, costo, margen, precio_manual, descuento, cuotas_cant, cuotas_sin_interes, mostrar_precio, price) VALUES
    ('elasticos-completos', 'ELA-COM-001', 'ELÁSTICOS COMPLETOS', 'elasticos', 'Mercedes-Benz', 'Conjuntos armados listos para colocar. Delanteros y traseros para todas las marcas.', '/images/prod-elasticos.png', true, 185000, 0.40, null, 0, 3, true, true, 259000),
    ('hojas-recambio', 'HOJ-REC-002', 'HOJAS DE RECAMBIO', 'elasticos', 'Scania', 'Hojas principales, segunda vuelta y refuerzos sueltos. Stock inmediato.', '/images/prod-hojas.png', true, 41785, 0.40, null, 0, 3, true, true, 58500),
    ('bujes', 'BUJ-POL-003', 'BUJES DE GOMA Y POLIURETANO', 'fijacion', 'Universal', 'Fijación segura y silenciosa para gemelos y协议 extremos del elástico.', '/images/prod-bujes.png', true, 13500, 0.40, null, 0, 3, true, true, 18900),
    ('grampas', 'GRA-ABR-004', 'GRAMPAS Y ABRAZADERAS', 'fijacion', 'Ford', 'Grampas U, abrazaderas y placas de asiento para todo tipo de chasis.', '/images/prod-grampas.png', true, 24000, 0.40, null, 0, 3, true, true, 33600),
    ('pernos-grilletes', 'PER-GRI-005', 'PERNOS Y GRILLETES', 'fijacion', 'Iveco', 'Pernos centrales y grilletes delanteros y traseros para todo tipo de unidad.', '/images/prod-pernos.png', true, 32000, 0.40, null, 0, 3, true, true, 44800),
    ('amortiguadores', 'AMO-PES-006', 'AMORTIGUADORES', 'amortiguacion', 'Volvo', 'De gas y de aceite, para ejes delanteros y traseros de camiones y acoplados.', '/images/prod-amortiguadores.png', true, 89000, 0.40, null, 0, 3, true, true, 124600),
    ('tensores', 'TEN-SUS-007', 'TENSORES DE SUSPENSIÓN', 'amortiguacion', 'Volkswagen', 'Tensores originales y alternativos para recuperar firmeza y estabilidad.', '/images/prod-tensores.png', true, 72000, 0.40, null, 0, 3, true, true, 100800),
    ('placas-asiento', 'PLA-ASI-008', 'PLACAS DE ASIENTO', 'fijacion', 'Aesa', 'Placas de asiento reforzadas para distintos tipos de chasis y ejes.', '/images/prod-grampas.png', true, 38000, 0.40, null, 0, 3, true, true, 53200),
    ('kits-medida', 'KIT-MED-009', 'KITS DE SUSPENSIÓN A MEDIDA', 'elasticos', 'Mercedes-Benz', 'Paquetes armados a medida según el peso, uso y marca de la unidad.', '/images/prod-elasticos.png', true, 245000, 0.40, null, 0, 3, true, true, 343000)
ON CONFLICT (id) DO UPDATE SET
    sku = EXCLUDED.sku,
    name = EXCLUDED.name,
    category = EXCLUDED.category,
    brand = EXCLUDED.brand,
    description = EXCLUDED.description,
    image = EXCLUDED.image,
    in_stock = EXCLUDED.in_stock,
    costo = EXCLUDED.costo,
    margen = EXCLUDED.margen,
    precio_manual = EXCLUDED.precio_manual,
    descuento = EXCLUDED.descuento,
    cuotas_cant = EXCLUDED.cuotas_cant,
    cuotas_sin_interes = EXCLUDED.cuotas_sin_interes,
    mostrar_precio = EXCLUDED.mostrar_precio,
    price = EXCLUDED.price,
    updated_at = timezone('utc'::text, now());

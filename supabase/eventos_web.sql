-- Estadísticas propias de la web (sin cookies ni datos personales).
-- Las escribe /api/evento y las lee /api/estadisticas (la app de Facturación del taller).
-- Correr una vez en Supabase: SQL Editor > New query > pegar y Run.

create table if not exists public.eventos_web (
  id          bigint generated always as identity primary key,
  creado      timestamptz not null default now(),
  tipo        text not null,          -- visita | whatsapp | telefono | email | mapa | formulario | ver_producto | busqueda
  ruta        text,                   -- /productos, /servicios...
  fuente      text,                   -- Google, Instagram, Facebook, Directo, otra web...
  dispositivo text,                   -- celular | compu | tablet
  visitante   text,                   -- hash diario anónimo (cambia cada día, no identifica a nadie)
  dato        text,                   -- producto consultado o texto buscado
  resultados  integer                 -- en búsquedas: cuántos productos encontró
);

create index if not exists eventos_web_creado_idx on public.eventos_web (creado desc);

-- Nadie lee ni escribe desde el navegador: solo el servidor con la service role key.
alter table public.eventos_web enable row level security;

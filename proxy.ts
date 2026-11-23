import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { COOKIE_ADMIN, sesionValida } from '@/lib/admin-session'

// Next.js 16: "middleware" pasó a llamarse "proxy" (misma funcionalidad, runtime Node por defecto).
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    // La cookie tiene que estar firmada con ADMIN_SESSION_SECRET y sin vencer: no alcanza con que exista.
    if (!(await sesionValida(request.cookies.get(COOKIE_ADMIN)?.value))) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}

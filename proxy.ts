import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Proteger rutas de admin
  if (pathname.startsWith('/admin')) {
    const sessionToken = request.cookies.get('session-token')?.value

    if (!sessionToken) {
      // Redirigir a login si no hay token de sesión
      const loginUrl = new URL('/user/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }

    // Validar token con Supabase
    try {
      const supabase = createServerSupabaseClient()
      const { data: session, error } = await supabase
        .from('sessions')
        .select(`
          *,
          user:users(*)
        `)
        .eq('token', sessionToken)
        .gt('expires_at', new Date().toISOString())
        .single()

      if (error || !session || !session.user) {
        // Token inválido o expirado, redirigir a login
        const loginUrl = new URL('/user/login', request.url)
        loginUrl.searchParams.set('redirect', pathname)
        return NextResponse.redirect(loginUrl)
      }

      // Verificar que el usuario esté activo
      const user = session.user as any
      if (!user.is_active) {
        const loginUrl = new URL('/user/login', request.url)
        loginUrl.searchParams.set('redirect', pathname)
        return NextResponse.redirect(loginUrl)
      }

    } catch (error) {
      console.error('Error validating session:', error)
      const loginUrl = new URL('/user/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  // Redirigir usuarios autenticados lejos de páginas de auth
  if (pathname.startsWith('/user/login') || 
      pathname.startsWith('/user/register') ||
      pathname.startsWith('/user/forgot-password')) {
    const sessionToken = request.cookies.get('session-token')?.value

    if (sessionToken) {
      // Verificar si la sesión es válida
      try {
        const supabase = createServerSupabaseClient()
        const { data: session, error } = await supabase
          .from('sessions')
          .select('*')
          .eq('token', sessionToken)
          .gt('expires_at', new Date().toISOString())
          .single()

        if (!error && session) {
          // Si ya está autenticado, redirigir a admin
          return NextResponse.redirect(new URL('/admin/blog', request.url))
        }
      } catch (error) {
        // Si hay error, continuar al login/register
        console.error('Error checking session:', error)
      }
    }
  }

  // Permitir acceso a reset-password sin redirección (necesita el token en la URL)
  if (pathname.startsWith('/user/reset-password')) {
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/user/login',
    '/user/register',
    '/user/forgot-password',
    '/user/reset-password'
  ]
} 
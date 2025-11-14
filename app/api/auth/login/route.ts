import { NextRequest, NextResponse } from 'next/server'
import { LoginCredentials, AuthResponse } from '@/types/auth'
import { createSession, findUserByEmail, comparePassword, updateLastLogin } from '@/lib/auth'
import { LockKeyhole } from 'lucide-react';
import { log } from 'console';

export async function POST(request: NextRequest) {
  try {
    const body: LoginCredentials = await request.json()

    const { email, password } = body

    // Validación básica
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email y contraseña son requeridos' },
        { status: 400 }
      )
    }

    // Buscar usuario en Supabase
    const user = await findUserByEmail(email)
    if (!user || !user.is_active) {
      return NextResponse.json(
        { success: false, message: 'Credenciales inválidas' },
        { status: 401 }
      )
    }

    // Verificar contraseña
    const isValidPassword = await comparePassword(password, user.password)
    console.log('isValidPassword', isValidPassword);
    if (!isValidPassword) {
      return NextResponse.json(
        { success: false, message: 'Credenciales inválidas' },
        { status: 401 }
      )
    }

    // Actualizar último login
    await updateLastLogin(user.id)

    // Crear sesión
    const sessionToken = await createSession(user.id)

    const response: AuthResponse = {
      success: true,
      message: 'Login exitoso',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      },
      token: sessionToken
    }

    return NextResponse.json(response)

  } catch (error) {
    console.error('Error en login:', error)
    return NextResponse.json(
      { success: false, message: 'Error interno del servidor' },
      { status: 500 }
    )
  }
} 
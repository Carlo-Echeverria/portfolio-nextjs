import { NextRequest, NextResponse } from 'next/server'
import { RegisterCredentials, AuthResponse } from '@/types/auth'
import { createSession, findUserByEmail, createUser } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const body: RegisterCredentials = await request.json()
    const { email, password, name } = body

    // Validación básica
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email y contraseña son requeridos' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, message: 'La contraseña debe tener al menos 6 caracteres' },
        { status: 400 }
      )
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Formato de email inválido' },
        { status: 400 }
      )
    }

    // Verificar si el usuario ya existe
    const existingUser = await findUserByEmail(email)

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'El usuario ya existe' },
        { status: 409 }
      )
    }

    // Crear usuario
    const user = await createUser(email, password, name)

    // Crear sesión
    const sessionToken = await createSession(user.id)

    const response: AuthResponse = {
      success: true,
      message: 'Usuario registrado exitosamente',
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
    console.error('Error en registro:', error)
    return NextResponse.json(
      { success: false, message: 'Error interno del servidor' },
      { status: 500 }
    )
  }
} 
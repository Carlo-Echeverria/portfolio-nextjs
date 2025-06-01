import { NextRequest, NextResponse } from 'next/server'
import { logout } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    await logout()
    
    return NextResponse.json({
      success: true,
      message: 'Logout exitoso'
    })
  } catch (error) {
    console.error('Error en logout:', error)
    return NextResponse.json(
      { success: false, message: 'Error interno del servidor' },
      { status: 500 }
    )
  }
} 
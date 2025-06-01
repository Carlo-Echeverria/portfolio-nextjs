import { NextRequest, NextResponse } from 'next/server'
import { PasswordResetConfirm, AuthResponse } from '@/types/auth'
import { hashPassword, createSession } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body: PasswordResetConfirm = await request.json()
    const { token, newPassword } = body

    // Validación básica
    if (!token || !newPassword) {
      return NextResponse.json(
        { success: false, message: 'Token y nueva contraseña son requeridos' },
        { status: 400 }
      )
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { success: false, message: 'La contraseña debe tener al menos 6 caracteres' },
        { status: 400 }
      )
    }

    // Buscar token de reset válido
    const { data: resetRecord, error: resetError } = await supabaseAdmin
      .from('password_resets')
      .select(`
        *,
        user:users(*)
      `)
      .eq('token', token)
      .eq('used', false)
      .gt('expires_at', new Date().toISOString())
      .single()

    if (resetError || !resetRecord || !resetRecord.user) {
      return NextResponse.json(
        { success: false, message: 'Token inválido o expirado' },
        { status: 400 }
      )
    }

    const user = resetRecord.user as any

    // Verificar que el usuario esté activo
    if (!user.is_active) {
      return NextResponse.json(
        { success: false, message: 'Usuario inactivo' },
        { status: 400 }
      )
    }

    // Hashear nueva contraseña
    const hashedPassword = await hashPassword(newPassword)

    // Actualizar contraseña del usuario
    const { error: updateError } = await supabaseAdmin
      .from('users')
      .update({ 
        password: hashedPassword,
        updated_at: new Date().toISOString()
      })
      .eq('id', user.id)

    if (updateError) {
      throw new Error('Error updating password: ' + updateError.message)
    }

    // Marcar token como usado
    await supabaseAdmin
      .from('password_resets')
      .update({ used: true })
      .eq('id', resetRecord.id)

    // Invalidar todas las sesiones existentes del usuario
    await supabaseAdmin
      .from('sessions')
      .delete()
      .eq('user_id', user.id)

    // Crear nueva sesión automáticamente
    const sessionToken = await createSession(user.id)

    const response: AuthResponse = {
      success: true,
      message: 'Contraseña actualizada exitosamente',
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
    console.error('Error en reset password:', error)
    return NextResponse.json(
      { success: false, message: 'Error interno del servidor' },
      { status: 500 }
    )
  }
} 
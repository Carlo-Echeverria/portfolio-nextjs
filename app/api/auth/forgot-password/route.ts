import { NextRequest, NextResponse } from 'next/server'
import { PasswordResetRequest, AuthResponse } from '@/types/auth'
import { findUserByEmail, generateResetToken } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/supabase'
import { Resend } from 'resend'
import { generatePasswordResetEmail } from '@/lib/email-templates'

export async function POST(request: NextRequest) {
  try {
    const body: PasswordResetRequest = await request.json()
    const { email } = body

    // Validación básica
    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email es requerido' },
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

    // Buscar usuario
    const user = await findUserByEmail(email)

    // Por seguridad, siempre respondemos exitosamente aunque el usuario no exista
    if (!user || !user.is_active) {
      return NextResponse.json({
        success: true,
        message: 'Si el email existe, recibirás un enlace de recuperación'
      })
    }

    // Generar token de reset
    const resetToken = generateResetToken()
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000) // 1 hora

    // Invalidar tokens anteriores del usuario
    await supabaseAdmin
      .from('password_resets')
      .update({ used: true })
      .eq('user_id', user.id)
      .eq('used', false)

    // Crear nuevo token de reset
    const { error } = await supabaseAdmin
      .from('password_resets')
      .insert({
        user_id: user.id,
        token: resetToken,
        expires_at: expiresAt.toISOString(),
        used: false
      })

    if (error) {
      throw new Error('Error creating reset token: ' + error.message)
    }

    // Enviar email de recuperación
    try {
      const resendApiKey = process.env.RESEND_API_KEY;
      if (!resendApiKey) {
        console.error('RESEND_API_KEY no está configurada');
        // Loguear para desarrollo pero no fallar
        console.log('🔑 Reset token para', email, ':', resetToken)
        console.log('🔗 URL de reset: /user/reset-password?token=' + resetToken)
      } else {
        const resend = new Resend(resendApiKey);
        const fromEmail = process.env.FROM_EMAIL || 'noreply@tudominio.com';
        
        // Construir URL de reset
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                       process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 
                       'http://localhost:3000';
        const resetUrl = `${baseUrl}/user/reset-password?token=${resetToken}`;
        
        // Formatear fecha de expiración
        const expirationTime = expiresAt.toLocaleString('es-ES', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'America/Santiago'
        });

        // Generar email HTML
        const emailHtml = generatePasswordResetEmail({
          name: user.name || 'Usuario',
          resetUrl,
          expirationTime
        });

        // Enviar email
        const emailResult = await resend.emails.send({
          from: fromEmail,
          to: email,
          subject: '🔐 Recuperar contraseña - Solicitud de restablecimiento',
          html: emailHtml
        });

        console.log('✅ Email de recuperación enviado exitosamente');
        console.log('📧 Resultado:', emailResult);
      }
    } catch (emailError) {
      console.error('❌ Error enviando email de recuperación:', emailError);
      
      // Para desarrollo, seguimos logueando el token
      console.log('🔑 Reset token para', email, ':', resetToken)
      console.log('🔗 URL de reset: /user/reset-password?token=' + resetToken)
      
      // No fallar la operación por error de email, 
      // el token se creó correctamente en la base de datos
    }

    const response: AuthResponse = {
      success: true,
      message: 'Si el email existe, recibirás un enlace de recuperación'
    }

    return NextResponse.json(response)

  } catch (error) {
    console.error('Error en forgot password:', error)
    return NextResponse.json(
      { success: false, message: 'Error interno del servidor' },
      { status: 500 }
    )
  }
} 
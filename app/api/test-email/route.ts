import { NextRequest, NextResponse } from 'next/server';
import zohoMailService from '@/lib/zoho-mail';

export async function GET(request: NextRequest) {
  try {
    // Verificar la conexión con Zoho Mail
    const isConnected = await zohoMailService.verifyConnection();
    
    if (isConnected) {
      return NextResponse.json({
        success: true,
        message: 'Conexión con Zoho Mail verificada exitosamente',
        config: {
          user: process.env.ZOHO_EMAIL_USER,
          senderName: process.env.ZOHO_EMAIL_SENDER_NAME || 'Portafolio',
          toEmail: process.env.TO_EMAIL
        }
      });
    } else {
      return NextResponse.json({
        success: false,
        message: 'Error verificando conexión con Zoho Mail',
        error: 'No se pudo establecer conexión con el servidor SMTP'
      }, { status: 500 });
    }
    
  } catch (error) {
    console.error('Error en test de email:', error);
    
    return NextResponse.json({
      success: false,
      message: 'Error interno del servidor',
      error: error instanceof Error ? error.message : 'Error desconocido'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { testEmail } = await request.json();
    
    if (!testEmail) {
      return NextResponse.json({
        success: false,
        error: 'Email de prueba es requerido'
      }, { status: 400 });
    }

    // Enviar email de prueba
    const result = await zohoMailService.sendEmail({
      to: testEmail,
      subject: '✅ Test de configuración - Zoho Mail',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #2563eb;">🎉 ¡Configuración exitosa!</h2>
          <p>Este es un email de prueba para verificar que la integración con Zoho Mail está funcionando correctamente.</p>
          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #374151;">Detalles de la configuración:</h3>
            <ul style="color: #6b7280;">
              <li><strong>Servicio:</strong> Zoho Mail</li>
              <li><strong>Remitente:</strong> ${process.env.ZOHO_EMAIL_USER}</li>
              <li><strong>Nombre:</strong> ${process.env.ZOHO_EMAIL_SENDER_NAME || 'Portafolio'}</li>
              <li><strong>Fecha:</strong> ${new Date().toLocaleString('es-ES')}</li>
            </ul>
          </div>
          <p style="color: #6b7280; font-size: 14px;">
            Si recibiste este email, significa que tu configuración de Zoho Mail está funcionando perfectamente.
          </p>
        </div>
      `,
      text: `
        ¡Configuración exitosa!
        
        Este es un email de prueba para verificar que la integración con Zoho Mail está funcionando correctamente.
        
        Detalles:
        - Servicio: Zoho Mail
        - Remitente: ${process.env.ZOHO_EMAIL_USER}
        - Nombre: ${process.env.ZOHO_EMAIL_SENDER_NAME || 'Portafolio'}
        - Fecha: ${new Date().toLocaleString('es-ES')}
        
        Si recibiste este email, tu configuración está funcionando perfectamente.
      `
    });

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Email de prueba enviado exitosamente',
        messageId: result.messageId
      });
    } else {
      return NextResponse.json({
        success: false,
        error: result.error
      }, { status: 500 });
    }

  } catch (error) {
    console.error('Error enviando email de prueba:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Error interno del servidor al enviar email de prueba'
    }, { status: 500 });
  }
} 
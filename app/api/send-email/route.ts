import { NextRequest, NextResponse } from "next/server";
import { Resend } from 'resend';
import { z } from 'zod';
import { generateContactEmail, generateAutoReplyEmail } from '@/lib/email-templates';

// Esquema de validación
const contactSchema = z.object({
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
  email: z.string().email({ message: "Correo electrónico inválido" }),
  subject: z.string().min(5, { message: "El asunto debe tener al menos 5 caracteres" }),
  message: z.string().min(10, { message: "El mensaje debe tener al menos 10 caracteres" }),
  sendAutoReply: z.boolean().optional().default(true)
});

export async function POST(request: NextRequest) {
  try {
    // Validar la API key de Resend
    const resendApiKey = process.env.NEXT_PUBLIC_RESEND_API_KEY;
    if (!resendApiKey) {
      console.error('NEXT_PUBLIC_RESEND_API_KEY no está configurada');
      return NextResponse.json(
        { success: false, error: "Configuración de email no válida" }, 
        { status: 500 }
      );
    }

    const resend = new Resend(resendApiKey);

    // Validar datos de entrada
    const body = await request.json();
    const validationResult = contactSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          success: false, 
          error: "Datos inválidos", 
          details: validationResult.error.errors 
        }, 
        { status: 400 }
      );
    }

    const { name, email, message, subject, sendAutoReply } = validationResult.data;

    // Configuración de emails
    const fromEmail = process.env.NEXT_PUBLIC_FROM_EMAIL || 'noreply@tudominio.com';
    const toEmail = process.env.NEXT_PUBLIC_TO_EMAIL || 'tu@email.com';

    // Email principal al propietario del sitio
    const contactEmailHtml = generateContactEmail({ name, email, subject, message });
    
    const emailData = {
      from: fromEmail,
      to: toEmail,
      subject: `[Portafolio] ${subject}`,
      html: contactEmailHtml,
      replyTo: email // Permitir responder directamente al remitente
    };

    console.log('Enviando email principal a:', toEmail);
    const mainEmailResult = await resend.emails.send(emailData);

    // Respuesta automática opcional
    let autoReplyResult = null;
    if (sendAutoReply) {
      try {
        const autoReplyHtml = generateAutoReplyEmail({ name, email, subject, message });
        
        autoReplyResult = await resend.emails.send({
          from: fromEmail,
          to: email,
          subject: `Re: ${subject} - Mensaje recibido`,
          html: autoReplyHtml
        });
        
        console.log('Respuesta automática enviada a:', email);
      } catch (autoReplyError) {
        console.error('Error enviando respuesta automática:', autoReplyError);
        // No fallar por el auto-reply, solo loguear el error
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: "Mensaje enviado exitosamente",
      data: {
        mainEmail: mainEmailResult,
        autoReply: autoReplyResult
      }
    });

  } catch (error) {
    console.error('Error enviando email:', error);
    
    // Manejo específico de errores de Resend
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        return NextResponse.json(
          { success: false, error: "Error de autenticación del servicio de email" }, 
          { status: 500 }
        );
      }
      
      if (error.message.includes('rate limit')) {
        return NextResponse.json(
          { success: false, error: "Demasiados emails enviados. Intenta más tarde." }, 
          { status: 429 }
        );
      }
    }

    return NextResponse.json(
      { success: false, error: "Error interno del servidor al enviar email" }, 
      { status: 500 }
    );
  }
}
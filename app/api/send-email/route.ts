import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod';
import { generateContactEmail, generateAutoReplyEmail } from '@/lib/email-templates';
import zohoMailService from '@/lib/zoho-mail';

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
    const toEmail = process.env.TO_EMAIL || 'tu@email.com';

    // Email principal al propietario del sitio
    const contactEmailHtml = generateContactEmail({ name, email, subject, message });
    
    console.log('Enviando email principal a:', toEmail);
    const mainEmailResult = await zohoMailService.sendEmail({
      to: toEmail,
      subject: `[Portafolio] ${subject}`,
      html: contactEmailHtml,
      replyTo: email // Permitir responder directamente al remitente
    });

    if (!mainEmailResult.success) {
      return NextResponse.json(
        { success: false, error: mainEmailResult.error }, 
        { status: 500 }
      );
    }

    // Email de confirmación al usuario (nuevo)
    let confirmationResult = null;
    if (sendAutoReply) {
      try {
        const autoReplyHtml = generateAutoReplyEmail({ name, email, subject, message });
        
        confirmationResult = await zohoMailService.sendEmail({
          to: email,
          subject: `✅ Confirmación: ${subject} - Mensaje recibido`,
          html: autoReplyHtml
        });
        
        if (confirmationResult.success) {
          console.log('Email de confirmación enviado a:', email);
        } else {
          console.error('Error enviando email de confirmación:', confirmationResult.error);
        }
      } catch (autoReplyError) {
        console.error('Error enviando email de confirmación:', autoReplyError);
        // No fallar por el email de confirmación, solo loguear el error
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: "Mensaje enviado exitosamente",
      data: {
        mainEmail: {
          success: mainEmailResult.success,
          messageId: mainEmailResult.messageId
        },
        confirmationEmail: confirmationResult ? {
          success: confirmationResult.success,
          messageId: confirmationResult.messageId
        } : null
      }
    });

  } catch (error) {
    console.error('Error enviando email:', error);
    
    return NextResponse.json(
      { success: false, error: "Error interno del servidor al enviar email" }, 
      { status: 500 }
    );
  }
}
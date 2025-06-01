interface ContactEmailData {
  name: string
  email: string
  subject: string
  message: string
}

interface PasswordResetEmailData {
  name: string
  resetUrl: string
  expirationTime: string
}

export function generateContactEmail(data: ContactEmailData): string {
  return `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nuevo mensaje de contacto</title>
    <style>
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
            margin: 0; 
            padding: 0; 
            background-color: #f8fafc; 
        }
        .container { 
            max-width: 600px; 
            margin: 0 auto; 
            background-color: white; 
            border-radius: 8px; 
            overflow: hidden;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        .header { 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
            color: white; 
            padding: 32px 24px; 
            text-align: center; 
        }
        .content { 
            padding: 32px 24px; 
        }
        .field { 
            margin-bottom: 24px; 
            padding: 16px; 
            background-color: #f8fafc; 
            border-radius: 6px; 
            border-left: 4px solid #667eea;
        }
        .field-label { 
            font-weight: 600; 
            color: #374151; 
            font-size: 14px; 
            text-transform: uppercase; 
            letter-spacing: 0.5px; 
            margin-bottom: 8px; 
        }
        .field-value { 
            color: #1f2937; 
            line-height: 1.6; 
        }
        .footer { 
            background-color: #f8fafc; 
            padding: 24px; 
            text-align: center; 
            color: #6b7280; 
            font-size: 14px; 
        }
        .message-content {
            white-space: pre-wrap;
            word-wrap: break-word;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 style="margin: 0; font-size: 24px; font-weight: 700;">📧 Nuevo Mensaje de Contacto</h1>
            <p style="margin: 8px 0 0 0; opacity: 0.9;">Has recibido un nuevo mensaje desde tu portafolio</p>
        </div>
        
        <div class="content">
            <div class="field">
                <div class="field-label">👤 Nombre</div>
                <div class="field-value">${data.name}</div>
            </div>
            
            <div class="field">
                <div class="field-label">✉️ Email</div>
                <div class="field-value">${data.email}</div>
            </div>
            
            <div class="field">
                <div class="field-label">📝 Asunto</div>
                <div class="field-value">${data.subject}</div>
            </div>
            
            <div class="field">
                <div class="field-label">💬 Mensaje</div>
                <div class="field-value message-content">${data.message}</div>
            </div>
        </div>
        
        <div class="footer">
            <p>Este mensaje fue enviado desde el formulario de contacto de tu portafolio.</p>
            <p>Puedes responder directamente a <strong>${data.email}</strong></p>
        </div>
    </div>
</body>
</html>
  `
}

export function generatePasswordResetEmail(data: PasswordResetEmailData): string {
  return `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recuperar contraseña</title>
    <style>
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
            margin: 0; 
            padding: 0; 
            background-color: #f8fafc; 
        }
        .container { 
            max-width: 600px; 
            margin: 0 auto; 
            background-color: white; 
            border-radius: 8px; 
            overflow: hidden;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        .header { 
            background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); 
            color: white; 
            padding: 32px 24px; 
            text-align: center; 
        }
        .content { 
            padding: 32px 24px; 
            text-align: center; 
        }
        .button { 
            display: inline-block; 
            background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); 
            color: white; 
            padding: 14px 28px; 
            text-decoration: none; 
            border-radius: 6px; 
            font-weight: 600; 
            margin: 24px 0; 
            transition: transform 0.2s;
        }
        .button:hover { 
            transform: translateY(-1px); 
        }
        .warning { 
            background-color: #fef3c7; 
            border: 1px solid #f59e0b; 
            border-radius: 6px; 
            padding: 16px; 
            margin: 24px 0; 
            color: #92400e; 
        }
        .footer { 
            background-color: #f8fafc; 
            padding: 24px; 
            text-align: center; 
            color: #6b7280; 
            font-size: 14px; 
        }
        .security-notice {
            background-color: #eff6ff;
            border: 1px solid #3b82f6;
            border-radius: 6px;
            padding: 16px;
            margin: 24px 0;
            color: #1e40af;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 style="margin: 0; font-size: 24px; font-weight: 700;">🔐 Recuperar Contraseña</h1>
            <p style="margin: 8px 0 0 0; opacity: 0.9;">Solicitud de restablecimiento de contraseña</p>
        </div>
        
        <div class="content">
            <p style="font-size: 16px; color: #374151; margin-bottom: 8px;">
                Hola${data.name ? ` ${data.name}` : ''},
            </p>
            
            <p style="color: #6b7280; line-height: 1.6;">
                Hemos recibido una solicitud para restablecer la contraseña de tu cuenta. 
                Si fuiste tú quien hizo esta solicitud, haz clic en el botón de abajo para continuar.
            </p>
            
            <a href="${data.resetUrl}" class="button" style="color: white;">
                🔄 Restablecer Contraseña
            </a>
            
            <div class="warning">
                <strong>⚠️ Importante:</strong><br>
                Este enlace expirará el <strong>${data.expirationTime}</strong>.<br>
                Solo tienes 1 hora para usar este enlace.
            </div>
            
            <div class="security-notice">
                <strong>🔒 Aviso de Seguridad:</strong><br>
                Si no solicitaste este restablecimiento, puedes ignorar este email de forma segura.
                Tu contraseña no será cambiada.
            </div>
            
            <p style="color: #6b7280; font-size: 14px; margin-top: 32px;">
                Si el botón no funciona, copia y pega este enlace en tu navegador:<br>
                <a href="${data.resetUrl}" style="color: #3b82f6; word-break: break-all;">${data.resetUrl}</a>
            </p>
        </div>
        
        <div class="footer">
            <p>Este email fue generado automáticamente, por favor no respondas a este mensaje.</p>
            <p>Si tienes problemas, contacta al administrador del sitio.</p>
        </div>
    </div>
</body>
</html>
  `
}

export function generateAutoReplyEmail(data: ContactEmailData): string {
  return `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mensaje recibido - Respuesta automática</title>
    <style>
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
            margin: 0; 
            padding: 0; 
            background-color: #f8fafc; 
        }
        .container { 
            max-width: 600px; 
            margin: 0 auto; 
            background-color: white; 
            border-radius: 8px; 
            overflow: hidden;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        .header { 
            background: linear-gradient(135deg, #10b981 0%, #059669 100%); 
            color: white; 
            padding: 32px 24px; 
            text-align: center; 
        }
        .content { 
            padding: 32px 24px; 
        }
        .footer { 
            background-color: #f8fafc; 
            padding: 24px; 
            text-align: center; 
            color: #6b7280; 
            font-size: 14px; 
        }
        .message-summary {
            background-color: #f8fafc;
            border-radius: 6px;
            padding: 20px;
            margin: 24px 0;
            border-left: 4px solid #10b981;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 style="margin: 0; font-size: 24px; font-weight: 700;">✅ Mensaje Recibido</h1>
            <p style="margin: 8px 0 0 0; opacity: 0.9;">Gracias por contactarme</p>
        </div>
        
        <div class="content">
            <p style="font-size: 16px; color: #374151;">
                Hola <strong>${data.name}</strong>,
            </p>
            
            <p style="color: #6b7280; line-height: 1.6;">
                He recibido tu mensaje y me pondré en contacto contigo lo antes posible. 
                Normalmente respondo en un plazo de 24-48 horas.
            </p>
            
            <div class="message-summary">
                <h3 style="margin: 0 0 12px 0; color: #374151;">📋 Resumen de tu mensaje:</h3>
                <p style="margin: 4px 0; color: #6b7280;"><strong>Asunto:</strong> ${data.subject}</p>
                <p style="margin: 4px 0; color: #6b7280;"><strong>Email:</strong> ${data.email}</p>
            </div>
            
            <p style="color: #6b7280; line-height: 1.6;">
                Mientras tanto, puedes revisar mi portafolio para conocer más sobre mi trabajo y experiencia.
            </p>
            
            <p style="color: #374151; margin-top: 24px;">
                ¡Gracias por tu interés!<br>
                <strong>Carlo Echeverría</strong>
            </p>
        </div>
        
        <div class="footer">
            <p>Este es un mensaje automático. Por favor, no respondas a este email.</p>
            <p>Si es urgente, puedes contactarme directamente a través de mis redes sociales.</p>
        </div>
    </div>
</body>
</html>
  `
} 
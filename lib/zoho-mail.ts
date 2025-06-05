import nodemailer from 'nodemailer';

// Interface para las opciones de email
export interface EmailOptions {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  replyTo?: string;
}

// Interface para la respuesta del servicio
export interface EmailResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

// Clase para manejar el envío de emails con Zoho Mail
class ZohoMailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    // Configuración del transporter para Zoho Mail
    const smtpConfig = this.getSmtpConfig();
    this.transporter = nodemailer.createTransport(smtpConfig);
  }

  // Obtener configuración SMTP completa
  private getSmtpConfig(): any {
    const port = parseInt(process.env.ZOHO_SMTP_PORT || '465');
    const isSecure = process.env.ZOHO_SMTP_SECURE !== 'false'; // por defecto SSL
    
    const config: any = {
      host: this.getSmtpHost(),
      port: port,
      secure: isSecure, // true para SSL (465), false para TLS (587)
      auth: {
        user: process.env.ZOHO_EMAIL_USER,
        pass: process.env.ZOHO_EMAIL_PASSWORD,
      },
      // Configuración adicional para Zoho Mail
      tls: {
        rejectUnauthorized: false,
        minVersion: 'TLSv1.2'
      },
      // Timeout más largo para Zoho
      connectionTimeout: 60000,
      greetingTimeout: 30000,
      socketTimeout: 60000,
    };

    // Si no es SSL seguro, usar STARTTLS con configuración adicional
    if (!isSecure) {
      config.requireTLS = true;
      config.tls = {
        ...config.tls,
        servername: this.getSmtpHost()
      };
    }

    return config;
  }

  // Determinar el host SMTP según el tipo de cuenta
  private getSmtpHost(): string {
    // Si hay una configuración manual del host
    if (process.env.ZOHO_SMTP_HOST) {
      return process.env.ZOHO_SMTP_HOST;
    }

    const emailUser = process.env.ZOHO_EMAIL_USER;
    
    // Si es una cuenta de dominio personalizado (organizacional)
    if (emailUser && !emailUser.includes('@zohomail.com')) {
      return 'smtppro.zoho.com';
    }
    
    // Para cuentas personales (@zohomail.com) y organizaciones gratuitas
    return 'smtp.zoho.com';
  }

  // Validar configuración del servicio
  private validateConfig(): { isValid: boolean; error?: string } {
    if (!process.env.ZOHO_EMAIL_USER) {
      console.error('ZOHO_EMAIL_USER no está configurada');
      return {
        isValid: false,
        error: 'ZOHO_EMAIL_USER no está configurada en las variables de entorno'
      };
    }
    
    if (!process.env.ZOHO_EMAIL_PASSWORD) {
      console.error('ZOHO_EMAIL_PASSWORD no está configurada');
      return {
        isValid: false,
        error: 'ZOHO_EMAIL_PASSWORD no está configurada en las variables de entorno'
      };
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(process.env.ZOHO_EMAIL_USER)) {
      return {
        isValid: false,
        error: 'ZOHO_EMAIL_USER no tiene un formato de email válido'
      };
    }
    
    return { isValid: true };
  }

  // Método principal para enviar emails
  async sendEmail(options: EmailOptions): Promise<EmailResponse> {
    try {
      // Validar configuración
      const validation = this.validateConfig();
      if (!validation.isValid) {
        return {
          success: false,
          error: validation.error || 'Configuración de email inválida'
        };
      }

      // Preparar las opciones del email
      const mailOptions = {
        from: `"${process.env.ZOHO_EMAIL_SENDER_NAME || 'Portafolio'}" <${process.env.ZOHO_EMAIL_USER}>`,
        to: Array.isArray(options.to) ? options.to.join(', ') : options.to,
        subject: options.subject,
        html: options.html,
        text: options.text,
        replyTo: options.replyTo,
      };

      // Enviar el email
      const info = await this.transporter.sendMail(mailOptions);
      
      console.log('✅ Email enviado exitosamente:', info.messageId);
      
      return {
        success: true,
        messageId: info.messageId
      };

    } catch (error) {
      console.error('❌ Error enviando email:', error);
      
      let errorMessage = 'Error interno del servidor al enviar email';
      
      if (error instanceof Error) {
        // Error específico de Zoho Mail: 554 5.7.8 Access Restricted
        if (error.message.includes('554 5.7.8') || error.message.includes('Access Restricted')) {
          errorMessage = `⚠️ Configuración de autenticación requerida:

🔑 PASOS OBLIGATORIOS:
1. Habilita 2FA en tu cuenta de Zoho Mail
2. Ve a Configuración → Seguridad → App Passwords
3. Genera una nueva contraseña de aplicación
4. Usa esa contraseña en ZOHO_EMAIL_PASSWORD

🔧 CONFIGURACIÓN SMTP:
5. Ve a Configuración → Cuentas de correo → Tu cuenta
6. Habilita acceso SMTP/POP/IMAP
7. Si es cuenta organizacional, verifica permisos de admin

💡 ALTERNATIVA - Probar TLS:
Agrega a tu .env.local:
ZOHO_SMTP_PORT="587"
ZOHO_SMTP_SECURE="false"

Más info: ${error.message}`;
        }
        // Otros errores de autenticación
        else if (error.message.includes('authentication') || error.message.includes('login') || error.message.includes('EAUTH')) {
          errorMessage = 'Error de autenticación: Verifica ZOHO_EMAIL_USER y ZOHO_EMAIL_PASSWORD. Si usas 2FA, necesitas una App Password y SMTP habilitado.';
        }
        // Rate limiting
        else if (error.message.includes('rate limit') || error.message.includes('quota')) {
          errorMessage = 'Límite de emails alcanzado. Intenta más tarde.';
        }
        // Destinatarios inválidos
        else if (error.message.includes('Invalid recipients') || error.message.includes('recipient')) {
          errorMessage = 'Dirección de email inválida';
        }
        // Error de conexión
        else if (error.message.includes('ECONNECTION') || error.message.includes('timeout')) {
          errorMessage = 'Error de conexión con el servidor SMTP de Zoho. Verifica tu conexión a internet.';
        }
        // Error de certificado SSL/TLS
        else if (error.message.includes('certificate') || error.message.includes('TLS')) {
          errorMessage = 'Error de certificado SSL/TLS. Prueba cambiar ZOHO_SMTP_PORT=587 y ZOHO_SMTP_SECURE=false';
        }
      }
      
      return {
        success: false,
        error: errorMessage
      };
    }
  }

  // Método para verificar la conectividad del servicio
  async verifyConnection(): Promise<boolean> {
    try {
      console.log('🔍 Verificando configuración de Zoho Mail...');
      console.log('📧 Usuario:', process.env.ZOHO_EMAIL_USER);
      console.log('🖥️ Servidor SMTP:', this.getSmtpHost());
      console.log('🔌 Puerto:', process.env.ZOHO_SMTP_PORT || '465');
      console.log('🔒 Seguro (SSL):', process.env.ZOHO_SMTP_SECURE !== 'false');
      
      await this.transporter.verify();
      console.log('✅ Conexión con Zoho Mail verificada exitosamente');
      return true;
    } catch (error) {
      console.error('❌ Error verificando conexión con Zoho Mail:', error);
      
      if (error instanceof Error && error.message.includes('554 5.7.8')) {
        console.error(`
⚠️  CONFIGURACIÓN REQUERIDA PARA ZOHO MAIL:

🔑 AUTENTICACIÓN:
1. Habilita 2FA en tu cuenta de Zoho Mail
2. Ve a Configuración → Seguridad → App Passwords  
3. Genera una nueva contraseña de aplicación
4. Actualiza ZOHO_EMAIL_PASSWORD con la nueva contraseña

🔧 ACCESO SMTP:
5. Ve a Configuración → Cuentas de correo → ${process.env.ZOHO_EMAIL_USER}
6. Habilita acceso SMTP/POP/IMAP
7. Si es cuenta organizacional, verifica que el admin permita SMTP

💡 ALTERNATIVA TLS:
Si sigue fallando, prueba agregar a tu .env.local:
ZOHO_SMTP_PORT="587"
ZOHO_SMTP_SECURE="false"

Usuario actual: ${process.env.ZOHO_EMAIL_USER}
Servidor SMTP: ${this.getSmtpHost()}
Puerto: ${process.env.ZOHO_SMTP_PORT || '465'}
SSL: ${process.env.ZOHO_SMTP_SECURE !== 'false'}
        `);
      }
      
      return false;
    }
  }

  // Método para obtener información de configuración
  getConfigInfo() {
    const port = parseInt(process.env.ZOHO_SMTP_PORT || '465');
    const isSecure = process.env.ZOHO_SMTP_SECURE !== 'false';
    
    return {
      user: process.env.ZOHO_EMAIL_USER,
      host: this.getSmtpHost(),
      port: port,
      secure: isSecure,
      protocol: isSecure ? 'SSL' : 'TLS',
      senderName: process.env.ZOHO_EMAIL_SENDER_NAME || 'Portafolio'
    };
  }
}

// Instancia singleton del servicio
const zohoMailService = new ZohoMailService();

export default zohoMailService; 
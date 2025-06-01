"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Mail, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { PasswordResetRequest } from "@/types/auth"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const requestData: PasswordResetRequest = { email }
      
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      })

      const data = await response.json()

      if (data.success) {
        setSuccess(true)
      } else {
        setError(data.message || 'Error al solicitar recuperación')
      }
    } catch (error) {
      console.error('Error en forgot password:', error)
      setError('Error de conexión')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/30 p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Mail className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-2xl font-bold">Email Enviado</CardTitle>
              <CardDescription>
                Revisa tu bandeja de entrada
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-muted-foreground">
                Si el email existe en nuestro sistema, recibirás un enlace para restablecer tu contraseña.
              </p>
              
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  ¿No recibiste el email? Revisa tu carpeta de spam.
                </p>
                
                <Button
                  variant="outline"
                  onClick={() => {
                    setSuccess(false)
                    setEmail('')
                  }}
                  className="w-full"
                >
                  Intentar con otro email
                </Button>
              </div>

              <div className="pt-4 border-t">
                <Link
                  href="/user/login"
                  className="text-sm text-primary hover:underline flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Volver al login
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/30 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Recuperar Contraseña</CardTitle>
            <CardDescription>
              Ingresa tu email para recibir un enlace de recuperación
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  required
                  disabled={loading}
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Enviar Enlace de Recuperación
                  </>
                )}
              </Button>

              <div className="text-center space-y-2">
                <Link
                  href="/user/login"
                  className="text-sm text-muted-foreground hover:text-primary underline flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Volver al login
                </Link>
                
                <div className="text-sm text-muted-foreground">
                  ¿No tienes cuenta?{" "}
                  <Link
                    href="/user/register"
                    className="text-primary hover:underline font-medium"
                  >
                    Regístrate aquí
                  </Link>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
} 
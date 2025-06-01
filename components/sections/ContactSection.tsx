"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Send, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Profile } from "@/types/profile"
import { Alert, AlertDescription } from "@/components/ui/alert"

const formSchema = z.object({
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
  email: z.string().email({ message: "Correo electrónico inválido" }),
  subject: z.string().min(5, { message: "El asunto debe tener al menos 5 caracteres" }),
  message: z.string().min(10, { message: "El mensaje debe tener al menos 10 caracteres" }),
})

type ContactFormData = z.infer<typeof formSchema>

export function ContactSection({ profile }: { profile : Profile }) {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const email = profile?.attributes?.field_email || "contacto@ejemplo.com"

  const form = useForm<ContactFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  })

  async function onSubmit(values: ContactFormData) {
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...values,
          sendAutoReply: true
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || `Error HTTP: ${response.status}`)
      }

      if (data.success) {
        setSubmitStatus('success')
        toast({
          title: "¡Mensaje enviado exitosamente! ✅",
          description: "Gracias por contactarme. Te responderé lo antes posible. También recibirás una confirmación en tu email.",
        })
        form.reset()
        
        // Resetear el estado de éxito después de 5 segundos
        setTimeout(() => {
          setSubmitStatus('idle')
        }, 5000)
      } else {
        throw new Error(data.error || 'Error desconocido')
      }
    } catch (error) {
      console.error('Error al enviar mensaje:', error)
      
      let errorMsg = 'Ha ocurrido un error al enviar el mensaje. Por favor, inténtalo de nuevo.'
      
      if (error instanceof Error) {
        if (error.message.includes('rate limit')) {
          errorMsg = 'Demasiados mensajes enviados. Por favor, espera un momento antes de intentar de nuevo.'
        } else if (error.message.includes('autenticación')) {
          errorMsg = 'Error en el servicio de email. Por favor, contacta directamente por email.'
        } else if (error.message.includes('Datos inválidos')) {
          errorMsg = 'Los datos ingresados no son válidos. Revisa los campos e intenta de nuevo.'
        }
      }
      
      setErrorMessage(errorMsg)
      setSubmitStatus('error')
      
      toast({
        title: "Error al enviar mensaje ❌",
        description: errorMsg,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">Contacto</h2>
          <div className="h-1 w-20 bg-primary mx-auto mb-8"></div>
          <p className="mb-12 text-xl text-muted-foreground">¿Tienes un proyecto en mente? ¡Hablemos!</p>
        </motion.div>

        <div className="mx-auto max-w-2xl">
          {/* Mensaje de estado */}
          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <Alert className="border-green-200 bg-green-50 text-green-800">
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>¡Mensaje enviado exitosamente!</strong> Te responderé lo antes posible.
                  También recibirás una confirmación automática en tu email.
                </AlertDescription>
              </Alert>
            </motion.div>
          )}

          {submitStatus === 'error' && errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {errorMessage}
                </AlertDescription>
              </Alert>
            </motion.div>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Tu nombre" 
                          {...field} 
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Correo electrónico</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="tu@email.com" 
                          type="email"
                          {...field} 
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Asunto</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Asunto del mensaje" 
                        {...field} 
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mensaje</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Escribe tu mensaje aquí..." 
                        className="min-h-32" 
                        {...field} 
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button 
                type="submit" 
                className="w-full gap-2" 
                disabled={isSubmitting || submitStatus === 'success'}
              >
                {isSubmitting ? (
                  <>
                    <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Enviando mensaje...
                  </>
                ) : submitStatus === 'success' ? (
                  <>
                    <CheckCircle className="h-4 w-4" />
                    Mensaje enviado ✓
                  </>
                ) : (
                  <>
                    Enviar mensaje
                    <Send className="h-4 w-4" />
                  </>
                )}
              </Button>
              
              {submitStatus === 'success' && (
                <p className="text-sm text-center text-muted-foreground">
                  💡 Puedes enviar otro mensaje en unos minutos
                </p>
              )}
            </form>
          </Form>
          
          <div className="mt-8 text-center">
            <p className="text-muted-foreground">
              También puedes contactarme directamente en{" "}
              <a href={`mailto:${email}`} className="font-medium text-primary hover:underline">
                {email}
              </a>
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              📱 Los mensajes se procesan automáticamente y recibirás una confirmación
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

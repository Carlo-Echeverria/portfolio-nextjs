import Link from "next/link"
import { ArrowLeft, FileX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function ProjectNotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-md text-center">
          <Card>
            <CardContent className="p-8">
              <div className="mb-6">
                <FileX className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h1 className="text-3xl font-bold mb-2">Página no encontrada</h1>
                <p className="text-muted-foreground">
                  La página que buscas no existe o no está disponible en este momento.
                </p>
              </div>
              
              <div className="space-y-4">
                <Button asChild className="w-full gap-2">
                  <Link href="/">
                    <ArrowLeft className="h-4 w-4" />
                    Volver al inicio
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export const metadata = {
  title: "Proyecto no encontrado - Portfolio",
  description: "El proyecto solicitado no existe o no está disponible.",
} 
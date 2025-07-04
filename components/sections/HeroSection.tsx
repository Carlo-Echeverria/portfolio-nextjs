"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowDown, ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
// import { sanitizeHtml } from "@/lib/utils"
import { Profile } from "@/types/profile";
import { File, Image as ImageType } from "@/types/file";

export function HeroSection({ profile }: { profile: Profile }) {
  const name = profile?.attributes?.title || "Carlo Echeverría"
  // const fullname = profile?.attributes?.fullname || "Carlo Alberto Echeverría Fuentes"
  const title = profile?.attributes?.field_title || "Desarrollador Full-Stack"
  // const bio = profile?.attributes?.body?.value || ""

  const photoUrl = Array.isArray(profile?.relationships?.field_photo?.data) && profile.relationships.field_photo.data.length > 0
    ? (profile.relationships.field_photo.data[0] as ImageType).attributes.uri.url
    : "/placeholder.webp?height=200&width=200";
  
  // const photoUrl = "/placeholder.webp?height=200&width=200";

  // const cvUrl = Array.isArray(profile?.relationships?.field_cv?.data) && profile.relationships.field_cv.data.length > 0
  //   ? (profile.relationships.field_cv.data[0] as File).attributes.uri.url
  //   : "/placeholder.webp?height=200&width=200";

  const cvUrlS3 = 'https://jefckqhxjmggckaqzono.supabase.co/storage/v1/object/public/portfolio//CV%20Carlo%20Echeverria.pdf'

  return (
    <section className="w-full py-24 md:py-24 lg:py-[12rem] lg:pb-0">
      <div className="container px-4 md:px-6">
        <div className="grid lg:grid-cols-2">
          {/* Columna de la imagen */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center"
          >
            <div className="relative h-[250px] w-[250px] sm:h-[300px] sm:w-[300px] md:h-[350px] md:w-[350px] lg:h-[400px] lg:w-[400px] overflow-hidden rounded-full border-4 border-primary/20">
              <Image
                src={photoUrl || "/placeholder.webp"}
                alt="Foto de perfil"
                fill
                sizes="(max-width: 640px) 250px, (max-width: 768px) 300px, (max-width: 1024px) 350px, 400px"
                className="object-cover"
                priority
              />
            </div>
          </motion.div>

          {/* Columna de contenido */}
          <div className="flex flex-col justify-center space-y-8 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-4"
            >
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                {name}
              </h1>
              <p className="text-lg text-muted-foreground sm:text-xl md:text-2xl">
                {title}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="space-y-4"
            >
              <p className="text-base text-muted-foreground sm:text-lg">
                Apasionado por crear experiencias web excepcionales y soluciones tecnológicas innovadoras.
                Especializado en desarrollo frontend y backend con las últimas tecnologías.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-col gap-4 sm:flex-row justify-center lg:justify-start"
            >
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href={cvUrlS3} target="_blank">
                  Descargar CV
                  <ArrowDown className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="w-full sm:w-auto">
                <Link href="/projects">
                  Ver Proyectos
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="flex gap-4 justify-center lg:justify-start"
            >
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://github.com/beriliox" target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://www.linkedin.com/in/carloecheverriafuentes/" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="mailto:contacto@cecheverria.dev">
                  <Mail className="h-5 w-5" />
                  <span className="sr-only">Email</span>
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

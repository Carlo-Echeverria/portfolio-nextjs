"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
// import { sanitizeHtml } from "@/lib/utils"
import { Profile } from "@/types/profile";
import { File, Image as ImageType } from "@/types/file";

export function HeroSection({ profile }: { profile: Profile }) {
  const name = profile?.attributes?.title || "Carlo Echeverría"
  // const fullname = profile?.attributes?.fullname || "Carlo Alberto Echeverría Fuentes"
  const title = profile?.attributes?.field_title || "Desarrollador Full-Stack"
  // const bio = profile?.attributes?.body?.value || ""

  // const photoUrl = Array.isArray(profile?.relationships?.field_photo?.data) && profile.relationships.field_photo.data.length > 0
  //   ? (profile.relationships.field_photo.data[0] as ImageType).attributes.uri.url
  //   : "/placeholder.svg?height=200&width=200";
  

  const photoUrl = "/placeholder.svg?height=200&width=200";

  // const cvUrl = Array.isArray(profile?.relationships?.field_cv?.data) && profile.relationships.field_cv.data.length > 0
  //   ? (profile.relationships.field_cv.data[0] as File).attributes.uri.url
  //   : "/placeholder.svg?height=200&width=200";

  const cvUrlS3 = 'https://jefckqhxjmggckaqzono.supabase.co/storage/v1/object/public/portfolio//CV%20Carlo%20Echeverria.pdf'

  return (
    <section id="home" className="relative min-h-screen w-full">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_var(--tw-gradient-stops))] from-primary/10 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-background to-transparent"></div>
      </div>

      <div className="container relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-20 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center text-center"
        >
          <div className="mb-8 overflow-hidden rounded-full border-4 border-primary/20 p-1">
            <Image
              src={photoUrl || "/placeholder.svg"}
              width={200}
              height={200}
              alt="Profile"
              className="rounded-full"
              priority
            />
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
          >
            {name}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mb-8 flex items-center gap-2"
          >
            <div className="h-[1px] w-12 bg-primary/50"></div>
            <p className="text-xl text-muted-foreground">{title}</p>
            <div className="h-[1px] w-12 bg-primary/50"></div>
          </motion.div>
          {/* {bio && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mb-10 max-w-2xl text-xl text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(bio) }}
            />
          )} */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Button asChild size="lg" className="gap-2 px-8">
              <Link href="#projects">
                Ver Proyectos
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2 px-8">
              <Link href={cvUrlS3} download>
                Descargar CV
                <Download className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

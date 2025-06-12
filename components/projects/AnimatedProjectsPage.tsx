"use client"

import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ProjectsList } from "@/components/projects/ProjectsList"
import { Project } from "@/types/project"

interface AnimatedProjectsPageProps {
  projects: Project[]
}

export function AnimatedProjectsPage({ projects }: AnimatedProjectsPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-6xl"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8"
          >
            <Button asChild variant="ghost" className="gap-2 p-0 h-auto">
              <Link href="/">
                <ArrowLeft className="h-4 w-4" />
                Volver al inicio
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
              Todos los Proyectos
            </h1>
            <div className="h-1 w-20 bg-primary mx-auto mb-8"></div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explora todos los proyectos en los que he trabajado, desde aplicaciones web hasta desarrollos complejos.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {projects.length > 0 ? (
              <ProjectsList projects={projects} />
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No hay proyectos disponibles en este momento.</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
} 
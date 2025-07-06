"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Project } from "@/types/project"
import { ProjectsList } from "@/components/projects/ProjectsList"

export function ProjectsSection({ projectsProps }: { projectsProps: Project[] }) {
  // Mostrar solo los primeros 6 proyectos en la home
  const displayedProjects = projectsProps.slice(0, 6)
  const hasMoreProjects = projectsProps.length > 6

  return (
    <section id="projects" className="py-12 bg-muted/30 scroll-mt-[100px]">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto max-w-5xl"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">Mis Proyectos</h2>
            <div className="h-1 w-20 bg-primary mx-auto mb-8"></div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Una selección de los proyectos más destacados en los que he trabajado
            </p>
          </div>

          <ProjectsList projects={displayedProjects} />

          {/* Enlace para ver todos los proyectos */}
          {hasMoreProjects && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <Button asChild variant="outline" size="lg" className="gap-2">
                <Link href="/projects">
                  Ver todos los proyectos
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

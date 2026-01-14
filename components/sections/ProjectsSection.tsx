"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Project } from "@/types/project"
import { ProjectsList } from "@/components/projects/ProjectsList"

export function ProjectsSection({ projectsProps }: { projectsProps: Project[] }) {
  // Mostrar solo los primeros 3 proyectos en la home (para 3 columnas)
  const displayedProjects = projectsProps.slice(0, 3)

  if (!projectsProps || projectsProps.length === 0) {
    return null
  }

  return (
    <section id="projects" className="relative py-16 scroll-mt-[100px]">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto max-w-6xl"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-6">Proyectos</h2>
            <div className="h-1 w-20 bg-primary mx-auto mb-8 rounded-full"></div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Una selección de los proyectos más destacados en los que he trabajado
            </p>
          </div>

          <ProjectsList projects={displayedProjects} />

          {/* CTA para ver todos los proyectos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button asChild variant="default" size="lg" className="gap-2">
              <Link href="/projects">
                Ver todos los proyectos
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

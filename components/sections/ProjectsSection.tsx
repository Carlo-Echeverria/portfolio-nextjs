"use client"

import { motion } from "framer-motion"
import { Project } from "@/types/project"
import { ProjectsList } from "@/components/ProjectsList"

export function ProjectsSection({ projectsProps }: { projectsProps: Project[] }) {
  return (
    <section id="projects" className="py-24 bg-muted/30">
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

          <ProjectsList projects={projectsProps} />
        </motion.div>
      </div>
    </section>
  )
}

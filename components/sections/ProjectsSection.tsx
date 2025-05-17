"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Github } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface ProjectsSectionProps {
  projects: any
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  
  // Proyectos de ejemplo (reemplazar con datos reales de la API)

  return (
    <section id="projects" className="py-20 bg-muted/30">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">Proyectos Recientes</h2>
          <div className="h-1 w-20 bg-primary mx-auto mb-8"></div>
          <p className="mb-12 text-xl text-muted-foreground">
            Una selección de mis trabajos más recientes y destacados
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project: any, index: number) => (
            <motion.div
              key={project.id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <Card className="overflow-hidden h-full flex flex-col">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={project.relationships?.field_image?.url || "/placeholder.svg?height=400&width=600"}
                    alt={project.attributes?.title || "Proyecto"}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardContent className="flex flex-col flex-grow p-6">
                  <h3 className="mb-2 text-xl font-bold">{project.attributes?.title || "Título del proyecto"}</h3>
                  <p className="mb-4 text-muted-foreground">
                    {project.attributes?.field_description || "Descripción del proyecto"}
                  </p>
                  <div className="mb-6 flex flex-wrap gap-2">
                    {(project.attributes?.field_technologies || "").split(",").map((tech: string, i: number) => (
                      <Badge key={i} variant="secondary">
                        {tech.trim()}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-auto flex gap-4">
                    {project.attributes?.field_link && (
                      <Button asChild variant="default" size="sm" className="gap-2">
                        <Link href={project.attributes.field_link} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                          Demo
                        </Link>
                      </Button>
                    )}
                    {project.attributes?.field_github && (
                      <Button asChild variant="outline" size="sm" className="gap-2">
                        <Link href={project.attributes.field_github} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4" />
                          Código
                        </Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

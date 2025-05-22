"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Calendar, Briefcase, Tag, ChevronRight, ExternalLink, Github } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Project } from "@/types/project"
import { Image as ImageType } from "@/types/file"

interface ProjectCardProps {
  project: Project
  index: number
  onProjectSelect: (project: Project) => void
}

export function ProjectCard({ project, index, onProjectSelect }: ProjectCardProps) {
  // Formatear fecha
  const formatDate = (dateString: string | null) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES", { year: "numeric", month: "long" })
  }

  const techStacks = project.relationships.field_tech_stacks.data.map((tech) => tech.attributes.name)
  const roles = project.relationships.field_roles.data.map((role) => role.attributes.name)
  const tasks = project.attributes.field_taks || []
  const thumbnailData = project.relationships.field_thumbnail.data as ImageType
  const thumbnailUrl = thumbnailData?.attributes?.uri?.url || "/placeholder.svg"
  const galleryUrls = project.relationships.field_gallery.data.map((image) => image.attributes.uri.url)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Card className="overflow-hidden h-full flex flex-col group">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={thumbnailUrl}
            alt={project.attributes.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="secondary"
                  size="sm"
                  className="gap-2"
                  onClick={() => onProjectSelect(project)}
                >
                  Ver Detalles
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{project.attributes.title}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                  {/* Galería de imágenes */}
                  {galleryUrls.length > 0 && (
                    <div className="grid grid-cols-2 gap-4">
                      {galleryUrls.map((url, idx) => (
                        <div key={idx} className="relative h-48 rounded-md overflow-hidden">
                          <Image
                            src={url}
                            alt={`Imagen ${idx + 1} del proyecto ${project.attributes.title}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Detalles del proyecto */}
                  <div className="space-y-4">
                    {/* Fecha */}
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {formatDate(project.attributes.field_start_date)} -{" "}
                        {project.attributes.field_is_current ? "Presente" : formatDate(project.attributes.field_end_date || "")}
                      </span>
                    </div>

                    {/* Descripción */}
                    {project.attributes.body?.value && (
                      <div
                        className="prose dark:prose-invert"
                        dangerouslySetInnerHTML={{
                          __html: project.attributes.body.value,
                        }}
                      />
                    )}

                    {/* Tecnologías */}
                    {techStacks.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium flex items-center gap-2 mb-2">
                          <Tag className="h-4 w-4" />
                          Tecnologías
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {techStacks.map((tech, idx) => (
                            <Badge key={idx} variant="secondary">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Roles */}
                    {roles.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium flex items-center gap-2 mb-2">
                          <Briefcase className="h-4 w-4" />
                          Roles
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {roles.map((role, idx) => (
                            <Badge key={idx} variant="outline">
                              {role}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Tareas */}
                    {tasks.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium mb-2">Responsabilidades</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          {tasks.map((task, idx) => (
                            <li key={idx}>{task}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <CardContent className="flex flex-col flex-grow p-6">
          <h3 className="mb-2 text-xl font-bold">{project.attributes.title}</h3>
          <p className="mb-4 text-muted-foreground line-clamp-3">
            {project.attributes.body?.summary}
          </p>

          {/* Tecnologías */}
          {techStacks.length > 0 && (
            <div className="mb-6 flex flex-wrap gap-2">
              {techStacks.slice(0, 3).map((tech, idx) => (
                <Badge key={idx} variant="secondary">
                  {tech}
                </Badge>
              ))}
              {techStacks.length > 3 && (
                <Badge variant="outline">+{techStacks.length - 3}</Badge>
              )}
            </div>
          )}

          {/* Fecha */}
          <div className="mt-auto text-sm text-muted-foreground mb-4">
            {formatDate(project.attributes.field_start_date)} - {project.attributes.field_is_current ? "Presente" : formatDate(project.attributes.field_end_date || "")}
          </div>

          {/* Enlaces */}
          <div className="flex gap-4 flex-wrap">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="default"
                  size="sm"
                  className="gap-2"
                  onClick={() => onProjectSelect(project)}
                >
                  Ver Detalles
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </DialogTrigger>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
} 
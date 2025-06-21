"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Calendar, Briefcase, Tag, ChevronRight, ExternalLink, Github } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Project } from "@/types/project"
import { Image as ImageData } from "@/types/file"
import { formatDate } from "@/lib/utils/date"

interface ProjectCardProps {
  project: Project
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const techStacks = project.relationships.field_tech_stacks.data.map((tech) => tech.attributes.name)
  const roles = project.relationships.field_roles.data.map((role) => role.attributes.name)
  const tasks = project.attributes.field_taks || []
  
  const thumbnailData = project.relationships.field_thumbnail.data as unknown as ImageData[]
  const thumbnailUrl = thumbnailData[0]?.attributes?.uri?.url || "/placeholder.webp"

  const projectTypes = project.relationships.field_project_types.data.map((type) => type.attributes.name)

  // Usar el ID del proyecto para la URL
  const projectUrl = `${project.attributes.path.alias}`

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Card className="overflow-hidden h-full flex flex-col group hover:shadow-lg transition-shadow duration-300">
        <Link href={projectUrl} className="block">
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={thumbnailUrl}
              alt={project.attributes.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              quality={75}
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <Button
                variant="secondary"
                size="sm"
                className="gap-2 pointer-events-none"
              >
                Ver Detalles
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Link>
        
        <CardContent className="flex flex-col flex-grow p-6">
          <Link href={projectUrl} className="block group-hover:text-primary transition-colors">
            <h3 className="mb-2 text-xl font-bold">{project.attributes.title}</h3>
          </Link>
          
          <p className="mb-4 text-muted-foreground line-clamp-3">
            {project.attributes.body?.summary}
          </p>

          {/* Tipos de proyecto */}
          {projectTypes.length > 0 && (
            <div className="mb-6 flex flex-wrap gap-2">
              {projectTypes.map((type, idx) => (
                <Badge key={idx} variant="outline">
                  {type}
                </Badge>
              ))}
            </div>
          )}

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
            {formatDate(project.attributes.field_start_date)} - {
              project.attributes.field_is_current 
                ? "Presente" 
                : formatDate(project.attributes.field_end_date)
            }
          </div>

          {/* Enlaces */}
          <div className="flex gap-4 flex-wrap">
            <Button asChild variant="default" size="sm" className="gap-2">
              <Link href={projectUrl}>
                Ver Detalles
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
} 
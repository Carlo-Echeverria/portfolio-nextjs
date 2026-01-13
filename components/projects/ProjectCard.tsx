"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Calendar, Tag, ChevronRight, Building2, CheckCircle2 } from "lucide-react"
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
  const backendStack = project.relationships.field_backend_stack?.data.map((tech) => tech.attributes.name) || []
  const frontendStack = project.relationships.field_frontend_stack?.data.map((tech) => tech.attributes.name) || []
  const projectTypes = project.relationships.field_project_types.data.map((type) => type.attributes.name)
  
  const thumbnailData = project.relationships.field_thumbnail.data as unknown as ImageData
  const thumbnailUrl = (thumbnailData && 'attributes' in thumbnailData)
    ? thumbnailData.attributes?.uri?.url || "/placeholder.webp"
    : "/placeholder.webp"

  // Usar el path alias para la URL
  const projectUrl = project.attributes.path?.alias || `/projects/${project.id}`
  
  // Resumen: usar field_summary si existe, sino body.summary
  const summary = project.attributes.field_summary || project.attributes.body?.summary || ""

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
            {/* Badge de estado en la esquina superior */}
            {project.attributes.field_project_status && (
              <div className="absolute top-2 right-2">
                <Badge 
                  variant={project.attributes.field_project_status === 'Completado' ? 'default' : 'secondary'}
                  className="shadow-lg"
                >
                  {project.attributes.field_project_status}
                </Badge>
              </div>
            )}
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
          <div className="mb-2">
            <Link href={projectUrl} className="block group-hover:text-primary transition-colors">
              <h3 className="text-xl font-bold mb-2">{project.attributes.title}</h3>
            </Link>
            {/* Sector */}
            {project.attributes.field_sector && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                <Building2 className="h-3 w-3" />
                <span>{project.attributes.field_sector}</span>
              </div>
            )}
          </div>
          
          {/* Resumen */}
          {summary && (
            <p className="mb-4 text-muted-foreground line-clamp-3 text-sm">
              {summary}
            </p>
          )}

          {/* Tipos de proyecto */}
          {projectTypes.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-2">
              {projectTypes.map((type, idx) => (
                <Badge key={idx} variant="outline" className="text-xs">
                  {type}
                </Badge>
              ))}
            </div>
          )}

          {/* Stack Tecnológico - Mostrar backend y frontend si están disponibles, sino tecnologías generales */}
          {(backendStack.length > 0 || frontendStack.length > 0 || techStacks.length > 0) && (
            <div className="mb-4 space-y-2">
              {backendStack.length > 0 && (
                <div>
                  <span className="text-xs font-semibold text-muted-foreground mb-1 block">Backend:</span>
                  <div className="flex flex-wrap gap-1">
                    {backendStack.slice(0, 2).map((tech, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {backendStack.length > 2 && (
                      <Badge variant="outline" className="text-xs">+{backendStack.length - 2}</Badge>
                    )}
                  </div>
                </div>
              )}
              {frontendStack.length > 0 && (
                <div>
                  <span className="text-xs font-semibold text-muted-foreground mb-1 block">Frontend:</span>
                  <div className="flex flex-wrap gap-1">
                    {frontendStack.slice(0, 2).map((tech, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {frontendStack.length > 2 && (
                      <Badge variant="outline" className="text-xs">+{frontendStack.length - 2}</Badge>
                    )}
                  </div>
                </div>
              )}
              {techStacks.length > 0 && backendStack.length === 0 && frontendStack.length === 0 && (
                <div className="flex flex-wrap gap-1">
                  {techStacks.slice(0, 3).map((tech, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                  {techStacks.length > 3 && (
                    <Badge variant="outline" className="text-xs">+{techStacks.length - 3}</Badge>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Metodología */}
          {project.attributes.field_methodology && project.attributes.field_methodology.length > 0 && (
            <div className="mb-4">
              <span className="text-xs font-semibold text-muted-foreground block mb-1">Metodología:</span>
              <div className="flex flex-wrap gap-1">
                {project.attributes.field_methodology.map((method, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs">
                    {method}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Fecha */}
          <div className="mt-auto text-xs text-muted-foreground mb-4 flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>
              {formatDate(project.attributes.field_start_date)} - {
                project.attributes.field_is_current 
                  ? "Presente" 
                  : project.attributes.field_end_date
                    ? formatDate(project.attributes.field_end_date)
                    : "En curso"
              }
            </span>
          </div>

          {/* Enlaces */}
          <div className="flex gap-2 flex-wrap">
            <Button asChild variant="default" size="sm" className="gap-2 flex-1">
              <Link href={projectUrl}>
                Ver Detalles
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
            {project.attributes.field_project_url && (
              <Button asChild variant="outline" size="sm" className="gap-2">
                <a href={project.attributes.field_project_url} target="_blank" rel="noopener noreferrer">
                  <ChevronRight className="h-4 w-4" />
                </a>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
} 
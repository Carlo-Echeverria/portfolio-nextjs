import { Metadata } from "next";
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, Briefcase, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { getProfile } from "@/services/profileService"
import { Project } from "@/types/project"
import { formatDate } from "@/lib/utils/date"
import { sanitizeHtml } from "@/lib/utils"

interface ProjectPageProps {
  params: {
    id: string
  }
}

// Generar parámetros estáticos para todos los proyectos usando path alias
export async function generateStaticParams() {
  try {
    const profile = await getProfile(3)
    const projects = profile?.relationships?.field_projects?.data || []

    return projects
      .filter(project => project.attributes.path?.alias)
      .map((project) => ({
        id: project.attributes.path.alias.replace('/projects/', ''),
      }))

  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

async function getProject(pathSlug: string): Promise<Project | null> {
  try {
    const profile = await getProfile(3)
    const projects = profile?.relationships?.field_projects?.data || []
    
    // Buscar el proyecto por path alias
    // El pathSlug viene de la URL amigable, pero usamos el ID real del proyecto para consultas
    const project = projects.find(p => {
      const projectSlug = p.attributes.path?.alias?.replace('/projects/', '')
      return projectSlug === pathSlug
    })
    
    if (!project) {
      return null
    }
    
    // Aquí podríamos hacer consultas adicionales usando project.id si fuera necesario
    // Por ejemplo: const additionalData = await getProjectDetails(project.id)
    
    return project
  } catch (error) {
    console.error('Error fetching project:', error)
    return null
  }
}

// Generar metadatos dinámicos
export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { id } = await params
  const project = await getProject(id)
  
  if (!project) {
    return {
      title: "Proyecto no encontrado | Carlo Echeverría - Desarrollador Full Stack",
      description: "El proyecto solicitado no existe o no está disponible."
    }
  }

  const thumbnailData = project.relationships.field_thumbnail.data as any[]
  const thumbnailUrl = thumbnailData[0]?.attributes?.uri?.url || "/placeholder.webp"
  
  // Crear keywords basados en las tecnologías y roles del proyecto
  const techStacks = project.relationships.field_tech_stacks.data.map((tech) => tech.attributes.name)
  const roles = project.relationships.field_roles.data.map((role) => role.attributes.name)
  const projectTypes = project.relationships.field_project_types.data.map((type) => type.attributes.name)
  
  const projectKeywords = [
    ...techStacks,
    ...roles,
    ...projectTypes,
    "proyecto desarrollo",
    "caso de estudio",
    "portfolio",
    "Carlo Echeverría",
    project.attributes.title
  ]

  return {
    title: `${project.attributes.title} | Carlo Echeverría - Desarrollador Full Stack`,
    description: project.attributes.body?.summary || `Detalles del proyecto ${project.attributes.title}`,
    keywords: projectKeywords.join(", "),
    openGraph: {
      title: project.attributes.title,
      description: project.attributes.body?.summary,
      images: [thumbnailUrl],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: project.attributes.title,
      description: project.attributes.body?.summary,
    }
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params
  const project = await getProject(id)

  if (!project) {
    notFound()
  }

  const techStacks = project.relationships.field_tech_stacks.data.map((tech) => tech.attributes.name)
  const roles = project.relationships.field_roles.data.map((role) => role.attributes.name)
  const projectTypes = project.relationships.field_project_types.data.map((type) => type.attributes.name)
  const tasks = project.attributes.field_taks || []
  
  const thumbnailData = project.relationships.field_thumbnail.data as any[]
  const thumbnailUrl = thumbnailData[0]?.attributes?.uri?.url || "/placeholder.webp"
  const galleryUrls = project.relationships.field_gallery.data.map((image) => image.attributes.uri.url)

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 md:px-6 py-24">
        <div className="mx-auto max-w-4xl">
          {/* Navegación */}
          <div className="mb-8">
            <Button asChild variant="ghost" className="gap-2 p-0 h-auto">
              <Link href="/#projects">
                <ArrowLeft className="h-4 w-4" />
                Volver a proyectos
              </Link>
            </Button>
          </div>

          {/* Header del proyecto */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
              {project.attributes.title}
            </h1>
            
            {/* Metadatos */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 mb-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>
                  {formatDate(project.attributes.field_start_date)} - {
                    project.attributes.field_is_current 
                      ? "Presente" 
                      : formatDate(project.attributes.field_end_date)
                  }
                </span>
              </div>
            </div>

            {/* Resumen */}
            {project.attributes.body?.summary && (
              <p className="text-xl text-muted-foreground">
                {project.attributes.body.summary}
              </p>
            )}
          </div>

          {/* Imagen principal */}
          <div className="relative h-96 w-full rounded-lg overflow-hidden mb-12">
            <Image
              src={thumbnailUrl}
              alt={project.attributes.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Información del proyecto */}
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Contenido principal */}
            <div className="lg:col-span-2 space-y-8">
              {/* Descripción */}
              {project.attributes.body?.value && (
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-4">Descripción del Proyecto</h2>
                    <div
                      className="prose dark:prose-invert max-w-none"
                      dangerouslySetInnerHTML={{
                        __html: sanitizeHtml(project.attributes.body.value),
                      }}
                    />
                  </CardContent>
                </Card>
              )}

              {/* Responsabilidades */}
              {tasks.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-4">Responsabilidades</h2>
                    <ul className="list-disc pl-5 space-y-2">
                      {tasks.map((task, idx) => (
                        <li key={idx} className="text-muted-foreground">
                          {task}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Galería */}
              {galleryUrls.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-4">Galería</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {galleryUrls.map((url, idx) => (
                        <div key={idx} className="relative h-48 rounded-md overflow-hidden">
                          <Image
                            src={url}
                            alt={`Imagen ${idx + 1} del proyecto ${project.attributes.title}`}
                            fill
                            className="object-cover transition-transform duration-300 hover:scale-105"
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Tipo de proyecto */}
              {projectTypes.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold flex items-center gap-2 mb-3">
                      <Tag className="h-5 w-5" />
                      Tipo de Proyecto
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {projectTypes.map((type, idx) => (
                        <Badge key={idx} variant="outline">
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Tecnologías */}
              {techStacks.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold flex items-center gap-2 mb-3">
                      <Tag className="h-5 w-5" />
                      Tecnologías
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {techStacks.map((tech, idx) => (
                        <Badge key={idx} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Roles */}
              {roles.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold flex items-center gap-2 mb-3">
                      <Briefcase className="h-5 w-5" />
                      Roles
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {roles.map((role, idx) => (
                        <Badge key={idx} variant="outline">
                          {role}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Navegación inferior */}
          <div className="mt-12 pt-8 border-t">
            <div className="flex justify-center">
              <Button asChild variant="outline">
                <Link href="/projects">
                  Ver todos los proyectos
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
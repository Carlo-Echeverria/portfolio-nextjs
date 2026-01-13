import { Metadata } from "next";
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { 
  ArrowLeft, 
  Calendar, 
  Briefcase, 
  Tag, 
  ExternalLink, 
  Github, 
  FileText,
  Target,
  Users,
  Code,
  CheckCircle2,
  Lightbulb,
  TrendingUp,
  BookOpen,
  Building2,
  Layers,
  Puzzle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getProfile } from "@/services/profileService"
import { Project } from "@/types/project"
import { formatDate } from "@/lib/utils/date"
import { sanitizeHtml } from "@/lib/utils"
import { Image as ImageData } from "@/types/file"

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
    const project = projects.find(p => {
      const projectSlug = p.attributes.path?.alias?.replace('/projects/', '')
      return projectSlug === pathSlug
    })
    
    if (!project) {
      return null
    }
    
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
      title: "Proyecto no encontrado | Carlo Echeverría - Desarrollador Full Stack | Portfolio",
      description: "El proyecto que estás buscando no existe o no está disponible en este momento. Te invitamos a explorar otros trabajos en el portafolio."
    }
  }

  const thumbnailData = project.relationships.field_thumbnail.data as unknown as ImageData
  const thumbnailUrl = (thumbnailData && 'attributes' in thumbnailData) 
    ? thumbnailData.attributes?.uri?.url || "/placeholder.webp"
    : "/placeholder.webp"
  
  // Crear keywords basados en las tecnologías y roles del proyecto
  const techStacks = project.relationships.field_tech_stacks.data.map((tech) => tech.attributes.name)
  const roles = project.relationships.field_roles.data.map((role) => role.attributes.name)
  const projectTypes = project.relationships.field_project_types.data.map((type) => type.attributes.name)
  
  const projectKeywords = [
    ...techStacks,
    ...roles,
    ...projectTypes,
    project.attributes.field_keywords?.split(',').map(k => k.trim()) || [],
    "proyecto desarrollo",
    "caso de estudio",
    "portfolio",
    "Carlo Echeverría",
    project.attributes.title
  ].flat()

  return {
    title: `${project.attributes.title} | Carlo Echeverría - Desarrollador Full Stack | Portfolio`,
    description: project.attributes.field_meta_description || project.attributes.body?.summary || `Detalles del proyecto ${project.attributes.title}`,
    keywords: projectKeywords.join(", "),
    openGraph: {
      title: project.attributes.title,
      description: project.attributes.field_meta_description || project.attributes.body?.summary,
      images: [thumbnailUrl],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: project.attributes.title,
      description: project.attributes.field_meta_description || project.attributes.body?.summary,
    }
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params
  const project = await getProject(id)

  if (!project) {
    notFound()
  }

  // Extraer datos de relaciones
  const techStacks = project.relationships.field_tech_stacks.data.map((tech) => tech.attributes.name)
  const backendStack = project.relationships.field_backend_stack?.data.map((tech) => tech.attributes.name) || []
  const frontendStack = project.relationships.field_frontend_stack?.data.map((tech) => tech.attributes.name) || []
  const toolsPlatforms = project.relationships.field_tools_platforms?.data.map((tech) => tech.attributes.name) || []
  const roles = project.relationships.field_roles.data.map((role) => role.attributes.name)
  const mainRole = project.relationships.field_main_role?.data && 'attributes' in project.relationships.field_main_role.data 
    ? project.relationships.field_main_role.data.attributes.name 
    : null
  const projectTypes = project.relationships.field_project_types.data.map((type) => type.attributes.name)
  const tasks = project.attributes.field_taks || []
  
  // Extraer imágenes
  const thumbnailData = project.relationships.field_thumbnail.data as unknown as ImageData
  const thumbnailUrl = (thumbnailData && 'attributes' in thumbnailData) 
    ? thumbnailData.attributes?.uri?.url || "/placeholder.webp"
    : "/placeholder.webp"
  
  const heroImageData = project.relationships.field_project_hero?.data as unknown as ImageData
  const heroImageUrl = (heroImageData && 'attributes' in heroImageData)
    ? heroImageData.attributes?.uri?.url || thumbnailUrl
    : thumbnailUrl
  
  const galleryImages = project.relationships.field_gallery.data as unknown as ImageData[]
  const galleryUrls = galleryImages.map((image) => image.attributes.uri.url)
  
  const diagramsData = project.relationships.field_diagrams?.data as unknown as ImageData[]
  const diagramsUrls = diagramsData?.map((image) => image.attributes.uri.url) || []

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 md:px-6 py-24">
        <div className="mx-auto max-w-6xl">
          {/* Navegación */}
          <div className="mb-8">
            <Button asChild variant="ghost" className="gap-2 p-0 px-3 h-9">
              <Link href="/projects">
                <ArrowLeft className="h-4 w-4" />
                Volver a proyectos
              </Link>
            </Button>
          </div>

          {/* Header del proyecto */}
          <div className="mb-12">
            <div className="flex flex-wrap gap-2 mb-4">
              {project.attributes.field_project_status && (
                <Badge variant={project.attributes.field_project_status === 'Completado' ? 'default' : 'secondary'}>
                  {project.attributes.field_project_status}
                </Badge>
              )}
              {project.attributes.field_sector && (
                <Badge variant="outline">
                  <Building2 className="h-3 w-3 mr-1" />
                  {project.attributes.field_sector}
                </Badge>
              )}
            </div>
            
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
                      : project.attributes.field_end_date 
                        ? formatDate(project.attributes.field_end_date)
                        : "En curso"
                  }
                </span>
              </div>
              {project.attributes.field_methodology && project.attributes.field_methodology.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap">
                  <Users className="h-4 w-4" />
                  <div className="flex flex-wrap gap-1">
                    {project.attributes.field_methodology.map((method, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {method}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Resumen */}
            {(project.attributes.field_summary || project.attributes.body?.summary) && (
              <p className="text-xl text-muted-foreground mb-4">
                {project.attributes.field_summary || project.attributes.body?.summary}
              </p>
            )}

            {/* Objetivo */}
            {project.attributes.field_objective && (
              <Card className="mb-6 border-primary/20 bg-primary/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Target className="h-5 w-5" />
                    Objetivo del Proyecto
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    className="prose dark:prose-invert max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: sanitizeHtml(project.attributes.field_objective),
                    }}
                  />
                </CardContent>
              </Card>
            )}

            {/* Enlaces externos */}
            {(project.attributes.field_project_url || 
              project.attributes.field_repository_url || 
              project.attributes.field_case_study_url || 
              project.attributes.field_technical_docs_url) && (
              <div className="flex flex-wrap gap-2 mb-6">
                {project.attributes.field_project_url && (
                  <Button asChild variant="default" size="sm" className="gap-2">
                    <a href={project.attributes.field_project_url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                      Ver Proyecto
                    </a>
                  </Button>
                )}
                {project.attributes.field_repository_url && (
                  <Button asChild variant="outline" size="sm" className="gap-2">
                    <a href={project.attributes.field_repository_url} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4" />
                      Repositorio
                    </a>
                  </Button>
                )}
                {project.attributes.field_case_study_url && (
                  <Button asChild variant="outline" size="sm" className="gap-2">
                    <a href={project.attributes.field_case_study_url} target="_blank" rel="noopener noreferrer">
                      <FileText className="h-4 w-4" />
                      Caso de Estudio
                    </a>
                  </Button>
                )}
                {project.attributes.field_technical_docs_url && (
                  <Button asChild variant="outline" size="sm" className="gap-2">
                    <a href={project.attributes.field_technical_docs_url} target="_blank" rel="noopener noreferrer">
                      <BookOpen className="h-4 w-4" />
                      Documentación
                    </a>
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Imagen principal (Hero o Thumbnail) */}
          <div className="relative h-96 w-full rounded-lg overflow-hidden mb-12">
            <Image
              src={heroImageUrl}
              alt={project.attributes.title}
              fill
              className="object-cover"
              priority
              quality={75}
            />
          </div>

          {/* Información del proyecto */}
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Contenido principal */}
            <div className="lg:col-span-2 space-y-8">
              {/* Contexto del Proyecto */}
              {project.attributes.field_project_context && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Layers className="h-5 w-5" />
                      Contexto del Proyecto
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div
                      className="prose dark:prose-invert max-w-none"
                      dangerouslySetInnerHTML={{
                        __html: sanitizeHtml(project.attributes.field_project_context),
                      }}
                    />
                  </CardContent>
                </Card>
              )}

              {/* Descripción Completa */}
              {project.attributes.body?.value && (
                <Card>
                  <CardHeader>
                    <CardTitle>Descripción del Proyecto</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div
                      className="prose dark:prose-invert max-w-none"
                      dangerouslySetInnerHTML={{
                        __html: sanitizeHtml(project.attributes.body.value),
                      }}
                    />
                  </CardContent>
                </Card>
              )}

              {/* Características Principales */}
              {project.attributes.field_features && project.attributes.field_features.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5" />
                      Características Principales
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-2">
                      {project.attributes.field_features.map((feature, idx) => (
                        <li key={idx} className="text-muted-foreground">
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Desafíos Técnicos */}
              {project.attributes.field_challenges && project.attributes.field_challenges.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Puzzle className="h-5 w-5" />
                      Desafíos Técnicos
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-2">
                      {project.attributes.field_challenges.map((challenge, idx) => (
                        <li key={idx} className="text-muted-foreground">
                          {challenge}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Soluciones Implementadas */}
              {project.attributes.field_solutions && project.attributes.field_solutions.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lightbulb className="h-5 w-5" />
                      Soluciones Implementadas
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-2">
                      {project.attributes.field_solutions.map((solution, idx) => (
                        <li key={idx} className="text-muted-foreground">
                          {solution}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Arquitectura/Enfoque Técnico */}
              {project.attributes.field_architecture && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Code className="h-5 w-5" />
                      Arquitectura y Enfoque Técnico
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div
                      className="prose dark:prose-invert max-w-none"
                      dangerouslySetInnerHTML={{
                        __html: sanitizeHtml(project.attributes.field_architecture),
                      }}
                    />
                  </CardContent>
                </Card>
              )}

              {/* Integraciones */}
              {project.attributes.field_integrations && project.attributes.field_integrations.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Puzzle className="h-5 w-5" />
                      Integraciones
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-2">
                      {project.attributes.field_integrations.map((integration, idx) => (
                        <li key={idx} className="text-muted-foreground">
                          {integration}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Resultados e Impacto */}
              {(project.attributes.field_results || 
                project.attributes.field_success_metrics || 
                project.attributes.field_technical_impact) && (
                <Card className="border-primary/20 bg-primary/5">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Resultados e Impacto
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {project.attributes.field_results && (
                      <div>
                        <h4 className="font-semibold mb-2">Resultados</h4>
                        <div
                          className="prose dark:prose-invert max-w-none"
                          dangerouslySetInnerHTML={{
                            __html: sanitizeHtml(project.attributes.field_results),
                          }}
                        />
                      </div>
                    )}
                    {project.attributes.field_success_metrics && (
                      <div>
                        <h4 className="font-semibold mb-2">Métricas de Éxito</h4>
                        <div
                          className="prose dark:prose-invert max-w-none"
                          dangerouslySetInnerHTML={{
                            __html: sanitizeHtml(project.attributes.field_success_metrics),
                          }}
                        />
                      </div>
                    )}
                    {project.attributes.field_technical_impact && (
                      <div>
                        <h4 className="font-semibold mb-2">Impacto Técnico</h4>
                        <div
                          className="prose dark:prose-invert max-w-none"
                          dangerouslySetInnerHTML={{
                            __html: sanitizeHtml(project.attributes.field_technical_impact),
                          }}
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Lecciones Aprendidas */}
              {project.attributes.field_lessons_learned && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Lecciones Aprendidas
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div
                      className="prose dark:prose-invert max-w-none"
                      dangerouslySetInnerHTML={{
                        __html: sanitizeHtml(project.attributes.field_lessons_learned),
                      }}
                    />
                  </CardContent>
                </Card>
              )}

              {/* Tareas Principales */}
              {tasks.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5" />
                      Tareas Principales
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
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

              {/* Responsabilidades */}
              {project.attributes.field_responsibilities && project.attributes.field_responsibilities.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5" />
                      Responsabilidades
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-2">
                      {project.attributes.field_responsibilities.map((responsibility, idx) => (
                        <li key={idx} className="text-muted-foreground">
                          {responsibility}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Galería */}
              {galleryUrls.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Galería de Imágenes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {galleryUrls.map((url, idx) => (
                        <div key={idx} className="relative w-full aspect-square rounded-md overflow-hidden">
                          <Image
                            src={url}
                            alt={`Imagen ${idx + 1} del proyecto ${project.attributes.title}`}
                            fill
                            className="object-cover transition-transform duration-300 hover:scale-105"
                            quality={75}
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Diagramas */}
              {diagramsUrls.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Diagramas y Esquemas Técnicos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {diagramsUrls.map((url, idx) => (
                        <div key={idx} className="relative w-full aspect-square rounded-md overflow-hidden border">
                          <Image
                            src={url}
                            alt={`Diagrama ${idx + 1} del proyecto ${project.attributes.title}`}
                            fill
                            className="object-cover"
                            quality={90}
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
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Tag className="h-5 w-5" />
                      Tipo de Proyecto
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
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

              {/* Rol Principal */}
              {mainRole && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Briefcase className="h-5 w-5" />
                      Rol Principal
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Badge variant="default" className="text-sm">
                      {mainRole}
                    </Badge>
                  </CardContent>
                </Card>
              )}

              {/* Roles */}
              {roles.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Briefcase className="h-5 w-5" />
                      Roles
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
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

              {/* Equipo */}
              {project.attributes.field_team_composition && project.attributes.field_team_composition.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Equipo
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {project.attributes.field_team_composition.map((role, idx) => (
                        <Badge key={idx} variant="outline" className="capitalize">
                          {role.replace(/_/g, ' ')}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Stack Tecnológico - Backend */}
              {backendStack.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Code className="h-5 w-5" />
                      Backend
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {backendStack.map((tech, idx) => (
                        <Badge key={idx} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Stack Tecnológico - Frontend */}
              {frontendStack.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Code className="h-5 w-5" />
                      Frontend
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {frontendStack.map((tech, idx) => (
                        <Badge key={idx} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Herramientas y Plataformas */}
              {toolsPlatforms.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Layers className="h-5 w-5" />
                      Herramientas y Plataformas
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {toolsPlatforms.map((tech, idx) => (
                        <Badge key={idx} variant="outline">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Tecnologías (General) */}
              {techStacks.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Tag className="h-5 w-5" />
                      Tecnologías
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
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

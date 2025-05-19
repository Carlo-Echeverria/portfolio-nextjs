"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Calendar, Briefcase, Tag, ChevronRight, ExternalLink, Github } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Project } from "@/types/project";

export function ProjectsSection({ projectsProps }: { projectsProps: Project[] }) {
  
  const [selectedProject, setSelectedProject] = useState<any>(null)

  // Datos estáticos de proyectos
  const projects = [
    {
      id: "1",
      title: "Desarrollador Drupal y Acquia Cloud: Realmedia Network",
      summary:
        "Desarrollador full stack especializado en Drupal, implementando soluciones con herramientas avanzadas de Acquia como Acquia Site Studio, Acquia Cloud Platform. Desarrollo de módulos y temas personalizados de Drupal.",
      description:
        "<p>Drupal 9, Drupal 10, Drupal 11, Acquia, Pantheon, Acquia Site Studio, Acquia Cloud Platform, PHP, JavaScript, CI/CD, Docker, Lando, GitLab, Site Building, Theme Development, Module Development</p>",
      startDate: "2022-08-01",
      endDate: null,
      isCurrent: true,
      thumbnail: "/placeholder.svg?height=400&width=600",
      gallery: ["/placeholder.svg?height=300&width=500", "/placeholder.svg?height=300&width=500"],
      techStacks: ["Drupal", "Acquia", "Pantheon", "PHP", "JavaScript"],
      roles: ["Frontend development", "Fullstack development"],
      projectTypes: ["Equipo"],
      tasks: [
        "Desarrollo de interfaces de usuario con Acquia Site Studio, reduciendo la dependencia de código y facilitando la administración de contenido.",
        "Desarrollo e implementación de módulos y temas personalizados en Drupal 9 y 10, optimizando el rendimiento y la modularidad del código.",
        "Gestión y despliegue de proyectos en la nube con Acquia y Pantheon, asegurando alta disponibilidad y escalabilidad de entornos productivos y de staging.",
        "Automatización de flujos de trabajo CI/CD en GitLab, integrando procesos de prueba y despliegue continuo para mejorar la eficiencia y reducir el tiempo de entrega.",
        "Soporte en migración de contenido, actualización del core de Drupal, asegurando la compatibilidad de configuraciones, módulos y temas personalizados.",
      ],
      demoUrl: "https://ejemplo.com",
      githubUrl: "https://github.com/ejemplo",
    },
    {
      id: "2",
      title: "Aplicación Web de Gestión de Proyectos",
      summary:
        "Desarrollo de una aplicación web para la gestión de proyectos y seguimiento de tareas, con funcionalidades de colaboración en tiempo real.",
      description:
        "<p>Aplicación web desarrollada con React, Node.js y MongoDB para la gestión eficiente de proyectos y tareas. Incluye funcionalidades como asignación de tareas, seguimiento de tiempo, colaboración en tiempo real y generación de informes.</p>",
      startDate: "2021-03-15",
      endDate: "2022-06-30",
      isCurrent: false,
      thumbnail: "/placeholder.svg?height=400&width=600",
      gallery: ["/placeholder.svg?height=300&width=500", "/placeholder.svg?height=300&width=500"],
      techStacks: ["React", "Node.js", "MongoDB", "Socket.io", "Express"],
      roles: ["Frontend development", "Backend development"],
      projectTypes: ["Equipo"],
      tasks: [
        "Desarrollo del frontend con React y Material-UI para una interfaz intuitiva y responsiva.",
        "Implementación de una API RESTful con Node.js y Express para la gestión de datos.",
        "Diseño y optimización de la base de datos MongoDB para almacenar información de proyectos y usuarios.",
        "Integración de Socket.io para funcionalidades de colaboración en tiempo real.",
        "Implementación de autenticación JWT y control de acceso basado en roles.",
      ],
      demoUrl: "https://ejemplo2.com",
      githubUrl: "https://github.com/ejemplo2",
    },
    {
      id: "3",
      title: "E-commerce para Tienda de Ropa",
      summary:
        "Plataforma de comercio electrónico para una tienda de ropa, con catálogo de productos, carrito de compras y pasarela de pagos.",
      description:
        "<p>Desarrollo de una plataforma de comercio electrónico completa para una tienda de ropa, con funcionalidades como catálogo de productos, filtrado por categorías, carrito de compras, gestión de usuarios y pasarela de pagos segura.</p>",
      startDate: "2020-05-10",
      endDate: "2021-02-28",
      isCurrent: false,
      thumbnail: "/placeholder.svg?height=400&width=600",
      gallery: ["/placeholder.svg?height=300&width=500", "/placeholder.svg?height=300&width=500"],
      techStacks: ["Next.js", "Strapi", "PostgreSQL", "Stripe", "AWS"],
      roles: ["Fullstack development"],
      projectTypes: ["Freelance"],
      tasks: [
        "Desarrollo del frontend con Next.js para una experiencia de usuario óptima y SEO mejorado.",
        "Implementación de Strapi como CMS headless para la gestión de productos y contenidos.",
        "Integración de Stripe para procesamiento seguro de pagos.",
        "Configuración de AWS S3 para almacenamiento de imágenes y recursos estáticos.",
        "Implementación de funcionalidades como búsqueda, filtrado, carrito de compras y gestión de usuarios.",
      ],
      demoUrl: "https://ejemplo3.com",
      githubUrl: "https://github.com/ejemplo3",
    },
  ]

  // Formatear fecha
  const formatDate = (dateString: string | null) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES", { year: "numeric", month: "long" })
  }

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

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden h-full flex flex-col group">
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={project.thumbnail || "/placeholder.svg"}
                      alt={project.title}
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
                            onClick={() => setSelectedProject(project)}
                          >
                            Ver Detalles
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>{project.title}</DialogTitle>
                          </DialogHeader>
                          <div className="grid gap-6 py-4">
                            {/* Galería de imágenes */}
                            {project.gallery?.length > 0 && (
                              <div className="grid grid-cols-2 gap-4">
                                {project.gallery.map((image, idx) => (
                                  <div key={idx} className="relative h-48 rounded-md overflow-hidden">
                                    <Image
                                      src={image || "/placeholder.svg"}
                                      alt={`Imagen ${idx + 1} del proyecto ${project.title}`}
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
                                  {formatDate(project.startDate)} -{" "}
                                  {project.isCurrent ? "Presente" : formatDate(project.endDate)}
                                </span>
                              </div>

                              {/* Descripción */}
                              {project.description && (
                                <div
                                  className="prose dark:prose-invert"
                                  dangerouslySetInnerHTML={{
                                    __html: project.description,
                                  }}
                                />
                              )}

                              {/* Tecnologías */}
                              {project.techStacks?.length > 0 && (
                                <div>
                                  <h4 className="text-sm font-medium flex items-center gap-2 mb-2">
                                    <Tag className="h-4 w-4" />
                                    Tecnologías
                                  </h4>
                                  <div className="flex flex-wrap gap-2">
                                    {project.techStacks.map((tech, idx) => (
                                      <Badge key={idx} variant="secondary">
                                        {tech}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Roles */}
                              {project.roles?.length > 0 && (
                                <div>
                                  <h4 className="text-sm font-medium flex items-center gap-2 mb-2">
                                    <Briefcase className="h-4 w-4" />
                                    Roles
                                  </h4>
                                  <div className="flex flex-wrap gap-2">
                                    {project.roles.map((role, idx) => (
                                      <Badge key={idx} variant="outline">
                                        {role}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Tareas */}
                              {project.tasks?.length > 0 && (
                                <div>
                                  <h4 className="text-sm font-medium mb-2">Responsabilidades</h4>
                                  <ul className="list-disc pl-5 space-y-1">
                                    {project.tasks.map((task, idx) => (
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
                    <h3 className="mb-2 text-xl font-bold">{project.title}</h3>
                    <p className="mb-4 text-muted-foreground line-clamp-3">{project.summary}</p>

                    {/* Tecnologías */}
                    {project.techStacks?.length > 0 && (
                      <div className="mb-6 flex flex-wrap gap-2">
                        {project.techStacks.slice(0, 3).map((tech, idx) => (
                          <Badge key={idx} variant="secondary">
                            {tech}
                          </Badge>
                        ))}
                        {project.techStacks.length > 3 && (
                          <Badge variant="outline">+{project.techStacks.length - 3}</Badge>
                        )}
                      </div>
                    )}

                    {/* Fecha */}
                    <div className="mt-auto text-sm text-muted-foreground mb-4">
                      {formatDate(project.startDate)} - {project.isCurrent ? "Presente" : formatDate(project.endDate)}
                    </div>

                    {/* Enlaces */}
                    <div className="flex gap-4 flex-wrap">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="default"
                            size="sm"
                            className="gap-2"
                            onClick={() => setSelectedProject(project)}
                          >
                            Ver Detalles
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                      </Dialog>

                      {project.demoUrl && (
                        <Button asChild variant="outline" size="sm" className="gap-2">
                          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                            Demo
                          </a>
                        </Button>
                      )}

                      {project.githubUrl && (
                        <Button asChild variant="ghost" size="sm" className="gap-2">
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4" />
                            Código
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

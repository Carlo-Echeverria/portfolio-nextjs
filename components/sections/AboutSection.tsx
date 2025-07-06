"use client"

import { motion } from "framer-motion"
import { GraduationCap, Briefcase, Calendar, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { sanitizeHtml } from "@/lib/utils"
import { Profile } from "@/types/profile"
import { formatDate } from "@/lib/utils/date"

export function AboutSection({ profile }: { profile : Profile }) {
  
 // Datos estáticos de trayectoria profesional
  // const professionalExperience = [
  //   {
  //     title: "Desarrollador Drupal y Acquia Cloud",
  //     company: "Realmedia Network",
  //     period: "Agosto 2022 - Presente",
  //     location: "Remoto",
  //     description:
  //       "<p>Drupal 9, Drupal 10, Drupal 11, Acquia, Pantheon, Acquia Site Studio, Acquia Cloud Platform, PHP, JavaScript, CI/CD, Docker, Lando, GitLab, Site Building, Theme Development, Module Development</p>",
  //     responsibilities: [
  //       "Desarrollo de interfaces de usuario con Acquia Site Studio, reduciendo la dependencia de código y facilitando la administración de contenido.",
  //       "Desarrollo e implementación de módulos y temas personalizados en Drupal 9 y 10, optimizando el rendimiento y la modularidad del código.",
  //       "Gestión y despliegue de proyectos en la nube con Acquia y Pantheon, asegurando alta disponibilidad y escalabilidad de entornos productivos y de staging.",
  //       "Automatización de flujos de trabajo CI/CD en GitLab, integrando procesos de prueba y despliegue continuo para mejorar la eficiencia y reducir el tiempo de entrega.",
  //       "Soporte en migración de contenido, actualización del core de Drupal, asegurando la compatibilidad de configuraciones, módulos y temas personalizados.",
  //     ],
  //   },
  //   {
  //     title: "Desarrollador Full Stack | Portfolio",
  //     company: "Empresa Anterior",
  //     period: "Enero 2020 - Julio 2022",
  //     location: "Santiago, Chile",
  //     description:
  //       "<p>Desarrollo de aplicaciones web utilizando React, Node.js y bases de datos SQL/NoSQL. Implementación de soluciones escalables y mantenibles.</p>",
  //     responsibilities: [
  //       "Desarrollo de aplicaciones web con React y Next.js para el frontend.",
  //       "Implementación de APIs RESTful con Node.js y Express.",
  //       "Diseño y mantenimiento de bases de datos SQL y NoSQL.",
  //       "Colaboración en equipos ágiles utilizando metodologías Scrum.",
  //     ],
  //   },
  // ]

  // Datos de educación
  const startDateEducation = formatDate(profile.relationships.field_education.data.attributes?.field_start_date);
  const endDateEducation = formatDate(profile.relationships.field_education.data.attributes?.field_start_date);
  const isCurrent = profile.relationships.field_education.data.attributes?.field_is_current;

  const education = {
    degree: profile.relationships?.field_education?.data?.attributes?.field_degree,
    institution: profile.relationships.field_education.data.attributes?.title,
    period: `${startDateEducation} - ${!isCurrent ? endDateEducation : 'Actualidad'}`,
    location: profile.relationships.field_education.data.attributes?.field_address,
  }

  // Datos de biografía
  const bioText = profile.attributes?.body.value

  return (
    <section id="about" className="py-24 bg-gradient-to-b from-background via-background/80 to-muted/30 scroll-mt-[100px]">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto max-w-4xl"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">Sobre Mí</h2>
            <div className="h-1 w-20 bg-primary mx-auto mb-8"></div>
          </div>

          {/* Biografía */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div
              className="prose prose-lg dark:prose-invert mx-auto text-center max-w-3xl"
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(bioText) }}
            />
          </motion.div>

          {/* Trayectoria Profesional */}
          {/* <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 flex items-center justify-center gap-3">
              <Briefcase className="h-6 w-6 text-primary" />
              Trayectoria Profesional
            </h3>

            <div className="space-y-8">
              {professionalExperience.map((job, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="relative overflow-hidden">
                    <div className="absolute top-0 left-0 h-full w-1 bg-primary"></div>
                    <CardContent className="p-6">
                      <h4 className="text-xl font-bold">{job.title}</h4>
                      <p className="text-lg text-primary font-medium">{job.company}</p>

                      <div className="flex flex-wrap gap-x-6 gap-y-2 mt-2 mb-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{job.period}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{job.location}</span>
                        </div>
                      </div>

                      <div
                        className="prose dark:prose-invert mb-4"
                        dangerouslySetInnerHTML={{ __html: sanitizeHtml(job.description) }}
                      />

                      <h5 className="font-semibold mb-2">Responsabilidades:</h5>
                      <ul className="list-disc pl-5 space-y-1">
                        {job.responsibilities.map((responsibility, idx) => (
                          <li key={idx} className="text-muted-foreground">
                            {responsibility}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div> */}

          {/* Educación */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-8 flex items-center justify-center gap-3">
              <GraduationCap className="h-6 w-6 text-primary" />
              Educación
            </h3>

            <Card className="relative overflow-hidden">
              <div className="absolute top-0 left-0 h-full w-1 bg-primary"></div>
              <CardContent className="p-6">
                <h4 className="text-xl font-bold">{education.degree}</h4>
                <p className="text-lg text-primary font-medium">{education.institution}</p>

                <div className="flex flex-wrap gap-x-6 gap-y-2 mt-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{education.period}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{education.location}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

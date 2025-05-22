"use client"

import { motion } from "framer-motion"
import { Server, Database, Cloud, Wrench, Layout, CheckCircle2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Skill } from "@/types/skill"
import { sanitizeHtml } from "@/lib/utils"

export function SkillsSection({ skills }: { skills: Skill[] }) {
 
  // Procesar los datos del skillProfile para llenar las estructuras
  const processedTechnicalSkills: Record<string, any[]> = {
    frontend: [],
    backend: [],
    database: [],
    devops: [],
    tools: [],
  }

  const processedSoftSkills: any[] = []
  const processedMethodologies: any[] = []

  // Procesar cada habilidad del skillProfile
  skills.forEach((skill) => {
    const skillType = skill.relationships.field_skill_types.data[0]?.attributes.name
    const skillData = {
      name: skill.attributes.name,
      level: skill.attributes.field_level || 0,
      years: skill.attributes.field_years || null,
      // Usamos una forma más segura de acceder a description
      description: skill.attributes.description || "",
    }

    // Clasificar según el tipo de habilidad
    if (skillType === "Technical") {
      // Obtener la categoría de la habilidad técnica
      const category = skill.relationships.field_skill_categories.data[0]?.attributes.name.toLowerCase()

      // Mapear la categoría a las claves de processedTechnicalSkills
      let mappedCategory = ""
      if (category === "frontend") mappedCategory = "frontend"
      else if (category === "backend") mappedCategory = "backend"
      else if (category === "database") mappedCategory = "database"
      else if (category === "devops") mappedCategory = "devops"
      else if (category === "tools") mappedCategory = "tools"
      else mappedCategory = "frontend" // Por defecto si no hay categoría

      // Añadir a la categoría correspondiente
      if (processedTechnicalSkills[mappedCategory]) {
        processedTechnicalSkills[mappedCategory].push(skillData)
      }
    } else if (skillType === "Soft") {
      processedSoftSkills.push(skillData)
    } else if (skillType === "Methodology") {
      processedMethodologies.push(skillData)
    }
  })

  // Datos de habilidades técnicas procesados
  const technicalSkills = processedTechnicalSkills

  // Datos de habilidades blandas procesados
  const softSkills = processedSoftSkills

  // Datos de metodologías y procesos procesados
  const methodologies = processedMethodologies

  // Iconos para categorías
  const categoryIcons = {
    frontend: <Layout className="h-6 w-6" />,
    backend: <Server className="h-6 w-6" />,
    database: <Database className="h-6 w-6" />,
    devops: <Cloud className="h-6 w-6" />,
    tools: <Wrench className="h-6 w-6" />,
  }

  return (
    <section id="skills" className="py-24">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto max-w-5xl"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">Mis Habilidades</h2>
            <div className="h-1 w-20 bg-primary mx-auto mb-8"></div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Tecnologías, herramientas y metodologías que domino para crear soluciones efectivas
            </p>
          </div>

          <Tabs defaultValue="technical" className="w-full">
            <TabsList className="w-full flex flex-wrap justify-center mb-8 h-auto p-1 bg-muted/50">
              <TabsTrigger value="technical" className="flex-grow">
                Habilidades Técnicas
              </TabsTrigger>
              <TabsTrigger value="soft" className="flex-grow">
                Habilidades Blandas
              </TabsTrigger>
              <TabsTrigger value="methodologies" className="flex-grow">
                Metodologías
              </TabsTrigger>
            </TabsList>

            {/* Habilidades Técnicas */}
            <TabsContent value="technical" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Columna izquierda: Gráfico de radar */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center justify-center"
                >
                  <Card className="w-full">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-6 text-center">Áreas de Especialización</h3>
                      <div className="relative aspect-square">
                        {/* Aquí iría un gráfico de radar, pero como es complejo de implementar en este contexto,
                            mostramos una visualización alternativa */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-full max-w-md">
                            {Object.entries(technicalSkills).map(([category, skills], index) => {
                              // Calcular el nivel promedio de habilidades en esta categoría
                              const avgLevel =
                                skills.length > 0
                                  ? skills.reduce((sum, skill) => sum + skill.level, 0) / skills.length
                                  : 0

                              return (
                                <div key={category} className="mb-4">
                                  <div className="flex items-center justify-between mb-1">
                                    <div className="flex items-center gap-2">
                                      {categoryIcons[category as keyof typeof categoryIcons]}
                                      <span className="font-medium capitalize">{category}</span>
                                    </div>
                                    <span>{Math.round(avgLevel)}%</span>
                                  </div>
                                  <Progress value={avgLevel} className="h-2" />
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Columna derecha: Habilidades destacadas */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <Card className="w-full h-full">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-6">Tecnologías Destacadas</h3>
                      <div className="space-y-6">
                        {/* Mostrar las habilidades con mayor nivel de cada categoría */}
                        {Object.entries(technicalSkills).flatMap(([category, skills]) =>
                          skills.length > 0
                            ? skills
                                .sort((a, b) => b.level - a.level)
                                .slice(0, 1)
                                .map((skill, idx) => (
                                  <div key={`${category}-${idx}`}>
                                    <div className="flex justify-between mb-1">
                                      <div className="flex items-center gap-2">
                                        {categoryIcons[category as keyof typeof categoryIcons]}
                                        <span className="font-medium">{skill.name}</span>
                                      </div>
                                      <span className="text-muted-foreground">{skill.level}%</span>
                                    </div>
                                    <Progress value={skill.level} className="h-3" />
                                    {skill.years && (
                                      <p className="text-xs text-muted-foreground mt-1">
                                        {skill.years} {skill.years === 1 ? "año" : "años"} de experiencia
                                      </p>
                                    )}
                                  </div>
                                ))
                            : [],
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Categorías de habilidades técnicas */}
              <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {Object.entries(technicalSkills).map(([category, skills], categoryIndex) => {
                  if (skills.length === 0) return null

                  return (
                    <motion.div
                      key={category}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Card>
                        <CardContent className="p-6">
                          <div className="flex items-center gap-2 mb-4">
                            {categoryIcons[category as keyof typeof categoryIcons]}
                            <h3 className="text-xl font-semibold capitalize">{category}</h3>
                          </div>
                          <div className="space-y-4">
                            {skills.map((skill, idx) => (
                              <div key={idx}>
                                <div className="flex justify-between mb-1">
                                  <span className="font-medium">{skill.name}</span>
                                  <span className="text-muted-foreground">{skill.level}%</span>
                                </div>
                                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                                  <motion.div
                                    className="h-full bg-primary"
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${skill.level}%` }}
                                    transition={{ duration: 1, delay: 0.2 + idx * 0.1 }}
                                    viewport={{ once: true }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                })}
              </div>
            </TabsContent>

            {/* Habilidades Blandas */}
            <TabsContent value="soft" className="mt-0">
              <div className="grid gap-8 md:grid-cols-2">
                {/* Visualización de habilidades blandas */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="col-span-1"
                >
                  <Card className="h-full">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-6">Habilidades Interpersonales</h3>
                      <div className="space-y-6">
                        {softSkills.map((skill, idx) => (
                          <div key={idx}>
                            <div className="flex justify-between mb-1">
                              <span className="font-medium">{skill.name}</span>
                              <span className="text-muted-foreground">{skill.level}%</span>
                            </div>
                            <div className="h-3 w-full rounded-full bg-muted overflow-hidden">
                              <motion.div
                                className="h-full bg-primary"
                                initial={{ width: 0 }}
                                whileInView={{ width: `${skill.level}%` }}
                                transition={{ duration: 1, delay: 0.2 + idx * 0.1 }}
                                viewport={{ once: true }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Fortalezas clave */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="col-span-1"
                >
                  <Card className="h-full">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-6">Fortalezas Clave</h3>
                      <ul className="space-y-4">
                        {softSkills
                          .sort((a, b) => b.level - a.level)
                          .slice(0, 4)
                          .map((skill, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                              <div>
                                <h4 className="font-medium">{skill.name}</h4>
                                <div className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: sanitizeHtml(skill.description.value) }}></div>
                              </div>
                            </li>
                          ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </TabsContent>

            {/* Metodologías */}
            <TabsContent value="methodologies" className="mt-0">
              <div className="grid gap-8 md:grid-cols-2">
                {/* Metodologías y procesos */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="col-span-2"
                >
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-6">Metodologías y Procesos</h3>
                      <div className="grid gap-6 md:grid-cols-2">
                        {methodologies.map((methodology, idx) => (
                          <div key={idx}>
                            <div className="flex justify-between mb-1">
                              <span className="font-medium">{methodology.name}</span>
                              <span className="text-muted-foreground">{methodology.level}%</span>
                            </div>
                            <div className="h-3 w-full rounded-full bg-muted overflow-hidden">
                              <motion.div
                                className="h-full bg-primary"
                                initial={{ width: 0 }}
                                whileInView={{ width: `${methodology.level}%` }}
                                transition={{ duration: 1, delay: 0.2 + idx * 0.1 }}
                                viewport={{ once: true }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </section>
  )
}
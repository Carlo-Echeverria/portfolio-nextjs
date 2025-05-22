"use client"

import { motion } from "framer-motion"
import { Server, Database, Cloud, Wrench, Layout } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Skill } from "@/types/skill"
import { SkillCategory } from "./SkillCategory"
import { SkillProgress } from "./SkillProgress"
import { SkillCard } from "./SkillCard"

interface TechnicalSkillsProps {
  skills: Skill[]
}

export function TechnicalSkills({ skills }: TechnicalSkillsProps) {
  // Procesar los datos del skillProfile para llenar las estructuras
  const processedTechnicalSkills: Record<string, Skill[]> = {
    frontend: [],
    backend: [],
    database: [],
    devops: [],
    tools: [],
  }

  // Clasificar según el tipo de habilidad
  skills.forEach((skill) => {
    const skillType = skill.relationships.field_skill_types.data[0]?.attributes.name
    if (skillType === "Technical") {
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
        processedTechnicalSkills[mappedCategory].push(skill)
      }
    }
  })

  // Iconos para categorías
  const categoryIcons = {
    frontend: Layout,
    backend: Server,
    database: Database,
    devops: Cloud,
    tools: Wrench,
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Columna izquierda: Gráfico de radar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center"
        >
          <SkillCard title="Áreas de Especialización" className="w-full">
            <div className="relative aspect-square">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full max-w-md">
                  {Object.entries(processedTechnicalSkills).map(([category, skills], index) => {
                    // Calcular el nivel promedio de habilidades en esta categoría
                    const avgLevel =
                      skills.length > 0
                        ? skills.reduce((sum, skill) => sum + skill.attributes.field_level, 0) / skills.length
                        : 0

                    const Icon = categoryIcons[category as keyof typeof categoryIcons]

                    return (
                      <div key={category} className="mb-4">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            {Icon && <Icon className="h-4 w-4" />}
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
          </SkillCard>
        </motion.div>

        {/* Columna derecha: Habilidades destacadas */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <SkillCard title="Tecnologías Destacadas" className="w-full h-full">
            <div className="space-y-6">
              {Object.entries(processedTechnicalSkills).flatMap(([category, skills]) =>
                skills.length > 0
                  ? skills
                      .sort((a, b) => b.attributes.field_level - a.attributes.field_level)
                      .slice(0, 1)
                      .map((skill, idx) => (
                        <SkillProgress
                          key={`${category}-${idx}`}
                          name={skill.attributes.name}
                          level={skill.attributes.field_level}
                          years={skill.attributes.field_years}
                          showYears
                        />
                      ))
                  : [],
              )}
            </div>
          </SkillCard>
        </motion.div>
      </div>

      {/* Categorías de habilidades técnicas */}
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {Object.entries(processedTechnicalSkills).map(([category, skills], index) => (
          <SkillCategory
            key={category}
            category={category}
            skills={skills}
            icon={categoryIcons[category as keyof typeof categoryIcons]}
            index={index}
          />
        ))}
      </div>
    </div>
  )
} 
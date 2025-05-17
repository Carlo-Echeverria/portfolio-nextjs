"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

interface SkillsSectionProps {
  profile: any
}

export function SkillsSection({ profile }: SkillsSectionProps) {
  // Habilidades de ejemplo (reemplazar con datos reales de la API)
  const skills = profile?.relationships?.field_skills?.data || [
    {
      id: "1",
      attributes: {
        title: "React",
        field_percentage: 90,
        field_category: "frontend",
      },
    },
    {
      id: "2",
      attributes: {
        title: "Next.js",
        field_percentage: 85,
        field_category: "frontend",
      },
    },
    {
      id: "3",
      attributes: {
        title: "TypeScript",
        field_percentage: 80,
        field_category: "frontend",
      },
    },
    {
      id: "4",
      attributes: {
        title: "Node.js",
        field_percentage: 75,
        field_category: "backend",
      },
    },
    {
      id: "5",
      attributes: {
        title: "MongoDB",
        field_percentage: 70,
        field_category: "backend",
      },
    },
    {
      id: "6",
      attributes: {
        title: "GraphQL",
        field_percentage: 65,
        field_category: "backend",
      },
    },
  ]

  // Agrupar habilidades por categoría
  const skillsByCategory: Record<string, any[]> = {}
  skills.forEach((skill: any) => {
    const category = skill.attributes?.field_category || "otros"
    if (!skillsByCategory[category]) {
      skillsByCategory[category] = []
    }
    skillsByCategory[category].push(skill)
  })

  // Mapeo de categorías a nombres legibles
  const categoryNames: Record<string, string> = {
    frontend: "Frontend",
    backend: "Backend",
    design: "Diseño",
    otros: "Otras Habilidades",
  }

  return (
    <section id="skills" className="py-20">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">Mis Habilidades</h2>
          <div className="h-1 w-20 bg-primary mx-auto mb-8"></div>
          <p className="mb-12 text-xl text-muted-foreground">Tecnologías y herramientas con las que trabajo</p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          {Object.entries(skillsByCategory).map(([category, categorySkills], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-6 text-xl font-bold">{categoryNames[category] || category}</h3>
                  <div className="space-y-6">
                    {categorySkills.map((skill: any, index: number) => (
                      <div key={skill.id || index}>
                        <div className="mb-2 flex justify-between">
                          <span className="font-medium">{skill.attributes?.title || "Habilidad"}</span>
                          <span>{skill.attributes?.field_percentage || 0}%</span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                          <motion.div
                            className="h-full bg-primary"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.attributes?.field_percentage || 0}%` }}
                            transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                            viewport={{ once: true }}
                          />
                        </div>
                      </div>
                    ))}
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

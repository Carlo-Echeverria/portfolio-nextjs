"use client"

import { motion } from "framer-motion"
import { CheckCircle2 } from "lucide-react"
import { Skill } from "@/types/skill"
import { SkillCard } from "./SkillCard"
import { SkillProgress } from "./SkillProgress"
import { sanitizeHtml } from "@/lib/utils"

interface SoftSkillsProps {
  skills: Skill[]
}

export function SoftSkills({ skills }: SoftSkillsProps) {
  // Filtrar solo las habilidades blandas
  const softSkills = skills.filter(
    (skill) => skill.relationships.field_skill_types.data[0]?.attributes.name === "Soft"
  )

  return (
    <div className="grid gap-8 md:grid-cols-2">
      {/* Visualización de habilidades blandas */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="col-span-1"
      >
        <SkillCard title="Habilidades Interpersonales" className="h-full">
          <div className="space-y-6">
            {softSkills.map((skill, idx) => (
              <SkillProgress
                key={idx}
                name={skill.attributes.name}
                level={skill.attributes.field_level}
              />
            ))}
          </div>
        </SkillCard>
      </motion.div>

      {/* Fortalezas clave */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="col-span-1"
      >
        <SkillCard title="Fortalezas Clave" className="h-full">
          <ul className="space-y-4">
            {softSkills
              .sort((a, b) => b.attributes.field_level - a.attributes.field_level)
              .slice(0, 4)
              .map((skill, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">{skill.attributes.name}</h4>
                    <div
                      className="text-muted-foreground"
                      dangerouslySetInnerHTML={{
                        __html: sanitizeHtml(skill.attributes.description.value),
                      }}
                    />
                  </div>
                </li>
              ))}
          </ul>
        </SkillCard>
      </motion.div>
    </div>
  )
} 
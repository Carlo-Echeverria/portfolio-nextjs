"use client"

import { motion } from "framer-motion"
import { Skill } from "@/types/skill"
import { SkillCard } from "./SkillCard"
import { SkillProgress } from "./SkillProgress"

interface MethodologySkillsProps {
  skills: Skill[]
}

export function MethodologySkills({ skills }: MethodologySkillsProps) {
  const methodologies = skills.filter(
    (skill) => skill.relationships.field_skill_types.data[0]?.attributes.name === "Methodology"
  )

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="col-span-2"
      >
        <SkillCard title="Metodologías y Procesos">
          <div className="grid gap-6 md:grid-cols-2">
            {methodologies.map((methodology, idx) => (
              <SkillProgress
                key={idx}
                name={methodology.attributes.name}
                level={methodology.attributes.field_level}
              />
            ))}
          </div>
        </SkillCard>
      </motion.div>
    </div>
  )
} 
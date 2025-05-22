"use client"

import { LucideIcon } from "lucide-react"
import { SkillCard } from "./SkillCard"
import { SkillProgress } from "./SkillProgress"
import { Skill } from "@/types/skill"

interface SkillCategoryProps {
  category: string
  skills: Skill[]
  icon: LucideIcon
  index: number
}

export function SkillCategory({ category, skills, icon, index }: SkillCategoryProps) {
  if (skills.length === 0) return null

  return (
    <SkillCard
      title={category}
      icon={icon}
      delay={index * 0.1}
    >
      <div className="space-y-4">
        {skills.map((skill, idx) => (
          <SkillProgress
            key={idx}
            name={skill.attributes.name}
            level={skill.attributes.field_level}
            years={skill.attributes.field_years}
          />
        ))}
      </div>
    </SkillCard>
  )
} 
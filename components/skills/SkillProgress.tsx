"use client"

import { motion } from "framer-motion"

interface SkillProgressProps {
  name: string
  level: number
  years?: number
  showYears?: boolean
  className?: string
}

export function SkillProgress({ name, level, years, showYears = false, className = "" }: SkillProgressProps) {
  return (
    <div className={className}>
      <div className="flex justify-between mb-1">
        <span className="font-medium">{name}</span>
        <span className="text-muted-foreground">{level}%</span>
      </div>
      <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
        <motion.div
          className="h-full bg-primary"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
        />
      </div>
      {showYears && years && (
        <p className="text-xs text-muted-foreground mt-1">
          {years} {years === 1 ? "año" : "años"} de experiencia
        </p>
      )}
    </div>
  )
} 
"use client"

import { motion } from "framer-motion"
import type { Skill } from "@/types/skill"
import { SkillsList } from "@/components/skills/SkillsList"

export function SkillsSection({ skills }: { skills: Skill[] }) {
  return (
    <section id="skills" className="py-12 bg-muted/30">
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

          <SkillsList skills={skills} />
        </motion.div>
      </div>
    </section>
  )
}
"use client"

import React from 'react'
import { motion } from "framer-motion"
import { Experience } from '@/types/experience'
import { TimelineItem } from './TimelineItem'
import { useTimelineAnimation } from '@/hooks/useTimelineAnimation'

interface TimelineExperienceProps {
  experiences: Experience[]
}

export function TimelineExperience({ experiences }: TimelineExperienceProps) {
  const { isItemVisible } = useTimelineAnimation()

  return (
    <section id="experience" className="py-16">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-6">Experiencia</h2>
          <div className="h-1 w-20 bg-primary mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Mi trayectoria profesional y las tecnologías que he utilizado
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Línea vertical */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary opacity-30"></div>
          
          {experiences.map((experience, index) => (
            <div
              key={experience.id}
              data-id={experience.id}
              data-timeline-item
            >
              <TimelineItem
                experience={experience}
                index={index}
                isVisible={isItemVisible(experience.id)}
              />
            </div>
          ))}
        </div>
        
        </div>
      </div>
    </section>
  )
} 
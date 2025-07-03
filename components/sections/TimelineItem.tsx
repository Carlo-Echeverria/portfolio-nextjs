"use client"

import { motion } from "framer-motion"
import { Calendar, MapPin, Briefcase, ChevronDown, ChevronRight } from 'lucide-react'
import { Experience } from '@/types/experience'
import { formatDate } from '@/lib/utils/date'
import { Organization } from "@/types/organization"
import { useState } from 'react'

interface TimelineItemProps {
  experience: Experience
  index: number
  isVisible: boolean
}

export function TimelineItem({ experience, index, isVisible }: TimelineItemProps) {
  const [expandedRoles, setExpandedRoles] = useState(true)
  const [expandedTasks, setExpandedTasks] = useState(false)

  // Icono único para todos los elementos del timeline
  const getIcon = () => {
    return <Briefcase className="w-5 h-5" />
  }

  // Color único usando la paleta del sitio
  const getTypeColor = () => {
    return 'bg-primary'
  }

  const formatExperiencePeriod = (experience: Experience): string => {
    const startDate = formatDate(experience.attributes.field_start_date)
    if (experience.attributes.field_is_current) {
      return `${startDate} - Presente`
    }
    if (experience.attributes.field_end_date) {
      const endDate = formatDate(experience.attributes.field_end_date)
      return `${startDate} - ${endDate}`
    }
    return startDate
  }

  const getExperienceLocation = (experience: Experience): string => {
    if (experience.relationships?.field_organization?.data && 
        typeof experience.relationships.field_organization.data === 'object' && 
        'id' in experience.relationships.field_organization.data) {
      const org = experience.relationships.field_organization.data as any
      return org.attributes?.title || 'Remoto'
    }
    return 'Remoto'
  }

  const period = formatExperiencePeriod(experience)
  const location = getExperienceLocation(experience)  

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.2,
        ease: "easeOut"
      }}
      className="relative mb-8"
    >
      {/* Icono */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isVisible ? { scale: 1 } : { scale: 0 }}
        transition={{ 
          duration: 0.4, 
          delay: index * 0.2 + 0.3,
          ease: "easeOut"
        }}
        className={`absolute left-5-6 w-8 h-8 rounded-full ${getTypeColor()} flex items-center justify-center text-primary-foreground shadow-lg z-10`}
      >
        {getIcon()}
      </motion.div>

      {/* Contenido */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ 
          duration: 0.5, 
          delay: index * 0.2 + 0.4,
          ease: "easeOut"
        }}
        className="ml-20 bg-card border rounded-lg p-6 hover:shadow-md transition-all duration-300 group"
      >
        {/* Header de la tarjeta */}
          <div className="flex flex-wrap items-start justify-between mb-4 flex-col md:flex-row">
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                {experience.attributes.title}
              </h3>
            </div>
            <div className="flex flex-row md:flex-col items-end text-sm text-muted-foreground ml-0 mt-2 md:mt-0 md:ml-4 items-center md:items-end">
              <div className="flex items-center mb-0 md:mb-1">
                <Calendar className="w-4 h-4 mr-1" />
                {period}
              </div>
              <div className="flex items-center ms-2 md:ms-0">
                <MapPin className="w-4 h-4 mr-1" />
                {location}
              </div>
            </div>
          </div>

          <p className="text-lg text-primary font-medium mb-2">
            {(experience.relationships?.field_organization.data as Organization[])[0].attributes.title}
          </p>

        {/* Descripción */}
        {experience.attributes.body?.value && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3, delay: index * 0.2 + 0.6 }}
            className="text-muted-foreground mb-4 leading-relaxed"
          >
            {experience.attributes.body.value}
          </motion.p>
        )}

        {/* Roles */}
        {experience.relationships?.field_roles?.data && experience.relationships.field_roles.data.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.3, delay: index * 0.2 + 0.7 }}
            className="mb-4"
          >
            <button
              onClick={() => setExpandedRoles(!expandedRoles)}
              className="w-full text-left text-sm font-semibold mb-2 flex items-center hover:text-primary transition-colors"
            >
              {expandedRoles ? (
                <ChevronDown className="w-4 h-4 mr-1 transition-transform" />
              ) : (
                <ChevronRight className="w-4 h-4 mr-1 transition-transform" />
              )}
              Roles Principales
            </button>
            {expandedRoles && (
              <motion.ul
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-1 overflow-hidden"
              >
                {experience.relationships.field_roles.data.map((role, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                    className="text-muted-foreground text-sm flex items-center"
                  >
                    <span className="text-primary mr-2 text-xs">▸</span>
                    {role.attributes.name}
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </motion.div>
        )}

        {/* Tareas/Logros */}
        {experience.attributes.field_tasks && experience.attributes.field_tasks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.3, delay: index * 0.2 + 0.8 }}
            className="mb-4"
          >
            <button
              onClick={() => setExpandedTasks(!expandedTasks)}
              className="w-full text-left text-sm font-semibold mb-2 flex items-center hover:text-primary transition-colors"
            >
              {expandedTasks ? (
                <ChevronDown className="w-4 h-4 mr-1 transition-transform" />
              ) : (
                <ChevronRight className="w-4 h-4 mr-1 transition-transform" />
              )}
              Responsabilidades y Logros
            </button>
            {expandedTasks && (
              <motion.ul
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-1 overflow-hidden"
              >
                {experience.attributes.field_tasks.map((task, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                    className="text-muted-foreground text-sm flex items-start"
                  >
                    <span className="text-primary mr-2 text-xs">▸</span>
                    {task}
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </motion.div>
        )}

        {/* Tecnologías */}
        {experience.relationships?.field_tech_stacks?.data && experience.relationships.field_tech_stacks.data.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.3, delay: index * 0.2 + 1.0 }}
          >
            <h4 className="text-sm font-semibold mb-2">
              Tecnologías Utilizadas
            </h4>
            <div className="flex flex-wrap gap-2">
              {experience.relationships.field_tech_stacks.data.map((tech, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ 
                    duration: 0.3, 
                    delay: index * 0.2 + 1.1 + i * 0.05,
                    ease: "easeOut"
                  }}
                  className="px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-full border hover:bg-secondary/80 transition-colors"
                >
                  {tech.attributes.name}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
} 
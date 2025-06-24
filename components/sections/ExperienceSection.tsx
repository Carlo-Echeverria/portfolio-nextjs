"use client"

import { motion } from "framer-motion"
import { Calendar, Briefcase } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Experience } from "@/types/experience"
import { formatDate } from "@/lib/utils/date"

interface ExperienceSectionProps {
  experiences: Experience[]
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  if (!experiences || experiences.length === 0) {
    return null
  }

  return (
    <section id="experience" className="relative py-16">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto max-w-4xl"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-6">Experiencia</h2>
            <div className="h-1 w-20 bg-primary mx-auto mb-8 rounded-full"></div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Mi trayectoria profesional y las tecnologías que he utilizado
            </p>
          </div>

          <div className="flex flex-col gap-8">
            {experiences.map((experience, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="relative overflow-hidden">
                  <div className="absolute top-0 left-0 h-full w-1 bg-primary"></div>
                  <CardContent className="p-6">
                    <h4 className="mb-2 text-xl font-bold flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-primary" />
                      {experience.attributes.title}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {experience.relationships?.field_roles?.data.map((role) => (
                      <Badge key={role.id} variant="outline">
                          {role.attributes.name}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-x-6 gap-y-2 mt-2 mb-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {formatDate(experience.attributes.field_start_date)}{" "}
                          {experience.attributes.field_is_current
                            ? "- Presente"
                            : experience.attributes.field_end_date
                            ? `- ${formatDate(experience.attributes.field_end_date)}`
                            : ""}
                        </span>
                      </div>
                    </div>

                    {/* Tech Stack */}
                    {experience.relationships?.field_tech_stacks?.data &&
                      experience.relationships.field_tech_stacks.data.length > 0 && (
                        <div className="mb-4 flex flex-wrap gap-2">
                          {experience.relationships.field_tech_stacks.data.map((tech) => (
                            <Badge key={tech.id} variant="secondary" className="text-xs">
                              {tech.attributes.name}
                            </Badge>
                          ))}
                        </div>
                    )}

                    {/* Tasks Accordion */}
                    {experience.attributes.field_tasks &&
                      experience.attributes.field_tasks.length > 0 && (
                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="tasks" className="border-none">
                            <AccordionTrigger className="text-sm font-medium hover:no-underline py-2">
                              Ver responsabilidades y logros
                            </AccordionTrigger>
                            <AccordionContent>
                              <ul className="list-disc pl-5 space-y-1">
                                {experience.attributes.field_tasks.map((task, taskIndex) => (
                                  <li key={taskIndex} className="text-muted-foreground">
                                    {task}
                                  </li>
                                ))}
                              </ul>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
} 
"use client"

import { motion } from "framer-motion"
import { sanitizeHtml } from "@/lib/utils"

interface AboutSectionProps {
  profile: any
}

export function AboutSection({ profile }: AboutSectionProps) {
  const aboutText = profile?.attributes?.field_about?.value || "<p>Información sobre mí próximamente...</p>"

  return (
    <section id="about" className="py-20">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">Sobre Mí</h2>
          <div className="h-1 w-20 bg-primary mx-auto mb-8"></div>
          <div
            className="prose prose-lg dark:prose-invert mx-auto"
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(aboutText) }}
          />
        </motion.div>
      </div>
    </section>
  )
}

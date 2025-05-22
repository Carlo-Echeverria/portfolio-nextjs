"use client"

import { motion } from "framer-motion"
import { BlogList } from "@/components/blog/BlogList"
import { Article } from "@/types/blog"

export function BlogSection() {
  // Artículos de ejemplo (reemplazar con datos reales de la API)
  const articles: Article[] = [
    {
      id: "1",
      title: "Cómo mejorar el rendimiento de tu aplicación React",
      excerpt:
        "Aprende técnicas avanzadas para optimizar el rendimiento de tus aplicaciones React y proporcionar una mejor experiencia de usuario.",
      date: "2023-05-15",
      readingTime: 8,
      image: "/placeholder.svg?height=300&width=500",
      url: "#",
      categories: ["React", "Performance"],
      tags: ["frontend", "optimización", "javascript"],
      featured: true,
    },
    {
      id: "2",
      title: "Introducción a TypeScript para desarrolladores JavaScript",
      excerpt:
        "Descubre cómo TypeScript puede mejorar tu flujo de trabajo y ayudarte a escribir código más robusto y mantenible.",
      date: "2023-04-20",
      readingTime: 6,
      image: "/placeholder.svg?height=300&width=500",
      url: "#",
      categories: ["TypeScript", "JavaScript"],
      tags: ["frontend", "tipado", "desarrollo"],
      featured: false,
    },
    {
      id: "3",
      title: "Construyendo APIs RESTful con Node.js y Express",
      excerpt: "Una guía paso a paso para crear APIs RESTful escalables y seguras utilizando Node.js y Express.",
      date: "2023-03-10",
      readingTime: 10,
      image: "/placeholder.svg?height=300&width=500",
      url: "#",
      categories: ["Node.js", "API"],
      tags: ["backend", "javascript", "express"],
      featured: false,
    },
  ]

  return (
    <section id="blog" className="py-24 bg-muted/30">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto max-w-5xl"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">Blog</h2>
            <div className="h-1 w-20 bg-primary mx-auto mb-8"></div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Artículos y tutoriales sobre desarrollo web, tecnología y buenas prácticas
            </p>
          </div>

          <BlogList articles={articles} viewAllUrl="/blog" />
        </motion.div>
      </div>
    </section>
  )
}

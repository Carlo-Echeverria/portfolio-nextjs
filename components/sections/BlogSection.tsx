"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function BlogSection() {
  // Artículos de ejemplo (reemplazar con datos reales de la API)
  const articles = [
    {
      id: "1",
      title: "Cómo mejorar el rendimiento de tu aplicación React",
      excerpt:
        "Aprende técnicas avanzadas para optimizar el rendimiento de tus aplicaciones React y proporcionar una mejor experiencia de usuario.",
      date: "2023-05-15",
      image: "/placeholder.svg?height=300&width=500",
      url: "#",
    },
    {
      id: "2",
      title: "Introducción a TypeScript para desarrolladores JavaScript",
      excerpt:
        "Descubre cómo TypeScript puede mejorar tu flujo de trabajo y ayudarte a escribir código más robusto y mantenible.",
      date: "2023-04-20",
      image: "/placeholder.svg?height=300&width=500",
      url: "#",
    },
    {
      id: "3",
      title: "Construyendo APIs RESTful con Node.js y Express",
      excerpt: "Una guía paso a paso para crear APIs RESTful escalables y seguras utilizando Node.js y Express.",
      date: "2023-03-10",
      image: "/placeholder.svg?height=300&width=500",
      url: "#",
    },
  ]

  return (
    <section id="blog" className="py-20 bg-muted/30">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">Blog</h2>
          <div className="h-1 w-20 bg-primary mx-auto mb-8"></div>
          <p className="mb-12 text-xl text-muted-foreground">
            Artículos y tutoriales sobre desarrollo web y tecnología
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <Card className="overflow-hidden h-full flex flex-col">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardContent className="flex flex-col flex-grow p-6">
                  <div className="mb-2 text-sm text-muted-foreground">
                    {new Date(article.date).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                  <h3 className="mb-2 text-xl font-bold">{article.title}</h3>
                  <p className="mb-6 text-muted-foreground">{article.excerpt}</p>
                  <div className="mt-auto">
                    <Button asChild variant="link" className="p-0 h-auto font-medium">
                      <Link href={article.url} className="flex items-center gap-2">
                        Leer más <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

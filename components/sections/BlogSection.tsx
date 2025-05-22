"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Calendar, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils/date"

export function BlogSection() {
  // Artículos de ejemplo (reemplazar con datos reales de la API)
  const articles = [
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

          {/* Artículo destacado */}
          {articles.some((article) => article.featured) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              {articles
                .filter((article) => article.featured)
                .map((article) => (
                  <Card key={article.id} className="overflow-hidden">
                    <div className="grid md:grid-cols-2 gap-0">
                      <div className="relative h-64 md:h-full">
                        <Image
                          src={article.image || "/placeholder.svg"}
                          alt={article.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardContent className="p-8 flex flex-col">
                        <div className="mb-2 flex flex-wrap gap-2">
                          {article.categories.map((category, idx) => (
                            <Badge key={idx} variant="secondary">
                              {category}
                            </Badge>
                          ))}
                        </div>
                        <h3 className="text-2xl font-bold mb-3">{article.title}</h3>
                        <p className="text-muted-foreground mb-4">{article.excerpt}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {/* <span>{formatDate(article.date)}</span> */}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{article.readingTime} min de lectura</span>
                          </div>
                        </div>
                        <div className="mt-auto">
                          <Button asChild variant="default" className="gap-2">
                            <Link href={article.url}>
                              Leer artículo
                              <ArrowRight className="h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))}
            </motion.div>
          )}

          {/* Lista de artículos */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {articles
              .filter((article) => !article.featured)
              .map((article, index) => (
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
                      <div className="mb-2 flex flex-wrap gap-2">
                        {article.categories.slice(0, 1).map((category, idx) => (
                          <Badge key={idx} variant="secondary">
                            {category}
                          </Badge>
                        ))}
                      </div>
                      <h3 className="mb-2 text-xl font-bold">{article.title}</h3>
                      <p className="mb-4 text-muted-foreground line-clamp-3">{article.excerpt}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4 mt-auto">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{formatDate(article.date)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{article.readingTime} min</span>
                        </div>
                      </div>
                      <Button asChild variant="link" className="p-0 h-auto font-medium">
                        <Link href={article.url} className="flex items-center gap-2">
                          Leer más <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
          </div>

          {/* Botón para ver más artículos */}
          <div className="flex justify-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link href="#" className="flex items-center gap-2">
                Ver todos los artículos
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

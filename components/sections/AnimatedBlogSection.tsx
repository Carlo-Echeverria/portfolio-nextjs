"use client"

import { motion } from "framer-motion"
import { BlogList } from "@/components/blog/BlogList"
import { Article } from "@/types/blog"

interface AnimatedBlogSectionProps {
  articles: Article[]
}

export function AnimatedBlogSection({ articles }: AnimatedBlogSectionProps) {
  return (
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
        Estos artículos vienen directamente desde <a href="https://www.dev.to" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">dev.to</a>, una plataforma donde desarrolladores de todo el mundo comparten ideas, tutoriales y experiencias.
        </p>
      </div>
      
      <BlogList articles={articles} viewAllUrl="/blog" limit={3} />
    </motion.div>
  )
} 
"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Article } from "@/types/blog"
import { formatDate } from "@/lib/utils/date"
import "@/styles/blog.css"

interface BlogPostClientProps {
  article: Article
}

export default function BlogPostClient({ article }: BlogPostClientProps) {
  return (
    <main className="container px-4 md:px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-4xl"
      >
        {/* Back Button */}
        <div className="mb-8">
          <Button asChild variant="ghost" size="sm">
            <Link href="/blog" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Volver al blog
            </Link>
          </Button>
        </div>

        {/* Article Header */}
        <div className="mb-8">
          {/* Cover Image */}
          {article.cover_image && (
            <div className="relative h-64 md:h-96 w-full mb-8 rounded-lg overflow-hidden">
              <Image
                src={article.cover_image}
                alt={article.title}
                fill
                className="object-cover"
                priority
                quality={75}
              />
            </div>
          )}

          {/* Tags */}
          <div className="mb-4 flex flex-wrap gap-2">
            {article.tag_list.map((tag, idx) => (
              <Badge key={idx} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            {article.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(article.published_at)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{article.reading_time_minutes} min de lectura</span>
            </div>
          </div>

          {/* Link to original article */}
          <div className="mb-8">
            <Button asChild variant="outline" size="sm">
              <Link
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                Ver en DEV.to
                <ExternalLink className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Article Content */}
        {article.body_html ? (
          <div className="prose prose-gray dark:prose-invert max-w-none mb-8">
            <div 
              dangerouslySetInnerHTML={{ __html: article.body_html }}
              className="article-content"
            />
          </div>
        ) : (
          <div className="prose prose-gray dark:prose-invert max-w-none mb-8">
            <div className="border border-border rounded-lg p-6 bg-muted/30">
              <h3 className="text-lg font-semibold mb-3">Contenido del artículo</h3>
              <p className="text-muted-foreground mb-4">
                El contenido completo de este artículo no está disponible localmente. 
                Para ver el contenido completo, haz clic en el botón de abajo para ser redirigido al artículo original.
              </p>
              <Button asChild>
                <Link
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  Leer artículo completo
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-center mt-12">
          <Button asChild variant="outline">
            <Link href="/blog" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Volver al blog
            </Link>
          </Button>
        </div>
      </motion.div>
    </main>
  )
} 
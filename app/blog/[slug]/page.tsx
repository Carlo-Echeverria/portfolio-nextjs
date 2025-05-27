"use client"

import { useState, useEffect } from "react"
import { notFound } from "next/navigation"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/layout/Header"
import { MobileMenu } from "@/components/layout/MobileMenu"
import { Footer } from "@/components/layout/Footer"
import { Article } from "@/types/blog"
import { formatDate } from "@/lib/utils/date"
import "@/styles/blog.css"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchArticle() {
      try {
        setLoading(true)
        const response = await fetch(`/api/articles/${params.slug}`)
        
        if (response.status === 404) {
          notFound()
        }
        
        if (!response.ok) {
          throw new Error('Error fetching article')
        }
        
        const fetchedArticle: Article = await response.json()
        setArticle(fetchedArticle)
      } catch (err) {
        console.error('Error fetching article:', err)
        setError('Failed to load article')
      } finally {
        setLoading(false)
      }
    }

    fetchArticle()
  }, [params.slug])

  if (loading) {
    return (
      <div className="relative min-h-screen bg-gradient-to-b from-background to-muted/30">
        <Header />
        <MobileMenu />
        <div className="container px-4 md:px-6 py-24">
          <div className="text-center py-20">
            <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Cargando artículo...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (error || !article) {
    return (
      <div className="relative min-h-screen bg-gradient-to-b from-background to-muted/30">
        <Header />
        <MobileMenu />
        <div className="container px-4 md:px-6 py-24">
          <div className="text-center py-20">
            <p className="text-red-500">{error || 'Artículo no encontrado'}</p>
            <Button asChild className="mt-4">
              <Link href="/blog">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver al blog
              </Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-background to-muted/30">
      <Header />
      <MobileMenu />
      
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

            {/* Description */}
            {article.description && (
              <p className="text-xl text-muted-foreground mb-6">
                {article.description}
              </p>
            )}

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

          {/* Call to Action */}
          <div className="border-t border-border pt-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">¿Te gustó este artículo?</h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <Link href="/blog">
                    Ver más artículos
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    Visitar en DEV.to
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  )
} 
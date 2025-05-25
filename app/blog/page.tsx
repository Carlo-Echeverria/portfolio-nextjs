"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ArticleCard } from "@/components/blog/ArticleCard"
import { Header } from "@/components/layout/Header"
import { MobileMenu } from "@/components/layout/MobileMenu"
import { Footer } from "@/components/layout/Footer"
import { Article } from "@/types/blog"

const ARTICLES_PER_PAGE = 6

export default function BlogPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(articles.length / ARTICLES_PER_PAGE)
  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE
  const endIndex = startIndex + ARTICLES_PER_PAGE
  const currentArticles = articles.slice(startIndex, endIndex)

  useEffect(() => {
    async function fetchArticles() {
      try {
        setLoading(true)
        const response = await fetch('/api/articles')
        
        if (!response.ok) {
          throw new Error('Error fetching articles')
        }
        
        const fetchedArticles: Article[] = await response.json()
        setArticles(fetchedArticles)
      } catch (err) {
        console.error('Error fetching articles:', err)
        setError('Failed to load articles')
        setArticles([])
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [])

  const goToPage = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1)
    }
  }

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1)
    }
  }

  if (loading) {
    return (
      <div className="relative min-h-screen bg-gradient-to-b from-background to-muted/30">
        <Header />
        <MobileMenu />
        <div className="container px-4 md:px-6 py-24">
          <div className="text-center py-20">
            <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Cargando artículos...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (error) {
    return (
      <div className="relative min-h-screen bg-gradient-to-b from-background to-muted/30">
        <Header />
        <MobileMenu />
        <div className="container px-4 md:px-6 py-24">
          <div className="text-center py-20">
            <p className="text-red-500">{error}</p>
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
          className="mx-auto max-w-5xl"
        >
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
              Blog
            </h1>
            <div className="h-1 w-20 bg-primary mx-auto mb-8"></div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Todos mis artículos sobre desarrollo web, tecnología y buenas prácticas
            </p>
          </div>

          {articles.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">
                Actualmente no hay artículos disponibles.
              </p>
            </div>
          ) : (
            <>
              {/* Articles Grid */}
              <div className="grid gap-8 md:grid-cols-2 mb-12">
                {currentArticles.map((article, index) => (
                  <ArticleCard key={article.id} article={article} index={index} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-4 px-2">
                  {/* Botón Anterior */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    className="flex items-center gap-2"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Anterior
                  </Button>

                  {/* Números de página: scrollable y ocultos en xs */}
                  <div className="hidden sm:flex items-center gap-2 overflow-x-auto whitespace-nowrap px-1 no-scrollbar">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => goToPage(page)}
                        className="min-w-[2.5rem] h-10 flex-shrink-0"
                      >
                        {page}
                      </Button>
                    ))}
                  </div>

                  {/* En xs, solo muestro el número actual */}
                  <div className="flex sm:hidden items-center text-sm font-medium">
                    {currentPage} / {totalPages}
                  </div>

                  {/* Botón Siguiente */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-2"
                  >
                    Siguiente
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}


              {/* Page Info */}
              <div className="text-center mt-8 text-sm text-muted-foreground">
                Mostrando {startIndex + 1}-{Math.min(endIndex, articles.length)} de {articles.length} artículos
              </div>
            </>
          )}
        </motion.div>
      </main>

      <Footer />
    </div>
  )
} 
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Article } from "@/types/blog"
import BlogPostClient from "@/components/blog/BlogPostClient"
import { generateArticleMetadata } from "@/lib/seo"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

// Función para generar metadata dinámica
export async function generateMetadata({ params }: BlogPostPageProps) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/articles/${params.slug}`)
    
    if (!response.ok) {
      return {
        title: "Artículo no encontrado | Carlo Echeverría",
        description: "El artículo que buscas no está disponible",
      }
    }
    
    const article: Article = await response.json()
    
    return generateArticleMetadata(
      article.title,
      article.description || `Artículo sobre ${article.tag_list.join(", ")}`,
      article.tag_list,
      article.published_at
    )
  } catch (error) {
    return {
      title: "Error | Carlo Echeverría",
      description: "Error al cargar el artículo",
    }
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  let article: Article | null = null
  let error: string | null = null

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/articles/${params.slug}`)
    
    if (response.status === 404) {
      notFound()
    }
    
    if (!response.ok) {
      throw new Error('Error fetching article')
    }
    
    article = await response.json()
  } catch (err) {
    console.error('Error fetching article:', err)
    error = 'Failed to load article'
  }

  if (error || !article) {
    return (
      <div className="container px-4 md:px-6 py-24">
        <div className="text-center py-24">
          <p className="text-red-500">{error || 'Artículo no encontrado'}</p>
          <Button asChild className="mt-4">
            <Link href="/blog">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al blog
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return <BlogPostClient article={article} />
} 
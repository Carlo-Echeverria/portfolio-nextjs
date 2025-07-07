import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Article } from "@/types/blog"
import BlogPostClient from "@/components/blog/BlogPostClient"
import { generateArticleMetadata } from "@/lib/seo"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
// import "@/styles/4af9902655894975b7088821085b0a0a.css"
import "@/styles/minimal-default.css"
import "@/styles/views-default.css"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

// Función para generar metadata dinámica
export async function generateMetadata({ params }: BlogPostPageProps) {
  try {
    const { slug } = await params
    const { getArticleBySlug } = await import('@/lib/api/articles-service')
    const article = await getArticleBySlug(slug)
    
    if (!article) {
      return {
        title: "Artículo no encontrado | Carlo Echeverría - Desarrollador Full Stack | Portfolio",
        description: "El artículo que buscas no está disponible o ha sido eliminado. Te invitamos a explorar otros contenidos o volver al inicio del sitio.",
      }
    }
    
    return generateArticleMetadata(
      article.title + " | Carlo Echeverría - Desarrollador Full Stack | Portfolio",
      article.description || `Artículo sobre ${article.tag_list.join(", ")}`,
      article.tag_list,
      article.published_at
    )
  } catch (error) {
    return {
      title: "Error | Carlo Echeverría - Desarrollador Full Stack | Portfolio",
      description: "Ocurrió un error al cargar el artículo. Puede que el contenido haya sido eliminado o esté temporalmente fuera de servicio. Vuelve más tarde o regresa al inicio.",
    }
  }
}

// Configurar generación estática sin revalidación
export const revalidate = false // Página completamente estática

// Generar rutas estáticas para todos los artículos
export async function generateStaticParams() {
  try {
    const { getArticles } = await import('@/lib/api/articles-service')
    const articles = await getArticles()
    
    return articles.map((article) => ({
      slug: article.slug,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  let article: Article | null = null
  let error: string | null = null

  try {
    const { slug } = await params
    const { getArticleBySlug } = await import('@/lib/api/articles-service')
    article = await getArticleBySlug(slug)
    
    if (!article) {
      notFound()
    }
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
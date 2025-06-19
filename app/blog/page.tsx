import BlogPageClient from "@/components/blog/BlogPageClient"
import { generatePageMetadata } from "@/lib/seo"
import { Article } from "@/types/blog"

export const metadata = generatePageMetadata('blog', {
  title: "Blog | Carlo Echeverría - Desarrollador Full Stack | Portfolio",
  description: "Artículos sobre desarrollo web, tecnología y buenas prácticas publicados por Carlo Echeverría en la comunidad de desarrolladores dev.to.",
})

// Función para obtener artículos en el servidor
async function getArticles(): Promise<Article[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const response = await fetch(`${baseUrl}/api/articles`, {
      next: { revalidate: 3600 }, // Revalidar cada hora
      headers: {
        'Content-Type': 'application/json',
      },
    })
    
    if (!response.ok) {
      console.error(`Error fetching articles: ${response.status} ${response.statusText}`)
      return []
    }
    
    const articles = await response.json()
    return Array.isArray(articles) ? articles : []
  } catch (error) {
    console.error('Error fetching articles:', error)
    return []
  }
}

export default async function BlogPage() {
  // Obtener artículos en el servidor para SSR
  const articles = await getArticles()
  
  // Si no hay artículos, mostrar mensaje apropiado
  if (articles.length === 0) {
    return <BlogPageClient initialArticles={[]} />
  }
  
  return <BlogPageClient initialArticles={articles} />
}

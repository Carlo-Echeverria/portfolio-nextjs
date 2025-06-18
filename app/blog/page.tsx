import BlogPageClient from "@/components/blog/BlogPageClient"
import { generatePageMetadata } from "@/lib/seo"
import { Article } from "@/types/blog"

export const metadata = generatePageMetadata('blog', {
  title: "Blog | Carlo Echeverría - Desarrollador Full Stack",
  description: "Artículos sobre desarrollo web, tecnología y buenas prácticas publicados en la comunidad dev.to",
})

// Función para obtener artículos en el servidor (opcional, para SSR)
async function getArticles(): Promise<Article[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    const response = await fetch(`${baseUrl}/api/articles`, {
      next: { revalidate: 3600 } // Revalidar cada hora
    })
    
    if (!response.ok) {
      return []
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching articles:', error)
    return []
  }
}

export default async function BlogPage() {
  // Obtener artículos en el servidor para SSR
  const articles = await getArticles()
  
  return <BlogPageClient initialArticles={articles} />
}

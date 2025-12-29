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
    // Usar directamente el servicio en lugar de la API
    const { getArticles } = await import('@/lib/api/articles-service')
    console.log('getArticles');
    console.log(await getArticles());
    
    return await getArticles()
  } catch (error) {
    console.error('Error fetching articles:', error)
    return []
  }
}

// Configurar generación estática sin revalidación
export const revalidate = false // Página completamente estática

export default async function BlogPage() {
  // Obtener artículos en el servidor para SSR
  const articles = await getArticles()
  
  // Si no hay artículos, mostrar mensaje apropiado
  if (articles.length === 0) {
    return <BlogPageClient initialArticles={[]} />
  }
  
  return <BlogPageClient initialArticles={articles} />
}

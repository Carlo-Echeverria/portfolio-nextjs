import { AnimatedBlogSection } from "./AnimatedBlogSection"
import { Article } from "@/types/blog"

// Función para obtener artículos en el servidor
async function getArticles(): Promise<Article[]> {
  try {
    // Usar directamente el servicio en lugar de la API (más eficiente en Server Components)
    const { getArticles } = await import('@/lib/api/articles-service')
    
    const articles = await getArticles()
    
    // Mapear los artículos para asegurar el formato correcto
    return articles.map(article => ({
      id: article.id,
      title: article.title,
      description: article.description,
      readable_publish_date: article.readable_publish_date,
      slug: article.slug,
      url: article.url,
      published_timestamp: article.published_timestamp,
      cover_image: article.cover_image || null,
      social_image: article.social_image,
      created_at: article.created_at,
      edited_at: article.edited_at,
      published_at: article.published_at,
      last_comment_at: article.last_comment_at,
      reading_time_minutes: article.reading_time_minutes,
      tag_list: article.tag_list || [],
    }))
  } catch (error) {
    console.error('Error fetching articles in BlogSection:', error)
    return [] // Retornar array vacío en caso de error
  }
}

// Server Component principal
export async function BlogSection() {
  const articles = await getArticles()

  return (
    <section id="blog" className="py-12 scroll-mt-[100px]">
      <div className="container px-4 md:px-6">
        <AnimatedBlogSection articles={articles} />
      </div>
    </section>
  )
}

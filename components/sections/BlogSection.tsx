"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { BlogList } from "@/components/blog/BlogList"
import { Article } from "@/types/blog"

export function BlogSection() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchArticles() {
      try {
        setLoading(true);
        const response = await fetch('/api/articles');
      
        if (!response.ok) {
          throw new Error('Error fetching articles');
        }
        
        const Articles: Article[] = await response.json();
        
        // Convertir del formato de la API al formato de la UI
        const formattedArticles: Article[] = Articles.map(article => ({
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
          tag_list: article.tag_list,
        }));
        
        
        setArticles(formattedArticles);
      } catch (err) {
        console.error('Error fetching articles:', err);
        setError('Failed to load articles');
        
        // Usar artículos de ejemplo en caso de error
        setArticles([]);
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, []);

  return (
    <section id="blog" className="py-24 bg-muted/30">
      <div className="container px-4 md:px-6">
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
              Artículos y tutoriales sobre desarrollo web, tecnología y buenas prácticas
            </p>
          </div>

          {loading ? (
            <div className="text-center py-10">
              <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Cargando artículos...</p>
                      </div>
          ) : error ? (
            <div className="text-center py-10">
              <p className="text-red-500">{error}</p>
                        </div>
          ) : (
            <BlogList articles={articles} viewAllUrl="/blog" limit={6} />
          )}
        </motion.div>
      </div>
    </section>
  )
}

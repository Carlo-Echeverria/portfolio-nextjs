"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Article } from "@/types/blog"
import { ArticleCard } from "@/components/blog/ArticleCard"
import { FeaturedArticleCard } from "@/components/blog/FeaturedArticleCard"

interface BlogListProps {
  articles: Article[];
  showViewAllButton?: boolean;
  viewAllUrl?: string;
}

export function BlogList({ articles, showViewAllButton = true, viewAllUrl = "#" }: BlogListProps) {
  const featuredArticles = articles.filter(article => article.featured);
  const regularArticles = articles.filter(article => !article.featured);

  return (
    <div>
      {/* Artículo destacado */}
      {featuredArticles.length > 0 && (
        <FeaturedArticleCard article={featuredArticles[0]} />
      )}

      {/* Lista de artículos */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {regularArticles.map((article, index) => (
          <ArticleCard key={article.id} article={article} index={index} />
        ))}
      </div>

      {/* Botón para ver más artículos */}
      {showViewAllButton && (
        <div className="flex justify-center mt-12">
          <Button asChild variant="outline" size="lg">
            <Link href={viewAllUrl} className="flex items-center gap-2">
              Ver todos los artículos
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      )}
    </div>
  )
} 
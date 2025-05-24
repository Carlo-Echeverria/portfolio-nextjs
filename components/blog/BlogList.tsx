"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Article } from "@/types/blog"
import { ArticleCard } from "@/components/blog/ArticleCard"

interface BlogListProps {
  articles: Article[];
  showViewAllButton?: boolean;
  viewAllUrl?: string;
  limit?: number;
}

export function BlogList({ articles, showViewAllButton = true, viewAllUrl = "#", limit }: BlogListProps) {
  // Si hay un límite especificado, usar solo esa cantidad de artículos
  const displayedArticles = limit ? articles.slice(0, limit) : articles;

  return (
    <div>
      {/* Lista de artículos */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {displayedArticles.map((article, index) => (
          <ArticleCard key={article.id} article={article} index={index} />
        ))}
      </div>

      {/* Botón para ver más artículos */}
      {displayedArticles.length > 0 ? (
        showViewAllButton && (
          <div className="flex justify-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link href={viewAllUrl} className="flex items-center gap-2">
                Ver todos los artículos
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        )
      ) : (
        <p className="text-center text-muted-foreground mt-12">
          Actualmente no hay artículos disponibles.
        </p>
      )}
    </div>
  )
} 
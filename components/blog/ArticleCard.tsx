"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Calendar, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils/date"
import { Article } from "@/types/blog"

interface ArticleCardProps {
  article: Article;
  index: number;
}

export function ArticleCard({ article, index }: ArticleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <Card className="overflow-hidden h-full flex flex-col">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={article.image || "/placeholder.svg"}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <CardContent className="flex flex-col flex-grow p-6">
          <div className="mb-2 flex flex-wrap gap-2">
            {article.categories.slice(0, 1).map((category, idx) => (
              <Badge key={idx} variant="secondary">
                {category}
              </Badge>
            ))}
          </div>
          <h3 className="mb-2 text-xl font-bold">{article.title}</h3>
          <p className="mb-4 text-muted-foreground line-clamp-3">{article.excerpt}</p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4 mt-auto">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{formatDate(article.date)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{article.readingTime} min</span>
            </div>
          </div>
          <Button asChild variant="link" className="p-0 h-auto font-medium">
            <Link href={article.url} className="flex items-center gap-2">
              Leer más <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
} 
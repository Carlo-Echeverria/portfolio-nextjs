export interface Article {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: number;
  image: string;
  url: string;
  categories: string[];
  tags: string[];
  featured: boolean;
} 
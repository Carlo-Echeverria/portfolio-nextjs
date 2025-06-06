import { NextResponse } from 'next/server';
import { getArticleBySlug } from '@/lib/api/articles-service';

interface Params {
  slug: string;
}

export async function GET(request: Request, { params }: { params: Promise<Params> }) {
  try {
    const { slug } = await params;
    const article = await getArticleBySlug(slug);

    if (!article) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(article);
  } catch (error) {
    console.error('Error fetching article:', error);
    return NextResponse.json(
      { error: 'Error fetching article' },
      { status: 500 }
    );
  }
} 
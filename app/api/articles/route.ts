import { NextResponse } from 'next/server';
import { getArticles } from '@/lib/api/articles-service';

export async function GET() {
  try {
    const articles = await getArticles();

    return NextResponse.json(articles);
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json(
      { error: 'Error fetching articles' },
      { status: 500 }
    );
  }
} 
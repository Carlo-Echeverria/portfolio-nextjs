import { NextResponse } from 'next/server';
import { syncArticlesFromDev } from '@/lib/api/articles-service';

export async function POST(request: Request) {
  try {
    // Obtener el username del body si se proporcio
    const body = await request.json().catch(() => ({}));
    const username = body.username || '';

    // const savedCount = await syncArticlesFromDevTo(username);
    const savedCount = await syncArticlesFromDev(username);

    return NextResponse.json({
      message: `Successfully synced ${savedCount} articles from DEV.to`,
      count: savedCount
    });
  } catch (error) {
    console.error('Error syncing articles:', error);
    return NextResponse.json(
      { error: 'Error syncing articles' },
      { status: 500 }
    );
  }
}
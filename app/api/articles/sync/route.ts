import { NextResponse } from 'next/server';
import { syncArticlesFromDev } from '@/lib/api/articles-service';
import { revalidatePath } from 'next/cache';

export async function POST(request: Request) {
  try {
    // Obtener el username del body si se proporciona
    const body = await request.json().catch(() => ({}));
    const username = body.username || '';

    console.log('Starting manual DEV.to synchronization...');
    
    const savedCount = await syncArticlesFromDev(username);

    // Revalidar las rutas relacionadas con artículos
    revalidatePath('/blog');
    revalidatePath('/api/articles');

    return NextResponse.json({
      message: `Successfully synced ${savedCount} articles from DEV.to`,
      count: savedCount,
      source: 'dev.to',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error syncing articles:', error);
    return NextResponse.json(
      { error: 'Error syncing articles' },
      { status: 500 }
    );
  }
}
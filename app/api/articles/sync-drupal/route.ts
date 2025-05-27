import { NextResponse } from 'next/server';
import { syncArticlesFromDrupal } from '@/lib/api/articles-service';
import { revalidatePath } from 'next/cache';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { drupalUrl, apiKey } = body;

    if (!drupalUrl) {
      return NextResponse.json(
        { error: 'drupalUrl is required' },
        { status: 400 }
      );
    }

    console.log('Starting manual Drupal synchronization...');
    
    const savedCount = await syncArticlesFromDrupal(drupalUrl, apiKey);

    // Revalidar las rutas relacionadas con artículos
    revalidatePath('/blog');
    revalidatePath('/api/articles');

    return NextResponse.json({
      message: `Successfully synced ${savedCount} articles from Drupal`,
      count: savedCount,
      source: 'drupal',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error syncing articles from Drupal:', error);
    return NextResponse.json(
      { error: 'Error syncing articles from Drupal' },
      { status: 500 }
    );
  }
} 
import { NextResponse } from 'next/server';
import { syncArticlesFromDev } from '@/lib/api/articles-service';
import { revalidatePath } from 'next/cache';

export async function GET(request: Request) {
  try {
    // Verificar que la request viene de Vercel Cron o un token de autorización
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.NEXT_PUBLIC_CRON_SECRET;
    
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.log('Starting daily article synchronization...');
    
    // Sincronizar artículos (puedes configurar el username desde variables de entorno)
    const username = process.env.DEVTO_USERNAME || '';
    const savedCount = await syncArticlesFromDev(username);

    // Revalidar las rutas relacionadas con artículos
    revalidatePath('/blog');
    revalidatePath('/api/articles');
    
    console.log(`Daily sync completed: ${savedCount} articles processed`);

    return NextResponse.json({
      success: true,
      message: `Daily sync completed successfully`,
      articlesProcessed: savedCount,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error in daily article sync:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Error during daily sync',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
} 
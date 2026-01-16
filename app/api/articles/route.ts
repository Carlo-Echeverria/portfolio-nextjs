import { NextResponse } from 'next/server';
import { getArticles } from '@/lib/api/articles-service';

// export const revalidate = 259200;

export async function GET() {
  try {
    // Validar variables de entorno
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Missing Supabase environment variables:', {
        hasUrl: !!supabaseUrl,
        hasServiceKey: !!supabaseServiceKey
      });
      return NextResponse.json(
        { 
          error: 'Configuration error: Missing Supabase credentials',
          details: 'Check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY'
        },
        { status: 500 }
      );
    }

    const articles = await getArticles();

    return NextResponse.json(articles);
  } catch (error: any) {
    console.error('Error fetching articles:', error);
    
    // Proporcionar más detalles del error
    const errorMessage = error?.message || 'Unknown error';
    const errorCode = error?.code || 'UNKNOWN';
    
    return NextResponse.json(
      { 
        error: 'Error fetching articles',
        message: errorMessage,
        code: errorCode,
        details: process.env.NODE_ENV === 'development' ? error?.stack : undefined
      },
      { status: 500 }
    );
  }
} 
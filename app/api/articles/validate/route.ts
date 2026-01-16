import { NextResponse } from 'next/server';
import { validateSupabaseConnection } from '@/lib/api/articles-service';

export async function GET() {
  try {
    const validation = await validateSupabaseConnection();
    
    if (validation.success) {
      return NextResponse.json({
        success: true,
        message: 'Supabase connection is valid',
        details: validation.details
      });
    } else {
      return NextResponse.json({
        success: false,
        message: 'Supabase connection validation failed',
        error: validation.error,
        details: validation.details
      }, { status: 500 });
    }
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: 'Error validating connection',
      error: error.message
    }, { status: 500 });
  }
}


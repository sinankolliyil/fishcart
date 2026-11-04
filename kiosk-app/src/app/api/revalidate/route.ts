import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { clearSanityCache } from '@/lib/sanity';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    clearSanityCache();
    revalidatePath('/', 'layout');
    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      message: 'Sanity cache cleared and paths revalidated successfully',
    });
  } catch (err: any) {
    return NextResponse.json(
      { revalidated: false, error: err?.message || 'Error revalidating' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  clearSanityCache();
  revalidatePath('/', 'layout');
  return NextResponse.json({
    revalidated: true,
    now: Date.now(),
    message: 'Sanity cache cleared and paths revalidated successfully',
  });
}

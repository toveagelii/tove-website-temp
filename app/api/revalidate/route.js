import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Revalidate all project pages when any project is updated
    revalidatePath('/discography');
    revalidatePath('/score');
    
    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    console.error('Error revalidating:', err);
    return NextResponse.json({ revalidated: false }, { status: 500 });
  }
}

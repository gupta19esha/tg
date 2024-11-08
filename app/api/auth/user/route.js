import { NextResponse } from 'next/server';
import { getUser } from '@/app/lib/auth';

let cachedUser = null;
const CACHE_DURATION = 60 * 1000; // 1 minute
let lastCacheTime = 0;

export async function GET() {
  try {
    const now = Date.now();
    
    // Return cached user if available and not expired
    if (cachedUser && (now - lastCacheTime < CACHE_DURATION)) {
      return NextResponse.json({ user: cachedUser }, { status: 200 });
    }

    const user = await getUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Cache the user
    cachedUser = user;
    lastCacheTime = now;

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
} 
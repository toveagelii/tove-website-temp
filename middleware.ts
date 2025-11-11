import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const basicAuth = request.headers.get('authorization');
  const url = request.nextUrl.clone();

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    const [user, pass] = Buffer.from(authValue, 'base64').toString().split(':');
    if (user === 'tove' && pass === '1997') {
      return NextResponse.next();
    }
  }

  url.pathname = '/api/auth';
  return NextResponse.rewrite(url);
}

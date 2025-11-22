import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const USER = 'toveagelii';
const PASS = '1997';

export function middleware(request: NextRequest) {
  const basicAuth = request.headers.get('authorization');

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    const [user, pass] = atob(authValue).split(':');
    if (user === USER && pass === PASS) {
      return NextResponse.next();
    }
  }

  return new NextResponse('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  });
}

export const config = {
  matcher: '/:path*',
};

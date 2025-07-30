import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow login, register, and public files
  if (
    pathname.startsWith('/login') ||
    pathname.startsWith('/api/login') ||
    pathname.startsWith('/register') ||
    pathname.startsWith('/api/register') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/public')
  ) {
    // If already authenticated, redirect to app home
    const userId = request.cookies.get('userId');
    if (userId && (pathname.startsWith('/login') || pathname.startsWith('/register'))) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  // Check for userId cookie for all other routes
  const userId = request.cookies.get('userId');
  if (!userId) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api/login|login|api/register|register|_next|public).*)'],
};

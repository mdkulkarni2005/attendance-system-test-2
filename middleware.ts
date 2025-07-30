import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow landing page, login, register, and public files
  if (
    pathname === '/' ||
    pathname.startsWith('/login/student') ||
    pathname.startsWith('/login/teacher') ||
    pathname.startsWith('/api/login') ||
    pathname.startsWith('/register') ||
    pathname.startsWith('/api/register') ||
    pathname.startsWith('/register-teacher') ||
    pathname.startsWith('/api/register-teacher') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/public')
  ) {
    return NextResponse.next();
  }

  // Check for userId cookie for all other routes
  const userId = request.cookies.get('userId');
  if (!userId) {
    // If not authenticated, redirect to landing page
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|public).*)'],
};

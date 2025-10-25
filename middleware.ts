import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if user has session cookie
  const token = request.cookies.get('supabase-auth-token');

  // If accessing dashboard or seller routes without token, redirect to login
  if (request.nextUrl.pathname.startsWith('/dashboard') || request.nextUrl.pathname.startsWith('/seller')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // If accessing login/signup with token, redirect to dashboard
  if (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/signup') {
    if (token) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/seller/:path*', '/login', '/signup'],
};

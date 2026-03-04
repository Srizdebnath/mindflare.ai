import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('mf_token');
    const { pathname } = request.nextUrl;

    // Public routes that don't need auth
    const publicRoutes = ['/', '/login', '/signup', '/docs'];
    const isPublicRoute = publicRoutes.some(route => pathname === route) || pathname.startsWith('/widget');

    if (!token && !isPublicRoute) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (token && (pathname === '/login' || pathname === '/signup')) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except static files and metadata.
         */
        '/((?!api|_next/static|_next/image|assets|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
};

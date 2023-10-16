// Ref: https://next-auth.js.org/configuration/nextjs#advanced-usage
import { withAuth, NextRequestWithAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import {
  all_roles,
  client_role,
  worker_role,
  manager_role,
  accountant_role,
  boss_role,
} from '@/constants/constants';

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(request: NextRequestWithAuth) {
    // console.log(request.nextUrl.pathname);
    // console.log(request.nextauth.token);

    const roleFromToken = request.nextauth.token?.role!;

    if (
      (request.nextUrl.pathname.startsWith('/user') &&
        !all_roles.includes(roleFromToken)) ||
      (request.nextUrl.pathname.startsWith('/client') &&
        !client_role.includes(roleFromToken)) ||
      (request.nextUrl.pathname.startsWith('/worker') &&
        !worker_role.includes(roleFromToken)) ||
      (request.nextUrl.pathname.startsWith('/manager') &&
        !manager_role.includes(roleFromToken)) ||
      (request.nextUrl.pathname.startsWith('/accountant') &&
        !accountant_role.includes(roleFromToken)) ||
      (request.nextUrl.pathname.startsWith('/boss') &&
        !boss_role.includes(roleFromToken)) ||
      (request.nextUrl.pathname.startsWith('/admin') &&
        roleFromToken !== 'admin')
    ) {
      return NextResponse.rewrite(new URL('/denied', request.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

// Applies next-auth only to matching routes - can be regex
// Ref: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: [
    '/user/:path*',
    '/client/:path*',
    '/worker/:path*',
    '/manager/:path*',
    '/accountant/:path*',
    '/boss/:path*',
    '/admin/:path*',
  ],
};

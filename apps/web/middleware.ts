import { NextRequest, NextResponse } from 'next/server';
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;
  console.log(pathname);
  // Redirect authenticated users away from homepage to /dashboard
  if ( token && pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Protect certain routes: If no token, redirect to /register
  const protectedRoutes = ["/dashboard", "/profile", "/settings"]; // Add your protected routes here

  if (!token && protectedRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/register", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard", "/profile", "/settings"], // Apply middleware to these routes
};
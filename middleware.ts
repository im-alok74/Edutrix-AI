import { auth } from "@/lib/auth/config";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = [
  "/dashboard",
  "/nova",
  "/orbit",
  "/quest",
  "/horizon",
  "/vault",
  "/focus-flow",
  "/aura",
  "/spark",
  "/settings"
];

export async function middleware(req: NextRequest) {
  const session = await auth();
  const path = req.nextUrl.pathname;

  // Check if the current route is protected
  const isProtected = protectedRoutes.some(route => path.startsWith(route));

  // Redirect to signin if accessing protected route without session
  if (isProtected && !session) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  // Redirect to dashboard if accessing auth pages while signed in
  if (session && (path === "/auth/signin" || path === "/auth/signup")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ico|ttf|woff2?|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)"
  ]
};

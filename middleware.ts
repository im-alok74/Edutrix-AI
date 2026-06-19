import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/nova(.*)",
  "/orbit(.*)",
  "/quest(.*)",
  "/horizon(.*)",
  "/vault(.*)",
  "/focus-flow(.*)",
  "/aura(.*)",
  "/spark(.*)",
  "/settings(.*)",
  "/api(.*)"
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) await auth.protect();
});

export const config = {
  matcher: ["/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ico|ttf|woff2?|csv|docx?|xlsx?|zip|webmanifest)).*)", "/(api|trpc)(.*)"]
};

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/mock-users"]); // List methods to be protected by user auth ( user must be signed in to visit this path)

export default clerkMiddleware(async (auth, req) => {
  //Check to see if any route from the request matches any route listed in isProtectRoute Array
  //Then the protected auth.protect() method will redirect the users to the signin page if they are not signed in
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};

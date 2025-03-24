import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher(['/', '/auth(.*)', '/portal(.*)', '/api(.*)', '/chatbot(.*)'])

export default clerkMiddleware(async (auth, req) => {
  // Check if the request is from an iframe
  const isIframeRequest = req.headers.get('sec-fetch-dest') === 'iframe';
  
  console.log("Request URL:", req.url);
  console.log("Is public:", isPublicRoute(req));
  
  if (!isPublicRoute(req)) {
    console.log("Protecting route");
    await auth.protect();
  } else {
    console.log("Public route, not protecting");
  }

})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
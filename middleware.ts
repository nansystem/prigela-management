import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/auth-error",
]);

export default clerkMiddleware(async (auth, request) => {
  const { userId, sessionClaims } = await auth();

  // パブリックルートの場合は何もしない
  if (isPublicRoute(request)) {
    return;
  }

  // 未ログインの場合は保護
  if (!userId) {
    await auth.protect();
    return;
  }

  // prigela.comドメインのメールアドレスのみ許可
  // Clerkのsessionclaimsから正しくemailを取得
  const email = sessionClaims?.email as string | undefined;

  // emailが取得できない、または@prigela.comでない場合はエラーページにリダイレクト
  if (!email || !email.endsWith("@prigela.com")) {
    const url = new URL("/auth-error", request.url);
    return NextResponse.redirect(url);
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

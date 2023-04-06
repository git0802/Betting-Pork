import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: [
    "/",
    "/aboutus",
    "/home",
    "/maintenance",
    "/referral",
    "/register",
    "/transaction",
    "/userinformation",
    "/wallet",
    "/filter-result",
    "/game/:game*",
    "/gamelist",
    "/notification",
    "/product/:type*",
    "/promo",
    "/live-events",
    "/info",
    "/provider-profile/:provider*",
    "/result-togel",
  ],
};

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get("host") || "demo.vercel.pub";
  let path = url.pathname;

  if (path.startsWith(`/_sites`)) {
    path = `/404`;
  }

  return NextResponse.rewrite(new URL(`/_sites/${hostname}${path}`, req.url));
}

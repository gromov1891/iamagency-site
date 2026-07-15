import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const forwardedHost = request.headers.get("x-forwarded-host")?.split(",")[0]?.trim();
  const host = forwardedHost || request.headers.get("host") || "";

  if (host.toLowerCase().split(":")[0] === "www.iamagency.su") {
    const canonicalUrl = request.nextUrl.clone();
    canonicalUrl.protocol = "https:";
    canonicalUrl.hostname = "iamagency.su";
    canonicalUrl.port = "";

    return NextResponse.redirect(canonicalUrl, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};

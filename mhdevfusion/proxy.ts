import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const CANONICAL_HOST = "mhdevfusion.com";

const ALLOWED_HOSTS = new Set([
  CANONICAL_HOST,
  `www.${CANONICAL_HOST}`,
]);

function isLocalHost(host: string) {
  return (
    host === "localhost" ||
    host === "127.0.0.1" ||
    host.startsWith("192.168.") ||
    host.startsWith("10.") ||
    host.startsWith("169.254.")
  );
}

// Redirect any request arriving on a foreign domain (e.g. stale DNS records
// still pointing at this server's IP) to the canonical domain, so the site's
// content is never served or indexed under a domain we don't own.
export function proxy(request: NextRequest) {
  const host = (request.headers.get("host") ?? "")
    .split(":")[0]
    .toLowerCase();

  if (host && !ALLOWED_HOSTS.has(host) && !isLocalHost(host)) {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    url.host = CANONICAL_HOST;
    url.port = "";
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};

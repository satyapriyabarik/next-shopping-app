// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    console.log("🧭 Middleware running for:", req.nextUrl.pathname);

    const session = req.cookies.get("session")?.value;
    const { pathname } = req.nextUrl;

    if (
        !session &&
        ["/checkout", "/orders", "/profile", "/cart"].some(route =>
            pathname.startsWith(route)
        )
    ) {
        const loginUrl = new URL("/login", req.url);
        loginUrl.searchParams.set("redirect", pathname);
        console.log("🚫 Redirect to:", loginUrl.href);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

// ✅ next.config.js will ignore unless this is set
export const config = {
    matcher: [
        "/checkout",
        "/checkout/:path*",
        "/orders",
        "/orders/:path*",
        "/profile",
        "/profile/:path*",
        "/cart",
        "/cart/:path*",
    ],
};

// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const session = req.cookies.get("session");
    const { pathname } = req.nextUrl;

    // Protect these routes
    const protectedRoutes = ["/checkout", "/orders", "/profile"];

    if (!session && protectedRoutes.some((route) => pathname.startsWith(route))) {
        const loginUrl = new URL("/login", req.url);
        loginUrl.searchParams.set("redirect", pathname);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

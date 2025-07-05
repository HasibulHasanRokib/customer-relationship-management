import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/dashboard"];
const authRoutes = ["/signin", "/signup"];

export async function middleware(request: NextRequest) {
  const cookie = request.cookies.get("session-token")?.value;
  const path = request.nextUrl.pathname;

  if (!cookie && protectedRoutes.some((route) => path.startsWith(route))) {
    return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  }

  if (cookie && authRoutes.includes(path)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

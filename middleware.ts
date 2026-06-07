
import { getToken } from "@/lib/auth"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

function isTelegramRequest(request: NextRequest): boolean {
  const ua = request.headers.get("user-agent")?.toLowerCase() ?? ""
  return ua.includes("telegram") || ua.includes("tgweb")
}

function addSecurityHeaders(response: NextResponse, request: NextRequest): void {
  const isTelegram = isTelegramRequest(request)

  if (isTelegram) {
    response.headers.set(
      "Content-Security-Policy",
      "frame-ancestors 'self' https://t.me https://telegram.org;"
    )
  } else {
    response.headers.set("X-Frame-Options", "DENY")
  }
}

export async function middleware(request: NextRequest) {
  const authToken =await getToken()

  const response = NextResponse.next()
  addSecurityHeaders(response, request)

  const protectedPaths = ["/dashboard", "/profile/edit", "/mint-pass"]

  const isProtected = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  )

  if (isProtected && !authToken) {
    if (process.env.NODE_ENV === 'development') {
      return response
    }
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("redirect", request.nextUrl.pathname)
    const redirectResponse = NextResponse.redirect(loginUrl)
    addSecurityHeaders(redirectResponse, request)
    return redirectResponse
  }

  return response
}

export const config = {
  matcher: [
    "/((?!_next|static|favicon.ico|assets).*)",
  ]
}
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const user = request.cookies.get('user_roi')?.value
  const url = new URL(request.url)

  // Allow access to the register page
  if (url.pathname === '/register') return

  if (!user) {
    return NextResponse.redirect(new URL('/auth', request.url))
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$|manifest\\.json|auth(?:/.*)?).*)', '/register'],
}

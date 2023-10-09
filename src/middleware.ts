import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';

const editors = process.env.NEXT_PUBLIC_EDITORS.split(',');

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user && req.nextUrl.pathname === '/cms/auth') {
    return NextResponse.redirect(new URL('/cms', req.url));
  }

  if ((!user || !editors.includes(user.email)) && req.nextUrl.pathname === '/cms') {
    return NextResponse.redirect(new URL('/cms/auth', req.url));
  }

  return res;
}

export const config = {
  matcher: ['/', '/cms'],
};

import { NextRequest, NextResponse } from 'next/server';

const allowedOrigins = [
  'http://localhost:3000',
  'https://flowblitz.vercel.app'
];

const corsOptions = {
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization'
};

export function middleware(request: NextRequest) {
  const origin = request.headers.get('origin') ?? '';
  const isAllowedOrigin = allowedOrigins.includes(origin);

  console.log('Origin:', origin);
  console.log('Allowed Origins:', allowedOrigins);
  console.log('Is Allowed Origin:', isAllowedOrigin);

  // Handle preflight requests (OPTIONS)
  if (request.method === 'OPTIONS') {
    if (isAllowedOrigin) {
      const preflightHeaders = {
        'Access-Control-Allow-Origin': origin,
        ...corsOptions
      };
      return NextResponse.json({}, { headers: preflightHeaders });
    }
    return NextResponse.json(
      { message: 'Forbidden: Origin not allowed' },
      { status: 403 }
    );
  }

  // Block unauthorized origins outright
  if (!isAllowedOrigin) {
    return NextResponse.json(
      { message: 'Forbidden: Origin not allowed' },
      { status: 403 }
    );
  }

  // Handle simple requests (GET, POST, etc.)
  const response = NextResponse.next();
  response.headers.set('Access-Control-Allow-Origin', origin);
  Object.entries(corsOptions).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}

export const config = {
  matcher: [
    '/api/:path*' // Apply middleware to all API routes
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    // {
    //   source: '/((?!_next/static|_next/image|favicon.ico).*)',
    //   missing: [
    //     { type: 'header', key: 'next-router-prefetch' },
    //     { type: 'header', key: 'purpose', value: 'prefetch' }
    //   ]
    // }
  ]
};

import { NextRequest, NextResponse } from 'next/server';

export async function POST() {
  // Remove the userId cookie
  const response = NextResponse.json({ success: true });
  response.cookies.set('userId', '', {
    path: '/',
    maxAge: 0,
  });
  return response;
}

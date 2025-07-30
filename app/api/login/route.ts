import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
  }

  // Find user with student role
  const user = await prisma.user.findUnique({
    where: { email },
    include: { studentProfile: true },
  });
  if (!user || user.role !== 'STUDENT' || !user.studentProfile) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  // Compare password (assuming passwords are hashed)
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  // Return user info (omit password) and set userId cookie
  const { password: _, ...userSafe } = user;
  const response = NextResponse.json({ user: userSafe });
  response.cookies.set('userId', user.id, {
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    // secure: true, // Uncomment in production
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });
  return response;
}

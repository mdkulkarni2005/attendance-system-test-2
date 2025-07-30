import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const userId = req.cookies.get('userId')?.value;
  if (!userId) {
    return NextResponse.json({ user: null }, { status: 401 });
  }
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { studentProfile: true, teacherProfile: true },
  });
  if (!user) {
    return NextResponse.json({ user: null }, { status: 404 });
  }
  const { password, ...userSafe } = user;
  return NextResponse.json({ user: userSafe });
}

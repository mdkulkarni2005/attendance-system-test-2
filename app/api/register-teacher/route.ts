import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, phone, department, yearsOfExp, subjects } = await req.json();
    if (!name || !email || !password || !department || !yearsOfExp || !subjects) {
      return NextResponse.json({ error: 'All required fields must be filled.' }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { phone: phone || undefined },
        ],
      },
      include: { teacherProfile: true },
    });
    if (existingUser) {
      return NextResponse.json({ error: 'User with provided email or phone already exists.' }, { status: 409 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user and teacher profile
    const user = await prisma.user.create({
      data: {
        email,
        phone: phone || null,
        password: hashedPassword,
        role: 'TEACHER',
        teacherProfile: {
          create: {
            name,
            department,
            yearsOfExp: Number(yearsOfExp),
            subjects: subjects.split(',').map((s: string) => s.trim()),
          },
        },
      },
      include: { teacherProfile: true },
    });

    return NextResponse.json({ user: { ...user, password: undefined } });
  } catch (err) {
    console.error('Teacher registration error:', err);
    let message = 'Internal server error';
    if (err instanceof Error) message = err.message;
    else if (typeof err === 'object' && err !== null && 'message' in err) message = String(err.message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

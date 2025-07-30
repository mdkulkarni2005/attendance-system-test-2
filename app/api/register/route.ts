import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, phone, rollNo, sapId, department, year } = await req.json();
    if (!name || !email || !password || !rollNo || !sapId || !department || !year) {
      return NextResponse.json({ error: 'All required fields must be filled.' }, { status: 400 });
    }

    // Check if user or student already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { phone: phone || undefined },
        ],
      },
      include: { studentProfile: true },
    });
    
    // Check if rollNo or sapId already exists
    const existingStudent = await prisma.studentProfile.findFirst({
      where: {
        OR: [
          { rollNo },
          { sapId },
        ],
      },
    });
    if (existingUser) {
      return NextResponse.json({ error: 'User with provided email or phone already exists.' }, { status: 409 });
    }
    
    if (existingStudent) {
      return NextResponse.json({ error: 'Student with provided rollNo or sapId already exists.' }, { status: 409 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user and student profile
    const user = await prisma.user.create({
      data: {
        email,
        phone: phone || null,
        password: hashedPassword,
        role: 'STUDENT',
        studentProfile: {
          create: {
            name,
            rollNo,
            sapId,
            department,
            year: Number(year),
          },
        },
      },
      include: { studentProfile: true },
    });

    return NextResponse.json({ user: { ...user, password: undefined } });
  } catch (err) {
    console.error('Registration error:', err);
    let message = 'Internal server error';
    if (err instanceof Error) message = err.message;
    else if (typeof err === 'object' && err !== null && 'message' in err) message = String(err.message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/student/sessions?userId=...  (userId is the User.id)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');
  if (!userId) {
    return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
  }

  // Find the student's department and year
  const student = await prisma.studentProfile.findUnique({
    where: { userId },
    select: { department: true, year: true },
  });
  if (!student) {
    return NextResponse.json({ error: 'Student not found' }, { status: 404 });
  }

  // Fetch sessions for the student's department and year
  const sessions = await prisma.attendanceSession.findMany({
    where: {
      department: student.department,
      year: student.year,
      isActive: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(sessions);
}

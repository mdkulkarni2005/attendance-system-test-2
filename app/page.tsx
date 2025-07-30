"use client"

import { useState } from "react"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Users } from "lucide-react"
import StudentDashboard from "@/components/student-dashboard"
import TeacherDashboard from "@/components/teacher-dashboard"
import { useRouter } from 'next/navigation';

export default function AttendanceSystem() {
  const [userRole, setUserRole] = useState<"student" | "teacher" | null>(null)
  const [user, setUser] = useState<any>(null)
  const router = useRouter();

  const handleLogin = (role: "student" | "teacher") => {
    setUserRole(role)
    // Mock user data
    if (role === "student") {
      setUser({
        id: "S001",
        name: "John Doe",
        rollNo: "2021CS001",
        department: "Computer Science",
        year: "3rd Year",
        email: "john.doe@college.edu",
      })
    } else {
      setUser({
        id: "T001",
        name: "Dr. Sarah Wilson",
        department: "Computer Science",
        email: "sarah.wilson@college.edu",
        subjects: ["Data Structures", "Algorithms", "Database Systems"],
      })
    }
  }

  const handleLogout = async () => {
    // Remove userId cookie by calling a logout API route
    await fetch('/api/logout', { method: 'POST' });
    setUserRole(null);
    setUser(null);
    router.push('/login');
  }

  // Remove the landing page and role selection UI
  // Always show the dashboard for authenticated users
  return (
    <div className="min-h-screen bg-gray-50">
      {userRole === "student" ? (
        <StudentDashboard user={user} onLogout={handleLogout} />
      ) : (
        <TeacherDashboard user={user} onLogout={handleLogout} />
      )}
    </div>
  )
}

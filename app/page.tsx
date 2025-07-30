"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import StudentDashboard from "@/components/student-dashboard";
import TeacherDashboard from "@/components/teacher-dashboard";
import { useRouter } from "next/navigation";

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      try {
        setLoading(true);
        console.log("Fetching user from /api/me...");
        const res = await fetch("/api/me");
        console.log("Response status:", res.status);

        if (res.ok) {
          const data = await res.json();
          console.log("User data:", data);
          setUser(data.user);
        } else {
          console.log("User not authenticated");
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-xl text-gray-500">Loading...</div>;
  }

  if (user) {
    if (user.role === "STUDENT") {
      return <StudentDashboard user={user} onLogout={() => { fetch('/api/logout', { method: 'POST' }).then(() => window.location.href = '/'); }} />;
    }
    if (user.role === "TEACHER") {
      return <TeacherDashboard user={user} onLogout={() => { fetch('/api/logout', { method: 'POST' }).then(() => window.location.href = '/'); }} />;
    }
    return <div className="min-h-screen flex items-center justify-center text-xl text-red-500">Unknown user role</div>;
  }

  // Not logged in: show landing page
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 p-4">
      <div className="bg-white/80 rounded-2xl shadow-xl p-10 max-w-lg w-full flex flex-col items-center">
        <Image src="/placeholder-logo.png" alt="SVKM Logo" width={80} height={80} className="mb-4" />
        <h1 className="text-4xl font-extrabold text-blue-800 mb-2 text-center drop-shadow">SVKM Dhule</h1>
        <p className="text-lg text-gray-700 mb-6 text-center font-medium">Attendance Management System</p>
        <div className="mb-8 text-center">
          <span className="text-gray-500">Developed by </span>
          <span className="font-semibold text-indigo-700">Manas D. Kulkarni</span>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <button
            onClick={() => router.push("/login/student")}
            className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg shadow transition"
          >
            Student Login
          </button>
          <button
            onClick={() => router.push("/login/teacher")}
            className="w-full py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-bold text-lg shadow transition"
          >
            Teacher Login
          </button>
        </div>
      </div>
      <div className="mt-8 text-gray-400 text-xs text-center">
        &copy; {new Date().getFullYear()} SVKM Dhule. All rights reserved.
      </div>
    </div>
  );
}

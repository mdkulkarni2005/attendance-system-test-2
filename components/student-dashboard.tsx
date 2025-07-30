"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CheckCircle, XCircle, Clock, Bell, BookOpen, LogOut } from "lucide-react"
import StudentAttendanceCard from "@/components/student-attendance-card"
import AttendanceTable from "@/components/attendance-table"

interface StudentDashboardProps {
  user: any
  onLogout: () => void
}

export default function StudentDashboard({ user, onLogout }: StudentDashboardProps) {
  const [activeSession, setActiveSession] = useState({
    isActive: true,
    subject: "Data Structures",
    teacher: "Dr. Sarah Wilson",
    startTime: "10:00 AM",
    endTime: "11:00 AM",
  })

  const [attendanceRecords] = useState([
    {
      id: 1,
      date: "2024-01-15",
      subject: "Data Structures",
      status: "Present",
      timeMarked: "10:05 AM",
      teacher: "Dr. Sarah Wilson",
    },
    {
      id: 2,
      date: "2024-01-14",
      subject: "Algorithms",
      status: "Present",
      timeMarked: "09:02 AM",
      teacher: "Prof. John Smith",
    },
    {
      id: 3,
      date: "2024-01-13",
      subject: "Database Systems",
      status: "Absent",
      timeMarked: "-",
      teacher: "Dr. Emily Brown",
    },
    {
      id: 4,
      date: "2024-01-12",
      subject: "Data Structures",
      status: "Late",
      timeMarked: "10:15 AM",
      teacher: "Dr. Sarah Wilson",
    },
  ])

  const handleMarkAttendance = () => {
    // Mock attendance marking
    alert("Attendance marked successfully!")
    setActiveSession((prev) => ({ ...prev, isActive: false }))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Present":
        return "bg-green-100 text-green-800"
      case "Absent":
        return "bg-red-100 text-red-800"
      case "Late":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Present":
        return <CheckCircle className="h-4 w-4" />
      case "Absent":
        return <XCircle className="h-4 w-4" />
      case "Late":
        return <Clock className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">AttendEase</h1>
                <p className="text-sm text-gray-500">Student Portal</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={onLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Active Session Alert */}
        {activeSession.isActive && (
          <Alert className="mb-6 border-blue-200 bg-blue-50">
            <Bell className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              <strong>Active Session:</strong> {activeSession.subject} by {activeSession.teacher}(
              {activeSession.startTime} - {activeSession.endTime})
            </AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Quick Actions */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <StudentAttendanceCard
                isActive={activeSession.isActive}
                subject={activeSession.subject}
                teacher={activeSession.teacher}
                onMarkAttendance={handleMarkAttendance}
              />

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Today's Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Total Classes</span>
                      <span className="font-semibold">4</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Attended</span>
                      <span className="font-semibold text-green-600">3</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Attendance Rate</span>
                      <span className="font-semibold">75%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">This Week</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Classes Attended</span>
                      <span className="font-semibold text-green-600">18/20</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Attendance Rate</span>
                      <span className="font-semibold">90%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: "90%" }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Attendance */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Attendance</CardTitle>
                <CardDescription>Your latest attendance records</CardDescription>
              </CardHeader>
              <CardContent>
                <AttendanceTable records={attendanceRecords.slice(0, 5)} showActions={false} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Attendance History</CardTitle>
                <CardDescription>Complete record of your attendance</CardDescription>
              </CardHeader>
              <CardContent>
                <AttendanceTable records={attendanceRecords} showActions={false} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Student Profile</CardTitle>
                <CardDescription>Your academic information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-20 w-20">
                      <AvatarFallback className="text-lg">
                        {user?.name
                          ? user.name.split(" ").map((n: string) => n[0]).join("")
                          : ""}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-semibold">{user.name}</h3>
                      <p className="text-gray-600">{user.rollNo}</p>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Department</label>
                      <p className="text-lg">{user.department}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Year</label>
                      <p className="text-lg">{user.year}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Roll Number</label>
                      <p className="text-lg">{user.rollNo}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Email</label>
                      <p className="text-lg">{user.email}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

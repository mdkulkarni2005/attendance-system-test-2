"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Download, LogOut, BookOpen, CheckCircle, XCircle } from "lucide-react"
import TeacherSessionManager from "@/components/teacher-session-manager"
import LocationMapView from "@/components/location-map-view"

interface TeacherDashboardProps {
  user: any
  onLogout: () => void
}

export default function TeacherDashboard({ user, onLogout }: TeacherDashboardProps) {
  const [activeSession, setActiveSession] = useState<any>(null)
  const [students] = useState([
    {
      id: "S001",
      name: "John Doe",
      rollNo: "2021CS001",
      status: "Present",
      timeMarked: "10:05 AM",
      location: { lat: 40.7128, lng: -74.006 },
    },
    {
      id: "S002",
      name: "Jane Smith",
      rollNo: "2021CS002",
      status: "Present",
      timeMarked: "10:03 AM",
      location: { lat: 40.713, lng: -74.0058 },
    },
    {
      id: "S003",
      name: "Mike Johnson",
      rollNo: "2021CS003",
      status: "Absent",
      timeMarked: "-",
      location: null,
    },
    {
      id: "S004",
      name: "Sarah Wilson",
      rollNo: "2021CS004",
      status: "Present",
      timeMarked: "10:07 AM",
      location: { lat: 40.7125, lng: -74.0062 },
    },
  ])

  const [sessionHistory] = useState([
    {
      id: 1,
      date: "2024-01-15",
      subject: "Data Structures",
      department: "Computer Science",
      totalStudents: 45,
      presentStudents: 42,
      duration: "60 mins",
    },
    {
      id: 2,
      date: "2024-01-14",
      subject: "Algorithms",
      department: "Computer Science",
      totalStudents: 38,
      presentStudents: 35,
      duration: "90 mins",
    },
  ])

  const handleStartSession = (sessionData: any) => {
    setActiveSession({
      ...sessionData,
      startTime: new Date().toLocaleTimeString(),
      studentsPresent: 0,
      studentsTotal: students.length,
    })
  }

  const handleStopSession = () => {
    setActiveSession(null)
  }

  const presentStudents = students.filter((s) => s.status === "Present")
  const absentStudents = students.filter((s) => s.status === "Absent")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <BookOpen className="h-8 w-8 text-green-600" />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">AttendEase</h1>
                <p className="text-sm text-gray-500">Teacher Portal</p>
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
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="map">Map View</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Session Manager */}
            <TeacherSessionManager
              user={user}
              activeSession={activeSession}
              onStartSession={handleStartSession}
              onStopSession={handleStopSession}
            />

            {/* Live Attendance Tracker */}
            {activeSession && (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Total Students</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{students.length}</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Present</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">{presentStudents.length}</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Absent</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-red-600">{absentStudents.length}</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Attendance Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {Math.round((presentStudents.length / students.length) * 100)}%
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Student Lists */}
            {activeSession && (
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-green-600">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Present Students ({presentStudents.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {presentStudents.map((student) => (
                        <div key={student.id} className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                          <div>
                            <p className="font-medium">{student.name}</p>
                            <p className="text-sm text-gray-600">{student.rollNo}</p>
                          </div>
                          <div className="text-right">
                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                              {student.timeMarked}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-red-600">
                      <XCircle className="h-5 w-5 mr-2" />
                      Absent Students ({absentStudents.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {absentStudents.map((student) => (
                        <div key={student.id} className="flex items-center justify-between p-2 bg-red-50 rounded-lg">
                          <div>
                            <p className="font-medium">{student.name}</p>
                            <p className="text-sm text-gray-600">{student.rollNo}</p>
                          </div>
                          <Badge variant="secondary" className="bg-red-100 text-red-800">
                            Absent
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          <TabsContent value="map" className="space-y-6">
            <LocationMapView students={presentStudents} />
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Session History</CardTitle>
                  <CardDescription>Past attendance sessions and statistics</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sessionHistory.map((session) => (
                    <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">{session.subject}</p>
                        <p className="text-sm text-gray-600">
                          {session.date} • {session.department}
                        </p>
                        <p className="text-sm text-gray-600">Duration: {session.duration}</p>
                      </div>
                      <div className="text-right space-y-1">
                        <p className="font-medium">
                          {session.presentStudents}/{session.totalStudents}
                        </p>
                        <p className="text-sm text-gray-600">
                          {Math.round((session.presentStudents / session.totalStudents) * 100)}% attendance
                        </p>
                        <Badge variant="secondary">{session.presentStudents} present</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Teacher Profile</CardTitle>
                <CardDescription>Your academic information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-20 w-20">
                      <AvatarFallback className="text-lg">
                        {user?.name
                          ? user.name
                              .split(" ")
                              .map((n: string) => n[0])
                              .join("")
                          : ""}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-semibold">{user?.name || "-"}</h3>
                      <p className="text-gray-600">{user?.department || "-"}</p>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Department</label>
                      <p className="text-lg">{user?.department || "-"}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Email</label>
                      <p className="text-lg">{user?.email || "-"}</p>
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-sm font-medium text-gray-500">Subjects</label>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {user?.subjects?.map((subject: string, index: number) => (
                          <Badge key={index} variant="secondary">
                            {subject}
                          </Badge>
                        )) || <p className="text-gray-500">No subjects assigned</p>}
                      </div>
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

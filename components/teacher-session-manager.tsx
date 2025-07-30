"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Play, Square, Clock } from "lucide-react"

interface TeacherSessionManagerProps {
  user: any
  activeSession: any
  onStartSession: (sessionData: any) => void
  onStopSession: () => void
}

export default function TeacherSessionManager({
  user,
  activeSession,
  onStartSession,
  onStopSession,
}: TeacherSessionManagerProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [sessionData, setSessionData] = useState({
    subject: "",
    department: "Computer Science",
    duration: "60",
  })

  const handleStartSession = () => {
    onStartSession(sessionData)
    setIsDialogOpen(false)
    setSessionData({ subject: "", department: "Computer Science", duration: "60" })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Session Management</CardTitle>
        <CardDescription>Start and manage attendance sessions</CardDescription>
      </CardHeader>
      <CardContent>
        {activeSession ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="space-y-1">
                <div className="flex items-center">
                  <Badge className="bg-green-100 text-green-800 mr-2">
                    <Clock className="h-3 w-3 mr-1" />
                    Active
                  </Badge>
                  <span className="font-medium">{activeSession.subject}</span>
                </div>
                <p className="text-sm text-gray-600">
                  Started at {activeSession.startTime} • {activeSession.department}
                </p>
                <p className="text-sm text-gray-600">Duration: {activeSession.duration} minutes</p>
              </div>
              <Button variant="destructive" onClick={onStopSession} className="bg-red-600 hover:bg-red-700">
                <Square className="h-4 w-4 mr-2" />
                Stop Session
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-gray-600">No active session. Start a new attendance session.</p>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <Play className="h-4 w-4 mr-2" />
                  Start New Session
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Start Attendance Session</DialogTitle>
                  <DialogDescription>Configure the details for your attendance session</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Select
                      value={sessionData.subject}
                      onValueChange={(value) => setSessionData((prev) => ({ ...prev, subject: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {user?.subjects?.map((subject: string) => (
                          <SelectItem key={subject} value={subject}>
                            {subject}
                          </SelectItem>
                        )) || <SelectItem value="">No subjects available</SelectItem>}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="department">Department</Label>
                    <Select
                      value={sessionData.department}
                      onValueChange={(value) => setSessionData((prev) => ({ ...prev, department: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Computer Science">Computer Science</SelectItem>
                        <SelectItem value="Electronics">Electronics</SelectItem>
                        <SelectItem value="Mechanical">Mechanical</SelectItem>
                        <SelectItem value="Civil">Civil</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="duration">Duration (minutes)</Label>
                    <Select
                      value={sessionData.duration}
                      onValueChange={(value) => setSessionData((prev) => ({ ...prev, duration: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">60 minutes</SelectItem>
                        <SelectItem value="90">90 minutes</SelectItem>
                        <SelectItem value="120">120 minutes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button onClick={handleStartSession} className="w-full" disabled={!sessionData.subject}>
                    <Play className="h-4 w-4 mr-2" />
                    Start Session
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

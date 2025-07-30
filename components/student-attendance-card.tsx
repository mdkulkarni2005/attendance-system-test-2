"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, MapPin } from "lucide-react"

interface StudentAttendanceCardProps {
  isActive: boolean
  subject: string
  teacher: string
  onMarkAttendance: () => void
}

export default function StudentAttendanceCard({
  isActive,
  subject,
  teacher,
  onMarkAttendance,
}: StudentAttendanceCardProps) {
  return (
    <Card className={`${isActive ? "border-blue-200 bg-blue-50" : "border-gray-200"}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Mark Attendance</CardTitle>
          {isActive && (
            <Badge className="bg-blue-100 text-blue-800">
              <Clock className="h-3 w-3 mr-1" />
              Active
            </Badge>
          )}
        </div>
        {isActive && (
          <CardDescription>
            {subject} by {teacher}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        {isActive ? (
          <div className="space-y-4">
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="h-4 w-4 mr-2" />
              Location verification enabled
            </div>
            <Button onClick={onMarkAttendance} className="w-full bg-blue-600 hover:bg-blue-700">
              <CheckCircle className="h-4 w-4 mr-2" />
              Mark Present
            </Button>
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-gray-500">No active attendance session</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

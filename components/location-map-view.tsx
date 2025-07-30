"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, Navigation } from "lucide-react"

interface LocationMapViewProps {
  students: Array<{
    id: string
    name: string
    rollNo: string
    status: string
    location: { lat: number; lng: number } | null
  }>
}

export default function LocationMapView({ students }: LocationMapViewProps) {
  // Mock map implementation - in real app, integrate with Google Maps API
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="h-5 w-5 mr-2" />
            Student Location Map
          </CardTitle>
          <CardDescription>Real-time location of students who marked attendance</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Mock Map Container */}
          <div className="relative bg-gray-100 rounded-lg h-96 flex items-center justify-center border-2 border-dashed border-gray-300">
            <div className="text-center space-y-2">
              <Navigation className="h-12 w-12 mx-auto text-gray-400" />
              <p className="text-gray-500 font-medium">Interactive Map View</p>
              <p className="text-sm text-gray-400">Google Maps integration would display student locations here</p>
            </div>

            {/* Mock location pins */}
            <div className="absolute top-4 left-4 space-y-2">
              <Badge className="bg-blue-100 text-blue-800">
                <MapPin className="h-3 w-3 mr-1" />
                Campus Location
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Student Location List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Students with Location ({students.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {students.map((student) => (
              <div key={student.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">{student.name}</p>
                    <p className="text-sm text-gray-600">{student.rollNo}</p>
                  </div>
                </div>
                <div className="text-right">
                  {student.location && (
                    <p className="text-xs text-gray-500">
                      {student.location.lat.toFixed(4)}, {student.location.lng.toFixed(4)}
                    </p>
                  )}
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    <MapPin className="h-3 w-3 mr-1" />
                    On Campus
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

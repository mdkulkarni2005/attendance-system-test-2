"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Clock } from "lucide-react"

interface AttendanceRecord {
  id: number
  date: string
  subject: string
  status: string
  timeMarked: string
  teacher?: string
}

interface AttendanceTableProps {
  records: AttendanceRecord[]
  showActions?: boolean
}

export default function AttendanceTable({ records, showActions = true }: AttendanceTableProps) {
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
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Time Marked</TableHead>
            <TableHead>Teacher</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.map((record) => (
            <TableRow key={record.id}>
              <TableCell className="font-medium">{new Date(record.date).toLocaleDateString()}</TableCell>
              <TableCell>{record.subject}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(record.status)}>
                  <span className="flex items-center">
                    {getStatusIcon(record.status)}
                    <span className="ml-1">{record.status}</span>
                  </span>
                </Badge>
              </TableCell>
              <TableCell>{record.timeMarked}</TableCell>
              <TableCell className="text-gray-600">{record.teacher}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

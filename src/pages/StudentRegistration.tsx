import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Users, GraduationCap, Filter } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { api, CourseOffering, Course, CourseType, type StudentRegistration as StudentRegistrationType } from "@/lib/api"

export default function StudentRegistration() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false)
  const [studentName, setStudentName] = useState("")
  const [selectedOffering, setSelectedOffering] = useState("")
  const [selectedCourseType, setSelectedCourseType] = useState("")
  const [viewingOffering, setViewingOffering] = useState<string | null>(null)
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const { data: courseOfferings = [] } = useQuery({
    queryKey: ['courseOfferings'],
    queryFn: api.courseOfferings.getAll
  })

  const { data: courses = [] } = useQuery({
    queryKey: ['courses'],
    queryFn: api.courses.getAll
  })

  const { data: courseTypes = [] } = useQuery({
    queryKey: ['courseTypes'],
    queryFn: api.courseTypes.getAll
  })

  const { data: filteredOfferings = [] } = useQuery({
    queryKey: ['filteredOfferings', selectedCourseType],
    queryFn: () => selectedCourseType && selectedCourseType !== "all" ? api.registrations.getOfferingsByType(selectedCourseType) : [],
    enabled: !!selectedCourseType && selectedCourseType !== "all"
  })

  const { data: registrations = [] } = useQuery<StudentRegistrationType[]>({
    queryKey: ['registrations', viewingOffering],
    queryFn: () => viewingOffering ? api.registrations.getByOffering(viewingOffering) : [],
    enabled: !!viewingOffering
  })

  const registerMutation = useMutation({
    mutationFn: ({ studentName, courseOffering }: { studentName: string, courseOffering: string }) => 
      api.registrations.register(studentName, courseOffering),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['registrations'] })
      setIsRegisterOpen(false)
      setStudentName("")
      setSelectedOffering("")
      toast({
        title: "Success",
        description: "Student registered successfully",
      })
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to register student",
        variant: "destructive"
      })
    }
  })

  const handleRegister = () => {
    if (studentName.trim() && selectedOffering) {
      registerMutation.mutate({ studentName: studentName.trim(), courseOffering: selectedOffering })
    }
  }

  const getCourseName = (course: string | Course) => {
    if (typeof course === 'string') {
      const found = courses.find(c => c._id === course)
      return found?.name || course
    }
    return course.name
  }

  const getCourseTypeName = (courseType: string | CourseType) => {
    if (typeof courseType === 'string') {
      const found = courseTypes.find(ct => ct._id === courseType)
      return found?.name || courseType
    }
    return courseType.name
  }

  const getOfferingDisplay = (offering: CourseOffering) => {
    const courseName = getCourseName(offering.course)
    const courseTypeName = getCourseTypeName(offering.courseType)
    return `${courseName} - ${courseTypeName}`
  }

  const displayOfferings = selectedCourseType && selectedCourseType !== "all" ? filteredOfferings : courseOfferings

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Users className="h-8 w-8 text-primary" />
            Student Registration
          </h2>
          <p className="text-muted-foreground mt-2">
            Register students for course offerings and manage registrations
          </p>
        </div>

        <Dialog open={isRegisterOpen} onOpenChange={setIsRegisterOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Register Student
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Register New Student</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div>
                <Label htmlFor="studentName">Student Name</Label>
                <Input
                  id="studentName"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Enter student name"
                />
              </div>
              <div>
                <Label htmlFor="offering">Course Offering</Label>
                <Select value={selectedOffering} onValueChange={setSelectedOffering}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a course offering" />
                  </SelectTrigger>
                  <SelectContent>
                    {courseOfferings.map((offering) => (
                      <SelectItem key={offering._id} value={offering._id}>
                        {getOfferingDisplay(offering)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setIsRegisterOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleRegister}
                  disabled={!studentName.trim() || !selectedOffering || registerMutation.isPending}
                >
                  {registerMutation.isPending ? "Registering..." : "Register"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="offerings" className="space-y-6">
        <TabsList>
          <TabsTrigger value="offerings">Course Offerings</TabsTrigger>
          <TabsTrigger value="registrations">View Registrations</TabsTrigger>
        </TabsList>

        <TabsContent value="offerings" className="space-y-4">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Available Course Offerings</span>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <Select value={selectedCourseType} onValueChange={setSelectedCourseType}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by course type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Course Types</SelectItem>
                      {courseTypes.map((courseType) => (
                        <SelectItem key={courseType._id} value={courseType._id}>
                          {courseType.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {displayOfferings.length === 0 ? (
                <div className="text-center py-8">
                  <GraduationCap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No course offerings available</h3>
                  <p className="text-muted-foreground mb-4">
                    {selectedCourseType ? "No offerings found for the selected course type." : "Create course offerings first to enable student registration."}
                  </p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Course</TableHead>
                      <TableHead>Course Type</TableHead>
                      <TableHead>Created Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {displayOfferings.map((offering) => (
                      <TableRow key={offering._id}>
                        <TableCell className="font-medium">
                          {getCourseName(offering.course)}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {getCourseTypeName(offering.courseType)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(offering.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">Available</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setViewingOffering(offering._id)}
                          >
                            View Students
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="registrations" className="space-y-4">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Student Registrations</CardTitle>
            </CardHeader>
            <CardContent>
              {!viewingOffering ? (
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Select a course offering</h3>
                  <p className="text-muted-foreground mb-4">
                    Choose a course offering from the first tab to view registered students.
                  </p>
                </div>
              ) : registrations.length === 0 ? (
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No students registered</h3>
                  <p className="text-muted-foreground mb-4">
                    No students have registered for this course offering yet.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>Showing {registrations.length} registered student{registrations.length !== 1 ? 's' : ''}</span>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student Name</TableHead>
                        <TableHead>Registration Date</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {registrations.map((registration) => (
                        <TableRow key={registration._id}>
                          <TableCell className="font-medium">
                            {registration.studentName}
                          </TableCell>
                          <TableCell>
                            {new Date(registration.createdAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary">Registered</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
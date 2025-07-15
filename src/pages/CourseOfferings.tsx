import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, FileText } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { api, CourseOffering, Course, CourseType } from "@/lib/api"

export default function CourseOfferings() {
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<CourseOffering | null>(null)
  const [selectedCourse, setSelectedCourse] = useState("")
  const [selectedCourseType, setSelectedCourseType] = useState("")
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const { data: courseOfferings = [], isLoading } = useQuery({
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

  const createMutation = useMutation({
    mutationFn: ({ course, courseType }: { course: string, courseType: string }) => 
      api.courseOfferings.create(course, courseType),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courseOfferings'] })
      setIsCreateOpen(false)
      setSelectedCourse("")
      setSelectedCourseType("")
      toast({
        title: "Success",
        description: "Course offering created successfully",
      })
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create course offering",
        variant: "destructive"
      })
    }
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, course, courseType }: { id: string, course: string, courseType: string }) => 
      api.courseOfferings.update(id, course, courseType),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courseOfferings'] })
      setIsEditOpen(false)
      setEditingItem(null)
      setSelectedCourse("")
      setSelectedCourseType("")
      toast({
        title: "Success",
        description: "Course offering updated successfully",
      })
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update course offering",
        variant: "destructive"
      })
    }
  })

  const deleteMutation = useMutation({
    mutationFn: api.courseOfferings.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courseOfferings'] })
      toast({
        title: "Success",
        description: "Course offering deleted successfully",
      })
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete course offering",
        variant: "destructive"
      })
    }
  })

  const handleCreate = () => {
    if (selectedCourse && selectedCourseType) {
      createMutation.mutate({ course: selectedCourse, courseType: selectedCourseType })
    }
  }

  const handleEdit = (item: CourseOffering) => {
    setEditingItem(item)
    setSelectedCourse(typeof item.course === 'string' ? item.course : item.course._id)
    setSelectedCourseType(typeof item.courseType === 'string' ? item.courseType : item.courseType._id)
    setIsEditOpen(true)
  }

  const handleUpdate = () => {
    if (editingItem && selectedCourse && selectedCourseType) {
      updateMutation.mutate({ 
        id: editingItem._id, 
        course: selectedCourse, 
        courseType: selectedCourseType 
      })
    }
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this course offering?")) {
      deleteMutation.mutate(id)
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <FileText className="h-8 w-8 text-primary" />
            Course Offerings
          </h2>
          <p className="text-muted-foreground mt-2">
            Manage associations between courses and course types
          </p>
        </div>

        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Course Offering
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Course Offering</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div>
                <Label htmlFor="course">Course</Label>
                <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a course" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map((course) => (
                      <SelectItem key={course._id} value={course._id}>
                        {course.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="courseType">Course Type</Label>
                <Select value={selectedCourseType} onValueChange={setSelectedCourseType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a course type" />
                  </SelectTrigger>
                  <SelectContent>
                    {courseTypes.map((courseType) => (
                      <SelectItem key={courseType._id} value={courseType._id}>
                        {courseType.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleCreate}
                  disabled={!selectedCourse || !selectedCourseType || createMutation.isPending}
                >
                  {createMutation.isPending ? "Creating..." : "Create"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Course Offerings List</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : courseOfferings.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No course offerings yet</h3>
              <p className="text-muted-foreground mb-4">Create your first course offering to get started.</p>
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
                {courseOfferings.map((offering) => (
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
                      <Badge variant="secondary">Active</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(offering)}
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(offering._id)}
                          className="h-8 w-8 p-0 hover:bg-destructive hover:text-destructive-foreground"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Course Offering</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div>
              <Label htmlFor="edit-course">Course</Label>
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a course" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((course) => (
                    <SelectItem key={course._id} value={course._id}>
                      {course.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="edit-courseType">Course Type</Label>
              <Select value={selectedCourseType} onValueChange={setSelectedCourseType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a course type" />
                </SelectTrigger>
                <SelectContent>
                  {courseTypes.map((courseType) => (
                    <SelectItem key={courseType._id} value={courseType._id}>
                      {courseType.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setIsEditOpen(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleUpdate}
                disabled={!selectedCourse || !selectedCourseType || updateMutation.isPending}
              >
                {updateMutation.isPending ? "Updating..." : "Update"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
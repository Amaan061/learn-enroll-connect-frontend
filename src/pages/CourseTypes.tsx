import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Layers } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { api, CourseType } from "@/lib/api"

export default function CourseTypes() {
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<CourseType | null>(null)
  const [newName, setNewName] = useState("")
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const { data: courseTypes = [], isLoading } = useQuery({
    queryKey: ['courseTypes'],
    queryFn: api.courseTypes.getAll
  })

  const createMutation = useMutation({
    mutationFn: api.courseTypes.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courseTypes'] })
      setIsCreateOpen(false)
      setNewName("")
      toast({
        title: "Success",
        description: "Course type created successfully",
      })
    },
    onError: () => {
      toast({
        title: "Error", 
        description: "Failed to create course type",
        variant: "destructive"
      })
    }
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, name }: { id: string, name: string }) => api.courseTypes.update(id, name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courseTypes'] })
      setIsEditOpen(false)
      setEditingItem(null)
      setNewName("")
      toast({
        title: "Success",
        description: "Course type updated successfully",
      })
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update course type", 
        variant: "destructive"
      })
    }
  })

  const deleteMutation = useMutation({
    mutationFn: api.courseTypes.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courseTypes'] })
      toast({
        title: "Success",
        description: "Course type deleted successfully",
      })
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete course type",
        variant: "destructive"
      })
    }
  })

  const handleCreate = () => {
    if (newName.trim()) {
      createMutation.mutate(newName.trim())
    }
  }

  const handleEdit = (item: CourseType) => {
    setEditingItem(item)
    setNewName(item.name)
    setIsEditOpen(true)
  }

  const handleUpdate = () => {
    if (editingItem && newName.trim()) {
      updateMutation.mutate({ id: editingItem._id, name: newName.trim() })
    }
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this course type?")) {
      deleteMutation.mutate(id)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Layers className="h-8 w-8 text-primary" />
            Course Types
          </h2>
          <p className="text-muted-foreground mt-2">
            Manage different types of courses (Individual, Group, Special, etc.)
          </p>
        </div>

        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Course Type
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Course Type</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div>
                <Label htmlFor="name">Course Type Name</Label>
                <Input
                  id="name"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Individual, Group, Weekend Batch"
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleCreate}
                  disabled={!newName.trim() || createMutation.isPending}
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
          <CardTitle>Course Types List</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : courseTypes.length === 0 ? (
            <div className="text-center py-8">
              <Layers className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No course types yet</h3>
              <p className="text-muted-foreground mb-4">Create your first course type to get started.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Created Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courseTypes.map((courseType) => (
                  <TableRow key={courseType._id}>
                    <TableCell className="font-medium">{courseType.name}</TableCell>
                    <TableCell>
                      {new Date(courseType.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">Active</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(courseType)}
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(courseType._id)}
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
            <DialogTitle>Edit Course Type</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div>
              <Label htmlFor="edit-name">Course Type Name</Label>
              <Input
                id="edit-name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Course type name"
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setIsEditOpen(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleUpdate}
                disabled={!newName.trim() || updateMutation.isPending}
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
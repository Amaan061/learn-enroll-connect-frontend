import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, BookOpen, Users, Layers, FileText, TrendingUp } from "lucide-react"
import { api } from "@/lib/api"

export default function Dashboard() {
  const { data: courseTypes = [] } = useQuery({
    queryKey: ['courseTypes'],
    queryFn: api.courseTypes.getAll
  })

  const { data: courses = [] } = useQuery({
    queryKey: ['courses'], 
    queryFn: api.courses.getAll
  })

  const { data: courseOfferings = [] } = useQuery({
    queryKey: ['courseOfferings'],
    queryFn: api.courseOfferings.getAll
  })

  const stats = [
    {
      title: "Course Types",
      value: courseTypes.length,
      icon: Layers,
      description: "Different types of courses available",
      color: "text-blue-600"
    },
    {
      title: "Courses",
      value: courses.length,
      icon: BookOpen,
      description: "Total courses offered",
      color: "text-green-600"
    },
    {
      title: "Course Offerings",
      value: courseOfferings.length,
      icon: FileText,
      description: "Active course offerings",
      color: "text-purple-600"
    },
    {
      title: "System Status",
      value: "Active",
      icon: TrendingUp,
      description: "All systems operational",
      color: "text-emerald-600"
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Dashboard</h2>
        <p className="text-muted-foreground mt-2">
          Welcome to the Student Registration System. Overview of your educational platform.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="shadow-card hover:shadow-elegant transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="font-medium text-sm">System Initialized</p>
                  <p className="text-xs text-muted-foreground">Ready to manage student registrations</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="font-medium text-sm">Database Connected</p>
                  <p className="text-xs text-muted-foreground">All APIs are operational</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <button className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 rounded-lg hover:shadow-md transition-all duration-200 text-left">
                <Layers className="h-6 w-6 text-blue-600 mb-2" />
                <p className="font-medium text-sm">Manage Course Types</p>
              </button>
              <button className="p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 rounded-lg hover:shadow-md transition-all duration-200 text-left">
                <BookOpen className="h-6 w-6 text-green-600 mb-2" />
                <p className="font-medium text-sm">Manage Courses</p>
              </button>
              <button className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 rounded-lg hover:shadow-md transition-all duration-200 text-left">
                <FileText className="h-6 w-6 text-purple-600 mb-2" />
                <p className="font-medium text-sm">Course Offerings</p>
              </button>
              <button className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900 rounded-lg hover:shadow-md transition-all duration-200 text-left">
                <Users className="h-6 w-6 text-orange-600 mb-2" />
                <p className="font-medium text-sm">Student Registration</p>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
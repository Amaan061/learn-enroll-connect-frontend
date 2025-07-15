import { BookOpen, Users, Layers, FileText, BarChart3 } from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

const menuItems = [
  { title: "Dashboard", url: "/", icon: BarChart3 },
  { title: "Course Types", url: "/course-types", icon: Layers },
  { title: "Courses", url: "/courses", icon: BookOpen },
  { title: "Course Offerings", url: "/course-offerings", icon: FileText },
  { title: "Student Registration", url: "/registration", icon: Users },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const location = useLocation()

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/"
    return location.pathname.startsWith(path)
  }

  const getNavClass = (path: string) => {
    const active = isActive(path)
    return active 
      ? "bg-primary text-primary-foreground font-medium shadow-sm" 
      : "hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
  }

  const isCollapsed = state === "collapsed"

  return (
    <Sidebar variant="sidebar" className={isCollapsed ? "w-14" : "w-64"}>
      <div className="p-4 border-b">
        {!isCollapsed && (
          <div>
            <h2 className="text-lg font-semibold text-primary">EduAdmin</h2>
            <p className="text-sm text-muted-foreground">Student Registration System</p>
          </div>
        )}
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavClass(item.url)}>
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
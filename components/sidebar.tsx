"use client"

import { motion } from "framer-motion"
import { Home, LineChart, LogOut, Settings, User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface SidebarProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

interface ActivityItem {
  id: number
  title: string
  action: string
  time: string
}

export function Sidebar({ sidebarOpen }: SidebarProps) {
  const recentActivity: ActivityItem[] = [
    { id: 1, title: "Customer Satisfaction Q2", action: "Created", time: "2 days ago" },
    { id: 2, title: "Employee Engagement", action: "Edited", time: "4 days ago" },
    { id: 3, title: "Product Feedback", action: "Shared", time: "1 week ago" },
  ]

  return (
    <motion.div
      className={`bg-gradient-to-b from-blue-900/10 to-primary/5 dark:from-primary/20 dark:to-background border-r w-64 p-4 flex flex-col fixed inset-y-0 z-40 ${sidebarOpen ? "left-0" : "-left-64"} md:left-0 transition-all duration-300 ease-in-out`}
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-xl font-bold text-primary">SurveyPro</h1>
      </div>

      {/* User Profile */}
      <Card className="mb-6 bg-background/60 border-none">
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12 border-2 border-primary">
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">User</h3>
              <p className="text-xs text-muted-foreground">Survey Administrator</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <nav className="space-y-1 mb-6">
        <Button variant="ghost" className="w-full justify-start" asChild>
          <a href="#" className="flex items-center space-x-2">
            <Home className="h-4 w-4" />
            <span>Dashboard</span>
          </a>
        </Button>
        <Button variant="ghost" className="w-full justify-start" asChild>
          <a href="#" className="flex items-center space-x-2">
            <User className="h-4 w-4" />
            <span>My Surveys</span>
          </a>
        </Button>
        <Button variant="ghost" className="w-full justify-start" asChild>
          <a href="#" className="flex items-center space-x-2">
            <LineChart className="h-4 w-4" />
            <span>Analytics</span>
          </a>
        </Button>
        <Button variant="ghost" className="w-full justify-start" asChild>
          <a href="#" className="flex items-center space-x-2">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </a>
        </Button>
      </nav>

      {/* Recent Activity */}
      <div className="mt-auto">
        <h3 className="text-sm font-medium mb-2">Recent Activity</h3>
        <div className="space-y-2">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="text-xs p-2 rounded-md bg-background/60">
              <p className="font-medium truncate">{activity.title}</p>
              <div className="flex justify-between text-muted-foreground mt-1">
                <span>{activity.action}</span>
                <span>{activity.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Button variant="ghost" className="mt-6 justify-start text-muted-foreground" asChild>
        <a href="#" className="flex items-center space-x-2">
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </a>
      </Button>
    </motion.div>
  )
}


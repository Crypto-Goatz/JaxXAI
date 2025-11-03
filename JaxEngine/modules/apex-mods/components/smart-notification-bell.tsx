"use client"

import { useState } from "react"
import { Bell, Settings, Lightbulb, CheckSquare, Activity, AlertTriangle, Sparkles } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

type Tab = "notifications" | "ideas" | "todos" | "logs" | "warnings"

interface Notification {
  id: string
  title: string
  message: string
  time: string
  read: boolean
  type: "info" | "success" | "warning" | "error"
}

interface Idea {
  id: string
  title: string
  description: string
  category: string
  aiGenerated: boolean
}

interface Todo {
  id: string
  title: string
  completed: boolean
  priority: "low" | "medium" | "high"
  dueDate?: string
}

interface Log {
  id: string
  action: string
  timestamp: string
  status: "success" | "error" | "pending"
}

interface Warning {
  id: string
  title: string
  message: string
  severity: "low" | "medium" | "high" | "critical"
  timestamp: string
}

export function SmartNotificationBell() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<Tab>("notifications")
  const [unreadCount, setUnreadCount] = useState(3)

  // Sample data
  const notifications: Notification[] = [
    {
      id: "1",
      title: "SaaS MOD Installed",
      message: "Your SaaS MOD has been successfully installed and is ready to use.",
      time: "2 minutes ago",
      read: false,
      type: "success",
    },
    {
      id: "2",
      title: "New Flow Created",
      message: "Google Sheets automation flow has been created successfully.",
      time: "1 hour ago",
      read: false,
      type: "info",
    },
    {
      id: "3",
      title: "API Limit Warning",
      message: "You're approaching your monthly API limit (85% used).",
      time: "3 hours ago",
      read: false,
      type: "warning",
    },
  ]

  const ideas: Idea[] = [
    {
      id: "1",
      title: "Automate Lead Scoring",
      description: "Use AI to automatically score leads from your Google Sheets based on engagement metrics.",
      category: "Automation",
      aiGenerated: true,
    },
    {
      id: "2",
      title: "Email Campaign Optimizer",
      description: "Create a flow that analyzes email performance and suggests optimal send times.",
      category: "Marketing",
      aiGenerated: true,
    },
    {
      id: "3",
      title: "Customer Feedback Loop",
      description: "Set up automated surveys after purchases and route feedback to your team.",
      category: "Customer Success",
      aiGenerated: false,
    },
  ]

  const todos: Todo[] = [
    {
      id: "1",
      title: "Complete SaaS MOD setup",
      completed: false,
      priority: "high",
      dueDate: "Today",
    },
    {
      id: "2",
      title: "Review Google Sheets flow",
      completed: false,
      priority: "medium",
      dueDate: "Tomorrow",
    },
    {
      id: "3",
      title: "Update API credentials",
      completed: true,
      priority: "low",
    },
  ]

  const logs: Log[] = [
    {
      id: "1",
      action: "Flow executed: Google Sheets → AI Process",
      timestamp: "2024-01-15 14:32:15",
      status: "success",
    },
    {
      id: "2",
      action: "MOD installed: SaaS MOD v1.0.0",
      timestamp: "2024-01-15 14:28:42",
      status: "success",
    },
    {
      id: "3",
      action: "API call failed: Stripe webhook timeout",
      timestamp: "2024-01-15 14:15:03",
      status: "error",
    },
  ]

  const warnings: Warning[] = [
    {
      id: "1",
      title: "API Rate Limit",
      message: "You're approaching your monthly API limit. Consider upgrading your plan.",
      severity: "medium",
      timestamp: "3 hours ago",
    },
    {
      id: "2",
      title: "Outdated Integration",
      message: "WordPress Assistant MOD has an update available (v1.2.0).",
      severity: "low",
      timestamp: "1 day ago",
    },
  ]

  const tabs = [
    { id: "notifications" as Tab, label: "Notifications", icon: Bell, count: unreadCount },
    { id: "ideas" as Tab, label: "Ideas", icon: Lightbulb, count: ideas.filter((i) => i.aiGenerated).length },
    { id: "todos" as Tab, label: "To-Do", icon: CheckSquare, count: todos.filter((t) => !t.completed).length },
    { id: "logs" as Tab, label: "Logs", icon: Activity, count: logs.length },
    { id: "warnings" as Tab, label: "Warnings", icon: AlertTriangle, count: warnings.length },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500/20 text-red-500"
      case "medium":
        return "bg-yellow-500/20 text-yellow-500"
      case "low":
        return "bg-blue-500/20 text-blue-500"
      default:
        return "bg-gray-500/20 text-gray-500"
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-500/20 text-red-500 border-red-500"
      case "high":
        return "bg-orange-500/20 text-orange-500 border-orange-500"
      case "medium":
        return "bg-yellow-500/20 text-yellow-500 border-yellow-500"
      case "low":
        return "bg-blue-500/20 text-blue-500 border-blue-500"
      default:
        return "bg-gray-500/20 text-gray-500 border-gray-500"
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="relative p-2 rounded-lg hover:bg-accent transition-colors group"
        title="Smart Notifications"
      >
        <div className="relative">
          <Bell className="w-5 h-5 text-foreground group-hover:text-primary transition-colors" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white animate-pulse">
              {unreadCount}
            </span>
          )}
        </div>
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl h-[600px] p-0 gap-0">
          <DialogHeader className="px-6 py-4 border-b border-border bg-gradient-to-r from-orange-500/10 via-red-500/10 to-yellow-500/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <DialogTitle className="text-xl">Smart Notifications</DialogTitle>
                  <p className="text-sm text-muted-foreground">AI-powered insights and updates</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </DialogHeader>

          <div className="flex h-[calc(600px-80px)]">
            {/* Sidebar Tabs */}
            <div className="w-48 border-r border-border bg-muted/30 p-2">
              <div className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        activeTab === tab.id
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4" />
                        <span>{tab.label}</span>
                      </div>
                      {tab.count > 0 && (
                        <Badge
                          variant="secondary"
                          className={`text-xs ${
                            activeTab === tab.id ? "bg-primary-foreground/20" : "bg-primary/20 text-primary"
                          }`}
                        >
                          {tab.count}
                        </Badge>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Content Area */}
            <ScrollArea className="flex-1 p-6">
              {activeTab === "notifications" && (
                <div className="space-y-3">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 rounded-lg border transition-all hover:shadow-md ${
                        notification.read ? "bg-card border-border" : "bg-primary/5 border-primary/20"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-foreground">{notification.title}</h4>
                        <span className="text-xs text-muted-foreground">{notification.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{notification.message}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "ideas" && (
                <div className="space-y-3">
                  {ideas.map((idea) => (
                    <div
                      key={idea.id}
                      className="p-4 rounded-lg border border-border bg-card hover:shadow-md transition-all"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-foreground">{idea.title}</h4>
                          {idea.aiGenerated && (
                            <Badge variant="secondary" className="bg-purple-500/20 text-purple-500 text-xs">
                              <Sparkles className="w-3 h-3 mr-1" />
                              AI
                            </Badge>
                          )}
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {idea.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{idea.description}</p>
                      <Button size="sm" variant="outline">
                        Create Flow
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "todos" && (
                <div className="space-y-3">
                  {todos.map((todo) => (
                    <div
                      key={todo.id}
                      className={`p-4 rounded-lg border border-border bg-card hover:shadow-md transition-all ${
                        todo.completed ? "opacity-60" : ""
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={todo.completed}
                          className="mt-1 w-4 h-4 rounded border-border"
                          readOnly
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4
                              className={`font-semibold ${todo.completed ? "line-through text-muted-foreground" : "text-foreground"}`}
                            >
                              {todo.title}
                            </h4>
                            <Badge variant="secondary" className={`text-xs ${getPriorityColor(todo.priority)}`}>
                              {todo.priority}
                            </Badge>
                          </div>
                          {todo.dueDate && <p className="text-xs text-muted-foreground">Due: {todo.dueDate}</p>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "logs" && (
                <div className="space-y-2">
                  {logs.map((log) => (
                    <div
                      key={log.id}
                      className="p-3 rounded-lg border border-border bg-card hover:shadow-md transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              log.status === "success"
                                ? "bg-green-500"
                                : log.status === "error"
                                  ? "bg-red-500"
                                  : "bg-yellow-500"
                            }`}
                          />
                          <span className="text-sm text-foreground">{log.action}</span>
                        </div>
                        <span className="text-xs text-muted-foreground font-mono">{log.timestamp}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "warnings" && (
                <div className="space-y-3">
                  {warnings.map((warning) => (
                    <div key={warning.id} className={`p-4 rounded-lg border-2 ${getSeverityColor(warning.severity)}`}>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-5 h-5" />
                          <h4 className="font-semibold">{warning.title}</h4>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {warning.severity}
                        </Badge>
                      </div>
                      <p className="text-sm mb-2">{warning.message}</p>
                      <span className="text-xs text-muted-foreground">{warning.timestamp}</span>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

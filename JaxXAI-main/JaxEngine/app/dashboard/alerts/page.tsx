"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bell, Check, X, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"
import { CreateAlertDialog } from "@/components/create-alert-dialog"

interface Alert {
  id: string
  type: string
  message: string
  coin: string
  confidence: number
  time: string
  read: boolean
  endpoint?: string
  condition?: string
  threshold?: number
}

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [loading, setLoading] = useState(true)

  const fetchAlerts = async () => {
    try {
      const response = await fetch("/api/alerts")
      const data = await response.json()
      setAlerts(data.alerts || [])
    } catch (error) {
      console.error("Error fetching alerts:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAlerts()
  }, [])

  const markAsRead = async (id: string) => {
    try {
      await fetch("/api/alerts", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, read: true }),
      })
      setAlerts(alerts.map((a) => (a.id === id ? { ...a, read: true } : a)))
    } catch (error) {
      console.error("Error marking alert as read:", error)
    }
  }

  const deleteAlert = async (id: string) => {
    try {
      await fetch(`/api/alerts?id=${id}`, { method: "DELETE" })
      setAlerts(alerts.filter((a) => a.id !== id))
    } catch (error) {
      console.error("Error deleting alert:", error)
    }
  }

  const markAllAsRead = async () => {
    try {
      await Promise.all(
        alerts
          .filter((a) => !a.read)
          .map((a) =>
            fetch("/api/alerts", {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ id: a.id, read: true }),
            }),
          ),
      )
      setAlerts(alerts.map((a) => ({ ...a, read: true })))
    } catch (error) {
      console.error("Error marking all as read:", error)
    }
  }

  const getTimeAgo = (timestamp: string) => {
    const diff = Date.now() - new Date(timestamp).getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(minutes / 60)

    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`
    if (minutes > 0) return `${minutes} min ago`
    return "Just now"
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2 sm:text-3xl">
            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-lg shadow-yellow-500/20">
              <Bell className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Alerts
            </span>
          </h1>
          <p className="text-sm text-muted-foreground sm:text-base">Real-time notifications from Jax AI</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={fetchAlerts}
            className="hover:bg-primary/10 transition-colors bg-transparent"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            onClick={markAllAsRead}
            className="hover:bg-primary/10 transition-colors bg-transparent"
          >
            <Check className="h-4 w-4 mr-2" />
            Mark All Read
          </Button>
          <CreateAlertDialog onAlertCreated={fetchAlerts} />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
        </div>
      ) : alerts.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Bell className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-4">No alerts yet</p>
            <CreateAlertDialog onAlertCreated={fetchAlerts} />
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-3 sm:gap-4">
          {alerts.map((alert) => (
            <Card
              key={alert.id}
              className={cn(
                "border-border/40 bg-gradient-to-br from-background to-primary/5 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1",
                alert.read && "opacity-60",
              )}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <span className="font-bold text-primary text-lg">{alert.coin}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-lg">{alert.type}</CardTitle>
                        {!alert.read && <Badge variant="default" className="h-2 w-2 p-0 rounded-full" />}
                      </div>
                      <CardDescription>{getTimeAgo(alert.time)}</CardDescription>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => deleteAlert(alert.id)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-2">{alert.message || `${alert.coin} ${alert.condition} ${alert.threshold}`}</p>
                <div className="flex items-center gap-4 flex-wrap">
                  <Badge variant="outline">Confidence: {alert.confidence}%</Badge>
                  {alert.endpoint && <Badge variant="secondary">{alert.endpoint}</Badge>}
                  {!alert.read && (
                    <Button variant="link" size="sm" className="h-auto p-0" onClick={() => markAsRead(alert.id)}>
                      Mark as read
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

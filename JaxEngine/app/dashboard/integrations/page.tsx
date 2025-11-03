"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { API_ENDPOINTS, getAllCategories, getEndpointsByCategory } from "@/lib/api-endpoints"
import { Plug, CheckCircle2, XCircle, Clock, Activity, Key, RefreshCw, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface IntegrationStatus {
  id: string
  connected: boolean
  health: "healthy" | "degraded" | "down"
  lastSync: Date
  requestsToday: number
  rateLimit: number
  latency: number
}

export default function IntegrationsPage() {
  const [integrationStatuses, setIntegrationStatuses] = useState<Record<string, IntegrationStatus>>({})
  const [selectedIntegration, setSelectedIntegration] = useState<string | null>(null)
  const categories = getAllCategories()

  // Simulate integration status data
  useEffect(() => {
    const statuses: Record<string, IntegrationStatus> = {}
    API_ENDPOINTS.forEach((endpoint) => {
      statuses[endpoint.id] = {
        id: endpoint.id,
        connected: Math.random() > 0.3, // 70% connected
        health: ["healthy", "healthy", "healthy", "degraded", "down"][Math.floor(Math.random() * 5)] as any,
        lastSync: new Date(Date.now() - Math.random() * 3600000),
        requestsToday: Math.floor(Math.random() * 1000),
        rateLimit: 1000,
        latency: Math.floor(Math.random() * 200) + 50,
      }
    })
    setIntegrationStatuses(statuses)
  }, [])

  const getHealthColor = (health: string) => {
    switch (health) {
      case "healthy":
        return "text-green-500"
      case "degraded":
        return "text-yellow-500"
      case "down":
        return "text-red-500"
      default:
        return "text-gray-500"
    }
  }

  const getHealthBadge = (health: string) => {
    switch (health) {
      case "healthy":
        return <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Healthy</Badge>
      case "degraded":
        return <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">Degraded</Badge>
      case "down":
        return <Badge className="bg-red-500/10 text-red-500 border-red-500/20">Down</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const testConnection = async (id: string) => {
    // Simulate testing connection
    setIntegrationStatuses((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        health: "healthy",
        lastSync: new Date(),
      },
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Plug className="h-8 w-8 text-primary" />
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Integrations
            </span>
          </h1>
          <p className="text-muted-foreground mt-1">Manage your API connections and data sources</p>
        </div>
        <Button className="bg-gradient-to-r from-primary to-primary/80">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh All
        </Button>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-border/40 bg-gradient-to-br from-green-500/5 to-transparent">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Connected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">
              {Object.values(integrationStatuses).filter((s) => s.connected).length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Active integrations</p>
          </CardContent>
        </Card>

        <Card className="border-border/40 bg-gradient-to-br from-yellow-500/5 to-transparent">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Degraded</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-500">
              {Object.values(integrationStatuses).filter((s) => s.health === "degraded").length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Need attention</p>
          </CardContent>
        </Card>

        <Card className="border-border/40 bg-gradient-to-br from-blue-500/5 to-transparent">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Requests Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">
              {Object.values(integrationStatuses)
                .reduce((acc, s) => acc + s.requestsToday, 0)
                .toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">API calls made</p>
          </CardContent>
        </Card>

        <Card className="border-border/40 bg-gradient-to-br from-purple-500/5 to-transparent">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Latency</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-500">
              {Math.round(
                Object.values(integrationStatuses).reduce((acc, s) => acc + s.latency, 0) /
                  Object.values(integrationStatuses).length || 0,
              )}
              ms
            </div>
            <p className="text-xs text-muted-foreground mt-1">Response time</p>
          </CardContent>
        </Card>
      </div>

      {/* Integrations by Category */}
      <Tabs defaultValue={categories[0]} className="space-y-4">
        <TabsList className="bg-muted/50">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category} className="capitalize">
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category} value={category} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {getEndpointsByCategory(category as any).map((endpoint) => {
                const status = integrationStatuses[endpoint.id]
                if (!status) return null

                return (
                  <Card
                    key={endpoint.id}
                    className={cn(
                      "border-border/40 transition-all duration-200 hover:shadow-lg hover:border-primary/20",
                      status.connected && "bg-gradient-to-br from-primary/5 to-transparent",
                    )}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <CardTitle className="text-lg flex items-center gap-2">
                            {endpoint.name}
                            {status.connected ? (
                              <CheckCircle2 className="h-4 w-4 text-green-500" />
                            ) : (
                              <XCircle className="h-4 w-4 text-red-500" />
                            )}
                          </CardTitle>
                          <CardDescription className="text-xs">{endpoint.description}</CardDescription>
                        </div>
                        {getHealthBadge(status.health)}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            Last Sync
                          </p>
                          <p className="font-medium text-xs">
                            {status.lastSync.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Activity className="h-3 w-3" />
                            Latency
                          </p>
                          <p className="font-medium text-xs">{status.latency}ms</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <TrendingUp className="h-3 w-3" />
                            Requests
                          </p>
                          <p className="font-medium text-xs">
                            {status.requestsToday}/{status.rateLimit}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">Rate Limit</p>
                          <p className="font-medium text-xs">{endpoint.rateLimit}</p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1 text-xs bg-transparent"
                              onClick={() => setSelectedIntegration(endpoint.id)}
                            >
                              <Key className="h-3 w-3 mr-1" />
                              Configure
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Configure {endpoint.name}</DialogTitle>
                              <DialogDescription>Manage API keys and connection settings</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="space-y-2">
                                <Label htmlFor="api-key">API Key</Label>
                                <Input
                                  id="api-key"
                                  type="password"
                                  placeholder={endpoint.requiresAuth ? "Enter API key" : "No API key required"}
                                  disabled={!endpoint.requiresAuth}
                                />
                              </div>
                              {endpoint.requiresAuth && (
                                <div className="space-y-2">
                                  <Label htmlFor="api-secret">API Secret (if required)</Label>
                                  <Input id="api-secret" type="password" placeholder="Enter API secret" />
                                </div>
                              )}
                              <div className="space-y-2">
                                <Label>Available Metrics</Label>
                                <div className="flex flex-wrap gap-1">
                                  {endpoint.metrics.map((metric) => (
                                    <Badge key={metric} variant="secondary" className="text-xs">
                                      {metric}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button className="flex-1">Save Configuration</Button>
                                <Button variant="outline" onClick={() => testConnection(endpoint.id)}>
                                  Test Connection
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>

                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs"
                          onClick={() => testConnection(endpoint.id)}
                        >
                          <RefreshCw className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

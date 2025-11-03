"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2, Play, ArrowDownToLine, ArrowUpFromLine, Activity, CheckCircle2 } from "lucide-react"

interface Webhook {
  id: string
  name: string
  type: "incoming" | "outgoing"
  url: string
  events: string[]
  active: boolean
  secret?: string
  createdAt: string
  lastTriggered?: string
  triggerCount: number
}

const AVAILABLE_EVENTS = [
  "*",
  "signal.generated",
  "trade.executed",
  "alert.triggered",
  "price.threshold",
  "volume.spike",
  "social.sentiment",
]

export default function WebhooksPage() {
  const [webhooks, setWebhooks] = useState<Webhook[]>([])
  const [loading, setLoading] = useState(true)
  const [createDialogOpen, setCreateDialogOpen] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    type: "outgoing" as "incoming" | "outgoing",
    url: "",
    events: ["*"],
    active: true,
    secret: "",
  })

  const fetchWebhooks = async () => {
    try {
      const response = await fetch("/api/webhooks")
      const data = await response.json()
      setWebhooks(data.webhooks || [])
    } catch (error) {
      console.error("Failed to fetch webhooks:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWebhooks()
  }, [])

  const handleCreate = async () => {
    try {
      const response = await fetch("/api/webhooks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setCreateDialogOpen(false)
        setFormData({
          name: "",
          type: "outgoing",
          url: "",
          events: ["*"],
          active: true,
          secret: "",
        })
        fetchWebhooks()
      }
    } catch (error) {
      console.error("Failed to create webhook:", error)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/webhooks?id=${id}`, { method: "DELETE" })
      fetchWebhooks()
    } catch (error) {
      console.error("Failed to delete webhook:", error)
    }
  }

  const handleToggle = async (id: string, active: boolean) => {
    try {
      await fetch("/api/webhooks", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, active }),
      })
      fetchWebhooks()
    } catch (error) {
      console.error("Failed to toggle webhook:", error)
    }
  }

  const handleTest = async (id: string) => {
    try {
      const response = await fetch("/api/webhooks/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ webhookId: id }),
      })

      const data = await response.json()
      alert(data.success ? "Test webhook sent successfully!" : `Failed: ${data.error}`)
    } catch (error) {
      alert("Failed to send test webhook")
    }
  }

  const stats = {
    total: webhooks.length,
    active: webhooks.filter((w) => w.active).length,
    incoming: webhooks.filter((w) => w.type === "incoming").length,
    outgoing: webhooks.filter((w) => w.type === "outgoing").length,
  }

  return (
    <div className="space-y-6 p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Webhook Management
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Manage incoming and outgoing webhooks for automation</p>
        </div>
        <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create Webhook
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Webhook</DialogTitle>
              <DialogDescription>Configure a new webhook endpoint for automation</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input
                  placeholder="My Webhook"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Type</Label>
                <Select value={formData.type} onValueChange={(value: any) => setFormData({ ...formData, type: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="incoming">Incoming (Receive)</SelectItem>
                    <SelectItem value="outgoing">Outgoing (Send)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>URL</Label>
                <Input
                  placeholder="https://example.com/webhook"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Events (comma-separated or * for all)</Label>
                <Input
                  placeholder="signal.generated, trade.executed"
                  value={formData.events.join(", ")}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      events: e.target.value.split(",").map((s) => s.trim()),
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Secret (optional, for signature verification)</Label>
                <Input
                  type="password"
                  placeholder="webhook_secret_key"
                  value={formData.secret}
                  onChange={(e) => setFormData({ ...formData, secret: e.target.value })}
                />
              </div>

              <div className="flex items-center gap-2">
                <Switch checked={formData.active} onCheckedChange={(active) => setFormData({ ...formData, active })} />
                <Label>Active</Label>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreate}>Create Webhook</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-4 border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-transparent">
          <div className="flex items-center gap-3">
            <Activity className="h-5 w-5 text-blue-500" />
            <div>
              <p className="text-sm text-muted-foreground">Total Webhooks</p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 border-green-500/20 bg-gradient-to-br from-green-500/5 to-transparent">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            <div>
              <p className="text-sm text-muted-foreground">Active</p>
              <p className="text-2xl font-bold">{stats.active}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-transparent">
          <div className="flex items-center gap-3">
            <ArrowDownToLine className="h-5 w-5 text-purple-500" />
            <div>
              <p className="text-sm text-muted-foreground">Incoming</p>
              <p className="text-2xl font-bold">{stats.incoming}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 border-orange-500/20 bg-gradient-to-br from-orange-500/5 to-transparent">
          <div className="flex items-center gap-3">
            <ArrowUpFromLine className="h-5 w-5 text-orange-500" />
            <div>
              <p className="text-sm text-muted-foreground">Outgoing</p>
              <p className="text-2xl font-bold">{stats.outgoing}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Webhooks List */}
      <div className="grid gap-4">
        {webhooks.map((webhook) => (
          <Card key={webhook.id} className="p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-3">
                  {webhook.type === "incoming" ? (
                    <ArrowDownToLine className="h-5 w-5 text-purple-500" />
                  ) : (
                    <ArrowUpFromLine className="h-5 w-5 text-orange-500" />
                  )}
                  <h3 className="text-lg font-bold">{webhook.name}</h3>
                  <Badge variant={webhook.active ? "default" : "secondary"}>
                    {webhook.active ? "Active" : "Inactive"}
                  </Badge>
                </div>

                <p className="text-sm text-muted-foreground font-mono">{webhook.url}</p>

                <div className="flex flex-wrap gap-2">
                  {webhook.events.map((event, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {event}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-4 text-xs text-muted-foreground">
                  <span>Triggers: {webhook.triggerCount}</span>
                  {webhook.lastTriggered && <span>Last: {new Date(webhook.lastTriggered).toLocaleString()}</span>}
                </div>
              </div>

              <div className="flex gap-2">
                <Switch checked={webhook.active} onCheckedChange={(active) => handleToggle(webhook.id, active)} />
                {webhook.type === "outgoing" && (
                  <Button size="sm" variant="outline" onClick={() => handleTest(webhook.id)}>
                    <Play className="h-4 w-4" />
                  </Button>
                )}
                <Button size="sm" variant="destructive" onClick={() => handleDelete(webhook.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}

        {webhooks.length === 0 && !loading && (
          <Card className="p-12 text-center">
            <Activity className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No webhooks configured</h3>
            <p className="text-sm text-muted-foreground mb-4">Create your first webhook to start automating</p>
            <Button onClick={() => setCreateDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Webhook
            </Button>
          </Card>
        )}
      </div>
    </div>
  )
}

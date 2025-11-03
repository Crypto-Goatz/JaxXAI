"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Plus, Trash2, Copy, Check } from "lucide-react"
import { useIntegrations } from "@/contexts/integration-context"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function WebhookIntegrations() {
  const { webhooks, addWebhook, updateWebhook, removeWebhook } = useIntegrations()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [newWebhook, setNewWebhook] = useState({
    name: "",
    url: "",
    secret: "",
    isActive: true,
  })

  const inboundWebhookUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/api/webhooks/inbound`

  const handleAddWebhook = () => {
    if (newWebhook.name && newWebhook.url) {
      addWebhook({
        ...newWebhook,
        secret: newWebhook.secret || `whsec_${Math.random().toString(36).substring(2, 15)}`,
      })
      setNewWebhook({
        name: "",
        url: "",
        secret: "",
        isActive: true,
      })
      setIsDialogOpen(false)
    }
  }

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <Tabs defaultValue="outbound" className="space-y-4">
      <TabsList>
        <TabsTrigger value="outbound">Outbound Webhooks</TabsTrigger>
        <TabsTrigger value="inbound">Inbound Webhooks</TabsTrigger>
      </TabsList>

      <TabsContent value="outbound" className="space-y-4">
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">{webhooks.length} webhook(s) configured</p>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="size-4 mr-2" />
                Add Webhook
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Outbound Webhook</DialogTitle>
                <DialogDescription>Send notifications to external services when events occur.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="webhookName">Webhook Name</Label>
                  <Input
                    id="webhookName"
                    value={newWebhook.name}
                    onChange={(e) => setNewWebhook({ ...newWebhook, name: e.target.value })}
                    placeholder="Discord Alerts"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="webhookUrl">Webhook URL</Label>
                  <Input
                    id="webhookUrl"
                    value={newWebhook.url}
                    onChange={(e) => setNewWebhook({ ...newWebhook, url: e.target.value })}
                    placeholder="https://discord.com/api/webhooks/..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="webhookSecret">Secret (Optional)</Label>
                  <Input
                    id="webhookSecret"
                    value={newWebhook.secret}
                    onChange={(e) => setNewWebhook({ ...newWebhook, secret: e.target.value })}
                    placeholder="Auto-generated if empty"
                  />
                </div>

                <Button onClick={handleAddWebhook} className="w-full">
                  Add Webhook
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {webhooks.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed rounded-lg">
            <p className="text-muted-foreground">No webhooks configured</p>
            <p className="text-sm text-muted-foreground mt-1">
              Add webhooks to send notifications to external services
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {webhooks.map((webhook) => (
              <div key={webhook.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-medium">{webhook.name}</div>
                    <div className="text-sm text-muted-foreground font-mono">{webhook.url}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={webhook.isActive}
                      onCheckedChange={(checked) => updateWebhook(webhook.id, { isActive: checked })}
                    />
                    <Button variant="ghost" size="icon" onClick={() => removeWebhook(webhook.id)}>
                      <Trash2 className="size-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </TabsContent>

      <TabsContent value="inbound" className="space-y-4">
        <div className="border rounded-lg p-4 space-y-4">
          <div>
            <h3 className="font-medium mb-2">Inbound Webhook Endpoint</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Use this URL to trigger workflows from external services like TradingView alerts or custom scripts.
            </p>
          </div>

          <div className="space-y-2">
            <Label>Webhook URL</Label>
            <div className="flex gap-2">
              <Input value={inboundWebhookUrl} readOnly className="font-mono text-sm" />
              <Button variant="outline" size="icon" onClick={() => copyToClipboard(inboundWebhookUrl, "inbound")}>
                {copiedId === "inbound" ? <Check className="size-4" /> : <Copy className="size-4" />}
              </Button>
            </div>
          </div>

          <div className="bg-muted p-4 rounded-lg space-y-2">
            <p className="text-sm font-medium">Example Payload:</p>
            <pre className="text-xs bg-background p-3 rounded overflow-x-auto">
              {JSON.stringify(
                {
                  flowId: "1",
                  event: "price_alert",
                  data: {
                    symbol: "BTC/USDT",
                    price: 50000,
                    timestamp: new Date().toISOString(),
                  },
                },
                null,
                2,
              )}
            </pre>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  )
}

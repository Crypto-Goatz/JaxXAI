"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Plus, Trash2, Eye, EyeOff } from "lucide-react"
import { useIntegrations } from "@/contexts/integration-context"
import type { ExchangeType } from "@/types/integration.types"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function ExchangeIntegrations() {
  const { exchanges, addExchange, updateExchange, removeExchange } = useIntegrations()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({})
  const [newExchange, setNewExchange] = useState({
    exchange: "binance" as ExchangeType,
    name: "",
    apiKey: "",
    apiSecret: "",
    isActive: true,
  })

  const handleAddExchange = () => {
    if (newExchange.name && newExchange.apiKey && newExchange.apiSecret) {
      addExchange(newExchange)
      setNewExchange({
        exchange: "binance",
        name: "",
        apiKey: "",
        apiSecret: "",
        isActive: true,
      })
      setIsDialogOpen(false)
    }
  }

  const toggleSecretVisibility = (id: string) => {
    setShowSecrets((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">{exchanges.length} exchange(s) connected</p>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="size-4 mr-2" />
              Add Exchange
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Exchange Integration</DialogTitle>
              <DialogDescription>Connect a new exchange account with API credentials.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="exchange">Exchange</Label>
                <Select
                  value={newExchange.exchange}
                  onValueChange={(value) => setNewExchange({ ...newExchange, exchange: value as ExchangeType })}
                >
                  <SelectTrigger id="exchange">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="binance">Binance</SelectItem>
                    <SelectItem value="coinbase">Coinbase</SelectItem>
                    <SelectItem value="kraken">Kraken</SelectItem>
                    <SelectItem value="bybit">Bybit</SelectItem>
                    <SelectItem value="okx">OKX</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Connection Name</Label>
                <Input
                  id="name"
                  value={newExchange.name}
                  onChange={(e) => setNewExchange({ ...newExchange, name: e.target.value })}
                  placeholder="My Binance Account"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="apiKey">API Key</Label>
                <Input
                  id="apiKey"
                  value={newExchange.apiKey}
                  onChange={(e) => setNewExchange({ ...newExchange, apiKey: e.target.value })}
                  placeholder="Enter your API key"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="apiSecret">API Secret</Label>
                <Input
                  id="apiSecret"
                  type="password"
                  value={newExchange.apiSecret}
                  onChange={(e) => setNewExchange({ ...newExchange, apiSecret: e.target.value })}
                  placeholder="Enter your API secret"
                />
              </div>

              <Button onClick={handleAddExchange} className="w-full">
                Add Exchange
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {exchanges.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed rounded-lg">
          <p className="text-muted-foreground">No exchanges connected yet</p>
          <p className="text-sm text-muted-foreground mt-1">Add your first exchange to start trading</p>
        </div>
      ) : (
        <div className="space-y-3">
          {exchanges.map((exchange) => (
            <div key={exchange.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-medium">{exchange.name}</div>
                  <div className="text-sm text-muted-foreground capitalize">{exchange.exchange}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={exchange.isActive}
                    onCheckedChange={(checked) => updateExchange(exchange.id, { isActive: checked })}
                  />
                  <Button variant="ghost" size="icon" onClick={() => removeExchange(exchange.id)}>
                    <Trash2 className="size-4 text-destructive" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">API Key:</span>
                  <code className="text-xs bg-muted px-2 py-1 rounded">{exchange.apiKey.slice(0, 8)}...</code>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">API Secret:</span>
                  <div className="flex items-center gap-2">
                    <code className="text-xs bg-muted px-2 py-1 rounded">
                      {showSecrets[exchange.id] ? exchange.apiSecret : "••••••••"}
                    </code>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-6"
                      onClick={() => toggleSecretVisibility(exchange.id)}
                    >
                      {showSecrets[exchange.id] ? <EyeOff className="size-3" /> : <Eye className="size-3" />}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

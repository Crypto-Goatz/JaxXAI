"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus } from "lucide-react"
import { API_ENDPOINTS, getAllCategories } from "@/lib/api-endpoints"

export function CreateAlertDialog({ onAlertCreated }: { onAlertCreated?: () => void }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [category, setCategory] = useState<string>("")
  const [endpoint, setEndpoint] = useState<string>("")
  const [formData, setFormData] = useState({
    coin: "",
    metric: "",
    condition: "",
    threshold: "",
    message: "",
  })

  const categories = getAllCategories()
  const filteredEndpoints = category ? API_ENDPOINTS.filter((e) => e.category === category) : []

  const selectedEndpoint = API_ENDPOINTS.find((e) => e.id === endpoint)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/alerts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          endpoint,
          type: `${selectedEndpoint?.name} Alert`,
          confidence: 85,
        }),
      })

      if (response.ok) {
        setOpen(false)
        setFormData({ coin: "", metric: "", condition: "", threshold: "", message: "" })
        setCategory("")
        setEndpoint("")
        onAlertCreated?.()
      }
    } catch (error) {
      console.error("Error creating alert:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full sm:w-auto bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
          <Plus className="h-4 w-4 mr-2" />
          Create Alert
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Alert</DialogTitle>
          <DialogDescription>Set up a custom alert using any of our 20+ API endpoints</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="category">API Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {category && (
              <div className="grid gap-2">
                <Label htmlFor="endpoint">API Endpoint</Label>
                <Select value={endpoint} onValueChange={setEndpoint}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select endpoint" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredEndpoints.map((ep) => (
                      <SelectItem key={ep.id} value={ep.id}>
                        {ep.name} - {ep.description}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {selectedEndpoint && (
              <>
                <div className="grid gap-2">
                  <Label htmlFor="coin">Cryptocurrency</Label>
                  <Input
                    id="coin"
                    placeholder="e.g., BTC, ETH, SOL"
                    value={formData.coin}
                    onChange={(e) => setFormData({ ...formData, coin: e.target.value })}
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="metric">Metric</Label>
                  <Select
                    value={formData.metric}
                    onValueChange={(value) => setFormData({ ...formData, metric: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select metric" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedEndpoint.metrics.map((metric) => (
                        <SelectItem key={metric} value={metric}>
                          {metric.replace(/_/g, " ").toUpperCase()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="condition">Condition</Label>
                  <Select
                    value={formData.condition}
                    onValueChange={(value) => setFormData({ ...formData, condition: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="above">Above</SelectItem>
                      <SelectItem value="below">Below</SelectItem>
                      <SelectItem value="equals">Equals</SelectItem>
                      <SelectItem value="change_percent">% Change</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="threshold">Threshold Value</Label>
                  <Input
                    id="threshold"
                    type="number"
                    placeholder="e.g., 65000"
                    value={formData.threshold}
                    onChange={(e) => setFormData({ ...formData, threshold: e.target.value })}
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="message">Custom Message (Optional)</Label>
                  <Input
                    id="message"
                    placeholder="Alert message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>
              </>
            )}
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading || !endpoint}>
              {loading ? "Creating..." : "Create Alert"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

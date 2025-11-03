"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { CustomNode, PriceAlertNodeData } from "@/types/node.types"

interface PriceAlertNodePropertiesEditorProps {
  node: CustomNode
  onUpdate: (updates: Partial<CustomNode>) => void
}

export default function PriceAlertNodePropertiesEditor({ node, onUpdate }: PriceAlertNodePropertiesEditorProps) {
  const data = node.data as PriceAlertNodeData

  const handleUpdate = (field: keyof PriceAlertNodeData, value: string | number) => {
    onUpdate({
      data: {
        ...data,
        [field]: value,
      },
    })
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="tradingPair">Trading Pair</Label>
        <Input
          id="tradingPair"
          value={data.tradingPair}
          onChange={(e) => handleUpdate("tradingPair", e.target.value)}
          placeholder="BTC/USDT"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="alertType">Alert Type</Label>
        <Select
          value={data.alertType}
          onValueChange={(value) => handleUpdate("alertType", value as "above" | "below" | "crosses")}
        >
          <SelectTrigger id="alertType">
            <SelectValue placeholder="Select alert type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="above">Price Above</SelectItem>
            <SelectItem value="below">Price Below</SelectItem>
            <SelectItem value="crosses">Price Crosses</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="targetPrice">Target Price</Label>
        <Input
          id="targetPrice"
          type="number"
          value={data.targetPrice}
          onChange={(e) => handleUpdate("targetPrice", Number.parseFloat(e.target.value))}
          placeholder="50000"
        />
      </div>
    </div>
  )
}

"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { CustomNode, RiskManagementNodeData } from "@/types/node.types"

interface RiskManagementNodePropertiesEditorProps {
  node: CustomNode
  onUpdate: (updates: Partial<CustomNode>) => void
}

export default function RiskManagementNodePropertiesEditor({
  node,
  onUpdate,
}: RiskManagementNodePropertiesEditorProps) {
  const data = node.data as RiskManagementNodeData

  const handleUpdate = (field: keyof RiskManagementNodeData, value: string | number) => {
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
        <Label htmlFor="ruleType">Rule Type</Label>
        <Select value={data.ruleType} onValueChange={(value) => handleUpdate("ruleType", value)}>
          <SelectTrigger id="ruleType">
            <SelectValue placeholder="Select rule type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="stop-loss">Stop Loss</SelectItem>
            <SelectItem value="take-profit">Take Profit</SelectItem>
            <SelectItem value="max-loss">Maximum Loss Limit</SelectItem>
            <SelectItem value="position-size">Position Size Limit</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {(data.ruleType === "stop-loss" || data.ruleType === "take-profit" || data.ruleType === "max-loss") && (
        <div className="space-y-2">
          <Label htmlFor="percentage">Percentage</Label>
          <Input
            id="percentage"
            type="number"
            value={data.percentage || ""}
            onChange={(e) => handleUpdate("percentage", Number.parseFloat(e.target.value))}
            placeholder="5"
          />
          <p className="text-xs text-muted-foreground">Percentage of position or portfolio</p>
        </div>
      )}

      {data.ruleType === "position-size" && (
        <div className="space-y-2">
          <Label htmlFor="amount">Maximum Amount (USD)</Label>
          <Input
            id="amount"
            type="number"
            value={data.amount || ""}
            onChange={(e) => handleUpdate("amount", Number.parseFloat(e.target.value))}
            placeholder="10000"
          />
        </div>
      )}

      {(data.ruleType === "stop-loss" || data.ruleType === "take-profit") && (
        <div className="space-y-2">
          <Label htmlFor="tradingPair">Trading Pair (Optional)</Label>
          <Input
            id="tradingPair"
            value={data.tradingPair || ""}
            onChange={(e) => handleUpdate("tradingPair", e.target.value)}
            placeholder="BTC/USDT or leave empty for all"
          />
        </div>
      )}
    </div>
  )
}

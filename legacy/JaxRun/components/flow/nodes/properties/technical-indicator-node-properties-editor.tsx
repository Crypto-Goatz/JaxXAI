"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { CustomNode, TechnicalIndicatorNodeData } from "@/types/node.types"

interface TechnicalIndicatorNodePropertiesEditorProps {
  node: CustomNode
  onUpdate: (updates: Partial<CustomNode>) => void
}

export default function TechnicalIndicatorNodePropertiesEditor({
  node,
  onUpdate,
}: TechnicalIndicatorNodePropertiesEditorProps) {
  const data = node.data as TechnicalIndicatorNodeData

  const handleUpdate = (field: keyof TechnicalIndicatorNodeData, value: string | number) => {
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
        <Label htmlFor="indicatorType">Indicator Type</Label>
        <Select value={data.indicatorType} onValueChange={(value) => handleUpdate("indicatorType", value)}>
          <SelectTrigger id="indicatorType">
            <SelectValue placeholder="Select indicator" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rsi">RSI (Relative Strength Index)</SelectItem>
            <SelectItem value="macd">MACD</SelectItem>
            <SelectItem value="sma">SMA (Simple Moving Average)</SelectItem>
            <SelectItem value="ema">EMA (Exponential Moving Average)</SelectItem>
            <SelectItem value="bollinger">Bollinger Bands</SelectItem>
            <SelectItem value="volume">Volume</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="period">Period</Label>
        <Input
          id="period"
          type="number"
          value={data.period}
          onChange={(e) => handleUpdate("period", Number.parseInt(e.target.value))}
          placeholder="14"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="variableName">Variable Name</Label>
        <Input
          id="variableName"
          value={data.variableName}
          onChange={(e) => handleUpdate("variableName", e.target.value)}
          placeholder="rsi_value"
        />
        <p className="text-xs text-muted-foreground">Store the indicator result in this variable</p>
      </div>
    </div>
  )
}

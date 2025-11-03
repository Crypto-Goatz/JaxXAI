"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { CustomNode, ConditionNodeData } from "@/types/node.types"

interface ConditionNodePropertiesEditorProps {
  node: CustomNode
  onUpdate: (updates: Partial<CustomNode>) => void
}

export default function ConditionNodePropertiesEditor({ node, onUpdate }: ConditionNodePropertiesEditorProps) {
  const data = node.data as ConditionNodeData

  const handleUpdate = (field: keyof ConditionNodeData, value: string) => {
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
        <Label htmlFor="conditionType">Condition Type</Label>
        <Select value={data.conditionType} onValueChange={(value) => handleUpdate("conditionType", value)}>
          <SelectTrigger id="conditionType">
            <SelectValue placeholder="Select condition type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="price">Price</SelectItem>
            <SelectItem value="indicator">Indicator</SelectItem>
            <SelectItem value="time">Time</SelectItem>
            <SelectItem value="portfolio">Portfolio</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="leftValue">Left Value</Label>
        <Input
          id="leftValue"
          value={data.leftValue}
          onChange={(e) => handleUpdate("leftValue", e.target.value)}
          placeholder="current_price or variable name"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="operator">Operator</Label>
        <Select value={data.operator} onValueChange={(value) => handleUpdate("operator", value)}>
          <SelectTrigger id="operator">
            <SelectValue placeholder="Select operator" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value=">">Greater Than (&gt;)</SelectItem>
            <SelectItem value="<">Less Than (&lt;)</SelectItem>
            <SelectItem value="=">Equal To (=)</SelectItem>
            <SelectItem value=">=">Greater or Equal (&gt;=)</SelectItem>
            <SelectItem value="<=">Less or Equal (&lt;=)</SelectItem>
            <SelectItem value="!=">Not Equal (!=)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="rightValue">Right Value</Label>
        <Input
          id="rightValue"
          value={data.rightValue}
          onChange={(e) => handleUpdate("rightValue", e.target.value)}
          placeholder="50000 or variable name"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={data.description}
          onChange={(e) => handleUpdate("description", e.target.value)}
          placeholder="Describe this condition..."
          rows={3}
        />
      </div>
    </div>
  )
}

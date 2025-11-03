"use client"

import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { CustomNode, NotificationNodeData } from "@/types/node.types"

interface NotificationNodePropertiesEditorProps {
  node: CustomNode
  onUpdate: (updates: Partial<CustomNode>) => void
}

export default function NotificationNodePropertiesEditor({ node, onUpdate }: NotificationNodePropertiesEditorProps) {
  const data = node.data as NotificationNodeData

  const handleUpdate = (field: keyof NotificationNodeData, value: string | string[]) => {
    onUpdate({
      data: {
        ...data,
        [field]: value,
      },
    })
  }

  const toggleChannel = (channel: "email" | "discord" | "telegram" | "webhook") => {
    const channels = data.channels || []
    const newChannels = channels.includes(channel) ? channels.filter((c) => c !== channel) : [...channels, channel]
    handleUpdate("channels", newChannels)
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          value={data.message}
          onChange={(e) => handleUpdate("message", e.target.value)}
          placeholder="Trading signal triggered..."
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <Label>Notification Channels</Label>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="email"
              checked={data.channels?.includes("email")}
              onCheckedChange={() => toggleChannel("email")}
            />
            <label htmlFor="email" className="text-sm cursor-pointer">
              Email
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="discord"
              checked={data.channels?.includes("discord")}
              onCheckedChange={() => toggleChannel("discord")}
            />
            <label htmlFor="discord" className="text-sm cursor-pointer">
              Discord
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="telegram"
              checked={data.channels?.includes("telegram")}
              onCheckedChange={() => toggleChannel("telegram")}
            />
            <label htmlFor="telegram" className="text-sm cursor-pointer">
              Telegram
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="webhook"
              checked={data.channels?.includes("webhook")}
              onCheckedChange={() => toggleChannel("webhook")}
            />
            <label htmlFor="webhook" className="text-sm cursor-pointer">
              Webhook
            </label>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="priority">Priority</Label>
        <Select value={data.priority} onValueChange={(value) => handleUpdate("priority", value)}>
          <SelectTrigger id="priority">
            <SelectValue placeholder="Select priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

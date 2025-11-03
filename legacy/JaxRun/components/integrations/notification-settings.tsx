"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { useIntegrations } from "@/contexts/integration-context"
import { useState } from "react"

export default function NotificationSettings() {
  const { notifications, updateNotifications } = useIntegrations()
  const [localSettings, setLocalSettings] = useState(notifications)

  const handleSave = () => {
    updateNotifications(localSettings)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Email Notifications</h3>
            <p className="text-sm text-muted-foreground">Receive alerts via email</p>
          </div>
          <Switch
            checked={localSettings.email?.enabled || false}
            onCheckedChange={(checked) =>
              setLocalSettings({
                ...localSettings,
                email: { ...localSettings.email, enabled: checked, address: localSettings.email?.address || "" },
              })
            }
          />
        </div>
        {localSettings.email?.enabled && (
          <div className="space-y-2 pl-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={localSettings.email?.address || ""}
              onChange={(e) =>
                setLocalSettings({
                  ...localSettings,
                  email: { ...localSettings.email, enabled: true, address: e.target.value },
                })
              }
              placeholder="your@email.com"
            />
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Discord Notifications</h3>
            <p className="text-sm text-muted-foreground">Send alerts to Discord channel</p>
          </div>
          <Switch
            checked={localSettings.discord?.enabled || false}
            onCheckedChange={(checked) =>
              setLocalSettings({
                ...localSettings,
                discord: {
                  ...localSettings.discord,
                  enabled: checked,
                  webhookUrl: localSettings.discord?.webhookUrl || "",
                },
              })
            }
          />
        </div>
        {localSettings.discord?.enabled && (
          <div className="space-y-2 pl-4">
            <Label htmlFor="discordWebhook">Discord Webhook URL</Label>
            <Input
              id="discordWebhook"
              value={localSettings.discord?.webhookUrl || ""}
              onChange={(e) =>
                setLocalSettings({
                  ...localSettings,
                  discord: { ...localSettings.discord, enabled: true, webhookUrl: e.target.value },
                })
              }
              placeholder="https://discord.com/api/webhooks/..."
            />
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Telegram Notifications</h3>
            <p className="text-sm text-muted-foreground">Send alerts via Telegram bot</p>
          </div>
          <Switch
            checked={localSettings.telegram?.enabled || false}
            onCheckedChange={(checked) =>
              setLocalSettings({
                ...localSettings,
                telegram: {
                  ...localSettings.telegram,
                  enabled: checked,
                  botToken: localSettings.telegram?.botToken || "",
                  chatId: localSettings.telegram?.chatId || "",
                },
              })
            }
          />
        </div>
        {localSettings.telegram?.enabled && (
          <div className="space-y-2 pl-4">
            <div className="space-y-2">
              <Label htmlFor="telegramToken">Bot Token</Label>
              <Input
                id="telegramToken"
                value={localSettings.telegram?.botToken || ""}
                onChange={(e) =>
                  setLocalSettings({
                    ...localSettings,
                    telegram: {
                      ...localSettings.telegram,
                      enabled: true,
                      botToken: e.target.value,
                      chatId: localSettings.telegram?.chatId || "",
                    },
                  })
                }
                placeholder="123456:ABC-DEF..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="telegramChat">Chat ID</Label>
              <Input
                id="telegramChat"
                value={localSettings.telegram?.chatId || ""}
                onChange={(e) =>
                  setLocalSettings({
                    ...localSettings,
                    telegram: {
                      ...localSettings.telegram,
                      enabled: true,
                      chatId: e.target.value,
                      botToken: localSettings.telegram?.botToken || "",
                    },
                  })
                }
                placeholder="Your chat ID"
              />
            </div>
          </div>
        )}
      </div>

      <Button onClick={handleSave} className="w-full">
        Save Notification Settings
      </Button>
    </div>
  )
}

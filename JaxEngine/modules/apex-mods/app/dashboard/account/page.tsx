"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { User, Mail, Lock, Bell, Key, Globe, Shield, Trash2, Copy, Eye, EyeOff, AlertTriangle } from "lucide-react"

export default function AccountPage() {
  const [showApiKey, setShowApiKey] = useState(false)
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: false,
  })

  const apiKeys = [
    {
      id: 1,
      name: "Production API Key",
      key: "sk_live_51234567890abcdef",
      created: "Nov 1, 2024",
      lastUsed: "2 hours ago",
    },
    {
      id: 2,
      name: "Development API Key",
      key: "sk_test_51234567890abcdef",
      created: "Oct 15, 2024",
      lastUsed: "1 day ago",
    },
  ]

  const handleCopyApiKey = (key: string) => {
    navigator.clipboard.writeText(key)
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-red-500/5 to-yellow-500/5 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-8 py-8 relative">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Account Settings</h1>
          <p className="text-white/60">Manage your account preferences and security settings</p>
        </div>

        <Card className="bg-white/5 border-white/10 backdrop-blur-sm mb-6">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <User className="w-5 h-5" />
              Profile Information
            </CardTitle>
            <CardDescription className="text-white/60">Update your personal information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white text-2xl font-bold">
                JD
              </div>
              <div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white/20 text-white/80 hover:bg-white/5 bg-transparent"
                >
                  Change Avatar
                </Button>
                <p className="text-xs text-white/40 mt-2">JPG, PNG or GIF. Max size 2MB.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-white/80">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  defaultValue="John"
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-white/80">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  defaultValue="Doe"
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white/80">
                Email Address
              </Label>
              <div className="flex gap-2">
                <Input
                  id="email"
                  type="email"
                  defaultValue="john.doe@example.com"
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                />
                <Badge className="bg-green-500/20 text-green-500 border-green-500/30 self-center">Verified</Badge>
              </div>
            </div>

            <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white">
              Save Changes
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-sm mb-6">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Security
            </CardTitle>
            <CardDescription className="text-white/60">Manage your password and security settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword" className="text-white/80">
                Current Password
              </Label>
              <Input
                id="currentPassword"
                type="password"
                className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-white/80">
                  New Password
                </Label>
                <Input
                  id="newPassword"
                  type="password"
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-white/80">
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                />
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border border-white/10 bg-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Two-Factor Authentication</p>
                  <p className="text-xs text-white/40">Add an extra layer of security</p>
                </div>
              </div>
              <Switch />
            </div>

            <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white">
              Update Password
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-sm mb-6">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Key className="w-5 h-5" />
              API Keys
            </CardTitle>
            <CardDescription className="text-white/60">Manage your API keys for integrations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {apiKeys.map((apiKey) => (
              <div
                key={apiKey.id}
                className="p-4 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-sm font-medium text-white mb-1">{apiKey.name}</p>
                    <p className="text-xs text-white/40">Created {apiKey.created}</p>
                  </div>
                  <Badge className="bg-green-500/20 text-green-500 border-green-500/30">Active</Badge>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <Input
                    value={showApiKey ? apiKey.key : "••••••••••••••••••••••••••••"}
                    readOnly
                    className="bg-white/5 border-white/10 text-white font-mono text-xs"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="border-white/20 text-white/80 hover:bg-white/5 bg-transparent"
                  >
                    {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopyApiKey(apiKey.key)}
                    className="border-white/20 text-white/80 hover:bg-white/5 bg-transparent"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>

                <p className="text-xs text-white/40">Last used {apiKey.lastUsed}</p>
              </div>
            ))}

            <Button
              variant="outline"
              className="w-full border-orange-500/30 text-orange-500 hover:bg-orange-500/10 bg-transparent"
            >
              Generate New API Key
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-sm mb-6">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notifications
            </CardTitle>
            <CardDescription className="text-white/60">Configure how you receive notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg border border-white/10 bg-white/5">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-sm font-medium text-white">Email Notifications</p>
                  <p className="text-xs text-white/40">Receive updates via email</p>
                </div>
              </div>
              <Switch
                checked={notifications.email}
                onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border border-white/10 bg-white/5">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-purple-500" />
                <div>
                  <p className="text-sm font-medium text-white">Push Notifications</p>
                  <p className="text-xs text-white/40">Receive browser notifications</p>
                </div>
              </div>
              <Switch
                checked={notifications.push}
                onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border border-white/10 bg-white/5">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-sm font-medium text-white">SMS Notifications</p>
                  <p className="text-xs text-white/40">Receive text messages</p>
                </div>
              </div>
              <Switch
                checked={notifications.sms}
                onCheckedChange={(checked) => setNotifications({ ...notifications, sms: checked })}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-red-500/5 border-red-500/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-red-500 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Danger Zone
            </CardTitle>
            <CardDescription className="text-white/60">Irreversible actions for your account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg border border-red-500/20 bg-red-500/5">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-white mb-1">Delete Account</p>
                  <p className="text-xs text-white/60 leading-relaxed">
                    Once you delete your account, there is no going back. All your data, integrations, and settings will
                    be permanently removed.
                  </p>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  className="ml-4 bg-red-500 hover:bg-red-600 text-white shrink-0"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Account
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

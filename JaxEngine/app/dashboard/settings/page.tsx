"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Settings, Key, Bell, Shield, Layout, Copy, RefreshCcw } from "lucide-react"
import { getModuleSettings, saveModuleSettings, type DashboardModule } from "@/lib/dashboard-modules"
import type { SecretSummary } from "@/lib/secret-manager"

export default function SettingsPage() {
  const [modules, setModules] = useState<DashboardModule[]>([])
  const [adminKey, setAdminKey] = useState("")
  const [adminUnlocked, setAdminUnlocked] = useState(false)
  const [coinbaseKey, setCoinbaseKey] = useState("")
  const [coinbaseSecret, setCoinbaseSecret] = useState("")
  const [secretStatus, setSecretStatus] = useState<string | null>(null)
  const [secretError, setSecretError] = useState<string | null>(null)
  const [savingSecrets, setSavingSecrets] = useState(false)
  const [loadingSecrets, setLoadingSecrets] = useState(false)
  const [secrets, setSecrets] = useState<SecretSummary[]>([])

  useEffect(() => {
    setModules(getModuleSettings())
  }, [])

  const handleModuleToggle = (moduleId: string, enabled: boolean) => {
    const updated = modules.map((m) => (m.id === moduleId ? { ...m, enabled } : m))
    setModules(updated)
    saveModuleSettings(updated)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Settings className="h-8 w-8 text-primary" />
          Settings
        </h1>
        <p className="text-muted-foreground">Manage your Jax dashboard preferences</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layout className="h-5 w-5" />
              Dashboard Modules
            </CardTitle>
            <CardDescription>
              Enable or disable dashboard widgets to optimize performance and customize your view
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {modules.map((module) => (
              <div key={module.id} className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{module.name}</Label>
                  <p className="text-sm text-muted-foreground">{module.description}</p>
                </div>
                <Switch
                  checked={module.enabled}
                  onCheckedChange={(checked) => handleModuleToggle(module.id, checked)}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* API Keys */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              API Keys
            </CardTitle>
            <CardDescription>
              Securely store exchange credentials in the project secret manager. Admin key required to manage secrets.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="admin-secret-key">Admin Secret Key</Label>
              <div className="flex gap-2">
                <Input
                  id="admin-secret-key"
                  type="password"
                  placeholder="Enter the admin key to unlock secret manager"
                  value={adminKey}
                  onChange={(e) => {
                    setAdminKey(e.target.value)
                    setAdminUnlocked(false)
                  }}
                />
                <Button
                  type="button"
                  variant={adminUnlocked ? "secondary" : "default"}
                  onClick={async () => {
                    if (!adminKey) {
                      setSecretError("Provide an admin secret key to unlock the secret manager.")
                      return
                    }
                    setSecretError(null)
                    setSecretStatus(null)
                    setLoadingSecrets(true)
                    try {
                      const res = await fetch("/api/secrets", {
                        headers: {
                          "x-admin-key": adminKey,
                        },
                      })
                      if (!res.ok) {
                        throw new Error(res.status === 401 ? "Invalid admin secret key." : "Unable to load secrets.")
                      }
                      const data = await res.json()
                      setSecrets(Array.isArray(data?.secrets) ? data.secrets : [])
                      setAdminUnlocked(true)
                      setSecretStatus("Secret manager unlocked.")
                    } catch (error: any) {
                      setAdminUnlocked(false)
                      setSecrets([])
                      setSecretError(error?.message || "Failed to unlock secret manager.")
                    } finally {
                      setLoadingSecrets(false)
                    }
                  }}
                  disabled={loadingSecrets}
                >
                  <RefreshCcw className="h-4 w-4 mr-2" />
                  {adminUnlocked ? "Refresh" : "Unlock"}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                The admin secret key never leaves your browser and is only used to authenticate API requests.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="coinbase-key">Coinbase API Key</Label>
                <Input
                  id="coinbase-key"
                  placeholder="Enter your Coinbase API key"
                  value={coinbaseKey}
                  onChange={(e) => setCoinbaseKey(e.target.value)}
                  disabled={!adminUnlocked || savingSecrets}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="coinbase-secret">Coinbase API Secret</Label>
                <Input
                  id="coinbase-secret"
                  type="password"
                  placeholder="Enter your Coinbase API secret"
                  value={coinbaseSecret}
                  onChange={(e) => setCoinbaseSecret(e.target.value)}
                  disabled={!adminUnlocked || savingSecrets}
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                disabled={!adminUnlocked || savingSecrets || (!coinbaseKey && !coinbaseSecret)}
                onClick={async () => {
                  if (!adminUnlocked) {
                    setSecretError("Unlock the secret manager with the admin key before saving secrets.")
                    return
                  }

                  const payloads = [
                    coinbaseKey
                      ? { name: "Coinbase API Key", value: coinbaseKey, provider: "coinbase:key" }
                      : null,
                    coinbaseSecret
                      ? { name: "Coinbase API Secret", value: coinbaseSecret, provider: "coinbase:secret" }
                      : null,
                  ].filter(Boolean) as Array<{ name: string; value: string; provider: string }>

                  if (!payloads.length) {
                    setSecretError("Provide at least one value to store in the secret manager.")
                    return
                  }

                  setSavingSecrets(true)
                  setSecretStatus(null)
                  setSecretError(null)

                  try {
                    const results: SecretSummary[] = []
                    for (const payload of payloads) {
                      const res = await fetch("/api/secrets", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                          "x-admin-key": adminKey,
                        },
                        body: JSON.stringify(payload),
                      })
                      if (!res.ok) {
                        const errorPayload = await res.json().catch(() => ({}))
                        throw new Error(errorPayload?.error || "Failed to store secret.")
                      }
                      const data = await res.json()
                      if (data?.secret) {
                        results.push(data.secret)
                      }
                    }

                    if (results.length) {
                      setSecrets((prev) => {
                        const map = new Map(prev.map((item) => [item.id, item]))
                        for (const result of results) {
                          map.set(result.id, result)
                        }
                        return Array.from(map.values())
                      })
                      setCoinbaseKey("")
                      setCoinbaseSecret("")
                      setSecretStatus("Secrets stored successfully.")
                    }
                  } catch (error: any) {
                    setSecretError(error?.message || "Unable to store secrets.")
                  } finally {
                    setSavingSecrets(false)
                  }
                }}
              >
                {savingSecrets ? "Saving..." : "Save to Secret Manager"}
              </Button>
              <Button
                type="button"
                variant="outline"
                disabled={!adminUnlocked || loadingSecrets}
                onClick={async () => {
                  if (!adminUnlocked) return
                  setLoadingSecrets(true)
                  setSecretError(null)
                  setSecretStatus(null)
                  try {
                    const res = await fetch("/api/secrets", {
                      headers: {
                        "x-admin-key": adminKey,
                      },
                    })
                    if (!res.ok) {
                      throw new Error("Failed to refresh secrets.")
                    }
                    const data = await res.json()
                    setSecrets(Array.isArray(data?.secrets) ? data.secrets : [])
                    setSecretStatus("Secret list refreshed.")
                  } catch (error: any) {
                    setSecretError(error?.message || "Unable to refresh secrets.")
                  } finally {
                    setLoadingSecrets(false)
                  }
                }}
              >
                Refresh Secrets
              </Button>
            </div>

            {(secretStatus || secretError) && (
              <div className="rounded-md border px-3 py-2 text-sm">
                {secretStatus && <p className="text-emerald-500">{secretStatus}</p>}
                {secretError && <p className="text-destructive">{secretError}</p>}
              </div>
            )}

            <div className="space-y-3">
              <div>
                <Label>Stored Secrets</Label>
                <p className="text-xs text-muted-foreground">
                  Only metadata is shown below. Use the copy action to reveal a secret (admin key required).
                </p>
              </div>

              {adminUnlocked ? (
                secrets.length > 0 ? (
                  <div className="space-y-2">
                    {secrets
                      .slice()
                      .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
                      .map((secret) => (
                        <div
                          key={secret.id}
                          className="flex items-center justify-between rounded-lg border bg-muted/40 px-3 py-2 text-sm"
                        >
                          <div className="space-y-0.5">
                            <p className="font-medium">{secret.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {secret.provider} • {new Date(secret.createdAt).toLocaleString()} •{" "}
                              {secret.maskedPreview}
                            </p>
                          </div>
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            onClick={async () => {
                              try {
                                const res = await fetch(`/api/secrets/${secret.id}`, {
                                  headers: {
                                    "x-admin-key": adminKey,
                                  },
                                })
                                if (!res.ok) {
                                  throw new Error(
                                    res.status === 401 ? "Unauthorized" : "Unable to retrieve secret value.",
                                  )
                                }
                                const data = await res.json()
                                const secretValue: string | undefined = data?.secret?.value
                                if (!secretValue) {
                                  throw new Error("Secret value not available.")
                                }
                                await navigator.clipboard.writeText(secretValue)
                                setSecretStatus(`${secret.name} copied to clipboard.`)
                              } catch (error: any) {
                                setSecretError(error?.message || "Failed to copy secret.")
                              }
                            }}
                          >
                            <Copy className="h-4 w-4 mr-2" />
                            Copy
                          </Button>
                        </div>
                      ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No secrets stored yet.</p>
                )
              ) : (
                <p className="text-sm text-muted-foreground">
                  Unlock with the admin key to view stored secrets and enable copy access.
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
            <CardDescription>Configure how you receive alerts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>LED Signal Alerts</Label>
                <p className="text-sm text-muted-foreground">Get notified of new LED signals</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Futures Crush Alerts</Label>
                <p className="text-sm text-muted-foreground">Get notified of futures market events</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Bot Activity</Label>
                <p className="text-sm text-muted-foreground">Get notified of bot trades and status</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive alerts via email</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security
            </CardTitle>
            <CardDescription>Manage your account security settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
              </div>
              <Switch />
            </div>
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" />
            </div>
            <Button>Update Password</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

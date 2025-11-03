"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Plus, Trash2, Eye, EyeOff, FileSpreadsheet, Code } from "lucide-react"
import { useIntegrations } from "@/contexts/integration-context"
import type { GoogleSheetsAuthType } from "@/types/integration.types"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function GoogleSheetsIntegrations() {
  const { googleSheets, addGoogleSheets, updateGoogleSheets, removeGoogleSheets } = useIntegrations()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({})
  const [newIntegration, setNewIntegration] = useState({
    name: "",
    authType: "apiKey" as GoogleSheetsAuthType,
    apiKey: "",
    spreadsheetId: "",
    scriptId: "",
    isActive: true,
  })

  const handleAddIntegration = () => {
    if (newIntegration.name && (newIntegration.authType === "oauth" || newIntegration.apiKey)) {
      addGoogleSheets(newIntegration)
      setNewIntegration({
        name: "",
        authType: "apiKey",
        apiKey: "",
        spreadsheetId: "",
        scriptId: "",
        isActive: true,
      })
      setIsDialogOpen(false)
    }
  }

  const handleOAuthConnect = () => {
    // In a real implementation, this would redirect to Google OAuth
    console.log("[v0] Initiating OAuth flow...")
    // Simulate OAuth success
    addGoogleSheets({
      name: newIntegration.name,
      authType: "oauth",
      accessToken: "mock_access_token",
      refreshToken: "mock_refresh_token",
      expiresAt: new Date(Date.now() + 3600000),
      spreadsheetId: newIntegration.spreadsheetId,
      scriptId: newIntegration.scriptId,
      isActive: true,
    })
    setNewIntegration({
      name: "",
      authType: "apiKey",
      apiKey: "",
      spreadsheetId: "",
      scriptId: "",
      isActive: true,
    })
    setIsDialogOpen(false)
  }

  const toggleSecretVisibility = (id: string) => {
    setShowSecrets((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">{googleSheets.length} Google Sheets integration(s) connected</p>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="size-4 mr-2" />
              Add Google Sheets
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add Google Sheets Integration</DialogTitle>
              <DialogDescription>
                Connect Google Sheets to read/write data and run Apps Scripts from your workflows.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Integration Name</Label>
                <Input
                  id="name"
                  value={newIntegration.name}
                  onChange={(e) => setNewIntegration({ ...newIntegration, name: e.target.value })}
                  placeholder="My Trading Sheet"
                />
              </div>

              <div className="space-y-3">
                <Label>Authentication Method</Label>
                <RadioGroup
                  value={newIntegration.authType}
                  onValueChange={(value) =>
                    setNewIntegration({ ...newIntegration, authType: value as GoogleSheetsAuthType })
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="apiKey" id="apiKey" />
                    <Label htmlFor="apiKey" className="font-normal cursor-pointer">
                      API Key (Simple, read-only access)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="oauth" id="oauth" />
                    <Label htmlFor="oauth" className="font-normal cursor-pointer">
                      OAuth 2.0 (Full access, recommended)
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {newIntegration.authType === "apiKey" ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="apiKey">Google API Key</Label>
                    <Input
                      id="apiKey"
                      type="password"
                      value={newIntegration.apiKey}
                      onChange={(e) => setNewIntegration({ ...newIntegration, apiKey: e.target.value })}
                      placeholder="Enter your Google API key"
                    />
                    <p className="text-xs text-muted-foreground">Get your API key from Google Cloud Console</p>
                  </div>
                </>
              ) : (
                <div className="bg-muted p-4 rounded-lg space-y-2">
                  <p className="text-sm">
                    Click the button below to authenticate with Google and grant access to your sheets.
                  </p>
                  <Button onClick={handleOAuthConnect} variant="outline" className="w-full bg-transparent">
                    <svg className="size-4 mr-2" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Connect with Google
                  </Button>
                </div>
              )}

              <Tabs defaultValue="sheet" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="sheet">
                    <FileSpreadsheet className="size-4 mr-2" />
                    Sheet Access
                  </TabsTrigger>
                  <TabsTrigger value="script">
                    <Code className="size-4 mr-2" />
                    Apps Script
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="sheet" className="space-y-2">
                  <div className="space-y-2">
                    <Label htmlFor="spreadsheetId">Spreadsheet ID (Optional)</Label>
                    <Input
                      id="spreadsheetId"
                      value={newIntegration.spreadsheetId}
                      onChange={(e) => setNewIntegration({ ...newIntegration, spreadsheetId: e.target.value })}
                      placeholder="1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms"
                    />
                    <p className="text-xs text-muted-foreground">
                      Found in the sheet URL: docs.google.com/spreadsheets/d/[SPREADSHEET_ID]/edit
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="script" className="space-y-2">
                  <div className="space-y-2">
                    <Label htmlFor="scriptId">Apps Script ID (Optional)</Label>
                    <Input
                      id="scriptId"
                      value={newIntegration.scriptId}
                      onChange={(e) => setNewIntegration({ ...newIntegration, scriptId: e.target.value })}
                      placeholder="AKfycbzQ..."
                    />
                    <p className="text-xs text-muted-foreground">
                      Deploy your Apps Script as a web app and paste the script ID here
                    </p>
                  </div>
                </TabsContent>
              </Tabs>

              {newIntegration.authType === "apiKey" && (
                <Button onClick={handleAddIntegration} className="w-full">
                  Add Integration
                </Button>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {googleSheets.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed rounded-lg">
          <FileSpreadsheet className="size-12 mx-auto text-muted-foreground mb-3" />
          <p className="text-muted-foreground">No Google Sheets integrations yet</p>
          <p className="text-sm text-muted-foreground mt-1">Connect your first sheet to start automating</p>
        </div>
      ) : (
        <div className="space-y-3">
          {googleSheets.map((integration) => (
            <div key={integration.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded">
                    <FileSpreadsheet className="size-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <div className="font-medium">{integration.name}</div>
                    <div className="text-sm text-muted-foreground capitalize flex items-center gap-2">
                      {integration.authType === "oauth" ? "OAuth 2.0" : "API Key"}
                      {integration.authType === "oauth" && integration.expiresAt && (
                        <span className="text-xs">
                          • Expires {new Date(integration.expiresAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={integration.isActive}
                    onCheckedChange={(checked) => updateGoogleSheets(integration.id, { isActive: checked })}
                  />
                  <Button variant="ghost" size="icon" onClick={() => removeGoogleSheets(integration.id)}>
                    <Trash2 className="size-4 text-destructive" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                {integration.authType === "apiKey" && integration.apiKey && (
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">API Key:</span>
                    <div className="flex items-center gap-2">
                      <code className="text-xs bg-muted px-2 py-1 rounded">
                        {showSecrets[integration.id] ? integration.apiKey : "••••••••••••••••"}
                      </code>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-6"
                        onClick={() => toggleSecretVisibility(integration.id)}
                      >
                        {showSecrets[integration.id] ? <EyeOff className="size-3" /> : <Eye className="size-3" />}
                      </Button>
                    </div>
                  </div>
                )}
                {integration.spreadsheetId && (
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Spreadsheet:</span>
                    <code className="text-xs bg-muted px-2 py-1 rounded">{integration.spreadsheetId}</code>
                  </div>
                )}
                {integration.scriptId && (
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Apps Script:</span>
                    <code className="text-xs bg-muted px-2 py-1 rounded flex items-center gap-1">
                      <Code className="size-3" />
                      {integration.scriptId.slice(0, 12)}...
                    </code>
                  </div>
                )}
              </div>

              {integration.lastUsed && (
                <div className="text-xs text-muted-foreground pt-2 border-t">
                  Last used: {new Date(integration.lastUsed).toLocaleString()}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

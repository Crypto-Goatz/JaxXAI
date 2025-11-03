"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Settings, Zap, Key, Code, Play, CheckCircle2, AlertCircle, Plus, Trash2 } from "lucide-react"

interface NodeConfig {
  endpoint?: string
  method?: string
  url?: string
  headers?: Record<string, string>
  auth?: {
    type: "none" | "api-key" | "bearer" | "oauth"
    apiKey?: string
    bearerToken?: string
    oauthToken?: string
  }
  body?: string
  params?: Record<string, string>
  responseMapping?: Record<string, string>
}

interface NodeConfigPanelProps {
  nodeId: string
  nodeName: string
  nodeType: string
  config: NodeConfig
  onClose: () => void
  onSave: (config: NodeConfig) => void
  onTest: (config: NodeConfig) => void
}

export function NodeConfigPanel({
  nodeId,
  nodeName,
  nodeType,
  config: initialConfig,
  onClose,
  onSave,
  onTest,
}: NodeConfigPanelProps) {
  const [config, setConfig] = useState<NodeConfig>(initialConfig)
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null)
  const [isTesting, setIsTesting] = useState(false)

  const handleTest = async () => {
    setIsTesting(true)
    setTestResult(null)

    try {
      // Simulate API test
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock test result
      const success = Math.random() > 0.3
      setTestResult({
        success,
        message: success
          ? "Configuration test successful! Endpoint is reachable and responding correctly."
          : "Test failed: Unable to connect to endpoint. Please check your configuration.",
      })
    } catch (error) {
      setTestResult({
        success: false,
        message: "Test error: " + (error as Error).message,
      })
    } finally {
      setIsTesting(false)
    }
  }

  const handleSave = () => {
    onSave(config)
    onClose()
  }

  const addHeader = () => {
    setConfig({
      ...config,
      headers: { ...config.headers, "": "" },
    })
  }

  const updateHeader = (oldKey: string, newKey: string, value: string) => {
    const newHeaders = { ...config.headers }
    if (oldKey !== newKey) {
      delete newHeaders[oldKey]
    }
    newHeaders[newKey] = value
    setConfig({ ...config, headers: newHeaders })
  }

  const removeHeader = (key: string) => {
    const newHeaders = { ...config.headers }
    delete newHeaders[key]
    setConfig({ ...config, headers: newHeaders })
  }

  const addParam = () => {
    setConfig({
      ...config,
      params: { ...config.params, "": "" },
    })
  }

  const updateParam = (oldKey: string, newKey: string, value: string) => {
    const newParams = { ...config.params }
    if (oldKey !== newKey) {
      delete newParams[oldKey]
    }
    newParams[newKey] = value
    setConfig({ ...config, params: newParams })
  }

  const removeParam = (key: string) => {
    const newParams = { ...config.params }
    delete newParams[key]
    setConfig({ ...config, params: newParams })
  }

  return (
    <div className="fixed inset-y-0 right-0 w-[500px] bg-background border-l border-border shadow-2xl z-50 overflow-y-auto">
      <Card className="h-full rounded-none border-0">
        <CardHeader className="border-b border-border sticky top-0 bg-background z-10">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Settings className="w-5 h-5 text-orange-500" />
                <CardTitle>Configure Node</CardTitle>
              </div>
              <CardDescription>
                {nodeName} • {nodeType}
              </CardDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          <Tabs defaultValue="endpoint" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="endpoint">
                <Zap className="w-4 h-4 mr-2" />
                Endpoint
              </TabsTrigger>
              <TabsTrigger value="auth">
                <Key className="w-4 h-4 mr-2" />
                Auth
              </TabsTrigger>
              <TabsTrigger value="data">
                <Code className="w-4 h-4 mr-2" />
                Data
              </TabsTrigger>
            </TabsList>

            {/* Endpoint Configuration */}
            <TabsContent value="endpoint" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="endpoint">Endpoint</Label>
                <Select value={config.endpoint} onValueChange={(value) => setConfig({ ...config, endpoint: value })}>
                  <SelectTrigger id="endpoint">
                    <SelectValue placeholder="Select an endpoint" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="google-sheets">Google Sheets API</SelectItem>
                    <SelectItem value="database">Database Query</SelectItem>
                    <SelectItem value="ai-process">AI Processing</SelectItem>
                    <SelectItem value="email">Send Email</SelectItem>
                    <SelectItem value="webhook">Webhook</SelectItem>
                    <SelectItem value="custom">Custom API</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="method">HTTP Method</Label>
                <Select
                  value={config.method || "GET"}
                  onValueChange={(value) => setConfig({ ...config, method: value })}
                >
                  <SelectTrigger id="method">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GET">GET</SelectItem>
                    <SelectItem value="POST">POST</SelectItem>
                    <SelectItem value="PUT">PUT</SelectItem>
                    <SelectItem value="PATCH">PATCH</SelectItem>
                    <SelectItem value="DELETE">DELETE</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="url">URL / Path</Label>
                <Input
                  id="url"
                  type="text"
                  placeholder="https://api.example.com/endpoint"
                  value={config.url || ""}
                  onChange={(e) => setConfig({ ...config, url: e.target.value })}
                />
              </div>

              {/* Headers */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Headers</Label>
                  <Button size="sm" variant="outline" onClick={addHeader}>
                    <Plus className="w-3 h-3 mr-1" />
                    Add Header
                  </Button>
                </div>
                <div className="space-y-2">
                  {Object.entries(config.headers || {}).map(([key, value]) => (
                    <div key={key} className="flex items-center gap-2">
                      <Input
                        placeholder="Header name"
                        value={key}
                        onChange={(e) => updateHeader(key, e.target.value, value)}
                        className="flex-1"
                      />
                      <Input
                        placeholder="Header value"
                        value={value}
                        onChange={(e) => updateHeader(key, key, e.target.value)}
                        className="flex-1"
                      />
                      <Button size="icon" variant="ghost" onClick={() => removeHeader(key)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Query Parameters */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Query Parameters</Label>
                  <Button size="sm" variant="outline" onClick={addParam}>
                    <Plus className="w-3 h-3 mr-1" />
                    Add Param
                  </Button>
                </div>
                <div className="space-y-2">
                  {Object.entries(config.params || {}).map(([key, value]) => (
                    <div key={key} className="flex items-center gap-2">
                      <Input
                        placeholder="Parameter name"
                        value={key}
                        onChange={(e) => updateParam(key, e.target.value, value)}
                        className="flex-1"
                      />
                      <Input
                        placeholder="Parameter value"
                        value={value}
                        onChange={(e) => updateParam(key, key, e.target.value)}
                        className="flex-1"
                      />
                      <Button size="icon" variant="ghost" onClick={() => removeParam(key)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Authentication */}
            <TabsContent value="auth" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="auth-type">Authentication Type</Label>
                <Select
                  value={config.auth?.type || "none"}
                  onValueChange={(value: any) =>
                    setConfig({
                      ...config,
                      auth: { ...config.auth, type: value },
                    })
                  }
                >
                  <SelectTrigger id="auth-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="api-key">API Key</SelectItem>
                    <SelectItem value="bearer">Bearer Token</SelectItem>
                    <SelectItem value="oauth">OAuth 2.0</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {config.auth?.type === "api-key" && (
                <div className="space-y-2">
                  <Label htmlFor="api-key">API Key</Label>
                  <Input
                    id="api-key"
                    type="password"
                    placeholder="Enter your API key"
                    value={config.auth.apiKey || ""}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        auth: { ...config.auth, type: "api-key", apiKey: e.target.value },
                      })
                    }
                  />
                  <p className="text-xs text-muted-foreground">Your API key will be securely stored and encrypted</p>
                </div>
              )}

              {config.auth?.type === "bearer" && (
                <div className="space-y-2">
                  <Label htmlFor="bearer-token">Bearer Token</Label>
                  <Input
                    id="bearer-token"
                    type="password"
                    placeholder="Enter your bearer token"
                    value={config.auth.bearerToken || ""}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        auth: { ...config.auth, type: "bearer", bearerToken: e.target.value },
                      })
                    }
                  />
                </div>
              )}

              {config.auth?.type === "oauth" && (
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-accent">
                    <p className="text-sm text-muted-foreground mb-3">
                      OAuth 2.0 authentication requires connecting your account
                    </p>
                    <Button size="sm" className="w-full">
                      Connect Account
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>

            {/* Data Configuration */}
            <TabsContent value="data" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="request-body">Request Body (JSON)</Label>
                <Textarea
                  id="request-body"
                  placeholder='{\n  "key": "value"\n}'
                  value={config.body || ""}
                  onChange={(e) => setConfig({ ...config, body: e.target.value })}
                  className="font-mono text-xs min-h-[200px]"
                />
              </div>

              <div className="space-y-2">
                <Label>Response Mapping</Label>
                <p className="text-xs text-muted-foreground mb-2">Map response fields to flow variables</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Input placeholder="Response field" className="flex-1" />
                    <span className="text-muted-foreground">→</span>
                    <Input placeholder="Variable name" className="flex-1" />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Test Result */}
          {testResult && (
            <div
              className={`p-4 rounded-lg border-2 ${
                testResult.success ? "bg-green-500/10 border-green-500" : "bg-red-500/10 border-red-500"
              }`}
            >
              <div className="flex items-start gap-3">
                {testResult.success ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <h4 className="text-sm font-semibold mb-1">
                    {testResult.success ? "Test Successful" : "Test Failed"}
                  </h4>
                  <p className="text-xs text-muted-foreground">{testResult.message}</p>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-3 pt-4 border-t border-border">
            <Button variant="outline" className="flex-1 bg-transparent" onClick={handleTest} disabled={isTesting}>
              <Play className="w-4 h-4 mr-2" />
              {isTesting ? "Testing..." : "Test Configuration"}
            </Button>
            <Button onClick={handleSave} className="flex-1">
              Save Configuration
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

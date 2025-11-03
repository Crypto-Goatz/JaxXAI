"use client"

import { useState } from "react"
import { useIntegrations } from "@/contexts/integration-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Card } from "@/components/ui/card"
import { Plus, Trash2, Database, TrendingUp, Sparkles } from "lucide-react"
import type { CryptoVariableType, LunarCrushCapability } from "@/types/integration.types"
import LunarCrushIntegrationModal from "./lunarcrush-integration-modal"
import cn from "classnames"

const DATA_SOURCE_PROVIDERS = [
  {
    type: "coingecko" as const,
    name: "CoinGecko",
    description: "Market data, prices, and charts",
    requiresApiKey: false,
    variables: ["price", "volume", "market_cap", "price_change_24h", "price_change_7d"] as CryptoVariableType[],
  },
  {
    type: "lunarcrush" as const,
    name: "LunarCrush",
    description: "Social sentiment and engagement metrics",
    requiresApiKey: true,
    variables: ["social_sentiment", "social_mentions", "social_engagement"] as CryptoVariableType[],
    isSpecial: true,
  },
  {
    type: "glassnode" as const,
    name: "Glassnode",
    description: "On-chain analytics and metrics",
    requiresApiKey: true,
    variables: [
      "whale_transactions",
      "exchange_inflow",
      "exchange_outflow",
      "active_addresses",
    ] as CryptoVariableType[],
  },
  {
    type: "santiment" as const,
    name: "Santiment",
    description: "On-chain, social, and development metrics",
    requiresApiKey: true,
    variables: ["social_sentiment", "whale_transactions", "active_addresses"] as CryptoVariableType[],
  },
  {
    type: "messari" as const,
    name: "Messari",
    description: "Research-grade crypto data",
    requiresApiKey: true,
    variables: ["market_cap", "volume", "tvl", "apy"] as CryptoVariableType[],
  },
  {
    type: "dune" as const,
    name: "Dune Analytics",
    description: "Custom blockchain queries",
    requiresApiKey: true,
    variables: ["active_addresses", "tvl", "gas_price"] as CryptoVariableType[],
  },
]

export default function DataSourceIntegrations() {
  const { dataSources, addDataSource, removeDataSource, updateDataSource } = useIntegrations()
  const [selectedProvider, setSelectedProvider] = useState<(typeof DATA_SOURCE_PROVIDERS)[0] | null>(null)
  const [apiKey, setApiKey] = useState("")
  const [customName, setCustomName] = useState("")
  const [showLunarCrushModal, setShowLunarCrushModal] = useState(false)

  const handleAddSource = () => {
    if (!selectedProvider) return

    const newSource = {
      name: customName || selectedProvider.name,
      type: selectedProvider.type,
      apiKey: selectedProvider.requiresApiKey ? apiKey : undefined,
      isActive: true,
      availableVariables: selectedProvider.variables,
    }

    addDataSource(newSource)
    setSelectedProvider(null)
    setApiKey("")
    setCustomName("")
  }

  const handleLunarCrushComplete = (
    apiKey: string,
    capabilities: LunarCrushCapability[],
    tier: string,
    rateLimit: unknown,
  ) => {
    const enabledCapabilities = capabilities.filter((c) => c.enabled)
    const allVariables = Array.from(new Set(enabledCapabilities.flatMap((c) => c.variables)))

    const newSource = {
      name: "LunarCrush",
      type: "lunarcrush" as const,
      apiKey,
      isActive: true,
      availableVariables: allVariables,
      capabilities: enabledCapabilities,
      isVerified: true,
      tier: tier as "free" | "pro" | "enterprise",
      rateLimit: rateLimit as {
        requestsPerDay: number
        requestsRemaining: number
        resetAt?: Date
      },
    }

    addDataSource(newSource)
  }

  const handleToggleActive = (id: string, isActive: boolean) => {
    updateDataSource(id, { isActive })
  }

  const handleProviderClick = (provider: (typeof DATA_SOURCE_PROVIDERS)[0]) => {
    if (provider.type === "lunarcrush") {
      setShowLunarCrushModal(true)
    } else {
      setSelectedProvider(provider)
    }
  }

  return (
    <div className="space-y-6">
      {/* Existing Data Sources */}
      {dataSources.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-medium">Connected Data Sources</h3>
          {dataSources.map((source) => (
            <Card key={source.id} className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <Database className="size-5 text-muted-foreground mt-0.5" />
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{source.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {source.type}
                      </Badge>
                      {source.isVerified && (
                        <Badge variant="default" className="text-xs">
                          Verified
                        </Badge>
                      )}
                      {source.tier && (
                        <Badge variant="secondary" className="text-xs">
                          {source.tier.toUpperCase()}
                        </Badge>
                      )}
                    </div>
                    {source.type === "lunarcrush" && source.capabilities && (
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">
                          {source.capabilities.filter((c) => c.enabled).length} capabilities enabled
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {source.capabilities
                            .filter((c) => c.enabled)
                            .slice(0, 3)
                            .map((cap) => (
                              <Badge key={cap.id} variant="secondary" className="text-xs">
                                {cap.name}
                              </Badge>
                            ))}
                          {source.capabilities.filter((c) => c.enabled).length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{source.capabilities.filter((c) => c.enabled).length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}
                    <div className="flex flex-wrap gap-1">
                      {source.availableVariables.slice(0, 5).map((varType) => (
                        <Badge key={varType} variant="secondary" className="text-xs">
                          {varType}
                        </Badge>
                      ))}
                      {source.availableVariables.length > 5 && (
                        <Badge variant="secondary" className="text-xs">
                          +{source.availableVariables.length - 5} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={source.isActive}
                    onCheckedChange={(checked) => handleToggleActive(source.id, checked)}
                  />
                  <Button variant="ghost" size="icon" onClick={() => removeDataSource(source.id)}>
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Add New Data Source */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium">Add Data Source</h3>

        {!selectedProvider ? (
          <div className="grid gap-3">
            {DATA_SOURCE_PROVIDERS.map((provider) => (
              <Card
                key={provider.type}
                className={cn(
                  "p-4 cursor-pointer hover:border-primary transition-colors",
                  provider.isSpecial && "border-primary/30 bg-primary/5",
                )}
                onClick={() => handleProviderClick(provider)}
              >
                <div className="flex items-start gap-3">
                  {provider.isSpecial ? (
                    <Sparkles className="size-5 text-primary mt-0.5" />
                  ) : (
                    <TrendingUp className="size-5 text-muted-foreground mt-0.5" />
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{provider.name}</span>
                      {provider.requiresApiKey && (
                        <Badge variant="outline" className="text-xs">
                          API Key Required
                        </Badge>
                      )}
                      {provider.isSpecial && (
                        <Badge variant="default" className="text-xs">
                          Advanced Setup
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{provider.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {provider.variables.slice(0, 4).map((varType) => (
                        <Badge key={varType} variant="secondary" className="text-xs">
                          {varType}
                        </Badge>
                      ))}
                      {provider.variables.length > 4 && (
                        <Badge variant="secondary" className="text-xs">
                          +{provider.variables.length - 4}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">{selectedProvider.name}</h4>
              <Button variant="ghost" size="sm" onClick={() => setSelectedProvider(null)}>
                Cancel
              </Button>
            </div>

            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="customName">Custom Name (Optional)</Label>
                <Input
                  id="customName"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder={selectedProvider.name}
                />
              </div>

              {selectedProvider.requiresApiKey && (
                <div className="space-y-2">
                  <Label htmlFor="apiKey">
                    API Key <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="apiKey"
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Enter your API key"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label>Available Variables ({selectedProvider.variables.length})</Label>
                <div className="flex flex-wrap gap-1">
                  {selectedProvider.variables.map((varType) => (
                    <Badge key={varType} variant="secondary" className="text-xs">
                      {varType}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <Button onClick={handleAddSource} disabled={selectedProvider.requiresApiKey && !apiKey} className="w-full">
              <Plus className="size-4 mr-2" />
              Add Data Source
            </Button>
          </Card>
        )}
      </div>

      <LunarCrushIntegrationModal
        open={showLunarCrushModal}
        onOpenChange={setShowLunarCrushModal}
        onComplete={handleLunarCrushComplete}
      />
    </div>
  )
}

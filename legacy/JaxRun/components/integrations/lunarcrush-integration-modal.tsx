"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Loader2, CheckCircle2, XCircle, Sparkles, TrendingUp, Users, ImageIcon } from "lucide-react"
import { lunarCrushService } from "@/lib/lunarcrush-service"
import { LUNARCRUSH_CAPABILITIES } from "@/lib/lunarcrush-capabilities"
import type { LunarCrushCapability } from "@/types/integration.types"
import { cn } from "@/lib/utils"

interface LunarCrushIntegrationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onComplete: (apiKey: string, capabilities: LunarCrushCapability[], tier: string, rateLimit: unknown) => void
}

const CATEGORY_ICONS = {
  social: TrendingUp,
  market: Sparkles,
  influencer: Users,
  nft: ImageIcon,
  galaxy: Sparkles,
}

export default function LunarCrushIntegrationModal({
  open,
  onOpenChange,
  onComplete,
}: LunarCrushIntegrationModalProps) {
  const [step, setStep] = useState<"api-key" | "capabilities">("api-key")
  const [apiKey, setApiKey] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationResult, setVerificationResult] = useState<{
    isValid: boolean
    tier?: string
    rateLimit?: unknown
    error?: string
  } | null>(null)
  const [selectedCapabilities, setSelectedCapabilities] = useState<LunarCrushCapability[]>([])

  const handleVerifyApiKey = async () => {
    if (!apiKey.trim()) return

    setIsVerifying(true)
    setVerificationResult(null)

    const result = await lunarCrushService.verifyApiKey(apiKey)

    setVerificationResult(result)
    setIsVerifying(false)

    if (result.isValid) {
      // Auto-select all capabilities for verified users
      setSelectedCapabilities(LUNARCRUSH_CAPABILITIES.map((cap) => ({ ...cap, enabled: true })))
      setTimeout(() => setStep("capabilities"), 1000)
    }
  }

  const handleToggleCapability = (capabilityId: string) => {
    setSelectedCapabilities((prev) =>
      prev.map((cap) => (cap.id === capabilityId ? { ...cap, enabled: !cap.enabled } : cap)),
    )
  }

  const handleComplete = () => {
    if (verificationResult?.isValid) {
      onComplete(apiKey, selectedCapabilities, verificationResult.tier || "free", verificationResult.rateLimit)
      onOpenChange(false)
      // Reset state
      setStep("api-key")
      setApiKey("")
      setVerificationResult(null)
      setSelectedCapabilities([])
    }
  }

  const groupedCapabilities = LUNARCRUSH_CAPABILITIES.reduce(
    (acc, cap) => {
      if (!acc[cap.category]) acc[cap.category] = []
      acc[cap.category].push(cap)
      return acc
    },
    {} as Record<string, LunarCrushCapability[]>,
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Connect LunarCrush</DialogTitle>
          <DialogDescription>
            {step === "api-key"
              ? "Enter your LunarCrush API key to verify access and unlock social sentiment data"
              : "Select which LunarCrush capabilities you want to use in your workflows"}
          </DialogDescription>
        </DialogHeader>

        {step === "api-key" && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="lunarcrush-api-key">
                API Key <span className="text-destructive">*</span>
              </Label>
              <Input
                id="lunarcrush-api-key"
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your LunarCrush API key"
                disabled={isVerifying}
              />
              <p className="text-xs text-muted-foreground">
                Get your API key from{" "}
                <a
                  href="https://lunarcrush.com/developers/api"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  LunarCrush Developers
                </a>
              </p>
            </div>

            {verificationResult && (
              <div
                className={cn(
                  "flex items-start gap-3 p-3 rounded-lg border",
                  verificationResult.isValid
                    ? "bg-green-500/10 border-green-500/20 text-green-700 dark:text-green-400"
                    : "bg-red-500/10 border-red-500/20 text-red-700 dark:text-red-400",
                )}
              >
                {verificationResult.isValid ? (
                  <CheckCircle2 className="size-5 mt-0.5 flex-shrink-0" />
                ) : (
                  <XCircle className="size-5 mt-0.5 flex-shrink-0" />
                )}
                <div className="flex-1 space-y-1">
                  <p className="font-medium">
                    {verificationResult.isValid ? "API Key Verified!" : "Verification Failed"}
                  </p>
                  {verificationResult.isValid && verificationResult.tier && (
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {verificationResult.tier.toUpperCase()} Tier
                      </Badge>
                      {verificationResult.rateLimit && (
                        <span className="text-xs">
                          {(verificationResult.rateLimit as { requestsPerDay: number }).requestsPerDay} requests/day
                        </span>
                      )}
                    </div>
                  )}
                  {verificationResult.error && <p className="text-sm">{verificationResult.error}</p>}
                </div>
              </div>
            )}

            <Button onClick={handleVerifyApiKey} disabled={!apiKey.trim() || isVerifying} className="w-full">
              {isVerifying ? (
                <>
                  <Loader2 className="size-4 mr-2 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Verify API Key"
              )}
            </Button>
          </div>
        )}

        {step === "capabilities" && (
          <div className="space-y-4">
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-6">
                {Object.entries(groupedCapabilities).map(([category, capabilities]) => {
                  const Icon = CATEGORY_ICONS[category as keyof typeof CATEGORY_ICONS]
                  return (
                    <div key={category} className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Icon className="size-4 text-muted-foreground" />
                        <h4 className="font-medium capitalize">{category}</h4>
                      </div>
                      <div className="space-y-2">
                        {capabilities.map((capability) => {
                          const selected = selectedCapabilities.find((c) => c.id === capability.id)
                          return (
                            <div
                              key={capability.id}
                              className="flex items-start gap-3 p-3 rounded-lg border hover:border-primary/50 transition-colors cursor-pointer"
                              onClick={() => handleToggleCapability(capability.id)}
                            >
                              <Checkbox
                                checked={selected?.enabled || false}
                                onCheckedChange={() => handleToggleCapability(capability.id)}
                                className="mt-1"
                              />
                              <div className="flex-1 space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-sm">{capability.name}</span>
                                  {capability.nodeType && (
                                    <Badge variant="secondary" className="text-xs">
                                      {capability.nodeType}
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-xs text-muted-foreground">{capability.description}</p>
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {capability.variables.slice(0, 3).map((variable) => (
                                    <Badge key={variable} variant="outline" className="text-xs">
                                      {variable}
                                    </Badge>
                                  ))}
                                  {capability.variables.length > 3 && (
                                    <Badge variant="outline" className="text-xs">
                                      +{capability.variables.length - 3}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            </ScrollArea>

            <div className="flex items-center justify-between pt-4 border-t">
              <Button variant="outline" onClick={() => setStep("api-key")}>
                Back
              </Button>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {selectedCapabilities.filter((c) => c.enabled).length} selected
                </span>
                <Button onClick={handleComplete} disabled={selectedCapabilities.filter((c) => c.enabled).length === 0}>
                  Complete Setup
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

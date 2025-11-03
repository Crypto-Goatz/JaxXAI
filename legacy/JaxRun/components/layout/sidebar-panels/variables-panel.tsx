"use client"

import { memo, useMemo, useState } from "react"
import { useFlowStore } from "@/contexts/flow-context"
import { useIntegrations } from "@/contexts/integration-context"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Variable, TrendingUp, Database, Calculator, Plus, Sparkles, Code } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CRYPTO_EQUATIONS, COMMON_PHRASES } from "@/lib/crypto-equations"
import type { CryptoEquationType } from "@/types/crypto-equations.types"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const VariablesPanel = memo(function VariablesPanel() {
  const nodes = useFlowStore((state) => state.nodes)
  const { dataSources } = useIntegrations()
  const [enabledEquations, setEnabledEquations] = useState<Set<CryptoEquationType>>(new Set())
  const [selectedEquation, setSelectedEquation] = useState<CryptoEquationType | null>(null)

  const [customEquationName, setCustomEquationName] = useState("")
  const [customEquationFormula, setCustomEquationFormula] = useState("")
  const [customEquations, setCustomEquations] = useState<Array<{ name: string; formula: string }>>([])
  const [showCustomDialog, setShowCustomDialog] = useState(false)
  const [showAIDialog, setShowAIDialog] = useState(false)
  const [aiPrompt, setAiPrompt] = useState("")

  const hasEquations = useMemo(() => enabledEquations.size > 0, [enabledEquations])
  const hasCryptoVariables = useMemo(() => dataSources.some((s) => s.isActive), [dataSources])
  const hasUserVariables = useMemo(() => nodes.some((n) => n.type === "textInput"), [nodes])
  const cryptoVariables = useMemo(() => dataSources.flatMap((s) => s.variables), [dataSources])
  const userVariables = useMemo(() => nodes.filter((n) => n.type === "textInput").map((n) => n.data), [nodes])

  const toggleEquation = (type: CryptoEquationType) => {
    setEnabledEquations((prev) => {
      const next = new Set(prev)
      if (next.has(type)) {
        next.delete(type)
      } else {
        next.add(type)
      }
      return next
    })
  }

  const handleAddCustomEquation = () => {
    if (customEquationName && customEquationFormula) {
      setCustomEquations([...customEquations, { name: customEquationName, formula: customEquationFormula }])
      setCustomEquationName("")
      setCustomEquationFormula("")
      setShowCustomDialog(false)
    }
  }

  const handleAIAssist = () => {
    // Placeholder for AI assistance - would integrate with AI SDK
    alert("AI assistance coming soon! This will help you create custom equations based on your description.")
    setShowAIDialog(false)
  }

  return (
    <Tabs defaultValue="phrases" className="space-y-4">
      <TabsList className="grid w-full grid-cols-4 text-xs">
        <TabsTrigger value="phrases" className="text-xs">
          <Sparkles className="size-3 mr-1" />
          Phrases
        </TabsTrigger>
        <TabsTrigger value="equations" className="text-xs">
          <Calculator className="size-3 mr-1" />
          Equations
        </TabsTrigger>
        <TabsTrigger value="crypto" className="text-xs">
          <TrendingUp className="size-3 mr-1" />
          Crypto
        </TabsTrigger>
        <TabsTrigger value="user" className="text-xs">
          <Variable className="size-3 mr-1" />
          User
        </TabsTrigger>
      </TabsList>

      <TabsContent value="phrases" className="space-y-4">
        <div className="text-sm text-muted-foreground">Common trading strategy phrases</div>
        <div className="space-y-3">
          {Object.entries(COMMON_PHRASES).map(([key, phrase]) => (
            <div
              key={key}
              className="p-3 border rounded-lg space-y-2 hover:border-primary/50 transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="text-sm font-medium">{phrase.name}</div>
                    <Badge variant="outline" className="text-xs capitalize">
                      {phrase.category}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground mb-2">{phrase.description}</div>
                  <code className="block text-xs bg-muted/50 p-2 rounded font-mono text-muted-foreground">
                    {phrase.formula}
                  </code>
                </div>
              </div>
            </div>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="equations" className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <div className="text-sm text-muted-foreground">Crypto calculation equations</div>
          <div className="flex gap-2">
            <Dialog open={showAIDialog} onOpenChange={setShowAIDialog}>
              <DialogTrigger asChild>
                <Button size="sm" variant="outline" className="h-7 text-xs bg-transparent">
                  <Sparkles className="size-3 mr-1" />
                  AI
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>AI Equation Assistant</DialogTitle>
                  <DialogDescription>
                    Describe what you want to calculate and AI will help create the equation
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label>Describe your equation</Label>
                    <Textarea
                      placeholder="e.g., I want to buy when RSI is below 30 and price is above the 50-day moving average"
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      rows={4}
                    />
                  </div>
                  <Button onClick={handleAIAssist} className="w-full">
                    Generate Equation
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={showCustomDialog} onOpenChange={setShowCustomDialog}>
              <DialogTrigger asChild>
                <Button size="sm" variant="outline" className="h-7 text-xs bg-transparent">
                  <Code className="size-3 mr-1" />
                  Custom
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Custom Equation</DialogTitle>
                  <DialogDescription>Write your own custom equation formula</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label>Equation Name</Label>
                    <Input
                      placeholder="e.g., My Custom Strategy"
                      value={customEquationName}
                      onChange={(e) => setCustomEquationName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Formula</Label>
                    <Textarea
                      placeholder="e.g., (price * volume) / market_cap > 0.5"
                      value={customEquationFormula}
                      onChange={(e) => setCustomEquationFormula(e.target.value)}
                      rows={4}
                    />
                  </div>
                  <Button onClick={handleAddCustomEquation} className="w-full">
                    Add Equation
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" variant="outline" className="h-7 text-xs bg-transparent">
                  <Plus className="size-3 mr-1" />
                  Add
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add Crypto Equations</DialogTitle>
                  <DialogDescription>Select equations to add to your workflow variables</DialogDescription>
                </DialogHeader>
                <div className="space-y-3 mt-4">
                  {Object.entries(CRYPTO_EQUATIONS).map(([key, equation]) => {
                    const isEnabled = enabledEquations.has(key as CryptoEquationType)
                    return (
                      <div
                        key={key}
                        className="p-4 border rounded-lg hover:border-primary/50 transition-colors cursor-pointer"
                        onClick={() => toggleEquation(key as CryptoEquationType)}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium text-sm">{equation.name}</h4>
                              <Badge variant="outline" className="text-xs capitalize">
                                {equation.category}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">{equation.description}</p>
                            <code className="block text-xs bg-muted p-2 rounded font-mono">{equation.formula}</code>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {equation.inputs.map((input) => (
                                <Badge key={input.name} variant="secondary" className="text-xs">
                                  {input.name}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant={isEnabled ? "default" : "outline"}
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleEquation(key as CryptoEquationType)
                            }}
                          >
                            {isEnabled ? "Enabled" : "Enable"}
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {customEquations.length > 0 && (
          <div className="space-y-3">
            <div className="text-xs font-medium text-muted-foreground">Custom Equations</div>
            {customEquations.map((eq, idx) => (
              <div key={idx} className="p-3 border rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <code className="text-xs font-mono bg-muted px-2 py-1 rounded">{eq.name}</code>
                  <Badge variant="outline" className="text-xs">
                    Custom
                  </Badge>
                </div>
                <code className="block text-xs bg-muted/50 p-2 rounded font-mono text-muted-foreground">
                  {eq.formula}
                </code>
              </div>
            ))}
          </div>
        )}

        {/* ... existing equations display code ... */}
        {!hasEquations ? (
          <div className="text-center py-8">
            <Calculator className="size-10 mx-auto text-muted-foreground/50 mb-2" />
            <div className="text-sm text-muted-foreground">No equations enabled</div>
            <div className="text-xs text-muted-foreground mt-1">Click Add to enable crypto equations</div>
          </div>
        ) : (
          <div className="space-y-3">
            {Array.from(enabledEquations).map((eqType) => {
              const equation = CRYPTO_EQUATIONS[eqType]
              return (
                <div
                  key={eqType}
                  className="p-3 border rounded-lg space-y-2 group hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <code className="text-xs font-mono bg-muted px-2 py-1 rounded">{equation.name}</code>
                        <Badge variant="outline" className="text-xs capitalize">
                          {equation.category}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground mb-2">{equation.description}</div>
                      <code className="block text-xs bg-muted/50 p-2 rounded font-mono text-muted-foreground">
                        {equation.formula}
                      </code>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => toggleEquation(eqType)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </TabsContent>

      {/* ... existing crypto and user tabs ... */}
      <TabsContent value="crypto" className="space-y-4">
        {!hasCryptoVariables ? (
          <div className="text-center py-8">
            <Database className="size-10 mx-auto text-muted-foreground/50 mb-2" />
            <div className="text-sm text-muted-foreground">No crypto variables available</div>
            <div className="text-xs text-muted-foreground mt-1">Connect data sources in Integrations</div>
          </div>
        ) : (
          <>
            <div className="text-sm text-muted-foreground">
              Available from {dataSources.filter((s) => s.isActive).length} active data source(s)
            </div>
            <div className="space-y-3">
              {cryptoVariables.map((varType) => (
                <div key={varType} className="p-3 border rounded-lg space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <code className="text-xs font-mono bg-muted px-2 py-1 rounded">{varType}</code>
                    <Badge variant="secondary" className="text-xs capitalize shrink-0">
                      Variable
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">Crypto data variable</div>
                </div>
              ))}
            </div>
          </>
        )}
      </TabsContent>

      <TabsContent value="user" className="space-y-4">
        {!hasUserVariables ? (
          <div className="text-center py-8">
            <Variable className="size-10 mx-auto text-muted-foreground/50 mb-2" />
            <div className="text-sm text-muted-foreground">No user variables defined</div>
            <div className="text-xs text-muted-foreground mt-1">Add Text Input nodes to create variables</div>
          </div>
        ) : (
          <>
            <div className="text-sm text-muted-foreground">Variables collected from user inputs</div>
            <div className="space-y-3">
              {userVariables.map((variable) => (
                <div key={`${variable.nodeId}-${variable.name}`} className="p-3 border rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <code className="text-sm font-mono bg-muted px-2 py-1 rounded">{variable.name}</code>
                    {variable.required && (
                      <Badge variant="destructive" className="text-xs">
                        Required
                      </Badge>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">From: {variable.nodeLabel}</div>
                </div>
              ))}
            </div>
          </>
        )}
      </TabsContent>
    </Tabs>
  )
})

export default VariablesPanel

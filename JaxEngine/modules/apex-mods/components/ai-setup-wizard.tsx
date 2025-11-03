"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Sparkles, ArrowRight, ArrowLeft, CheckCircle2, Clock, Cloud } from "lucide-react"

interface SetupStep {
  id: string
  title: string
  description: string
  aiGuidance: string
  fields?: {
    name: string
    label: string
    placeholder: string
    type: string
    required: boolean
  }[]
}

interface AISetupWizardProps {
  isOpen: boolean
  onClose: () => void
  modName: string
  modId: string
  onComplete: () => void
}

const saasModSetupSteps: SetupStep[] = [
  {
    id: "welcome",
    title: "Welcome to SaaS MOD Setup",
    description: "Let's get your complete SaaS deployment configured in just a few steps.",
    aiGuidance:
      "I'll guide you through connecting Firebase, Google Cloud Run, Stripe, and Google Workspace. This should take about 5 minutes.",
  },
  {
    id: "firebase",
    title: "Firebase Configuration",
    description: "Connect your Firebase project for authentication and hosting.",
    aiGuidance:
      "You'll need your Firebase project credentials. Don't worry, I'll help you find them in the Firebase Console.",
    fields: [
      {
        name: "firebaseApiKey",
        label: "Firebase API Key",
        placeholder: "AIzaSy...",
        type: "text",
        required: true,
      },
      {
        name: "firebaseProjectId",
        label: "Project ID",
        placeholder: "my-project-id",
        type: "text",
        required: true,
      },
      {
        name: "firebaseAppId",
        label: "App ID",
        placeholder: "1:123456789:web:...",
        type: "text",
        required: true,
      },
    ],
  },
  {
    id: "google-cloud",
    title: "Google Cloud Run Setup",
    description: "Configure serverless deployment with Google Cloud Run.",
    aiGuidance:
      "I'll help you set up automatic deployment to Google Cloud Run. Make sure you have the gcloud CLI installed.",
    fields: [
      {
        name: "gcpProjectId",
        label: "GCP Project ID",
        placeholder: "my-gcp-project",
        type: "text",
        required: true,
      },
      {
        name: "gcpRegion",
        label: "Deployment Region",
        placeholder: "us-central1",
        type: "text",
        required: true,
      },
    ],
  },
  {
    id: "stripe",
    title: "Stripe Payment Integration",
    description: "Connect Stripe for payment processing and subscriptions.",
    aiGuidance:
      "You'll need your Stripe API keys. I recommend using test keys first to ensure everything works correctly.",
    fields: [
      {
        name: "stripePublishableKey",
        label: "Publishable Key",
        placeholder: "pk_test_...",
        type: "text",
        required: true,
      },
      {
        name: "stripeSecretKey",
        label: "Secret Key",
        placeholder: "sk_test_...",
        type: "password",
        required: true,
      },
    ],
  },
  {
    id: "workspace",
    title: "Google Workspace (Optional)",
    description: "Connect Google Workspace for team collaboration features.",
    aiGuidance:
      "This step is optional but recommended for team features. You can skip this and set it up later if needed.",
    fields: [
      {
        name: "workspaceClientId",
        label: "Client ID",
        placeholder: "123456789-...",
        type: "text",
        required: false,
      },
      {
        name: "workspaceClientSecret",
        label: "Client Secret",
        placeholder: "GOCSPX-...",
        type: "password",
        required: false,
      },
    ],
  },
  {
    id: "complete",
    title: "Setup Complete!",
    description: "Your SaaS MOD is now configured and ready to use.",
    aiGuidance:
      "Great job! I've configured everything for you. You can now use the SaaS MOD in your APEX Flows to deploy complete applications.",
  },
]

export function AISetupWizard({ isOpen, onClose, modName, modId, onComplete }: AISetupWizardProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [skippedSteps, setSkippedSteps] = useState<Set<string>>(new Set())
  const [isProcessing, setIsProcessing] = useState(false)

  const steps = modId === "saas-mod" ? saasModSetupSteps : []
  const progress = ((currentStep + 1) / steps.length) * 100

  useEffect(() => {
    // Load saved progress from localStorage
    const savedProgress = localStorage.getItem(`setup-progress-${modId}`)
    if (savedProgress) {
      const { step, data, skipped } = JSON.parse(savedProgress)
      setCurrentStep(step)
      setFormData(data)
      setSkippedSteps(new Set(skipped))
    }
  }, [modId])

  const saveProgress = () => {
    localStorage.setItem(
      `setup-progress-${modId}`,
      JSON.stringify({
        step: currentStep,
        data: formData,
        skipped: Array.from(skippedSteps),
      }),
    )
  }

  const handleNext = () => {
    const currentStepData = steps[currentStep]

    // Validate required fields
    if (currentStepData.fields) {
      const requiredFields = currentStepData.fields.filter((f) => f.required)
      const missingFields = requiredFields.filter((f) => !formData[f.name])

      if (missingFields.length > 0 && !skippedSteps.has(currentStepData.id)) {
        alert(`Please fill in all required fields: ${missingFields.map((f) => f.label).join(", ")}`)
        return
      }
    }

    saveProgress()

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleComplete()
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSkip = () => {
    const currentStepData = steps[currentStep]
    setSkippedSteps((prev) => new Set([...prev, currentStepData.id]))
    saveProgress()
    handleNext()
  }

  const handleSkipAndClose = () => {
    saveProgress()
    onClose()
  }

  const handleComplete = () => {
    setIsProcessing(true)
    // Simulate API call
    setTimeout(() => {
      localStorage.removeItem(`setup-progress-${modId}`)
      setIsProcessing(false)
      onComplete()
      onClose()
    }, 2000)
  }

  const handleFieldChange = (fieldName: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }))
  }

  const currentStepData = steps[currentStep]
  const isFirstStep = currentStep === 0
  const isLastStep = currentStep === steps.length - 1
  const isWelcomeStep = currentStepData?.id === "welcome"
  const isCompleteStep = currentStepData?.id === "complete"

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl p-0 gap-0">
        {/* Header with Progress */}
        <div className="bg-gradient-to-r from-orange-500/10 via-red-500/10 to-yellow-500/10 border-b border-border">
          <DialogHeader className="px-6 pt-6 pb-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Cloud className="w-5 h-5 text-white" />
              </div>
              <div>
                <DialogTitle className="text-xl">{modName} Setup</DialogTitle>
                <DialogDescription>AI-guided configuration wizard</DialogDescription>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  Step {currentStep + 1} of {steps.length}
                </span>
                <span className="text-muted-foreground">{Math.round(progress)}% complete</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </DialogHeader>
        </div>

        {/* Content */}
        <div className="p-6 min-h-[400px] flex flex-col">
          {/* AI Assistant Message */}
          <div className="mb-6 p-4 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground mb-1">AI Assistant</p>
                <p className="text-sm text-muted-foreground">{currentStepData?.aiGuidance}</p>
              </div>
            </div>
          </div>

          {/* Step Content */}
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-foreground mb-2">{currentStepData?.title}</h3>
            <p className="text-muted-foreground mb-6">{currentStepData?.description}</p>

            {/* Form Fields */}
            {currentStepData?.fields && (
              <div className="space-y-4">
                {currentStepData.fields.map((field) => (
                  <div key={field.name} className="space-y-2">
                    <Label htmlFor={field.name}>
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </Label>
                    <Input
                      id={field.name}
                      type={field.type}
                      placeholder={field.placeholder}
                      value={formData[field.name] || ""}
                      onChange={(e) => handleFieldChange(field.name, e.target.value)}
                      required={field.required}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Welcome Step Content */}
            {isWelcomeStep && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg border border-border bg-card">
                    <h4 className="font-semibold text-foreground mb-2">What you'll need:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Firebase project credentials</li>
                      <li>• Google Cloud Platform account</li>
                      <li>• Stripe API keys</li>
                      <li>• Google Workspace (optional)</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-lg border border-border bg-card">
                    <h4 className="font-semibold text-foreground mb-2">Estimated time:</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>5-10 minutes</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">You can skip steps and come back later</p>
                  </div>
                </div>
              </div>
            )}

            {/* Complete Step Content */}
            {isCompleteStep && (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-white" />
                </div>
                <p className="text-muted-foreground mb-4">
                  Your {modName} is now ready to use in APEX Flow. You can start building powerful automations right
                  away!
                </p>
                {skippedSteps.size > 0 && (
                  <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-500">
                    {skippedSteps.size} step(s) skipped - you can complete them later
                  </Badge>
                )}
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-6 border-t border-border mt-6">
            <div className="flex items-center gap-2">
              {!isFirstStep && !isCompleteStep && (
                <Button variant="outline" onClick={handleBack} disabled={isProcessing}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              )}
              {!isWelcomeStep && !isCompleteStep && (
                <Button variant="ghost" onClick={handleSkipAndClose} disabled={isProcessing}>
                  Skip & Come Back Later
                </Button>
              )}
            </div>

            <div className="flex items-center gap-2">
              {!isCompleteStep && currentStepData?.fields && (
                <Button variant="outline" onClick={handleSkip} disabled={isProcessing}>
                  Skip This Step
                </Button>
              )}
              <Button onClick={handleNext} disabled={isProcessing} className="min-w-[120px]">
                {isProcessing ? (
                  "Processing..."
                ) : isLastStep ? (
                  "Complete Setup"
                ) : (
                  <>
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

"use client"

import { Code, Zap, Database, Cloud, GitBranch, Terminal, Layers, Workflow } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function ModBuilderPage() {
  const architecture = [
    {
      title: "Frontend Layer",
      icon: Layers,
      color: "from-blue-500 to-cyan-500",
      description: "APEX Dashboard UI where users connect functionalities",
      components: [
        "MOD selection interface",
        "Connector management",
        "Visual configuration tools",
        "Real-time status monitoring",
      ],
    },
    {
      title: "XAI Processing Layer",
      icon: Zap,
      color: "from-purple-500 to-pink-500",
      description: "AI system that interprets requests and generates code",
      components: [
        "Natural language processing",
        "Dynamic code generation",
        "Integration mapping",
        "Dependency resolution",
      ],
    },
    {
      title: "Backend Builder",
      icon: Code,
      color: "from-green-500 to-emerald-500",
      description: "Generates terminal commands and API integrations",
      components: [
        "Google Cloud CLI commands",
        "API endpoint configuration",
        "Environment setup scripts",
        "Deployment automation",
      ],
    },
    {
      title: "Integration Bridge",
      icon: GitBranch,
      color: "from-orange-500 to-red-500",
      description: "Connects user selections to working code",
      components: [
        "API authentication flow",
        "Service connection logic",
        "Data transformation",
        "Error handling & validation",
      ],
    },
  ]

  const workflow = [
    {
      step: 1,
      title: "User Selection",
      description: "User selects MODS and Connectors they want to use together",
      icon: Layers,
    },
    {
      step: 2,
      title: "AI Analysis",
      description: "APEX XAI analyzes the request and determines required integrations",
      icon: Zap,
    },
    {
      step: 3,
      title: "Code Generation",
      description: "Backend builder generates terminal commands and integration code",
      icon: Code,
    },
    {
      step: 4,
      title: "CLI Execution",
      description: "Google Cloud CLI executes commands to deploy and configure services",
      icon: Terminal,
    },
    {
      step: 5,
      title: "Bridge Creation",
      description: "Integration bridge connects all services and validates functionality",
      icon: GitBranch,
    },
    {
      step: 6,
      title: "Live Deployment",
      description: "User's custom solution is deployed and ready to use",
      icon: Cloud,
    },
  ]

  return (
    <div className="min-h-screen bg-background dark">
      <main className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
              <Workflow className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-foreground">MOD Builder Architecture</h1>
              <p className="text-muted-foreground">How APEX Transforms Concepts into Working Code</p>
            </div>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl">
            The MOD Builder is the backend system that physically creates terminal commands and connects frontend MODS
            to actual Google Cloud Run services and APIs. This contained environment allows users to piggyback on
            pre-existing functionality by simply connecting the features they want.
          </p>
        </div>

        {/* Architecture Layers */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">System Architecture</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {architecture.map((layer, index) => {
              const IconComponent = layer.icon
              return (
                <div key={index} className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-br ${layer.color} flex items-center justify-center flex-shrink-0`}
                    >
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-1">{layer.title}</h3>
                      <p className="text-sm text-muted-foreground">{layer.description}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {layer.components.map((component, componentIndex) => (
                      <div key={componentIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-foreground/30" />
                        {component}
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Workflow */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Build Workflow</h2>
          <div className="space-y-4">
            {workflow.map((item, index) => {
              const IconComponent = item.icon
              return (
                <div key={index} className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                        {item.step}
                      </div>
                      {index < workflow.length - 1 && <div className="w-0.5 h-12 bg-border" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <IconComponent className="w-5 h-5 text-primary" />
                        <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                      </div>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Contained Environment */}
        <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">Contained Environment</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              The MOD Builder operates in a secure, contained environment where all integrations are pre-configured and
              tested. Users don't need to worry about API keys, authentication flows, or deployment configurations -
              APEX handles everything automatically.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-background/50 rounded-lg p-4 border border-border">
                <Database className="w-8 h-8 text-blue-500 mb-3" />
                <h3 className="font-semibold text-foreground mb-2">Shared API Connections</h3>
                <p className="text-sm text-muted-foreground">
                  All applications share the same Git repository and API connections for seamless communication
                </p>
              </div>
              <div className="bg-background/50 rounded-lg p-4 border border-border">
                <Terminal className="w-8 h-8 text-green-500 mb-3" />
                <h3 className="font-semibold text-foreground mb-2">Google CLI Integration</h3>
                <p className="text-sm text-muted-foreground">
                  Direct communication with Google Cloud CLI for strategic MOD building and deployment
                </p>
              </div>
              <div className="bg-background/50 rounded-lg p-4 border border-border">
                <GitBranch className="w-8 h-8 text-purple-500 mb-3" />
                <h3 className="font-semibold text-foreground mb-2">Pre-existing Functionality</h3>
                <p className="text-sm text-muted-foreground">
                  Users piggyback on already-created functionality, just connecting what they need
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Integration Example */}
        <div className="bg-card border border-border rounded-xl p-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">From Concept to Code</h2>
          <p className="text-muted-foreground mb-6">
            APEX AI bridges the gap between user concepts and real working code. Here's how it works:
          </p>
          <div className="space-y-4">
            <div className="bg-background rounded-lg p-4 border border-border">
              <Badge variant="secondary" className="mb-2">
                User Request
              </Badge>
              <p className="text-sm text-foreground">
                "I want a SaaS app with user authentication and subscription payments"
              </p>
            </div>
            <div className="flex justify-center">
              <Zap className="w-6 h-6 text-yellow-500" />
            </div>
            <div className="bg-background rounded-lg p-4 border border-border">
              <Badge variant="secondary" className="mb-2">
                APEX Analysis
              </Badge>
              <p className="text-sm text-foreground mb-2">Required integrations identified:</p>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>• Firebase Authentication (email/password + OAuth)</li>
                <li>• Stripe Payments (subscription management)</li>
                <li>• Google Cloud Run (backend hosting)</li>
                <li>• Firebase Hosting (frontend deployment)</li>
              </ul>
            </div>
            <div className="flex justify-center">
              <Code className="w-6 h-6 text-blue-500" />
            </div>
            <div className="bg-background rounded-lg p-4 border border-border">
              <Badge variant="secondary" className="mb-2">
                Generated Output
              </Badge>
              <p className="text-sm text-muted-foreground mb-2">Fully deployed application with:</p>
              <ul className="text-sm text-foreground space-y-1 ml-4">
                <li>✓ Working authentication system</li>
                <li>✓ Stripe checkout integration</li>
                <li>✓ User dashboard</li>
                <li>✓ Subscription management</li>
                <li>✓ Live production URL</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

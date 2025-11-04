"use client"

import { Check, Cloud, Zap, Code, Terminal, Rocket, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function SaaSModPage() {
  const googleServices = [
    {
      name: "Firebase Authentication",
      url: "https://firebase.google.com/docs/auth/web/start",
      description: "Email/password, OAuth, and social login",
      endpoints: [
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp",
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword",
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode",
        "https://identitytoolkit.googleapis.com/v1/accounts:resetPassword",
      ],
    },
    {
      name: "Firebase Hosting",
      url: "https://firebase.google.com/docs/hosting",
      description: "Fast and secure web hosting",
      endpoints: [
        "https://firebasehosting.googleapis.com/v1beta1/sites",
        "https://firebasehosting.googleapis.com/v1beta1/sites/{site}/versions",
        "https://firebasehosting.googleapis.com/v1beta1/sites/{site}/releases",
      ],
    },
    {
      name: "Google Cloud Run",
      url: "https://cloud.google.com/run/docs/reference/rest",
      description: "Serverless container deployment",
      endpoints: [
        "https://run.googleapis.com/v2/projects/{project}/locations/{location}/services",
        "https://run.googleapis.com/v2/projects/{project}/locations/{location}/services/{service}",
        "https://run.googleapis.com/v2/projects/{project}/locations/{location}/jobs",
      ],
    },
    {
      name: "Google Workspace Admin",
      url: "https://developers.google.com/admin-sdk/directory/reference/rest",
      description: "User and organization management",
      endpoints: [
        "https://admin.googleapis.com/admin/directory/v1/users",
        "https://admin.googleapis.com/admin/directory/v1/groups",
        "https://admin.googleapis.com/admin/directory/v1/customer/{customerId}",
      ],
    },
    {
      name: "Google Drive API",
      url: "https://developers.google.com/drive/api/reference/rest/v3",
      description: "File storage and management",
      endpoints: [
        "https://www.googleapis.com/drive/v3/files",
        "https://www.googleapis.com/drive/v3/files/{fileId}",
        "https://www.googleapis.com/drive/v3/files/{fileId}/permissions",
      ],
    },
    {
      name: "Google Sheets API",
      url: "https://developers.google.com/sheets/api/reference/rest",
      description: "Spreadsheet data management",
      endpoints: [
        "https://sheets.googleapis.com/v4/spreadsheets",
        "https://sheets.googleapis.com/v4/spreadsheets/{spreadsheetId}/values/{range}",
        "https://sheets.googleapis.com/v4/spreadsheets/{spreadsheetId}:batchUpdate",
      ],
    },
    {
      name: "Google Calendar API",
      url: "https://developers.google.com/calendar/api/v3/reference",
      description: "Calendar and event management",
      endpoints: [
        "https://www.googleapis.com/calendar/v3/calendars",
        "https://www.googleapis.com/calendar/v3/calendars/{calendarId}/events",
        "https://www.googleapis.com/calendar/v3/users/me/calendarList",
      ],
    },
    {
      name: "Google Cloud Storage",
      url: "https://cloud.google.com/storage/docs/json_api",
      description: "Object storage for any amount of data",
      endpoints: [
        "https://storage.googleapis.com/storage/v1/b",
        "https://storage.googleapis.com/storage/v1/b/{bucket}/o",
        "https://storage.googleapis.com/upload/storage/v1/b/{bucket}/o",
      ],
    },
  ]

  const stripeEndpoints = [
    {
      name: "Stripe Payments API",
      url: "https://stripe.com/docs/api",
      description: "Payment processing and subscription management",
      endpoints: [
        "https://api.stripe.com/v1/payment_intents",
        "https://api.stripe.com/v1/customers",
        "https://api.stripe.com/v1/subscriptions",
        "https://api.stripe.com/v1/products",
        "https://api.stripe.com/v1/prices",
        "https://api.stripe.com/v1/checkout/sessions",
      ],
    },
  ]

  const capabilities = [
    "Deploy full-stack applications with zero code",
    "Automatic Firebase Authentication setup with multiple providers",
    "Serverless backend deployment via Google Cloud Run",
    "Stripe payment and subscription integration",
    "Google Workspace API access for business tools",
    "Automated CI/CD pipeline configuration",
    "Environment variable management",
    "Custom domain setup and SSL certificates",
    "Database integration (Firestore/Cloud SQL)",
    "Real-time monitoring and logging",
  ]

  return (
    <div className="min-h-screen bg-background dark">
      <main className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Cloud className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-foreground">SaaS MOD</h1>
              <p className="text-muted-foreground">The First Fully Operational APEX MOD</p>
            </div>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Deploy complete SaaS applications with Firebase Authentication, Google Cloud Run hosting, Stripe payments,
            and Google Workspace integration - all through simple natural language commands. No code required.
          </p>
        </div>

        {/* How It Works */}
        <div className="mb-12 bg-card border border-border rounded-xl p-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Zap className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="font-semibold text-foreground">1. Connect Services</h3>
              <p className="text-sm text-muted-foreground">
                Simply tell APEX what you want to build. The AI automatically connects Firebase, Google Cloud, and
                Stripe.
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <Code className="w-6 h-6 text-purple-500" />
              </div>
              <h3 className="font-semibold text-foreground">2. AI Generates Code</h3>
              <p className="text-sm text-muted-foreground">
                APEX's XAI system dynamically generates all necessary code, configurations, and deployment scripts.
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                <Rocket className="w-6 h-6 text-green-500" />
              </div>
              <h3 className="font-semibold text-foreground">3. Deploy Instantly</h3>
              <p className="text-sm text-muted-foreground">
                APEX communicates with Google Cloud CLI to deploy everything. Your app goes live in minutes.
              </p>
            </div>
          </div>
        </div>

        {/* Capabilities */}
        <div className="mb-12 bg-card border border-border rounded-xl p-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">APEX Capabilities Unlocked</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {capabilities.map((capability, index) => (
              <div key={index} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">{capability}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Google Services */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Google Services Integration</h2>
            <Badge variant="secondary" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
              {googleServices.length} Services
            </Badge>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {googleServices.map((service, index) => (
              <div key={index} className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">{service.name}</h3>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <a href={service.url} target="_blank" rel="noopener noreferrer">
                      Docs
                    </a>
                  </Button>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-foreground">API Endpoints:</p>
                  {service.endpoints.map((endpoint, endpointIndex) => (
                    <code
                      key={endpointIndex}
                      className="block text-xs bg-background px-3 py-2 rounded border border-border text-muted-foreground font-mono overflow-x-auto"
                    >
                      {endpoint}
                    </code>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stripe Integration */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Stripe Payment Integration</h2>
            <Badge variant="secondary" className="bg-purple-500/10 text-purple-500 border-purple-500/20">
              Payment Processing
            </Badge>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {stripeEndpoints.map((service, index) => (
              <div key={index} className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">{service.name}</h3>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <a href={service.url} target="_blank" rel="noopener noreferrer">
                      Docs
                    </a>
                  </Button>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-foreground">API Endpoints:</p>
                  {service.endpoints.map((endpoint, endpointIndex) => (
                    <code
                      key={endpointIndex}
                      className="block text-xs bg-background px-3 py-2 rounded border border-border text-muted-foreground font-mono overflow-x-auto"
                    >
                      {endpoint}
                    </code>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Code-Free Experience */}
        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-8 mb-12">
          <div className="flex items-start gap-4">
            <Terminal className="w-8 h-8 text-purple-500 flex-shrink-0" />
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-3">Completely Code-Free Experience</h2>
              <p className="text-muted-foreground mb-4">
                APEX uses its XAI system to generate dynamic code in real-time. The AI communicates directly with Google
                Cloud CLI to handle all deployment, configuration, and integration tasks. You simply describe what you
                want in plain language, and APEX handles everything else.
              </p>
              <div className="bg-background/50 rounded-lg p-4 border border-border">
                <p className="text-sm text-muted-foreground mb-2">Example command:</p>
                <code className="text-sm text-foreground">
                  "Create a SaaS app with user authentication, subscription payments, and a dashboard"
                </code>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button size="lg" asChild className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90">
            <Link href="/mods">
              <Download className="w-5 h-5 mr-2" />
              Install SaaS MOD
            </Link>
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            Once installed, these capabilities become part of APEX's core functionality
          </p>
        </div>
      </main>
    </div>
  )
}

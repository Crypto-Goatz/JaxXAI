import type { Metadata } from "next"
import { Brain, MessageSquare, Zap, Shield, Sparkles, Code } from "lucide-react"

export const metadata: Metadata = {
  title: "AI Assistant - APEX Core Features | Natural Language Business Control",
  description:
    "Control your entire business with plain language commands. APEX's XAI-powered assistant understands context, generates dynamic code, and executes complex operations instantly.",
  keywords: "AI assistant, XAI, natural language processing, business automation, no-code platform",
}

export default function AIAssistantPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 mb-6">
            <Brain className="w-10 h-10 text-blue-400" />
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-4 text-balance">Your AI-Powered Business Assistant</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Control your entire business with simple conversations. APEX's XAI system understands your intent and
            generates the exact code needed to execute any command.
          </p>
        </div>

        {/* Key Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-card border border-border rounded-xl p-8 hover:border-blue-500/50 transition-colors">
            <MessageSquare className="w-12 h-12 text-blue-400 mb-4" />
            <h3 className="text-2xl font-semibold text-foreground mb-3">Natural Language Control</h3>
            <p className="text-muted-foreground leading-relaxed">
              Simply tell APEX what you want in plain English. No technical knowledge required. Ask to "send a follow-up
              email to all leads from last week" or "create a sales report for Q4" and watch it happen instantly.
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-8 hover:border-purple-500/50 transition-colors">
            <Code className="w-12 h-12 text-purple-400 mb-4" />
            <h3 className="text-2xl font-semibold text-foreground mb-3">Dynamic Code Generation</h3>
            <p className="text-muted-foreground leading-relaxed">
              APEX's XAI system generates custom code in real-time for every request. The code adapts to your specific
              needs, integrations, and business logic, making APEX capable of handling any scenario you can imagine.
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-8 hover:border-green-500/50 transition-colors">
            <Sparkles className="w-12 h-12 text-green-400 mb-4" />
            <h3 className="text-2xl font-semibold text-foreground mb-3">Context-Aware Intelligence</h3>
            <p className="text-muted-foreground leading-relaxed">
              APEX remembers your business context, previous conversations, and preferences. It understands follow-up
              questions, references past actions, and learns from your patterns to provide increasingly personalized
              assistance.
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-8 hover:border-orange-500/50 transition-colors">
            <Zap className="w-12 h-12 text-orange-400 mb-4" />
            <h3 className="text-2xl font-semibold text-foreground mb-3">Instant Execution</h3>
            <p className="text-muted-foreground leading-relaxed">
              From simple tasks to complex multi-step workflows, APEX executes your commands instantly. Whether it's
              updating 1,000 customer records or orchestrating a multi-channel marketing campaign, it happens in
              seconds.
            </p>
          </div>
        </div>

        {/* Capabilities Section */}
        <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-12 mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">What Can You Do?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold text-foreground mb-3">Data Operations</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Query and analyze data</li>
                <li>• Update records in bulk</li>
                <li>• Generate reports</li>
                <li>• Export to any format</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">Communication</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Send emails and messages</li>
                <li>• Schedule meetings</li>
                <li>• Create notifications</li>
                <li>• Post to social media</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">Automation</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Build workflows</li>
                <li>• Set up triggers</li>
                <li>• Create schedules</li>
                <li>• Chain actions</li>
              </ul>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">How It Works</h2>
          <div className="space-y-6">
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold">
                1
              </div>
              <div>
                <h4 className="text-xl font-semibold text-foreground mb-2">You Speak Naturally</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Type or speak your request in plain language. No special syntax, no commands to memorize. Just tell
                  APEX what you need like you're talking to a colleague.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold">
                2
              </div>
              <div>
                <h4 className="text-xl font-semibold text-foreground mb-2">XAI Understands Intent</h4>
                <p className="text-muted-foreground leading-relaxed">
                  APEX's XAI system analyzes your request, understands the context, identifies the required actions, and
                  determines which MODS and integrations are needed to fulfill your request.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 font-bold">
                3
              </div>
              <div>
                <h4 className="text-xl font-semibold text-foreground mb-2">Dynamic Code Generation</h4>
                <p className="text-muted-foreground leading-relaxed">
                  APEX generates the exact code needed to execute your request. This isn't pre-written code - it's
                  dynamically created based on your specific situation, available MODS, and business logic.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 font-bold">
                4
              </div>
              <div>
                <h4 className="text-xl font-semibold text-foreground mb-2">Instant Execution</h4>
                <p className="text-muted-foreground leading-relaxed">
                  The generated code executes immediately, performing all necessary actions across your connected
                  systems. You get real-time feedback and results, with the ability to refine or adjust as needed.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Security Note */}
        <div className="bg-card border border-border rounded-xl p-8 flex gap-6 items-start">
          <Shield className="w-12 h-12 text-green-400 flex-shrink-0" />
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Secure & Controlled</h3>
            <p className="text-muted-foreground leading-relaxed">
              APEX operates within your defined permissions and access levels. The AI assistant can only perform actions
              you've authorized through your connected MODS and integrations. Your data stays secure, and you maintain
              complete control over what APEX can access and modify.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

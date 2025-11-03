import type { Metadata } from "next"
import { Workflow, Clock, Repeat, GitBranch, Zap, Settings } from "lucide-react"

export const metadata: Metadata = {
  title: "Automation - APEX Core Features | Intelligent Workflow Automation",
  description:
    "Build complex workflows with simple commands. APEX's XAI system creates dynamic automation that adapts to your business needs in real-time.",
  keywords: "workflow automation, business automation, XAI automation, no-code workflows, intelligent automation",
}

export default function AutomationPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 mb-6">
            <Workflow className="w-10 h-10 text-purple-400" />
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-4 text-balance">Intelligent Workflow Automation</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Create sophisticated automation with plain language. APEX's XAI system builds dynamic workflows that adapt
            to your business in real-time.
          </p>
        </div>

        {/* Key Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-card border border-border rounded-xl p-8 hover:border-purple-500/50 transition-colors">
            <Zap className="w-12 h-12 text-purple-400 mb-4" />
            <h3 className="text-2xl font-semibold text-foreground mb-3">Instant Workflow Creation</h3>
            <p className="text-muted-foreground leading-relaxed">
              Simply describe your workflow in plain language: "When a new lead comes in, send a welcome email, add them
              to the CRM, and notify the sales team." APEX generates and deploys the automation instantly.
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-8 hover:border-pink-500/50 transition-colors">
            <GitBranch className="w-12 h-12 text-pink-400 mb-4" />
            <h3 className="text-2xl font-semibold text-foreground mb-3">Complex Logic Made Simple</h3>
            <p className="text-muted-foreground leading-relaxed">
              Build workflows with conditional logic, branching paths, and multi-step processes. APEX handles the
              complexity while you focus on describing what should happen, not how to code it.
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-8 hover:border-blue-500/50 transition-colors">
            <Clock className="w-12 h-12 text-blue-400 mb-4" />
            <h3 className="text-2xl font-semibold text-foreground mb-3">Smart Scheduling</h3>
            <p className="text-muted-foreground leading-relaxed">
              Set up time-based automation that runs on your schedule. Daily reports, weekly summaries, monthly invoices
              - APEX handles it all automatically, adjusting for holidays and business hours.
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-8 hover:border-green-500/50 transition-colors">
            <Repeat className="w-12 h-12 text-green-400 mb-4" />
            <h3 className="text-2xl font-semibold text-foreground mb-3">Dynamic Adaptation</h3>
            <p className="text-muted-foreground leading-relaxed">
              APEX workflows aren't static. They adapt based on your data, business rules, and changing conditions. The
              XAI system regenerates workflow logic in real-time to handle new scenarios automatically.
            </p>
          </div>
        </div>

        {/* Automation Types */}
        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-12 mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Automation Capabilities</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold text-foreground mb-4 text-lg">Trigger-Based</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• New customer signup</li>
                <li>• Form submission</li>
                <li>• Payment received</li>
                <li>• Status change</li>
                <li>• Threshold reached</li>
                <li>• Email received</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4 text-lg">Time-Based</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Daily summaries</li>
                <li>• Weekly reports</li>
                <li>• Monthly invoices</li>
                <li>• Quarterly reviews</li>
                <li>• Scheduled campaigns</li>
                <li>• Recurring tasks</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4 text-lg">Conditional</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• If/then logic</li>
                <li>• Multi-path workflows</li>
                <li>• Data-driven decisions</li>
                <li>• Priority routing</li>
                <li>• Exception handling</li>
                <li>• Approval workflows</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Real-World Examples */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Real-World Examples</h2>
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-xl p-6">
              <h4 className="text-lg font-semibold text-foreground mb-2">Lead Nurturing Campaign</h4>
              <p className="text-muted-foreground text-sm mb-3">
                "When a new lead downloads our whitepaper, send them a welcome email, wait 2 days, then send a follow-up
                with case studies. If they click the link, notify sales. If not, add them to the monthly newsletter."
              </p>
              <div className="flex gap-2 flex-wrap">
                <span className="text-xs px-3 py-1 rounded-full bg-purple-500/20 text-purple-400">Email</span>
                <span className="text-xs px-3 py-1 rounded-full bg-blue-500/20 text-blue-400">CRM</span>
                <span className="text-xs px-3 py-1 rounded-full bg-green-500/20 text-green-400">Notifications</span>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h4 className="text-lg font-semibold text-foreground mb-2">Customer Onboarding</h4>
              <p className="text-muted-foreground text-sm mb-3">
                "When a customer signs up, create their account, send welcome email with login details, schedule a setup
                call, add them to the onboarding sequence, and create a task for the success team to reach out within 24
                hours."
              </p>
              <div className="flex gap-2 flex-wrap">
                <span className="text-xs px-3 py-1 rounded-full bg-pink-500/20 text-pink-400">User Management</span>
                <span className="text-xs px-3 py-1 rounded-full bg-purple-500/20 text-purple-400">Email</span>
                <span className="text-xs px-3 py-1 rounded-full bg-blue-500/20 text-blue-400">Calendar</span>
                <span className="text-xs px-3 py-1 rounded-full bg-green-500/20 text-green-400">Tasks</span>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h4 className="text-lg font-semibold text-foreground mb-2">Invoice Management</h4>
              <p className="text-muted-foreground text-sm mb-3">
                "On the 1st of each month, generate invoices for all active clients, send them via email, log them in
                the accounting system, and set a reminder to follow up on unpaid invoices after 7 days."
              </p>
              <div className="flex gap-2 flex-wrap">
                <span className="text-xs px-3 py-1 rounded-full bg-orange-500/20 text-orange-400">Billing</span>
                <span className="text-xs px-3 py-1 rounded-full bg-purple-500/20 text-purple-400">Email</span>
                <span className="text-xs px-3 py-1 rounded-full bg-blue-500/20 text-blue-400">Accounting</span>
                <span className="text-xs px-3 py-1 rounded-full bg-green-500/20 text-green-400">Reminders</span>
              </div>
            </div>
          </div>
        </div>

        {/* How XAI Powers Automation */}
        <div className="bg-card border border-border rounded-xl p-8">
          <div className="flex gap-6 items-start">
            <Settings className="w-12 h-12 text-purple-400 flex-shrink-0" />
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-4">How XAI Powers Your Automation</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Traditional automation tools require you to manually configure every step, connection, and condition.
                APEX is different. When you describe a workflow, the XAI system:
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-purple-400 flex-shrink-0">•</span>
                  <span>Analyzes your request to understand the desired outcome and all necessary steps</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-purple-400 flex-shrink-0">•</span>
                  <span>Identifies which MODS and integrations are needed to accomplish each step</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-purple-400 flex-shrink-0">•</span>
                  <span>
                    Generates the exact code to orchestrate all actions, including error handling and edge cases
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-purple-400 flex-shrink-0">•</span>
                  <span>Deploys the workflow instantly and monitors its execution in real-time</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-purple-400 flex-shrink-0">•</span>
                  <span>Adapts the workflow dynamically if conditions change or new scenarios arise</span>
                </li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                This means you can create automation as complex as you need without ever writing code or configuring
                complicated integrations. As long as you have the right MODS installed, APEX has the answer.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

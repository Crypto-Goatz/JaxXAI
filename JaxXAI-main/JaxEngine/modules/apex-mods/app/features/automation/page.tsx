import type { Metadata } from "next"
import { Workflow, Zap, GitBranch, Clock, Target, Repeat, CheckCircle, TrendingUp, Settings } from "lucide-react"

export const metadata: Metadata = {
  title: "Workflow Automation - Intelligent Business Process Automation | APEX",
  description:
    "Automate your entire business with APEX's intelligent workflow engine. Create complex automations using plain language—no coding required. Save time, reduce errors, and scale effortlessly.",
  keywords:
    "workflow automation, business process automation, no-code automation, intelligent workflows, task automation",
}

export default function AutomationPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="border-b border-border bg-gradient-to-b from-card to-background">
        <div className="max-w-7xl mx-auto px-8 py-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
              <Workflow className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-5xl font-bold text-foreground">Workflow Automation</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
            Automate every aspect of your business with intelligent workflows that adapt and optimize themselves. Create
            complex automations using plain language—no technical skills required.
          </p>
        </div>
      </section>

      {/* Core Capabilities */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-8 py-16">
          <h2 className="text-3xl font-bold text-foreground mb-12">Automation Capabilities</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors">
              <Zap className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-3">Trigger-Based Actions</h3>
              <p className="text-muted-foreground leading-relaxed">
                Set up automations that respond to any event in your business. From customer actions to time-based
                triggers, APEX handles it all automatically.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Event-driven workflows (form submissions, purchases, etc.)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Time-based scheduling (daily, weekly, monthly tasks)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Conditional logic for complex decision trees</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors">
              <GitBranch className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-3">Multi-Step Workflows</h3>
              <p className="text-muted-foreground leading-relaxed">
                Build sophisticated workflows with multiple steps, branches, and conditions. APEX orchestrates complex
                processes seamlessly across all your tools.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Sequential and parallel task execution</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Conditional branching based on data or outcomes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Error handling and retry logic built-in</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors">
              <Repeat className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-3">Self-Optimizing Workflows</h3>
              <p className="text-muted-foreground leading-relaxed">
                APEX continuously monitors and optimizes your workflows. Identify bottlenecks, suggest improvements, and
                automatically adjust for maximum efficiency.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Performance analytics and bottleneck detection</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Automatic optimization suggestions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>A/B testing for workflow variations</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Automation Examples */}
      <section className="border-b border-border bg-card/30">
        <div className="max-w-7xl mx-auto px-8 py-16">
          <h2 className="text-3xl font-bold text-foreground mb-12">Automation Examples</h2>
          <div className="space-y-8">
            <div className="p-6 rounded-xl border border-border bg-card">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Lead Nurturing Campaign</h3>
                  <p className="text-sm text-muted-foreground">
                    Automatically engage and convert leads through personalized multi-touch campaigns
                  </p>
                </div>
              </div>
              <div className="pl-14 space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Trigger:</span> New lead enters CRM from website form
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Action 1:</span> Send personalized welcome email with
                    relevant resources
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Action 2:</span> Wait 2 days, then send case study
                    matching their industry
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Action 3:</span> If email opened, assign to sales rep
                    and schedule follow-up call
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Action 4:</span> If no response after 5 days, add to
                    retargeting ad campaign
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Customer Onboarding</h3>
                  <p className="text-sm text-muted-foreground">
                    Deliver a seamless onboarding experience that drives activation and retention
                  </p>
                </div>
              </div>
              <div className="pl-14 space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Trigger:</span> Customer completes signup and payment
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Action 1:</span> Create customer account in all
                    connected systems
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Action 2:</span> Send welcome email with getting
                    started guide and video tutorials
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Action 3:</span> Schedule onboarding call with success
                    manager
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Action 4:</span> Monitor usage and send tips based on
                    features they haven't tried
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Action 5:</span> After 30 days, send satisfaction
                    survey and request testimonial
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                  <Settings className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Support Ticket Management</h3>
                  <p className="text-sm text-muted-foreground">
                    Automatically triage, route, and resolve customer support requests
                  </p>
                </div>
              </div>
              <div className="pl-14 space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Trigger:</span> New support ticket created via email,
                    chat, or form
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Action 1:</span> Analyze ticket content and categorize
                    by type and urgency
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Action 2:</span> Check knowledge base for existing
                    solutions and auto-respond if found
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Action 3:</span> Route to appropriate team member
                    based on expertise and workload
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Action 4:</span> Send acknowledgment to customer with
                    estimated response time
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Action 5:</span> Escalate to manager if not resolved
                    within SLA timeframe
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-8 py-16">
          <h2 className="text-3xl font-bold text-foreground mb-12">Why Automate with APEX?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Save 20+ Hours Per Week</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Eliminate repetitive tasks and manual data entry. APEX customers report saving an average of 20-30
                    hours per week on routine business operations.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                    <CheckCircle className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">99.9% Accuracy</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Eliminate human error from your processes. Automated workflows execute perfectly every time,
                    ensuring consistency and reliability across your operations.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Scale Without Limits</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Handle 10x the workload without hiring additional staff. APEX automations scale instantly to meet
                    demand, whether you're processing 10 or 10,000 transactions.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Instant Response Times</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Respond to customers, process orders, and handle requests in seconds instead of hours. Automated
                    workflows execute immediately when triggered.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                    <GitBranch className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Cross-Platform Integration</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Connect all your tools and systems seamlessly. APEX workflows work across 50+ platforms, eliminating
                    data silos and manual transfers.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                    <Settings className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">No-Code Setup</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Create complex automations using plain language. No programming knowledge required—just describe
                    what you want, and APEX builds it for you.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-b from-background to-card">
        <div className="max-w-7xl mx-auto px-8 py-20 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">Start Automating Today</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of businesses saving time and scaling effortlessly with APEX automation.
          </p>
          <div className="flex gap-4 justify-center">
            <button className="px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors">
              Start Free Trial
            </button>
            <button className="px-8 py-3 rounded-lg border border-border bg-card text-foreground font-semibold hover:bg-accent transition-colors">
              View Automation Templates
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

import type { Metadata } from "next"
import { Mail, Users, Zap, BarChart3, Clock, Sparkles } from "lucide-react"

export const metadata: Metadata = {
  title: "Email Marketing - APEX Marketing | AI-Powered Email Campaigns",
  description:
    "Create, send, and optimize email campaigns with simple commands. APEX's XAI system handles everything from content creation to delivery optimization.",
  keywords: "email marketing, automated emails, email campaigns, AI email marketing, marketing automation",
}

export default function EmailMarketingPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-8 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 mb-6">
            <Mail className="w-10 h-10 text-blue-400" />
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-4 text-balance">AI-Powered Email Marketing</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Create and send sophisticated email campaigns with simple commands. APEX handles everything from content
            creation to delivery optimization.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-card border border-border rounded-xl p-8 hover:border-blue-500/50 transition-colors">
            <Sparkles className="w-12 h-12 text-blue-400 mb-4" />
            <h3 className="text-2xl font-semibold text-foreground mb-3">Instant Campaign Creation</h3>
            <p className="text-muted-foreground leading-relaxed">
              Simply tell APEX what you want: "Send a promotional email about our new product to all customers who
              purchased in the last 30 days." APEX generates the content, designs the email, segments the audience, and
              sends it - all from one command.
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-8 hover:border-purple-500/50 transition-colors">
            <Users className="w-12 h-12 text-purple-400 mb-4" />
            <h3 className="text-2xl font-semibold text-foreground mb-3">Smart Segmentation</h3>
            <p className="text-muted-foreground leading-relaxed">
              APEX automatically segments your audience based on behavior, demographics, purchase history, and
              engagement. Create hyper-targeted campaigns without manually building complex filters or segments.
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-8 hover:border-green-500/50 transition-colors">
            <Zap className="w-12 h-12 text-green-400 mb-4" />
            <h3 className="text-2xl font-semibold text-foreground mb-3">Personalization at Scale</h3>
            <p className="text-muted-foreground leading-relaxed">
              Every email is dynamically personalized for each recipient. APEX pulls data from your connected systems to
              customize content, product recommendations, and messaging based on individual customer profiles.
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-8 hover:border-orange-500/50 transition-colors">
            <BarChart3 className="w-12 h-12 text-orange-400 mb-4" />
            <h3 className="text-2xl font-semibold text-foreground mb-3">Real-Time Optimization</h3>
            <p className="text-muted-foreground leading-relaxed">
              APEX monitors campaign performance in real-time and automatically optimizes send times, subject lines, and
              content. The XAI system learns from each campaign to improve future results.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-12 mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Campaign Types</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold text-foreground mb-4 text-lg">Promotional</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Product launches</li>
                <li>• Sales and discounts</li>
                <li>• Limited-time offers</li>
                <li>• Seasonal campaigns</li>
                <li>• Flash sales</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4 text-lg">Nurture</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Welcome series</li>
                <li>• Onboarding sequences</li>
                <li>• Educational content</li>
                <li>• Re-engagement</li>
                <li>• Lead nurturing</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4 text-lg">Transactional</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Order confirmations</li>
                <li>• Shipping updates</li>
                <li>• Password resets</li>
                <li>• Account notifications</li>
                <li>• Receipts</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Example Commands</h2>
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-xl p-6">
              <p className="text-foreground font-medium mb-2">
                "Send a welcome email to all new signups from this week"
              </p>
              <p className="text-sm text-muted-foreground">
                APEX creates a welcome email, pulls the list of new signups, personalizes each message, and sends them
                immediately.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <p className="text-foreground font-medium mb-2">
                "Create a 5-email nurture sequence for leads who downloaded the whitepaper"
              </p>
              <p className="text-sm text-muted-foreground">
                APEX generates a complete email series with relevant content, sets up the automation, and schedules
                delivery over the optimal timeframe.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <p className="text-foreground font-medium mb-2">
                "Send a re-engagement campaign to customers who haven't purchased in 90 days"
              </p>
              <p className="text-sm text-muted-foreground">
                APEX identifies inactive customers, creates personalized win-back offers, and sends targeted emails to
                bring them back.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-8">
          <div className="flex gap-6 items-start">
            <Clock className="w-12 h-12 text-blue-400 flex-shrink-0" />
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-4">How APEX Email Marketing Works</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Traditional email marketing requires multiple tools, manual list management, and hours of design work.
                APEX simplifies everything into natural language commands. When you request an email campaign:
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-blue-400">•</span>
                  <span>
                    APEX's XAI system analyzes your request and determines the campaign type, audience, and goals
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-400">•</span>
                  <span>Generates compelling email content tailored to your brand voice and campaign objectives</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-400">•</span>
                  <span>Creates responsive email designs that look great on all devices</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-400">•</span>
                  <span>Segments your audience based on the criteria you specify</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-400">•</span>
                  <span>Personalizes each email with recipient-specific data and recommendations</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-400">•</span>
                  <span>Optimizes send times for maximum engagement</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-400">•</span>
                  <span>Tracks performance and provides actionable insights</span>
                </li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                All of this happens automatically from a single command. APEX handles the complexity while you focus on
                strategy and results.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

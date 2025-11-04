import type { Metadata } from "next"
import { BarChart3, TrendingUp, PieChart, LineChart, Target, Sparkles } from "lucide-react"

export const metadata: Metadata = {
  title: "Analytics - APEX Core Features | AI-Powered Business Intelligence",
  description:
    "Get instant insights from your data with natural language queries. APEX's XAI system generates custom analytics and visualizations on demand.",
  keywords: "business analytics, AI analytics, data visualization, business intelligence, XAI insights",
}

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-green-500/20 to-blue-500/20 mb-6">
            <BarChart3 className="w-10 h-10 text-green-400" />
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-4 text-balance">AI-Powered Business Analytics</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Ask questions about your business in plain language and get instant insights. APEX's XAI system generates
            custom analytics and visualizations tailored to your needs.
          </p>
        </div>

        {/* Key Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-card border border-border rounded-xl p-8 hover:border-green-500/50 transition-colors">
            <TrendingUp className="w-12 h-12 text-green-400 mb-4" />
            <h3 className="text-2xl font-semibold text-foreground mb-3">Natural Language Queries</h3>
            <p className="text-muted-foreground leading-relaxed">
              Ask questions like "What were our top-selling products last month?" or "Show me customer retention by
              region." APEX understands your intent and generates the exact analysis you need.
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-8 hover:border-blue-500/50 transition-colors">
            <PieChart className="w-12 h-12 text-blue-400 mb-4" />
            <h3 className="text-2xl font-semibold text-foreground mb-3">Dynamic Visualizations</h3>
            <p className="text-muted-foreground leading-relaxed">
              APEX automatically creates the most appropriate charts and graphs for your data. Bar charts, line graphs,
              pie charts, heat maps - the XAI system chooses the best visualization for your specific query.
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-8 hover:border-purple-500/50 transition-colors">
            <LineChart className="w-12 h-12 text-purple-400 mb-4" />
            <h3 className="text-2xl font-semibold text-foreground mb-3">Real-Time Insights</h3>
            <p className="text-muted-foreground leading-relaxed">
              Get up-to-the-minute data from all your connected systems. APEX pulls live data from your MODS and
              integrations, ensuring your analytics always reflect the current state of your business.
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-8 hover:border-orange-500/50 transition-colors">
            <Target className="w-12 h-12 text-orange-400 mb-4" />
            <h3 className="text-2xl font-semibold text-foreground mb-3">Predictive Analytics</h3>
            <p className="text-muted-foreground leading-relaxed">
              APEX doesn't just show you what happened - it predicts what's coming. Ask about future trends, forecast
              revenue, or identify potential issues before they become problems.
            </p>
          </div>
        </div>

        {/* Analytics Capabilities */}
        <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-2xl p-12 mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">What You Can Analyze</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold text-foreground mb-4 text-lg">Sales & Revenue</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Revenue trends</li>
                <li>• Sales pipeline</li>
                <li>• Conversion rates</li>
                <li>• Deal velocity</li>
                <li>• Product performance</li>
                <li>• Sales team metrics</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4 text-lg">Marketing</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Campaign ROI</li>
                <li>• Lead generation</li>
                <li>• Channel performance</li>
                <li>• Engagement metrics</li>
                <li>• Attribution analysis</li>
                <li>• Content effectiveness</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4 text-lg">Customers</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Customer lifetime value</li>
                <li>• Churn analysis</li>
                <li>• Satisfaction scores</li>
                <li>• Segmentation</li>
                <li>• Behavior patterns</li>
                <li>• Support metrics</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Example Queries */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Example Queries</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-xl p-6">
              <p className="text-foreground font-medium mb-2">"Show me revenue by product for Q4"</p>
              <p className="text-sm text-muted-foreground">
                Generates a bar chart comparing revenue across all products for the fourth quarter, with drill-down
                capabilities.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <p className="text-foreground font-medium mb-2">"Which marketing channels have the best ROI?"</p>
              <p className="text-sm text-muted-foreground">
                Analyzes all marketing spend and conversions to rank channels by return on investment with detailed
                breakdowns.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <p className="text-foreground font-medium mb-2">"Compare this month's sales to last year"</p>
              <p className="text-sm text-muted-foreground">
                Creates a year-over-year comparison with trend lines, percentage changes, and insights into what's
                driving differences.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <p className="text-foreground font-medium mb-2">"Who are our most valuable customers?"</p>
              <p className="text-sm text-muted-foreground">
                Calculates customer lifetime value, purchase frequency, and engagement to identify your top customers
                with actionable insights.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <p className="text-foreground font-medium mb-2">"Predict next quarter's revenue"</p>
              <p className="text-sm text-muted-foreground">
                Uses historical data and current pipeline to forecast future revenue with confidence intervals and
                scenario analysis.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <p className="text-foreground font-medium mb-2">"Show me customer churn trends"</p>
              <p className="text-sm text-muted-foreground">
                Analyzes customer retention over time, identifies at-risk customers, and suggests interventions to
                reduce churn.
              </p>
            </div>
          </div>
        </div>

        {/* Advanced Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Advanced Capabilities</h2>
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-xl p-6 flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-2">Cross-System Analysis</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  APEX can combine data from multiple sources in a single analysis. Ask "Compare email campaign
                  performance to sales results" and APEX will pull data from your email platform, CRM, and payment
                  processor to create a unified view.
                </p>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <Target className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-2">Automated Insights</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  APEX proactively identifies trends, anomalies, and opportunities in your data. Get notifications when
                  something important changes, like a sudden spike in churn or an unexpected revenue increase.
                </p>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                <LineChart className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-2">Custom Dashboards</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Create personalized dashboards by simply describing what you want to track. "Build me a dashboard
                  showing daily sales, top products, and customer satisfaction" - APEX generates it instantly.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-card border border-border rounded-xl p-8">
          <h3 className="text-2xl font-semibold text-foreground mb-6">How APEX Analytics Works</h3>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              When you ask an analytics question, APEX's XAI system doesn't just run a pre-built query. Instead, it:
            </p>
            <ul className="space-y-3 ml-6">
              <li className="flex gap-3">
                <span className="text-green-400 flex-shrink-0">1.</span>
                <span>
                  <strong className="text-foreground">Understands your question</strong> - Parses your natural language
                  query to identify what data you need and what insights you're looking for
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-400 flex-shrink-0">2.</span>
                <span>
                  <strong className="text-foreground">Identifies data sources</strong> - Determines which MODS and
                  integrations contain the relevant data
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-400 flex-shrink-0">3.</span>
                <span>
                  <strong className="text-foreground">Generates custom code</strong> - Creates the exact queries,
                  calculations, and transformations needed for your specific analysis
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-400 flex-shrink-0">4.</span>
                <span>
                  <strong className="text-foreground">Chooses visualization</strong> - Selects the most effective way to
                  present the data based on what you're analyzing
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-400 flex-shrink-0">5.</span>
                <span>
                  <strong className="text-foreground">Provides insights</strong> - Highlights key findings, trends, and
                  actionable recommendations
                </span>
              </li>
            </ul>
            <p className="pt-4">
              This dynamic approach means APEX can answer virtually any analytics question, even ones you've never asked
              before. As long as you have access to the data through your MODS, APEX has the answer.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

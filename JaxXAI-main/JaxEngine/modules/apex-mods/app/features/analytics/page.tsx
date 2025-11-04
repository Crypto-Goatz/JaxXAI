import type { Metadata } from "next"
import { BarChart3, TrendingUp, PieChart, LineChart, Target, Zap, Brain, Eye, AlertCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Business Intelligence & Analytics - Real-Time Insights | APEX",
  description:
    "Transform data into actionable insights with APEX's AI-powered analytics. Real-time dashboards, predictive analytics, and natural language reporting for smarter business decisions.",
  keywords:
    "business intelligence, analytics, data visualization, predictive analytics, real-time reporting, business insights",
}

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="border-b border-border bg-gradient-to-b from-card to-background">
        <div className="max-w-7xl mx-auto px-8 py-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
              <BarChart3 className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-5xl font-bold text-foreground">Business Intelligence & Analytics</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
            Transform your data into actionable insights with AI-powered analytics. Get real-time visibility into every
            aspect of your business and make data-driven decisions with confidence.
          </p>
        </div>
      </section>

      {/* Core Capabilities */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-8 py-16">
          <h2 className="text-3xl font-bold text-foreground mb-12">Analytics Capabilities</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors">
              <Eye className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-3">Real-Time Dashboards</h3>
              <p className="text-muted-foreground leading-relaxed">
                Monitor your business in real-time with customizable dashboards that update instantly. See what's
                happening right now across all your operations.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Live data updates with sub-second latency</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Customizable widgets and layouts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Mobile-optimized for on-the-go monitoring</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors">
              <Brain className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-3">Predictive Analytics</h3>
              <p className="text-muted-foreground leading-relaxed">
                Leverage AI to forecast trends, predict outcomes, and identify opportunities before they happen. Stay
                ahead of the competition with predictive insights.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Revenue forecasting with 95%+ accuracy</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Customer churn prediction and prevention</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Demand forecasting for inventory optimization</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors">
              <Zap className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-3">Natural Language Queries</h3>
              <p className="text-muted-foreground leading-relaxed">
                Ask questions about your data in plain English. No SQL or technical knowledge required—just ask and get
                instant answers with visualizations.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>"Show me revenue by region for Q4"</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>"Which products have the highest margins?"</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>"Compare this month to last year"</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Analytics Features */}
      <section className="border-b border-border bg-card/30">
        <div className="max-w-7xl mx-auto px-8 py-16">
          <h2 className="text-3xl font-bold text-foreground mb-12">Comprehensive Analytics Suite</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 rounded-xl border border-border bg-card">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="w-8 h-8 text-primary" />
                <h3 className="text-xl font-semibold text-foreground">Sales & Revenue Analytics</h3>
              </div>
              <p className="text-muted-foreground mb-4 text-sm">
                Track every aspect of your sales performance with detailed metrics and insights.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">→</span>
                  <span>Revenue trends and growth rates</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">→</span>
                  <span>Sales pipeline velocity and conversion rates</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">→</span>
                  <span>Deal size analysis and win/loss tracking</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">→</span>
                  <span>Sales rep performance and quota attainment</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">→</span>
                  <span>Product and service revenue breakdown</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-8 h-8 text-primary" />
                <h3 className="text-xl font-semibold text-foreground">Marketing Performance</h3>
              </div>
              <p className="text-muted-foreground mb-4 text-sm">
                Measure the effectiveness of every marketing campaign and channel.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">→</span>
                  <span>Campaign ROI and attribution modeling</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">→</span>
                  <span>Channel performance comparison</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">→</span>
                  <span>Lead generation and conversion metrics</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">→</span>
                  <span>Customer acquisition cost (CAC) tracking</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">→</span>
                  <span>Content engagement and social media analytics</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <div className="flex items-center gap-3 mb-4">
                <PieChart className="w-8 h-8 text-primary" />
                <h3 className="text-xl font-semibold text-foreground">Customer Analytics</h3>
              </div>
              <p className="text-muted-foreground mb-4 text-sm">
                Understand your customers deeply with comprehensive behavioral and demographic insights.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">→</span>
                  <span>Customer lifetime value (CLV) analysis</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">→</span>
                  <span>Churn rate and retention metrics</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">→</span>
                  <span>Segmentation and cohort analysis</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">→</span>
                  <span>Purchase patterns and product affinity</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">→</span>
                  <span>Customer satisfaction and NPS tracking</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <div className="flex items-center gap-3 mb-4">
                <LineChart className="w-8 h-8 text-primary" />
                <h3 className="text-xl font-semibold text-foreground">Operational Metrics</h3>
              </div>
              <p className="text-muted-foreground mb-4 text-sm">
                Monitor operational efficiency and identify areas for improvement.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">→</span>
                  <span>Process efficiency and bottleneck identification</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">→</span>
                  <span>Resource utilization and capacity planning</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">→</span>
                  <span>Support ticket volume and resolution times</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">→</span>
                  <span>Team productivity and workload distribution</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">→</span>
                  <span>System performance and uptime monitoring</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Features */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-8 py-16">
          <h2 className="text-3xl font-bold text-foreground mb-12">Advanced Analytics Features</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                    <AlertCircle className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Anomaly Detection</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    AI automatically identifies unusual patterns and alerts you to potential issues or opportunities.
                    Catch problems before they become critical and capitalize on unexpected trends.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Goal Tracking</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Set business goals and track progress automatically. APEX monitors KPIs in real-time and alerts you
                    when you're off track or when milestones are achieved.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                    <BarChart3 className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Custom Reports</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Create unlimited custom reports using natural language. Schedule automated delivery to stakeholders
                    and export in any format (PDF, Excel, CSV, PowerPoint).
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Benchmarking</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Compare your performance against industry standards and competitors. Understand where you excel and
                    where there's room for improvement with contextual benchmarks.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                    <Brain className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">AI Insights</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Get proactive recommendations based on your data. APEX analyzes patterns and suggests actions to
                    improve performance, reduce costs, and increase revenue.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                    <PieChart className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Data Visualization</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Transform complex data into beautiful, interactive visualizations. Choose from dozens of chart types
                    or let APEX automatically select the best visualization for your data.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="border-b border-border bg-card/30">
        <div className="max-w-7xl mx-auto px-8 py-16">
          <h2 className="text-3xl font-bold text-foreground mb-12">Why Choose APEX Analytics?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="text-lg font-semibold text-foreground mb-2">Unified Data View</h3>
              <p className="text-muted-foreground text-sm">
                Connect all your data sources and see everything in one place. No more switching between tools or
                reconciling conflicting reports.
              </p>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="text-lg font-semibold text-foreground mb-2">Instant Insights</h3>
              <p className="text-muted-foreground text-sm">
                Get answers to your questions in seconds, not days. No waiting for analysts or IT—query your data
                instantly using plain language.
              </p>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="text-lg font-semibold text-foreground mb-2">Democratized Data</h3>
              <p className="text-muted-foreground text-sm">
                Empower everyone in your organization to make data-driven decisions. No technical skills required—if you
                can ask a question, you can analyze data.
              </p>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="text-lg font-semibold text-foreground mb-2">Predictive Power</h3>
              <p className="text-muted-foreground text-sm">
                Don't just understand what happened—predict what will happen. Make proactive decisions based on
                AI-powered forecasts and trend analysis.
              </p>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="text-lg font-semibold text-foreground mb-2">Always Current</h3>
              <p className="text-muted-foreground text-sm">
                Real-time data means real-time decisions. Never work with stale data or outdated reports again—see
                what's happening right now.
              </p>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="text-lg font-semibold text-foreground mb-2">Actionable Insights</h3>
              <p className="text-muted-foreground text-sm">
                APEX doesn't just show you data—it tells you what to do about it. Get specific, actionable
                recommendations to improve your business.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-b from-background to-card">
        <div className="max-w-7xl mx-auto px-8 py-20 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">Turn Data Into Your Competitive Advantage</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start making smarter, faster decisions with AI-powered analytics that anyone can use.
          </p>
          <div className="flex gap-4 justify-center">
            <button className="px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors">
              Start Analyzing Free
            </button>
            <button className="px-8 py-3 rounded-lg border border-border bg-card text-foreground font-semibold hover:bg-accent transition-colors">
              See Sample Dashboards
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

import type { Metadata } from "next"
import { Building2, TrendingUp, Users, Zap, Shield, Globe } from "lucide-react"

export const metadata: Metadata = {
  title: "XAI in Business - Enterprise AI Solutions | APEX",
  description:
    "Discover how XAI transforms business operations across departments. Learn implementation strategies, ROI metrics, and success stories from leading companies.",
  keywords:
    "XAI business, enterprise AI, business automation, AI transformation, digital transformation, business intelligence",
}

export default function BusinessPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="mb-16">
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-balance lg:text-6xl">
            XAI in{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Business</span>
          </h1>
          <p className="text-xl text-gray-400 text-pretty max-w-3xl leading-relaxed">
            Transform every aspect of your business with Explainable AI. From operations to customer experience, see how
            XAI drives measurable results.
          </p>
        </div>

        {/* Business Impact Overview */}
        <section className="mb-16">
          <h2 className="mb-8 text-3xl font-bold">Business Impact Across Departments</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border border-gray-800 bg-gradient-to-br from-blue-900/20 to-blue-900/5 p-6">
              <Building2 className="mb-4 h-10 w-10 text-blue-400" />
              <h3 className="mb-3 text-xl font-semibold">Operations</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• Automate routine tasks with 90% accuracy</li>
                <li>• Reduce operational costs by 35%</li>
                <li>• Improve process efficiency by 50%</li>
                <li>• Enable 24/7 operations without scaling headcount</li>
              </ul>
            </div>
            <div className="rounded-lg border border-gray-800 bg-gradient-to-br from-green-900/20 to-green-900/5 p-6">
              <TrendingUp className="mb-4 h-10 w-10 text-green-400" />
              <h3 className="mb-3 text-xl font-semibold">Sales</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• Increase close rates by 45%</li>
                <li>• Reduce sales cycle length by 30%</li>
                <li>• Improve lead quality scoring</li>
                <li>• Automate follow-ups and nurturing</li>
              </ul>
            </div>
            <div className="rounded-lg border border-gray-800 bg-gradient-to-br from-purple-900/20 to-purple-900/5 p-6">
              <Users className="mb-4 h-10 w-10 text-purple-400" />
              <h3 className="mb-3 text-xl font-semibold">Customer Success</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• Boost satisfaction scores by 40%</li>
                <li>• Reduce response time by 70%</li>
                <li>• Increase retention rates by 25%</li>
                <li>• Predict and prevent churn</li>
              </ul>
            </div>
            <div className="rounded-lg border border-gray-800 bg-gradient-to-br from-orange-900/20 to-orange-900/5 p-6">
              <Zap className="mb-4 h-10 w-10 text-orange-400" />
              <h3 className="mb-3 text-xl font-semibold">Marketing</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• Improve campaign ROI by 60%</li>
                <li>• Generate content 10x faster</li>
                <li>• Optimize ad spend automatically</li>
                <li>• Personalize at scale</li>
              </ul>
            </div>
            <div className="rounded-lg border border-gray-800 bg-gradient-to-br from-cyan-900/20 to-cyan-900/5 p-6">
              <Shield className="mb-4 h-10 w-10 text-cyan-400" />
              <h3 className="mb-3 text-xl font-semibold">Finance</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• Automate invoice processing</li>
                <li>• Detect fraud with 95% accuracy</li>
                <li>• Improve cash flow forecasting</li>
                <li>• Ensure regulatory compliance</li>
              </ul>
            </div>
            <div className="rounded-lg border border-gray-800 bg-gradient-to-br from-pink-900/20 to-pink-900/5 p-6">
              <Globe className="mb-4 h-10 w-10 text-pink-400" />
              <h3 className="mb-3 text-xl font-semibold">Product</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• Analyze user feedback at scale</li>
                <li>• Prioritize features with data</li>
                <li>• Predict feature adoption</li>
                <li>• Optimize user experience</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Implementation Strategy */}
        <section className="mb-16">
          <h2 className="mb-8 text-3xl font-bold">Implementation Strategy</h2>
          <div className="space-y-6">
            <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
              <h3 className="mb-4 text-xl font-semibold text-blue-400">Phase 1: Assessment (Week 1-2)</h3>
              <div className="space-y-3 text-gray-300">
                <p className="leading-relaxed">
                  Identify high-impact use cases and quick wins. Map current processes and pain points. Define success
                  metrics and KPIs.
                </p>
                <div className="rounded-lg bg-black/50 p-4">
                  <h4 className="mb-2 text-sm font-semibold text-white">Key Activities:</h4>
                  <ul className="space-y-1 text-sm text-gray-400">
                    <li>• Stakeholder interviews across departments</li>
                    <li>• Process documentation and workflow mapping</li>
                    <li>• ROI modeling and business case development</li>
                    <li>• Technical requirements gathering</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
              <h3 className="mb-4 text-xl font-semibold text-green-400">Phase 2: Pilot (Week 3-6)</h3>
              <div className="space-y-3 text-gray-300">
                <p className="leading-relaxed">
                  Launch with one department or use case. Train users, gather feedback, and iterate. Measure results
                  against baseline metrics.
                </p>
                <div className="rounded-lg bg-black/50 p-4">
                  <h4 className="mb-2 text-sm font-semibold text-white">Key Activities:</h4>
                  <ul className="space-y-1 text-sm text-gray-400">
                    <li>• APEX setup and MOD configuration</li>
                    <li>• User training and onboarding</li>
                    <li>• Daily usage monitoring and support</li>
                    <li>• Weekly performance reviews</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
              <h3 className="mb-4 text-xl font-semibold text-purple-400">Phase 3: Scale (Week 7-12)</h3>
              <div className="space-y-3 text-gray-300">
                <p className="leading-relaxed">
                  Roll out to additional departments and use cases. Optimize based on pilot learnings. Establish centers
                  of excellence.
                </p>
                <div className="rounded-lg bg-black/50 p-4">
                  <h4 className="mb-2 text-sm font-semibold text-white">Key Activities:</h4>
                  <ul className="space-y-1 text-sm text-gray-400">
                    <li>• Phased rollout to remaining teams</li>
                    <li>• Advanced training and certification</li>
                    <li>• Integration with existing systems</li>
                    <li>• Continuous optimization and refinement</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
              <h3 className="mb-4 text-xl font-semibold text-orange-400">Phase 4: Optimize (Ongoing)</h3>
              <div className="space-y-3 text-gray-300">
                <p className="leading-relaxed">
                  Continuously improve based on usage data and feedback. Expand to new use cases. Share best practices
                  across organization.
                </p>
                <div className="rounded-lg bg-black/50 p-4">
                  <h4 className="mb-2 text-sm font-semibold text-white">Key Activities:</h4>
                  <ul className="space-y-1 text-sm text-gray-400">
                    <li>• Monthly performance reviews</li>
                    <li>• Quarterly business reviews with stakeholders</li>
                    <li>• New MOD evaluation and testing</li>
                    <li>• Knowledge sharing and community building</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Success Metrics */}
        <section className="mb-16">
          <h2 className="mb-8 text-3xl font-bold">Measuring Success</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
              <h3 className="mb-4 text-lg font-semibold">Efficiency Metrics</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Time saved per employee</span>
                  <span className="font-semibold text-green-400">8-12 hrs/week</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Process automation rate</span>
                  <span className="font-semibold text-green-400">70-90%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Error reduction</span>
                  <span className="font-semibold text-green-400">85%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Response time improvement</span>
                  <span className="font-semibold text-green-400">60-80%</span>
                </div>
              </div>
            </div>
            <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
              <h3 className="mb-4 text-lg font-semibold">Business Metrics</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Revenue increase</span>
                  <span className="font-semibold text-blue-400">25-40%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Cost reduction</span>
                  <span className="font-semibold text-blue-400">30-45%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Customer satisfaction</span>
                  <span className="font-semibold text-blue-400">+35 NPS</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Employee satisfaction</span>
                  <span className="font-semibold text-blue-400">+40%</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Case Study Preview */}
        <section className="rounded-lg border border-gray-800 bg-gradient-to-r from-blue-900/20 to-purple-900/20 p-8">
          <h2 className="mb-6 text-2xl font-bold">Real Results from Real Companies</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-lg bg-black/50 p-6">
              <div className="mb-4 text-3xl font-bold text-blue-400">$2.4M</div>
              <div className="mb-2 text-sm font-semibold">Annual Savings</div>
              <div className="text-xs text-gray-400">
                Mid-size SaaS company automated customer support and sales operations
              </div>
            </div>
            <div className="rounded-lg bg-black/50 p-6">
              <div className="mb-4 text-3xl font-bold text-green-400">156%</div>
              <div className="mb-2 text-sm font-semibold">ROI in Year 1</div>
              <div className="text-xs text-gray-400">
                E-commerce retailer optimized marketing and inventory management
              </div>
            </div>
            <div className="rounded-lg bg-black/50 p-6">
              <div className="mb-4 text-3xl font-bold text-purple-400">6 Weeks</div>
              <div className="mb-2 text-sm font-semibold">Time to Value</div>
              <div className="text-xs text-gray-400">Financial services firm deployed XAI across 5 departments</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

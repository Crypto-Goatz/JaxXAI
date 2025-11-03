import type { Metadata } from "next"
import { TrendingUp, Users, Shield, Zap, Target, Award } from "lucide-react"

export const metadata: Metadata = {
  title: "XAI Benefits & Use Cases - Real Business Applications | APEX",
  description:
    "Explore the tangible benefits of Explainable AI and real-world use cases across industries. See how XAI drives ROI, improves efficiency, and builds customer trust.",
  keywords: "XAI benefits, AI use cases, explainable AI applications, business AI, AI ROI, AI efficiency",
}

export default function BenefitsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="mb-16">
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-balance lg:text-6xl">
            Benefits &{" "}
            <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">Use Cases</span>
          </h1>
          <p className="text-xl text-gray-400 text-pretty max-w-3xl leading-relaxed">
            Discover how Explainable AI delivers measurable business value across industries and use cases, from
            customer service to financial analysis.
          </p>
        </div>

        {/* Key Benefits */}
        <section className="mb-16">
          <h2 className="mb-8 text-3xl font-bold">Key Benefits of XAI</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border border-gray-800 bg-gradient-to-br from-green-900/20 to-green-900/5 p-6">
              <TrendingUp className="mb-4 h-10 w-10 text-green-400" />
              <h3 className="mb-3 text-xl font-semibold">Increased ROI</h3>
              <p className="text-gray-400 leading-relaxed">
                Make better decisions faster with AI that explains its reasoning, reducing costly mistakes and improving
                outcomes by up to 40%.
              </p>
            </div>
            <div className="rounded-lg border border-gray-800 bg-gradient-to-br from-blue-900/20 to-blue-900/5 p-6">
              <Users className="mb-4 h-10 w-10 text-blue-400" />
              <h3 className="mb-3 text-xl font-semibold">Higher Adoption Rates</h3>
              <p className="text-gray-400 leading-relaxed">
                Teams trust and use AI tools they understand, leading to 3x higher adoption rates compared to black box
                systems.
              </p>
            </div>
            <div className="rounded-lg border border-gray-800 bg-gradient-to-br from-purple-900/20 to-purple-900/5 p-6">
              <Shield className="mb-4 h-10 w-10 text-purple-400" />
              <h3 className="mb-3 text-xl font-semibold">Regulatory Compliance</h3>
              <p className="text-gray-400 leading-relaxed">
                Meet GDPR, CCPA, and industry-specific requirements with AI that provides clear audit trails and
                explanations.
              </p>
            </div>
            <div className="rounded-lg border border-gray-800 bg-gradient-to-br from-orange-900/20 to-orange-900/5 p-6">
              <Zap className="mb-4 h-10 w-10 text-orange-400" />
              <h3 className="mb-3 text-xl font-semibold">Faster Problem Resolution</h3>
              <p className="text-gray-400 leading-relaxed">
                Debug and optimize AI systems 5x faster when you can see exactly how decisions are made and where issues
                occur.
              </p>
            </div>
            <div className="rounded-lg border border-gray-800 bg-gradient-to-br from-cyan-900/20 to-cyan-900/5 p-6">
              <Target className="mb-4 h-10 w-10 text-cyan-400" />
              <h3 className="mb-3 text-xl font-semibold">Better Decision Making</h3>
              <p className="text-gray-400 leading-relaxed">
                Combine human expertise with AI insights to make more informed, strategic decisions backed by clear
                reasoning.
              </p>
            </div>
            <div className="rounded-lg border border-gray-800 bg-gradient-to-br from-pink-900/20 to-pink-900/5 p-6">
              <Award className="mb-4 h-10 w-10 text-pink-400" />
              <h3 className="mb-3 text-xl font-semibold">Competitive Advantage</h3>
              <p className="text-gray-400 leading-relaxed">
                Differentiate your brand with transparent, ethical AI that builds customer trust and loyalty.
              </p>
            </div>
          </div>
        </section>

        {/* Use Cases by Industry */}
        <section className="mb-16">
          <h2 className="mb-8 text-3xl font-bold">Real-World Use Cases</h2>

          <div className="space-y-8">
            {/* Financial Services */}
            <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
              <h3 className="mb-4 text-2xl font-semibold text-blue-400">Financial Services</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="mb-2 font-semibold">Credit Risk Assessment</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Explain loan decisions to customers and regulators with clear reasoning about creditworthiness
                    factors, improving approval rates by 25% while maintaining risk standards.
                  </p>
                </div>
                <div>
                  <h4 className="mb-2 font-semibold">Fraud Detection</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Identify suspicious transactions with explanations of why they were flagged, reducing false
                    positives by 60% and improving customer experience.
                  </p>
                </div>
              </div>
            </div>

            {/* Healthcare */}
            <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
              <h3 className="mb-4 text-2xl font-semibold text-green-400">Healthcare</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="mb-2 font-semibold">Diagnosis Support</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Assist physicians with AI-powered diagnosis recommendations that explain which symptoms and test
                    results led to each conclusion, improving diagnostic accuracy by 30%.
                  </p>
                </div>
                <div>
                  <h4 className="mb-2 font-semibold">Treatment Planning</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Recommend personalized treatment plans with clear explanations of why specific approaches are
                    suggested based on patient history and medical research.
                  </p>
                </div>
              </div>
            </div>

            {/* E-commerce & Retail */}
            <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
              <h3 className="mb-4 text-2xl font-semibold text-purple-400">E-commerce & Retail</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="mb-2 font-semibold">Product Recommendations</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Show customers why products are recommended based on their browsing history and preferences,
                    increasing conversion rates by 35%.
                  </p>
                </div>
                <div>
                  <h4 className="mb-2 font-semibold">Inventory Optimization</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Explain demand forecasts and stocking recommendations with clear reasoning about seasonal trends,
                    market conditions, and historical data.
                  </p>
                </div>
              </div>
            </div>

            {/* Human Resources */}
            <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
              <h3 className="mb-4 text-2xl font-semibold text-orange-400">Human Resources</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="mb-2 font-semibold">Candidate Screening</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Evaluate candidates with transparent criteria and explanations, ensuring fair hiring practices and
                    reducing time-to-hire by 50%.
                  </p>
                </div>
                <div>
                  <h4 className="mb-2 font-semibold">Employee Retention</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Identify at-risk employees with clear indicators of dissatisfaction or flight risk, enabling
                    proactive retention strategies.
                  </p>
                </div>
              </div>
            </div>

            {/* Marketing */}
            <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
              <h3 className="mb-4 text-2xl font-semibold text-pink-400">Marketing & Sales</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="mb-2 font-semibold">Lead Scoring</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Prioritize leads with explanations of why they're likely to convert, helping sales teams focus on
                    high-value opportunities and increase close rates by 45%.
                  </p>
                </div>
                <div>
                  <h4 className="mb-2 font-semibold">Campaign Optimization</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Understand which campaign elements drive results with clear attribution and recommendations for
                    improvement, maximizing marketing ROI.
                  </p>
                </div>
              </div>
            </div>

            {/* Customer Service */}
            <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
              <h3 className="mb-4 text-2xl font-semibold text-cyan-400">Customer Service</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="mb-2 font-semibold">Intelligent Routing</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Route customer inquiries to the right agent with explanations of why specific expertise is needed,
                    reducing resolution time by 40%.
                  </p>
                </div>
                <div>
                  <h4 className="mb-2 font-semibold">Sentiment Analysis</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Detect customer frustration with clear indicators of negative sentiment, enabling proactive
                    intervention and improved satisfaction scores.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ROI Calculator */}
        <section className="rounded-lg border border-gray-800 bg-gradient-to-r from-blue-900/20 to-purple-900/20 p-8">
          <h2 className="mb-4 text-2xl font-bold">Measurable Business Impact</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-green-400">40%</div>
              <div className="text-sm text-gray-400">Average increase in decision accuracy</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-blue-400">3x</div>
              <div className="text-sm text-gray-400">Higher user adoption rates</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-purple-400">60%</div>
              <div className="text-sm text-gray-400">Reduction in compliance risks</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

import type { Metadata } from "next"
import { Check, X } from "lucide-react"

export const metadata: Metadata = {
  title: "XAI vs Traditional AI - Understanding the Difference | APEX",
  description:
    "Compare Explainable AI (XAI) with traditional AI systems. Learn why transparency and interpretability make XAI the superior choice for modern business applications.",
  keywords:
    "XAI vs AI, Explainable AI comparison, traditional AI, black box AI, transparent AI, interpretable machine learning",
}

export default function VsTraditionalAIPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="mb-16">
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-balance lg:text-6xl">
            XAI vs{" "}
            <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              Traditional AI
            </span>
          </h1>
          <p className="text-xl text-gray-400 text-pretty max-w-3xl leading-relaxed">
            Understanding the fundamental differences between Explainable AI and traditional "black box" AI systems, and
            why it matters for your business.
          </p>
        </div>

        {/* Comparison Table */}
        <section className="mb-16">
          <h2 className="mb-8 text-3xl font-bold">Key Differences</h2>
          <div className="overflow-hidden rounded-lg border border-gray-800">
            <table className="w-full">
              <thead className="bg-gray-900">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Feature</th>
                  <th className="px-6 py-4 text-left font-semibold text-green-400">XAI (Explainable AI)</th>
                  <th className="px-6 py-4 text-left font-semibold text-red-400">Traditional AI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                <tr className="bg-gray-900/30">
                  <td className="px-6 py-4 font-medium">Transparency</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-400" />
                      <span className="text-gray-300">Full visibility into decision-making process</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <X className="h-5 w-5 text-red-400" />
                      <span className="text-gray-300">Black box - no insight into how decisions are made</span>
                    </div>
                  </td>
                </tr>
                <tr className="bg-gray-900/30">
                  <td className="px-6 py-4 font-medium">Trust</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-400" />
                      <span className="text-gray-300">High trust through verifiable explanations</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <X className="h-5 w-5 text-red-400" />
                      <span className="text-gray-300">Requires blind faith in the system</span>
                    </div>
                  </td>
                </tr>
                <tr className="bg-gray-900/30">
                  <td className="px-6 py-4 font-medium">Debugging</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-400" />
                      <span className="text-gray-300">Easy to identify and fix issues</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <X className="h-5 w-5 text-red-400" />
                      <span className="text-gray-300">Difficult to diagnose problems</span>
                    </div>
                  </td>
                </tr>
                <tr className="bg-gray-900/30">
                  <td className="px-6 py-4 font-medium">Compliance</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-400" />
                      <span className="text-gray-300">Meets regulatory requirements for explainability</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <X className="h-5 w-5 text-red-400" />
                      <span className="text-gray-300">May not satisfy regulatory standards</span>
                    </div>
                  </td>
                </tr>
                <tr className="bg-gray-900/30">
                  <td className="px-6 py-4 font-medium">User Adoption</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-400" />
                      <span className="text-gray-300">Higher adoption due to understanding</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <X className="h-5 w-5 text-red-400" />
                      <span className="text-gray-300">Resistance due to lack of transparency</span>
                    </div>
                  </td>
                </tr>
                <tr className="bg-gray-900/30">
                  <td className="px-6 py-4 font-medium">Bias Detection</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-400" />
                      <span className="text-gray-300">Can identify and correct biases</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <X className="h-5 w-5 text-red-400" />
                      <span className="text-gray-300">Hidden biases may go undetected</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Real-World Example */}
        <section className="mb-16">
          <h2 className="mb-6 text-3xl font-bold">Real-World Example</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-red-900/50 bg-red-900/10 p-6">
              <h3 className="mb-4 text-xl font-semibold text-red-400">Traditional AI Scenario</h3>
              <p className="mb-4 text-gray-300 leading-relaxed">
                A loan application is rejected by an AI system. The applicant asks why, but the bank cannot provide a
                clear explanation because the AI's decision-making process is opaque.
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
                Result: Customer frustration, potential legal issues, and inability to improve the system.
              </p>
            </div>
            <div className="rounded-lg border border-green-900/50 bg-green-900/10 p-6">
              <h3 className="mb-4 text-xl font-semibold text-green-400">XAI Scenario</h3>
              <p className="mb-4 text-gray-300 leading-relaxed">
                A loan application is rejected by APEX. The system explains that the debt-to-income ratio exceeded the
                threshold and recent credit inquiries raised concerns, providing specific data points.
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
                Result: Customer understands the decision, can take corrective action, and the bank maintains compliance
                and trust.
              </p>
            </div>
          </div>
        </section>

        {/* Why Choose XAI */}
        <section className="mb-16">
          <h2 className="mb-6 text-3xl font-bold">Why Businesses Choose XAI</h2>
          <div className="space-y-4 text-gray-300 leading-relaxed">
            <p>
              The shift from traditional AI to XAI represents a fundamental change in how businesses approach artificial
              intelligence. Here's why forward-thinking companies are making the switch:
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-4">
                <h4 className="mb-2 font-semibold text-white">Regulatory Compliance</h4>
                <p className="text-sm text-gray-400 leading-relaxed">
                  GDPR, CCPA, and other regulations increasingly require explainable AI decisions, especially in
                  finance, healthcare, and hiring.
                </p>
              </div>
              <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-4">
                <h4 className="mb-2 font-semibold text-white">Risk Mitigation</h4>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Identify potential issues before they become problems by understanding exactly how your AI systems
                  operate.
                </p>
              </div>
              <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-4">
                <h4 className="mb-2 font-semibold text-white">Competitive Advantage</h4>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Build customer trust and differentiate your brand with transparent, ethical AI practices.
                </p>
              </div>
              <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-4">
                <h4 className="mb-2 font-semibold text-white">Continuous Improvement</h4>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Learn from AI explanations to refine business processes and make better strategic decisions.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Brain, Lightbulb, Shield } from "lucide-react"

export const metadata: Metadata = {
  title: "Introduction to XAI - Explainable Artificial Intelligence | APEX",
  description:
    "Discover what XAI (Explainable AI) is and how it transforms business operations through transparent, interpretable artificial intelligence that you can trust and understand.",
  keywords: "XAI, Explainable AI, Artificial Intelligence, AI transparency, interpretable AI, business AI",
}

export default function IntroductionPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        {/* Hero Section */}
        <div className="mb-16">
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-balance lg:text-6xl">
            Introduction to{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Explainable AI
            </span>
          </h1>
          <p className="text-xl text-gray-400 text-pretty max-w-3xl leading-relaxed">
            XAI (Explainable Artificial Intelligence) represents the next evolution in AI technology, making artificial
            intelligence transparent, interpretable, and trustworthy for business applications.
          </p>
        </div>

        {/* What is XAI Section */}
        <section className="mb-16">
          <h2 className="mb-6 text-3xl font-bold">What is XAI?</h2>
          <div className="space-y-4 text-gray-300 leading-relaxed">
            <p>
              Explainable AI (XAI) is a set of processes and methods that allows humans to comprehend and trust the
              results and output created by machine learning algorithms. Unlike traditional "black box" AI systems, XAI
              provides clear insights into how decisions are made, what factors influenced those decisions, and why
              specific outcomes were reached.
            </p>
            <p>
              In the context of APEX, XAI enables business users to interact with sophisticated AI systems using natural
              language, without needing technical expertise or coding knowledge. The AI not only performs tasks but
              explains its reasoning, building trust and enabling better decision-making.
            </p>
          </div>
        </section>

        {/* Key Features Grid */}
        <section className="mb-16">
          <h2 className="mb-8 text-3xl font-bold">Key Features of XAI</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
              <Brain className="mb-4 h-10 w-10 text-blue-400" />
              <h3 className="mb-3 text-xl font-semibold">Transparency</h3>
              <p className="text-gray-400 leading-relaxed">
                Every decision made by the AI is explainable and traceable, showing you exactly how conclusions were
                reached.
              </p>
            </div>
            <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
              <Lightbulb className="mb-4 h-10 w-10 text-purple-400" />
              <h3 className="mb-3 text-xl font-semibold">Interpretability</h3>
              <p className="text-gray-400 leading-relaxed">
                Complex AI outputs are translated into human-understandable insights that anyone can comprehend.
              </p>
            </div>
            <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
              <Shield className="mb-4 h-10 w-10 text-green-400" />
              <h3 className="mb-3 text-xl font-semibold">Trustworthiness</h3>
              <p className="text-gray-400 leading-relaxed">
                Build confidence in AI decisions with clear explanations and the ability to verify reasoning.
              </p>
            </div>
          </div>
        </section>

        {/* Why XAI Matters */}
        <section className="mb-16">
          <h2 className="mb-6 text-3xl font-bold">Why XAI Matters for Business</h2>
          <div className="space-y-4 text-gray-300 leading-relaxed">
            <p>
              In today's business environment, AI-driven decisions can have significant impacts on operations, customer
              relationships, and bottom-line results. XAI ensures that these decisions are not only accurate but also
              understandable and justifiable.
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Regulatory compliance: Meet requirements for explainable decision-making in regulated industries</li>
              <li>Risk management: Identify and mitigate potential issues before they impact your business</li>
              <li>User adoption: Increase trust and adoption rates when users understand how AI assists them</li>
              <li>Continuous improvement: Learn from AI explanations to refine processes and strategies</li>
              <li>Ethical AI: Ensure fair, unbiased decisions that align with your company values</li>
            </ul>
          </div>
        </section>

        {/* CTA Section */}
        <section className="rounded-lg border border-gray-800 bg-gradient-to-r from-blue-900/20 to-purple-900/20 p-8">
          <h2 className="mb-4 text-2xl font-bold">Ready to Experience XAI?</h2>
          <p className="mb-6 text-gray-300 leading-relaxed">
            Discover how APEX leverages XAI to transform your business operations with transparent, trustworthy
            artificial intelligence.
          </p>
          <Link
            href="/what-is-xai/getting-started"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Get Started with APEX
            <ArrowRight className="h-5 w-5" />
          </Link>
        </section>
      </div>
    </div>
  )
}

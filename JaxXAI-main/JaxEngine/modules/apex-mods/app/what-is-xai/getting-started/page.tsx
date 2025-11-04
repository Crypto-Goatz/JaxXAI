import type { Metadata } from "next"
import Link from "next/link"
import { CheckCircle2, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Getting Started with XAI - Quick Start Guide | APEX",
  description:
    "Learn how to get started with Explainable AI using APEX. Step-by-step guide to implementing XAI in your business operations with no coding required.",
  keywords: "XAI getting started, APEX tutorial, implement XAI, explainable AI guide, no-code AI",
}

export default function GettingStartedPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="mb-16">
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-balance lg:text-6xl">
            Getting Started with{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">APEX XAI</span>
          </h1>
          <p className="text-xl text-gray-400 text-pretty max-w-3xl leading-relaxed">
            Launch your XAI-powered business operations in minutes with APEX. No coding required, no complex setup—just
            plain language commands.
          </p>
        </div>

        {/* Quick Start Steps */}
        <section className="mb-16">
          <h2 className="mb-8 text-3xl font-bold">Quick Start in 4 Steps</h2>
          <div className="space-y-6">
            <div className="flex gap-6 rounded-lg border border-gray-800 bg-gray-900/50 p-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xl font-bold">
                1
              </div>
              <div className="flex-1">
                <h3 className="mb-2 text-xl font-semibold">Create Your APEX Account</h3>
                <p className="mb-4 text-gray-400 leading-relaxed">
                  Sign up for APEX in under 2 minutes. No credit card required for the free trial. Choose a plan that
                  fits your business size and needs.
                </p>
                <Link href="/signup" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300">
                  Start Free Trial <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="flex gap-6 rounded-lg border border-gray-800 bg-gray-900/50 p-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-purple-600 text-xl font-bold">
                2
              </div>
              <div className="flex-1">
                <h3 className="mb-2 text-xl font-semibold">Select Your MODS</h3>
                <p className="mb-4 text-gray-400 leading-relaxed">
                  Browse our marketplace of business MODS and install the ones you need. From SEO content writing to
                  lead generation, choose the capabilities that match your workflow.
                </p>
                <Link href="/mods" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300">
                  Browse MODS <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="flex gap-6 rounded-lg border border-gray-800 bg-gray-900/50 p-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-600 text-xl font-bold">
                3
              </div>
              <div className="flex-1">
                <h3 className="mb-2 text-xl font-semibold">Connect Your Tools</h3>
                <p className="mb-4 text-gray-400 leading-relaxed">
                  Link your existing business tools and platforms through our Connectors. APEX integrates with 50+
                  services including CRMs, payment processors, analytics platforms, and more.
                </p>
                <Link href="/connectors" className="inline-flex items-center gap-2 text-green-400 hover:text-green-300">
                  View Connectors <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="flex gap-6 rounded-lg border border-gray-800 bg-gray-900/50 p-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-600 text-xl font-bold">
                4
              </div>
              <div className="flex-1">
                <h3 className="mb-2 text-xl font-semibold">Start Commanding</h3>
                <p className="mb-4 text-gray-400 leading-relaxed">
                  Simply type what you want to do in plain language. "Generate 10 blog post ideas about sustainable
                  fashion" or "Show me my top leads from last week." APEX understands and executes.
                </p>
                <div className="rounded-lg bg-black/50 p-4 font-mono text-sm text-green-400">
                  <div className="mb-2">$ apex: analyze my sales pipeline and identify at-risk deals</div>
                  <div className="text-gray-500">✓ Analyzing 47 active opportunities...</div>
                  <div className="text-gray-500">✓ Found 8 deals requiring attention</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What You Can Do */}
        <section className="mb-16">
          <h2 className="mb-8 text-3xl font-bold">What You Can Do with APEX</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-start gap-3 rounded-lg border border-gray-800 bg-gray-900/30 p-4">
              <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-green-400" />
              <div>
                <h4 className="mb-1 font-semibold">Content Creation</h4>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Generate SEO-optimized blog posts, social media content, and marketing copy
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-gray-800 bg-gray-900/30 p-4">
              <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-green-400" />
              <div>
                <h4 className="mb-1 font-semibold">Lead Management</h4>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Find, qualify, and nurture leads automatically with intelligent scoring
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-gray-800 bg-gray-900/30 p-4">
              <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-green-400" />
              <div>
                <h4 className="mb-1 font-semibold">Data Analysis</h4>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Get insights from your business data with natural language queries
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-gray-800 bg-gray-900/30 p-4">
              <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-green-400" />
              <div>
                <h4 className="mb-1 font-semibold">Customer Support</h4>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Automate responses and route inquiries intelligently
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-gray-800 bg-gray-900/30 p-4">
              <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-green-400" />
              <div>
                <h4 className="mb-1 font-semibold">Project Management</h4>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Track tasks, deadlines, and team progress with AI assistance
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-gray-800 bg-gray-900/30 p-4">
              <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-green-400" />
              <div>
                <h4 className="mb-1 font-semibold">Financial Operations</h4>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Manage invoicing, expenses, and financial reporting
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section className="mb-16">
          <h2 className="mb-6 text-3xl font-bold">Best Practices for Success</h2>
          <div className="space-y-4 text-gray-300 leading-relaxed">
            <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
              <h3 className="mb-3 text-lg font-semibold text-white">Start Small, Scale Fast</h3>
              <p>
                Begin with one or two MODS that address your most pressing needs. Once you're comfortable, add more
                capabilities. APEX grows with your business.
              </p>
            </div>
            <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
              <h3 className="mb-3 text-lg font-semibold text-white">Be Specific in Your Commands</h3>
              <p>
                The more specific your requests, the better APEX can help. Instead of "find leads," try "find B2B SaaS
                leads in the healthcare industry with 50-200 employees."
              </p>
            </div>
            <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
              <h3 className="mb-3 text-lg font-semibold text-white">Review AI Explanations</h3>
              <p>
                Take time to understand why APEX makes certain recommendations. This helps you refine your processes and
                make better use of the platform.
              </p>
            </div>
            <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
              <h3 className="mb-3 text-lg font-semibold text-white">Leverage Templates</h3>
              <p>
                Use our pre-built command templates for common tasks. Customize them to match your specific workflow and
                save them for repeated use.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-lg border border-gray-800 bg-gradient-to-r from-blue-900/20 to-purple-900/20 p-8 text-center">
          <h2 className="mb-4 text-2xl font-bold">Ready to Transform Your Business?</h2>
          <p className="mb-6 text-gray-300 leading-relaxed">
            Join thousands of businesses using APEX to automate operations and scale faster with XAI.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Start Free Trial
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-900 px-6 py-3 font-semibold text-white transition-colors hover:bg-gray-800"
            >
              Watch Demo
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}

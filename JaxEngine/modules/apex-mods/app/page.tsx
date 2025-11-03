import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Zap, Workflow, Sparkles, ArrowRight, Check, Globe, Bot, Puzzle } from "lucide-react"
import { InteractiveFlowDemo } from "@/components/interactive-flow-demo"
import { InteractiveEndpointTester } from "@/components/interactive-endpoint-tester"

export const metadata = {
  title: "APEX - AI-Powered Automation Platform | Connect Apps & Build Workflows",
  description:
    "Automate your business with APEX. Visual workflow builder, 50+ integrations, AI-powered suggestions, and powerful MODs. No code required.",
  keywords: "automation, workflow, no-code, integrations, AI, business automation, APEX Flow",
  openGraph: {
    title: "APEX - AI-Powered Automation Platform",
    description: "Connect apps, build workflows, and automate your business with AI-powered tools.",
    type: "website",
  },
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-red-500/10 to-yellow-500/10" />
        <div className="max-w-7xl mx-auto px-8 py-24 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/20 via-red-500/20 to-yellow-500/20 border border-orange-500/30 mb-8">
              <Sparkles className="w-4 h-4 text-orange-400" />
              <span className="text-sm text-orange-200">AI-Powered Automation Platform</span>
            </div>

            <h1 className="text-6xl md:text-7xl font-bold mb-6 text-balance">
              The complete platform to{" "}
              <span className="bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 bg-clip-text text-transparent">
                automate anything
              </span>
            </h1>

            <p className="text-xl text-gray-400 mb-10 text-pretty leading-relaxed max-w-3xl mx-auto">
              Connect your apps, build powerful workflows, and automate your business with AI. No code required. Just
              drag, drop, and deploy.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="text-base bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 hover:opacity-90 text-white border-0 px-8"
                >
                  Start Building Free
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="#demo">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-base bg-transparent border-gray-700 hover:border-orange-500 hover:bg-orange-500/10"
                >
                  Try Interactive Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-gray-800 bg-black/50">
        <div className="max-w-7xl mx-auto px-8 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "50+", label: "Integrations", subtext: "and growing" },
              { value: "10x", label: "Faster", subtext: "automation setup" },
              { value: "99.9%", label: "Uptime", subtext: "guaranteed" },
              { value: "AI", label: "Powered", subtext: "smart suggestions" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-lg font-semibold text-white mb-1">{stat.label}</div>
                <div className="text-sm text-gray-500">{stat.subtext}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Everything you need to automate</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Powerful features that make automation simple, fast, and intelligent
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Workflow,
                title: "APEX Flow",
                description: "Visual drag-and-drop workflow builder with AI-powered suggestions",
              },
              {
                icon: Puzzle,
                title: "Powerful MODs",
                description: "Extend functionality with pre-built modules for SaaS, SEO, and more",
              },
              {
                icon: Globe,
                title: "50+ Integrations",
                description: "Connect with all your favorite apps and services instantly",
              },
              {
                icon: Bot,
                title: "AI Assistant",
                description: "Smart recommendations and automated workflow optimization",
              },
            ].map((feature, i) => (
              <Card key={i} className="p-6 bg-gray-900/50 border-gray-800 hover:border-orange-500/50 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/20 via-red-500/20 to-yellow-500/20 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-orange-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Build workflows in minutes</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Three simple steps to automate your entire business
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Connect Your Apps",
                description: "Choose from 50+ integrations including Google Sheets, Slack, Stripe, and more",
              },
              {
                step: "02",
                title: "Build Your Flow",
                description: "Drag and drop nodes to create powerful workflows with triggers, actions, and logic",
              },
              {
                step: "03",
                title: "Deploy & Automate",
                description: "Activate your flow and let APEX handle the rest with AI-powered optimization",
              },
            ].map((step, i) => (
              <div key={i} className="relative">
                <div className="text-6xl font-bold text-orange-500/20 mb-4">{step.step}</div>
                <h3 className="text-2xl font-semibold mb-3 text-white">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed">{step.description}</p>
                {i < 2 && (
                  <ArrowRight className="hidden md:block absolute top-12 -right-4 w-8 h-8 text-orange-500/30" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Built for every team</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              From startups to enterprises, APEX scales with your needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Marketing Teams",
                features: [
                  "Lead capture automation",
                  "Email campaign triggers",
                  "Social media scheduling",
                  "Analytics reporting",
                ],
              },
              {
                title: "Sales Teams",
                features: ["CRM data sync", "Follow-up automation", "Deal tracking", "Quote generation"],
              },
              {
                title: "Operations",
                features: ["Invoice processing", "Inventory management", "Customer onboarding", "Report generation"],
              },
            ].map((useCase, i) => (
              <Card key={i} className="p-8 bg-gray-900/50 border-gray-800 hover:border-orange-500/50 transition-colors">
                <h3 className="text-2xl font-semibold mb-6 text-white">{useCase.title}</h3>
                <ul className="space-y-3">
                  {useCase.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section id="demo" className="py-24 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/20 via-red-500/20 to-yellow-500/20 border border-orange-500/30 mb-6">
              <Sparkles className="w-4 h-4 text-orange-400" />
              <span className="text-sm text-orange-200">Try Before You Sign Up</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Experience APEX in action</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Test our powerful automation tools right now. No account required.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <InteractiveFlowDemo />
            <InteractiveEndpointTester />
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-400 mb-6">Ready to build real workflows?</p>
            <Link href="/dashboard">
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 hover:opacity-90 text-white"
              >
                Start Building Free
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-orange-500/10 via-red-500/10 to-yellow-500/10">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to automate your business?</h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Join thousands of teams already using APEX to save time and scale faster
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="text-base bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 hover:opacity-90 text-white border-0 px-8"
              >
                Get Started Free
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/connectors">
              <Button
                size="lg"
                variant="outline"
                className="text-base bg-transparent border-gray-700 hover:border-orange-500 hover:bg-orange-500/10"
              >
                View All Integrations
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-black py-12">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 via-red-500 to-yellow-500 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">APEX</span>
              </div>
              <p className="text-gray-400 text-sm">AI-powered automation platform for modern teams</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/apex-flow" className="hover:text-orange-500">
                    APEX Flow
                  </Link>
                </li>
                <li>
                  <Link href="/mods" className="hover:text-orange-500">
                    MODs
                  </Link>
                </li>
                <li>
                  <Link href="/connectors" className="hover:text-orange-500">
                    Integrations
                  </Link>
                </li>
                <li>
                  <Link href="/endpoints" className="hover:text-orange-500">
                    API
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/docs" className="hover:text-orange-500">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/tutorials" className="hover:text-orange-500">
                    Tutorials
                  </Link>
                </li>
                <li>
                  <Link href="/community" className="hover:text-orange-500">
                    Community
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="hover:text-orange-500">
                    Support
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-orange-500">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-orange-500">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-orange-500">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-orange-500">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>&copy; 2025 APEX. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-orange-500">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-orange-500">
                Terms
              </Link>
              <Link href="/security" className="hover:text-orange-500">
                Security
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

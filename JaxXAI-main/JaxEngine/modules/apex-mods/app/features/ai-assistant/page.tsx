import type { Metadata } from "next"
import { Bot, MessageSquare, Zap, Brain, Shield, Sparkles, TrendingUp, Users, Clock } from "lucide-react"

export const metadata: Metadata = {
  title: "AI Assistant - Natural Language Business Control | APEX",
  description:
    "Control your entire business with plain language. APEX's AI Assistant understands your requests and executes complex business operations without code or technical knowledge.",
  keywords: "AI assistant, natural language processing, business automation, conversational AI, XAI, explainable AI",
}

export default function AIAssistantPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="border-b border-border bg-gradient-to-b from-card to-background">
        <div className="max-w-7xl mx-auto px-8 py-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
              <Bot className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-5xl font-bold text-foreground">AI Assistant</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
            Run your entire business with nothing but simple messages. APEX's AI Assistant understands plain language
            and executes complex operations instantly—no code, no technical knowledge required.
          </p>
        </div>
      </section>

      {/* Core Capabilities */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-8 py-16">
          <h2 className="text-3xl font-bold text-foreground mb-12">Core Capabilities</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors">
              <MessageSquare className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-3">Natural Language Understanding</h3>
              <p className="text-muted-foreground leading-relaxed">
                Communicate with APEX like you would with a team member. Our advanced NLP engine understands context,
                intent, and nuance in your requests.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Contextual understanding across conversations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Multi-language support for global teams</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Industry-specific terminology recognition</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors">
              <Zap className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-3">Instant Execution</h3>
              <p className="text-muted-foreground leading-relaxed">
                From simple tasks to complex workflows, APEX executes your requests in real-time. Watch as your business
                operations happen automatically.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Sub-second response times for most operations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Parallel task execution for efficiency</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Real-time progress updates and confirmations</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors">
              <Brain className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-3">Intelligent Learning</h3>
              <p className="text-muted-foreground leading-relaxed">
                APEX learns from every interaction, adapting to your business processes, preferences, and communication
                style over time.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Personalized responses based on your history</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Predictive suggestions for common tasks</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Continuous improvement through feedback</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="border-b border-border bg-card/30">
        <div className="max-w-7xl mx-auto px-8 py-16">
          <h2 className="text-3xl font-bold text-foreground mb-12">What You Can Do</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="text-lg font-semibold text-foreground mb-3">Marketing & Content</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="flex items-start gap-2">
                  <span className="text-primary font-mono">→</span>
                  <span>"Create a social media campaign for our new product launch"</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-primary font-mono">→</span>
                  <span>"Write SEO-optimized blog posts about industry trends"</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-primary font-mono">→</span>
                  <span>"Schedule email campaigns for the next quarter"</span>
                </p>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="text-lg font-semibold text-foreground mb-3">Sales & CRM</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="flex items-start gap-2">
                  <span className="text-primary font-mono">→</span>
                  <span>"Show me all leads from last week that haven't been contacted"</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-primary font-mono">→</span>
                  <span>"Generate a proposal for the enterprise client meeting"</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-primary font-mono">→</span>
                  <span>"Update deal stages for all opportunities over $50k"</span>
                </p>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="text-lg font-semibold text-foreground mb-3">Customer Support</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="flex items-start gap-2">
                  <span className="text-primary font-mono">→</span>
                  <span>"Respond to all pending support tickets about billing"</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-primary font-mono">→</span>
                  <span>"Create a knowledge base article from this conversation"</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-primary font-mono">→</span>
                  <span>"Send satisfaction surveys to customers who closed tickets today"</span>
                </p>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="text-lg font-semibold text-foreground mb-3">Analytics & Reporting</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="flex items-start gap-2">
                  <span className="text-primary font-mono">→</span>
                  <span>"Generate a monthly revenue report with year-over-year comparison"</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-primary font-mono">→</span>
                  <span>"Show me which marketing channels have the best ROI"</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-primary font-mono">→</span>
                  <span>"Create a dashboard tracking our key performance indicators"</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Features */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-8 py-16">
          <h2 className="text-3xl font-bold text-foreground mb-12">Advanced Features</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Explainable AI (XAI)</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Unlike black-box AI systems, APEX explains every decision it makes. Understand why actions were
                    taken, what data was used, and how conclusions were reached. Full transparency for complete trust.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                    <Sparkles className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Proactive Suggestions</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    APEX doesn't just respond—it anticipates. Get intelligent suggestions for optimizations, potential
                    issues, and opportunities based on your business patterns and industry best practices.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Team Collaboration</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Share conversations, delegate tasks, and collaborate seamlessly. APEX maintains context across team
                    members, ensuring everyone stays aligned and informed.
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
                  <h3 className="text-lg font-semibold text-foreground mb-2">Continuous Optimization</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    APEX constantly analyzes your business operations to identify inefficiencies and suggest
                    improvements. Automatic A/B testing, performance monitoring, and optimization recommendations.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">24/7 Availability</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Your AI assistant never sleeps. Handle customer inquiries, process orders, and manage operations
                    around the clock. Global business operations without timezone constraints.
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
                  <h3 className="text-lg font-semibold text-foreground mb-2">Context Retention</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    APEX remembers everything. Reference past conversations, decisions, and data points naturally. No
                    need to repeat information or provide context every time.
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
          <h2 className="text-4xl font-bold text-foreground mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Experience the power of natural language business control. Start running your entire operation with simple
            conversations.
          </p>
          <div className="flex gap-4 justify-center">
            <button className="px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors">
              Get Started Free
            </button>
            <button className="px-8 py-3 rounded-lg border border-border bg-card text-foreground font-semibold hover:bg-accent transition-colors">
              Watch Demo
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

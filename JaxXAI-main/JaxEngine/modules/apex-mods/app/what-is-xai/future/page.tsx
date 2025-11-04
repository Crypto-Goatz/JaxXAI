import type { Metadata } from "next"
import { Sparkles, Brain, Rocket, Globe, Zap, Shield } from "lucide-react"

export const metadata: Metadata = {
  title: "Future of XAI - Next Generation AI Technology | APEX",
  description:
    "Explore the future of Explainable AI and how emerging XAI technologies will transform business, society, and human-AI collaboration in the coming years.",
  keywords: "future of XAI, AI trends, explainable AI future, AI innovation, next-gen AI, AI evolution",
}

export default function FuturePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="mb-16">
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-balance lg:text-6xl">
            The Future of{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              XAI
            </span>
          </h1>
          <p className="text-xl text-gray-400 text-pretty max-w-3xl leading-relaxed">
            Discover how Explainable AI is evolving to become more powerful, intuitive, and integrated into every aspect
            of business and daily life.
          </p>
        </div>

        {/* Vision Statement */}
        <section className="mb-16">
          <div className="rounded-lg border border-purple-900/50 bg-gradient-to-r from-purple-900/20 to-blue-900/20 p-8">
            <h2 className="mb-4 text-2xl font-bold">Our Vision</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              We envision a future where AI is not just a tool, but a trusted partner that augments human capabilities
              while remaining transparent, ethical, and accountable. XAI will democratize access to advanced technology,
              enabling anyone to harness the power of AI through natural conversation.
            </p>
          </div>
        </section>

        {/* Emerging Trends */}
        <section className="mb-16">
          <h2 className="mb-8 text-3xl font-bold">Emerging Trends in XAI</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border border-gray-800 bg-gradient-to-br from-purple-900/20 to-purple-900/5 p-6">
              <Sparkles className="mb-4 h-10 w-10 text-purple-400" />
              <h3 className="mb-3 text-xl font-semibold">Multimodal XAI</h3>
              <p className="text-gray-400 leading-relaxed">
                AI that explains decisions across text, images, video, and audio, providing richer context and deeper
                understanding of complex scenarios.
              </p>
            </div>
            <div className="rounded-lg border border-gray-800 bg-gradient-to-br from-blue-900/20 to-blue-900/5 p-6">
              <Brain className="mb-4 h-10 w-10 text-blue-400" />
              <h3 className="mb-3 text-xl font-semibold">Cognitive XAI</h3>
              <p className="text-gray-400 leading-relaxed">
                Systems that understand and adapt to individual learning styles, providing personalized explanations
                that match how each user thinks.
              </p>
            </div>
            <div className="rounded-lg border border-gray-800 bg-gradient-to-br from-green-900/20 to-green-900/5 p-6">
              <Rocket className="mb-4 h-10 w-10 text-green-400" />
              <h3 className="mb-3 text-xl font-semibold">Autonomous XAI</h3>
              <p className="text-gray-400 leading-relaxed">
                Self-improving AI systems that not only explain their decisions but also learn from feedback to make
                better choices over time.
              </p>
            </div>
            <div className="rounded-lg border border-gray-800 bg-gradient-to-br from-orange-900/20 to-orange-900/5 p-6">
              <Globe className="mb-4 h-10 w-10 text-orange-400" />
              <h3 className="mb-3 text-xl font-semibold">Federated XAI</h3>
              <p className="text-gray-400 leading-relaxed">
                Privacy-preserving AI that learns across organizations while keeping data secure and providing
                transparent explanations.
              </p>
            </div>
            <div className="rounded-lg border border-gray-800 bg-gradient-to-br from-cyan-900/20 to-cyan-900/5 p-6">
              <Zap className="mb-4 h-10 w-10 text-cyan-400" />
              <h3 className="mb-3 text-xl font-semibold">Real-time XAI</h3>
              <p className="text-gray-400 leading-relaxed">
                Instant explanations for time-critical decisions in trading, emergency response, and autonomous systems.
              </p>
            </div>
            <div className="rounded-lg border border-gray-800 bg-gradient-to-br from-pink-900/20 to-pink-900/5 p-6">
              <Shield className="mb-4 h-10 w-10 text-pink-400" />
              <h3 className="mb-3 text-xl font-semibold">Ethical XAI</h3>
              <p className="text-gray-400 leading-relaxed">
                Built-in ethical frameworks that ensure AI decisions align with human values and societal norms.
              </p>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="mb-16">
          <h2 className="mb-8 text-3xl font-bold">XAI Evolution Timeline</h2>
          <div className="space-y-6">
            <div className="flex gap-6">
              <div className="flex w-32 shrink-0 flex-col items-center">
                <div className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold">2024-2025</div>
                <div className="mt-2 h-full w-0.5 bg-gradient-to-b from-blue-600 to-purple-600"></div>
              </div>
              <div className="flex-1 rounded-lg border border-gray-800 bg-gray-900/50 p-6">
                <h3 className="mb-3 text-lg font-semibold">Foundation Era</h3>
                <p className="text-gray-400 leading-relaxed">
                  Widespread adoption of basic XAI in business applications. Natural language interfaces become
                  standard. Integration with existing business tools reaches maturity.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex w-32 shrink-0 flex-col items-center">
                <div className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-bold">2026-2027</div>
                <div className="mt-2 h-full w-0.5 bg-gradient-to-b from-purple-600 to-pink-600"></div>
              </div>
              <div className="flex-1 rounded-lg border border-gray-800 bg-gray-900/50 p-6">
                <h3 className="mb-3 text-lg font-semibold">Intelligence Era</h3>
                <p className="text-gray-400 leading-relaxed">
                  XAI systems begin to understand context and nuance at human levels. Multimodal explanations become
                  common. AI assistants can handle complex, multi-step business processes autonomously.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex w-32 shrink-0 flex-col items-center">
                <div className="rounded-lg bg-pink-600 px-4 py-2 text-sm font-bold">2028-2030</div>
                <div className="mt-2 h-full w-0.5 bg-gradient-to-b from-pink-600 to-orange-600"></div>
              </div>
              <div className="flex-1 rounded-lg border border-gray-800 bg-gray-900/50 p-6">
                <h3 className="mb-3 text-lg font-semibold">Collaboration Era</h3>
                <p className="text-gray-400 leading-relaxed">
                  Human-AI collaboration reaches new heights. XAI systems anticipate needs and proactively suggest
                  solutions. Cross-organizational AI collaboration becomes possible while maintaining privacy.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex w-32 shrink-0 flex-col items-center">
                <div className="rounded-lg bg-orange-600 px-4 py-2 text-sm font-bold">2030+</div>
              </div>
              <div className="flex-1 rounded-lg border border-gray-800 bg-gray-900/50 p-6">
                <h3 className="mb-3 text-lg font-semibold">Transformation Era</h3>
                <p className="text-gray-400 leading-relaxed">
                  XAI becomes invisible infrastructure. Every business process is AI-augmented by default. New business
                  models emerge that were impossible without transparent, trustworthy AI.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Areas */}
        <section className="mb-16">
          <h2 className="mb-8 text-3xl font-bold">Transformative Impact Areas</h2>
          <div className="space-y-6">
            <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
              <h3 className="mb-3 text-xl font-semibold text-blue-400">Healthcare Revolution</h3>
              <p className="mb-3 text-gray-300 leading-relaxed">
                XAI will enable personalized medicine at scale, with AI systems that can explain treatment
                recommendations in terms patients and doctors understand. Early disease detection will become routine,
                with transparent risk assessments.
              </p>
              <div className="text-sm text-gray-400">
                Expected Impact: 50% reduction in diagnostic errors, 30% improvement in treatment outcomes
              </div>
            </div>

            <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
              <h3 className="mb-3 text-xl font-semibold text-green-400">Education Transformation</h3>
              <p className="mb-3 text-gray-300 leading-relaxed">
                Personalized learning paths powered by XAI will adapt to each student's pace and style. Teachers will
                have AI assistants that explain student progress and suggest interventions with clear reasoning.
              </p>
              <div className="text-sm text-gray-400">
                Expected Impact: 40% improvement in learning outcomes, universal access to quality education
              </div>
            </div>

            <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
              <h3 className="mb-3 text-xl font-semibold text-purple-400">Climate Action</h3>
              <p className="mb-3 text-gray-300 leading-relaxed">
                XAI will optimize energy systems, supply chains, and resource allocation with transparent
                decision-making. Organizations can understand and act on climate impact with AI-powered insights.
              </p>
              <div className="text-sm text-gray-400">
                Expected Impact: 25% reduction in carbon emissions through AI-optimized operations
              </div>
            </div>

            <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
              <h3 className="mb-3 text-xl font-semibold text-orange-400">Economic Inclusion</h3>
              <p className="mb-3 text-gray-300 leading-relaxed">
                Small businesses and individuals will have access to enterprise-grade AI capabilities through platforms
                like APEX. XAI democratizes advanced technology, leveling the playing field.
              </p>
              <div className="text-sm text-gray-400">
                Expected Impact: 10M+ small businesses empowered with AI by 2030
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="rounded-lg border border-gray-800 bg-gradient-to-r from-purple-900/20 via-pink-900/20 to-blue-900/20 p-8 text-center">
          <h2 className="mb-4 text-2xl font-bold">Be Part of the Future</h2>
          <p className="mb-6 text-gray-300 leading-relaxed">
            The future of XAI is being built today. Join APEX and be at the forefront of the AI revolution, where
            transparency meets innovation.
          </p>
          <div className="text-sm text-gray-400">
            "The best way to predict the future is to create it." - Peter Drucker
          </div>
        </section>
      </div>
    </div>
  )
}

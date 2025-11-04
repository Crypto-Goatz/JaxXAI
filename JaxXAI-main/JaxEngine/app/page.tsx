import { Button } from "@/components/ui/button"
import { Bot, Database, Shield, Users, Zap } from "lucide-react"
import ContactForm from "@/components/contact-form"
import Testimonials from "@/components/testimonials"
import UseCases from "@/components/use-cases"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import TypingPromptInput from "@/components/typing-prompt-input"
import FramerSpotlight from "@/components/framer-spotlight"
import CssGridBackground from "@/components/css-grid-background"
import FeaturesSection from "@/components/features-section"
import StructuredData from "@/components/structured-data"
import Link from "next/link"

export default function Home() {
  return (
    <>
      <StructuredData />
      <div className="flex min-h-screen flex-col">
        <Navbar />

        {/* Hero Section */}
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <CssGridBackground />
          <FramerSpotlight />
          <div className="container px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm mb-4 sm:mb-6">
                Predictive XAI Trading Platform
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-4 sm:mb-6 text-balance">
                Jax: The World's Most Advanced Predictive XAI for Crypto Trading
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mb-8 sm:mb-12 leading-relaxed">
                Trained on 6 years of on-chain data and 3+ years of live trading. Access live pipelines, automated bots,
                rumor fact-checking, and everything you need to dominate crypto markets.
              </p>

              <TypingPromptInput />

              <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 mt-12 sm:mt-16 w-full sm:w-auto">
                <Button
                  asChild
                  className="flex items-center justify-center gap-3 px-5 py-6 h-[60px] w-full sm:w-auto bg-[#1a1d21] hover:bg-[#2a2d31] text-white rounded-xl border-0 dark:bg-primary dark:hover:bg-primary/90 dark:shadow-[0_0_15px_rgba(36,101,237,0.5)] relative overflow-hidden group"
                >
                  <Link href="/#contact">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0 dark:opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-x-[-100%] group-hover:translate-x-[100%]"></div>
                    <Zap className="h-5 w-5 text-white relative z-10" />
                    <div className="flex flex-col items-start relative z-10">
                      <span className="text-[15px] font-medium">Start Trading</span>
                      <span className="text-xs text-gray-400 dark:text-gray-300 -mt-0.5">v2.0.0</span>
                    </div>
                  </Link>
                </Button>
                <Button
                  asChild
                  className="px-5 py-6 h-[60px] w-full sm:w-auto rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-[15px] font-medium text-foreground"
                >
                  <Link href="/YOLO">Launch Control Room</Link>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  className="px-5 py-6 h-[60px] w-full sm:w-auto text-[15px] font-medium text-foreground hover:bg-muted/50"
                >
                  <Link href="/dashboard">View Dashboard</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <FeaturesSection />

        {/* How It Works */}
        <section className="py-12 sm:py-16 md:py-20" id="how-it-works" aria-labelledby="how-it-works-heading">
          <div className="container px-4 sm:px-6 md:px-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8 sm:mb-12">
              <div className="space-y-2">
                <h2
                  id="how-it-works-heading"
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-balance"
                >
                  How It Works
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground text-base sm:text-lg md:text-xl leading-relaxed px-4">
                  Get started with Jax in minutes and unlock the power of predictive AI trading.
                </p>
              </div>
            </div>
            <div className="grid gap-8 sm:gap-10 md:gap-12 lg:grid-cols-3 items-start">
              <div className="flex flex-col items-center space-y-4 text-center px-4">
                <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <span className="text-xl sm:text-2xl font-bold">1</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold">Subscribe to Jax</h3>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  Choose your plan and get instant access to the full-featured crypto trading dashboard.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center px-4">
                <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <span className="text-xl sm:text-2xl font-bold">2</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold">Connect Your Exchange</h3>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  Link your exchange accounts and configure automated trading bots with our secure API integration.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center px-4">
                <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <span className="text-xl sm:text-2xl font-bold">3</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold">Trade with AI Insights</h3>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  Leverage live pipelines, predictive analytics, and automated strategies to maximize your profits.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <UseCases />

        {/* Testimonials */}
        <Testimonials />

        {/* Contact/Pricing Section */}
        <section
          id="contact"
          className="py-12 sm:py-16 md:py-20 bg-muted/50 dark:bg-muted/10"
          aria-labelledby="contact-heading"
        >
          <div className="container px-4 sm:px-6 md:px-8">
            <div className="grid gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-12 items-start">
              <div className="flex flex-col justify-center space-y-4 sm:space-y-6">
                <div className="space-y-2">
                  <h2
                    id="contact-heading"
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-balance"
                  >
                    Subscription Plans
                  </h2>
                  <p className="text-muted-foreground text-base sm:text-lg md:text-xl leading-relaxed">
                    Choose the perfect plan for your trading needs. All plans include access to our feature-packed
                    dashboard.
                  </p>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Users className="h-5 w-5 flex-shrink-0 text-primary" />
                    <span className="text-sm sm:text-base">Live market pipelines and real-time alerts</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Database className="h-5 w-5 flex-shrink-0 text-primary" />
                    <span className="text-sm sm:text-base">6 years of on-chain trading data analysis</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Bot className="h-5 w-5 flex-shrink-0 text-primary" />
                    <span className="text-sm sm:text-base">Automated trading bots with custom strategies</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Shield className="h-5 w-5 flex-shrink-0 text-primary" />
                    <span className="text-sm sm:text-base">AI-powered rumor fact-checking and sentiment analysis</span>
                  </div>
                </div>
                <div className="pt-2 sm:pt-4">
                  <p className="font-medium text-sm sm:text-base">
                    Subscribe now and get 7 days free to experience the power of Jax.
                  </p>
                </div>
              </div>
              <div className="lg:ml-10">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}

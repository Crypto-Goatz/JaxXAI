import FeatureCard from "@/components/feature-card"
import {
  BotIcon,
  SparklesIcon,
  DatabaseIcon,
  ShieldIcon,
  FileTextIcon,
  ServerIcon,
  LockIcon,
  ZapIcon,
} from "@/components/feature-icons"

export default function FeaturesSection() {
  const features = [
    {
      icon: <ZapIcon />,
      title: "Live Market Pipelines",
      description:
        "Real-time data streams from multiple exchanges with instant alerts on price movements, volume spikes, and market anomalies.",
      accentColor: "rgba(36, 101, 237, 0.5)",
    },
    {
      icon: <BotIcon />,
      title: "Automated Trading Bots",
      description:
        "Deploy AI-powered bots with custom strategies, risk management, and 24/7 execution across all major exchanges.",
      accentColor: "rgba(236, 72, 153, 0.5)",
    },
    {
      icon: <DatabaseIcon />,
      title: "6 Years On-Chain Data",
      description:
        "Access comprehensive historical analysis trained on 6 years of blockchain data and 3+ years of live trading results.",
      accentColor: "rgba(34, 211, 238, 0.5)",
    },
    {
      icon: <ShieldIcon />,
      title: "Rumor Fact-Checking",
      description:
        "AI-powered verification system that analyzes crypto news, social sentiment, and on-chain activity to separate fact from fiction.",
      accentColor: "rgba(132, 204, 22, 0.5)",
    },
    {
      icon: <SparklesIcon />,
      title: "Predictive Analytics",
      description:
        "Explainable AI predictions for price movements, trend reversals, and optimal entry/exit points backed by data.",
      accentColor: "rgba(249, 115, 22, 0.5)",
    },
    {
      icon: <ServerIcon />,
      title: "Portfolio Management",
      description:
        "Track all your holdings across exchanges with performance analytics, profit/loss tracking, and tax reporting.",
      accentColor: "rgba(168, 85, 247, 0.5)",
    },
    {
      icon: <FileTextIcon />,
      title: "Smart Alerts & Signals",
      description:
        "Customizable notifications for whale movements, unusual activity, technical indicators, and AI-generated trading signals.",
      accentColor: "rgba(251, 191, 36, 0.5)",
    },
    {
      icon: <LockIcon />,
      title: "Secure API Integration",
      description:
        "Bank-grade encryption for exchange connections with read-only options and granular permission controls.",
      accentColor: "rgba(16, 185, 129, 0.5)",
    },
  ]

  return (
    <section
      className="py-12 sm:py-16 md:py-20 bg-muted/50 dark:bg-muted/10"
      id="features"
      aria-labelledby="features-heading"
    >
      <div className="container px-4 sm:px-6 md:px-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8 sm:mb-12">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground mb-2">
              Key Features
            </div>
            <h2
              id="features-heading"
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-balance px-4"
            >
              Everything You Need to Trade Crypto
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground text-base sm:text-lg md:text-xl leading-relaxed px-4">
              A complete trading ecosystem powered by advanced AI and years of market data.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              accentColor={feature.accentColor}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

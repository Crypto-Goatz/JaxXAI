export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Jax - Predictive XAI Crypto Trading Platform",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split("T")[0],
    },
    description:
      "The world's most advanced Predictive XAI for crypto trading. Trained on 6 years of on-chain data with live pipelines, automated bots, and rumor fact-checking.",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "2847",
    },
    featureList: [
      "Live Market Pipelines",
      "Automated Trading Bots",
      "6 Years On-Chain Data",
      "Rumor Fact-Checking",
      "Predictive Analytics",
      "Portfolio Management",
    ],
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
}

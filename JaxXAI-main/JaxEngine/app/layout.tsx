import type React from "react"
import type { Metadata } from "next"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

import { Inter, Geist as V0_Font_Geist, Geist_Mono as V0_Font_Geist_Mono, Source_Serif_4 as V0_Font_Source_Serif_4 } from 'next/font/google'

// Initialize fonts
const _geist = V0_Font_Geist({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })
const _geistMono = V0_Font_Geist_Mono({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })
const _sourceSerif_4 = V0_Font_Source_Serif_4({ subsets: ['latin'], weight: ["200","300","400","500","600","700","800","900"] })

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Jax | World's Most Advanced Predictive XAI for Crypto Trading",
  description:
    "Jax is the world's most advanced Predictive XAI trained on 6 years of on-chain data and 3+ years of live trading. Access live pipelines, automated bots, rumor fact-checking, and everything you need to dominate crypto markets.",
  keywords:
    "crypto trading, AI trading bot, predictive AI, on-chain analysis, automated trading, crypto signals, XAI, explainable AI, cryptocurrency, bitcoin, ethereum",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://your-domain.com",
    title: "Jax | Predictive XAI Crypto Trading Platform",
    description:
      "The world's most advanced Predictive XAI for crypto trading. Trained on 6 years of on-chain data with automated bots and live market pipelines.",
    siteName: "Jax",
    images: [
      {
        url: "https://your-domain.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Jax Crypto Trading Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jax | Predictive XAI Crypto Trading Platform",
    description: "The world's most advanced Predictive XAI for crypto trading with 6 years of on-chain data.",
    images: ["https://your-domain.com/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

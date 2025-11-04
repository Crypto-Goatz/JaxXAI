import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { LayoutContent } from "@/components/layout-content"

export const metadata: Metadata = {
  title: {
    default: "APEX - AI-Powered Automation Platform | No-Code Workflow Builder",
    template: "%s | APEX",
  },
  description:
    "Build powerful automation workflows with APEX. Connect 50+ apps, use AI-powered suggestions, and automate your business without code. Try our interactive demo now.",
  keywords: [
    "automation platform",
    "workflow builder",
    "no-code automation",
    "business automation",
    "AI automation",
    "workflow automation",
    "integration platform",
    "SaaS automation",
    "APEX Flow",
    "API integrations",
  ],
  authors: [{ name: "APEX" }],
  creator: "APEX",
  publisher: "APEX",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://jax-flow.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "APEX - AI-Powered Automation Platform",
    description: "Connect apps, build workflows, and automate your business with AI-powered tools. No code required.",
    url: "https://jax-flow.vercel.app",
    siteName: "APEX",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "APEX - AI-Powered Automation Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "APEX - AI-Powered Automation Platform",
    description: "Connect apps, build workflows, and automate your business with AI-powered tools.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <LayoutContent>{children}</LayoutContent>
        <Analytics />
      </body>
    </html>
  )
}

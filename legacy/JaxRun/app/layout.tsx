import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { IntegrationProvider } from "@/contexts/integration-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Chat Flow Editor",
  description: "Build interactive chat flows with drag and drop",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationOnChange>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <IntegrationProvider>{children}</IntegrationProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}

"use client"

import type React from "react"
import { AppProvider } from "@/components/app-provider"
import { ConditionalLayout } from "@/components/conditional-layout"

// <CHANGE> Added client wrapper component to handle conditional rendering
export function LayoutContent({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <ConditionalLayout>{children}</ConditionalLayout>
    </AppProvider>
  )
}

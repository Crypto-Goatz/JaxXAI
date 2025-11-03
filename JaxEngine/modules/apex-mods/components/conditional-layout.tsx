"use client"

import type React from "react"
import { Navigation } from "@/components/navigation"
import { DashboardNavigation } from "@/components/dashboard-navigation"
import { RightSidebar } from "@/components/right-sidebar"
import { BottomNavigation } from "@/components/bottom-navigation"
import { FloatingChatWindow } from "@/components/floating-chat-window"
import { useApp } from "@/components/app-provider"

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const { isDashboardMode } = useApp()

  return (
    <>
      {isDashboardMode ? <DashboardNavigation /> : <Navigation />}
      {isDashboardMode && <BottomNavigation />}
      {isDashboardMode && <RightSidebar />}
      {isDashboardMode && <FloatingChatWindow />}
      <div className={isDashboardMode ? "pb-[73px]" : ""}>{children}</div>
    </>
  )
}

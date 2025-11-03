"use client"

import { useMemo, memo } from "react"
import LogoMark from "../ui/logo-mark"
import { useFlowStore } from "@/contexts/flow-context"
import { FlowSwitcher } from "./flow-switcher"
import { Button } from "@/components/ui/button"
import { Settings } from "lucide-react"
import Link from "next/link"

const FlowNavigationBar = memo(function FlowNavigationBar() {
  const isSaving = useFlowStore((state) => state.isSaving)
  const flowName = useFlowStore((state) => state.flowName)
  const lastSavedAt = useFlowStore((state) => state.lastSavedAt)
  const updatedAt = useFlowStore((state) => state.updatedAt)

  const formattedLastSaved = useMemo(() => {
    const dateToFormat = lastSavedAt || updatedAt
    if (!dateToFormat) return null

    return new Intl.DateTimeFormat("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(dateToFormat)
  }, [lastSavedAt, updatedAt])

  return (
    <div className="relative shrink-0 py-2 px-1.5 border-b border-border bg-card shadow-soft">
      <div className="absolute inset-0">
        <div className="absolute h-full w-3/12 from-gray-900/5 to-transparent bg-gradient-to-r" />
      </div>
      <div className="relative flex items-stretch justify-between">
        <div className="flex items-center py-0.5 gap-x-1.5">
          <div className="size-8 flex shrink-0 select-none items-center justify-center rounded-md text-white bg-primary text-sm font-bold leading-none shadow-soft transition-all duration-200 hover:shadow-soft-md">
            <LogoMark className="size-8" />
          </div>
          <FlowSwitcher currentFlowName={flowName} isSaving={isSaving} formattedLastSaved={formattedLastSaved} />
        </div>
        <div className="flex items-center">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/integrations">
              <Settings className="size-4 mr-2" />
              Integrations
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
})

export default FlowNavigationBar

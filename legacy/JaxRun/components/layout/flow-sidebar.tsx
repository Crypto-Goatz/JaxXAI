"use client"

import { memo } from "react"
import { LayoutGrid, type LucideIcon, PanelLeft, PanelLeftClose, Play, Variable, TrendingUp } from "lucide-react"
import SidebarButtonItem from "./sidebar-button"
import { Separator } from "../ui/separator"
import { cn } from "@/lib/utils"
import { useFlowStore } from "@/contexts/flow-context"
import { useSidebarShortcuts } from "@/hooks/use-sidebar-shortcuts"
import SidebarPanelHeader from "./sidebar-panel-header"
import type { ActivePanel } from "@/types/flow.types"
import { ScrollArea } from "../ui/scroll-area"
import { TooltipProvider } from "../ui/tooltip"
import AvailableNodesPanel from "./sidebar-panels/available-nodes-panel"
import VariablesPanel from "./sidebar-panels/variables-panel"
import SimulationPanel from "./sidebar-panels/simulation-panel"
import MarketPricingPanel from "./sidebar-panels/market-pricing-panel"

const getMenuIcon = (panel: ActivePanel): LucideIcon => {
  switch (panel) {
    case "available-nodes":
      return LayoutGrid
    case "simulation":
      return Play
    case "variables":
      return Variable
    case "market-pricing":
      return TrendingUp
    default:
      return LayoutGrid
  }
}

const getMenuLabel = (panel: ActivePanel): string => {
  switch (panel) {
    case "available-nodes":
      return "Available Nodes"
    case "simulation":
      return "Simulation"
    case "variables":
      return "Variables"
    case "market-pricing":
      return "Market Pricing"
    default:
      return ""
  }
}

const FlowSidebar = memo(function FlowSidebar() {
  const isSidebarVisible = useFlowStore((state) => state.ui.sidebar.isVisible)
  const activePanel = useFlowStore((state) => state.ui.sidebar.activePanel)
  const setActivePanel = useFlowStore((state) => state.setSidebarActivePanel)
  const toggleSidebar = useFlowStore((state) => state.setSidebarVisible)

  useSidebarShortcuts()

  const renderSidebarContent = () => {
    switch (activePanel) {
      case "available-nodes": {
        return <AvailableNodesPanel />
      }
      case "variables": {
        return <VariablesPanel />
      }
      case "simulation": {
        return <SimulationPanel />
      }
      case "market-pricing": {
        return <MarketPricingPanel />
      }
      default: {
        return null
      }
    }
  }

  return (
    <TooltipProvider>
      <div className="absolute left-0 top-0 bottom-0 z-20 flex">
        <div className="shrink-0 bg-sidebar/95 backdrop-blur-md p-1 h-full shadow-radial-lg border-r border-border/50">
          <div className="h-full flex flex-col gap-1">
            <SidebarButtonItem
              active={false}
              onClick={() => toggleSidebar(!isSidebarVisible)}
              title="Toggle Sidebar"
              shortcut="⌘B"
            >
              {isSidebarVisible ? <PanelLeftClose className="size-5" /> : <PanelLeft className="size-5" />}
            </SidebarButtonItem>

            <Separator orientation="horizontal" className="w-4" />

            <SidebarButtonItem
              active={activePanel === "available-nodes"}
              onClick={() => setActivePanel("available-nodes")}
              title={getMenuLabel("available-nodes")}
              shortcut="⌘1"
            >
              {(() => {
                const Icon = getMenuIcon("available-nodes")
                return <Icon className="size-5" />
              })()}
            </SidebarButtonItem>

            <Separator orientation="horizontal" className="w-4" />

            <SidebarButtonItem
              active={activePanel === "market-pricing"}
              onClick={() => setActivePanel("market-pricing")}
              title={getMenuLabel("market-pricing")}
              shortcut="⌘2"
            >
              {(() => {
                const Icon = getMenuIcon("market-pricing")
                return <Icon className="size-5" />
              })()}
            </SidebarButtonItem>

            <Separator orientation="horizontal" className="w-4" />

            <SidebarButtonItem
              active={activePanel === "simulation"}
              onClick={() => setActivePanel("simulation")}
              title={getMenuLabel("simulation")}
              shortcut="⌘3"
            >
              {(() => {
                const Icon = getMenuIcon("simulation")
                return <Icon className="size-5" />
              })()}
            </SidebarButtonItem>

            <Separator orientation="horizontal" className="w-4" />

            <SidebarButtonItem
              active={activePanel === "variables"}
              onClick={() => setActivePanel("variables")}
              title={getMenuLabel("variables")}
              shortcut="⌘4"
            >
              {(() => {
                const Icon = getMenuIcon("variables")
                return <Icon className="size-5" />
              })()}
            </SidebarButtonItem>
          </div>
        </div>

        <div
          className={cn(
            "transition-all duration-300 ease-smooth overflow-hidden bg-card/95 backdrop-blur-md border-r border-border/50 shadow-radial-lg h-full",
            isSidebarVisible ? "w-96" : "w-0 opacity-0",
          )}
        >
          <div className="flex flex-col h-full min-w-[384px]">
            <SidebarPanelHeader title={getMenuLabel(activePanel)} icon={getMenuIcon(activePanel)} />
            <ScrollArea className="flex-1 min-h-0">
              <div className="px-4 py-4">{renderSidebarContent()}</div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
})

export default FlowSidebar

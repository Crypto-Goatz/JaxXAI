"use client"

import { memo } from "react"
import { X, Layers } from "lucide-react"
import { cn } from "@/lib/utils"
import { useFlowStore } from "@/contexts/flow-context"
import { useSelectedNodes } from "@/hooks/use-selected-nodes"
import { ScrollArea } from "../ui/scroll-area"
import { Button } from "../ui/button"
import PropertiesEditorFactory from "../flow/nodes/properties/properties-editor-factory"

const NodePropertiesFlyout = memo(function NodePropertiesFlyout() {
  const updateNode = useFlowStore((state) => state.updateNode)
  const setSelectedNodes = useFlowStore((state) => state.setSelectedNodes)
  const selectedNodes = useSelectedNodes()

  const isOpen = selectedNodes.length === 1
  const selectedNode = selectedNodes[0]

  const handleClose = () => {
    setSelectedNodes([])
  }

  return (
    <>
      <div
        className={cn(
          "absolute right-0 top-0 bottom-0 z-20 transition-all duration-300 ease-smooth",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="h-full w-96 bg-card/95 backdrop-blur-md border-l border-border/50 shadow-radial-xl flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border/50">
            <div className="flex items-center gap-2">
              <Layers className="size-5 text-muted-foreground" />
              <h2 className="font-semibold text-sm">Node Properties</h2>
            </div>
            <Button variant="ghost" size="icon" onClick={handleClose} className="size-8 hover:bg-accent/50">
              <X className="size-4" />
            </Button>
          </div>

          {/* Content */}
          <ScrollArea className="flex-1">
            <div className="px-4 py-4">
              {selectedNode ? (
                <PropertiesEditorFactory
                  key={selectedNode.id}
                  nodeId={selectedNode.id}
                  onUpdate={(updates) => updateNode(selectedNode.id, updates)}
                />
              ) : (
                <span className="text-muted-foreground text-sm">Select a node to edit its properties.</span>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Backdrop overlay when flyout is open */}
      {isOpen && (
        <div
          className="absolute inset-0 bg-black/20 backdrop-blur-[2px] z-10 transition-opacity duration-300"
          onClick={handleClose}
        />
      )}
    </>
  )
})

export default NodePropertiesFlyout

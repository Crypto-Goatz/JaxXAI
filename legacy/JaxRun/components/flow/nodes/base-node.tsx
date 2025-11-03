"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { forwardRef, type HTMLAttributes } from "react"
import { Settings } from "lucide-react"
import { Button } from "@/components/ui/button"

export const BaseNode = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative w-[280px] rounded-xl border-2 bg-card/95 backdrop-blur-sm text-card-foreground",
      "transition-all duration-300 ease-out",
      "hover:bg-card hover:scale-[1.02]",
      "data-[selected=true]:ring-2 data-[selected=true]:ring-primary/40 data-[selected=true]:border-primary/50 data-[selected=true]:scale-[1.02]",
      className,
    )}
    tabIndex={0}
    {...props}
  />
))
BaseNode.displayName = "BaseNode"

/**
 * A container for a consistent header layout intended to be used inside the
 * `<BaseNode />` component.
 */
export const BaseNodeHeader = forwardRef<
  HTMLElement,
  HTMLAttributes<HTMLElement> & {
    onSettingsClick?: (e: React.MouseEvent) => void
  }
>(({ className, onSettingsClick, children, ...props }, ref) => (
  <header
    ref={ref}
    {...props}
    className={cn(
      "mx-0 my-0 flex flex-row items-center justify-between gap-2 px-3.5 py-2.5 border-b",
      "backdrop-blur-sm",
      className,
    )}
  >
    {children}
    {onSettingsClick && (
      <Button
        variant="ghost"
        size="icon"
        onClick={onSettingsClick}
        className="size-7 opacity-0 group-hover:opacity-100 hover:bg-accent/50 transition-all duration-200 ml-auto"
      >
        <Settings className="size-3.5" />
      </Button>
    )}
  </header>
))
BaseNodeHeader.displayName = "BaseNodeHeader"

/**
 * The title text for the node. To maintain a native application feel, the title
 * text is not selectable.
 */
export const BaseNodeHeaderTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      data-slot="base-node-title"
      className={cn("user-select-none flex-1 font-semibold text-sm tracking-tight", className)}
      {...props}
    />
  ),
)
BaseNodeHeaderTitle.displayName = "BaseNodeHeaderTitle"

export const BaseNodeContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="base-node-content"
      className={cn("flex flex-col gap-y-2.5 p-3.5", className)}
      {...props}
    />
  ),
)
BaseNodeContent.displayName = "BaseNodeContent"

export const BaseNodeFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="base-node-footer"
      className={cn("flex flex-col items-center gap-y-2 border-t px-3.5 pb-3 pt-2.5", className)}
      {...props}
    />
  ),
)
BaseNodeFooter.displayName = "BaseNodeFooter"

"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { X, Minus, Maximize2, Pin, PinOff, MessageSquare, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useApp } from "@/components/app-provider"

export function FloatingChatWindow() {
  const { chatState, closeChat, sendMessage, togglePin } = useApp()
  const [isMinimized, setIsMinimized] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [position, setPosition] = useState({ x: 0, y: 100 })
  const [size, setSize] = useState({ width: 400, height: 600 })
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const windowRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPosition({ x: window.innerWidth - 420, y: 100 })
    }
  }, [])

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chatState.messages])

  // Handle dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest(".chat-header")) {
      setIsDragging(true)
      setDragOffset({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      })
    }
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      })
    }
    if (isResizing) {
      const newWidth = e.clientX - position.x
      const newHeight = e.clientY - position.y
      setSize({
        width: Math.max(300, Math.min(800, newWidth)),
        height: Math.max(400, Math.min(900, newHeight)),
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    setIsResizing(false)
  }

  useEffect(() => {
    if (isDragging || isResizing) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
      return () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
      }
    }
  }, [isDragging, isResizing, dragOffset, position])

  const handleSend = () => {
    if (inputValue.trim()) {
      sendMessage(inputValue)
      setInputValue("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  if (!chatState.isOpen) return null

  return (
    <div
      ref={windowRef}
      className="fixed z-[100] bg-card border-2 border-primary/20 rounded-lg shadow-2xl overflow-hidden transition-all duration-300"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: isMinimized ? "320px" : `${size.width}px`,
        height: isMinimized ? "60px" : `${size.height}px`,
        cursor: isDragging ? "grabbing" : "default",
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Header */}
      <div className="chat-header flex items-center justify-between p-3 bg-primary/10 border-b border-border cursor-grab active:cursor-grabbing">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-primary" />
          <span className="font-semibold text-sm">APEX {chatState.mode === "command" ? "Command" : "Chat"}</span>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => togglePin()}
            title={chatState.isPinned ? "Unpin" : "Pin"}
          >
            {chatState.isPinned ? <PinOff className="w-3.5 h-3.5" /> : <Pin className="w-3.5 h-3.5" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => setIsMinimized(!isMinimized)}
            title={isMinimized ? "Maximize" : "Minimize"}
          >
            {isMinimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minus className="w-3.5 h-3.5" />}
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={closeChat} title="Close">
            <X className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* Messages Area */}
      {!isMinimized && (
        <>
          <ScrollArea className="flex-1 p-4" style={{ height: `${size.height - 120}px` }}>
            <div className="space-y-4">
              {chatState.messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="p-3 border-t border-border bg-card">
            <div className="flex items-center gap-2">
              <Input
                type="text"
                placeholder="Type your message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 h-9"
              />
              <Button size="sm" onClick={handleSend} className="h-9 w-9 p-0">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Resize Handle */}
          <div
            className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize"
            onMouseDown={(e) => {
              e.stopPropagation()
              setIsResizing(true)
            }}
          >
            <div className="absolute bottom-1 right-1 w-3 h-3 border-r-2 border-b-2 border-muted-foreground/30" />
          </div>
        </>
      )}
    </div>
  )
}

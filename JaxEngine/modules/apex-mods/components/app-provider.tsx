"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { usePathname } from "next/navigation"

interface Message {
  role: "user" | "assistant"
  content: string
}

interface ChatState {
  isOpen: boolean
  mode: "command" | "chat"
  messages: Message[]
  isPinned: boolean
}

interface AppContextType {
  isDashboardMode: boolean
  chatState: ChatState
  startChat: (initialMessage: string, mode: "command" | "chat") => void
  closeChat: () => void
  sendMessage: (message: string) => void
  togglePin: () => void
}

const AppContext = createContext<AppContextType>({
  isDashboardMode: false,
  chatState: { isOpen: false, mode: "command", messages: [], isPinned: false },
  startChat: () => {},
  closeChat: () => {},
  sendMessage: () => {},
  togglePin: () => {},
})

export function useApp() {
  return useContext(AppContext)
}

export function AppProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  const isDashboardMode =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/connectors") ||
    pathname.startsWith("/mods") ||
    pathname.startsWith("/apex-docs") ||
    pathname.startsWith("/saas-mod") ||
    pathname.startsWith("/mod-builder") ||
    pathname.startsWith("/apex-flow") ||
    pathname.startsWith("/activity-log") ||
    pathname.startsWith("/configuration")

  const [chatState, setChatState] = useState<ChatState>({
    isOpen: false,
    mode: "command",
    messages: [],
    isPinned: false,
  })

  const startChat = (initialMessage: string, mode: "command" | "chat") => {
    setChatState({
      isOpen: true,
      mode,
      messages: [
        { role: "user", content: initialMessage },
        {
          role: "assistant",
          content:
            mode === "command"
              ? "I'm processing your command. APEX will execute this request and provide updates in real-time."
              : "Hello! I'm APEX AI. How can I help you with your business today?",
        },
      ],
      isPinned: false,
    })
  }

  const closeChat = () => {
    if (!chatState.isPinned) {
      setChatState((prev) => ({ ...prev, isOpen: false }))
    }
  }

  const sendMessage = (message: string) => {
    setChatState((prev) => ({
      ...prev,
      messages: [
        ...prev.messages,
        { role: "user", content: message },
        {
          role: "assistant",
          content: "I'm processing your request. This is a demo response from APEX AI.",
        },
      ],
    }))
  }

  const togglePin = () => {
    setChatState((prev) => ({ ...prev, isPinned: !prev.isPinned }))
  }

  return (
    <AppContext.Provider value={{ isDashboardMode, chatState, startChat, closeChat, sendMessage, togglePin }}>
      {children}
    </AppContext.Provider>
  )
}

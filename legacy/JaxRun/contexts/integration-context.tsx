"use client"

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react"
import type {
  ExchangeIntegration,
  WebhookConfig,
  NotificationConfig,
  GoogleSheetsIntegration,
  DataSourceIntegration,
} from "@/types/integration.types"

interface IntegrationContextType {
  exchanges: ExchangeIntegration[]
  webhooks: WebhookConfig[]
  notifications: NotificationConfig
  googleSheets: GoogleSheetsIntegration[]
  dataSources: DataSourceIntegration[]
  addExchange: (exchange: Omit<ExchangeIntegration, "id" | "createdAt">) => void
  updateExchange: (id: string, updates: Partial<ExchangeIntegration>) => void
  removeExchange: (id: string) => void
  addWebhook: (webhook: Omit<WebhookConfig, "id" | "createdAt">) => void
  updateWebhook: (id: string, updates: Partial<WebhookConfig>) => void
  removeWebhook: (id: string) => void
  updateNotifications: (updates: Partial<NotificationConfig>) => void
  addGoogleSheets: (integration: Omit<GoogleSheetsIntegration, "id" | "createdAt">) => void
  updateGoogleSheets: (id: string, updates: Partial<GoogleSheetsIntegration>) => void
  removeGoogleSheets: (id: string) => void
  addDataSource: (dataSource: Omit<DataSourceIntegration, "id" | "createdAt">) => void
  updateDataSource: (id: string, updates: Partial<DataSourceIntegration>) => void
  removeDataSource: (id: string) => void
}

const IntegrationContext = createContext<IntegrationContextType | null>(null)

const STORAGE_KEY = "chat-flow-integrations"

interface StoredIntegrations {
  exchanges: ExchangeIntegration[]
  webhooks: WebhookConfig[]
  notifications: NotificationConfig
  googleSheets: GoogleSheetsIntegration[]
  dataSources: DataSourceIntegration[]
}

export function IntegrationProvider({ children }: { children: ReactNode }) {
  const [exchanges, setExchanges] = useState<ExchangeIntegration[]>([])
  const [webhooks, setWebhooks] = useState<WebhookConfig[]>([])
  const [notifications, setNotifications] = useState<NotificationConfig>({})
  const [googleSheets, setGoogleSheets] = useState<GoogleSheetsIntegration[]>([])
  const [dataSources, setDataSources] = useState<DataSourceIntegration[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const data: StoredIntegrations = JSON.parse(stored)
        setExchanges(data.exchanges || [])
        setWebhooks(data.webhooks || [])
        setNotifications(data.notifications || {})
        setGoogleSheets(data.googleSheets || [])
        setDataSources(data.dataSources || [])
      }
    } catch (error) {
      console.error("[v0] Failed to load integrations from localStorage:", error)
    } finally {
      setIsLoaded(true)
    }
  }, [])

  useEffect(() => {
    if (!isLoaded) return

    try {
      const data: StoredIntegrations = {
        exchanges,
        webhooks,
        notifications,
        googleSheets,
        dataSources,
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    } catch (error) {
      console.error("[v0] Failed to save integrations to localStorage:", error)
    }
  }, [exchanges, webhooks, notifications, googleSheets, dataSources, isLoaded])

  const addExchange = useCallback((exchange: Omit<ExchangeIntegration, "id" | "createdAt">) => {
    const newExchange: ExchangeIntegration = {
      ...exchange,
      id: `exchange_${Date.now()}`,
      createdAt: new Date(),
    }
    setExchanges((prev) => [...prev, newExchange])
  }, [])

  const updateExchange = useCallback((id: string, updates: Partial<ExchangeIntegration>) => {
    setExchanges((prev) => prev.map((ex) => (ex.id === id ? { ...ex, ...updates } : ex)))
  }, [])

  const removeExchange = useCallback((id: string) => {
    setExchanges((prev) => prev.filter((ex) => ex.id !== id))
  }, [])

  const addWebhook = useCallback((webhook: Omit<WebhookConfig, "id" | "createdAt">) => {
    const newWebhook: WebhookConfig = {
      ...webhook,
      id: `webhook_${Date.now()}`,
      createdAt: new Date(),
    }
    setWebhooks((prev) => [...prev, newWebhook])
  }, [])

  const updateWebhook = useCallback((id: string, updates: Partial<WebhookConfig>) => {
    setWebhooks((prev) => prev.map((wh) => (wh.id === id ? { ...wh, ...updates } : wh)))
  }, [])

  const removeWebhook = useCallback((id: string) => {
    setWebhooks((prev) => prev.filter((wh) => wh.id !== id))
  }, [])

  const updateNotifications = useCallback((updates: Partial<NotificationConfig>) => {
    setNotifications((prev) => ({ ...prev, ...updates }))
  }, [])

  const addGoogleSheets = useCallback((integration: Omit<GoogleSheetsIntegration, "id" | "createdAt">) => {
    const newIntegration: GoogleSheetsIntegration = {
      ...integration,
      id: `sheets_${Date.now()}`,
      createdAt: new Date(),
    }
    setGoogleSheets((prev) => [...prev, newIntegration])
  }, [])

  const updateGoogleSheets = useCallback((id: string, updates: Partial<GoogleSheetsIntegration>) => {
    setGoogleSheets((prev) => prev.map((gs) => (gs.id === id ? { ...gs, ...updates } : gs)))
  }, [])

  const removeGoogleSheets = useCallback((id: string) => {
    setGoogleSheets((prev) => prev.filter((gs) => gs.id !== id))
  }, [])

  const addDataSource = useCallback((dataSource: Omit<DataSourceIntegration, "id" | "createdAt">) => {
    const newDataSource: DataSourceIntegration = {
      ...dataSource,
      id: `datasource_${Date.now()}`,
      createdAt: new Date(),
    }
    setDataSources((prev) => [...prev, newDataSource])
  }, [])

  const updateDataSource = useCallback((id: string, updates: Partial<DataSourceIntegration>) => {
    setDataSources((prev) => prev.map((ds) => (ds.id === id ? { ...ds, ...updates } : ds)))
  }, [])

  const removeDataSource = useCallback((id: string) => {
    setDataSources((prev) => prev.filter((ds) => ds.id !== id))
  }, [])

  return (
    <IntegrationContext.Provider
      value={{
        exchanges,
        webhooks,
        notifications,
        googleSheets,
        dataSources,
        addExchange,
        updateExchange,
        removeExchange,
        addWebhook,
        updateWebhook,
        removeWebhook,
        updateNotifications,
        addGoogleSheets,
        updateGoogleSheets,
        removeGoogleSheets,
        addDataSource,
        updateDataSource,
        removeDataSource,
      }}
    >
      {children}
    </IntegrationContext.Provider>
  )
}

export function useIntegrations() {
  const context = useContext(IntegrationContext)
  if (!context) {
    throw new Error("useIntegrations must be used within IntegrationProvider")
  }
  return context
}

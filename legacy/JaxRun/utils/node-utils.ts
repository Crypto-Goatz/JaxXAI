import {
  TrendingUp,
  Bell,
  Activity,
  GitBranch,
  ArrowRightLeft,
  MessageSquare,
  Shield,
  type LucideIcon,
} from "lucide-react"
import type {
  NodeType,
  NodeData,
  MarketMonitorNodeData,
  PriceAlertNodeData,
  TechnicalIndicatorNodeData,
  ConditionNodeData,
  TradeExecutionNodeData,
  NotificationNodeData,
  RiskManagementNodeData,
} from "@/types/node.types"

export function getNodeIcon(nodeType: NodeType): LucideIcon {
  switch (nodeType) {
    case "marketMonitor":
      return TrendingUp
    case "priceAlert":
      return Bell
    case "technicalIndicator":
      return Activity
    case "condition":
      return GitBranch
    case "tradeExecution":
      return ArrowRightLeft
    case "notification":
      return MessageSquare
    case "riskManagement":
      return Shield
    default:
      return TrendingUp
  }
}

export function getNodeTitle(nodeType: NodeType): string {
  switch (nodeType) {
    case "marketMonitor":
      return "Market Monitor"
    case "priceAlert":
      return "Price Alert"
    case "technicalIndicator":
      return "Technical Indicator"
    case "condition":
      return "Condition"
    case "tradeExecution":
      return "Trade Execution"
    case "notification":
      return "Notification"
    case "riskManagement":
      return "Risk Management"
    default:
      return "Unknown Node"
  }
}

export function getDefaultNodeData(nodeType: NodeType): NodeData {
  switch (nodeType) {
    case "marketMonitor":
      return {
        tradingPair: "BTC/USDT",
        exchange: "binance",
        timeframe: "1h",
      } as MarketMonitorNodeData
    case "priceAlert":
      return {
        alertType: "above",
        targetPrice: 50000,
        tradingPair: "BTC/USDT",
      } as PriceAlertNodeData
    case "technicalIndicator":
      return {
        indicatorType: "rsi",
        period: 14,
        variableName: `indicator_${Date.now()}`,
      } as TechnicalIndicatorNodeData
    case "condition":
      return {
        conditionType: "price",
        operator: ">",
        leftValue: "current_price",
        rightValue: "50000",
        description: "Price is above 50000",
      } as ConditionNodeData
    case "tradeExecution":
      return {
        action: "buy",
        orderType: "market",
        amount: 100,
        amountType: "fixed",
        tradingPair: "BTC/USDT",
        exchange: "binance",
      } as TradeExecutionNodeData
    case "notification":
      return {
        message: "Trading signal triggered",
        channels: ["email"],
        priority: "medium",
      } as NotificationNodeData
    case "riskManagement":
      return {
        ruleType: "stop-loss",
        percentage: 5,
      } as RiskManagementNodeData
    default:
      return { tradingPair: "BTC/USDT", exchange: "binance", timeframe: "1h" } as MarketMonitorNodeData
  }
}

export function validateNodeData(nodeType: NodeType, data: NodeData): string[] {
  const errors: string[] = []

  switch (nodeType) {
    case "marketMonitor":
      const marketData = data as MarketMonitorNodeData
      if (!marketData.tradingPair?.trim()) {
        errors.push("Trading pair is required")
      }
      if (!marketData.exchange?.trim()) {
        errors.push("Exchange is required")
      }
      if (!marketData.timeframe?.trim()) {
        errors.push("Timeframe is required")
      }
      break
    case "priceAlert":
      const alertData = data as PriceAlertNodeData
      if (!alertData.tradingPair?.trim()) {
        errors.push("Trading pair is required")
      }
      if (alertData.targetPrice === undefined || alertData.targetPrice <= 0) {
        errors.push("Valid target price is required")
      }
      break
    case "technicalIndicator":
      const indicatorData = data as TechnicalIndicatorNodeData
      if (!indicatorData.variableName?.trim()) {
        errors.push("Variable name is required")
      }
      if (indicatorData.period === undefined || indicatorData.period <= 0) {
        errors.push("Valid period is required")
      }
      break
    case "condition":
      const conditionData = data as ConditionNodeData
      if (!conditionData.leftValue?.trim()) {
        errors.push("Left value is required")
      }
      if (!conditionData.rightValue?.trim()) {
        errors.push("Right value is required")
      }
      break
    case "tradeExecution":
      const tradeData = data as TradeExecutionNodeData
      if (!tradeData.tradingPair?.trim()) {
        errors.push("Trading pair is required")
      }
      if (!tradeData.exchange?.trim()) {
        errors.push("Exchange is required")
      }
      if (tradeData.amount === undefined || tradeData.amount <= 0) {
        errors.push("Valid amount is required")
      }
      break
    case "notification":
      const notifData = data as NotificationNodeData
      if (!notifData.message?.trim()) {
        errors.push("Message is required")
      }
      if (!notifData.channels || notifData.channels.length === 0) {
        errors.push("At least one notification channel is required")
      }
      break
    case "riskManagement":
      const riskData = data as RiskManagementNodeData
      if (riskData.percentage !== undefined && (riskData.percentage <= 0 || riskData.percentage > 100)) {
        errors.push("Percentage must be between 0 and 100")
      }
      break
  }

  return errors
}

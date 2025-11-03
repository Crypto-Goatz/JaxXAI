import type { Node, NodeProps } from "@xyflow/react"

export type NodeType =
  | "marketMonitor"
  | "priceAlert"
  | "technicalIndicator"
  | "condition"
  | "tradeExecution"
  | "notification"
  | "riskManagement"

export interface BaseNodeData {
  label?: string
}

export interface MarketMonitorNodeData extends BaseNodeData {
  tradingPair: string // e.g., "BTC/USDT"
  exchange: string // e.g., "binance", "coinbase"
  timeframe: string // e.g., "1m", "5m", "1h", "1d"
}

export interface PriceAlertNodeData extends BaseNodeData {
  alertType: "above" | "below" | "crosses"
  targetPrice: number
  tradingPair: string
}

export interface TechnicalIndicatorNodeData extends BaseNodeData {
  indicatorType: "rsi" | "macd" | "sma" | "ema" | "bollinger" | "volume"
  period: number
  parameters?: Record<string, number> // Additional indicator-specific params
  variableName: string // Store result in this variable
}

export interface ConditionNodeData extends BaseNodeData {
  conditionType: "price" | "indicator" | "time" | "portfolio"
  operator: ">" | "<" | "=" | ">=" | "<=" | "!="
  leftValue: string // Variable name or value
  rightValue: string // Variable name or value
  description: string
}

export interface TradeExecutionNodeData extends BaseNodeData {
  action: "buy" | "sell"
  orderType: "market" | "limit" | "stop-loss" | "take-profit"
  amount: number
  amountType: "fixed" | "percentage" | "all"
  price?: number // For limit orders
  tradingPair: string
  exchange: string
}

export interface NotificationNodeData extends BaseNodeData {
  message: string
  channels: ("email" | "discord" | "telegram" | "webhook")[]
  priority: "low" | "medium" | "high"
}

export interface RiskManagementNodeData extends BaseNodeData {
  ruleType: "stop-loss" | "take-profit" | "max-loss" | "position-size"
  percentage?: number
  amount?: number
  tradingPair?: string
}

export type NodeData =
  | MarketMonitorNodeData
  | PriceAlertNodeData
  | TechnicalIndicatorNodeData
  | ConditionNodeData
  | TradeExecutionNodeData
  | NotificationNodeData
  | RiskManagementNodeData

export interface CustomNode extends Node {
  type: NodeType
  data: NodeData
}

export type MarketMonitorNodeProps = NodeProps<MarketMonitorNodeData>
export type PriceAlertNodeProps = NodeProps<PriceAlertNodeData>
export type TechnicalIndicatorNodeProps = NodeProps<TechnicalIndicatorNodeData>
export type ConditionNodeProps = NodeProps<ConditionNodeData>
export type TradeExecutionNodeProps = NodeProps<TradeExecutionNodeData>
export type NotificationNodeProps = NodeProps<NotificationNodeData>
export type RiskManagementNodeProps = NodeProps<RiskManagementNodeData>

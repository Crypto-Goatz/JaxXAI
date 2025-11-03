import type { CustomNode } from "@/types/node.types"
import type { Edge } from "@xyflow/react"
import { ExchangeFactory } from "./exchange-api/exchange-factory"
import { priceService } from "./price-service"
import { webhookService } from "./webhook-service"
import type { ExchangeIntegration } from "@/types/integration.types"

interface ExecutionContext {
  variables: Record<string, unknown>
  exchanges: ExchangeIntegration[]
  flowId: string
  executionId: string
}

interface ExecutionResult {
  success: boolean
  output?: unknown
  error?: string
  logs: string[]
}

export class ExecutionEngine {
  private context: ExecutionContext
  private nodes: CustomNode[]
  private edges: Edge[]
  private logs: string[] = []

  constructor(
    flowId: string,
    nodes: CustomNode[],
    edges: Edge[],
    exchanges: ExchangeIntegration[],
    initialVariables: Record<string, unknown> = {},
  ) {
    this.context = {
      variables: initialVariables,
      exchanges,
      flowId,
      executionId: `exec_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
    }
    this.nodes = nodes
    this.edges = edges
  }

  async execute(): Promise<ExecutionResult> {
    try {
      this.log("info", "Starting workflow execution")

      // Find start node
      const startNode = this.nodes.find((node) => node.type === "start")
      if (!startNode) {
        throw new Error("No start node found")
      }

      // Execute from start node
      await this.executeNode(startNode)

      this.log("info", "Workflow execution completed successfully")
      return {
        success: true,
        output: this.context.variables,
        logs: this.logs,
      }
    } catch (error) {
      this.log("error", `Execution failed: ${error instanceof Error ? error.message : "Unknown error"}`)
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        logs: this.logs,
      }
    }
  }

  private async executeNode(node: CustomNode): Promise<void> {
    this.log("info", `Executing node: ${node.id} (type: ${node.type})`)

    switch (node.type) {
      case "start":
        await this.executeStartNode(node)
        break
      case "priceCheck":
        await this.executePriceCheckNode(node)
        break
      case "condition":
        await this.executeConditionNode(node)
        break
      case "placeOrder":
        await this.executePlaceOrderNode(node)
        break
      case "webhook":
        await this.executeWebhookNode(node)
        break
      case "notification":
        await this.executeNotificationNode(node)
        break
      case "delay":
        await this.executeDelayNode(node)
        break
      case "setVariable":
        await this.executeSetVariableNode(node)
        break
      case "message":
        await this.executeMessageNode(node)
        break
      default:
        this.log("warn", `Unknown node type: ${node.type}`)
    }

    // Continue to next nodes
    await this.continueExecution(node.id)
  }

  private async executeStartNode(node: CustomNode): Promise<void> {
    this.log("info", node.data.message || "Workflow started")
  }

  private async executePriceCheckNode(node: CustomNode): Promise<void> {
    const symbol = this.resolveValue(node.data.symbol) as string
    if (!symbol) {
      throw new Error("Price check node missing symbol")
    }

    const priceData = await priceService.getPrice(symbol)
    this.context.variables[`${node.id}_price`] = priceData.price
    this.context.variables[`${node.id}_data`] = priceData

    this.log("info", `Price check: ${symbol} = $${priceData.price}`)
  }

  private async executeConditionNode(node: CustomNode): Promise<void> {
    const leftValue = this.resolveValue(node.data.leftValue)
    const operator = node.data.operator || "=="
    const rightValue = this.resolveValue(node.data.rightValue)

    let result = false

    switch (operator) {
      case "==":
        result = leftValue === rightValue
        break
      case "!=":
        result = leftValue !== rightValue
        break
      case ">":
        result = Number(leftValue) > Number(rightValue)
        break
      case "<":
        result = Number(leftValue) < Number(rightValue)
        break
      case ">=":
        result = Number(leftValue) >= Number(rightValue)
        break
      case "<=":
        result = Number(leftValue) <= Number(rightValue)
        break
    }

    this.context.variables[`${node.id}_result`] = result
    this.log("info", `Condition: ${leftValue} ${operator} ${rightValue} = ${result}`)
  }

  private async executePlaceOrderNode(node: CustomNode): Promise<void> {
    const exchangeId = node.data.exchangeId as string
    const exchange = this.context.exchanges.find((ex) => ex.id === exchangeId)

    if (!exchange) {
      throw new Error(`Exchange not found: ${exchangeId}`)
    }

    if (!exchange.isActive) {
      throw new Error(`Exchange is not active: ${exchange.name}`)
    }

    const exchangeClient = ExchangeFactory.createExchange(exchange.exchange, exchange.apiKey, exchange.apiSecret)

    const orderParams = {
      symbol: this.resolveValue(node.data.symbol) as string,
      side: this.resolveValue(node.data.side) as "buy" | "sell",
      type: this.resolveValue(node.data.orderType) as "market" | "limit",
      amount: Number(this.resolveValue(node.data.amount)),
      price: node.data.price ? Number(this.resolveValue(node.data.price)) : undefined,
    }

    this.log("info", `Placing ${orderParams.side} order: ${orderParams.amount} ${orderParams.symbol}`)

    const order = await exchangeClient.createOrder(orderParams)
    this.context.variables[`${node.id}_order`] = order

    this.log("info", `Order placed successfully: ${order.id}`)
  }

  private async executeWebhookNode(node: CustomNode): Promise<void> {
    const webhookUrl = this.resolveValue(node.data.webhookUrl) as string
    const event = this.resolveValue(node.data.event) as string
    const data = node.data.data || {}

    if (!webhookUrl) {
      throw new Error("Webhook node missing URL")
    }

    const success = await webhookService.sendWebhook(webhookUrl, event, data as Record<string, unknown>)

    if (!success) {
      throw new Error("Failed to send webhook")
    }

    this.log("info", `Webhook sent to ${webhookUrl}`)
  }

  private async executeNotificationNode(node: CustomNode): Promise<void> {
    const message = this.resolveValue(node.data.message) as string
    const channel = node.data.channel || "console"

    this.log("info", `Notification [${channel}]: ${message}`)

    // Here you would integrate with actual notification services
    console.log(`[Notification] ${message}`)
  }

  private async executeDelayNode(node: CustomNode): Promise<void> {
    const delayMs = Number(node.data.delay) || 1000
    this.log("info", `Delaying for ${delayMs}ms`)
    await new Promise((resolve) => setTimeout(resolve, delayMs))
  }

  private async executeSetVariableNode(node: CustomNode): Promise<void> {
    const variableName = node.data.variableName as string
    const value = this.resolveValue(node.data.value)

    if (!variableName) {
      throw new Error("Set variable node missing variable name")
    }

    this.context.variables[variableName] = value
    this.log("info", `Variable set: ${variableName} = ${value}`)
  }

  private async executeMessageNode(node: CustomNode): Promise<void> {
    const message = this.resolveValue(node.data.message) as string
    this.log("info", `Message: ${message}`)
  }

  private async continueExecution(nodeId: string): Promise<void> {
    const outgoingEdges = this.edges.filter((edge) => edge.source === nodeId)

    for (const edge of outgoingEdges) {
      const nextNode = this.nodes.find((node) => node.id === edge.target)
      if (nextNode) {
        // Check if edge has a condition
        if (edge.data?.condition) {
          const conditionResult = this.context.variables[`${nodeId}_result`]
          const shouldExecute =
            (edge.data.condition === "true" && conditionResult === true) ||
            (edge.data.condition === "false" && conditionResult === false)

          if (!shouldExecute) {
            this.log("info", `Skipping edge to ${nextNode.id} (condition not met)`)
            continue
          }
        }

        await this.executeNode(nextNode)
      }
    }
  }

  private resolveValue(value: unknown): unknown {
    if (typeof value === "string" && value.startsWith("{{") && value.endsWith("}}")) {
      // Variable reference
      const variableName = value.slice(2, -2).trim()
      return this.context.variables[variableName]
    }
    return value
  }

  private log(level: "info" | "warn" | "error", message: string): void {
    const timestamp = new Date().toISOString()
    const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`
    this.logs.push(logMessage)
    console.log(`[v0] ${logMessage}`)
  }

  getContext(): ExecutionContext {
    return this.context
  }

  getLogs(): string[] {
    return this.logs
  }
}

"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { CustomNode, TradeExecutionNodeData } from "@/types/node.types"

interface TradeExecutionNodePropertiesEditorProps {
  node: CustomNode
  onUpdate: (updates: Partial<CustomNode>) => void
}

export default function TradeExecutionNodePropertiesEditor({
  node,
  onUpdate,
}: TradeExecutionNodePropertiesEditorProps) {
  const data = node.data as TradeExecutionNodeData

  const handleUpdate = (field: keyof TradeExecutionNodeData, value: string | number) => {
    onUpdate({
      data: {
        ...data,
        [field]: value,
      },
    })
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="action">Action</Label>
        <Select value={data.action} onValueChange={(value) => handleUpdate("action", value as "buy" | "sell")}>
          <SelectTrigger id="action">
            <SelectValue placeholder="Select action" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="buy">Buy</SelectItem>
            <SelectItem value="sell">Sell</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="orderType">Order Type</Label>
        <Select value={data.orderType} onValueChange={(value) => handleUpdate("orderType", value)}>
          <SelectTrigger id="orderType">
            <SelectValue placeholder="Select order type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="market">Market Order</SelectItem>
            <SelectItem value="limit">Limit Order</SelectItem>
            <SelectItem value="stop-loss">Stop Loss</SelectItem>
            <SelectItem value="take-profit">Take Profit</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="tradingPair">Trading Pair</Label>
        <Input
          id="tradingPair"
          value={data.tradingPair}
          onChange={(e) => handleUpdate("tradingPair", e.target.value)}
          placeholder="BTC/USDT"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="exchange">Exchange</Label>
        <Select value={data.exchange} onValueChange={(value) => handleUpdate("exchange", value)}>
          <SelectTrigger id="exchange">
            <SelectValue placeholder="Select exchange" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="binance">Binance</SelectItem>
            <SelectItem value="coinbase">Coinbase</SelectItem>
            <SelectItem value="kraken">Kraken</SelectItem>
            <SelectItem value="bybit">Bybit</SelectItem>
            <SelectItem value="okx">OKX</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="amountType">Amount Type</Label>
        <Select value={data.amountType} onValueChange={(value) => handleUpdate("amountType", value)}>
          <SelectTrigger id="amountType">
            <SelectValue placeholder="Select amount type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="fixed">Fixed Amount</SelectItem>
            <SelectItem value="percentage">Percentage of Portfolio</SelectItem>
            <SelectItem value="all">All Available</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="amount">Amount</Label>
        <Input
          id="amount"
          type="number"
          value={data.amount}
          onChange={(e) => handleUpdate("amount", Number.parseFloat(e.target.value))}
          placeholder="100"
        />
        <p className="text-xs text-muted-foreground">
          {data.amountType === "percentage"
            ? "Percentage of portfolio"
            : data.amountType === "fixed"
              ? "USD amount"
              : "All available funds"}
        </p>
      </div>

      {data.orderType === "limit" && (
        <div className="space-y-2">
          <Label htmlFor="price">Limit Price</Label>
          <Input
            id="price"
            type="number"
            value={data.price || ""}
            onChange={(e) => handleUpdate("price", Number.parseFloat(e.target.value))}
            placeholder="50000"
          />
        </div>
      )}
    </div>
  )
}

"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { CustomNode, MarketMonitorNodeData } from "@/types/node.types"

interface MarketMonitorNodePropertiesEditorProps {
  node: CustomNode
  onUpdate: (updates: Partial<CustomNode>) => void
}

export default function MarketMonitorNodePropertiesEditor({ node, onUpdate }: MarketMonitorNodePropertiesEditorProps) {
  const data = node.data as MarketMonitorNodeData

  const handleUpdate = (field: keyof MarketMonitorNodeData, value: string) => {
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
        <Label htmlFor="timeframe">Timeframe</Label>
        <Select value={data.timeframe} onValueChange={(value) => handleUpdate("timeframe", value)}>
          <SelectTrigger id="timeframe">
            <SelectValue placeholder="Select timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1m">1 Minute</SelectItem>
            <SelectItem value="5m">5 Minutes</SelectItem>
            <SelectItem value="15m">15 Minutes</SelectItem>
            <SelectItem value="1h">1 Hour</SelectItem>
            <SelectItem value="4h">4 Hours</SelectItem>
            <SelectItem value="1d">1 Day</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

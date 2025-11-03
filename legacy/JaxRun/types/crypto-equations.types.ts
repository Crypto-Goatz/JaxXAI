export type CryptoEquationType =
  | "market_cap_prediction"
  | "price_change_percent"
  | "price_gain_1h"
  | "price_gain_24h"
  | "volume_spike"
  | "rsi_calculation"
  | "moving_average"
  | "support_resistance"
  | "profit_loss_percent"
  | "position_size"

export interface CryptoEquation {
  id: string
  type: CryptoEquationType
  name: string
  description: string
  formula: string
  inputs: {
    name: string
    description: string
    type: "number" | "price" | "percentage"
    defaultValue?: number
  }[]
  category: "prediction" | "detection" | "calculation" | "indicator"
  enabled: boolean
  config: Record<string, any>
}

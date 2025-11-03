
export interface Asset {
  id: string;
  ticker: string;
  price: number;
  change24h?: number;
  metrics: { [key: string]: number };
  chartData?: { name: string; value: number }[];
  predictionConfidence?: number;
  profitTargets?: number[];
}

export interface StageData {
  title: string;
  assets: Asset[];
}

export interface HeliusWallet {
  address: string;
  alias: string;
  persona: string;
}

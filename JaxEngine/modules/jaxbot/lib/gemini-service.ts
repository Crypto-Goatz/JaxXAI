import { geminiModel } from "./firebase"

export interface GeminiPrediction {
  asset: string
  currentPrice: number
  horizons: Array<{
    timeframe: string
    direction: string
    confidence: number
    targetPrice?: number
    reasoning: string
  }>
  factors: Array<{
    name: string
    impact: string
    score: number
    description: string
  }>
  patterns?: Array<{
    name: string
    type: string
    reliability: number
  }>
  riskLevel: string
  overallSentiment: string
  keyInsights: string[]
}

export async function generatePredictionWithGemini(asset: string, marketData?: any): Promise<GeminiPrediction> {
  if (!geminiModel) {
    throw new Error("Gemini model not initialized")
  }

  const prompt = `Analyze ${asset} cryptocurrency and provide comprehensive price predictions.

Current market context: ${marketData ? JSON.stringify(marketData) : "Use latest market data"}

Provide a detailed JSON response with:
1. Current price estimate
2. Price predictions for multiple timeframes (15m, 1h, 4h, 1d, 1w)
3. Key factors affecting price (on-chain activity, technical indicators, sentiment, whale activity)
4. Detected chart patterns
5. Risk assessment and overall sentiment
6. Key insights for traders

Format the response as valid JSON matching this structure:
{
  "asset": "${asset}",
  "currentPrice": <number>,
  "horizons": [
    {
      "timeframe": "15m",
      "direction": "UP|DOWN|FLAT",
      "confidence": <0-1>,
      "targetPrice": <number>,
      "reasoning": "<explanation>"
    }
  ],
  "factors": [
    {
      "name": "<factor name>",
      "impact": "positive|negative|neutral",
      "score": <0-1>,
      "description": "<detailed description>"
    }
  ],
  "patterns": [
    {
      "name": "<pattern name>",
      "type": "continuation|reversal",
      "reliability": <0-1>
    }
  ],
  "riskLevel": "low|medium|high",
  "overallSentiment": "bullish|bearish|neutral",
  "keyInsights": ["<insight 1>", "<insight 2>", ...]
}

Provide realistic, data-driven predictions based on current crypto market conditions.`

  try {
    const result = await geminiModel.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    // Extract JSON from response (handle markdown code blocks)
    const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/\{[\s\S]*\}/)
    const jsonText = jsonMatch ? jsonMatch[1] || jsonMatch[0] : text

    const prediction: GeminiPrediction = JSON.parse(jsonText)
    return prediction
  } catch (error) {
    console.error("Gemini prediction error:", error)
    throw error
  }
}

export async function analyzeMarketWithGemini(query: string): Promise<string> {
  if (!geminiModel) {
    throw new Error("Gemini model not initialized")
  }

  try {
    const result = await geminiModel.generateContent(query)
    const response = await result.response
    return response.text()
  } catch (error) {
    console.error("Gemini analysis error:", error)
    throw error
  }
}

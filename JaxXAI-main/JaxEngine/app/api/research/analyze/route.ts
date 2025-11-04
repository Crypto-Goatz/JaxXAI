import { NextResponse } from "next/server";
import { z } from "zod";
import { getOpenAIClient } from "@/lib/openai";

const requestSchema = z.object({
  focus: z.string().optional(),
});

const EMBEDDING_MODEL = "text-embedding-3-large";
const ANALYST_MODEL = "gpt-4.1-mini";

async function fetchJaxDexSnapshot() {
  const base = process.env.JAXENGINE_API_BASE_URL;
  if (!base) {
    throw new Error("JAXENGINE_API_BASE_URL is not configured. Unable to fetch the JaxDex index.");
  }
  const response = await fetch(`${base}/api/jaxdex-index`);
  if (!response.ok) {
    throw new Error(`Failed to fetch JaxDex snapshot (${response.status}).`);
  }
  return response.json();
}

function buildContextLines(feed: any) {
  const lines: string[] = [];
  const meta = feed?.meta;
  if (meta) {
    lines.push(`Stage: ${meta.stage} | Confidence: ${meta.confidence} | Filters: ${(meta.filters || [])
      .map((f: any) => `${f.label ?? "Unknown"}: ${f.value}`)
      .join("; ")}`);
  }
  for (const entry of feed?.tickers ?? []) {
    lines.push(
      `${entry.symbol || entry.ticker} | Price: ${entry.price} | Change: ${entry.change ?? "n/a"} | Source: ${feed?.source}`
    );
  }
  return lines;
}

async function rankContexts(lines: string[], query: string) {
  const client = getOpenAIClient();
  const inputs = [query, ...lines];
  const result = await client.embeddings.create({
    model: EMBEDDING_MODEL,
    input: inputs,
  });

  const queryVector = result.data[0].embedding;
  const scored = lines.map((line, index) => {
    const vector = result.data[index + 1].embedding;
    const score = dot(queryVector, vector);
    return { line, score };
  });

  return scored.sort((a, b) => b.score - a.score).slice(0, 8);
}

function dot(a: number[], b: number[]) {
  return a.reduce((sum, value, index) => sum + value * (b[index] ?? 0), 0);
}

export async function POST(request: Request) {
  let payload: z.infer<typeof requestSchema>;
  try {
    const json = await request.json();
    payload = requestSchema.parse(json);
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  try {
    const feed = await fetchJaxDexSnapshot();
    const lines = buildContextLines(feed);
    const focus = payload.focus?.trim() || "crypto market overview";
    const ranked = await rankContexts(lines, focus);
    const client = getOpenAIClient();

    const analystPrompt = `You are JaxAI, a market intelligence analyst. Use the provided market snapshots to create an actionable brief.
Focus: ${focus}
Key observations:
${ranked.map((item) => `- ${item.line}`).join("\n")}
Provide:
1. Market synopsis
2. Cross-signal opportunities
3. Suggested MOD / add-on activations
4. Risk calls`;

    const completion = await client.chat.completions.create({
      model: ANALYST_MODEL,
      messages: [
        {
          role: "system",
          content: "You are a strategic crypto research analyst for advanced traders.",
        },
        {
          role: "user",
          content: analystPrompt,
        },
      ],
    });

    const summary = completion.choices[0]?.message?.content ?? "No summary generated.";

    return NextResponse.json({
      summary,
      focus,
      rankedContext: ranked,
      meta: feed?.meta ?? null,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected research error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

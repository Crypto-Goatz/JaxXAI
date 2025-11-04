import { NextResponse } from "next/server";
import { z } from "zod";
import { getOpenAIClient } from "@/lib/openai";

const requestSchema = z.object({
  window: z.string().default("7d"),
});

async function fetchJaxDexSnapshot() {
  const base = process.env.JAXENGINE_API_BASE_URL;
  if (!base) {
    throw new Error("JAXENGINE_API_BASE_URL is not configured.");
  }
  const response = await fetch(`${base}/api/jaxdex-index`);
  if (!response.ok) {
    throw new Error(`Failed to fetch JaxDex snapshot (${response.status}).`);
  }
  return response.json();
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
    const client = getOpenAIClient();
    const feed = await fetchJaxDexSnapshot();
    const summaryPrompt = `You are the JaxEngine reporting assistant. Create a ${payload.window} performance brief using the supplied index data.
    Include metrics, opportunity radar, risk callouts, and recommended MOD/add-on adjustments.

    Data: ${JSON.stringify(feed)}`;

    const completion = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        { role: "system", content: "Produce concise, executive-ready trading reports." },
        { role: "user", content: summaryPrompt },
      ],
    });

    const narrative = completion.choices[0]?.message?.content ?? "No report generated.";

    const markdown = `# JaxEngine Performance Report (${payload.window})\n\n${narrative}`;

    return NextResponse.json({
      window: payload.window,
      markdown,
      source: feed,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected reporting error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

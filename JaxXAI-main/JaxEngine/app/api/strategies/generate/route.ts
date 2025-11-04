import { NextResponse } from "next/server";
import { z } from "zod";
import { getOpenAIClient } from "@/lib/openai";

const requestSchema = z.object({
  language: z.string().default("typescript"),
  objective: z.string(),
});

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
    const { language, objective } = payload;

    const template = `You are JaxBot, the autonomous strategy engineer. Produce:
1. An execution plan (bullet points) referencing MODs/add-ons.
2. A ${language} code sample implementing the core logic. Use realistic variable placeholders.
3. Safety checks for risk controls.

Objective: ${objective}`;

    const completion = await client.chat.completions.create({
      model: "gpt-4.1",
      temperature: 0.3,
      messages: [
        { role: "system", content: "You create production-quality trading strategies for crypto markets." },
        { role: "user", content: template },
      ],
    });

    const content = completion.choices[0]?.message?.content ?? "No strategy generated.";

    return NextResponse.json({ language, objective, content });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error generating strategy";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

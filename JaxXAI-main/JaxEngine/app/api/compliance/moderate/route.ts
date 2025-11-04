import { NextResponse } from "next/server";
import { z } from "zod";
import { getOpenAIClient } from "@/lib/openai";

const requestSchema = z.object({
  content: z.string(),
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
    const moderation = await client.moderations.create({
      model: "omni-moderation-latest",
      input: payload.content,
    });

    const result = moderation.results?.[0];

    return NextResponse.json({
      flagged: result?.flagged ?? false,
      categories: result?.categories,
      category_scores: result?.category_scores,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Moderation request failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

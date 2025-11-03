import { NextResponse } from "next/server";
import { z } from "zod";
import { getOpenAIClient } from "@/lib/openai";

const requestSchema = z.object({
  imageBase64: z.string(),
  prompt: z.string().default("Provide a concise trading insight from this chart."),
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
    const completion = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: payload.prompt,
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/png;base64,${payload.imageBase64}`,
              },
            },
          ],
        },
      ],
    });

    const insight = completion.choices[0]?.message?.content ?? "No insight produced";

    return NextResponse.json({ insight });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Visual analysis failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

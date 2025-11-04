import { NextResponse } from "next/server";
import { z } from "zod";
import { getOpenAIClient } from "@/lib/openai";

const requestSchema = z.object({
  audioBase64: z.string().describe("Base64-encoded audio data"),
  format: z.string().default("mp3"),
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
    const buffer = Buffer.from(payload.audioBase64, "base64");
    const file = new File([buffer], `audio.${payload.format}`, { type: `audio/${payload.format}` });

    const transcription = await client.audio.transcriptions.create({
      file,
      model: "gpt-4o-mini-transcribe",
      response_format: "verbose_json",
    });

    return NextResponse.json({ transcription });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Transcription failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

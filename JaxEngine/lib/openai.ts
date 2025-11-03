import OpenAI from "openai";

let client: OpenAI | null = null;

/**
 * Returns a singleton OpenAI client configured with the project-wide API key.
 * Throws a descriptive error whenever the key has not been configured yet.
 */
export function getOpenAIClient() {
  if (client) {
    return client;
  }

  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error(
      "OPENAI_API_KEY is not configured. Add it to your environment (e.g., .env.local or Vercel env vars) before calling the assistant."
    );
  }

  client = new OpenAI({
    apiKey,
  });

  return client;
}


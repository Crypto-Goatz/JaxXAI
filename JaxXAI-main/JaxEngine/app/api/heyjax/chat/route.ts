import { NextResponse } from "next/server";
import { z } from "zod";
import { getOpenAIClient } from "@/lib/openai";

const messageSchema = z.object({
  role: z.enum(["system", "user", "assistant", "tool"]),
  content: z.string(),
  tool_call_id: z.string().optional(),
});

const requestSchema = z.object({
  messages: z.array(messageSchema),
});

const TOOL_DEFINITIONS = [
  {
    type: "function",
    function: {
      name: "create_connect_account",
      description: "Create a Stripe Connect account with optional email and country",
      parameters: {
        type: "object",
        properties: {
          email: {
            type: "string",
            description: "Email address of the connected account owner.",
          },
          country: {
            type: "string",
            description: "Two-letter ISO country code. Defaults to US if omitted.",
          },
        },
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_account_status",
      description: "Retrieve the current onboarding status for a connected account",
      parameters: {
        type: "object",
        properties: {
          accountId: {
            type: "string",
            description: "Stripe connected account ID (acct_...).",
          },
        },
        required: ["accountId"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "create_connected_product",
      description: "Create a product on the connected account with default pricing data",
      parameters: {
        type: "object",
        properties: {
          accountId: { type: "string" },
          name: { type: "string" },
          description: { type: "string" },
          price: { type: "number", description: "Price in major units (e.g. 49.99)." },
          currency: { type: "string", description: "Currency code in lower-case, e.g. usd." },
        },
        required: ["accountId", "name", "price"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "start_checkout_session",
      description: "Create a hosted Checkout Session for a connected account product",
      parameters: {
        type: "object",
        properties: {
          accountId: { type: "string" },
          productId: { type: "string" },
          quantity: { type: "number", description: "Quantity of product being purchased." },
        },
        required: ["accountId", "productId"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "generate_market_research",
      description: "Create a research brief using the latest JaxDex index and any stored context.",
      parameters: {
        type: "object",
        properties: {
          focus: {
            type: "string",
            description: "Optional focus area, such as a ticker or trading theme.",
          },
        },
      },
    },
  },
  {
    type: "function",
    function: {
      name: "generate_strategy_code",
      description: "Generate starter code for a trading strategy in a requested language",
      parameters: {
        type: "object",
        properties: {
          language: { type: "string", description: "Language like typescript, python, rust" },
          objective: { type: "string", description: "Plain language description of the trading goal." },
        },
        required: ["language", "objective"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "generate_performance_report",
      description: "Summarise portfolio or MOD performance over a requested window.",
      parameters: {
        type: "object",
        properties: {
          window: {
            type: "string",
            description: "Reporting window such as '7d', '30d', or 'custom'.",
          },
        },
      },
    },
  },
  {
    type: "function",
    function: {
      name: "moderate_input",
      description: "Screen text for compliance or policy issues using the moderation endpoint.",
      parameters: {
        type: "object",
        properties: {
          content: { type: "string" },
        },
        required: ["content"],
      },
    },
  },
];

function getApiBaseUrl() {
  const candidates = [
    process.env.JAXENGINE_API_BASE_URL,
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.SITE_URL,
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined,
  ].filter(Boolean) as string[];

  const base = candidates.find((value) => value && value.length > 0);
  if (!base) {
    throw new Error(
      "Set JAXENGINE_API_BASE_URL (or NEXT_PUBLIC_SITE_URL/VERCEL_URL) so internal tools can reach API routes.",
    );
  }

  return base.endsWith("/") ? base.slice(0, -1) : base;
}

async function callInternalApi(path: string, init?: RequestInit) {
  const base = getApiBaseUrl();
  const url = `${base}${path}`;
  const response = await fetch(url, init);
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data?.error || `Internal API call failed with status ${response.status}`);
  }
  return data;
}

const toolExecutor = {
  async create_connect_account(args: Record<string, unknown>) {
    return callInternalApi("/api/connect/create-account", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: args.email,
        country: args.country,
      }),
    });
  },
  async get_account_status(args: Record<string, unknown>) {
    const accountId = args.accountId as string | undefined;
    if (!accountId) {
      throw new Error("accountId is required");
    }
    return callInternalApi(`/api/connect/account-status?accountId=${encodeURIComponent(accountId)}`);
  },
  async create_connected_product(args: Record<string, unknown>) {
    const accountId = args.accountId as string | undefined;
    if (!accountId) {
      throw new Error("accountId is required");
    }
    return callInternalApi("/api/connect/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        accountId,
        name: args.name,
        description: args.description,
        price: args.price,
        currency: args.currency,
      }),
    });
  },
  async start_checkout_session(args: Record<string, unknown>) {
    const accountId = args.accountId as string | undefined;
    const productId = args.productId as string | undefined;
    if (!accountId || !productId) {
      throw new Error("accountId and productId are required");
    }
    return callInternalApi("/api/connect/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        accountId,
        productId,
        quantity: args.quantity ?? 1,
      }),
    });
  },
  async generate_market_research(args: Record<string, unknown>) {
    return callInternalApi("/api/research/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ focus: args.focus }),
    });
  },
  async generate_strategy_code(args: Record<string, unknown>) {
    return callInternalApi("/api/strategies/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        language: args.language,
        objective: args.objective,
      }),
    });
  },
  async generate_performance_report(args: Record<string, unknown>) {
    return callInternalApi("/api/reports/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ window: args.window }),
    });
  },
  async moderate_input(args: Record<string, unknown>) {
    return callInternalApi("/api/compliance/moderate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: args.content }),
    });
  },
} as const;

type ToolName = keyof typeof toolExecutor;

export async function POST(request: Request) {
  let payload: z.infer<typeof requestSchema>;

  try {
    const json = await request.json();
    payload = requestSchema.parse(json);
  } catch (error) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const client = getOpenAIClient();
  const openAiMessages = payload.messages.map((message) => ({
    role: message.role,
    content: message.content,
  }));

  const systemPrompt = `You are Hey Jax, the operations copilot for JaxEngine. You have direct access to internal APIs via tools.
- Always confirm before executing high-impact actions.
- Provide concise updates after running each tool.
- Default currency is USD if not specified.
- Present final answers with actionable next steps.`;

  const conversation = [{ role: "system" as const, content: systemPrompt }, ...openAiMessages];

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: conversation,
      tools: TOOL_DEFINITIONS,
      tool_choice: "auto",
    });

    const message = completion.choices[0]?.message;

    if (!message) {
      return NextResponse.json({ error: "Assistant returned an empty response." }, { status: 500 });
    }

    const toolCalls = message.tool_calls ?? [];

    if (toolCalls.length === 0) {
      return NextResponse.json({ reply: message.content, toolExecutions: [] });
    }

    const executions: Array<{ id: string; name: string; result: unknown }> = [];
    const followUpMessages = [...conversation, { role: "assistant" as const, content: message.content ?? "" }];

    for (const toolCall of toolCalls) {
      const name = toolCall.function.name as ToolName;
      const argsString = toolCall.function.arguments ?? "{}";
      const args = JSON.parse(argsString || "{}");

      if (!(name in toolExecutor)) {
        executions.push({ id: toolCall.id, name, result: { error: "Unsupported tool" } });
        followUpMessages.push({
          role: "tool" as const,
          tool_call_id: toolCall.id,
          content: JSON.stringify({ error: `Tool ${name} is not implemented.` }),
        });
        continue;
      }

      try {
        const result = await toolExecutor[name](args);
        executions.push({ id: toolCall.id, name, result });
        followUpMessages.push({
          role: "tool" as const,
          tool_call_id: toolCall.id,
          content: JSON.stringify(result),
        });
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown tool execution error";
        executions.push({ id: toolCall.id, name, result: { error: message } });
        followUpMessages.push({
          role: "tool" as const,
          tool_call_id: toolCall.id,
          content: JSON.stringify({ error: message }),
        });
      }
    }

    const followUp = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: followUpMessages,
    });

    const finalMessage = followUp.choices[0]?.message?.content ?? "Operation complete.";

    return NextResponse.json({ reply: finalMessage, toolExecutions: executions });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected assistant error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

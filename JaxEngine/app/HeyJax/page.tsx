"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import Link from "next/link";
import clsx from "clsx";

const samplePrompts = [
  "Spin up a Tier 2 trading workspace with fresh BigQuery datasets.",
  "Run a Solana swap simulation with a $1,000 notional and capture the tx hash.",
  "Sync the latest Stripe activity and highlight churn-risk cohorts.",
];

type Message = {
  role: "user" | "assistant" | "tool";
  content: string;
  tool_call_id?: string;
};

type ToolExecution = {
  id: string;
  name: string;
  result: unknown;
};

export default function HeyJaxPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hey, I’m wired into Stripe, Firestore, Solana, and the JaxDex index. How can I help orchestrate your next play?",
    },
  ]);
  const [pending, setPending] = useState(false);
  const [input, setInput] = useState("");
  const [executions, setExecutions] = useState<ToolExecution[]>([]);
  const viewportRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      viewportRef.current?.scrollTo({ top: viewportRef.current.scrollHeight, behavior: "smooth" });
    });
  }, []);

  const messagePayload = useMemo(
    () =>
      messages.map((message) => ({
        role: message.role,
        content: message.content,
        ...(message.tool_call_id ? { tool_call_id: message.tool_call_id } : {}),
      })),
    [messages]
  );

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || pending) return;
      const userMessage: Message = { role: "user", content };
      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      setPending(true);
      setInput("");
      scrollToBottom();

      try {
        const response = await fetch("/api/heyjax/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: [...messagePayload, userMessage] }),
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.error || "Chat request failed");
        }

        const assistantMessage: Message = { role: "assistant", content: data.reply };
        setMessages((prev) => [...prev, userMessage, assistantMessage]);
        if (Array.isArray(data.toolExecutions)) {
          setExecutions(data.toolExecutions);
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unexpected error";
        setMessages((prev) => [
          ...prev,
          userMessage,
          { role: "assistant", content: `I hit an error executing that command: ${message}` },
        ]);
      } finally {
        setPending(false);
        scrollToBottom();
      }
    },
    [messagePayload, messages, pending, scrollToBottom]
  );

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      sendMessage(input);
    },
    [input, sendMessage]
  );

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100 sm:px-6">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        <header className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-emerald-500/10">
          <p className="text-xs uppercase tracking-wide text-slate-500">Jax-Hello</p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-100">Hey Jax Assistant</h1>
          <p className="mt-3 text-sm text-slate-400">
            Natural language ops for JaxEngine. I can wire up Stripe Connect flows, spin MODs, summarise the JaxDex feed,
            generate strategy code, and draft compliance responses. Commands execute through the same service account
            that powers the Market Alchemist console.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-400">
            <Link
              href="/YOLO/connect-demo"
              className="inline-flex items-center rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-200 transition hover:border-emerald-400 hover:bg-emerald-500/20"
            >
              Open Stripe Connect Lab
            </Link>
            <Link
              href="/jaxbot"
              className="inline-flex items-center rounded-xl border border-slate-800 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-emerald-500 hover:text-emerald-200"
            >
              Launch JaxBot
            </Link>
            <Link
              href="/YOLO"
              className="inline-flex items-center rounded-xl border border-slate-800 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-emerald-500 hover:text-emerald-200"
            >
              Back to Control Room
            </Link>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
          <div className="flex h-[520px] flex-col rounded-3xl border border-slate-800 bg-slate-900/70 shadow-inner shadow-emerald-500/10">
            <div ref={viewportRef} className="flex-1 overflow-y-auto p-5">
              <div className="flex flex-col gap-4">
                {messages.map((message, index) => (
                  <div
                    key={`${message.role}-${index}`}
                    className={clsx("rounded-2xl border px-4 py-3 text-sm", {
                      "self-start border-slate-800 bg-slate-950/60 text-slate-200": message.role !== "user",
                      "self-end border-emerald-500/50 bg-emerald-500/10 text-emerald-200": message.role === "user",
                    })}
                  >
                    <p className="text-xs uppercase tracking-wide text-slate-500">
                      {message.role === "assistant" ? "Hey Jax" : message.role === "tool" ? "Automation" : "You"}
                    </p>
                    <p className="mt-1 whitespace-pre-wrap leading-relaxed">{message.content}</p>
                  </div>
                ))}
                {pending && (
                  <div className="self-start rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-slate-400">
                    Running automations…
                  </div>
                )}
              </div>
            </div>
            <form onSubmit={handleSubmit} className="border-t border-slate-800 p-4">
              <div className="flex items-end gap-3">
                <textarea
                  className="h-24 flex-1 resize-none rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100 focus:border-emerald-500 focus:outline-none"
                  placeholder="Ask Hey Jax to orchestrate something…"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                />
                <button
                  type="submit"
                  disabled={pending}
                  className="rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-emerald-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {pending ? "Thinking" : "Send"}
                </button>
              </div>
            </form>
          </div>

          <aside className="flex flex-col gap-6">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-4 text-sm text-slate-300">
              <h3 className="text-sm font-semibold text-slate-100">Quick start</h3>
              <p className="mt-2 text-xs text-slate-500">
                Fire any of these prompts to see how Hey Jax chains Connect, Firestore, and swap automations.
              </p>
              <div className="mt-3 space-y-2">
                {samplePrompts.map((prompt) => (
                  <button
                    type="button"
                    key={prompt}
                    onClick={() => sendMessage(prompt)}
                    className="w-full rounded-2xl border border-slate-800 bg-slate-950/60 px-3 py-2 text-left text-xs font-semibold text-slate-300 transition hover:border-emerald-500 hover:text-emerald-200"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-4 text-sm text-slate-300">
              <h3 className="text-sm font-semibold text-slate-100">Tool executions</h3>
              {executions.length === 0 ? (
                <p className="mt-2 text-xs text-slate-500">Tool responses will appear here when actions run.</p>
              ) : (
                <ul className="mt-3 space-y-3 text-xs text-slate-200">
                  {executions.map((execution) => (
                    <li key={execution.id} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-3">
                      <p className="font-semibold text-slate-100">{execution.name}</p>
                      <pre className="mt-2 max-h-40 overflow-auto rounded-xl bg-slate-950/80 p-3 text-[11px] text-emerald-300">
                        {JSON.stringify(execution.result, null, 2)}
                      </pre>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-4 text-sm text-slate-300">
              <h3 className="text-sm font-semibold text-slate-100">API surface</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-400">
                Hey Jax invokes serverless routes in <code className="rounded bg-slate-800 px-1 py-0.5 text-[10px]">/api</code> using the OpenAI function calling
                pattern. Extend the toolset by adding new routes and declaring them in <code className="rounded bg-slate-800 px-1 py-0.5 text-[10px]">/api/heyjax/chat</code>.
              </p>
            </div>
          </aside>
        </section>
      </div>
    </div>
  );
}

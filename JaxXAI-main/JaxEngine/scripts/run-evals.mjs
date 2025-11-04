import fs from "node:fs";
import path from "node:path";
import OpenAI from "openai";

const datasetPath = process.env.OPENAI_EVAL_DATASET_PATH ?? "./openai-evals/dataset.json";
const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  console.error("OPENAI_API_KEY is not set.\nSet it in your environment before running evals.");
  process.exit(1);
}

const absolutePath = path.resolve(process.cwd(), datasetPath);

if (!fs.existsSync(absolutePath)) {
  console.error(`Eval dataset not found at ${absolutePath}. Update OPENAI_EVAL_DATASET_PATH or create the file.`);
  process.exit(1);
}

const raw = fs.readFileSync(absolutePath, "utf-8");
const records = JSON.parse(raw);

const client = new OpenAI({ apiKey });

async function run() {
  console.log(`Running ${records.length} eval prompts using gpt-4.1-mini...`);
  const results = [];

  for (const record of records) {
    const completion = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        { role: "system", content: "You are the JaxEngine copilot." },
        { role: "user", content: record.prompt },
      ],
    });

    const answer = completion.choices[0]?.message?.content ?? "";
    const passed = answer.toLowerCase().includes(record.expectation.split(" ")[0]?.toLowerCase() ?? "");
    results.push({ prompt: record.prompt, expectation: record.expectation, answer, passed });
  }

  const summary = {
    total: results.length,
    passed: results.filter((item) => item.passed).length,
    failed: results.filter((item) => !item.passed).length,
  };

  console.table(results.map(({ prompt, passed }) => ({ prompt, passed })));
  console.log(summary);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});

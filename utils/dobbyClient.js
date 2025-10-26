import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export async function callDobby(prompt, type = "debug") {
  let systemPrompt = "";

  if (type === "debug") {
    systemPrompt = `You are Dobby, a helpful debugging assistant.
Task: Only provide the minimal fix for the code or error.
Do NOT explain, do NOT add extra tips, do NOT repeat yourself.
Output the fixed code only, in a code block if possible.
User input: ${prompt}`;
  } else if (type === "explain") {
    systemPrompt = `You are Dobby, a helpful assistant.
Explain the code in simple terms without adding extra suggestions.
User input: ${prompt}`;
  } else if (type === "optimize") {
    systemPrompt = `You are Dobby, a code optimizer.
Optimize the code for performance and readability only.
Do NOT add extra commentary.
User input: ${prompt}`;
  }

  try {
    const response = await axios.post(
      "https://api.fireworks.ai/inference/v1/completions",
      {
        model: "accounts/sentientfoundation-serverless/models/dobby-mini-unhinged-plus-llama-3-1-8b",
        prompt: systemPrompt,
        max_tokens: 300,
        temperature: 0.2,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.FIREWORKS_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.choices?.[0]?.text?.trim() || "Dobby couldn't generate a response 😢";
  } catch (err) {
    console.error("🔥 Fireworks API error:", err.response?.data || err.message);
    return "⚠️ Dobby failed to respond!";
  }
}

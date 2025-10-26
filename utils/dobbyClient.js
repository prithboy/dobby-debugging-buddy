import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

export async function queryDobby(code) {
  const response = await fetch("https://api.fireworks.ai/inference/v1/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.FIREWORKS_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "accounts/sentientfoundation-serverless/models/dobby-mini-unhinged-plus-llama-3-1-8b",
      prompt: `Fix this code and explain it:\n\n${code}\n\nReturn both corrected code and explanation.`,
      max_tokens: 1500,
      temperature: 0.7,
    }),
  });

  const data = await response.json();
  return data.choices?.[0]?.text?.trim() || "No response from model.";
}

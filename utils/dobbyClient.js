import fetch from "node-fetch";

export async function queryDobby(prompt) {
  const response = await fetch(
    "https://api.fireworks.ai/inference/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.FIREWORKS_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "accounts/sentientfoundation-serverless/models/dobby-mini-unhinged-plus-llama-3-1-8b",
        messages: [
          {
            role: "system",
            content: "You are Dobby Debugging Buddy — a coding assistant that fixes errors and explains code.",
          },
          { role: "user", content: prompt },
        ],
      }),
    }
  );

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "⚠️ Dobby did not respond.";
}

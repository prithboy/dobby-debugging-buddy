import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export async function callDobby(prompt) {
  try {
    const response = await axios.post(
      "https://api.fireworks.ai/inference/v1/completions",
      {
        model: "accounts/sentientfoundation-serverless/models/dobby-mini-unhinged-plus-llama-3-1-8b",
        prompt: `You are Dobby, a witty debugging assistant. Help the user with the following:\n${prompt}`,
        max_tokens: 512,
        temperature: 0.5,
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

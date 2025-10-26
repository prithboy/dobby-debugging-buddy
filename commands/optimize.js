import { callDobby } from "../utils/dobbyClient.js";

export default {
  name: "optimize",
  description: "Optimizes code for performance or readability",
  async execute(message, args) {
    if (!args) return message.reply("Please provide code to optimize.");

    const prompt = `Optimize this code for performance and readability:\n${args}`;
    const reply = await callDobby(prompt);

    const chunks = reply.match(/[\s\S]{1,1900}/g) || [];
    for (const chunk of chunks) {
      await message.reply(chunk);
    }
  },
};


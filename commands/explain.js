import { callDobby } from "../utils/dobbyClient.js";

export default {
  name: "explain",
  description: "Explains what the code does",
  async execute(message, args) {
    if (!args) return message.reply("Please provide code to explain.");

    const prompt = `Explain what this code does in simple terms:\n${args}`;
    const reply = await callDobby(prompt);

    const chunks = reply.match(/[\s\S]{1,1900}/g) || [];
    for (const chunk of chunks) {
      await message.reply(chunk);
    }
  },
};

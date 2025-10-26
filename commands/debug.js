import { callDobby } from "../utils/dobbyClient.js";

export default {
  name: "debug",
  description: "Fixes code errors",
  async execute(message, args) {
    if (!args) return message.reply("Please provide code or error to debug.");

    const prompt = `Debug this code/error:\n${args}`;
    const reply = await callDobby(prompt);

    const chunks = reply.match(/[\s\S]{1,1900}/g) || [];
    for (const chunk of chunks) {
      await message.reply(chunk);
    }
  },
};

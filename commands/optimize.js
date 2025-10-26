import { callDobby } from "../utils/dobbyClient.js";

async function keepTyping(channel, callback) {
  const interval = setInterval(() => {
    channel.sendTyping().catch(() => {});
  }, 9000);
  try {
    return await callback();
  } finally {
    clearInterval(interval);
  }
}

export default {
  name: "optimize",
  description: "Optimize code",
  async execute(interaction, args) {
    const code = args;
    if (!code) return interaction.reply("Please provide code to optimize.");

    const reply = await keepTyping(interaction.channel, async () => {
      return await callDobby(code, "optimize");
    });

    const chunks = reply.match(/[\s\S]{1,1900}/g) || [];
    for (const chunk of chunks) {
      await interaction.followUp(chunk);
    }
  },
};

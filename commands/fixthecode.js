import { SlashCommandBuilder } from "discord.js";
import { queryDobby } from "../utils/dobbyClient.js";
import { userCodeMemory } from "./pastecode.js";

export const data = new SlashCommandBuilder()
  .setName("fixthecode")
  .setDescription("Ask Dobby to fix your last pasted code and explain it.");

export async function execute(interaction) {
  await interaction.deferReply();

  const userId = interaction.user.id;
  const code = userCodeMemory.get(userId);

  if (!code) {
    await interaction.editReply("❌ No code found! Use `/pastecode` first.");
    return;
  }

  const prompt = `
You are Dobby Debugging Buddy. Fix this code and explain what was wrong and how you fixed it. 
Only return:
1. Fixed code (inside a code block)
2. Short explanation
-----------------------
${code}
`;

  const response = await queryDobby(prompt);
  await interaction.editReply(response);
}

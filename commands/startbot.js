import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("startbot")
  .setDescription("Check if Dobby Debugging Buddy is online!");

export async function execute(interaction) {
  await interaction.reply("🧠 Dobby Debugging Buddy is alive and ready to fix your code!");
}

import { SlashCommandBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("startbot")
    .setDescription("Confirms Dobby Debugging Buddy is running"),
  async execute(interaction) {
    await interaction.editreply("✅ Dobby Debugging Buddy is running and ready to debug!");
  },
};

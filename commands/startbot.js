import { SlashCommandBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("startbot")
    .setDescription("Check if Dobby Debugging Buddy is online"),
  async execute(interaction) {
    await interaction.editReply("✅ Dobby Debugging Buddy is online!");
  },
};

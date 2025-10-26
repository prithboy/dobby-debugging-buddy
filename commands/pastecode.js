import { SlashCommandBuilder } from "discord.js";

export let storedCode = "";

export default {
  data: new SlashCommandBuilder()
    .setName("pastecode")
    .setDescription("Paste broken code to fix")
    .addStringOption(option =>
      option.setName("code")
            .setDescription("Your broken code")
            .setRequired(true)
    ),
  async execute(interaction) {
    storedCode = interaction.options.getString("code");
    await interaction.editReply("📝 Code saved for fixing!");
  },
};

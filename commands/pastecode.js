import { SlashCommandBuilder } from "discord.js";

let savedCode = "";

export default {
  data: new SlashCommandBuilder()
    .setName("pastecode")
    .setDescription("Paste your broken code so Dobby can fix it")
    .addStringOption(option =>
      option.setName("code").setDescription("Your broken code").setRequired(true)
    ),
  async execute(interaction) {
    savedCode = interaction.options.getString("code");
    await interaction.editreply("🧠 Code received! Now run `/fixthecode` to debug it.");
  },
};

export { savedCode };

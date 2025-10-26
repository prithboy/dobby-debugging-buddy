import { SlashCommandBuilder } from "discord.js";

const userCodeMemory = new Map();

export const data = new SlashCommandBuilder()
  .setName("pastecode")
  .setDescription("Paste your broken code for Dobby to fix later.")
  .addStringOption(option =>
    option
      .setName("code")
      .setDescription("Your broken or buggy code")
      .setRequired(true)
  );

export async function execute(interaction) {
  const code = interaction.options.getString("code");
  userCodeMemory.set(interaction.user.id, code);

  await interaction.reply("📝 Code saved! Use `/fixthecode` when you’re ready for Dobby to fix it.");
}

export { userCodeMemory };

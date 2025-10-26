import { SlashCommandBuilder } from "discord.js";
import { queryDobby } from "../utils/dobbyClient.js";
import { savedCode } from "./pastecode.js";

export default {
  data: new SlashCommandBuilder()
    .setName("fixthecode")
    .setDescription("Fixes the pasted code using Dobby 70B model"),
  async execute(interaction) {
    await interaction.deferReply();

    if (!savedCode) {
      await interaction.editReply("⚠️ Please use `/pastecode` first to provide your code.");
      return;
    }

    const prompt = `Fix the following broken code and explain the fixes clearly:\n\n${savedCode}`;
    const response = await queryDobby(prompt);

    await interaction.editReply(response);
  },
};

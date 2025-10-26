import { SlashCommandBuilder } from "discord.js";
import { storedCode } from "./pastecode.js";
import { queryDobby } from "../utils/dobbyClient.js";

export default {
  data: new SlashCommandBuilder()
    .setName("fixthecode")
    .setDescription("Fix broken code and explain it"),
  async execute(interaction) {
    if (!storedCode) {
      await interaction.editReply("⚠️ Use `/pastecode` first to provide code.");
      return;
    }
    const result = await queryDobby(`Fix this code and explain: \n${storedCode}`);
    await interaction.editReply(result);
  },
};

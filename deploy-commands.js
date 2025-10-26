import { REST, Routes, SlashCommandBuilder } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();

const commands = [
  new SlashCommandBuilder()
    .setName('debug')
    .setDescription('Fix code errors')
    .addStringOption(option => 
      option.setName('code')
            .setDescription('Enter the code or error to debug')
            .setRequired(true)
    ),
  new SlashCommandBuilder()
    .setName('explain')
    .setDescription('Explain code')
    .addStringOption(option => 
      option.setName('code')
            .setDescription('Enter the code to explain')
            .setRequired(true)
    ),
  new SlashCommandBuilder()
    .setName('optimize')
    .setDescription('Optimize code')
    .addStringOption(option => 
      option.setName('code')
            .setDescription('Enter the code to optimize')
            .setRequired(true)
    ),
].map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log('⏳ Registering slash commands...');
    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands }
    );
    console.log('✅ Slash commands registered!');
  } catch (err) {
    console.error(err);
  }
})();

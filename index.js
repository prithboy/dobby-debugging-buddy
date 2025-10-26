import fs from "fs";
import { Client, GatewayIntentBits, Events } from "discord.js";
import dotenv from "dotenv";
dotenv.config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

// Load commands
const commands = new Map();
const commandFiles = fs.readdirSync("./commands").filter(f => f.endsWith(".js"));
for (const file of commandFiles) {
  const cmd = await import(`./commands/${file}`);
  commands.set(cmd.default.name, cmd.default);
}

client.once("ready", () => {
  console.log(`🤖 Dobby Debugging Buddy online as ${client.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const code = interaction.options.getString('code');

  await interaction.deferReply(); // shows typing

  if (!commands.has(interaction.commandName)) {
    return interaction.followUp("Unknown command!");
  }

  try {
    await commands.get(interaction.commandName).execute(interaction, code);
  } catch (err) {
    console.error(err);
    interaction.followUp("⚠️ Something went wrong while executing the command.");
  }
});

client.login(process.env.DISCORD_TOKEN);

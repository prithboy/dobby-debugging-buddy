import fs from "fs";
import { Client, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";
dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
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

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  const command = commands.get(interaction.commandName);
  if (!command) return;

  try {
    // Immediately acknowledge the command to prevent timeout
    await interaction.deferReply();
    await command.execute(interaction);
  } catch (error) {
    console.error("Error executing command:", error);
    await interaction.editReply("⚠️ Oops, something went wrong.");
  }
});

client.login(process.env.DISCORD_TOKEN);

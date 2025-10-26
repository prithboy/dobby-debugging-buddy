import { Client, Collection, GatewayIntentBits } from "discord.js";
import fs from "fs";
import path from "path";
import "dotenv/config";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

const commandsPath = path.join(process.cwd(), "commands");
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = await import(`./commands/${file}`);
  if (!command.default?.data) continue;
  client.commands.set(command.default.data.name, command.default);
}

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await interaction.deferReply(); // immediately acknowledge
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.editReply("⚠️ Error executing command.");
  }
});

client.once("ready", () => {
  console.log(`🤖 Dobby Debugging Buddy online as ${client.user.tag}`);
});

client.login(process.env.DISCORD_TOKEN);

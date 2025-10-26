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

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith("!")) return;

  const args = message.content.slice(1).split(/ +/);
  const cmdName = args.shift().toLowerCase();

  if (!commands.has(cmdName)) return;

  try {
    await commands.get(cmdName).execute(message, args.join(" "));
  } catch (err) {
    console.error(err);
    message.reply("⚠️ Something went wrong while executing the command.");
  }
});

client.login(process.env.DISCORD_TOKEN);

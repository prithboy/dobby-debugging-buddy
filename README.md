## 🧩 Dobby Debugging Buddy - run locally
This bot fixes broken code, explains it, and helps developers debug faster. Paste your broken code, and Dobby returns **fixed, error-free code with explanations**.

* Analyses your code
* fixes error in seconds 
* easy coding experience
* You can add this bot to your discord servers and use it for debugging codes

## 🛠️ Requirements
- Node.js v22+
- Discord Bot Token
- Discord Client ID
- Fireworks AI API Key

## Follow the guide to run the bot locally using terminal:

## 1️⃣ Clone the Repository
```bash
git clone https://github.com/prithboy/dobby-debugging-buddy.git
cd dobby-debugging-buddy
```

## 2️⃣ Install Dependencies
```bash
npm install
```

## 3️⃣ Create .env File
Create a .env file in the root folder and add:
```bash
DISCORD_TOKEN=your_discord_bot_token
DISCORD_CLIENT_ID=your_discord_client_id
FIREWORKS_API_KEY=your_fireworks_api_key
```
* Discord bot token & discord client id you can get it from: [Discord Dev Applications](https://discord.com/developers/applications)
* Your API key you can get from: [Fireworks AI](https://app.fireworks.ai/settings/users/api-keys)

## 4️⃣ Deploy Slash Commands
Before running the bot, register the commands with Discord:
```bash
node deploy-commands.js
```

## 5️⃣ Start the bot
```bash
node index.js
```
* you should see:
```bash
🤖 Dobby Debugging Buddy online as <bot_name>#<tag>
```

## 6️⃣ Test the bot in Discord
```bash
/startbot → Bot replies “Dobby Debugging Buddy is online!”

/pastecode → Paste broken code

/fixthecode → Dobby returns fixed code + explanation
```

### Example Broken Code
```bash
const fetchData = async () => {
    const data = await fetch("https://api.example.com/data")
    return data.json() // missing await and semicolon
}

const result = fetchData()
console.log(result.value) // this will throw an error
```
* Use /pastecode → /fixthecode to see Dobby fix it.

### Tips for Local Running
* The bot runs locally, so you must keep your terminal open.
* You can use tools like pm2 to keep it running in the background:
```bash
npm install -g pm2
pm2 start index.js --name "dobby-debugging-buddy"
```

### Now add Bot to your server and use it :
* Visit: [Discord Dev Applications](https://discord.com/developers/applications) and add bot

---

**Made by [prithboy](https://x.com/Prith_boy) for [sentient](https://x.com/SentientAGI)**


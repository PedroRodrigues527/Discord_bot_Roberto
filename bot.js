var fs = require("fs");
const path = require("node:path");
const fetch = require("node-fetch");
const { Intents } = require("discord.js");
const Discord = require("discord.js");
require('dotenv').config();
/* var cron = require("cron"); */

const config = {token: process.env.BOT_TOKEN, prefix: process.env.PREFIX};

const client = new Discord.Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    "GUILDS",
    "GUILD_MESSAGES",
    "GUILD_MEMBERS",
  ],
});
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

const GUILD_ID = "694980762021265455";
const CHANNEL_ID = "694980762021265458";

client.on("ready", (message) => {
  console.log(`BOT online! ${client.user.tag}`);
  client.user.setActivity(
    "AJUDA?? Usa !help para ajudar nos comandos.\nEstou sendo programado ainda :( \n ainda nao sou crescido o suficiente"
  );

  /*   let scheduledMessageBomDia = cronJobDeploy("00 00 09 * * *", "Bom diaa minha gente! <3 ");
  scheduledMessageBomDia.start();

  let scheduledMessageAlmoco = cronJobDeploy("20 30 12 * * *", "Ta na hora de comer papinha!!!!");
  scheduledMessageAlmoco.start();

  let scheduledMessageNoite = cronJobDeploy("20 55 21 * * *", "Ta na hora da naninha!!!!");
  scheduledMessageNoite.start(); */
});

client.on("guildCreate", (guild) => {
  console.log(`Bot entrou no servidor: ${guild.name}`);
  client.user.setActivity(`Estou em ${client.guilds.size} servidores`);
});

client.on("guildDelete", (guild) => {
  console.log(`Bot removido do servidor: ${guild.name}`);
  client.user.setActivity(`Estou em ${client.guilds.size} servidores`);
});

client.on("messageCreate", async (message) => {
  if (message.channel.name == "chatbot") {
    if (message.author.bot) return;
    if (!message.content) return message.channel.send("Please say something.");
    fetch(
      `https://api.affiliateplus.xyz/api/chatbot?message=${encodeURIComponent(
        message.content
      )}&botname=${client.user.username}&ownername=DEVELOPER_NAME`
    )
      .then((res) => res.json())
      .then((data) => {
        message.channel.send(
          `> ${message.content} \n <@${message.author.id}> ${data.message}`
        );
      });
    message.channel.stopTyping();
  }

  for (const file of commandFiles) {
    fileNameFormatted = `${config.prefix}${file.replace(".js", "")}`;

    if (
      message.content === fileNameFormatted ||
      message.content.includes(fileNameFormatted)
    ) {
      const response = require(`./commands/${file.replace(".js", "")}`);

      response.sendMessage(message);
    }
  }
});

client.on("guildMemberAdd", (member) => {
  member.guild.channels.cache
    .get(CHANNEL_ID)
    .send(`<@${member.id}> Bem vindee para este server linde <3!!! :D`);
});

client.login(config.token);

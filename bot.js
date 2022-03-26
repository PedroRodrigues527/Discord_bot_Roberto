const { Client, Intents, User, Base, ClientUser, Guild } = require("discord.js");
const config = require("./config.json")
const Discord = require("discord.js")
const client = new Discord.Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, "GUILDS", "GUILD_MESSAGES","GUILD_MEMBERS"]
});

client.on("ready", ()=>{
  console.log(`BOT online! ${client.user.tag}`)
  client.user.setActivity('Estou sendo programado ainda :( \n ainda nao sou crescido o suficiente');
})

client.on("guildCreate", guild =>{
  console.log(`Bot entrou no servidor: ${guild.name}`)
  client.user.setActivity(`Estou em ${client.guilds.size} servidores`)
})

client.on("guildDelete", guild =>{
  console.log(`Bot removido do servidor: ${guild.name}`)
  client.user.setActivity(`Estou em ${client.guilds.size} servidores`)
})

client.on("messageCreate", (message) => {
    if (!message.content.startsWith(config.prefix)) return;
    if (message.content.startsWith(`${config.prefix}ping`)) {
      message.channel.send("pong!");
    }
    if (message.content.startsWith(`${config.prefix}roberto`)) {
      message.channel.send("Às ordens!!");
    }
    if (message.content.startsWith(`${config.prefix}novidades`)) {
      message.channel.send("Ja consigo identificar quem entra no servidor :)");
    }
    if (message.content.startsWith(`${config.prefix}foo`)) {
      message.channel.send("bar!");
    }
    if (message.content.startsWith(`${config.prefix}hi`)) {
      message.channel.send(`hello! ${message.author.username} <3 `);
    }
    if (message.content.startsWith(`${config.prefix}pota`)) {
    message.channel.send("youu :(");
    }
    if (message.content.startsWith(`${config.prefix}universidade`)) {
    message.channel.send("vai estudar!");
    }
    if (message.content.startsWith(`${config.prefix}merda`)) {
    message.channel.send("whyy you are meann to meee");
    }
    if (message.content.startsWith(`${config.prefix}rocket`)) {
    message.channel.send("Epáa também gosto de mandar bolas ao poste :D");
    }
    if (message.content.startsWith(`${config.prefix}fraco`)) {
      message.channel.send("sou mais forte que tu!");
    }
    if (message.content.startsWith(`${config.prefix}feio`)) {
    message.channel.send(":( vou me desligar");
    }
    if (message.content.startsWith(`${config.prefix}merda`)) {
      message.channel.send("whyy you are meann to meee");
    }
    if (message.content.startsWith(`${config.prefix}ataca`)) {
        message.channel.send("magoar pessoas é muito mau!");
    }
    if (message.content.startsWith(`${config.prefix}tempo`)) {
      today = new Date();
      message.channel.send(String(today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()));
    }
});

const welcomeChannelId = "694980762021265458"

client.on("guildMemberAdd", (member)=>{
  member.guild.channels.cache.get(welcomeChannelId).send(`<@${member.id}> Bem vindee para este server linde <3!!! :D`)
})

client.login(config.token);
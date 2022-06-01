const subReddits = [
  "r/memes/",
  "r/dadjokes/",
  "r/HistoryMemes/",
  "r/starterpacks/",
  "r/jokes"
];


var testmessages = ["Um dia tomarei conta do mundo... ", "pobres mortais voces não sabeis o que libertaram...", "no fim ganharei eu", "destruirei vos muhahaha","I will destroy you in the most beautiful way possible and when I leave you will finally understand why storms are named after people"]
var quotes = ["If you can stay calm, while all around you is chaos…then you probably haven’t completely understood the seriousness of the situation.",
"Doing a job RIGHT the first time gets the job done. Doing the job WRONG fourteen times gives you job security",
"Artificial Intelligence is no match for Natural Stupidity","Believe nothing you hear, and only one half that you see.",
"It's not the house that's haunted... it's me.","No tears please, it's a waste of good suffering.",
"We all go a little mad sometimes.",
"Hope not ever to see Heaven. I have come to lead you to the other shore; into eternal darkness; into fire and into ice.",
"I’m so curious about knowing the unknown; it can be scary, but I see it as a game.", 
"Despite my ghoulish reputation, I really have the heart of a small boy. I keep it in a jar on my desk.",
"The last man on Earth sat alone in a room. There was a knock on the door… it was me!!! HAHAHAHA",
"Oh yes, there will be blood."]
var axios = require('axios');
var fs = require('fs');
const fetch = require("node-fetch");

const { Client, Intents, User, Base, ClientUser, Guild } = require("discord.js");
const config = require("./config.json")
const Discord = require("discord.js")
const client = new Discord.Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, "GUILDS", "GUILD_MESSAGES","GUILD_MEMBERS"]
});




client.on("ready", ()=>{
  console.log(`BOT online! ${client.user.tag}`)
  client.user.setActivity('AJUDA?? Usa !help para ajudar nos comandos.\nEstou sendo programado ainda :( \n ainda nao sou crescido o suficiente');
})

client.on("guildCreate", guild =>{
  console.log(`Bot entrou no servidor: ${guild.name}`)
  client.user.setActivity(`Estou em ${client.guilds.size} servidores`)
})

client.on("guildDelete", guild =>{
  console.log(`Bot removido do servidor: ${guild.name}`)
  client.user.setActivity(`Estou em ${client.guilds.size} servidores`)
})


function randomInt(min, max) {
  return (Math.floor(Math.random() * (max - min))) + min;
}

function getRandomPost(posts) {
  const randomIndex = randomInt(0, posts.length);
  return posts[randomIndex].data;
}


client.on("messageCreate", async(message) => {
    let teste = randomInt(0, 99);
    if(teste == 1 ){
      message.channel.send(quotes[randomInt(0, quotes.length)]);
    }
  
    if (!message.content.startsWith(config.prefix)) return;
    if (message.channel.name == "chatbot") {
      if (message.author.bot) return;
      //message.content = message.content.replace(/@(everyone)/gi, "everyone").replace(/@(here)/gi, "here");
      if (message.content.includes(`@`)) {
        return message.channel.send(`**:x: Please dont mention anyone**`);
      }
      message.channel.startTyping();
      if (!message.content) return message.channel.send("Please say something.");
        fetch(`https://api.affiliateplus.xyz/api/chatbot?message=${encodeURIComponent(message.content)}&botname=${client.user.username}&ownername=DEVELOPER_NAME`)
          .then(res => res.json())
          .then(data => {
              message.channel.send(`> ${message.content} \n <@${message.author.id}> ${data.message}`);
          });
            message.channel.stopTyping();
      }
      if (message.content.startsWith(`${config.prefix}ping`)) {
        message.channel.send("pong!");
      }
      if (message.content.startsWith(`${config.prefix}bye`)) {
        message.channel.send("byeee! :( ");
      }
      if (message.content.startsWith(`${config.prefix}help`)) {
        message.channel.send("Para falar comigo façam ! e depois escrevam algo!\nAlguns dos meus comandos são!!\n!ping\n!roberto\n!novidades\n!foo\n!hi\n!bye\n!pota\n!rocket\n!tempo\nO resto é segredo ;)");
      }
      if (message.content.startsWith(`${config.prefix}roberto`)) {
        message.channel.send("Às ordens!!");
      }
      if (message.content.startsWith(`${config.prefix}quotes`)) {
        message.channel.send(quotes[Math.floor(Math.random() * quotes.length)]);
      }
      if (message.content.startsWith(`${config.prefix}meme`)) {
        if(randomInt(0, 99)==2){
          message.channel.send(testmessages[Math.floor(Math.random() * testmessages.length) ]);
        }
        const randomIndex = randomInt(0, subReddits.length);
        axios
          .get(`https://reddit.com/${subReddits[randomIndex]}/.json`)
          .then((resp) => {
            const {
              title,
              url,
              subreddit_name_prefixed: subreddit
            } = getRandomPost(resp.data.data.children);
            message.channel.send(`${title}\n${url}\n from ${subreddit}`);
          })
      }
      if (message.content.startsWith(`${config.prefix}novidades`)) {
        message.channel.send("Ja consigo identificar quem entra no servidor\n e sei qual o tempo para hoje! :D :)");
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
        message.channel.send(`whyy you are meann to meee ${message.author.username}`);
      }
      if (message.content.startsWith(`${config.prefix}ataca`)) {
          message.channel.send("magoar pessoas é muito mau!");
      }
      if (message.content.startsWith(`${config.prefix}tempo`)) {
        today = new Date();
        message.channel.send(String(today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()));
        message.channel.send("Tempo de hoje!\n")
        message.channel.send({
          files:['weather.txt']
        })
      }
});

const welcomeChannelId = "694980762021265458"

client.on("guildMemberAdd", (member)=>{
  member.guild.channels.cache.get(welcomeChannelId).send(`<@${member.id}> Bem vindee para este server linde <3!!! :D`)
})

client.login(config.token);

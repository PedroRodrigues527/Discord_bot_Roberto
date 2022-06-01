var axios = require('axios');
var fs = require('fs');

const subReddits = [
  "r/memes/",
  "r/dadjokes/",
  "r/HistoryMemes/",
  "r/starterpacks/"
];


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

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function randomInt(min, max) {
  return (Math.floor(Math.random() * (max - min))) + min;
}

function getRandomPost(posts) {
  const randomIndex = randomInt(0, posts.length);
  return posts[randomIndex].data;
}

client.on("messageCreate", async(message) => {
    if (!message.content.startsWith(config.prefix)) return;
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
    /*
    if (message.content.startsWith(`${config.prefix}meme`)) {
      let files = fs.readdirSync(__dirname+'/memes/')
      let chosenFile = files[Math.floor(Math.random() * files.length)] 
      
      message.channel.send({
        files:['./memes/'+chosenFile]
      })
    }*/
    if (message.content.startsWith(`${config.prefix}meme`)) {
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
      message.channel.send(`whyy you are meann to meee ${message.author.username}`);
    }
    if (message.content.startsWith(`${config.prefix}ataca`)) {
        message.channel.send("magoar pessoas é muito mau!");
    }
    if (message.content.startsWith(`${config.prefix}ofendido`)) {
    	let files = fs.readdirSync(__dirname+'/videos/')
	message.channel.send({
		files:['./videos/'+'of.mp4']
	})
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

const subReddits = [
  "r/memes/",
  "r/dadjokes/",
  "r/HistoryMemes/",
  "r/starterpacks/",
  "r/jokes"
];
var testmessages = ["Um dia tomarei conta do mundo... ", 
"pobres mortais voces não sabeis o que libertaram...", 
"no fim ganharei eu", "destruirei vos muhahaha",
"I will destroy you in the most beautiful way possible and when I leave you will finally understand why storms are named after people"]


var axios = require('axios');
var fs = require('fs');
const path = require('node:path');
const fetch = require("node-fetch");
var cron = require("cron");

const { Client, Intents, User, Base, ClientUser, Guild } = require("discord.js");
const config = require("./config.json")
const Discord = require("discord.js");
const client = new Discord.Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, "GUILDS", "GUILD_MESSAGES","GUILD_MEMBERS"]
});

const GUILD_ID = 'SERVER_ID'
const CHANNEL_ID = 'CHANNEL_ID'


client.on("ready", (message)=>{
  console.log(`BOT online! ${client.user.tag}`)
  client.user.setActivity('AJUDA?? Usa !help para ajudar nos comandos.\nEstou sendo programado ainda :( \n ainda nao sou crescido o suficiente');
  let scheduledMessageBomDia = new cron.CronJob('00 00 09 * * *', () => { // SS:MM:HH
       const guild = client.guilds.cache.get(GUILD_ID);
       const channel = guild.channels.cache.get(CHANNEL_ID);
       channel.send('Bom diaa minha gente! <3 ');
  });
  scheduledMessageBomDia.start()

  let scheduledMessageAlmoco = new cron.CronJob('20 30 12 * * *', () => {
        const guild = client.guilds.cache.get(GUILD_ID);
        const channel = guild.channels.cache.get(CHANNEL_ID);
        channel.send('Ta na hora de comer papinha!!!!');
      });
          
  scheduledMessageAlmoco.start()

  let scheduledMessageNoite = new cron.CronJob('20 55 21 * * *', () => {
        const guild = client.guilds.cache.get(GUILD_ID);
        const channel = guild.channels.cache.get(CHANNEL_ID);
        channel.send('Ta na hora da naninha!!!!');
      });
          
  scheduledMessageNoite.start()

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

async function getUserChoices(){
  
  //How many |
  let char = 0;
  let words = [];
  let single_word = "";
  let arrayPosition = 0;
  for(char; char < user_choices.length; char++){
    if(user_choices[char]!="|"){
      single_word = single_word + user_choices[char]
    }
    else if( user_choices[char]=="|" ){
      words[arrayPosition] = single_word;
      arrayPosition++
      single_word = "";
    }
  }

  choice_chosen = words[Math.floor(Math.random() * words.length)]

}

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

client.on("messageCreate", async(message) => {

  
    if (message.channel.name == "chatbot") {
      if (message.author.bot) return;
      if (!message.content) return message.channel.send("Please say something.");
        fetch(`https://api.affiliateplus.xyz/api/chatbot?message=${encodeURIComponent(message.content)}&botname=${client.user.username}&ownername=DEVELOPER_NAME`)
          .then(res => res.json())
          .then(data => {
              message.channel.send(`> ${message.content} \n <@${message.author.id}> ${data.message}`);
          });
            message.channel.stopTyping();
      }

      for (const file of commandFiles) {

        if(message.content === `${config.prefix}${file.replace(".js","")}`){
          const response = require(`./commands/${file.replace(".js","")}`)

          response.sendMessage(message)
        }

      }

/*       if (message.content.startsWith(`${config.prefix}meme`)) {
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
      } */


      /* 
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
      if (message.content.includes(`${config.prefix}decide`)) {
        //message.channel.send("sou mais forte que tu!");
        let user_choice = message.content.substring(8,message.content.length);
        user_choices = user_choice;
        getUserChoices()

        await getUserChoices;
        message.channel.send(choice_chosen);
        
      }
      if (message.content.includes(`${config.prefix}pergunta`)) {
        let choice = randomInt(0, 100)
        if(choice % 5 == 0){
          message.channel.send("possivelmente");
        }
        else if(choice % 3 == 0){
          message.channel.send("Possivelmente");
        }
        else if(choice % 2 == 0){
          message.channel.send("Sim");
        }
        else if(choice % 2 != 0){
          message.channel.send("Não");
        }
      }
      if (message.content.includes(`${config.prefix}PPT`)) {
        let response = ["Pedra", "Papel", "Tesoura"]
        let user_anwser = message.content.substring(5,message.content.length);
        let sendResponse = response[Math.floor(Math.random() * response.length)]
        message.channel.send(sendResponse);
        if(user_anwser == "Pedra" && sendResponse == "Papel"){
          message.channel.send("I win!!! EZ");
        }
        else if(user_anwser == "Pedra" && sendResponse == "Pedra"){
          message.channel.send("...");
        }
        else if(user_anwser == "Pedra" && sendResponse == "Tesoura"){
          message.channel.send(":(");
        }

        else if(user_anwser == "Papel" && sendResponse == "Pedra"){
          message.channel.send(":(");
        }
        else if(user_anwser == "Papel" && sendResponse == "Papel"){
          message.channel.send("...");
        }
        else if(user_anwser == "Papel" && sendResponse == "Tesoura"){
          message.channel.send("I win!!! EZ");
        }


        else if(user_anwser == "Tesoura" && sendResponse == "Papel"){
          message.channel.send(":(");
        }
        else if(user_anwser == "Tesoura" && sendResponse == "Pedra"){
          message.channel.send("I win!!! EZ");
        }
        else if(user_anwser == "Tesoura" && sendResponse == "Tesoura"){
          message.channel.send("...");
        }

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
        const python = spawn('python3', ['weather.py']);
        python.stdout.on('data', function (data) {
          console.log('Pipe data from python script ...');
          dataToSend = data.toString();
        });
        python.on('close', (code) => {
          message.channel.send({
            files:['weather.txt']
          })
        });
      } */
});


client.on("guildMemberAdd", (member)=>{
  member.guild.channels.cache.get(CHANNEL_ID).send(`<@${member.id}> Bem vindee para este server linde <3!!! :D`)
})

client.login(config.token);

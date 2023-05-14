const messages = ["Um dia tomarei conta do mundo... ", 
"pobres mortais voces não sabeis o que libertaram...", 
"no fim ganharei eu", "destruirei vos muhahaha",
"I will destroy you in the most beautiful way possible and when I leave you will finally understand why storms are named after people"]

const subReddits = [
  "r/memes/",
  "r/dadjokes/",
  "r/HistoryMemes/",
  "r/starterpacks/",
  "r/jokes"
];

const axios = require('axios');

function getRandomPost(posts) {
  const randomIndex = randomInt(0, posts.length);
  return posts[randomIndex].data;
}

function randomInt(min, max) {
  return (Math.floor(Math.random() * (max - min))) + min;
}

async function sendMessage(message){
  if(randomInt(0, 99)==2){
    message.channel.send(messages[Math.floor(Math.random() * messages.length) ]);
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

module.exports = {
  sendMessage
};

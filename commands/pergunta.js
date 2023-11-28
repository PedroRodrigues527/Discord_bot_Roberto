async function sendMessage(message) {
  /* let choice = randomInt(0, 100); */
  let choice = Math.floor(Math.random() * 100);

  if (choice % 5 == 0) {
    message.channel.send("possivelmente");
  } else if (choice % 2 == 0) {
    message.channel.send("Sim");
  } else if (choice % 2 != 0) {
    message.channel.send("Não");
  }else{
    message.channel.send("Não Sei");
  }
}

module.exports = {
  sendMessage,
};
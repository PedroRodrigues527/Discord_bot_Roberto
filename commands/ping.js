async function sendMessage(message){
    message.channel.send("pong from func!")
}

module.exports = {
  sendMessage
};

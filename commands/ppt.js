async function sendMessage(message) {
  const logic = {
    Pedra: { weakTo: "Paper", strongTo: "Tesoura" },
    Papel: { weakTo: "Tesoura", strongTo: "Pedra" },
    Tesoura: { weakTo: "Pedra", strongTo: "Paper" },
  };

  const response = Object.keys(logic);
  const user_anwser = message.content.substring(5, message.content.length);
  const botResponse = response[Math.floor(Math.random() * response.length)];

  message.channel.send(botResponse);

  if (logic[user_anwser].strongTo === botResponse) {
    message.channel.send("I win!!! EZ");
  } else if (logic[user_anwser].weakTo === botResponse) {
    message.channel.send(":(");
  }else{
    message.channel.send("...");
  }
}

module.exports = {
  sendMessage,
};

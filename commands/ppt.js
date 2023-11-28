async function sendMessage(message) {
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

module.exports = {
  sendMessage,
};
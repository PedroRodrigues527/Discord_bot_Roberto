function getUserChoices(user_choices){
  array = (user_choices).split("|")

  array.splice(-1)

  choice_chosen = array[Math.floor(Math.random() * words.length)]
}


async function sendMessage(message) {
  let user_choices = message.content.substring(8,message.content.length);
  getUserChoices(user_choices)

  await getUserChoices;
  message.channel.send(choice_chosen);
}

module.exports = {
  sendMessage,
};

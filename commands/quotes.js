const quotes = ["If you can stay calm, while all around you is chaos…then you probably haven’t completely understood the seriousness of the situation.",
"Doing a job RIGHT the first time gets the job done. Doing the job WRONG fourteen times gives you job security",
"Artificial Intelligence is no match for Natural Stupidity","Believe nothing you hear, and only one half that you see.",
"It's not the house that's haunted... it's me.","No tears please, it's a waste of good suffering.",
"We all go a little mad sometimes.",
"Hope not ever to see Heaven. I have come to lead you to the other shore; into eternal darkness; into fire and into ice.",
"I’m so curious about knowing the unknown; it can be scary, but I see it as a game.", 
"Despite my ghoulish reputation, I really have the heart of a small boy. I keep it in a jar on my desk.",
"The last man on Earth sat alone in a room. There was a knock on the door… it was me!!! HAHAHAHA",
"Oh yes, there will be blood."]


async function sendMessage(message){
    message.channel.send(quotes[Math.floor(Math.random() * quotes.length)]);
}

module.exports = {
  sendMessage
};

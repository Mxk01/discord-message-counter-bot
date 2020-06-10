const Discord = require('discord.js');
let   Messages = require('./models/message');
let mongoose = require('mongoose');

let dotenv = require('dotenv');
dotenv.config();

const bot = new Discord.Client({disableEveryone:false});

mongoose.connect(process.env.MONGO_URI,{
  useNewUrlParser:true,
  useUnifiedTopology:true
})


bot.on("ready",async ()=>{
  console.log(`${bot.user.username} is online`)
  bot.user.setStatus('idle');
  bot.user.setActivity('count time');
});

bot.on("message",async(message)=>{
// if(message.content.startsWith('!count')){
    if(message.author.bot) return; // Stop if bot repplies

// Finds an user from the db;
  let messageUser = await Messages.findOne({userID:message.mentions.users.first().id});
  // If the user isn't in the db,create the user
   if(!messageUser){
    messageUser = new Messages({
      userID:message.mentions.users.first().id,
      messages:0
    });
    // Save the user
    await messageUser.save().catch(e=>console.log(e));

  };


let increasePost = async() => {

  let user = await Messages.findOne({userID:message.mentions.users.first().id});
  user.messages++;

await user.save();
let mentioned = message.mentions.users.first();
 message.channel.send(`${mentioned} has   ${ user.messages} messages `)
 // const messages = await Messages.findOne({ userID:message.mentions.users.first().id})
 // console.log(messages.messages);
 //    // message.channel.send(`${message.author.username} has  message ${ messages.messages} messages `)

}

let currentPost = async() => {
  let user = await Messages.findOne({userID:message.mentions.users.first().id});
  user.messages+=0;
await user.save();
// const messages = await Messages.findOne({ userID:message.mentions.users.first().id})
let mentioned = message.mentions.users.first();
 message.channel.send(`${mentioned} has   ${user.messages} messages `)
}

if(message.author!=message.mentions.users.first())
{
currentPost();
}
else
{
increasePost();
}





// }
if(message.content.startsWith(`!delete`)){
  const userMessages = await Messages.findOne({ userID:message.mentions.users.first().id});
  userMessages.messages = 0;
  userMessages.save()
  message.channel.send(`${message.mentions.users.first()} has   ${ userMessages.messages} messages `)
}
});



bot.login(process.env.TOKEN);
//Importing Discord.JS module
const Discord = require('discord.js');

//Important moment.js module
const moment = require('moment');

//Creating new Discord client instance.
const client = new Discord.Client();

//Import the data from the config.json file. (github hidden you need to make your own)
const config = require("./config.json");

client.on('ready', () => {
  console.log('I am ready!');
});

//Both bits below Make it so when using the EVAL function / command a user cant mention another user (for safety) by adding a micro character
//In between making it cancel.
function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}

//The actual eval command / code
client.on("message", message => {
  const args = message.content.split(" ").slice(1);

  if (message.content.startsWith("/eval")) {
    if(message.author.id !== config.ownerID) return;
    try {
      const code = args.join(" ");
      let evaled = eval(code);

      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);

      message.channel.send(clean(evaled), {code:"xl"});
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
  }
});
//Welcome Message and Log
// Create an event listener for new guild members
client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.find('name', 'general');
  channel.send(`Welcome to the server, ${member}`);
  const logchannel = member.guild.channels.find('name', 'member-log');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member and getting the current date 
  //Using moment.js
  var joindate = moment().format('MMMM Do YYYY, h:mm:ss a');
  //Making an embeded data table for the log channel
  logchannel.send({embed: {
  color: 0x118211,
  description: `:inbox_tray: **${member.user.tag}** has \`joined\` on: ${joindate}`
  }});
});

//Exit Message and log
// Create an event listener for guild members leaving
client.on('guildMemberRemove', member => {
  const channel = member.guild.channels.find('name', 'general');
  channel.send(`${member}, left the server!`);
  const logchannel = member.guild.channels.find('name', 'member-log');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member and getting the current date 
  //Using moment.js
  var leavedate = moment().format('MMMM Do YYYY, h:mm:ss a');
  //Making an embeded data table for the log channel
  logchannel.send({embed: {
  color: 0xff0209,
  description: `:outbox_tray:  **${member.user.tag}** has \`left\` on: ${leavedate}`
  }});
});


//!ping will reply pong 
client.on('message', msg => {
  if (msg.content === '!ping') {
    msg.reply('pong!');
  }
});

//!avatar will reply a link to the users avatar
client.on('message', msg => {
  if (msg.content === '!avatar') {
    msg.reply(msg.author.avatarURL);
  }
});

//!test will reply if the bot is working
client.on('message', msg => {
  if (msg.content === '!test') {
   msg.reply('Emerald Is Online!');
  }
});

//!github will reply to the user a link to the bot github page
client.on("message", function(msg) {
  if(msg.content === "!github"){
    msg.reply("https://github.com/Vailyer/Emerald-Bot");
  }
});




client.login(config.token);
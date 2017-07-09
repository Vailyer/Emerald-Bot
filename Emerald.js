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

//Creating one event listener for all messages to stop memory leak.
client.on('message', msg => {
  //creating args constant for eval command
  const args = msg.content.split(" ").slice(1);

  //!ping will reply pong 
  if (msg.content === '!ping') {
    msg.reply('pong!');
  }

  //!avatar will reply a link to the users avatar
  else if (msg.content.startsWith('!avatar')) {
    msg.reply(msg.mentions.users.first() .avatarURL);
  }

  //!test will reply if the bot is working
  else if (msg.content === '!test') {
   msg.reply('Emerald Is Online!');
  }

  //!github will reply to the user a link to the bot github page
  else if (msg.content === "!github"){
    msg.reply("https://github.com/Vailyer/Emerald-Bot");
  }

  //Eval Command (will run whatever is added in discord (js))
  if (msg.content.startsWith("/eval")) {
    if(msg.author.id !== config.ownerID) return;
    try {
      const code = args.join(" ");
      let evaled = eval(code);

      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);

      msg.channel.send(clean(evaled), {code:"xl"});
    } catch (err) {
      msg.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
  }

  /*!help will provide the user a list of available command (TODO)
  else if (msg.content === "!help"){
    msg.reply(help);
  }
  */
});

client.login(config.token);
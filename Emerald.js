//Importing Discord.JS module
const Discord = require('discord.js');

//Creating new Discord client instance.
const client = new Discord.Client();

// Creating constant for bot token
const token = 'MzI4MjUzOTMzODYyNTE4ODAw.DDBN2Q.02r6cwlWuoalNSKV7RzU6TgGHDQ';

client.on('ready', () => {
  console.log('I am ready!');
});

// Create an event listener for new guild members
client.on('guildMemberAdd', member => {
  // Send the message to the guilds default channel (usually #general), mentioning the member
  member.guild.defaultChannel.send(`Welcome to the server, ${member}!`);

  // If you want to send the message to a designated channel on a server instead
  // you can do the following:
  const channel = member.guild.channels.find('name', 'member-log');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`Welcome to the server, ${member}`);
});


//!ping will reply pong 
client.on('message', message => {
  if (message.content === '!ping') {
    message.reply('pong!');
  }
});

//!avatar will reply a link to the users avatar
client.on('message', message => {
  if (message.content === '!avatar') {
    message.reply(message.author.avatarURL);
  }
});

//!test will reply if the bot is working
client.on('message', message => {
  if (message.content === '!test') {
    message.reply('Emerald Is Working!');
  }
});


client.login(token);
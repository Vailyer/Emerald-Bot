//Importing Discord.JS module
const Discord = require('discord.js');

//Creating new Discord client instance.
const client = new Discord.Client();

// Creating constant for bot token
const token = 'MzI4MjUzOTMzODYyNTE4ODAw.DDBN2Q.02r6cwlWuoalNSKV7RzU6TgGHDQ';

client.on('ready', () => {
  console.log('I am ready!');
});

client.on('message', message => {
  if (message.content === '!!test') {
    message.reply('Emerald Is Loaded!');
  }
});

client.login(token);
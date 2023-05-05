require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();

const data = require('./verse.json');

client.on('ready', function() {
  console.log('Logged in as ' + client.user.tag + '!');
});

client.on('message', function(message) {
  if (message.author.bot) return; // Ignore messages from bots
  if (!message.content.startsWith('Gita')) return; // Ignore messages that don't start with 'Gita'

  const regex = /Gita\s+(\d+)[\.:]?(\d+)?\s*(-|\u2013|\u2014|\u2015|\u2212|\u002D|\uFF0D)?\s*(\d+)?[\.:]?(\d+)?/;
  const match = message.content.match(regex);

  if (!match) return; // Ignore messages that don't match the format

  const chapterStart = parseInt(match[1]);
  const verseStart = parseInt(match[2]);
  const chapterEnd = parseInt(match[4] || match[1]);
  const verseEnd = parseInt(match[5] || match[2]);

  let response = '';
  for (let chapter = chapterStart; chapter <= chapterEnd; chapter++) {
    const start = chapter === chapterStart ? verseStart : 1;
    const end = chapter === chapterEnd ? verseEnd : Object.keys(data[chapter]).length;
    for (let verse = start; verse <= end; verse++) {
      response += '**Chapter ' + chapter + ', Verse ' + verse + ':**\n' + data[chapter][verse] + '\n\n';
    }
  }

  message.channel.send(response);
});

client.login(process.env.DISCORD_TOKEN);

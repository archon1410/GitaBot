// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits } = require('discord.js');
const { token } = (process.env.DISCORD_TOKEN);

// Create a new client instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ] 
});

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

// Sample verse JSON object
const verse = {
  "chapter_id": 1,
  "chapter_number": 1,
  "externalId": 1,
  "id": 1,
  "text": "धृतराष्ट्र उवाच\n\nधर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः।\n\nमामकाः पाण्डवाश्चैव किमकुर्वत सञ्जय।।1.1।।\n ",
  "title": "Verse 1",
  "verse_number": 1,
  "verse_order": 1,
};

 //Listenes and replies to messages
// Load the verse data from verse.json
const verseData = require("./verse.json");

client.on("messageCreate", message => {
  if (message.author.bot) {
    return;
  }

  const regex = /^Gita\s+(\d+\.\d+)/; // Define a regular expression to match the Gita verse format
  const match = message.content.match(regex); // Check if the message matches the format

  if (match) {
    const [chapterNumber, verseNumber] = match[1].split("."); // Extract the chapter and verse numbers from the match
    const verse = verseData.find(v => v.chapter_number == chapterNumber && v.verse_number == verseNumber); // Find the corresponding verse from verse.json

    if (verse) {
      message.reply(verse.text); // Send the verse text as a reply
    } else {
      message.reply(`Verse ${chapterNumber}.${verseNumber} not found.`); // Send an error message if the verse is not found
    }
  }
});

// Log in to Discord with your client's token
client.login(token);

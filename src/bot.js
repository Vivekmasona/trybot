require('dotenv').config();
const fetch = require('node-fetch');
const { Telegraf } = require('telegraf');

const botToken = process.env.BOT_TOKEN;
const bot = new Telegraf(botToken);

bot.start((ctx) => ctx.reply('Welcome! Send me a song name to get the audio stream.'));

bot.on('text', async (ctx) => {
  const query = ctx.message.text;
  const apiUrl = `https://svn-vivekfy.vercel.app/search/songs?query=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    if (data.length > 0) {
      const audioUrl = data[0].downloadUrl; // Assuming the response contains a downloadUrl field
      await ctx.replyWithAudio(audioUrl);
    } else {
      await ctx.reply('No results found for your query.');
    }
  } catch (error) {
    console.error(error);
    await ctx.reply('An error occurred while fetching the audio stream.');
  }
});

bot.launch();
console.log('Bot is running...');

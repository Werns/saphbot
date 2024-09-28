export const BANNED_WORDS = [
    "nigger",
    "nigga",
    "faggot",
    "fag",
    
    "bnnuy",
    "bnuuy",
    "bnuy"
  ];
  
  export const BANNED_CHANNELS = [
    "1082026952644374577", // ff14-fem-or-futa
    "1118214425095188570", // ff14-fem+anything
    "1082139542305390672", // other-fem-or-futa
    "1118214657610633327" // other-fem+anything
  ];
  
  export async function blacklistMessageCreate(client, message) {
    let reportLogChannel = client.channels.cache.get('1162638491759415376');
    await checkMessageContent(client, message, reportLogChannel);
    await checkMessageChannel(client, message, reportLogChannel);
  }
  
  export async function blacklistMessageUpdate(client, oldMessage, newMessage) {
    let reportLogChannel = client.channels.cache.get('1162638491759415376');
    await checkMessageContent(client, newMessage, reportLogChannel);
  }
  
  async function checkMessageContent(client, message, reportLogChannel) {
    if (message.author.bot) return false;
    
    for (let badWord of BANNED_WORDS) {
      if (message.content.toLowerCase().includes(badWord.toLowerCase())) {
        await reportLogChannel.send(`Spanking ${message.author.username} for sending the bad word '${badWord}'`);
        await message.reply(`Spanking ${message.author.toString()} for sending a bad word!`);
        try {
          let dm = await message.member.createDM();
          await dm.send(`Your message was deleted from ${message.channel.toString()} because it contains '${badWord}':\n${message.content}`);
        } catch { await reportLogChannel.send(`Unable to DM ${message.author.toString()} with explanation`); }
        await message.delete();
      }
    }
  }
  
  async function checkMessageChannel(client, message, reportLogChannel) {
    if (message.author.bot) return false;
    
    if (BANNED_CHANNELS.includes(message.channelId.toString())) {
      if (message.attachments.size < 1 && message.embeds.length < 1 && !message.hasThread && !message.content.toLocaleLowerCase().includes("http")) {
        //await reportLogChannel.send(`${message.author.toString()} sent a text-only message in ${message.channel.toString()}`);
        try {
          let dm = await message.member.createDM();
          await dm.send(`Your message was deleted from ${message.channel.toString()} because that channel is only for sharing images. If you'd like to talk about an image, please create a thread or use a different channel.\n\nThis bot's detection is not perfect and may delete posts that it shouldn't:\n* If you created a thread, you can ignore this message - sometimes Discord will create a text post in the channel when you create a thread and sometimes it won't. This bot is not smart enough (yet) to differentiate between that and real text posts.\n\nYour message:\n${message.content}`);
        } catch {
          await reportLogChannel.send(`Unable to DM ${message.author.toString()} with explanation`);
          await message.reply(`This channel is only for sharing images. If you'd like to talk about an image, please create a thread or use a different channel.`);
        }
        await message.delete();
      }
    }
  }
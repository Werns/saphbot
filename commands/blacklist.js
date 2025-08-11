export const BANNED_WORDS = [
    "nigger",
    "nigga",
    "faggot",
    "fag",
    
    "bnnuy",
    "bnuuy",
    "bnuy",
    "bunuy"
  ];
  
  export const BANNED_CHANNELS = [
    "1082026952644374577", // ff14-fem-or-futa
    "1118214425095188570", // ff14-fem+anything
    "1082139542305390672", // other-fem-or-futa
    "1118214657610633327" // other-fem+anything
  ];
  
  /**
   * @param {import("discord.js").Client} client
   * @param {import("discord.js").OmitPartialGroupDMChannel<import("discord.js").Message<boolean>>} message
   */
  export async function blacklistMessageCreate(client, message) {
    await checkMessageContent(client, message);
    await checkMessageChannel(client, message);
  }
  
  /**
   * @param {import("discord.js").Client} client
   * @param {import("discord.js").Message<boolean> | import("discord.js").PartialMessage} oldMessage
   * @param {import("discord.js").Message<boolean> | import("discord.js").PartialMessage} newMessage
   */
  export async function blacklistMessageUpdate(client, oldMessage, newMessage) {
    await checkMessageContent(client, newMessage);
  }
  
  /**
   * @param {import("discord.js").Client} client
   * @param {import("discord.js").OmitPartialGroupDMChannel<import("discord.js").Message<boolean>> | import("discord.js").Message<boolean> | import("discord.js").PartialMessage} message
   */
  async function checkMessageContent(client, message) {
    if (!message.content || !message.author || message.author.bot) return false;

    let reportLogChannel = client.channels.cache.get('1162638491759415376');
    
    for (let badWord of BANNED_WORDS) {
      if (message.content.toLowerCase().includes(badWord.toLowerCase())) {
        if (reportLogChannel) await reportLogChannel
          //@ts-ignore
          .send(
          `Spanking ${message.author.username} for sending the bad word '${badWord}'`);
        await message.reply(`Spanking ${message.author.toString()} for sending a bad word!`);
        try {
          let dm = await message.member?.createDM();
          if (dm) await dm.send(`Your message was deleted from ${message.channel.toString()} because it contains '${badWord}':\n${message.content}`);
          else throw null;
        } catch { if (reportLogChannel) await reportLogChannel
          //@ts-ignore
          .send(`Unable to DM ${message.author.toString()} with explanation`);
        }
        await message.delete();
      }
    }
  }

  /**
   * @param {import("discord.js").Client} client
   * @param {import("discord.js").OmitPartialGroupDMChannel<import("discord.js").Message<boolean>>} message
   */
  async function checkMessageChannel(client, message) {
    if (message.author.bot) return false;

    const reportLogChannel = client.channels.cache.get('1162638491759415376');
    const channelBanned = BANNED_CHANNELS.includes(message.channelId.toString());
    const messageDoesNotHaveAttachments = message.attachments.size < 1;
    const messageDoesNotHaveEmbeds = message.embeds.length < 1;
    const messageDoesNotHaveUrl = !message.content.toLocaleLowerCase().includes("http");
    const messageIsNotReference = !message.reference;

    const deleteMessage = channelBanned && messageDoesNotHaveAttachments && messageDoesNotHaveEmbeds && !message.hasThread && messageDoesNotHaveUrl && messageIsNotReference;
    if (!deleteMessage) return;
    
    console.log(message);
    //await reportLogChannel.send(`${message.author.toString()} sent a text-only message in ${message.channel.toString()}`);
    try {
      let dm = await message.member?.createDM();
      if (dm) await dm.send(`Your message was deleted from ${message.channel.toString()} because that channel is only for sharing images. If you'd like to talk about an image, please create a thread or use a different channel.\n\nYour message:\n${message.content}`);
      else throw null;
    } catch {
      var replied = await message.reply(`This channel is only for sharing images. If you'd like to talk about an image, please create a thread or use a different channel.`);
      if (!replied && reportLogChannel) {
        await reportLogChannel
        //@ts-ignore
        .send(`Unable to DM ${message.author.toString()} with explanation`);
      }
    }
    await message.delete();
  }
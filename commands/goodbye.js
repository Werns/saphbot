/**
 * @param {import("discord.js").Client} client
 * @param {import("discord.js").GuildMember | import("discord.js").PartialGuildMember} member
 */
export default function GoodbyeUser(client, member) {
    let byebyeChannel = client.channels.cache.get('1249234768298508370');
    if (byebyeChannel) byebyeChannel
      // @ts-ignore
      .send(
      `**${member.user}** (${member.user.username}) just left the server. 😭`);
    
    // delete welcome messages
    
    let gettingStartedChannel = client.channels.cache.get('1271856846935687193');
    if (gettingStartedChannel) gettingStartedChannel
      // @ts-ignore
      .messages
      .fetch()
      .then(messages => {
        let saphBotMessages = messages.filter((m) => m.author.id === '1054576090280116315' && m.content.includes(`Hey ${member.user}`));
  
        for (let msgArr of saphBotMessages) {
          // msgArr[0] is a snowflake, msgArr[1] is a Message object
          msgArr[1].delete();
        }
      }).catch(console.error);;
    
    let welcumChannel = client.channels.cache.get('1082026951843262499');
    if (welcumChannel) welcumChannel
      // @ts-ignore
      .messages
      .fetch()
      .then(messages => {
        let memberMessages = messages.filter((m) => m.author.id === member.user.id && m.content === '');
  
        for (let msgArr of memberMessages) {
          // msgArr[0] is a snowflake, msgArr[1] is a Message object
          msgArr[1].delete();
        }
      })
      .catch(console.error);
  }
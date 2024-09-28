export default function GoodbyeUser(client, member) {
    console.log(`Goodbye ${member.user.username}`);
    let byebyeChannel = client.channels.cache.get('1249234768298508370');
    byebyeChannel.send(`**${member.user}** (${member.user.username}) just left the server. 😭`);
    
    // delete welcome messages
    
    let gettingStartedChannel = client.channels.cache.get('1271856846935687193');
    gettingStartedChannel.messages.fetch()
      .then(messages => {
        let saphBotMessages = messages.filter((m) => m.author.id === '1054576090280116315' && m.content.includes(`Hey ${member.user}`));
  
        for (let msgArr of saphBotMessages) {
          console.log(`Deleting SaphBot welcome message`);
          // msgArr[0] is a snowflake, msgArr[1] is a Message object
          // console.log(msgArr[1]);
          msgArr[1].delete();
        }
      }).catch(console.error);;
    
    let welcumChannel = client.channels.cache.get('1082026951843262499');
    welcumChannel.messages.fetch()
      .then(messages => {
        let memberMessages = messages.filter((m) => m.author.id === member.user.id && m.content === '');
  
        for (let msgArr of memberMessages) {
          console.log(`Deleting default welcome message`);
          // msgArr[0] is a snowflake, msgArr[1] is a Message object
          // console.log(msgArr[1]);
          msgArr[1].delete();
        }
      })
      .catch(console.error);
  }
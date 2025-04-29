/**
 * @param {import("discord.js").Client} client
 * @param {import("discord.js").GuildMember} member
 */
export default async function WelcomeUser(client, member) {
    let initialRoles = ["Newbie"];
    
    for (let roleName of initialRoles) {
      var foundRole = member.guild.roles.cache.find(role => role.name === roleName);
      if (foundRole) member.roles.add(foundRole).catch(console.error);
    }
    
    await new Promise(r => setTimeout(r, 2000));
    
    let assignCharactersChannel = client.channels.cache.get('1150345932559351890');
    let selfAssignRolesChannel = client.channels.cache.get('1082026951843262503');
    let teaRoomChannel = client.channels.cache.get('1082046192067813526');
    let gettingStartedChannel = client.channels.cache.get('1271856846935687193');

    if (!assignCharactersChannel || !selfAssignRolesChannel || !teaRoomChannel || !gettingStartedChannel) {
      console.error(`Welcome channels not found! assignCharactersChannel: ${!!assignCharactersChannel}, selfAssignRolesChannel: ${!!selfAssignRolesChannel}, teaRoomChannel: ${!!teaRoomChannel}, gettingStartedChannel: ${!!gettingStartedChannel}`)
      return;
    }
    
    gettingStartedChannel
      // @ts-ignore
      .send(
      `Hey ${member.user.toString()}, welcome to Harvestbell! \n\nGo use the \`/assign\` command in ${assignCharactersChannel.toString()} for each alt that you will play as in the lounge. (The required fields indicate your character's in-game values, not RP values.) \n\nAlso, you can customize your name color and label yourself appropriately (optional) in ${selfAssignRolesChannel.toString()} \n\nOnce you're done with those, head on over to chat in ${teaRoomChannel.toString()}`
    );
  }

import { Client, GuildMember } from "discord.js";

/**
 * @param {Client} client
 * @param {GuildMember} member
 */
export default async function WelcomeUser(client, member) {
    let initialRoles = ["Newbie"];
    
    for (let roleName of initialRoles) {
      var foundRole = member.guild.roles.cache.find(role => role.name === roleName);
      member.roles.add(foundRole).catch(console.error);
    }
    
    await new Promise(r => setTimeout(r, 2000));
    
    let assignCharactersChannel = client.channels.cache.get('1150345932559351890');
    let selfAssignRolesChannel = client.channels.cache.get('1082026951843262503');
    let teaRoomChannel = client.channels.cache.get('1082046192067813526');
    
    let gettingStartedChannel = client.channels.cache.get('1271856846935687193');
    gettingStartedChannel.send(`Hey ${member.user.toString()}, welcome to Harvestbell! \n\nGo use the \`/assign\` command in ${assignCharactersChannel.toString()} for each alt that you will play as in the lounge. (The required fields indicate your character's in-game values, not RP values.) \n\nAlso, you can customize your name color and label yourself appropriately (optional) in ${selfAssignRolesChannel.toString()} \n\nOnce you're done with those, head on over to chat in ${teaRoomChannel.toString()} \n\nAlso, for transparency sake, you will probably see an AFK character at the lounge called Security Catto. That is from a free trial account owned by Saphy and it logs the chat history to a channel in this server for moderation purposes. The channel is only accessible to moderators and a small selection of trusted regulars (people with the \`@Regular\` role).`);
  }
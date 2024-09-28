import { SlashCommandBuilder } from "discord.js";

const messageIdOptionName = "message-id";
const badWordOptionName = "bad-word";

let SpankCommand = {
  data: new SlashCommandBuilder()
  .setName("spank")
  .setDescription('For Moderator use only')
  .addStringOption((option) => option
    .setName(messageIdOptionName)
    .setDescription("The message id to spank")
    .setRequired(true)
  )
  .addStringOption((option) => option
    .setName(badWordOptionName)
    .setDescription("The bad word")
    .setRequired(true)
  ),
  execute: async(interaction, client) => {
    if (!interaction.member.roles.cache.some(role => role.id == 1162636141325996032)) {
      await interaction.reply({content: `Only moderators can spank!`, ephemeral: true});
      return false;
    }
    
    let reportLogChannel = client.channels.cache.get('1162638491759415376');
    
    var badWord = interaction.options.getString(badWordOptionName);
  
    var messageId = interaction.options.getString(messageIdOptionName);
    var message = await interaction.channel.messages.fetch(messageId);
    
    if (message.author.bot) {
      await interaction.reply({content: `Cannot spank bot messages :(`, ephemeral: true})
      return false;
    }
    
    await reportLogChannel.send(`Spanking ${message.author.username} for sending the bad word '${badWord}'`);
    await message.reply(`Spanking ${message.author.toString()} for sending a bad word!`);
    try {
      let dm = await message.member.createDM();
      await dm.send(`Your message was deleted from ${message.channel.toString()} because it contains '${badWord}':\n${message.content}`);
    } catch { await reportLogChannel.send("Unable to DM user with explanation"); }
    await message.delete();
    await interaction.reply({content: `Spanking complete!`, ephemeral: true});
  }
};

export default SpankCommand;
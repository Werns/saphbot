import { SlashCommandBuilder, Client, Interaction } from "discord.js";

const otherUserOptionName = "other-user";

let CuteifyCommand = {
  data: new SlashCommandBuilder()
  .setName("cuteify")
  .setDescription('Give another user a super cute role')
  .addUserOption((option) => option
    .setName(otherUserOptionName)
    .setDescription("The user to cuteify")
    .setRequired(true)
  ),
  /**
   * @param {Interaction} interaction
   * @param {Client} client
   */
  execute: async(interaction, client) => {
    var otherUser = interaction.options.getMember(otherUserOptionName);
    var cuteRole = interaction.member.guild.roles.cache.find(role => role.name === "CERTIFIED CUTIE PANTS");
    
    if (!cuteRole || !otherUser) {
      await interaction.reply({
        content: `Unable to assign role, please inform Saphy`,
        ephemeral: false
      });
    } else {
      var omitRole = otherUser.roles.cache.find(role => role.name === "Not Cute");
      
      if (!omitRole) {
        otherUser.roles.add(cuteRole);
      }
      
      await interaction.reply({
        content: `${interaction.member.toString()} has let everyone know that ${otherUser.toString()} is a CERTIFIED CUTIE PANTS`,
        ephemeral: false
      })
    }
  }
};

export default CuteifyCommand;
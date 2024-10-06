import { SlashCommandBuilder } from "discord.js";

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
   * @param {import("discord.js").ChatInputCommandInteraction} interaction
   * @param {import("discord.js").Client} client
   */
  execute: async(interaction, client) => {
    if (!interaction.member) return;

    var otherUser = interaction.options.getMember(otherUserOptionName);
    var cuteRole = interaction.member
      //@ts-ignore
      .guild
      .roles.cache.find(role => role.name === "CERTIFIED CUTIE PANTS");
    
    if (!cuteRole || !otherUser) {
      await interaction.reply({
        content: `Unable to assign role, please inform Saphy`,
        ephemeral: false
      });
    } else {
      var omitRole = otherUser.roles
        //@ts-ignore
        .cache
        .find(role => role.name === "Not Cute");
      
      if (!omitRole) {
        otherUser.roles
          //@ts-ignore
          .add(cuteRole);
      }
      
      await interaction.reply({
        content: `${interaction.member.toString()} has let everyone know that ${otherUser.toString()} is a CERTIFIED CUTIE PANTS`,
        ephemeral: false
      })
    }
  }
};

export default CuteifyCommand;
import { SlashCommandBuilder } from "discord.js";

let UncuteifyCommand = {
  data: new SlashCommandBuilder()
  .setName("uncuteify")
  .setDescription('Remove the super cutie pants role from yourself'),
  execute: async(interaction, client) => {
    var cuteRole = interaction.member.guild.roles.cache.find(role => role.name === "CERTIFIED CUTIE PANTS");
    
    if (!cuteRole) {
      await interaction.reply({
        content: `Unable to remove role, please inform Saphy`,
        ephemeral: false
      });
    } else {
      interaction.member.roles.remove(cuteRole);
      
      await interaction.reply({
        content: `${interaction.member.toString()} has removed their CERTIFIED CUTIE PANTS role. It's definitely a lie, but we'll let them get away with it... for now.`,
        ephemeral: false
      })
    }
  }
};

export default UncuteifyCommand;
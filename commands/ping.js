import { SlashCommandBuilder, Client, Interaction } from "discord.js";

let PingCommand = {
  data: new SlashCommandBuilder()
    .setName(`ping`)
    .setDescription(`Replies with Pong!`),
  /**
   * @param {Interaction} interaction
   * @param {Client} client
   */
  execute: async (interaction, client) => {
    await interaction.reply({content: `Pong!`, ephemeral: true});
  }
};

export default PingCommand;
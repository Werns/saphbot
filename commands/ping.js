import { SlashCommandBuilder } from "discord.js";

let PingCommand = {
  data: new SlashCommandBuilder()
    .setName(`ping`)
    .setDescription(`Replies with Pong!`),
  /**
   * @param {import("discord.js").ChatInputCommandInteraction} interaction
   * @param {import("discord.js").Client} client
   */
  execute: async (interaction, client) => {
    await interaction.reply({content: `Pong!`, ephemeral: true});
  }
};

export default PingCommand;
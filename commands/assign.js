import { SlashCommandBuilder, Client, Interaction } from "discord.js";

const firstNameOptionName = "first-name";
const lastNameOptionName = "last-name";
const sexOptionName = "sex";
const raceOptionName = "race";
const serverOptionName = "server";

const rpNameOptionName = "rp-name";
const rpSexOptionName = "rp-sex";
const pronounsOptionName = "pronouns";
const rpRaceOptionName = "rp-race";

let AssignCommand = {
  data: new SlashCommandBuilder()
  .setName("assign")
  .setDescription('Give yourself a role with the provided FFXIV character details')
  .addStringOption((option) => option
    .setName(firstNameOptionName)
    .setDescription("The character's in-game first name (value entered during character creation, not RP)")
    .setRequired(true)
  ).addStringOption((option) => option
    .setName(lastNameOptionName)
    .setDescription("The character's in-game last name (value entered during character creation, not RP)")
    .setRequired(true)
  ).addStringOption((option) => option
    .setName(sexOptionName)
    .setDescription("The character's in-game sex (binary value chosen during character creation, not RP)")
    .addChoices({"name": "Male","value":"Male"}, {"name":"Female", "value":"Female"})
    .setRequired(true)
  ).addStringOption((option) => option
    .setName(raceOptionName)
    .setDescription("The character's in-game race (value chosen during character creation, not RP)")
    .addChoices(
        {"name": "Hyur","value":"Hyur"},
        {"name": "Elezen","value":"Elezen"},
        {"name": "Miqo'te","value":"Miqo'te"},
        {"name": "Roegadyn","value":"Roegadyn"},
        {"name": "Au Ra","value":"Au Ra"},
        {"name": "Viera","value":"Viera"},
        {"name": "Hrothgar","value":"Hrothgar"},
    )
    .setRequired(true)
  ).addStringOption((option) => option
     .setName(serverOptionName)
     .setDescription("The server the character is on")
     .setRequired(true)
  ).addStringOption((option) => option
        .setName(rpNameOptionName)
        .setDescription("[Optional] Your character's RP name (if it differs from the in-game name)")
  ).addStringOption((option) => option
        .setName(rpSexOptionName)
        .setDescription("[Optional] Your character's RP sex (if it differs from the in-game sex)")
  ).addStringOption((option) => option
        .setName(pronounsOptionName)
        .setDescription("[Optional] The character's RP pronouns")
  ).addStringOption((option) => option
        .setName(rpRaceOptionName)
        .setDescription("[Optional] Your character's RP race (if it differs from the in-game race)")
  ),
  /**
   * @param {Interaction} interaction
   * @param {Client} client
   */
  execute: async(interaction, client) => {
    const firstName = interaction.options.getString(firstNameOptionName);
    const lastName = interaction.options.getString(lastNameOptionName);
    const sex = interaction.options.getString(sexOptionName);
    const race = interaction.options.getString(raceOptionName);
    const server = interaction.options.getString(serverOptionName);
    
    let rpValues = [];

    const rpName = interaction.options.getString(rpNameOptionName);
    const rpNameDisplay = (rpName == null || rpName.trim().length < 1) ? "" : `name: *${rpName.trim()}*`;
    if (rpNameDisplay.length > 0) rpValues.push(rpNameDisplay);
    
    const rpSex = interaction.options.getString(rpSexOptionName);
    const rpSexDisplay = (rpSex == null || rpSex.trim().length < 1) ? "" : `sex: *${rpSex.trim()}*`;
    if (rpSexDisplay.length > 0) rpValues.push(rpSexDisplay);
    
    const pronouns = interaction.options.getString(pronounsOptionName);
    const pronounsDisplay = (pronouns == null || pronouns.trim().length < 1) ? "" : `pronouns: *${pronouns.trim()}*`;
    if (pronounsDisplay.length > 0) rpValues.push(pronounsDisplay);
    
    const rpRace = interaction.options.getString(rpRaceOptionName);
    const rpRaceDisplay = (rpRace == null || rpRace.trim().length < 1) ? "" : `race: *${rpRace.trim()}*`;
    if (rpRaceDisplay.length > 0) rpValues.push(rpRaceDisplay);
    
    const rpDisplay = rpValues.length > 1 ? `\n**RP:** ${rpValues.join('; ')}` : rpValues.length > 0 ? `\n**RP:** ${rpValues[0]}` : ``;
    
    var role = interaction.member.guild.roles.cache.find(role => role.name === "Character Assigned");
    if (!role) {
      await interaction.reply({
        content: `Unable to assign role, please inform Saphy`,
        ephemeral: false
      });
      return;
    } else {
      interaction.member.roles.add(role);
    }
    
    await interaction.reply({
      content: `${interaction.member.toString()} plays as **${firstName} ${lastName}** (*${sex} ${race}, ${server}*)${rpDisplay}`,
      ephemeral: false
    })
  }
};

export default AssignCommand;
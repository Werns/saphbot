import { SlashCommandBuilder } from "@discordjs/builders";

const prevFirstNameOptionName = "prev-first-name";
const prevLastNameOptionName = "prev-last-name";
const firstNameOptionName = "first-name";
const lastNameOptionName = "last-name";
const sexOptionName = "sex";
const raceOptionName = "race";
const serverOptionName = "server";

const rpNameOptionName = "rp-name";
const rpSexOptionName = "rp-sex";
const pronounsOptionName = "pronouns";
const rpRaceOptionName = "rp-race";

let EditCommand = {
  data: new SlashCommandBuilder()
  .setName("edit")
  .setDescription('Change the details of an FFXIV character already assigned to you')
  .addStringOption((option) => option
    .setName(prevFirstNameOptionName)
    .setDescription("The previous first name of the character (must match the value entered in a previous assignment)")
    .setRequired(true)
  ).addStringOption((option) => option
    .setName(prevLastNameOptionName)
    .setDescription("The previous last name of the character (must match the value entered in a previous assignment)")
    .setRequired(true)
  ).addStringOption((option) => option
    .setName(firstNameOptionName)
    .setDescription("The character's new in-game first name (value entered during character creation, not RP)")
    .setRequired(true)
  ).addStringOption((option) => option
    .setName(lastNameOptionName)
    .setDescription("The character's new in-game last name (value entered during character creation, not RP)")
    .setRequired(true)
  ).addStringOption((option) => option
    .setName(sexOptionName)
    .setDescription("The character's new in-game sex (binary value chosen during character creation, not RP)")
    .addChoices(
        {"name": "Male","value":"Male"},
        {"name":"Female", "value":"Female"}
    )
    .setRequired(true)
  ).addStringOption((option) => option
    .setName(raceOptionName)
    .setDescription("The character's new in-game race (value chosen during character creation, not RP)")
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
    .setDescription("The new server the character is on")
    .setRequired(true)
  ).addStringOption((option) => option
        .setName(rpNameOptionName)
        .setDescription("[Optional] Your character's new RP name (if it differs from the in-game name)")
  ).addStringOption((option) => option
        .setName(rpSexOptionName)
        .setDescription("[Optional] Your character's new RP sex (if it differs from the in-game sex)")
  ).addStringOption((option) => option
        .setName(pronounsOptionName)
        .setDescription("[Optional] The character's new RP pronouns")
  ).addStringOption((option) => option
        .setName(rpRaceOptionName)
        .setDescription("[Optional] Your character's new RP race (if it differs from the in-game race)")
  ),
  execute: async(interaction, client) => {
    const prevFirstName = interaction.options.getString(prevFirstNameOptionName);
    const prevLastName = interaction.options.getString(prevLastNameOptionName);
    
    const prevMessageStr = `${interaction.member.toString()} plays as **${prevFirstName} ${prevLastName}**`;
    
    let messages = await interaction.channel.messages.fetch();
    
    let prevMessages = messages.filter(m => m.content.startsWith(prevMessageStr));
    
    if (prevMessages.size < 1) {
      await interaction.reply({
        content: `Could not find a message for the character ${prevFirstName} ${prevLastName}`,
        ephemeral: true
      });
      
      return;
    }
    
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
    
    const newContent = `${interaction.member.toString()} plays as **${firstName} ${lastName}** (*${sex} ${race}, ${server}*)${rpDisplay}`;

    await prevMessages.first().edit(newContent);
    
    await interaction.reply({
      content: `Previous character assignment edited!`,
      ephemeral: true
    });
  }
};

export default EditCommand;
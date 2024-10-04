import 'dotenv/config'
import { REST, Routes, Client, Collection, GatewayIntentBits, Events, PresenceUpdateStatus } from "discord.js";
import AssignCommand from "./commands/assign.js";
import CuteifyCommand from "./commands/cuteify.js";
import UncuteifyCommand from "./commands/uncuteify.js";
import EditCommand from "./commands/edit.js";
import PingCommand from "./commands/ping.js";
import SpankCommand from "./commands/spank.js";
import WelcomeUser from "./commands/welcome.js";
import GoodbyeUser from "./commands/goodbye.js";
import { blacklistMessageCreate, blacklistMessageUpdate } from "./commands/blacklist.js";

console.log("Starting SaphBot");

const client = new Client({ intents: [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMembers,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.GuildPresences,
  GatewayIntentBits.DirectMessages,
  GatewayIntentBits.MessageContent
]});

let commands = [AssignCommand, EditCommand, CuteifyCommand, UncuteifyCommand, PingCommand, SpankCommand];

client.commands = new Collection();
for (let cmd of commands) client.commands.set(cmd.data.name, cmd);

client.once(Events.ClientReady, () => console.log(`Client logged in as ${client.user.tag}`));

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;
  
  const command = client.commands.get(interaction.commandName);
  
  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }
  
  try {
    await command.execute(interaction, client);
  } catch (error) {
    console.error(error);
    let errorBody = { content: `There was an error while executing this command!`, ephemeral: true };
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp(errorBody);
    } else {
      await interaction.reply(errorBody);
    }
  }
});

client.on(Events.MessageCreate, async(...args) => {
  await blacklistMessageCreate(client, ...args);
});

client.on(Events.MessageUpdate, async(...args) => {
  await blacklistMessageUpdate(client, ...args);
});

client.on(Events.GuildMemberUpdate, async (oldMember, newMember) => {
  if (oldMember.pending && !newMember.pending) {
    await WelcomeUser(client, newMember);
  }
});

client.on(Events.GuildMemberRemove, (member) => {
  GoodbyeUser(client, member);
});

client.on(Events.PresenceUpdate, (oldPresence, newPresence) => {
  const securityCamsChannelId = "1082100597513269248";
  const securityCattoBotId = "1093039910874791997";

  if (newPresence.userId.toLowerCase() == securityCattoBotId && newPresence.status == PresenceUpdateStatus.Offline) {
    let securityCamsChannel = client.channels.cache.get(securityCamsChannelId);
    securityCamsChannel.send(`Security Catto has gone offline!`);
  }
});

const guildCommands = commands.map((cmd) => cmd.data.toJSON());

const globalCommands = [];

async function start() {
  try {
    const rest = new REST().setToken(process.env.DISCORD_TOKEN);
    
    const guildCommandResults = await rest.put(Routes.applicationGuildCommands(process.env.APPLICATION_ID, process.env.GUILD_ID), { body: guildCommands });
    if (guildCommandResults.length > 0) console.log(`Successfully reloaded ${guildCommandResults.length} guild application (/) commands.`);
    
    const globalCommandResults = await rest.put(Routes.applicationCommands(process.env.APPLICATION_ID), { body: globalCommands });
    if (globalCommandResults.length > 0) console.log(`Successfully reloaded ${globalCommandResults.length} global application (/) commands.`);
    
    client.login(process.env.DISCORD_TOKEN);
  } catch (error) {
    console.error(error);
  }
}

start();
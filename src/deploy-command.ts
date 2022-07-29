import { SlashCommandBuilder, Routes } from "discord.js";
import { REST } from "@discordjs/rest";

const { BOT_TOKEN, CLIENT_ID, GUILD_ID } = process.env;

const commands = [
  new SlashCommandBuilder().setName('ping').setDescription('Replies with pongas!'),
  new SlashCommandBuilder().setName('server').setDescription('Replies with server infos!'),
  new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
];

const commandsJson = commands.map( command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(BOT_TOKEN || '');

async function setCommands(){
  try{
    await rest.put(
      Routes.applicationGuildCommands(CLIENT_ID || '', GUILD_ID || ''),
      { body: commandsJson }
    );

    console.log('Commands ran successfully!')
  } catch(error){
    console.error('Error trying to set slash commands', error);
  }  
}

setCommands();
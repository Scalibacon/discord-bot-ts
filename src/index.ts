import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import { Client, GatewayIntentBits, Collection } from 'discord.js';
import './deploy-command';
import { TypeCommand } from './types/Command';
import { FsCommandReturn } from './types/FsCommandReturn';

interface ClientWithCommands extends Client{
  commands?: Collection<any, any>
}

// cria instância do client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds
  ]
}) as ClientWithCommands;

client.commands = new Collection();

// busca os comandos na pasta de comandos
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts'));

// faz loop entre os comandos da pasta e adiciona na propriedade do client
for(const file of commandFiles){
  const filePath = path.join(commandsPath, file);
  const command = require(filePath) as FsCommandReturn;

  client.commands.set(command.default?.data?.name, command.default);
}

// quando client tiver fino, executa 1 vez
client.once('ready', () => {
  console.log('Bot ready for the next battle!');
});

// quando interagirem com o bot
client.on('interactionCreate', async interaction => {  
  if(!interaction.isChatInputCommand()) return;

  const command = client.commands?.get(interaction.commandName) as TypeCommand;

  if(!command) return;

  try{
    await command.execute(interaction);
  } catch(error){
    console.log('Error trying to get command', error);
    await interaction.reply({ content: 'Teve um erro executando seu comando, meu patrone.', ephemeral: true});
  }
});

// loga com o token do .env
client.login(process.env.BOT_TOKEN);
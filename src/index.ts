import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import { Client, GatewayIntentBits, Collection } from 'discord.js';
import './deploy-command';
import { FsCommandReturn } from './types/FsCommandReturn';
import { FsEventReturn } from './types/FsEventReturn';
import { ClientWithCommands } from './types/clientWithCommands';

// cria instância do client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates
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

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.ts'));

for(const file of eventFiles){
  const filePath = path.join(eventsPath, file);
  const fsEvent = require(filePath) as FsEventReturn;
  const event = fsEvent.default;

  if(event.once){
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

// loga com o token do .env
client.login(process.env.BOT_TOKEN);
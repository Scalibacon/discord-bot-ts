import fs from 'node:fs';
import path from 'node:path';
import { Routes } from "discord.js";
import { REST } from "@discordjs/rest";
import { FsCommandReturn } from './types/FsCommandReturn';

const { BOT_TOKEN, CLIENT_ID, GUILD_ID } = process.env;

const commands: any[] = [];

// busca infos dos comandos na pasta
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter( file => file.endsWith('.ts'));

// joga as infos dos comandos na variável
for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath) as FsCommandReturn;
	commands.push(command.default.data);
}

const rest = new REST({ version: '10' }).setToken(BOT_TOKEN || '');

( async () => {
  console.log('Loading commands...', /*commands*/);
  await rest.put(
    Routes.applicationGuildCommands(CLIENT_ID || '', GUILD_ID || ''),
    { body: commands }
  );
  console.log('Commands ran successfully!')
})();
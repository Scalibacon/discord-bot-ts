import 'dotenv/config';
import { Client, GatewayIntentBits } from 'discord.js';
import './deploy-command';

// cria instância do client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds
  ]
});

// quando client tiver fino, executa 1 vez
client.once('ready', () => {
  console.log('Bot ready for the next battle!');
});

// quando interagirem com o bot
client.on('interactionCreate', async interaction => {
  if(!interaction.isChatInputCommand()) return;

  const { commandName } = interaction;

  console.log(interaction);

  switch(commandName){
    case 'ping':
      await interaction.reply('Pongas!');
      break;
    case 'server':
      // if(interaction.guild)
      await interaction.reply(`Nome do Server: ${interaction.guild?.name}\nMembros: ${interaction.guild?.memberCount}`);
      break;
    case 'user':
      await interaction.reply(`Sua tag: ${interaction.user.tag}\nSeu ID: ${interaction.user.id}`);
      break;
  }  
});

// loga com o token do .env
client.login(process.env.BOT_TOKEN);
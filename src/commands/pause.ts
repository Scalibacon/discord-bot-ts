import { getVoiceConnection } from "@discordjs/voice";
import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { TypeCommand } from "src/types/Command";
import VoiceConnectionWithPlayer from "src/types/VoiceConnectionWithPlayer";

const pauseCommand = {
  data: new SlashCommandBuilder()
    .setName('pause')
    .setDescription('Pauses the music'),

  execute: async (interaction: ChatInputCommandInteraction) => {
    try{
      if(!interaction.guildId) throw new Error('No guild ID found');

      const connection = getVoiceConnection(interaction.guildId) as VoiceConnectionWithPlayer | undefined;
      
      if(!connection) {
        return
      }

      connection.player.pause();

      interaction.reply('Song paused');
    } catch(error){
      if(error instanceof Error){
        console.error('Error trying to pause music', error.message);
        interaction.reply('Error trying to pause music: ' + error.message);
      } 
    }
  }
} as TypeCommand;

export default pauseCommand;
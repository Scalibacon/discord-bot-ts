import { getVoiceConnection } from "@discordjs/voice";
import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { TypeCommand } from "src/types/Command";
import VoiceConnectionWithPlayer from "src/types/VoiceConnectionWithPlayer";
import { skipSong } from "./play";

const skipCommand = {
  data: new SlashCommandBuilder()
    .setName('skip')
    .setDescription('Skips the music'),

  execute: async (interaction: ChatInputCommandInteraction) => {
    try{
      if(!interaction.guildId) throw new Error('No guild ID found');

      const connection = getVoiceConnection(interaction.guildId) as VoiceConnectionWithPlayer | undefined;
      
      if(!connection) throw new Error('No voice connection found!');

      if(connection.playlist.length <= 1) throw new Error('No music to skip to!');

      await skipSong(connection);

      interaction.reply('Song skipped')
    } catch(error){
      if(error instanceof Error){
        console.error('Error trying to skip music', error.message);
        interaction.reply('Error trying to skip music: ' + error.message);
      }       
    }
  }
} as TypeCommand;

export default skipCommand;
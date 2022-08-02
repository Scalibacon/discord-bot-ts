import { getVoiceConnection } from "@discordjs/voice";
import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { TypeCommand } from "src/types/Command";
import VoiceConnectionWithPlayer from "src/types/VoiceConnectionWithPlayer";

const unpauseCommand = {
  data: new SlashCommandBuilder()
    .setName('unpause')
    .setDescription('Resumes the music'),

  execute: async (interaction: ChatInputCommandInteraction) => {
    try{
      if(!interaction.guildId) throw new Error('No guild ID found');

      const connection = getVoiceConnection(interaction.guildId) as VoiceConnectionWithPlayer | undefined;
      
      if(!connection) {
        return
      }

      connection.player.unpause();

      interaction.reply('Song resumed')
    } catch(error){
      if(error instanceof Error) console.error('Error trying to unpause music', error.message);
    }
  }
} as TypeCommand;

export default unpauseCommand;
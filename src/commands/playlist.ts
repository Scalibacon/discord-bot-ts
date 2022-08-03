import { getVoiceConnection } from "@discordjs/voice";
import { bold, ChatInputCommandInteraction, SlashCommandBuilder, strikethrough } from "discord.js";
import { TypeCommand } from "src/types/Command";
import VoiceConnectionWithPlayer from "src/types/VoiceConnectionWithPlayer";

const playlistCommand = {
  data: new SlashCommandBuilder()
    .setName('playlist')
    .setDescription('Shows the songs inside the playlist'),

  execute: async (interaction: ChatInputCommandInteraction) => {
    try{
      if(!interaction.guildId) throw new Error('No guild ID found');

      const connection = getVoiceConnection(interaction.guildId) as VoiceConnectionWithPlayer | undefined;
      
      if(!connection) throw new Error('No voice connection found!');

      if(connection.playlist.length <= 0){
        interaction.reply('Playlist is currently empty!');
        return;
      }

      let responseText = bold('Songs in the playlist:');
      connection.playlist.forEach( (song, index) => {
        responseText += `\n${index + 1}. ${index === 0 ? strikethrough(song.title || '') : song.title}`;
      })

      interaction.reply(responseText);
    } catch(error){
      if(error instanceof Error){
        console.error('Error trying to get playlist', error.message);
        interaction.reply('Error trying to get playlist: ' + error.message);
      }       
    }
  }
} as TypeCommand;

export default playlistCommand;
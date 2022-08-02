import { AudioPlayerStatus, createAudioPlayer, createAudioResource, joinVoiceChannel, NoSubscriberBehavior } from "@discordjs/voice";
import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { TypeCommand } from "src/types/Command";
import play from 'play-dl';
import VoiceConnectionWithPlayer from "src/types/VoiceConnectionWithPlayer";

const playCommand = {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Plays a song in your voice channel.')
    .addStringOption(option => option.setName('name-or-url').setDescription('The name or URL of the song').setRequired(true)),

  execute: async (interaction: ChatInputCommandInteraction) => {
    try{
      const channelId = getUserVoiceChannel(interaction);
      let guildId = interaction.guildId;
      const adapterCreator = interaction.guild?.voiceAdapterCreator;
      const nameOrUrl = interaction.options.getString('name-or-url');

      if(!adapterCreator || !guildId || !channelId || !nameOrUrl){
        interaction.reply('Error trying to get info to play song. Make sure you are connected to a voice channel.');
        return;
      }

      const voiceConnection = joinVoiceChannel({
        channelId: channelId,
        guildId,
        adapterCreator
      }) as VoiceConnectionWithPlayer;      

      const audioStream = await play.stream(nameOrUrl);      

      // const audioUrl = path.join(__dirname, '..', 'assets', 'audio', 'Ah Yeah!!.mp3');      

      const audioResource = createAudioResource(audioStream.stream, {
        inputType: audioStream.type
      });

      const audioPlayer = createAudioPlayer({
        behaviors: {
          noSubscriber: NoSubscriberBehavior.Pause
        }
      });

      audioPlayer.on(AudioPlayerStatus.Playing, () => {
        console.log('The audio player has started playing!');
      });

      audioPlayer.play(audioResource);

      // guarda referência do player na conexão pra ter acesso a ele de outro arquivo
      voiceConnection.player = audioPlayer;
      voiceConnection.subscribe(audioPlayer);

      interaction.reply('Song requested!');
    } catch(error){
      if(error instanceof Error) console.error('Error trying to execute play command', error.message);
    }  
  }

} as TypeCommand;

const getUserVoiceChannel = (interaction: ChatInputCommandInteraction): false | string => {
  const userId = interaction.user.id;
  const member = interaction.guild?.members.cache.get(userId);

  if(member?.voice.channel){
    return member.voice.channel.id;
  }
  
  return false;  
}

export default playCommand;
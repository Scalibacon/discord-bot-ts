import { AudioPlayerStatus, createAudioPlayer, createAudioResource, getVoiceConnection, joinVoiceChannel, NoSubscriberBehavior } from "@discordjs/voice";
import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { TypeCommand } from "src/types/Command";
import play, { SoundCloudStream, YouTubeStream } from 'play-dl';
import VoiceConnectionWithPlayer from "src/types/VoiceConnectionWithPlayer";

const playCommand = {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Plays a song in your voice channel.')
    .addStringOption(option => option.setName('name-or-url').setDescription('The name or URL of the song').setRequired(true)),

  execute: async (interaction: ChatInputCommandInteraction) => {
    try{
      const nameOrUrl = interaction.options.getString('name-or-url');

      if(!nameOrUrl) throw new Error('No song name or URL was provided!');      

      await interaction.deferReply();

      const voiceConnection = setupVoiceConnection(interaction);

      let [ searchInfo ] = await play.search(nameOrUrl, {
        limit: 1
      });

      if(!searchInfo) throw new Error('No YouTube music found!');
      if(!voiceConnection) throw new Error('Unable to create voice connection!');

      voiceConnection.playlist?.push(searchInfo);

      // já bota pra tocar se só tiver ela na playlist
      if(voiceConnection.playlist?.length === 1){
        await playSong(voiceConnection);
      }

      interaction.followUp(`Song ${searchInfo.title} added to playlist!`);
    } catch(error){
      if(error instanceof Error){
        console.error('Error trying to execute play command', error.message);
        await interaction.followUp(error.message);        
      } 
    }  
  }

} as TypeCommand;

const playSong = async (voiceConnection: VoiceConnectionWithPlayer) => {
  let audioStream: YouTubeStream | SoundCloudStream;

  if(voiceConnection.playlist.length <= 0){
    console.log('No music found in the playlist');
    return;
  }

  const searchInfo = voiceConnection.playlist[0];  

  audioStream = await play.stream(searchInfo.url);               

  const audioResource = createAudioResource(audioStream.stream, {
    inputType: audioStream.type
  });      

  voiceConnection.player.play(audioResource);
}

const setupAudioPlayer = (voiceConnection: VoiceConnectionWithPlayer) => {
  const audioPlayer = createAudioPlayer({
    behaviors: {
      noSubscriber: NoSubscriberBehavior.Pause
    }
  });

  audioPlayer.on(AudioPlayerStatus.Playing, () => {
    console.log(`The audio player has started playing!`);
  });

  audioPlayer.on(AudioPlayerStatus.Buffering, () => {
    console.log(`The audio player is buffering...`);
  });

  audioPlayer.on(AudioPlayerStatus.Idle, () => {
    console.log(`The audio player is idle.`);

    skipSong(voiceConnection);
  });

  return audioPlayer;
}

export const skipSong = async (voiceConnection: VoiceConnectionWithPlayer) => {
  // todo: só skipar se tiver mais de 1 na playlist OU no play() chamar um stop caso tenha só 1 na fila
  voiceConnection.playlist.shift();    
  playSong(voiceConnection);
}

const setupVoiceConnection = (interaction: ChatInputCommandInteraction) => {
  try{
    const channelId = getUserVoiceChannel(interaction);
    let guildId = interaction.guildId;
    const adapterCreator = interaction.guild?.voiceAdapterCreator;
  
    if(!adapterCreator || !guildId || !channelId){
      throw new Error('Error trying to get info to play song. Make sure you are connected to a voice channel.');
    }
  
    let voiceConnection = getVoiceConnection(guildId) as VoiceConnectionWithPlayer | undefined;
        
    if(!voiceConnection) {
      voiceConnection = joinVoiceChannel({
        channelId: channelId,
        guildId,
        adapterCreator
      }) as VoiceConnectionWithPlayer;
  
      // guarda referência do player na conexão pra ter acesso a ele de outro arquivo
      voiceConnection.player = setupAudioPlayer(voiceConnection);
      voiceConnection.playlist = [];
  
      voiceConnection.subscribe(voiceConnection.player);
      console.log('A new voice connection was created!');
    }
  
    return voiceConnection;
  } catch(error){
    if(error instanceof Error){
      console.error('Error trying to setup voice connection', error.message);
    }  
  }
}

const getUserVoiceChannel = (interaction: ChatInputCommandInteraction): false | string => {
  const userId = interaction.user.id;
  const member = interaction.guild?.members.cache.get(userId);

  if(member?.voice.channel){
    return member.voice.channel.id;
  }
  
  return false;  
}

export default playCommand;
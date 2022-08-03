import { AudioPlayer, VoiceConnection } from "@discordjs/voice";
import { YouTubeVideo } from "play-dl";

interface VoiceConnectionWithPlayer extends VoiceConnection{
  player: AudioPlayer,
  playlist: YouTubeVideo[]
}

export default VoiceConnectionWithPlayer;
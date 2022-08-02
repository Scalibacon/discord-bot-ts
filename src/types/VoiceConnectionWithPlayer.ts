import { AudioPlayer, VoiceConnection } from "@discordjs/voice";

interface VoiceConnectionWithPlayer extends VoiceConnection{
  player: AudioPlayer
}

export default VoiceConnectionWithPlayer;
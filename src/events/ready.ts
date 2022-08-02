import { ActivityType, Client } from "discord.js";
import { BotEvent } from "src/types/BotEvent";

const ready = {
  name: 'ready',
  once: true,
  execute: (client: Client) => {
    client.user?.setActivity('twitch.tv/scalibacon', {type: ActivityType.Watching});
    console.log(`Bot ${client.user?.tag} ready for the next battle!`);
  }
} as BotEvent;

export default ready;
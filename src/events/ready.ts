import { Client } from "discord.js";
import { BotEvent } from "src/types/BotEvent";

const ready = {
  name: 'ready',
  once: true,
  execute: (client: Client) => {
    console.log(`Bot ${client.user?.tag} ready for the next battle!`);
  }
} as BotEvent;

export default ready;
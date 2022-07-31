import { Message } from "discord.js";
import { BotEvent } from "src/types/BotEvent";

const messageCreate = {
  name: 'messageCreate',
  execute: (message: Message) => {
    if(message.author.bot) return;

    message.reply('aqui quem manda é as ratazana, cuzão 🖕');
  }

} as BotEvent;

export default messageCreate;
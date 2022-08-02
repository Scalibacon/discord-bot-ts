import { Message } from "discord.js";
import { BotEvent } from "src/types/BotEvent";

const messageCreate = {
  name: 'messageCreate',
  execute: async (message: Message) => {
    if(message.author.bot || message.system) return;

    if(message.author.id === '315894873234472991')
      await message.react('😎');

    if(message.content.includes('caceta')){
      const reply = await message.reply({ content: 'Message deleted due to I wanted mfs OHOHOHOH' });
      reply.react('😎');
      await message.delete();
    }
  }

} as BotEvent;

export default messageCreate;
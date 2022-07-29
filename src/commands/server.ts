import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";
import { TypeCommand } from "src/types/Command";

const serverCommand = {
  data: new SlashCommandBuilder()
    .setName('server')
    .setDescription('Replies with server infos!'),
    
  execute: async (interaction: ChatInputCommandInteraction) => {
    await interaction.reply(`Nome do Server: ${interaction.guild?.name}\nMembros: ${interaction.guild?.memberCount}`);
  }
} as TypeCommand;

export default serverCommand;
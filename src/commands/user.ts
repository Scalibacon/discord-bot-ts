import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";
import { TypeCommand } from "src/types/Command";

const userCommand = {
  data: new SlashCommandBuilder()
    .setName('user')
    .setDescription('Replies with user info!'),
    
  execute: async (interaction: ChatInputCommandInteraction) => {    
    await interaction.reply(`Sua tag: ${interaction.user.tag}\nSeu ID: ${interaction.user.id}`);
  }
} as TypeCommand;

export default userCommand;
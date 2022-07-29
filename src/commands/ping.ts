import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";
import { TypeCommand } from "../types/Command";

const pingCommand = {
  data: new SlashCommandBuilder()
  .setName('ping')
  .setDescription('Replies with Pongas!'),
  
  execute: async (interaction: ChatInputCommandInteraction) => {
    await interaction.reply('Pongas!');
  },
} as TypeCommand;

export default pingCommand;
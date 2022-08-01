import { SlashCommandBuilder, ChatInputCommandInteraction, Options } from "discord.js";
import { wait } from '../utils/wait';
import { TypeCommand } from "../types/Command";

const timerCommand = {
  data: new SlashCommandBuilder()
    .setName('timer')
    .setDescription('Starts a timer')
    .addIntegerOption(option => option.setName('seconds').setDescription('Timer secons').setRequired(true)),

  execute: async (interaction: ChatInputCommandInteraction) => {
    const seconds = interaction.options.getInteger('seconds');

    if(!seconds || seconds / 60 > 15){
      await interaction.reply('Seconds must be a integer less than 15 minutes!');
      return;
    }

    await interaction.deferReply();
    await interaction.followUp(`Timer with ${seconds} seconds started!`)

    await wait(seconds * 1000);

    await interaction.followUp(`Timer with ${seconds} seconds finished!`)
  }

} as TypeCommand;

export default timerCommand;
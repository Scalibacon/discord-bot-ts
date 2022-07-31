import { SlashCommandBuilder, ChatInputCommandInteraction, Options } from "discord.js";
import { TypeCommand } from "../types/Command";

const randomCommand = {
  data: new SlashCommandBuilder()
  .setName('random')
  .setDescription('Replies with a random number between 2 predefined values!')

  // add parametro na hora de chamar o comando
  .addIntegerOption( option => {
    return option.setName('min-value').setDescription('Minimun value').setRequired(true);
  })
  .addIntegerOption( option => {
    return option.setName('max-value').setDescription('Maximun value').setRequired(true);
  }),
  
  execute: async (interaction: ChatInputCommandInteraction) => {
    // pega os parametros enviados
    const minValue = interaction.options.getInteger('min-value') || 0;
    const maxValue = interaction.options.getInteger('max-value') || 0;

    const random = Math.floor(Math.random() * maxValue) + minValue;

    await interaction.reply('Random number generated: ' + random);
  },
} as TypeCommand;

export default randomCommand;
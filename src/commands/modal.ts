import { ActionRowBuilder, ChatInputCommandInteraction, ModalActionRowComponentBuilder, ModalBuilder, SlashCommandBuilder, TextInputBuilder, TextInputStyle } from "discord.js";
import { TypeCommand } from "src/types/Command";

const modalCommand = {
  data: new SlashCommandBuilder()
    .setName('modal')
    .setDescription('Opens a modal window'),
  
  execute: async (interaction: ChatInputCommandInteraction) => {
    try{
      const modal = new ModalBuilder()
        .setCustomId('modal')
        .setTitle('A Cool Modal Window');

      const input1 = new TextInputBuilder()
        .setCustomId('modal-input1')
        .setLabel("Answer this input1 with some text")
        .setStyle(TextInputStyle.Short);

      const input2 = new TextInputBuilder()
        .setCustomId('modal-input2')
        .setLabel("Answer this input1 with a lot of text")
        .setStyle(TextInputStyle.Paragraph);

      const row1 = new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(input1);
      const row2 = new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(input2);

      modal.addComponents(row1, row2);

      await interaction.showModal(modal);
    } catch(error){
      if(error instanceof Error) console.error('Error trying to execute modal command', error.message);
    }
  }

} as TypeCommand;

export default modalCommand;
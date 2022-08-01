import { InteractionType, ModalSubmitInteraction } from "discord.js";
import { BotEvent } from "src/types/BotEvent";

const interactionCreateModalSubmit = {
  name: 'interactionCreate',
  execute: (interaction: ModalSubmitInteraction) => {
    if(interaction.type !== InteractionType.ModalSubmit) return;

    if(interaction.customId === 'modal'){
      const value1 = interaction.fields.getTextInputValue('modal-input1');
      const value2 = interaction.fields.getTextInputValue('modal-input2');

      interaction.reply({content: `You entered ${value1} and ${value2} values!`});

      // console.log('Modal submit', interaction);
    }    
  }
} as BotEvent;

export default interactionCreateModalSubmit;
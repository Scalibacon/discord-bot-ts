import { Interaction } from "discord.js";
import { BotEvent } from "src/types/BotEvent";
import { wait } from '../utils/wait';

const interactionCreateSelectMenu = {
  name: 'interactionCreate',
  execute: async (interaction: Interaction) => {
    if(!interaction.isSelectMenu()) return;

    if(interaction.customId === 'ping-select-menu'){
      // await interaction.update({ content: 'Something was selected in the menu!',});
      await interaction.deferUpdate();
      await wait(1000);
      await interaction.editReply({ content: 'Something was selected!', components: [] });
    }
  }
} as BotEvent;

export default interactionCreateSelectMenu;
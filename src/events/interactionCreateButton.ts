import { Interaction } from "discord.js";
import { BotEvent } from "src/types/BotEvent";
import { wait } from '../utils/wait';

const interactionCreateButton = {
  name: 'interactionCreate',

  execute: async (interaction: Interaction) => {
    if(!interaction.isButton()) return;

    if(interaction.customId === 'btn-ping'){
      await interaction.deferUpdate();
      // componets vazio tira os botões da mensagem
      await interaction.editReply({ content: 'A button was clicked',});
    }

    return;

    // ainda não sei muito bem como usar collectors
    // aparentemente ficam up por certo tempo e vão coletando as interações
    // similar ao awaitMessages, mas pode executar coisas após cada mensagem
    const filter = (i: Interaction) => i.isButton() && i.customId === 'btn-ping';

    const collector = interaction.channel?.createMessageComponentCollector({ filter, time: 15000 });

    collector?.on('collect', async i => {
      console.log('collect', i);
      if(i.customId === 'btn-ping'){
        await i.deferUpdate();
        await wait(2000);
        console.log('waited 2000ms');
        await i.editReply({ content: 'A button was clicked', components: []});
      }

      // await i.update({ content: 'A button was clicked', components: [] });
    });

    collector?.on('end', (collected) => console.log(`Collected ${collected.size} items`));
  }

} as BotEvent;

export default interactionCreateButton;
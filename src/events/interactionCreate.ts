import { Interaction } from "discord.js";
import { BotEvent } from "src/types/BotEvent";

const interactionCreate = {
  name: 'interactionCreate',
  once: false,
  execute: (interaction: Interaction) => {
    console.log('interaction', )
    if(!interaction.isChatInputCommand()) return;

    console.log(`${interaction.user?.tag} no #${interaction.channel} interagiu.`, interaction.channel?.client);

    // const command = client.commands?.get(interaction.commandName) as TypeCommand;

    // if(!command) return;

    // try{
    //   await command.execute(interaction);
    // } catch(error){
    //   console.log('Error trying to get command', error);
    //   await interaction.reply({ content: 'Teve um erro executando seu comando, meu patrone.', ephemeral: true});
    // }
  }
} as BotEvent;

export default interactionCreate;
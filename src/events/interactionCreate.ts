import { Interaction } from "discord.js";
import { BotEvent } from "src/types/BotEvent";
import { ClientWithCommands } from "src/types/clientWithCommands";
import { TypeCommand } from "src/types/Command";

const interactionCreate = {
  name: 'interactionCreate',
  once: false,
  execute: async (interaction: Interaction) => {
    if(!interaction.isChatInputCommand()) return;

    const client = interaction.client as ClientWithCommands;

    const command = client.commands?.get(interaction.commandName) as TypeCommand;   

    if(!command) return;

    try{
      await command.execute(interaction);
    } catch(error){
      console.log('Error trying to get command', error);
      await interaction.reply({ content: 'Teve um erro executando seu comando, meu patrone.', ephemeral: true });
    }
  }
} as BotEvent;

export default interactionCreate;
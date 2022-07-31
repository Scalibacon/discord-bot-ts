import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";
import { TypeCommand } from "src/types/Command";

const infoCommand = {
  data: new SlashCommandBuilder()
    .setName('info')
    .setDescription('Replies with selected infos!')
    .addSubcommand(subcommand => {
      return subcommand
        .setName('user')
        .setDescription('Info about a user')
        .addUserOption(option => option.setName('target').setDescription('The user'))
    })
    .addSubcommand(subcommand => {
      return subcommand
        .setName('server')
        .setDescription('Info about the server')
    }),
    
  execute: async (interaction: ChatInputCommandInteraction) => {
    try{
      if(interaction.options.getSubcommand() === 'user'){
        const user = interaction.options.getUser('target');
  
        if(user){
          await interaction.reply(`Username: ${user.username}\nID: ${user.id}`);
        } else {
          await interaction.reply(`Your username: ${interaction.user.username}\nYour ID: ${interaction.user.id}`);
        }
      } else if(interaction.options.getSubcommand() === 'server'){
        await interaction.reply(`Server name: ${interaction.guild?.name}\nMembers count: ${interaction.guild?.memberCount}`);
      } 
    } catch(error){
      if(error instanceof Error) console.error('Error trying to execute info command', error.message);
    }      
  }
} as TypeCommand;

export default infoCommand;
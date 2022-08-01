import { SlashCommandBuilder, ChatInputCommandInteraction, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } from "discord.js";
import { TypeCommand } from "../types/Command";

const pingCommand = {
  data: new SlashCommandBuilder()
  .setName('ping')
  .setDescription('Replies with Pongas!'),
  
  execute: async (interaction: ChatInputCommandInteraction) => {
    const row1 = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setCustomId('btn-ping')
        .setLabel('Cool Button')
        .setStyle(ButtonStyle.Primary)
    )
    .addComponents(
      new ButtonBuilder()
        .setCustomId('btn-ping-disabled')
        .setLabel('Disabled Button 🥶')
        .setStyle(ButtonStyle.Danger)
        .setDisabled(true)
    );

    const embed = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle('A Very Nice Title')
      .setURL('https://scalibacon.github.io/portfolio/')
      .setDescription('Some description here')
      .setAuthor({name: 'Tetheus', iconURL: 'https://avatars.githubusercontent.com/u/37462685?s=400&u=543237293b50b98917f73f4f556f6280a579f2bf&v=4'})
      .setThumbnail('https://avatars.githubusercontent.com/u/37462685?s=400&u=543237293b50b98917f73f4f556f6280a579f2bf&v=4')
      .setImage('https://avatars.githubusercontent.com/u/37462685?s=400&u=543237293b50b98917f73f4f556f6280a579f2bf&v=4')
      .setFooter({text: 'A Footer', iconURL: 'https://avatars.githubusercontent.com/u/37462685?s=400&u=543237293b50b98917f73f4f556f6280a579f2bf&v=4'})

    await interaction.reply({ content: 'Pongas!', embeds: [embed], components: [row1] });
  },
} as TypeCommand;

export default pingCommand;
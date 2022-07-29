import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";

export type TypeCommand = {
  data: SlashCommandBuilder,
  execute: (interaction: ChatInputCommandInteraction) => Promise<void>
}
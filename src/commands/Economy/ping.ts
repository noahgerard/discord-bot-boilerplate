import { type SlashCommandProps, type CommandOptions } from 'commandkit';
import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Check the bot\'s latency.');

export async function run({ interaction, client, handler }: SlashCommandProps) {
    await interaction.reply({ content: `:ping_pong: Pong! ${client.ws.ping}ms`, ephemeral: true });
}

export const options: CommandOptions = {
    userPermissions: ['Administrator', 'AddReactions'],
    botPermissions: ['Administrator', 'AddReactions', "KickMembers"],
    deleted: false,
    cooldown: 5 * 1000,
}
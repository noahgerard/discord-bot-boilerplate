import { type CommandData, type SlashCommandProps, type CommandOptions, ButtonKit } from 'commandkit';
import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';

export const data: CommandData = {
    name: 'pping',
    description: 'Pong!',
    dm_permission: false,
}

export async function run({ interaction, client, handler }: SlashCommandProps) {
    await interaction.reply({ content: `:ping_pong: Pong! ${client.ws.ping}ms`, ephemeral: true });
}

export const options: CommandOptions = {
    userPermissions: ['Administrator', 'AddReactions'],
    botPermissions: ['Administrator', 'AddReactions', "KickMembers"],
    deleted: false,
    cooldown: 5 * 1000,
}
import { type CommandData, type SlashCommandProps, type CommandOptions, ButtonKit } from 'commandkit';
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Colors, EmbedBuilder, REST, Routes } from 'discord.js';
const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN as string);

export const data: CommandData = {
	name: 'help',
	description: 'View all commands!',
	dm_permission: false,
}

export async function run({ interaction, client, handler }: SlashCommandProps) {
	if (!process.env.APP_ID) return interaction.reply({ content: "APP_ID not set in .env file", ephemeral: true });

	await interaction.deferReply({ ephemeral: true });

	type APICommand = {
		id: string;
		name: string;
		description: string;
		type: number;
	}

	let commands = await rest.get(Routes.applicationCommands(process.env.APP_ID as string)) as APICommand[];
	let categories = new Map<string, string[]>();

	for (let command of commands) {
		const category = handler.commands.find(c => c.data.name == command.name)?.category || "Uncategorized";

		if (!categories.has(category)) {
			categories.set(category, []);
		}

		categories.get(category)!.push(`</${command.name}:${command.id}>`);
	}

	let embed = new EmbedBuilder()
		.setColor(Colors.DarkButNotBlack)
		.setTitle("📕 Slash Commands")
		.addFields(Array.from(categories.entries()).map(([category, commands]) => {
			return {
				name: category,
				value: commands.join(" ")
			}
		}));

	return interaction.editReply({ content: "", embeds: [embed] });
}
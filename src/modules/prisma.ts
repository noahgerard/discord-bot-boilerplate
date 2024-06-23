
import { PrismaClient } from "@prisma/client";
import { AnySelectMenuInteraction, AutocompleteInteraction, ButtonInteraction, CommandInteraction, Interaction, ModalSubmitInteraction, SelectMenuInteraction } from "discord.js";
const client = new PrismaClient();


export async function getContext(interaction: ButtonInteraction | CommandInteraction | AutocompleteInteraction | ModalSubmitInteraction | AnySelectMenuInteraction) {
	const guild = interaction.guild!;
	const member = interaction.member!;

	const guildData = await client.guild.upsert({
		where: {
			id: guild.id
		},
		update: {
			id: guild.id,
		},
		create: {
			id: guild.id,
		}
	});

	const profile = await client.profile.upsert({
		where: {
			id: `${member.user.id}-${guild.id}`
		},
		update: {
			userId: member.user.id,
			guildId: guild.id,
		},
		create: {
			id: `${member.user.id}-${guild.id}`,
			userId: member.user.id,
			guild: {
				connect: {
					id: guild.id
				}
			}
		}
	});

	return {
		guild: guildData,
		profile: profile
	}
}

export const prisma = client;
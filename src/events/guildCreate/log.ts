import { ButtonInteraction, Client, Guild } from "discord.js";
import { logger } from "../../modules/logger.js";
import { prisma } from "../../modules/prisma.js";

export default async (guild: Guild, client: Client) => {	
	logger.info(`Joined guild: ${guild.name} (${guild.id})`);

	// TODO: Create guild entry in database
	await prisma.guild.upsert({
		where: {
			id: guild.id,
		},
		update: {
			id: guild.id,
		},
		create: {
			id: guild.id,
		},
	});
}
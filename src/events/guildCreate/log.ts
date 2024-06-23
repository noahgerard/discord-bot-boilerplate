import { ButtonInteraction, Client, Guild } from "discord.js";
import { logger } from "../../modules/logger.js";

export default async (guild: Guild, client: Client) => {	
	logger.info(`Joined guild: ${guild.name} (${guild.id})`);
	// TODO: Create guild entry in database
}
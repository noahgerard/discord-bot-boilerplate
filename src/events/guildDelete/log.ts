import { ButtonInteraction, Client, Guild } from "discord.js";
import { logger } from "../../modules/logger.js";

export default async (guild: Guild, client: Client) => {
	logger.info(`Left guild: ${guild.name} (${guild.id})`);
}
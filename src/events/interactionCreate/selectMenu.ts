import { AnySelectMenuInteraction, ButtonInteraction, Client } from "discord.js";
import { logger } from "../../modules/logger.js";

export default async (interaction: AnySelectMenuInteraction, client: Client) => {
	if (!interaction.isAnySelectMenu()) return;
	
	logger.info(`${interaction.user.tag} (${interaction.user.id}) selected option ${interaction.values[0]} in ${interaction.guild?.name} (${interaction.guild?.id})`);
}
import { ButtonInteraction, Client } from "discord.js";
import { logger } from "../../modules/logger.js";

export default async (interaction: ButtonInteraction, client: Client) => {
	if (!interaction.isButton()) return;
	
	logger.info(`${interaction.user.tag} (${interaction.user.id}) clicked button ${interaction.customId} in ${interaction.guild?.name} (${interaction.guild?.id})`);
}
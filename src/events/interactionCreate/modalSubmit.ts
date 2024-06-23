import { ButtonInteraction, Client, ModalSubmitInteraction } from "discord.js";
import { logger } from "../../modules/logger.js";

export default async (interaction: ModalSubmitInteraction, client: Client) => {
	if (!interaction.isModalSubmit()) return;
	
	logger.info(`${interaction.user.tag} (${interaction.user.id}) submitted a modal in ${interaction.guild?.name} (${interaction.guild?.id})`)
}

import { PermissionFlagsBits, EmbedBuilder, SlashCommandBuilder, CommandInteraction, CommandInteractionOptionResolver, Client } from "discord.js";


import { inspect } from "util";

let client: Client;

export const init = (bot: Client) => {
	client = bot;

	return {
		options: new SlashCommandBuilder()
			.setName("eval")
			.setDescription("evaluate code")
			.addStringOption((option) => option
				.setName("code")
				.setDescription("code to evaluate")
				.setRequired(true)),
		userPermissions: [PermissionFlagsBits.ViewChannel],
		botPermissions: [PermissionFlagsBits.EmbedLinks],
		ownerOnly: true,
		cooldown: 1500,
	}
};

export const run = async (interaction: CommandInteraction, options: CommandInteractionOptionResolver) => {
	const code = options.getString("code", true);
	
	const result = new Promise((resolve) => resolve(eval(code)));


	return result.then((output: any) => {
		if (typeof output !== "string") {
			output = inspect(output, { depth: 0 });
		}
		if (output.includes(client.token)) {
			output = output.replace(client.token, "T0K3N");
		}

		return interaction.reply({ content: `\`\`\`js\n${output}\`\`\`` });
	}).catch((err) => {
		console.error(err);

		err = err.toString();

		if (err.includes(client.token)) {
			err = err.replace(client.token, "T0K3N");
		}

		return interaction.reply({ content: `\`\`\`js\n${err}\`\`\`` });
	});
}
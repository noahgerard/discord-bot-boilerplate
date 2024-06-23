import type { ValidationProps } from 'commandkit';
 
export default function ({ interaction, commandObj, handler }: ValidationProps) {
	if (interaction.isAutocomplete()) return true;

	// TODO: Implement cooldowns
    /* if (cooldowns.has(`${interaction.user.id}-${commandObj.data.name}`)) {
        interaction.reply({
            content: "You're on cooldown, please wait some time before running this command again.",
            ephemeral: true,
        });
 
        return true; // This is important
    } */

	return true;
};
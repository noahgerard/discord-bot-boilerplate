import type { ValidationProps } from 'commandkit';

const cooldowns = new Map<string, number>();
 
export default function ({ interaction, commandObj, handler }: ValidationProps) {
	if (interaction.isAutocomplete()) return true;

    if (interaction.isChatInputCommand() && commandObj.options!.cooldown) {
        const id = `${interaction.guildId}-${interaction.user.id}-${commandObj.data.name}`;


        if (!cooldowns.has(id)) {
            cooldowns.set(id, Date.now() + commandObj.options!.cooldown);
        } else {
            const cooldown = cooldowns.get(id);
 
            if (cooldown! > Date.now()) {
                interaction.reply({
                    content: `Slow down!`,
                    ephemeral: true,
                });
 
                return true;
            }
 
            cooldowns.set(id, Date.now() + commandObj.options!.cooldown);
        }
    }

	return false;
};
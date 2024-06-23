import { Client } from "discord.js";
import { logger } from "../../modules/logger.js";

export default async (client: Client) => {
	logger.success("Logged in as " + client.user!.tag);

	/*
	const tracker = InvitesTracker.init(client, {
		fetchGuilds: true,
		fetchVanity: true,
		fetchAuditLogs: true
	});

	tracker.on('guildMemberAdd', async (member: any, type: any, invite: any) => {
		if (type === 'normal') {
			console.log(`[${client.functions.date()}]\t[JOIN] ${member} was invited by ${invite.inviter.username}`);

			try {
				let dbUser = await prisma.getUser(member.id, invite.guildId);
				if (dbUser!.inviterID != "-") {
					let inviteMember = await member.guild.members.fetch(invite.inviter.id);
					let inValid = inviteMember._roles.find((r: string) => config.ignoreRoles.includes(r));

					if (inValid) return;
					

					await prisma.setUser(member.id, invite.guildId, {
						invitedBy: {
							connectOrCreate: {
								where: { id: invite.inviter.id + "-" + invite.guildId },
								create: { id: invite.inviter.id + "-" + invite.guildId, userID: invite.inviter.id, guildId: invite.guildId }
							}
						},
						joinedOn: new Date()
					});
				}
			} catch (error) {
				console.error(error);
			}
		} else if (type === 'vanity') {
			console.log(`[${client.functions.date()}]\t[JOIN] ${member} joined through the vanity invite`);
		} else if (type === 'permissions') {
			console.log(`[${client.functions.date()}]\t[JOIN] ${member} joined, lacking permissions to determine origin`);
		} else if (type === 'unknown') {
			console.log(`[${client.functions.date()}]\t[JOIN] ${member} joined, unable to determin origin`);
		}
	});*/
}
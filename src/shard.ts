import { CommandKit } from 'commandkit';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

import { logger } from './modules/logger.js';
import { Client, GatewayIntentBits, Options, Partials } from 'discord.js';

dotenv.config();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function importJobs(client: Client) {
	const files = fs.readdirSync(path.join(__dirname, 'jobs'));

	files.map(async (file) => {
		const filePath = path.join(path.join(__dirname, 'jobs', file));
		const module = await import(filePath);

		if (module.run && typeof module.run === 'function') {
			let running = false;

			setInterval(async () => {
				if (running) return;
				running = true;
				await module.run(client);
				running = false;
			}, module.interval);
		}
	});
}

const intents = [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildInvites];
const partials = [ /*Partials.Message, Partials.Reaction*/] as Partials[];

const client = new Client({
	makeCache: Options.cacheWithLimits({
		MessageManager: 500
	}),
	intents,
	partials,
});

new CommandKit({
	client,
	commandsPath: path.join(__dirname, 'commands'),
	eventsPath: path.join(__dirname, 'events'),
	validationsPath: path.join(__dirname, 'validations'),
	devGuildIds: ['727131051939463228'],
	devUserIds: ['368936151156916224'],
	// devRoleIds: ['DEV_ROLE_ID_1', 'DEV_ROLE_ID_2'],
	skipBuiltInValidations: true,
	bulkRegister: true,
});

if (!process.env.BOT_TOKEN) {
	throw new Error('env.BOT_TOKEN is not defined');
}

await importJobs(client);

await client.login(process.env.BOT_TOKEN);

process.on('uncaughtException', (error) => {
	logger.error(error);
});
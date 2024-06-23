
import { ShardingManager } from "discord.js";
import { PrismaClient } from "@prisma/client";
import config from "./config.js";

import "source-map-support";

const prisma = new PrismaClient();

const manager = new ShardingManager("./build/shard.js", {
	token: process.env.BOT_TOKEN,
});

// Trying to spawn the required shards.
manager.on("shardCreate", shard => {
	shard.on("ready", () => {
		console.log(`Shard ${shard.id} connected`);
		shard.send({ type: "shardId", data: { shardId: shard.id } });
	});
});

manager.spawn().catch(error => {
	console.error("[ERROR/SHARD] Shard failed to spawn");
	console.error(error);
});

process.on("beforeExit", (code) => {
	console.log(`Process exiting with code: ${code}`);
	prisma.$disconnect();
});